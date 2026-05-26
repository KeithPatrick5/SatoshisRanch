import { ok } from '@/lib/api/response';import { requireUser } from '@/lib/auth/session';import { ledgerRepo } from '@/lib/repositories/ledger';
export async function GET(){ await requireUser(); return ok({ entries: await ledgerRepo.entries() }); }
