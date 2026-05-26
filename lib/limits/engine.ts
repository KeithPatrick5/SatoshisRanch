import { LIMITS } from '../limits';
import type { LimitTier } from '../limits';
import type { User } from '../types';

export function selectLimitTier(user: User): LimitTier {
  if (user.role === 'seller' || user.sellerStatus === 'approved') return 'approved_seller';
  return user.trades > 20 ? 'trusted_buyer' : 'new_buyer';
}

export function assertTradeWithinLimits(user: User, fiatAmount: number) {
  const tierName = selectLimitTier(user);
  const tier = LIMITS[tierName];
  if (fiatAmount > tier.maxTradeUsd) throw new Error(`Trade exceeds ${tierName} limit of ${tier.maxTradeUsd}`);
  return { tierName, ...tier };
}
