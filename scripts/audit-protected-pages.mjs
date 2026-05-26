import fs from 'fs';
import path from 'path';
function walk(dir, files=[]) { for (const item of fs.readdirSync(dir)) { if (['node_modules','.git','.next'].includes(item)) continue; const p=path.join(dir,item); const st=fs.statSync(p); if(st.isDirectory()) walk(p,files); else if(p.endsWith('.ts')||p.endsWith('.tsx')||p.endsWith('.mjs')) files.push(p); } return files; }

let ok=true; const checks=[['app/admin','requireAdmin'],['app/wallet','requireUser'],['app/dashboard','requireUser'],['app/trades','requireUser'],['app/offers/manage','requireSeller'],['app/seller/apply','requireUser']];
for (const [dir,needle] of checks) { if(!fs.existsSync(dir)) continue; for (const f of walk(dir)) { const s=fs.readFileSync(f,'utf8'); if(!s.includes(needle)) { console.error(`FAIL protected page missing ${needle}: ${f}`); ok=false; } else console.log(`PASS protected page ${f}`); } }
if(!ok) process.exit(1); console.log('PASS protected pages audit');
