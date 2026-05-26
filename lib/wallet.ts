export const WALLET_MODE = 'disabled';
export const MAINNET_BROADCAST_ENABLED = false;
export function createFakeDepositAddress(userId:string){return `tb1qfake-${userId}-local-only`.toLowerCase()}
export async function broadcastTransaction(){throw new Error('Bitcoin broadcast is disabled in this local build')}
