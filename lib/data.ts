import { listOffers } from '@/lib/repositories/offers';
import { usersRepo } from '@/lib/repositories/users';
import { tradesRepo } from '@/lib/repositories/trades';
import { ledgerRepo } from '@/lib/repositories/ledger';
import { sellerApplicationsRepo } from '@/lib/repositories/seller-applications';
import { auditRepo } from '@/lib/repositories/audit';
import { notificationsRepo } from '@/lib/repositories/notifications';
import { walletRepo } from '@/lib/repositories/wallet';
import { workersRepo } from '@/lib/repositories/workers';
import { riskRepo } from '@/lib/repositories/risk';
import { attachmentsRepo } from '@/lib/repositories/attachments';
import { prisma } from '@/lib/db';

export function formatMoney(value:number,currency='MXN'){return new Intl.NumberFormat('en-US',{style:'currency',currency}).format(value)}
export function formatSats(sats:number){return `${sats.toLocaleString()} sats`}
export function toIso(value: any){return value instanceof Date ? value.toISOString() : String(value ?? '')}
export function publicUser(u:any){return {...u, badges: JSON.parse(u.badgesJson || '[]'), createdAt: toIso(u.createdAt), updatedAt: toIso(u.updatedAt)}}
export function publicDate<T extends Record<string, any>>(row:T):T { const out:any={...row}; for(const k of Object.keys(out)) if(out[k] instanceof Date) out[k]=out[k].toISOString(); return out; }

export async function filterOffers(searchParams?:{[key:string]: string | string[] | undefined}){return (await listOffers({country:String(searchParams?.country||'Any'), currency:String(searchParams?.currency||'Any'), payment:String(searchParams?.payment||'Any'), amount:String(searchParams?.amount||'')})).map(publicDate)}
export async function findOffer(id:string){const row=await prisma.offer.findUnique({where:{id}}); return row?publicDate(row):null;}
export async function getUsers(){return (await usersRepo.list()).map(publicUser)}
export async function findUser(username:string){const row=await usersRepo.findByUsername(username); return row?publicUser(row):null;}
export async function getTrades(){return (await tradesRepo.list()).map(publicDate)}
export async function findTrade(id:string){const row=await tradesRepo.find(id); return row?publicDate(row as any):null;}
export async function getTradeMessages(id:string){return (await prisma.tradeMessage.findMany({where:{tradeId:id}, orderBy:{createdAt:'asc'}})).map(publicDate)}
export async function getEvidence(id:string){return (await attachmentsRepo.listForTrade(id)).map(publicDate)}
export async function getLedgerEntries(){return (await ledgerRepo.entries()).map(publicDate)}
export async function getSellerApplications(){return (await sellerApplicationsRepo.list()).map(publicDate)}
export async function getAuditLogs(){return (await auditRepo.list()).map(publicDate)}
export async function getNotifications(){return (await notificationsRepo.list()).map(publicDate)}
export async function getWithdrawals(){return (await walletRepo.withdrawals()).map(publicDate)}
export async function getWorkerRuns(){return (await workersRepo.list()).map(publicDate)}
export async function getRiskFlags(){return (await riskRepo.list()).map(publicDate)}
export async function getLedgerTotals(){return ledgerRepo.ledgerTotals()}
