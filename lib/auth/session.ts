import { cookies } from 'next/headers';
import { readState } from '../local-store';

export const SESSION_COOKIE = 'sr_session';

export async function getSessionIdFromCookies() {
  const store = await cookies();
  return store.get(SESSION_COOKIE)?.value ?? null;
}

export async function getCurrentUser() {
  const sessionId = await getSessionIdFromCookies();
  if (!sessionId) return null;
  const state = readState();
  const session = state.sessions.find((s) => s.id === sessionId && !s.revokedAt);
  if (!session) return null;
  return state.users.find((u) => u.id === session.userId) ?? null;
}

export async function requireUser() {
  const user = await getCurrentUser();
  if (!user) throw new Error('Authentication required');
  if (user.status === 'suspended') throw new Error('Account suspended');
  return user;
}

export async function requireAdmin() {
  const user = await requireUser();
  if (!['admin', 'super_admin'].includes(user.role)) throw new Error('Admin access required');
  return user;
}

export async function requireSeller() {
  const user = await requireUser();
  if (user.role !== 'seller' || user.sellerStatus !== 'approved') throw new Error('Approved seller access required');
  return user;
}
