export const dynamic = 'force-dynamic';
import { ok } from '@/lib/api/response';import { runNotificationsWorker } from '@/lib/workers/notifications';
export async function POST(){ return ok(runNotificationsWorker()); }
