import fs from 'fs';
import path from 'path';
import initialUsers from '@/data/users.json';
import initialOffers from '@/data/offers.json';
import initialTrades from '@/data/trades.json';
import initialLedger from '@/data/ledger.json';
import initialRiskFlags from '@/data/risk-flags.json';
import type { AuditLog, Evidence, Feedback, LedgerEntry, LocalSession, LocalState, NotificationEvent, Offer, SellerApplication, Trade, TradeMessage, User, WithdrawalRequest, WorkerRun } from './types';

const dataDir = path.join(process.cwd(), 'data');
const statePath = path.join(dataDir, 'local-state.json');

function seedState(): LocalState {
  const now = new Date().toISOString();
  return {
    users: (initialUsers as User[]).map((user) => ({ ...user, email: `${user.username}@satoshisranch.local`, passwordHash: user.passwordHash ?? 'local-dev-seeded-change-before-production', passwordSalt: user.passwordSalt ?? 'local-dev' })),
    offers: initialOffers as Offer[],
    trades: initialTrades as Trade[],
    ledger: initialLedger as LedgerEntry[],
    riskFlags: initialRiskFlags as any[],
    sellerApplications: [
      {
        id: 'sa-1001',
        userId: 'u-buyer-1',
        username: 'northbank',
        status: 'pending',
        markets: 'Mexico MXN, SPEI only',
        paymentMethods: 'SPEI bank transfer',
        expectedVolume: '500-2500 MXN/day local test',
        notes: 'Seed application used to test admin approval workflow.',
        createdAt: now,
      },
    ],
    tradeMessages: [
      { id: 'tm-1', tradeId: 'SR-10001', sender: 'system', body: 'Escrow has been locked in local fake mode.', system: true, createdAt: now },
      { id: 'tm-2', tradeId: 'SR-10001', sender: 'northbank', body: 'I am sending payment now.', system: false, createdAt: now },
      { id: 'tm-3', tradeId: 'SR-10001', sender: 'btc_rancher', body: 'Confirm name matches the account terms before marking paid.', system: false, createdAt: now },
      { id: 'tm-4', tradeId: 'SR-10002', sender: 'system', body: 'Trade frozen after dispute opened.', system: true, createdAt: now },
    ],
    evidence: [
      { id: 'ev-1001', tradeId: 'SR-10002', uploader: 'newtrail', kind: 'receipt', description: 'Cropped cash-deposit receipt, missing timestamp.', createdAt: now },
    ],
    feedback: [
      { id: 'fb-1001', tradeId: 'SR-10001', from: 'northbank', to: 'btc_rancher', rating: 1, comment: 'Fast local test release fixture.', createdAt: now },
    ],
    auditLogs: [
      { id: 'al-1', actor: 'system', action: 'seed.local_state', target: 'local-state', details: 'Initialized local-only Satoshi Ranch state.', createdAt: now },
    ],
    notifications: [
      { id: 'nt-1', channel: 'admin', event: 'local.seeded', recipient: 'ranch_office', status: 'queued', payload: 'Local fake state initialized.', createdAt: now },
    ],
    sessions: [],
    withdrawals: [
      { id: 'wd-1001', userId: 'u-buyer-1', address: 'tb1qlocalwithdrawonly000000000000000000000000', amountSats: 50000, feeSats: 900, status: 'pending_admin_review', createdAt: now },
    ],
    workerRuns: [
      { id: 'wr-1', worker: 'ledger_reconciliation', status: 'ok', details: 'Seed ledger groups are balanced.', createdAt: now },
      { id: 'wr-2', worker: 'wallet_watcher', status: 'disabled', details: 'Disabled until testnet phase is intentionally started.', createdAt: now },
    ],
  };
}

export function ensureLocalState() {
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
  if (!fs.existsSync(statePath)) {
    fs.writeFileSync(statePath, JSON.stringify(seedState(), null, 2));
  }
}

export function readState(): LocalState {
  ensureLocalState();
  return JSON.parse(fs.readFileSync(statePath, 'utf8')) as LocalState;
}

export function writeState(state: LocalState): LocalState {
  ensureLocalState();
  fs.writeFileSync(statePath, JSON.stringify(state, null, 2));
  return state;
}

export function resetState(): LocalState {
  const state = seedState();
  writeState(state);
  return state;
}

