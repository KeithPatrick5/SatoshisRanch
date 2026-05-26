import type { Trade, User } from '../types';
export function scoreTradeRisk(trade: Trade, buyer?: User, seller?: User) {
  let score = 0; const reasons: string[] = [];
  if (trade.risk === 'high') { score += 50; reasons.push('existing high risk flag'); }
  if ((buyer?.trades || 0) < 3) { score += 15; reasons.push('new buyer'); }
  if ((seller?.disputeRate || 0) > 2) { score += 20; reasons.push('seller dispute rate elevated'); }
  if (trade.fiatAmount > 5000) { score += 15; reasons.push('larger local trade'); }
  return { score, level: score >= 60 ? 'high' : score >= 25 ? 'medium' : 'low', reasons };
}
