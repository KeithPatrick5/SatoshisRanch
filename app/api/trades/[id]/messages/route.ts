export const dynamic = 'force-dynamic';
import { redirect } from 'next/navigation';import { appendAudit, appendMessage, readState, writeState } from '@/lib/local-store';
export async function POST(req:Request, context:{params:Promise<{id:string}>}){const {id}=await context.params;const f=await req.formData();const state=readState();const sender=String(f.get('sender')||'local-user');const body=String(f.get('body')||'').trim();if(body){appendMessage(state,id,sender,body,false);appendAudit(state,sender,'trade.message',id,body.slice(0,120));}writeState(state);redirect(`/trades/${id}`)}
