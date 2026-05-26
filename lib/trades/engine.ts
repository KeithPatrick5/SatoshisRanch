import { db } from '../db';
import { appendAudit, appendMessage, appendNotification } from '../local-store';
import { canTransition, type TradeState } from '../trade-state';
import { postLedgerGroup } from '../ledger/engine';

export function transitionTrade(tradeId: string, next: TradeState, actor = 'local-engine') {
  return db.transaction((state) => {
    const trade = state.trades.find((t) => t.id === tradeId);
    if (!trade) throw new Error(`Trade ${tradeId} not found`);
    const current = trade.status as TradeState;
    if (!canTransition(current, next)) throw new Error(`Illegal transition ${current} -> ${next}`);
    trade.status = next;
    appendAudit(state, actor, 'trade.transition', tradeId, `${current} -> ${next}`);
    appendMessage(state, tradeId, 'system', `${actor} moved trade ${current} -> ${next}.`, true);
    return trade;
  });
}

export function releaseTradeLocal(tradeId: string, actor = 'local-engine') {
  return db.transaction((state) => {
    const trade = state.trades.find((t) => t.id === tradeId);
    if (!trade) throw new Error(`Trade ${tradeId} not found`);
    trade.status = 'RELEASED';
    trade.deadline = 'complete';
    postLedgerGroup(state, [
      { account: `escrow:${tradeId}`, direction: 'debit', sats: trade.btcAmountSats, reason: 'engine local release', tradeId },
      { account: `buyer:${trade.buyer}:available`, direction: 'credit', sats: trade.buyerReceivesSats, reason: 'engine buyer credit', tradeId },
      { account: 'platform:fee_revenue', direction: 'credit', sats: trade.feeSats, reason: 'engine platform fee', tradeId },
    ]);
    appendAudit(state, actor, 'trade.release.engine', tradeId, 'Released fake escrow through trade engine.');
    appendNotification(state, 'admin', 'trade.release.engine', 'ranch_office', `${tradeId} released locally.`);
    return trade;
  });
}
