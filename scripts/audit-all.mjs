import fs from 'fs';
let ok = true;
const required = [
'app/page.tsx','app/buy-bitcoin/page.tsx','app/offers/[id]/page.tsx','app/traders/[username]/page.tsx','app/trades/[id]/page.tsx','app/wallet/page.tsx','app/admin/page.tsx','app/login/page.tsx','app/register/page.tsx','app/seller/apply/page.tsx','app/admin/disputes/page.tsx','app/admin/ledger/page.tsx','app/admin/risk/page.tsx','app/admin/ops/page.tsx','app/phases/page.tsx','components/OfferTable.tsx','components/TradeRoom.tsx','components/AdminTables.tsx','lib/local-store.ts','lib/trade-state.ts','lib/ledger.ts','lib/wallet.ts','lib/risk.ts','lib/limits.ts','lib/notifications.ts','lib/payment-methods.ts','docs/BUILD_BIBLE.md','docs/SAFETY.md','docs/FINAL_AUDIT.md','prisma/schema.prisma'
];
for (const f of required) { if (!fs.existsSync(f)) { console.error(`FAIL required missing ${f}`); ok=false; } else console.log(`PASS required file ${f}`); }
const states = fs.readFileSync('lib/trade-state.ts','utf8');
for (const s of ['WAITING_BUYER_PAYMENT','BUYER_MARKED_PAID','DISPUTED','ADMIN_REVIEW','RESOLVED_BUYER','RESOLVED_SELLER']) { if (!states.includes(s)) { console.error(`FAIL state missing ${s}`); ok=false; } }
const css = fs.readFileSync('app/globals.css','utf8');
if (!css.includes('data-table') || !css.includes('font-size:13px')) { console.error('FAIL dense table-first CSS missing'); ok=false; } else console.log('PASS dense table-first CSS present');
const bible = fs.readFileSync('docs/BUILD_BIBLE.md','utf8');
if ((bible.match(/## Phase/g)||[]).length !== 30) { console.error('FAIL bible does not contain 30 phases'); ok=false; } else console.log('PASS bible contains 30 phases');
if(!ok) process.exit(1);
console.log('PASS final repo audit');
