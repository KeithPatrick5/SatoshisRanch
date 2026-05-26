export const dynamic = 'force-dynamic';
import { redirect } from 'next/navigation';import { appendAudit, readState, writeState } from '@/lib/local-store';
export async function POST(){const state=readState();for(const s of state.sessions){if(!s.revokedAt)s.revokedAt=new Date().toISOString()}appendAudit(state,'local-user','auth.logout','sessions','Revoked all local sessions.');writeState(state);redirect('/login')}
