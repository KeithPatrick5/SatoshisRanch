import fs from 'fs';
const required = [
  'lib/local-database.ts',
  'lib/trades/db-engine.ts',
  'lib/auth/password.ts',
  'lib/auth/session.ts',
  'lib/storage/local.ts',
  'lib/workers/db-workers.ts',
  'prisma/schema.prisma',
  'prisma/seed.ts',
  'docs/DB_FIRST_PHASES.md',
  'docs/DB_FIRST_AUDIT_SUMMARY.md',
  'app/api/admin/db-health/route.ts'
];
for (const file of required) {
  if (!fs.existsSync(file)) throw new Error(`Missing database-first file: ${file}`);
  console.log(`PASS db-first file ${file}`);
}
const schema = fs.readFileSync('prisma/schema.prisma','utf8');
for (const model of ['Session','SellerApplication','TradeEvent','TradeAttachment','WalletAccount','LedgerGroup','NotificationEvent','WorkerRun','IdempotencyKey']) {
  if (!schema.includes(`model ${model}`)) throw new Error(`Missing schema model ${model}`);
  console.log(`PASS db-first schema model ${model}`);
}
const pkg = JSON.parse(fs.readFileSync('package.json','utf8'));
for (const script of ['db:push','db:seed','db:reset','audit:db-first']) {
  if (!pkg.scripts?.[script]) throw new Error(`Missing script ${script}`);
  console.log(`PASS db-first script ${script}`);
}
const wallet = fs.readFileSync('lib/bitcoin/disabled-wallet.ts','utf8');
if (!wallet.includes('disabled') && !wallet.includes('throw')) throw new Error('Disabled wallet guard missing');
console.log('PASS db-first keeps wallet disabled');
console.log('PASS database-first audit');
