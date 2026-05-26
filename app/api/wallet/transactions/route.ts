export const dynamic = 'force-dynamic';
import { ok } from '@/lib/api/response';import { readState } from '@/lib/local-store';
export async function GET(){ return ok({ ledger: readState().ledger }); }
