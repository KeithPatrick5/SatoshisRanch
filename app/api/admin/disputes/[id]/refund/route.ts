export const dynamic = 'force-dynamic';
import { redirect } from 'next/navigation';
import { refundTradeDb } from '@/lib/trades/db-engine';
export async function POST(_:Request, context:{params:Promise<{id:string}>}){const {id}=await context.params;try{refundTradeDb(id,'ranch_office');}catch{}redirect('/admin/disputes')}
