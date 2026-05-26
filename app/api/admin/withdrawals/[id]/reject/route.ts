export const dynamic = 'force-dynamic';
import { redirect } from 'next/navigation';import { appendAudit, readState, writeState } from '@/lib/local-store';
export async function POST(_:Request,context:{params:Promise<{id:string}>}){const {id}=await context.params;const state=readState();const w=state.withdrawals.find(x=>x.id===id);if(w){w.status='rejected';w.reviewedAt=new Date().toISOString();w.reviewedBy='ranch_office';appendAudit(state,'ranch_office','withdrawal.reject',id,'Rejected local withdrawal.');}writeState(state);redirect('/admin/wallet')}
