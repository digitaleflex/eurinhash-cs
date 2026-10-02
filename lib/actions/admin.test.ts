/**
 * @jest-environment node
 */
const requireAdminMock = jest.fn();
jest.mock('@/lib/authorization', () => ({
  requireAdmin: (...args: unknown[]) => requireAdminMock(...args),
}));

const userUpdateMock = jest.fn();
const sessionDeleteManyMock = jest.fn();
const messageUpdateMock = jest.fn();
const messageDeleteMock = jest.fn();
const messageFindMock = jest.fn();
const eventDeleteMock = jest.fn();

jest.mock('@/lib/prisma', () => ({
  __esModule: true,
  default: {
    user: { update: (...args: unknown[]) => userUpdateMock(...args) },
    session: {
      deleteMany: (...args: unknown[]) => sessionDeleteManyMock(...args),
    },
    contactMessage: {
      update: (...args: unknown[]) => messageUpdateMock(...args),
      delete: (...args: unknown[]) => messageDeleteMock(...args),
      findUnique: (...args: unknown[]) => messageFindMock(...args),
    },
    event: { delete: (...args: unknown[]) => eventDeleteMock(...args) },
  },
}));

const adminReplyMock = jest.fn();
jest.mock('@/lib/mail', () => ({
  sendAdminReply: (...args: unknown[]) => adminReplyMock(...args),
}));

jest.mock('next/cache', () => ({ revalidatePath: jest.fn() }));

import { Prisma } from '@prisma/client';
import {
  updateUserRole,
  banUser,
  unbanUser,
  updateMessageStatus,
  deleteMessage,
  replyToMessage,
  deleteEventAdmin,
} from './admin';

const asAdmin = (id = 'admin-1') =>
  requireAdminMock.mockResolvedValue({ user: { id, role: 'admin' } });

