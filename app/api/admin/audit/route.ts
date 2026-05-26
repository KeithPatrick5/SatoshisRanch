export const dynamic = 'force-dynamic';
import { getAuditLogs } from '@/lib/data';export async function GET(){return Response.json({auditLogs:getAuditLogs()});}
