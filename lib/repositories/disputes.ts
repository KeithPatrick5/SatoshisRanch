import { prisma } from '@/lib/db';
export const disputesRepo = { list: () => prisma.dispute.findMany({ include: { trade: true }, orderBy: { createdAt: 'desc' } }), findByTrade: (tradeId: string) => prisma.dispute.findFirst({ where: { tradeId } }) };
