import { ok } from '@/lib/api/response';
import { getCurrentUser } from '@/lib/auth/session';
export async function GET(){ const user = await getCurrentUser(); return ok({ user }); }
