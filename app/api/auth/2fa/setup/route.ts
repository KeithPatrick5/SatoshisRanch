export const dynamic = 'force-dynamic';
import { ok } from '@/lib/api/response';import { createTotpSecretPlaceholder } from '@/lib/auth/2fa';
export async function POST(){ return ok({ secret:createTotpSecretPlaceholder('local-user'), enabled:false, note:'TOTP shell only; production setup pending.' }); }
