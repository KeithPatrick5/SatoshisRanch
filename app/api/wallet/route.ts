export const dynamic = 'force-dynamic';
import { MAINNET_BROADCAST_ENABLED, WALLET_MODE } from '@/lib/wallet';import { getWithdrawals } from '@/lib/data';export async function GET(){return Response.json({mode:WALLET_MODE, mainnetBroadcast:MAINNET_BROADCAST_ENABLED, withdrawals:getWithdrawals()});}
