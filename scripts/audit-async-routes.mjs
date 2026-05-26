import fs from 'fs';
import path from 'path';
function walk(dir, files=[]) { for (const item of fs.readdirSync(dir)) { if (['node_modules','.git','.next'].includes(item)) continue; const p=path.join(dir,item); const st=fs.statSync(p); if(st.isDirectory()) walk(p,files); else if(p.endsWith('.ts')||p.endsWith('.tsx')||p.endsWith('.mjs')) files.push(p); } return files; }

let ok=true; for (const f of walk('app/api')) { const s=fs.readFileSync(f,'utf8'); const bad=/const\s+\w+\s*=\s*(getTrades|getRiskFlags|getWithdrawals|getLedgerTotals|getUsers|getAuditLogs|getNotifications|getWorkerRuns)\(/.test(s); if(bad && !s.includes('await get')) { console.error(`FAIL possible un-awaited repository call: ${f}`); ok=false; } }
if(!ok) process.exit(1); console.log('PASS async route audit');
