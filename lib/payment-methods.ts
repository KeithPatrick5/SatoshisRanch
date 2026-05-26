export const PAYMENT_METHOD_POLICY = [
  { name:'SPEI bank transfer', status:'allowed', risk:'medium', notes:'Mexico bank transfer. Require matching account name.' },
  { name:'Cash deposit', status:'restricted', risk:'high', notes:'Manual seller approval. Receipts can be faked.' },
  { name:'Wise', status:'allowed', risk:'medium', notes:'Require sender identity match.' },
  { name:'Zelle approved traders', status:'restricted', risk:'high', notes:'Approved traders only. Reversal and account-name mismatch risk.' },
  { name:'Gift cards', status:'blocked', risk:'extreme', notes:'Not allowed at launch.' },
  { name:'PayPal', status:'blocked', risk:'extreme', notes:'Chargeback risk, not allowed at launch.' }
] as const;
