import { prisma } from '@/lib/db';
export async function queueNotification(channel: string, event: string, recipient: string, payload: string) {
  return prisma.notificationEvent.create({ data: { id: `nt-${Date.now()}-${Math.random().toString(36).slice(2,8)}`, channel, event, recipient, payload, status: 'queued' } });
}
export const notificationsRepo = { list: () => prisma.notificationEvent.findMany({ orderBy: { createdAt: 'desc' } }), queue: queueNotification };
