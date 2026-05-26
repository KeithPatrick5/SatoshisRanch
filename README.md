# Satoshi's Ranch

**GitHub-only local build. Do not deploy this package as a live exchange.**

Satoshi's Ranch is a LocalBitcoins-style, Bitcoin-only P2P marketplace prototype. The bible for this repo is the 30-phase Satoshi's Ranch plan: dense offer-table UI, invite-only sellers, seller-funded BTC escrow, strict trade states, double-entry ledger, admin disputes, tiny limits, fake/testnet before mainnet, and no bubbly AI design.

This build is intentionally local-first. It persists local test actions to `data/local-state.json`, but it does **not** move real BTC, touch fiat, broadcast Bitcoin transactions, or connect to production infrastructure.

## Current status

This package fixes the earlier partial verdicts with local implementations:

- Functional marketplace filters using query params.
- Local account registration and mock login/session records.
- Local seller application and admin approval/rejection workflow.
- Local offer creation plus pause/resume API routes.
- Trade-room actions for mark paid, release, dispute, cancel, messages, evidence notes, and feedback.
- Fake escrow release/refund/admin-resolution ledger mutations.
- Dispute evidence notes and admin resolution actions.
- Runtime audit log writes.
- Mock notification outbox.
- Withdrawal queue with admin review and broadcast disabled.
- Local worker scan for trade timers, disputes, ledger reconciliation, and disabled wallet watcher.
- README deployment notes, env placeholders, API surface, and TODOs.

## Run locally

```bash
npm install
npm run dev
```

Open:

```text
http://localhost:3000
```

## Audit locally

```bash
npm run audit:local
npm run build
```

The local audit runs:

```bash
npm run audit:phase
npm run audit:ledger
npm run audit:safety
npm run audit:all
npm run audit:functional
```

## Local state

The app auto-creates this file on first run:

```text
data/local-state.json
```

It stores local test accounts, offers, trades, messages, evidence notes, seller applications, feedback, audit logs, notifications, sessions, withdrawals, and worker runs.

Reset local state:

```bash
curl -X POST http://localhost:3000/api/local-state/reset
```

Or delete `data/local-state.json` and restart the app.

## Environment variables

None are required for this local build.

Future env vars that will be needed before moving beyond local fake mode:

```bash
DATABASE_URL=
SESSION_SECRET=
TOTP_ENCRYPTION_KEY=
EMAIL_FROM=
EMAIL_PROVIDER_API_KEY=
TELEGRAM_BOT_TOKEN=
TELEGRAM_ADMIN_CHAT_ID=
S3_ENDPOINT=
S3_ACCESS_KEY_ID=
S3_SECRET_ACCESS_KEY=
S3_BUCKET=
REDIS_URL=
BTC_NETWORK=testnet
BTC_RPC_URL=
BTC_RPC_USER=
BTC_RPC_PASSWORD=
ELECTRS_URL=
MEMPOOL_API_URL=
WALLET_ENCRYPTION_KEY=
ADMIN_ALLOWLIST=
```

Mainnet-specific env vars should not be added until the testnet phase passes a separate audit:

```bash
BTC_NETWORK=mainnet
MAINNET_BROADCAST_ENABLED=false
HOT_WALLET_CAP_SATS=
MANUAL_WITHDRAWAL_REVIEW_SATS=
COLD_STORAGE_POLICY_DOC_URL=
```

`MAINNET_BROADCAST_ENABLED` must remain false until a dedicated mainnet gate review is finished.

## API surface

### Health and phases

```text
GET  /api/health
GET  /api/phases
POST /api/local-state/reset
```

### Auth, local only

```text
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
```

### Seller workflow

```text
POST /api/seller/apply
POST /api/admin/seller-applications/:id/approve
POST /api/admin/seller-applications/:id/reject
```

### Offers

```text
GET  /api/offers
POST /api/offers
POST /api/offers/:id/pause
POST /api/offers/:id/resume
```

### Trades

```text
GET  /api/trades
POST /api/trades/:id/mark-paid
POST /api/trades/:id/release
POST /api/trades/:id/cancel
POST /api/trades/:id/dispute
POST /api/trades/:id/messages
POST /api/trades/:id/evidence
POST /api/trades/:id/feedback
```

### Disputes

```text
GET  /api/admin/disputes
POST /api/admin/disputes/:id/resolve-buyer
POST /api/admin/disputes/:id/resolve-seller
POST /api/admin/disputes/:id/refund
```

### Wallet, local only

```text
GET  /api/wallet
POST /api/wallet/withdraw
POST /api/admin/withdrawals/:id/approve
POST /api/admin/withdrawals/:id/reject
```

Approval does not broadcast. It only changes local status to `broadcast_disabled`.

### Admin and ops

```text
GET  /api/admin/overview
GET  /api/admin/ledger
GET  /api/admin/audit
GET  /api/admin/workers/run
POST /api/admin/workers/run
```

## Pages

```text
/
/buy-bitcoin
/login
/register
/seller/apply
/offers/:id
/offers/manage
/traders/:username
/trades
/trades/:id
/wallet
/dashboard
/phases
/phases/:slug
/admin
/admin/trades
/admin/disputes
/admin/users
/admin/wallet
/admin/ledger
/admin/risk
/admin/ops
```

## What still needs to be added

This repo is now a strong local prototype, but these items are intentionally not production-ready yet:

1. Replace local JSON state with Postgres persistence.
2. Add real password hashing, session cookies, CSRF protection, and TOTP verification.
3. Add real authorization boundaries between buyer, seller, and admin routes.
4. Add real upload storage for dispute screenshots and file hashing.
5. Add Redis-backed workers instead of request-triggered mock workers.
6. Add testnet Bitcoin watcher before any mainnet path exists.
7. Add proper UTXO management and wallet service separation.
8. Add hardware/cold-wallet policy and operational signing procedure.
9. Add email provider and Telegram bot integrations.
10. Add rate limits, IP/device clustering, and abuse controls.
11. Add full database migrations and seed scripts.
12. Add Playwright or similar browser tests.
13. Add unit tests around trade-state transitions and ledger mutations.
14. Add real admin authentication and admin allowlist.
15. Add emergency global freeze switches for trades and withdrawals.
16. Add legal/risk copy before any public launch.

## Tacos

No real tacos are required, but the build does need these before mainnet: boring audits, small limits, handpicked sellers, testnet proof, wallet isolation, dispute tooling, and zero cowboy nonsense.

## Safety rules

- No fiat custody.
- No real BTC custody in this local build.
- No mainnet broadcast path.
- No open seller signup for launch.
- No auto-release after buyer marks paid.
- No gift-card marketplace in v1.
- No hidden wallet balances that bypass the ledger.
- No package lock, `node_modules`, `.next`, or `tsconfig.tsbuildinfo` in the project zip.
