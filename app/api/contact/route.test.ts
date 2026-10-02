/**
 * @jest-environment node
 */
import { NextRequest } from 'next/server';
import { POST } from './route';
import { resetRateLimitStore } from '@/lib/rate-limit';
import { SITE_CONFIG } from '@/lib/config';

const createMock = jest.fn();
jest.mock('@/lib/prisma', () => ({
  __esModule: true,
  default: { contactMessage: { create: (...args: unknown[]) => createMock(...args) } },
}));

const mockGetCurrentUser = jest.fn();
jest.mock('@/lib/authorization', () => ({
  getCurrentUser: (...args: unknown[]) => mockGetCurrentUser(...args),
}));

const notificationMock = jest.fn();
jest.mock('@/lib/mail', () => ({
  sendMail: jest.fn(),
  sendContactNotification: (...args: unknown[]) => notificationMock(...args),
  sendContactAcknowledgement: jest.fn(),
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
  name: 'Test User',
  email: 'test@example.com',
  subject: 'Sujet',
  message: 'Message de test suffisamment long',
};

describe('POST /api/contact', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    resetRateLimitStore();
  });

  it('accepte une soumission normale (DB + email)', async () => {
    const res = await POST(req(validBody));
    expect(res.status).toBe(200);
    expect(createMock).toHaveBeenCalledTimes(1);
    expect(notificationMock).toHaveBeenCalledTimes(1);
  });

  it('lie le message à l\'utilisateur connecté', async () => {
    mockGetCurrentUser.mockResolvedValue({ id: 'u1' });
    const res = await POST(req(validBody));
    expect(res.status).toBe(200);
    expect(createMock).toHaveBeenCalledWith(
      expect.objectContaining({ data: expect.objectContaining({ userId: 'u1' }) })
    );
  });

  it('fonctionne sans utilisateur authentifié', async () => {
    mockGetCurrentUser.mockRejectedValue(new Error('no session'));
    const res = await POST(req(validBody));
    expect(res.status).toBe(200);
    expect(createMock).toHaveBeenCalledWith(
      expect.objectContaining({ data: expect.objectContaining({ userId: null }) })
    );
  });

  it('rejette un honeypot rempli sans effet de bord', async () => {
    const res = await POST(req({ ...validBody, website: 'http://spam' }));
    expect(res.status).toBe(200);
    expect(createMock).not.toHaveBeenCalled();
    expect(notificationMock).not.toHaveBeenCalled();
  });

  it('rejette au-delà du seuil de rate limiting', async () => {
    const { maxRequests } = SITE_CONFIG.rateLimit;
    for (let i = 0; i < maxRequests; i++) {
      await POST(req(validBody));
    }
    const res = await POST(req(validBody));
    expect(res.status).toBe(429);
    expect(res.headers.get('Retry-After')).toBeTruthy();
  });

  it('rejette un payload invalide', async () => {
    const res = await POST(req({ name: 'x' }));
    expect(res.status).toBe(400);
    expect(createMock).not.toHaveBeenCalled();
  });
});
