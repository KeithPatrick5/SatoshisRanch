export const dynamic = 'force-dynamic';
import { ok } from '@/lib/api/response';
export async function GET(){ return ok({ currency:'MXN', price: 1248000, source:'local-placeholder' }); }
