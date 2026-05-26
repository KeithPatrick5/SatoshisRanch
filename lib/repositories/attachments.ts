import { prisma } from '@/lib/db';
export const attachmentsRepo = { listForTrade: (tradeId: string) => prisma.tradeAttachment.findMany({ where: { tradeId }, orderBy: { createdAt: 'desc' } }) };
