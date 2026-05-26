export const dynamic='force-dynamic';
import { assertLocalDbReady } from '@/lib/local-database';
export async function GET(){return Response.json(assertLocalDbReady());}
