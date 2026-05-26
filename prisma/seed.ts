import { PrismaClient } from '@prisma/client';
import users from '../data/users.json';
import offers from '../data/offers.json';
import trades from '../data/trades.json';
import ledger from '../data/ledger.json';
import riskFlags from '../data/risk-flags.json';

const prisma = new PrismaClient();
const now = new Date();

async function main() {
  await prisma.idempotencyKey.deleteMany();
  await prisma.workerRun.deleteMany();
  await prisma.notificationEvent.deleteMany();
  await prisma.auditLog.deleteMany();
  await prisma.riskFlag.deleteMany();
  await prisma.feedback.deleteMany();
  await prisma.btcWithdrawal.deleteMany();
  await prisma.btcDeposit.deleteMany();
  await prisma.ledgerEntry.deleteMany();
  await prisma.ledgerGroup.deleteMany();
  await prisma.walletAccount.deleteMany();
  await prisma.dispute.deleteMany();
  await prisma.tradeEvent.deleteMany();
  await prisma.tradeAttachment.deleteMany();
  await prisma.tradeMessage.deleteMany();
  await prisma.trade.deleteMany();
  await prisma.offer.deleteMany();
  await prisma.sellerApplication.deleteMany();
  await prisma.session.deleteMany();
  await prisma.user.deleteMany();

  for (const user of users as any[]) {
    await prisma.user.create({ data: {
      id: user.id,
      email: `${user.username}@satoshisranch.local`,
      username: user.username,
      passwordHash: 'local-dev-seeded-change-before-production',
      passwordSalt: 'local-dev',
      role: user.role,
      country: user.country,
      region: user.region,
      status: user.status,
      sellerStatus: user.sellerStatus,
      trades: user.trades,
      positive: user.positive,
      negative: user.negative,
      disputeRate: user.disputeRate,
      avgReleaseMinutes: user.avgReleaseMinutes,
      badgesJson: JSON.stringify(user.badges ?? []),
      riskLevel: user.riskLevel,
      lastSeen: user.lastSeen,
    }});
    await prisma.walletAccount.create({ data: { id: `wa-${user.id}`, userId: user.id, asset: 'BTC' }});
  }

  for (const offer of offers as any[]) {
    await prisma.offer.create({ data: {
      id: offer.id,
      sellerId: offer.sellerId,
      seller: offer.seller,
      status: offer.status,
      country: offer.country,
      currency: offer.currency,
      paymentMethod: offer.paymentMethod,
      price: offer.price,
      marginBps: offer.marginBps,
      minFiat: offer.minFiat,
      maxFiat: offer.maxFiat,
      availableSats: offer.availableSats,
      rating: offer.rating,
      release: offer.release,
      terms: offer.terms,
    }});
  }

  for (const trade of trades as any[]) {
    await prisma.trade.create({ data: {
      id: trade.id,
      offerId: trade.offerId,
      buyer: trade.buyer,
      seller: trade.seller,
      status: trade.status,
      currency: trade.currency,
      fiatAmount: trade.fiatAmount,
      btcAmountSats: trade.btcAmountSats,
      feeSats: trade.feeSats,
      buyerReceivesSats: trade.buyerReceivesSats,
      paymentMethod: trade.paymentMethod,
      deadline: trade.deadline,
      risk: trade.risk,
    }});
  }

  const groups = new Map<string, any[]>();
  for (const entry of ledger as any[]) {
    if (!groups.has(entry.group)) groups.set(entry.group, []);
    groups.get(entry.group)!.push(entry);
  }
  for (const [groupId, entries] of groups) {
    await prisma.ledgerGroup.create({ data: { id: groupId, reason: entries[0]?.reason ?? 'seeded ledger group' }});
    for (let i = 0; i < entries.length; i++) {
      const entry = entries[i];
      await prisma.ledgerEntry.create({ data: {
        id: `${groupId}-${i + 1}`,
        groupId,
        account: entry.account,
        direction: entry.direction,
        sats: entry.sats,
        reason: entry.reason,
        tradeId: entry.tradeId ?? null,
        withdrawalId: entry.withdrawalId ?? null,
        depositId: entry.depositId ?? null,
      }});
    }
  }

  for (const flag of riskFlags as any[]) {
    await prisma.riskFlag.create({ data: {
      id: flag.id,
      userId: flag.user ?? null,
      tradeId: flag.tradeId ?? null,
      flagType: flag.type,
      severity: flag.severity,
      details: flag.details,
      status: 'open',
    }});
  }

  await prisma.sellerApplication.create({ data: {
    id: 'sa-1001',
    userId: 'u-buyer-1',
    username: 'northbank',
    status: 'pending',
    markets: 'Mexico MXN, SPEI only',
    paymentMethods: 'SPEI bank transfer',
    expectedVolume: '500-2500 MXN/day local test',
    notes: 'Seed application used to test admin approval workflow.',
  }});

  await prisma.auditLog.create({ data: {
    id: 'al-seed-1',
    actor: 'system',
    action: 'db.seed',
    target: 'local-sqlite',
    details: 'Seeded Satoshi Ranch local database with demo marketplace state.',
  }});

  await prisma.notificationEvent.create({ data: {
    id: 'nt-seed-1',
    channel: 'admin',
    event: 'db.seeded',
    recipient: 'ranch_office',
    status: 'queued',
    payload: 'Local SQLite database seeded.',
  }});

  await prisma.workerRun.create({ data: {
    id: 'wr-seed-1',
    worker: 'ledger_reconciliation',
    status: 'ok',
    details: 'Seed ledger groups are balanced.',
  }});

  console.log('Seeded Satoshi Ranch local SQLite database.');
}

main().finally(async () => prisma.$disconnect());
