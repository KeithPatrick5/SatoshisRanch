import { getLedgerEntries } from './data';
import type { LedgerEntry } from './types';
export function ledgerAudit(entries: LedgerEntry[] = getLedgerEntries()){
  const groups = new Map<string, number>();
  for (const entry of entries) {
    const signed = entry.direction === 'debit' ? entry.sats : -entry.sats;
    groups.set(entry.group, (groups.get(entry.group) || 0) + signed);
  }
  return Array.from(groups.entries()).map(([group,balance])=>({group,balance}));
}
export function assertLedgerBalanced(entries: LedgerEntry[] = getLedgerEntries()){
  const bad = ledgerAudit(entries).filter(g=>g.balance!==0);
  if(bad.length) throw new Error(`Unbalanced ledger groups: ${bad.map(b=>b.group).join(', ')}`);
}
export function exposureByAccount(entries: LedgerEntry[] = getLedgerEntries()){
  const totals = new Map<string, number>();
  for (const entry of entries) {
    const signed = entry.direction === 'credit' ? entry.sats : -entry.sats;
    totals.set(entry.account, (totals.get(entry.account) || 0) + signed);
  }
  return Array.from(totals.entries()).map(([account,balance])=>({account,balance}));
}
