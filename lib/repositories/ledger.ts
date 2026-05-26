import { prisma } from '@/lib/db';
export type LedgerInput = { account: string; direction: 'debit'|'credit'; sats: number; reason: string; tradeId?: string; withdrawalId?: string; depositId?: string };
export async function createLedgerGroup(reason: string, entries: LedgerInput[], idempotencyKey?: string) {
  const balance = entries.reduce((sum, e) => sum + (e.direction === 'credit' ? e.sats : -e.sats), 0);
  if (balance !== 0) throw new Error(`Ledger group does not balance: ${balance}`);
  const groupId = `lg-${Date.now()}-${Math.random().toString(36).slice(2,8)}`;
  return prisma.ledgerGroup.create({ data: { id: groupId, reason, idempotencyKey, entries: { create: entries.map((e, i) => ({ id: `${groupId}-${i}`, account: e.account, direction: e.direction, sats: e.sats, reason: e.reason, tradeId: e.tradeId, withdrawalId: e.withdrawalId, depositId: e.depositId })) } }, include: { entries: true } });
}
export async function ledgerTotals() {
  const entries = await prisma.ledgerEntry.findMany();
  return entries.reduce((acc: Record<string, number>, e) => { acc[e.account] = (acc[e.account] || 0) + (e.direction === 'credit' ? e.sats : -e.sats); return acc; }, {});
}
export const ledgerRepo = { entries: () => prisma.ledgerEntry.findMany({ orderBy: { createdAt: 'desc' } }), groups: () => prisma.ledgerGroup.findMany({ include: { entries: true }, orderBy: { createdAt: 'desc' } }), createLedgerGroup, ledgerTotals };
