import fs from 'fs';
let ok = true;
const routes = ['app/api/me/route.ts','app/api/auth/2fa/setup/route.ts','app/api/auth/2fa/verify/route.ts','app/api/markets/offers/route.ts','app/api/markets/offers/[id]/route.ts','app/api/traders/[username]/route.ts','app/api/price/btc/route.ts','app/api/wallet/deposit-address/route.ts','app/api/wallet/transactions/route.ts','app/api/cron/run/route.ts','app/api/cron/trade-expiry/route.ts','app/api/cron/ledger-reconcile/route.ts','app/api/cron/wallet-watch/route.ts','app/api/cron/notifications/route.ts','app/api/offers/[id]/route.ts','app/api/offers/[id]/archive/route.ts'];
for (const r of routes) { if (!fs.existsSync(r)) { console.error(`FAIL route missing ${r}`); ok=false; } else console.log(`PASS route ${r}`); }
if (!ok) process.exit(1);
console.log('PASS route audit');
