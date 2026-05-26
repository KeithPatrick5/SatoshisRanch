export const dynamic = 'force-dynamic';
import { redirect } from 'next/navigation';
import { appendAudit, createSession, readState, writeState } from '@/lib/local-store';
export async function POST(req:Request){const form=await req.formData();const username=String(form.get('username')||'northbank');const state=readState();const user=state.users.find(u=>u.username===username)||state.users[0];const session=createSession(state,user.id);appendAudit(state,user.username,'auth.login.local',session.id,'Local mock login accepted.');writeState(state);redirect(`/dashboard?session=${session.id}`)}
