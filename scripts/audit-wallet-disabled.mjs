import fs from 'fs';
let ok=true; const wallet=fs.readFileSync('lib/wallet.ts','utf8'); const disabled=fs.readFileSync('lib/bitcoin/disabled-wallet.ts','utf8');
if(!wallet.includes('MAINNET_BROADCAST_ENABLED = false')) { console.error('FAIL mainnet broadcast default missing'); ok=false; }
if(!disabled.includes('throw new Error') || !disabled.includes('broadcast')) { console.error('FAIL disabled wallet does not throw on broadcast'); ok=false; }
const approve=fs.readFileSync('app/api/admin/withdrawals/[id]/approve/route.ts','utf8');
if(!approve.includes('broadcast_disabled')) { console.error('FAIL withdrawal approval must remain broadcast_disabled'); ok=false; }
if(!ok) process.exit(1); console.log('PASS wallet disabled hardening audit');
