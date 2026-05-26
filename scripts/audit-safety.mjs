import fs from 'fs';
import path from 'path';
const banned = ['node_modules','.next','package-lock.json','tsconfig.tsbuildinfo'];
let ok = true;
for (const b of banned) { if (fs.existsSync(b)) { console.error(`FAIL banned artifact exists: ${b}`); ok=false; } else console.log(`PASS banned artifact absent ${b}`); }
const wallet = fs.readFileSync('lib/wallet.ts','utf8');
if (!wallet.includes('MAINNET_BROADCAST_ENABLED = false')) { console.error('FAIL wallet mainnet guard missing'); ok=false; } else console.log('PASS mainnet broadcast disabled');
const sensitiveExt = ['.pem','.key','.jks','.seed'];
function walk(dir){ for (const item of fs.readdirSync(dir)) { if (['node_modules','.git','.next'].includes(item)) continue; const p=path.join(dir,item); const st=fs.statSync(p); if(st.isDirectory()) walk(p); else if(sensitiveExt.some(ext=>p.endsWith(ext))) { console.error(`FAIL sensitive file present ${p}`); ok=false; } } }
walk('.');
console.log('PASS sensitive key scan complete');
if(!ok) process.exit(1);
