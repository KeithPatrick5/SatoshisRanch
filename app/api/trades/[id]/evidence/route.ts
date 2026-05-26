export const dynamic = 'force-dynamic';
import { redirect } from 'next/navigation';import { createEvidence, readState, writeState } from '@/lib/local-store';
export async function POST(req:Request, context:{params:Promise<{id:string}>}){const {id}=await context.params;const f=await req.formData();const state=readState();createEvidence(state,{tradeId:id,uploader:String(f.get('uploader')||'local-user'),kind:String(f.get('kind')||'note'),description:String(f.get('description')||'Local evidence note')});writeState(state);redirect(`/trades/${id}`)}
