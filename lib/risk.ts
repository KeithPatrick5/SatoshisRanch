import { riskRepo } from '@/lib/repositories/risk';
export async function riskForTrade(tradeId:string){ return riskRepo.forTrade(tradeId); }
export async function riskScore(tradeId:string){ const flags=await riskRepo.forTrade(tradeId); return flags.reduce((s,f)=>s+(f.severity==='high'?60:f.severity==='medium'?30:10),0); }
export function riskLabel(score:number){ return score>=80?'critical':score>=50?'high':score>=20?'watch':'low'; }
