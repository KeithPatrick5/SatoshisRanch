import { workersRepo } from '@/lib/repositories/workers';
import { queueNotification } from '@/lib/repositories/notifications';
import { ledgerTotals } from '@/lib/repositories/ledger';
export async function runLocalWorkers(actor = 'SYSTEM') {
  const totals = await ledgerTotals();
  await workersRepo.create('ledger-reconciliation', 'completed', `Checked ${Object.keys(totals).length} ledger accounts.`);
  await workersRepo.create('wallet-watcher', 'disabled', 'Bitcoin wallet watcher remains disabled in local hardening build.');
  await queueNotification('admin', 'workers.completed', actor, 'Local DB worker scan finished.');
  return { status: 'completed', accountsChecked: Object.keys(totals).length };
}
