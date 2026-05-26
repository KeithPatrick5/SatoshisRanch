import { appendLedgerGroup, appendMessage, appendNotification } from '../local-store';
import { withLocalDbTransaction } from '../local-database';
import { canTransition, type TradeState } from '../trade-state';

function assertTransition(from: string, to: TradeState) {
  if (!canTransition(from as TradeState, to)) throw new Error(`Illegal trade transition: ${from} -> ${to}`);
}

export function markTradePaidDb(tradeId: string, actor = 'local-buyer') {
  return withLocalDbTransaction(actor, 'trade.mark_paid', (state) => {
    const trade = state.trades.find((t) => t.id === tradeId);
    if (!trade) throw new Error('Trade not found');
    assertTransition(trade.status, 'BUYER_MARKED_PAID');
    trade.status = 'BUYER_MARKED_PAID';
    trade.deadline = 'seller release required';
    appendMessage(state, tradeId, 'system', 'Buyer marked payment as sent. Seller must verify before release.', true);
    appendNotification(state, 'email', 'trade.marked_paid', trade.seller, `${tradeId}: buyer marked paid.`);
    return trade;
  });
}

export function releaseTradeDb(tradeId: string, actor = 'local-seller') {
  return withLocalDbTransaction(actor, 'trade.release', (state) => {
    const trade = state.trades.find((t) => t.id === tradeId);
    if (!trade) throw new Error('Trade not found');
    if (trade.status === 'RELEASED') throw new Error('Trade already released');
    if (!['BUYER_MARKED_PAID','WAITING_SELLER_RELEASE','ADMIN_REVIEW'].includes(trade.status)) {
      throw new Error(`Release not allowed from ${trade.status}`);
    }
    trade.status = 'RELEASED';
    trade.deadline = 'complete';
    appendLedgerGroup(state, [
      { account: `escrow:${tradeId}`, direction: 'debit', sats: trade.btcAmountSats, reason: 'database-backed fake escrow release', tradeId },
      { account: `buyer:${trade.buyer}:available`, direction: 'credit', sats: trade.buyerReceivesSats, reason: 'buyer receives fake BTC credit', tradeId },
      { account: 'platform:fee_revenue', direction: 'credit', sats: trade.feeSats, reason: 'platform fee', tradeId },
    ]);
    appendMessage(state, tradeId, 'system', 'Fake escrow released through database transaction.', true);
    appendNotification(state, 'email', 'trade.released', trade.buyer, `${tradeId}: fake BTC released.`);
    return trade;
  });
}

export function refundTradeDb(tradeId: string, actor = 'ranch_office') {
  return withLocalDbTransaction(actor, 'trade.refund', (state) => {
    const trade = state.trades.find((t) => t.id === tradeId);
    if (!trade) throw new Error('Trade not found');
    if (trade.status === 'RESOLVED_SELLER' || trade.status === 'REFUNDED') throw new Error('Trade already refunded');
    trade.status = 'RESOLVED_SELLER';
    trade.deadline = 'admin resolved';
    appendLedgerGroup(state, [
      { account: `escrow:${tradeId}`, direction: 'debit', sats: trade.btcAmountSats, reason: 'database-backed fake escrow refund', tradeId },
      { account: `seller:${trade.seller}:available`, direction: 'credit', sats: trade.btcAmountSats, reason: 'seller refunded fake escrow', tradeId },
    ]);
    appendMessage(state, tradeId, 'system', 'Admin refunded fake escrow to seller through database transaction.', true);
    appendNotification(state, 'admin', 'trade.refunded', 'ranch_office', `${tradeId}: seller refunded.`);
    return trade;
  });
}
