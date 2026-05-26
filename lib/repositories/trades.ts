import { prisma } from '@/lib/db';
export const tradesRepo = {
  list: () => prisma.trade.findMany({ orderBy: { createdAt: 'desc' } }),
  find: (id: string) => prisma.trade.findUnique({ where: { id }, include: { messages: true, evidence: true, events: true } }),
  byUser: (username: string) => prisma.trade.findMany({ where: { OR: [{ buyer: username }, { seller: username }] }, orderBy: { createdAt: 'desc' } }),
};
