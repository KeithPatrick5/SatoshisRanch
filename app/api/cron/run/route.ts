export const dynamic = 'force-dynamic';
import { ok, fail } from '@/lib/api/response';import { runLocalWorkers } from '@/lib/workers';
export async function POST(req:Request){ const secret=req.headers.get('x-worker-secret')||''; if(process.env.WORKER_SECRET && process.env.WORKER_SECRET !== 'replace_me_for_cron_calls' && secret!==process.env.WORKER_SECRET) return fail('Bad worker secret', 401); return ok(runLocalWorkers()); }
