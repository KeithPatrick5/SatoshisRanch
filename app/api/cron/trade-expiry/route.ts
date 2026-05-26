export const dynamic = 'force-dynamic';
import { ok } from '@/lib/api/response';import { runTradeExpiryWorker } from '@/lib/workers/trade-expiry';
export async function POST(){ return ok(runTradeExpiryWorker()); }
