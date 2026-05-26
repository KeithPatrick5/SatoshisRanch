export const dynamic = 'force-dynamic';
import { runDatabaseWorkerSweep } from '@/lib/workers/db-workers';
export async function POST(){return Response.json({ok:true,result:runDatabaseWorkerSweep()});}
