export const dynamic = 'force-dynamic';
import { ok } from '@/lib/api/response';import { runLedgerReconciliationWorker } from '@/lib/workers/ledger-reconciliation';
export async function POST(){ return ok(runLedgerReconciliationWorker()); }
