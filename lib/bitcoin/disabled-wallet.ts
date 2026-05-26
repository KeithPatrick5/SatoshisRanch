import type { BitcoinWalletAdapter } from './types';
export const disabledWallet: BitcoinWalletAdapter = {
  network: 'regtest',
  async getDepositAddress(label) { return { address: `bcrt1disabled${label.replace(/[^a-z0-9]/gi,'').toLowerCase()}`.slice(0, 42), network: 'regtest', label }; },
  async broadcastWithdrawal() { throw new Error('Bitcoin broadcast disabled by Satoshi Ranch safety gate.'); },
};
