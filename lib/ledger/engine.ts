import type { LedgerEntry, LocalState } from '../types';
import { appendLedgerGroup } from '../local-store';

export function assertBalanced(entries: Omit<LedgerEntry, 'group'>[]) {
  const total = entries.reduce((sum, entry) => sum + (entry.direction === 'debit' ? entry.sats : -entry.sats), 0);
  if (total !== 0) throw new Error(`Ledger group is not balanced: ${total} sats`);
}
export function postLedgerGroup(state: LocalState, entries: Omit<LedgerEntry, 'group'>[]) {
  assertBalanced(entries);
  return appendLedgerGroup(state, entries);
}
