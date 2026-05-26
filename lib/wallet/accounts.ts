import { ledgerTotals } from '@/lib/repositories/ledger';
export async function getWalletSummary(username: string) {
  const totals = await ledgerTotals();
  return {
    availableSats: Number(totals[`buyer:${username}:available`] || totals[`seller:${username}:available`] || 0),
    lockedSats: Object.entries(totals).filter(([k]) => k.startsWith('escrow:')).reduce((s, [,v]) => s + Number(v), 0),
    pendingWithdrawalSats: Number(totals[`user:${username}:pending_withdrawal`] || 0),
  };
}
