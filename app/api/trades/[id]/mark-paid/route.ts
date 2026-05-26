export const dynamic = 'force-dynamic';
import { redirect } from 'next/navigation';
import { markTradePaidDb } from '@/lib/trades/db-engine';
export async function POST(_:Request, context:{params:Promise<{id:string}>}){const {id}=await context.params;try{markTradePaidDb(id,'local-buyer');}catch{}redirect(`/trades/${id}`)}
