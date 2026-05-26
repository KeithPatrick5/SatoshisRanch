export const DEFAULT_FEE_BPS = 100;
export function calculateFeeSats(grossSats:number, feeBps = DEFAULT_FEE_BPS){ return Math.floor(grossSats * feeBps / 10000); }
export function buyerReceivesSats(grossSats:number, feeBps = DEFAULT_FEE_BPS){ return grossSats - calculateFeeSats(grossSats, feeBps); }
export function marginPrice(spot:number, marginBps:number){ return Math.round(spot * (1 + marginBps / 10000)); }
