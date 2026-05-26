export const dynamic = 'force-dynamic';
import { redirect } from 'next/navigation';import { appendAudit, readState, writeState } from '@/lib/local-store';
export async function POST(_:Request,context:{params:Promise<{id:string}>}){const {id}=await context.params;const state=readState();const offer=state.offers.find(o=>o.id===id);if(offer){offer.status='open';appendAudit(state,offer.seller,'offer.resume',id,'Resumed local offer.');}writeState(state);redirect('/offers/manage')}