describe('actions admin', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    asAdmin();
  });

  describe('updateUserRole', () => {
    it('refuse un non-admin sans toucher la base', async () => {
      requireAdminMock.mockRejectedValue(new Error('Non autorisé'));

      const result = await updateUserRole('u1', 'admin');

      expect(result).toEqual({
        success: false,
        error: 'Accès refusé - Administrateur requis',
      });
      expect(userUpdateMock).not.toHaveBeenCalled();
    });

    it('masque les erreurs Prisma au lieu de renvoyer le message brut', async () => {
      userUpdateMock.mockRejectedValue(
        new Prisma.PrismaClientKnownRequestError(
          'Foreign key violation on users',
          {
            code: 'P2003',
            clientVersion: '6.1.0',
          }
        )
      );

      const result = await updateUserRole('u1', 'admin');

      expect(result).toEqual({
        success: false,
        error: 'Erreur de base de données',
      });
    });

    it("signale une violation d'unicité sans détail technique", async () => {
      userUpdateMock.mockRejectedValue(
        new Prisma.PrismaClientKnownRequestError('Unique constraint failed', {
          code: 'P2002',
          clientVersion: '6.1.0',
        })
      );

      await expect(updateUserRole('u1', 'admin')).resolves.toEqual({
        success: false,
        error: 'Cette ressource existe déjà',
      });
    });

    it("promoque un utilisateur quand l'opérateur est admin", async () => {
      userUpdateMock.mockResolvedValue({ id: 'u1', role: 'admin' });

      const result = await updateUserRole('u1', 'admin');

      expect(userUpdateMock).toHaveBeenCalledWith({
        where: { id: 'u1' },
        data: { role: 'admin' },
      });
      expect(result.success).toBe(true);
    });
  });

  describe('banUser', () => {
    it("refuse l'auto-bannissement et ne supprime aucune session", async () => {
      asAdmin('admin-1');

      const result = await banUser('admin-1', 'erreur');

      expect(result).toEqual({
        success: false,
        error: 'Vous ne pouvez pas vous bannir vous-même',
      });
      expect(sessionDeleteManyMock).not.toHaveBeenCalled();
      expect(userUpdateMock).not.toHaveBeenCalled();
    });

    it('supprime les sessions de la cible avant de la bannir', async () => {
      const order: string[] = [];
      sessionDeleteManyMock.mockImplementation(async () => {
        order.push('sessions');
        return { count: 2 };
      });
      userUpdateMock.mockImplementation(async () => {
        order.push('ban');
        return { id: 'u1', banned: true };
      });

      const result = await banUser('u1', 'abus');

      expect(order).toEqual(['sessions', 'ban']);
      expect(sessionDeleteManyMock).toHaveBeenCalledWith({
        where: { userId: 'u1' },
      });
      expect(result.success).toBe(true);
    });

    it('laisse banExpires à null quand aucune échéance n’est fournie', async () => {
      const result = await banUser('u1', 'abus');

      expect(userUpdateMock).toHaveBeenCalledWith({
        where: { id: 'u1' },
        data: { banned: true, banReason: 'abus', banExpires: null },
      });
      expect(result.success).toBe(true);
    });

    it('persiste une échéance fournie', async () => {
      const expires = new Date('2030-01-01');

      await banUser('u1', 'abus', expires);

      expect(userUpdateMock).toHaveBeenCalledWith({
        where: { id: 'u1' },
        data: { banned: true, banReason: 'abus', banExpires: expires },
      });
    });
  });

  describe('unbanUser', () => {
    it('réinitialise banned, banReason et banExpires', async () => {
      const result = await unbanUser('u1');

      expect(userUpdateMock).toHaveBeenCalledWith({
        where: { id: 'u1' },
        data: { banned: false, banReason: null, banExpires: null },
      });
      expect(result.success).toBe(true);
    });

    it('est réservé aux admins', async () => {
      requireAdminMock.mockRejectedValue(new Error('Non autorisé'));

      await expect(unbanUser('u1')).resolves.toEqual({
        success: false,
        error: 'Accès refusé - Administrateur requis',
      });
      expect(userUpdateMock).not.toHaveBeenCalled();
    });
  });

  describe('updateMessageStatus', () => {
    it('écrit le statut demandé', async () => {
      messageUpdateMock.mockResolvedValue({ id: 'm1', status: 'read' });

      const result = await updateMessageStatus('m1', 'read');

      expect(messageUpdateMock).toHaveBeenCalledWith({
        where: { id: 'm1' },
        data: { status: 'read' },
      });
      expect(result.success).toBe(true);
    });

    it('refuse un non-admin', async () => {
      requireAdminMock.mockRejectedValue(new Error('Non autorisé'));

      await expect(updateMessageStatus('m1', 'read')).resolves.toEqual({
        success: false,
        error: 'Accès refusé - Administrateur requis',
      });
      expect(messageUpdateMock).not.toHaveBeenCalled();
    });
  });

  describe('deleteMessage', () => {
    it('supprime le message pour un admin', async () => {
      messageDeleteMock.mockResolvedValue({ id: 'm1' });

      await expect(deleteMessage('m1')).resolves.toEqual({ success: true });
      expect(messageDeleteMock).toHaveBeenCalledWith({ where: { id: 'm1' } });
    });

    it('refuse un non-admin', async () => {
      requireAdminMock.mockRejectedValue(new Error('Non autorisé'));

      await expect(deleteMessage('m1')).resolves.toEqual({
        success: false,
        error: 'Accès refusé - Administrateur requis',
      });
      expect(messageDeleteMock).not.toHaveBeenCalled();
    });
  });

  describe('replyToMessage', () => {
    it('échoue si le message n’existe pas', async () => {
      messageFindMock.mockResolvedValue(null);

      await expect(replyToMessage('inconnu', 'contenu')).resolves.toEqual({
        success: false,
        error: 'Message introuvable',
      });
      expect(adminReplyMock).not.toHaveBeenCalled();
    });

    it('ne marque pas le message comme répondu si l’envoi échoue', async () => {
      messageFindMock.mockResolvedValue({
        id: 'm1',
        email: 'a@b.c',
        name: 'A',
      });
      adminReplyMock.mockResolvedValue({ success: false });

      const result = await replyToMessage('m1', 'contenu');

      expect(result.success).toBe(false);
      expect(messageUpdateMock).not.toHaveBeenCalled();
    });

    it('marque le message comme répondu après un envoi réussi', async () => {
      messageFindMock.mockResolvedValue({
        id: 'm1',
        email: 'a@b.c',
        name: 'A',
      });
      adminReplyMock.mockResolvedValue({ success: true });
      messageUpdateMock.mockResolvedValue({ id: 'm1' });

      const result = await replyToMessage('m1', 'contenu');

      expect(messageUpdateMock).toHaveBeenCalledWith({
        where: { id: 'm1' },
        data: { status: 'replied' },
      });
      expect(result.success).toBe(true);
    });

    it('est réservé aux admins', async () => {
      requireAdminMock.mockRejectedValue(new Error('Non autorisé'));

      await expect(replyToMessage('m1', 'contenu')).resolves.toEqual({
        success: false,
        error: 'Accès refusé - Administrateur requis',
      });
      expect(messageFindMock).not.toHaveBeenCalled();
    });
  });

  describe('deleteEventAdmin', () => {
    it('supprime l’événement pour un admin', async () => {
      eventDeleteMock.mockResolvedValue({ id: 'e1' });

      await expect(deleteEventAdmin('e1')).resolves.toEqual({ success: true });
      expect(eventDeleteMock).toHaveBeenCalledWith({ where: { id: 'e1' } });
    });

    it('refuse un non-admin', async () => {
      requireAdminMock.mockRejectedValue(new Error('Non autorisé'));

      await expect(deleteEventAdmin('e1')).resolves.toEqual({
        success: false,
        error: 'Accès refusé - Administrateur requis',
      });
      expect(eventDeleteMock).not.toHaveBeenCalled();
    });
  });
});
