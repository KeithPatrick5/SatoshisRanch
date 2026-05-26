export const NOTIFICATION_EVENTS = [
  'trade.opened','escrow.locked','buyer.marked_paid','seller.released','dispute.opened','admin.resolved','withdrawal.requested','withdrawal.sent','risk.flagged','worker.failed'
];
export type MockNotification = { channel:'email'|'telegram'|'admin'; event:string; to:string; body:string };
export const mockOutbox: MockNotification[] = [
  { channel:'telegram', event:'trade.opened', to:'btc_rancher', body:'New trade SR-10001 opened.' },
  { channel:'admin', event:'dispute.opened', to:'ranch_office', body:'Dispute opened on SR-10002.' }
];
