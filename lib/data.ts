import phases from '@/data/phases.json';
import { readState } from './local-store';
import type { Phase } from './types';

export const phaseList = phases as Phase[];
export function getLocalState(){ return readState(); }
export function getUsers(){ return readState().users; }
export function getOffers(){ return readState().offers; }
export function getTrades(){ return readState().trades; }
export function getLedgerEntries(){ return readState().ledger; }
export function getRiskFlags(){ return readState().riskFlags; }
export function getSellerApplications(){ return readState().sellerApplications; }
export function getTradeMessages(tradeId?:string){ const messages = readState().tradeMessages; return tradeId ? messages.filter(m => m.tradeId === tradeId) : messages; }
export function getEvidence(tradeId?:string){ const evidence = readState().evidence; return tradeId ? evidence.filter(e => e.tradeId === tradeId) : evidence; }
export function getFeedback(tradeId?:string){ const feedback = readState().feedback; return tradeId ? feedback.filter(f => f.tradeId === tradeId) : feedback; }
export function getAuditLogs(){ return readState().auditLogs; }
export function getNotifications(){ return readState().notifications; }
export function getWithdrawals(){ return readState().withdrawals; }
export function getWorkerRuns(){ return readState().workerRuns; }

export function findOffer(id:string){ return getOffers().find(o => o.id === id); }
export function findTrade(id:string){ return getTrades().find(t => t.id === id); }
export function findUser(usernameOrId:string){ return getUsers().find(u => u.username === usernameOrId || u.id === usernameOrId); }
export function findPhase(slug:string){ return phaseList.find(p => p.slug === slug || String(p.number) === slug); }
export function formatSats(sats:number){ return `${(sats/100000000).toFixed(8)} BTC`; }
export function formatMoney(value:number,currency:string){ return new Intl.NumberFormat('en-US',{style:'currency',currency}).format(value); }
export function filterOffers(searchParams?:{[key:string]: string | string[] | undefined}){
 const country = typeof searchParams?.country === 'string' ? searchParams.country : '';
 const currency = typeof searchParams?.currency === 'string' ? searchParams.currency : '';
 const payment = typeof searchParams?.payment === 'string' ? searchParams.payment : '';
 const amount = typeof searchParams?.amount === 'string' && searchParams.amount ? Number(searchParams.amount) : 0;
 return getOffers().filter(o => {
  if(country && country !== 'Any' && o.country !== country) return false;
  if(currency && currency !== 'Any' && o.currency !== currency) return false;
  if(payment && payment !== 'Any' && o.paymentMethod !== payment) return false;
  if(amount && (amount < o.minFiat || amount > o.maxFiat)) return false;
  return o.status === 'open';
 });
}
