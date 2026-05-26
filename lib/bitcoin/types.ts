export type BitcoinNetwork = 'regtest' | 'testnet' | 'signet' | 'mainnet';
export type DepositAddress = { address: string; network: BitcoinNetwork; label: string };
export interface BitcoinWalletAdapter {
  network: BitcoinNetwork;
  getDepositAddress(label: string): Promise<DepositAddress>;
  broadcastWithdrawal(address: string, sats: number): Promise<{ txid: string }>;
}
