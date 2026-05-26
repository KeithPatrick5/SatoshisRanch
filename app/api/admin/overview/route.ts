export const dynamic = 'force-dynamic';
import { getRiskFlags, getTrades } from '@/lib/data';export async function GET(){const trades=getTrades();const flags=getRiskFlags();return Response.json({trades:trades.length, disputes:trades.filter(t=>t.status==='DISPUTED'||t.status==='ADMIN_REVIEW').length, riskFlags:flags.length});}
