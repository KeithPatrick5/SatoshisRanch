import fs from 'fs';
const phases = JSON.parse(fs.readFileSync('data/phases.json','utf8'));
let ok = true;
if (phases.length !== 30) { console.error(`FAIL expected 30 phases, got ${phases.length}`); ok=false; }
for (let i=1;i<=30;i++) {
  const p = phases.find(x=>x.number===i);
  if (!p) { console.error(`FAIL missing phase ${i}`); ok=false; continue; }
  const doc = `docs/phases/${String(i).padStart(2,'0')}-${p.slug}.md`;
  if (!fs.existsSync(doc)) { console.error(`FAIL missing ${doc}`); ok=false; }
  else console.log(`PASS phase ${i}: ${p.slug}`);
}
if(!ok) process.exit(1);
console.log('PASS phase audit: all 30 phases documented and present');
