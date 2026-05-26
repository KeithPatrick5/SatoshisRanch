import type { Trade, User } from '../types';
export function canActOnTrade(user: User, trade: Trade, action: string){ if(user.role==='admin') return true; if(action==='release') return user.username===trade.seller; if(['mark-paid','cancel','feedback','evidence'].includes(action)) return user.username===trade.buyer || user.username===trade.seller; return false; }
