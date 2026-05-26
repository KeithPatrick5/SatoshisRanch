import type { BitcoinWalletAdapter } from './types';
export const testnetWallet: BitcoinWalletAdapter = { network:'testnet', async getDepositAddress(label){ throw new Error(`Testnet wallet adapter shell present but not configured for ${label}.`); }, async broadcastWithdrawal(){ throw new Error('Testnet broadcasting requires explicit wallet env setup.'); } };
