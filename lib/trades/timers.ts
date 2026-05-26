import type { Trade } from '../types';
export function isTradeExpired(trade: Trade, now = new Date()){ return trade.deadline !== 'complete' && trade.deadline !== 'resolved' && new Date(trade.deadline).getTime() < now.getTime(); }
