import fs from 'fs';
import path from 'path';
function walk(dir, files=[]) { for (const item of fs.readdirSync(dir)) { if (['node_modules','.git','.next'].includes(item)) continue; const p=path.join(dir,item); const st=fs.statSync(p); if(st.isDirectory()) walk(p,files); else if(p.endsWith('.ts')||p.endsWith('.tsx')||p.endsWith('.mjs')) files.push(p); } return files; }

let ok=true; const files=walk('.').filter(f=>!f.startsWith('scripts/')&&!f.startsWith('prisma/')&&!f.startsWith('docs/'));
for (const f of files) { const s=fs.readFileSync(f,'utf8'); if (s.includes('local-store') || s.includes('data/local-state.json') || (s.includes('fs.readFile') && f.startsWith('app/')) || (s.includes('fs.writeFile') && f.startsWith('app/'))) { console.error(`FAIL runtime local/json state reference ${f}`); ok=false; } }
if (fs.existsSync('lib/local-store.ts')) { console.error('FAIL lib/local-store.ts should not exist in active runtime'); ok=false; }
if(!ok) process.exit(1); console.log('PASS no active JSON/local-state runtime dependencies');
