import fs from 'fs';
let ok = true;
const files = ['lib/db.ts','lib/repositories/users.ts','lib/repositories/offers.ts','lib/repositories/trades.ts','lib/repositories/ledger.ts','lib/repositories/wallet.ts','prisma/schema.prisma'];
for (const f of files) { if (!fs.existsSync(f)) { console.error(`FAIL db file missing ${f}`); ok=false; } else console.log(`PASS db file ${f}`); }
const schema = fs.readFileSync('prisma/schema.prisma','utf8');
for (const model of ['User','Offer','Trade','LedgerEntry','Dispute','AuditLog']) { if (!schema.includes(`model ${model}`)) { console.error(`FAIL schema missing ${model}`); ok=false; } else console.log(`PASS schema model ${model}`); }
if (!ok) process.exit(1);
console.log('PASS db audit');

if (!fs.existsSync('prisma/seed.ts')) throw new Error('Missing prisma/seed.ts');
console.log('PASS db file prisma/seed.ts');

const schemaText = fs.readFileSync('prisma/schema.prisma','utf8');
if (!schemaText.includes('provider = "sqlite"')) throw new Error('Prisma schema must default to sqlite for local turnkey build');
console.log('PASS sqlite local datasource');
