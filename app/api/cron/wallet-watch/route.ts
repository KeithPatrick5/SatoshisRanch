export const dynamic = 'force-dynamic';
import { ok } from '@/lib/api/response';import { runWalletWatcherWorker } from '@/lib/workers/wallet-watcher';
export async function POST(){ return ok(runWalletWatcherWorker()); }
