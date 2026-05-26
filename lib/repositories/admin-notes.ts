import { prisma } from '@/lib/db';
export const adminNotesRepo = { listForTarget: (target: string) => prisma.adminNote.findMany({ where: { target }, orderBy: { createdAt: 'desc' } }) };
