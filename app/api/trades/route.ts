export const dynamic = 'force-dynamic';
import { getTrades } from '@/lib/data';export async function GET(){return Response.json({trades:getTrades()});}
