import fs from 'fs';
let ok = true;
const required = [
  'lib/local-store.ts','lib/workers.ts','lib/reputation.ts',
  'app/login/page.tsx','app/register/page.tsx','app/seller/apply/page.tsx',
  'app/api/auth/login/route.ts','app/api/auth/register/route.ts','app/api/seller/apply/route.ts',
  'app/api/offers/route.ts','app/api/offers/[id]/pause/route.ts','app/api/offers/[id]/resume/route.ts',
  'app/api/trades/[id]/mark-paid/route.ts','app/api/trades/[id]/release/route.ts','app/api/trades/[id]/cancel/route.ts','app/api/trades/[id]/messages/route.ts','app/api/trades/[id]/evidence/route.ts','app/api/trades/[id]/feedback/route.ts',
  'app/api/admin/seller-applications/[id]/approve/route.ts','app/api/admin/disputes/[id]/resolve-buyer/route.ts','app/api/admin/disputes/[id]/resolve-seller/route.ts','app/api/admin/disputes/[id]/refund/route.ts',
  'app/api/admin/withdrawals/[id]/approve/route.ts','app/api/admin/workers/run/route.ts','app/api/wallet/withdraw/route.ts'
];
for (const f of required) {
  if (!fs.existsSync(f)) { console.error(`FAIL functional file missing ${f}`); ok=false; }
  else console.log(`PASS functional file ${f}`);
}
const tradeRoom = fs.readFileSync('components/TradeRoom.tsx','utf8');
for (const needle of ['mark-paid','release','dispute','messages','evidence','feedback']) {
  if (!tradeRoom.includes(needle)) { console.error(`FAIL trade room action missing ${needle}`); ok=false; }
}
const localStore = fs.readFileSync('lib/local-store.ts','utf8');
for (const needle of ['sellerApplications','tradeMessages','auditLogs','withdrawals','workerRuns','appendLedgerGroup']) {
  if (!localStore.includes(needle)) { console.error(`FAIL local store missing ${needle}`); ok=false; }
}
const readme = fs.readFileSync('README.md','utf8');
for (const needle of ['Environment variables','API surface','What still needs to be added','GitHub-only local build']) {
  if (!readme.includes(needle)) { console.error(`FAIL README missing ${needle}`); ok=false; }
}
if (!ok) process.exit(1);
console.log('PASS functional audit: partial verdict items now have local implementations');
