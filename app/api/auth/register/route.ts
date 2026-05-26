import { redirect } from 'next/navigation';
import { prisma } from '@/lib/db';
import { hashPassword } from '@/lib/auth/password';
import { createSessionForUser } from '@/lib/auth/session';
import { writeAudit } from '@/lib/repositories/audit';
import { assertRateLimit } from '@/lib/api/rate-limit';
import { verifyCsrfFromForm } from '@/lib/api/csrf';
export async function POST(req: Request) {
  assertRateLimit('auth:register', 10);
  const f = await req.formData(); await verifyCsrfFromForm(f);
  const email = String(f.get('email') || '').trim().toLowerCase();
  const username = String(f.get('username') || email.split('@')[0] || '').trim();
  const password = String(f.get('password') || 'local-password');
  const { hash, salt } = await hashPassword(password);
  const user = await prisma.user.create({ data: { id: `u-${Date.now()}`, email, username, passwordHash: hash, passwordSalt: salt, role: 'user', country: 'Mexico', region: 'Local', status: 'active', sellerStatus: 'not_applied' } });
  await createSessionForUser(user.id); await writeAudit(user.username, 'auth.register', user.id, 'Registered DB-backed local user.');
  redirect('/dashboard');
}
