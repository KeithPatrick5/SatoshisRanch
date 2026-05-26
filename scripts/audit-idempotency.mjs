import fs from 'fs';
import path from 'path';
function walk(dir, files=[]) { for (const item of fs.readdirSync(dir)) { if (['node_modules','.git','.next'].includes(item)) continue; const p=path.join(dir,item); const st=fs.statSync(p); if(st.isDirectory()) walk(p,files); else if(p.endsWith('.ts')||p.endsWith('.tsx')||p.endsWith('.mjs')) files.push(p); } return files; }

let ok=true; const money=['app/api/trades/route.ts','app/api/trades/[id]/release/route.ts','app/api/trades/[id]/cancel/route.ts','app/api/trades/[id]/dispute/route.ts','app/api/trades/[id]/mark-paid/route.ts','app/api/wallet/withdraw/route.ts','app/api/admin/disputes/[id]/resolve-buyer/route.ts','app/api/admin/disputes/[id]/resolve-seller/route.ts','app/api/admin/disputes/[id]/refund/route.ts','app/api/admin/withdrawals/[id]/approve/route.ts','app/api/admin/withdrawals/[id]/reject/route.ts'];
for (const f of money) { if(!fs.existsSync(f)){console.error(`FAIL money route missing ${f}`); ok=false; continue;} const s=fs.readFileSync(f,'utf8'); if(!s.includes('requireIdempotency')) { console.error(`FAIL money route lacks idempotency: ${f}`); ok=false; } else console.log(`PASS idempotency ${f}`); }
if(!ok) process.exit(1); console.log('PASS idempotency audit');
