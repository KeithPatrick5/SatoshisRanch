import { withLocalDbTransaction } from '../local-database';

export function runDatabaseWorkerSweep() {
  return withLocalDbTransaction('worker', 'sweep', (state) => {
    const now = new Date().toISOString();
    const stuck = state.trades.filter((trade) => ['WAITING_BUYER_PAYMENT','BUYER_MARKED_PAID','DISPUTED'].includes(trade.status));
    state.workerRuns.unshift({ id: `wr-${Date.now()}-sweep`, worker: 'database_sweep', status: 'ok', details: `${stuck.length} active/stuck local trades scanned. Wallet watcher remains disabled.`, createdAt: now });
    state.notifications.unshift({ id: `nt-${Date.now()}-worker`, channel: 'admin', event: 'worker.sweep.completed', recipient: 'ranch_office', status: 'queued', payload: `Scanned ${stuck.length} active/stuck trades.`, createdAt: now });
    return { activeTrades: stuck.length };
  });
}
