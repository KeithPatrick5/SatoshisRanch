import { redirect } from 'next/navigation';
import { getCurrentUser, revokeCurrentSession } from '@/lib/auth/session';
import { writeAudit } from '@/lib/repositories/audit';
import { verifyCsrfFromForm } from '@/lib/api/csrf';
export async function POST(req: Request){ const f = await req.formData().catch(()=>new FormData()); if(f.has('_csrf')) await verifyCsrfFromForm(f); const user = await getCurrentUser(); await revokeCurrentSession(); if(user) await writeAudit(user.username, 'auth.logout', user.id, 'Logged out.'); redirect('/login'); }
