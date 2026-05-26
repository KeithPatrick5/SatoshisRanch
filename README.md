# Satoshi's Ranch

Satoshi's Ranch is a local-first Bitcoin P2P escrow marketplace prototype inspired by the old LocalBitcoins style of trading.

This repo is **not production-ready** and does **not** move real Bitcoin yet. It is a programmer-facing foundation for building out a Bitcoin-only P2P marketplace with seller offers, buyer trades, fake/local escrow accounting, admin dispute tools, double-entry ledger auditing, seller approvals, protected admin routes, and hard-disabled mainnet wallet safety gates.

## Current status

- DB-backed local hardening build
- SQLite/Prisma local default
- Fake BTC accounting only
- Real trade-state structure
- DB-backed auth/session foundation
- Protected admin/user/seller page scaffolding
- DB-backed offer, trade, dispute, wallet, ledger, worker, notification, and audit repositories
- Mainnet BTC disabled
- Wallet broadcast disabled
- Built for local testing and staged future integration

## Core idea

Buyer and seller agree on a fiat payment method off-platform. The seller's BTC is locked in escrow inside the platform. The buyer pays the seller directly. The seller confirms payment. The platform releases BTC to the buyer. If there is a dispute, an admin reviews the trade, chat, evidence, and ledger state, then releases or refunds.

In this local build, escrow uses fake BTC balances and local database accounting. Real Bitcoin custody is intentionally disabled.

## What is real right now

- Local marketplace UI
- DB-backed offer browsing and filtering
- DB-backed seller profiles and reputation calculations
- DB-backed seller application flow
- Admin approve/reject seller flow
- DB-backed offer create/pause/resume/archive structure
- DB-backed trade open, mark paid, release, cancel, dispute, and refund engine
- DB-backed trade chat
- Local evidence upload with file hash and type checks
- Fake escrow accounting through ledger groups
- Double-entry ledger model and audits
- Admin dashboard sections
- Admin dispute tools
- Admin user/wallet/ledger/risk/ops pages
- DB-backed notification outbox
- DB-backed worker logs
- Prisma schema and seed script
- API endpoint documentation
- Safety gates for wallet/mainnet behavior

## What is intentionally not real yet

These are staged but not enabled:

- Real Bitcoin custody
- Mainnet Bitcoin broadcast
- Testnet Bitcoin watcher
- Regtest Bitcoin Core activation
- Hosted production database
- Real S3/R2 evidence uploads
- Real email sending
- Real Telegram bot sends
- Redis-backed background workers
- Production 2FA/password reset/email verification
- Dual-admin approvals for sensitive actions

Do not turn on real Bitcoin before fake escrow, ledger, auth, admin, dispute, and database flows are fully tested.

## Local setup

```bash
npm install --no-package-lock
cp .env.example .env.local
cp .env.example .env
npm run db:push
npm run db:seed
npm run dev
```

Open:

```text
http://localhost:3000
```

## Useful commands

```bash
npm run dev
npm run build
npm run audit:local
npm run audit:hardening
npm run audit:no-json-state
npm run audit:admin-enforcement
npm run audit:protected-pages
npm run audit:idempotency
npm run audit:csrf
npm run audit:async-routes
npm run audit:no-hardcoded-actors
npm run audit:ledger-movement
npm run audit:wallet-disabled
```

Database commands:

```bash
npm run db:push
npm run db:seed
npm run db:reset
```

## Environment variables

All real secrets must live in `.env.local` or the deployment provider's secret manager.

Never commit:

- `.env`
- `.env.local`
- `.env.production`
- Private keys
- Wallet seeds
- API keys
- RPC passwords
- S3 keys
- Telegram bot tokens
- Email provider tokens

### App

```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
APP_ENV=local
NODE_ENV=development
```

### Database

```env
DATABASE_URL="file:./dev.db"
DIRECT_URL=
```

### Auth

```env
SESSION_SECRET=
PASSWORD_PEPPER=
ADMIN_EMAILS=
```

### Storage

```env
STORAGE_PROVIDER=local
S3_ENDPOINT=
S3_BUCKET=
S3_ACCESS_KEY_ID=
S3_SECRET_ACCESS_KEY=
S3_REGION=
```

### Workers

```env
WORKER_SECRET=
REDIS_URL=
```

### Email and Telegram

```env
EMAIL_PROVIDER=mock
RESEND_API_KEY=
FROM_EMAIL=no-reply@satoshisranch.local
TELEGRAM_BOT_TOKEN=
TELEGRAM_ADMIN_CHAT_ID=
```

