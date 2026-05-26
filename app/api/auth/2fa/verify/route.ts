export const dynamic = 'force-dynamic';
import { ok, fail } from '@/lib/api/response';import { verifyTotpPlaceholder } from '@/lib/auth/2fa';
export async function POST(req:Request){ const body=await req.json().catch(()=>({})); return verifyTotpPlaceholder(String(body.code||'')) ? ok({ verified:true }) : fail('Invalid local TOTP placeholder code', 400); }
