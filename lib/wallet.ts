export const WALLET_MODE = 'LOCAL_FAKE_ONLY';
export const MAINNET_BROADCAST_ENABLED = false;
export function assertNoMainnet(){
  if (MAINNET_BROADCAST_ENABLED) throw new Error('Mainnet broadcasting is disabled in local build.');
}
export function createFakeDepositAddress(userId:string){
  assertNoMainnet();
  return `tb1q-local-${userId.replace(/[^a-z0-9]/gi,'').toLowerCase()}-not-real`;
}
export function broadcastWithdrawal(){
  assertNoMainnet();
  throw new Error('No mainnet or testnet broadcast implementation exists in this package. Phase 28+ requires separate audited wallet service.');
}
