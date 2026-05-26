export const dynamic = 'force-dynamic';
import { ok, fail } from '@/lib/api/response';import { readState } from '@/lib/local-store';import { calculateTraderStats } from '@/lib/reputation/engine';
export async function GET(_:Request, context:{params:Promise<{username:string}>}){ const {username}=await context.params; const user=readState().users.find(u=>u.username===username); return user?ok({ user, stats: calculateTraderStats(username) }):fail('Trader not found',404); }
