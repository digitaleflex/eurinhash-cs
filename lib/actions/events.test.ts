/**
 * @jest-environment node
 */
const requireAdminMock = jest.fn();
const requireUserMock = jest.fn();
jest.mock('@/lib/authorization', () => ({
  requireAdmin: (...args: unknown[]) => requireAdminMock(...args),
  requireUser: (...args: unknown[]) => requireUserMock(...args),
}));

const eventCreateMock = jest.fn();
const eventUpdateMock = jest.fn();
const eventFindMock = jest.fn();
const eventDeleteMock = jest.fn();
const registrationCreateMock = jest.fn();
const registrationFindMock = jest.fn();
const registrationUpdateManyMock = jest.fn();

jest.mock('@/lib/prisma', () => ({
  __esModule: true,
  default: {
    event: {
      create: (...args: unknown[]) => eventCreateMock(...args),
      update: (...args: unknown[]) => eventUpdateMock(...args),
      findUnique: (...args: unknown[]) => eventFindMock(...args),
      delete: (...args: unknown[]) => eventDeleteMock(...args),
    },
    eventRegistration: {
      create: (...args: unknown[]) => registrationCreateMock(...args),
      findUnique: (...args: unknown[]) => registrationFindMock(...args),
      updateMany: (...args: unknown[]) => registrationUpdateManyMock(...args),
    },
  },
}));

const sendMailMock = jest.fn();
const sendEventConfirmationMock = jest.fn();
jest.mock('@/lib/mail', () => ({
  sendMail: (...args: unknown[]) => sendMailMock(...args),
  sendEventConfirmation: (...args: unknown[]) =>
    sendEventConfirmationMock(...args),
}));

jest.mock('next/cache', () => ({ revalidatePath: jest.fn() }));

jest.mock('next/server', () => {
  const actual = jest.requireActual('next/server');
  return {
    ...actual,
    after: (callback: () => unknown) => {
      void callback();
    },
  };
});

import { Prisma } from '@prisma/client';
import {
  createEvent,
  updateEvent,
  registerForEvent,
  sendEventReminders,
} from './events';

const prismaError = (code: string) =>
  new Prisma.PrismaClientKnownRequestError('internal detail', {
    code,
    clientVersion: '6.1.0',
  });

const validEvent = {
  title: 'Mon événement',
  description:
    'Une description suffisamment longue pour être acceptée par la validation',
  date: new Date('2030-01-01'),
  type: 'Webinar',
  platform: 'YouTube',
  eventUrl: 'https://example.com/event',
  registrationLink: '',
  thumbnail: '',
};

