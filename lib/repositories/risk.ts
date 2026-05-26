import { prisma } from '@/lib/db';
export const riskRepo = { list: () => prisma.riskFlag.findMany({ orderBy: { createdAt: 'desc' } }), forTrade: (tradeId: string) => prisma.riskFlag.findMany({ where: { tradeId, status: 'open' } }) };
