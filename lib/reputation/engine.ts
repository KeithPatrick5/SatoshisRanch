import { readState } from '../local-store';
export function calculateTraderStats(username: string) {
  const state = readState();
  const user = state.users.find((u) => u.username === username);
  const completed = state.trades.filter((t) => (t.buyer === username || t.seller === username) && t.status === 'RELEASED');
  const disputes = state.trades.filter((t) => (t.buyer === username || t.seller === username) && t.status.includes('DISPUT'));
  return { username, completedTrades: completed.length || user?.trades || 0, disputeRate: completed.length ? disputes.length / completed.length : user?.disputeRate || 0, positive: user?.positive || 0, negative: user?.negative || 0 };
}
