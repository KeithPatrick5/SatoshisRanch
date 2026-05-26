import { fail } from '@/lib/api/response';
export async function POST(){ return fail('Legacy local-state reset is disabled. Use npm run db:reset.', 410); }
