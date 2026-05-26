import { getRiskFlags } from './data';
export function riskForTrade(tradeId:string){ return getRiskFlags().filter(f => f.tradeId === tradeId); }
export function riskScore(tradeId:string){
  return riskForTrade(tradeId).reduce((sum,f)=> sum + (f.severity === 'high' ? 50 : f.severity === 'medium' ? 20 : 5),0);
}
export function riskLabel(score:number){ return score >= 50 ? 'manual review' : score >= 20 ? 'watch' : 'normal'; }
