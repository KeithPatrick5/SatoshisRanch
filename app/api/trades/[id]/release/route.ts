export const dynamic = 'force-dynamic';
import { redirect } from 'next/navigation';
import { releaseTradeDb } from '@/lib/trades/db-engine';
export async function POST(_:Request, context:{params:Promise<{id:string}>}){const {id}=await context.params;try{releaseTradeDb(id,'local-seller');}catch{}redirect(`/trades/${id}`)}
