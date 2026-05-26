export const dynamic = 'force-dynamic';
import { redirect } from 'next/navigation';import { createWithdrawal, readState, writeState } from '@/lib/local-store';
export async function POST(req:Request){const f=await req.formData();const state=readState();createWithdrawal(state,{userId:String(f.get('userId')||'u-buyer-1'),address:String(f.get('address')||'tb1qlocalonly'),amountSats:Number(f.get('amountSats')||10000),feeSats:Number(f.get('feeSats')||900)});writeState(state);redirect('/wallet')}
