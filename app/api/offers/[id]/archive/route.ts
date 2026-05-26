export const dynamic = 'force-dynamic';
import { ok, fail } from '@/lib/api/response';import { appendAudit, readState, writeState } from '@/lib/local-store';
export async function POST(_:Request, context:{params:Promise<{id:string}>}){ const {id}=await context.params; const state=readState(); const offer=state.offers.find(o=>o.id===id); if(!offer)return fail('Offer not found',404); offer.status='archived'; appendAudit(state,'local-seller','offer.archive',id,'Offer archived.'); writeState(state); return ok(offer); }
