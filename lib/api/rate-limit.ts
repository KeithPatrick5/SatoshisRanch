const hits = new Map<string, number>();
export function localRateLimit(key:string, max=60){ const next=(hits.get(key)||0)+1; hits.set(key,next); if(next>max) throw new Error('Rate limit exceeded in local guard'); }
