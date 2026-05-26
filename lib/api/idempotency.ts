const seen = new Set<string>();
export function claimIdempotencyKey(key:string){ if(seen.has(key)) return false; seen.add(key); return true; }
