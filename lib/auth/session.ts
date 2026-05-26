import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/db';
import crypto from 'crypto';

export const SESSION_COOKIE = 'sr_session';

export async function getSessionIdFromCookies() {
  const store = await cookies();
  return store.get(SESSION_COOKIE)?.value ?? null;
}

export async function createSessionForUser(userId: string, meta?: { ip?: string; userAgent?: string }) {
  const id = `sess-${crypto.randomBytes(18).toString('hex')}`;
  await prisma.session.create({ data: { id, userId, ip: meta?.ip ?? 'local', userAgent: meta?.userAgent ?? 'local-dev' } });
  const store = await cookies();
  store.set(SESSION_COOKIE, id, { httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production', path: '/', maxAge: 60 * 60 * 24 * 7 });
  return id;
}

export async function revokeCurrentSession() {
  const sessionId = await getSessionIdFromCookies();
  if (sessionId) await prisma.session.updateMany({ where: { id: sessionId }, data: { revokedAt: new Date() } });
  const store = await cookies();
  store.set(SESSION_COOKIE, '', { httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production', path: '/', maxAge: 0 });
}

export async function getCurrentUser() {
  const sessionId = await getSessionIdFromCookies();
  if (!sessionId) return null;
  const session = await prisma.session.findFirst({ where: { id: sessionId, revokedAt: null }, include: { user: true } });
  if (!session) return null;
  await prisma.session.update({ where: { id: session.id }, data: { lastSeenAt: new Date() } }).catch(() => null);
  return session.user;
}

export async function requireUser() {
  const user = await getCurrentUser();
  if (!user) redirect('/login');
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
