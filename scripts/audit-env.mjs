import fs from 'fs';
let ok = true;
const env = fs.existsSync('.env.example') ? fs.readFileSync('.env.example','utf8') : '';
const required = ['NEXT_PUBLIC_APP_URL','DATABASE_URL','SESSION_SECRET','PASSWORD_PEPPER','ADMIN_EMAILS','STORAGE_PROVIDER','WORKER_SECRET','EMAIL_PROVIDER','BTC_NETWORK','BTC_WALLET_MODE','BTC_MAINNET_BROADCAST_ENABLED','BITCOIN_RPC_URL','BTC_INDEXER_URL','MAINTENANCE_MODE','TRADES_ENABLED','WITHDRAWALS_ENABLED'];
for (const key of required) { if (!env.includes(`${key}=`)) { console.error(`FAIL env missing ${key}`); ok=false; } else console.log(`PASS env ${key}`); }
if (!env.includes('BTC_MAINNET_BROADCAST_ENABLED=false')) { console.error('FAIL mainnet broadcast must default false'); ok=false; } else console.log('PASS mainnet broadcast defaults false');
if (!fs.existsSync('lib/config/env.ts')) { console.error('FAIL lib/config/env.ts missing'); ok=false; } else console.log('PASS env validator present');
if (!ok) process.exit(1);
console.log('PASS env audit');
