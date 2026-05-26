import { ledgerRepo } from '@/lib/repositories/ledger';
export async function ledgerAudit(){ const groups=await ledgerRepo.groups(); return groups.map(g=>({group:g.id,balance:g.entries.reduce((s,e)=>s+(e.direction==='credit'?e.sats:-e.sats),0)})); }
