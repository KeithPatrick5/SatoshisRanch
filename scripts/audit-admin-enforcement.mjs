import fs from 'fs';
import path from 'path';
function walk(dir, files=[]) { for (const item of fs.readdirSync(dir)) { if (['node_modules','.git','.next'].includes(item)) continue; const p=path.join(dir,item); const st=fs.statSync(p); if(st.isDirectory()) walk(p,files); else if(p.endsWith('.ts')||p.endsWith('.tsx')||p.endsWith('.mjs')) files.push(p); } return files; }

let ok=true; const files=walk('app/api/admin');
for (const f of files) { const s=fs.readFileSync(f,'utf8'); if (s.includes('export async function') && !(s.includes('requireAdmin') || s.includes('WORKER_SECRET') || s.includes('x-worker-secret'))) { console.error(`FAIL admin route lacks requireAdmin/worker secret: ${f}`); ok=false; } else console.log(`PASS admin enforcement ${f}`); }
if(!ok) process.exit(1); console.log('PASS admin API enforcement audit');