### Bitcoin

```env
BTC_NETWORK=regtest
BTC_WALLET_MODE=disabled
BTC_MAINNET_BROADCAST_ENABLED=false
BITCOIN_RPC_URL=
BITCOIN_RPC_USERNAME=
BITCOIN_RPC_PASSWORD=
BITCOIN_RPC_WALLET=
BTC_INDEXER_URL=
```

Required wallet defaults:

```env
BTC_WALLET_MODE=disabled
BTC_MAINNET_BROADCAST_ENABLED=false
```

## API endpoints

### Public

```text
GET  /api/health
GET  /api/markets/offers
GET  /api/markets/offers/:id
GET  /api/traders/:username
GET  /api/price/btc
```

### Auth

```text
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
GET  /api/me
POST /api/auth/2fa/setup
POST /api/auth/2fa/verify
```

### Seller

```text
POST /api/seller/apply
POST /api/admin/seller-applications/:id/approve
POST /api/admin/seller-applications/:id/reject
```

### Offers

```text
GET  /api/offers
POST /api/offers
GET  /api/offers/:id
PATCH /api/offers/:id
POST /api/offers/:id/pause
POST /api/offers/:id/resume
POST /api/offers/:id/archive
```

### Trades

```text
POST /api/trades
GET  /api/trades
POST /api/trades/:id/mark-paid
POST /api/trades/:id/release
POST /api/trades/:id/cancel
POST /api/trades/:id/dispute
POST /api/trades/:id/messages
POST /api/trades/:id/evidence
POST /api/trades/:id/feedback
```

### Wallet

```text
GET  /api/wallet
POST /api/wallet/deposit-address
POST /api/wallet/withdraw
GET  /api/wallet/transactions
```

### Admin

```text
GET  /api/admin/overview
GET  /api/admin/trades
GET  /api/admin/disputes
POST /api/admin/disputes/:id/resolve-buyer
POST /api/admin/disputes/:id/resolve-seller
POST /api/admin/disputes/:id/refund
GET  /api/admin/users
GET  /api/admin/wallet
GET  /api/admin/ledger
GET  /api/admin/risk
GET  /api/admin/ops
POST /api/admin/withdrawals/:id/approve
POST /api/admin/withdrawals/:id/reject
POST /api/admin/workers/run
```

### Cron/workers

```text
POST /api/cron/run
POST /api/cron/trade-expiry
POST /api/cron/ledger-reconcile
POST /api/cron/wallet-watch
POST /api/cron/notifications
```

## Bitcoin safety rules

The current repo must not broadcast real Bitcoin transactions. The disabled wallet provider throws on broadcast, and withdrawal approval marks records as `broadcast_disabled`.

Before any real wallet work:

1. Finish local database-backed fake escrow.
2. Finish database-backed double-entry ledger.
3. Finish trade transaction locking.
4. Finish dispute resolution accounting.
5. Finish auth/admin protection.
6. Finish withdrawal review queue.
7. Test with regtest.
8. Test with testnet.
9. Only then consider tiny-limit mainnet.

## Ledger model

Every movement must be balanced.

Seller locks fake BTC into escrow:

```text
Debit: seller available wallet
Credit: trade escrow liability
```

Seller releases fake BTC to buyer:

```text
Debit: trade escrow liability
Credit: buyer available wallet
Debit: trade escrow liability
Credit: platform fee revenue
```

Refund seller:

```text
Debit: trade escrow liability
Credit: seller available wallet
```

No trade or wallet action should mutate a balance without ledger entries.

## Tacos

Tacos are the reminder not to overcomplicate the build.

If a feature does not help one of these things, it can wait:

- Open a trade
- Lock fake BTC
- Pay seller off-platform
- Mark paid
- Release/refund
- Resolve dispute
- Audit ledger
- Protect users
- Protect the wallet
- Help admins avoid mistakes

No bubbly AI UI. No giant SaaS hero pages. No fake hype. Tables, filters, audit logs, trade rooms, and boring safety controls first.

## GitHub safety

Before committing, clean generated files:

```bash
rm -rf node_modules .next package-lock.json tsconfig.tsbuildinfo prisma/dev.db prisma/dev.db-journal data/local-state.json data/local-db-lock.json uploads .env .env.local
```

## What to build next

Do not add S3, Redis, Telegram, regtest, testnet, or real BTC until the hardening audit and production build pass locally. The next safe step after this is provider/regtest preparation, not mainnet.
