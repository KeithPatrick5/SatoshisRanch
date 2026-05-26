import fs from 'fs';
const entries = JSON.parse(fs.readFileSync('data/ledger.json','utf8'));
const groups = new Map();
for (const e of entries) groups.set(e.group, (groups.get(e.group)||0) + (e.direction === 'credit' ? e.sats : -e.sats));
let ok = true;
for (const [group,balance] of groups) { if (balance !== 0) { console.error(`FAIL ${group} balance ${balance}`); ok=false; } else console.log(`PASS ${group} balanced`); }
if(!ok) process.exit(1);
console.log('PASS ledger audit: all groups balanced');
