import { prisma } from '@/lib/db';
export const workersRepo = { list: () => prisma.workerRun.findMany({ orderBy: { createdAt: 'desc' } }), create: (worker: string, status: string, details: string) => prisma.workerRun.create({ data: { id: `wr-${Date.now()}-${Math.random().toString(36).slice(2,8)}`, worker, status, details } }) };
