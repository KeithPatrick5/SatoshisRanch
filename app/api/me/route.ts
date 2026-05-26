export const dynamic = 'force-dynamic';
import { ok } from '@/lib/api/response';import { readState } from '@/lib/local-store';
export async function GET(){ const state=readState(); return ok({ user: state.users[0] || null, source:'local-session-placeholder' }); }
