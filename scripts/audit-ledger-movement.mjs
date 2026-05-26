import fs from 'fs';
import path from 'path';
function walk(dir, files=[]) { for (const item of fs.readdirSync(dir)) { if (['node_modules','.git','.next'].includes(item)) continue; const p=path.join(dir,item); const st=fs.statSync(p); if(st.isDirectory()) walk(p,files); else if(p.endsWith('.ts')||p.endsWith('.tsx')||p.endsWith('.mjs')) files.push(p); } return files; }

let ok=true; const files=['lib/trades/db-engine.ts','app/api/wallet/withdraw/route.ts'];
for (const f of files) { const s=fs.readFileSync(f,'utf8'); if(!s.includes('createLedgerGroup')) { console.error(`FAIL money movement file skips ledger engine: ${f}`); ok=false; } else console.log(`PASS ledger movement ${f}`); }
if(!ok) process.exit(1); console.log('PASS ledger movement audit');
