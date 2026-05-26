export type AppEnv = {
  appUrl: string;
  appEnv: string;
  databaseProvider: string;
  databaseUrl: string;
  adminEmails: string[];
  btcNetwork: 'regtest' | 'testnet' | 'signet' | 'mainnet';
  btcWalletMode: 'disabled' | 'bitcoin-core' | 'external-signer';
  btcMainnetBroadcastEnabled: boolean;
  workerSecret: string;
  storageProvider: 'local' | 's3';
  emailProvider: 'mock' | 'resend';
  tradesEnabled: boolean;
  withdrawalsEnabled: boolean;
  maintenanceMode: boolean;
};

function bool(value: string | undefined, fallback = false) {
  if (value === undefined || value === '') return fallback;
  return ['1', 'true', 'yes', 'on'].includes(value.toLowerCase());
}

function required(name: string, fallback?: string) {
  const value = process.env[name] || fallback;
  if (!value) throw new Error(`Missing required env var ${name}`);
  return value;
}

export function getEnv(): AppEnv {
  const env: AppEnv = {
    appUrl: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
    appEnv: process.env.APP_ENV || 'local',
    databaseProvider: process.env.DATABASE_PROVIDER || 'local-json',
    databaseUrl: process.env.DATABASE_URL || 'file:./dev.db',
    adminEmails: (process.env.ADMIN_EMAILS || 'admin@satoshisranch.local').split(',').map((v) => v.trim()).filter(Boolean),
    btcNetwork: (process.env.BTC_NETWORK || 'regtest') as AppEnv['btcNetwork'],
    btcWalletMode: (process.env.BTC_WALLET_MODE || 'disabled') as AppEnv['btcWalletMode'],
    btcMainnetBroadcastEnabled: bool(process.env.BTC_MAINNET_BROADCAST_ENABLED, false),
    workerSecret: process.env.WORKER_SECRET || 'replace_me_for_cron_calls',
    storageProvider: (process.env.STORAGE_PROVIDER || 'local') as AppEnv['storageProvider'],
    emailProvider: (process.env.EMAIL_PROVIDER || 'mock') as AppEnv['emailProvider'],
    tradesEnabled: bool(process.env.TRADES_ENABLED, true),
    withdrawalsEnabled: bool(process.env.WITHDRAWALS_ENABLED, false),
    maintenanceMode: bool(process.env.MAINTENANCE_MODE, false),
  };
  assertSafeEnv(env);
  return env;
}

export function assertSafeEnv(env = getEnv()) {
  if (env.btcNetwork === 'mainnet' && env.btcMainnetBroadcastEnabled !== true) return;
  if (env.btcNetwork === 'mainnet' && env.btcMainnetBroadcastEnabled === true) {
    if (env.appEnv !== 'production') throw new Error('Mainnet broadcast cannot run outside production.');
    required('BITCOIN_RPC_URL');
    required('BITCOIN_RPC_USERNAME');
    required('BITCOIN_RPC_PASSWORD');
    required('HOT_WALLET_MAX_SATS');
    if (bool(process.env.MAINNET_WITHDRAWALS_ENABLED, false) !== true) throw new Error('MAINNET_WITHDRAWALS_ENABLED must be explicitly true.');
  }
}

export const env = getEnv();
