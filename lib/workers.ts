import { appendAudit, appendNotification, readState, writeState } from './local-store';
import type { WorkerRun } from './types';
import { ledgerAudit } from './ledger';

function addRun(workerRuns: WorkerRun[], worker:string, status:WorkerRun['status'], details:string){
 workerRuns.unshift({ id: `wr-${Date.now()}-${workerRuns.length + 1}`, worker, status, details, createdAt: new Date().toISOString() });
}

export function runLocalWorkers(){
 const state = readState();
 const now = new Date().toISOString();
 const reviewCount = state.trades.filter(t => t.status === 'DISPUTED' || t.status === 'ADMIN_REVIEW').length;
 const stuck = state.trades.filter(t => ['WAITING_BUYER_PAYMENT','BUYER_MARKED_PAID','WAITING_SELLER_RELEASE'].includes(t.status));
 const badLedger = ledgerAudit(state.ledger).filter(g => g.balance !== 0);
 addRun(state.workerRuns, 'trade_expiry_scan', 'ok', `${stuck.length} active timer trades checked at ${now}. No local auto-release allowed.`);
 addRun(state.workerRuns, 'dispute_queue_scan', reviewCount ? 'warning' : 'ok', `${reviewCount} dispute/admin-review trades require Ranch Office attention.`);
 addRun(state.workerRuns, 'ledger_reconciliation', badLedger.length ? 'failed' : 'ok', badLedger.length ? `Unbalanced groups: ${badLedger.map(g=>g.group).join(', ')}` : 'All local ledger groups balanced.');
 addRun(state.workerRuns, 'wallet_watcher', 'disabled', 'Mainnet and testnet watchers remain disabled in this local GitHub-only build.');
 appendAudit(state, 'system', 'workers.run', 'local-workers', `Ran ${4} local worker checks.`);
 appendNotification(state, 'admin', 'workers.completed', 'ranch_office', 'Local worker scan finished.');
 writeState(state);
 return state.workerRuns.slice(0,4);
}
