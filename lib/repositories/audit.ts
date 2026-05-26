import { prisma } from '@/lib/db';
export async function writeAudit(actor: string, action: string, target: string, details = '', metadata: unknown = {}) {
  return prisma.auditLog.create({ data: { id: `al-${Date.now()}-${Math.random().toString(36).slice(2,8)}`, actor, action, target, details, metadata: JSON.stringify(metadata) } });
}
export const auditRepo = { list: () => prisma.auditLog.findMany({ orderBy: { createdAt: 'desc' } }), write: writeAudit };
