import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

/**
 * Returns the current user from the trusted server-side session, or null.
 * Never trust client-provided role/identity — this is the authoritative source.
 */
export async function getCurrentUser() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return session?.user ?? null;
}

/** Requires an authenticated user; throws otherwise. */
export async function requireUser() {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error('Authentification requise');
  }
  return user;
}

/** Requires an authenticated admin; returns the session. */
export async function requireAdmin() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || session.user.role !== 'admin') {
    throw new Error('Non autorisé');
  }

  return session;
}
