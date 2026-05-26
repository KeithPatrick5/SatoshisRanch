export async function planWithdrawal(address:string, sats:number){ return { address, sats, broadcast: false, reason: 'Planning only; broadcast disabled.' }; }
