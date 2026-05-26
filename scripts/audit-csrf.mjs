import fs from 'fs';
import path from 'path';
function walk(dir, files=[]) { for (const item of fs.readdirSync(dir)) { if (['node_modules','.git','.next'].includes(item)) continue; const p=path.join(dir,item); const st=fs.statSync(p); if(st.isDirectory()) walk(p,files); else if(p.endsWith('.ts')||p.endsWith('.tsx')||p.endsWith('.mjs')) files.push(p); } return files; }

let ok=true; const routes=walk('app/api').filter(f=>fs.readFileSync(f,'utf8').includes('export async function POST') && !f.includes('/cron/') && !f.includes('/health/'));
for (const f of routes) { const s=fs.readFileSync(f,'utf8'); if(!(s.includes('verifyCsrfFromForm') || f.includes('/auth/2fa/') || f.includes('local-state/reset'))) { console.error(`FAIL POST route lacks CSRF validation/exemption: ${f}`); ok=false; } else console.log(`PASS csrf ${f}`); }
if(!ok) process.exit(1); console.log('PASS CSRF audit');
