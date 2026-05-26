import { readState } from '../local-store';
export function getWalletSummary(userId: string) {
  const state = readState();
  let available = 0, locked = 0, pending = 0;
  for (const e of state.ledger) {
    const sign = e.direction === 'credit' ? 1 : -1;
    if (e.account === `buyer:${userId}:available` || e.account === `seller:${userId}:available`) available += sign * e.sats;
    if (e.account.includes(`:${userId}:locked`) || e.account.startsWith('escrow:')) locked += sign * e.sats;
    if (e.account === `withdrawal:${userId}:pending`) pending += sign * e.sats;
  }
  return { userId, availableSats: available, lockedSats: locked, pendingWithdrawalSats: pending };
}
