export const dynamic = 'force-dynamic';
import { getTrades } from '@/lib/data';export async function GET(){return Response.json({disputes:getTrades().filter(t=>t.status==='DISPUTED'||t.status==='ADMIN_REVIEW')});}
