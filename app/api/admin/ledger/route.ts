export const dynamic = 'force-dynamic';
import { ledgerAudit } from '@/lib/ledger';export async function GET(){return Response.json({groups:ledgerAudit()});}