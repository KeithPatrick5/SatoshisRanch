import { ok } from '@/lib/api/response';import { requireUser } from '@/lib/auth/session';
export async function POST(){ const user = await requireUser(); return ok({ secret:`LOCAL-TOTP-SHELL-${user.id}`, enabled:false, note:'TOTP shell only; production setup pending.' }); }
