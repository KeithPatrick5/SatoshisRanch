export const dynamic = 'force-dynamic';
import { ok, fail } from '@/lib/api/response';import { readState } from '@/lib/local-store';
export async function GET(_:Request, context:{params:Promise<{id:string}>}){ const {id}=await context.params; const offer=readState().offers.find(o=>o.id===id); return offer?ok(offer):fail('Offer not found',404); }
