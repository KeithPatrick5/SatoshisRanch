import fs from 'fs';
import path from 'path';
function walk(dir, files=[]) { for (const item of fs.readdirSync(dir)) { if (['node_modules','.git','.next'].includes(item)) continue; const p=path.join(dir,item); const st=fs.statSync(p); if(st.isDirectory()) walk(p,files); else if(p.endsWith('.ts')||p.endsWith('.tsx')||p.endsWith('.mjs')) files.push(p); } return files; }

let ok=true; const banned=['local-user','local-buyer','local-seller','u-buyer-1','btc_rancher','ranch_office']; const files=walk('.').filter(f=>!f.startsWith('prisma/')&&!f.startsWith('docs/')&&!f.startsWith('data/')&&!f.startsWith('scripts/audit-no-hardcoded'));
for (const f of files) { const s=fs.readFileSync(f,'utf8'); for (const b of banned) if(s.includes(b)) { console.error(`FAIL hardcoded actor ${b} in ${f}`); ok=false; } }
if(!ok) process.exit(1); console.log('PASS no hardcoded runtime actors');
