jest.mock('next/headers', () => ({
  headers: jest.fn(async () => new Headers()),
}));

jest.mock('@/lib/auth', () => ({
  auth: {
    api: {
      getSession: jest.fn(),
    },
  },
}));

import { getCurrentUser, requireUser, requireAdmin } from '@/lib/authorization';
import { auth } from '@/lib/auth';

const getSession = auth.api.getSession as jest.Mock;

describe('authorization primitives', () => {
  beforeEach(() => getSession.mockReset());

  it('getCurrentUser returns null when no session', async () => {
    getSession.mockResolvedValue(null);
    await expect(getCurrentUser()).resolves.toBeNull();
  });

  it('requireUser throws when anonymous', async () => {
    getSession.mockResolvedValue(null);
    await expect(requireUser()).rejects.toThrow('Authentification requise');
  });

  it('requireUser returns the user when authenticated', async () => {
    getSession.mockResolvedValue({ user: { id: 'u1', role: 'user' } });
    await expect(requireUser()).resolves.toEqual({ id: 'u1', role: 'user' });
  });

  it('requireAdmin rejects non-admin users', async () => {
    getSession.mockResolvedValue({ user: { id: 'u1', role: 'user' } });
    await expect(requireAdmin()).rejects.toThrow('Non autorisé');
  });

  it('requireAdmin rejects anonymous callers', async () => {
    getSession.mockResolvedValue(null);
    await expect(requireAdmin()).rejects.toThrow('Non autorisé');
  });

  it('requireAdmin returns the session for admins', async () => {
    const session = { user: { id: 'a1', role: 'admin' } };
    getSession.mockResolvedValue(session);
    await expect(requireAdmin()).resolves.toEqual(session);
  });
});
