import { prisma } from '@/lib/db';
export async function calculateTraderStats(username: string) {
  const [trades, feedback, disputes] = await Promise.all([
    prisma.trade.findMany({ where: { OR: [{ buyer: username }, { seller: username }] } }),
    prisma.feedback.findMany({ where: { toUser: username } }),
    prisma.dispute.findMany({ where: { trade: { OR: [{ buyer: username }, { seller: username }] } } })
  ]);
  const positive = feedback.filter(f => f.rating > 0).length;
  const negative = feedback.filter(f => f.rating < 0).length;
  const completed = trades.filter(t => ['RELEASED','RESOLVED_BUYER'].includes(t.status)).length;
  return { trades: trades.length, completed, positive, negative, disputeRate: trades.length ? disputes.length / trades.length : 0, volumeSats: trades.reduce((s,t)=>s+t.btcAmountSats,0) };
}