export function appendAudit(state: LocalState, actor: string, action: string, target: string, details: string) {
  const entry: AuditLog = { id: `al-${Date.now()}-${state.auditLogs.length + 1}`, actor, action, target, details, createdAt: new Date().toISOString() };
  state.auditLogs.unshift(entry);
  return entry;
}

export function appendNotification(state: LocalState, channel: NotificationEvent['channel'], event: string, recipient: string, payload: string) {
  const note: NotificationEvent = { id: `nt-${Date.now()}-${state.notifications.length + 1}`, channel, event, recipient, payload, status: 'queued', createdAt: new Date().toISOString() };
  state.notifications.unshift(note);
  return note;
}

export function appendMessage(state: LocalState, tradeId: string, sender: string, body: string, system = false) {
  const msg: TradeMessage = { id: `tm-${Date.now()}-${state.tradeMessages.length + 1}`, tradeId, sender, body, system, createdAt: new Date().toISOString() };
  state.tradeMessages.push(msg);
  return msg;
}

export function appendLedgerGroup(state: LocalState, entries: Omit<LedgerEntry, 'group'>[]) {
  const group = `lg-${Date.now()}`;
  entries.forEach((entry) => state.ledger.push({ group, ...entry }));
  return group;
}

export function createSession(state: LocalState, userId: string, ip = 'local', userAgent = 'local-browser') {
  const session: LocalSession = { id: `sess-${Date.now()}`, userId, ip, userAgent, createdAt: new Date().toISOString(), lastSeenAt: new Date().toISOString(), revokedAt: null };
  state.sessions.push(session);
  appendAudit(state, userId, 'auth.login', session.id, 'Local session issued.');
  return session;
}

export function upsertUser(state: LocalState, user: User) {
  const index = state.users.findIndex((u) => u.id === user.id || u.username === user.username);
  if (index >= 0) state.users[index] = user; else state.users.push(user);
  return user;
}

export function createSellerApplication(state: LocalState, input: Omit<SellerApplication, 'id' | 'createdAt' | 'status'>) {
  const app: SellerApplication = { id: `sa-${Date.now()}`, status: 'pending', createdAt: new Date().toISOString(), ...input };
  state.sellerApplications.unshift(app);
  appendAudit(state, input.username, 'seller.apply', app.id, `Markets: ${input.markets}; Methods: ${input.paymentMethods}`);
  appendNotification(state, 'admin', 'seller.application.created', 'ranch_office', `${input.username} applied to sell.`);
  return app;
}

export function createEvidence(state: LocalState, input: Omit<Evidence, 'id' | 'createdAt'>) {
  const evidence: Evidence = { id: `ev-${Date.now()}-${state.evidence.length + 1}`, createdAt: new Date().toISOString(), ...input };
  state.evidence.unshift(evidence);
  appendAudit(state, input.uploader, 'trade.evidence.upload', input.tradeId, `${input.kind}: ${input.description}`);
  appendMessage(state, input.tradeId, 'system', `${input.uploader} uploaded ${input.kind} evidence: ${input.description}`, true);
  return evidence;
}

export function createFeedback(state: LocalState, input: Omit<Feedback, 'id' | 'createdAt'>) {
  const feedback: Feedback = { id: `fb-${Date.now()}-${state.feedback.length + 1}`, createdAt: new Date().toISOString(), ...input };
  state.feedback.unshift(feedback);
  const user = state.users.find((u) => u.username === input.to || u.id === input.to);
  if (user) {
    user.trades += 1;
    if (input.rating > 0) user.positive += 1;
    if (input.rating < 0) user.negative += 1;
  }
  appendAudit(state, input.from, 'feedback.create', input.tradeId, `Rating ${input.rating} for ${input.to}.`);
  return feedback;
}

export function createWithdrawal(state: LocalState, input: Omit<WithdrawalRequest, 'id' | 'status' | 'createdAt'>) {
  const withdrawal: WithdrawalRequest = { id: `wd-${Date.now()}-${state.withdrawals.length + 1}`, status: 'pending_admin_review', createdAt: new Date().toISOString(), ...input };
  state.withdrawals.unshift(withdrawal);
  appendAudit(state, input.userId, 'wallet.withdraw.request', withdrawal.id, `${input.amountSats} sats to ${input.address}`);
  appendNotification(state, 'admin', 'wallet.withdrawal.pending', 'ranch_office', `${input.userId} requested ${input.amountSats} sats.`);
  return withdrawal;
}
