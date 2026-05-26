export type LimitTier = 'new_buyer'|'trusted_buyer'|'approved_seller'|'manual_seller';
export const LIMITS: Record<LimitTier,{maxTradeUsd:number; maxDailyUsd:number; withdrawalHoldHours:number}> = {
  new_buyer: { maxTradeUsd: 25, maxDailyUsd: 100, withdrawalHoldHours: 24 },
  trusted_buyer: { maxTradeUsd: 100, maxDailyUsd: 500, withdrawalHoldHours: 12 },
  approved_seller: { maxTradeUsd: 500, maxDailyUsd: 2500, withdrawalHoldHours: 0 },
  manual_seller: { maxTradeUsd: 2500, maxDailyUsd: 10000, withdrawalHoldHours: 0 }
};
