import crypto from 'crypto';
import { prisma } from '@/lib/db';

export async function requireIdempotency(req: Request, scope: string, payload: unknown = {}) {
  const key = req.headers.get('idempotency-key') || crypto.createHash('sha256').update(`${scope}:${JSON.stringify(payload)}`).digest('hex');
  const fingerprint = crypto.createHash('sha256').update(JSON.stringify(payload)).digest('hex');
  const existing = await prisma.idempotencyKey.findUnique({ where: { key } });
  if (existing && existing.scope !== scope) throw new Error('Idempotency key scope mismatch');
  if (existing && existing.result && !existing.result.includes(fingerprint)) throw new Error('Idempotency key payload mismatch');
  if (!existing) await prisma.idempotencyKey.create({ data: { key, scope, result: fingerprint } });
  return { key, existing: Boolean(existing) };
}
