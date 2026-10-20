/** @jest-environment node */
import { NextRequest } from 'next/server';
import { POST } from './route';
import { resetRateLimitStore } from '@/lib/rate-limit';
import { SITE_CONFIG } from '@/lib/config';

const createMock = jest.fn();
jest.mock('@/lib/prisma', () => ({
  __esModule: true,
  default: { contactMessage: { create: (...args: unknown[]) => createMock(...args) } },
}));

const notificationMock = jest.fn();
const acknowledgementMock = jest.fn();
jest.mock('@/lib/mail', () => ({
  sendMail: jest.fn(),
  sendContactNotification: (...args: unknown[]) => notificationMock(...args),
  sendContactAcknowledgement: (...args: unknown[]) => acknowledgementMock(...args),
}));

jest.mock('next/server', () => {
  const actual = jest.requireActual('next/server');
  return {
    ...actual,
    after: (cb: () => void | Promise<void>) => {
      void cb();
    },
  };
});

function req(body: unknown, ip = '9.9.9.9') {
  return new NextRequest('http://localhost/api/contact', {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'x-forwarded-for': ip },
    body: JSON.stringify(body),
  });
}

const validBody = {
  name: '  Test User  ',
  email: 'Test.User@Example.COM',
  subject: '  Sujet  ',
  message: '  Message de test suffisamment long  ',
};

describe('POST /api/contact', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    resetRateLimitStore();
  });

  it('accepte une soumission normale et normalise les champs (DB + email)', async () => {
    const res = await POST(req(validBody));

    expect(res.status).toBe(200);
    await expect(res.json()).resolves.toEqual({
      success: true,
      message: 'Message transmis avec succès.',
    });
    expect(createMock).toHaveBeenCalledTimes(1);
    expect(createMock).toHaveBeenCalledWith({
      data: {
        name: 'Test User',
        email: 'test.user@example.com',
        subject: 'Sujet',
        message: 'Message de test suffisamment long',
      },
    });
    expect(notificationMock).toHaveBeenCalledTimes(1);
    expect(notificationMock).toHaveBeenCalledWith(
      expect.objectContaining({
        name: validBody.name,
        email: validBody.email,
        message: validBody.message,
      })
    );
    expect(acknowledgementMock).toHaveBeenCalledTimes(1);
  });

  it('remplace un sujet vide par « Sans objet »', async () => {
    const res = await POST(req({ ...validBody, subject: '' }));

    expect(res.status).toBe(200);
    expect(createMock).toHaveBeenCalledWith({
      data: expect.objectContaining({ subject: 'Sans objet' }),
    });
  });

  it('accepte une soumission sans sujet et utilise aussi « Sans objet »', async () => {
    const { subject: _subject, ...withoutSubject } = validBody;
    const res = await POST(req(withoutSubject));

    expect(res.status).toBe(200);
    expect(createMock).toHaveBeenCalledWith({
      data: expect.objectContaining({ subject: 'Sans objet' }),
    });
  });

  it('rejette un honeypot rempli sans effet de bord', async () => {
    const res = await POST(req({ ...validBody, website: 'http://spam.example' }));

    expect(res.status).toBe(200);
    await expect(res.json()).resolves.toEqual(
      expect.objectContaining({ success: true })
    );
    expect(createMock).not.toHaveBeenCalled();
    expect(notificationMock).not.toHaveBeenCalled();
    expect(acknowledgementMock).not.toHaveBeenCalled();
  });

  it('accepte un honeypot vide comme un champ absent', async () => {
    const res = await POST(req({ ...validBody, website: '' }));

    expect(res.status).toBe(200);
    expect(createMock).toHaveBeenCalledTimes(1);
  });

  it('rejette au-delà du seuil de rate limiting', async () => {
    const { maxRequests } = SITE_CONFIG.rateLimit;

    for (let i = 0; i < maxRequests; i++) {
      expect((await POST(req(validBody))).status).toBe(200);
    }

    const res = await POST(req(validBody));

    expect(res.status).toBe(429);
    expect(res.headers.get('Retry-After')).toBeTruthy();
    expect(Number(res.headers.get('Retry-After'))).toBeGreaterThan(0);
    // La requête refusée ne doit pas écrire en base.
    expect(createMock).toHaveBeenCalledTimes(maxRequests);
  });

  it('isole le rate limiting par IP', async () => {
    const { maxRequests } = SITE_CONFIG.rateLimit;

    for (let i = 0; i < maxRequests; i++) {
      await POST(req(validBody, '1.1.1.1'));
    }

    const res = await POST(req(validBody, '2.2.2.2'));

    expect(res.status).toBe(200);
  });

  it('rejette un payload invalide', async () => {
    const res = await POST(req({ name: 'x' }));

    expect(res.status).toBe(400);
    const payload = (await res.json()) as { error: string; details: string[] };
    expect(payload.error).toBe('Données invalides');
    expect(payload.details.length).toBeGreaterThan(0);
    expect(createMock).not.toHaveBeenCalled();
  });

  it('renvoie 500 si la persistance échoue', async () => {
    createMock.mockRejectedValueOnce(new Error('db down'));
    const res = await POST(req(validBody));

    expect(res.status).toBe(500);
    expect(createMock).toHaveBeenCalledTimes(1);
  });
});
