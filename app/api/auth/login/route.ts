import { redirect } from 'next/navigation';
import { prisma } from '@/lib/db';
import { verifyPassword } from '@/lib/auth/password';
import { createSessionForUser } from '@/lib/auth/session';
import { writeAudit } from '@/lib/repositories/audit';
import { assertRateLimit } from '@/lib/api/rate-limit';
import { verifyCsrfFromForm } from '@/lib/api/csrf';
export async function POST(req: Request) {
  assertRateLimit('auth:login', 20);
  const f = await req.formData(); await verifyCsrfFromForm(f);
  const emailOrUsername = String(f.get('email') || f.get('username') || '').trim();
  const password = String(f.get('password') || '');
  const user = await prisma.user.findFirst({ where: { OR: [{ email: emailOrUsername.toLowerCase() }, { username: emailOrUsername }] } });
  if (!user || !user.passwordHash || !user.passwordSalt || !(await verifyPassword(password, user.passwordSalt, user.passwordHash))) throw new Error('Invalid login');
  await createSessionForUser(user.id); await writeAudit(user.username, 'auth.login', user.id, 'Login succeeded.');
  redirect('/dashboard');
}
