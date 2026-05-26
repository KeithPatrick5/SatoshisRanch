export const dynamic = 'force-dynamic';
import { ok } from '@/lib/api/response';import { disabledWallet } from '@/lib/bitcoin/disabled-wallet';
export async function POST(){ return ok(await disabledWallet.getDepositAddress('local-user')); }
