import { prisma } from '@/lib/db';
export const feedbackRepo = { listForUser: (username: string) => prisma.feedback.findMany({ where: { toUser: username }, orderBy: { createdAt: 'desc' } }) };
