import { ok } from '@/lib/api/response';import { requireAdmin } from '@/lib/auth/session';
export async function GET(){await requireAdmin();return ok({status:'admin route protected'});}