describe('actions événements', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    requireAdminMock.mockResolvedValue({
      user: { id: 'admin-1', role: 'admin' },
    });
    requireUserMock.mockResolvedValue({ id: 'user-1', role: 'user' });
  });

  describe('createEvent', () => {
    it('refuse un non-admin avant d’écrire', async () => {
      requireAdminMock.mockRejectedValue(new Error('Non autorisé'));

      await expect(createEvent(validEvent)).rejects.toThrow();
      expect(eventCreateMock).not.toHaveBeenCalled();
    });

    it('normalise le slug depuis le titre', async () => {
      eventCreateMock.mockResolvedValue({ id: 'e1' });

      await createEvent({
        ...validEvent,
        title: '  Architecture Cloud & VPS  ',
      });

      expect(eventCreateMock).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({ slug: 'architecture-cloud-vps' }),
        })
      );
    });

    it('convertit les chaînes vides en null', async () => {
      eventCreateMock.mockResolvedValue({ id: 'e1' });

      await createEvent(validEvent);

      expect(eventCreateMock).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            registrationLink: null,
            thumbnail: null,
          }),
        })
      );
    });

    it('rejette une URL invalide sans créer l’événement', async () => {
      await expect(
        createEvent({ ...validEvent, eventUrl: 'pas-une-url' })
      ).rejects.toThrow();
      expect(eventCreateMock).not.toHaveBeenCalled();
    });
  });

  describe('updateEvent', () => {
    it('valide l’identifiant avant toute requête', async () => {
      await expect(updateEvent('', { ...validEvent })).rejects.toThrow();
      await expect(
        updateEvent('x'.repeat(129), { ...validEvent })
      ).rejects.toThrow();
      expect(eventUpdateMock).not.toHaveBeenCalled();
    });

    it('refuse un non-admin', async () => {
      requireAdminMock.mockRejectedValue(new Error('Non autorisé'));

      await expect(updateEvent('e1', { ...validEvent })).rejects.toThrow();
      expect(eventUpdateMock).not.toHaveBeenCalled();
    });
  });

  describe('registerForEvent (idempotency)', () => {
    it('exige une session et ne crée rien pour un anonyme', async () => {
      requireUserMock.mockRejectedValue(new Error('Authentification requise'));

      await expect(registerForEvent('e1')).rejects.toThrow(
        'Vous devez être connecté pour vous inscrire.'
      );
      expect(registrationCreateMock).not.toHaveBeenCalled();
    });

    it('renvoie Déjà inscrit si l’inscription existe déjà', async () => {
      registrationFindMock.mockResolvedValue({ id: 'r1' });

      await expect(registerForEvent('e1')).resolves.toEqual({
        success: false,
        message: 'Déjà inscrit',
      });
      expect(registrationCreateMock).not.toHaveBeenCalled();
    });

    it('traite une violation d’unicité (course) comme Déjà inscrit', async () => {
      registrationFindMock.mockResolvedValue(null);
      registrationCreateMock.mockRejectedValue(prismaError('P2002'));

      await expect(registerForEvent('e1')).resolves.toEqual({
        success: false,
        message: 'Déjà inscrit',
      });
    });

    it('relance toute autre erreur Prisma au lieu de la masquer', async () => {
      registrationFindMock.mockResolvedValue(null);
      registrationCreateMock.mockRejectedValue(prismaError('P2025'));

      await expect(registerForEvent('e1')).rejects.toThrow();
    });

    it('limite la recherche à l’utilisateur de la session', async () => {
      registrationFindMock.mockResolvedValue(null);
      registrationCreateMock.mockResolvedValue({
        id: 'r1',
        event: { title: 'T', date: new Date(), slug: 't' },
        user: { email: 'a@b.c', name: 'A' },
      });

      await registerForEvent('e1');

      expect(registrationFindMock).toHaveBeenCalledWith({
        where: { userId_eventId: { userId: 'user-1', eventId: 'e1' } },
      });
    });
  });

  describe('sendEventReminders (idempotency)', () => {
    const registrations = [
      { id: 'r1', user: { email: 'a@b.c', name: 'A' } },
      { id: 'r2', user: { email: 'd@e.f', name: 'D' } },
    ];

    it('refuse un non-admin', async () => {
      requireAdminMock.mockRejectedValue(new Error('Non autorisé'));

      await expect(sendEventReminders('e1')).rejects.toThrow();
      expect(sendMailMock).not.toHaveBeenCalled();
    });

    it('échoue si l’événement est inconnu', async () => {
      eventFindMock.mockResolvedValue(null);

      await expect(sendEventReminders('e1')).rejects.toThrow(
        'Événement introuvable'
      );
    });

    it('n’envoie qu’aux inscriptions qui viennent d’être réservées', async () => {
      eventFindMock.mockResolvedValue({ title: 'T', registrations });
      registrationUpdateManyMock
        .mockResolvedValueOnce({ count: 1 })
        .mockResolvedValueOnce({ count: 0 });

      await sendEventReminders('e1');

      expect(registrationUpdateManyMock).toHaveBeenCalledWith({
        where: { id: 'r1', reminderSentAt: null },
        data: { reminderSentAt: expect.any(Date) },
      });
      expect(sendMailMock).toHaveBeenCalledTimes(1);
      expect(sendMailMock).toHaveBeenCalledWith(
        expect.objectContaining({ to: 'a@b.c' })
      );
    });

    it('n’envoie rien si toutes les inscriptions sont déjà traitées', async () => {
      eventFindMock.mockResolvedValue({ title: 'T', registrations });
      registrationUpdateManyMock.mockResolvedValue({ count: 0 });

      await sendEventReminders('e1');

      expect(sendMailMock).not.toHaveBeenCalled();
    });
  });
});
