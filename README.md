# Satoshi's Ranch

Bitcoin P2P escrow marketplace prototype.

This repo is built for development and testing. BTC custody and mainnet transaction broadcast are disabled by default.

## Stack

- Next.js
- TypeScript
- Prisma
- SQLite for local development
- Postgres-ready database config
- Disabled Bitcoin wallet adapter
- Local evidence upload adapter
- Mock notification outbox

## Setup

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

## Scripts

```bash
npm run dev
npm run build
npm run db:push
npm run db:seed
npm run db:reset
npm run audit:local
npm run audit:env
npm run audit:db
npm run audit:ledger
npm run audit:routes
npm run audit:safety
npm run audit:secrets
npm run audit:functional
npm run audit:db-first
```

## Environment

Copy `.env.example` to `.env.local` and `.env` before running Prisma commands.

Required local defaults:

```env
DATABASE_URL="file:./dev.db"
BTC_WALLET_MODE="disabled"
BTC_MAINNET_BROADCAST_ENABLED="false"
```

Do not commit real secrets, wallet material, RPC credentials, API keys, private keys, database files, uploads, or local env files.

## Database

Local development uses SQLite through Prisma.

```bash
npm run db:push
npm run db:seed
```

Generated database files should stay out of Git:

```text
prisma/dev.db
prisma/dev.db-journal
```

## Demo accounts

Seeded development accounts are defined in `prisma/seed.ts`.

Expected local accounts:

```text
admin@satoshisranch.local
seller@satoshisranch.local
buyer@satoshisranch.local
```

Use the seed file as the source of truth for passwords and roles.

## Core modules

```text
lib/auth              auth/session helpers
lib/repositories      database access layer
lib/trades            trade state and action engine
lib/ledger            ledger validation and accounting
lib/wallet            disabled wallet adapter and wallet helpers
lib/risk              risk scoring/flags
lib/notifications     notification outbox/providers
lib/workers           worker scan helpers
lib/storage           local/S3 storage adapters
lib/bitcoin           disabled/regtest/testnet adapter shells
```

## Safety defaults

Bitcoin mainnet is disabled by default.

```env
BTC_WALLET_MODE="disabled"
BTC_MAINNET_BROADCAST_ENABLED="false"
```

Withdrawal approval must not broadcast a real transaction while the disabled wallet adapter is active.

Before enabling any Bitcoin adapter, finish and review:

- auth and admin enforcement
- trade state transitions
- idempotency on money-moving routes
- ledger reconciliation
- dispute resolution accounting
- withdrawal review flow
- worker logs
- wallet-disabled audit

## API overview

### Public

```text
GET  /api/health
GET  /api/markets/offers
GET  /api/price/btc
```

### Auth

```text
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
GET  /api/me
```

### Offers

```text
GET  /api/offers
POST /api/offers
PATCH /api/offers/:id
POST /api/offers/:id/pause
POST /api/offers/:id/resume
POST /api/offers/:id/archive
```

### Trades

```text
POST /api/trades
GET  /api/trades
GET  /api/trades/:id
POST /api/trades/:id/mark-paid
POST /api/trades/:id/release
POST /api/trades/:id/cancel
POST /api/trades/:id/dispute
POST /api/trades/:id/messages
POST /api/trades/:id/attachments
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
POST /api/admin/disputes/:id/refund-seller
GET  /api/admin/users
GET  /api/admin/wallet
GET  /api/admin/ledger
GET  /api/admin/risk
GET  /api/admin/ops
POST /api/admin/withdrawals/:id/approve
POST /api/admin/withdrawals/:id/reject
POST /api/admin/workers/run
```

### Workers

```text
POST /api/cron/run
POST /api/cron/trade-expiry
POST /api/cron/ledger-reconcile
POST /api/cron/wallet-watch
POST /api/cron/notifications
```

## Ledger rules

Every balance movement should go through the ledger engine.

Basic movements:

```text
seller available -> trade escrow
trade escrow -> buyer available
trade escrow -> seller available
user available -> pending withdrawal
pending withdrawal -> user available
trade escrow -> platform fee revenue
```

No route should update balances without writing balanced ledger entries.

## Trade states

Trade state transitions are handled in the trade engine. Keep the state machine strict.

Expected states include:

```text
TRADE_CREATED
WAITING_SELLER_ESCROW
ESCROW_PENDING_CONFIRMATION
ESCROW_FUNDED
WAITING_BUYER_PAYMENT
BUYER_MARKED_PAID
WAITING_SELLER_RELEASE
RELEASE_PENDING
RELEASED
CANCELLED
EXPIRED
DISPUTED
ADMIN_REVIEW
RESOLVED_BUYER
RESOLVED_SELLER
REFUNDED
```

## Git cleanup

Before committing:

```bash
rm -rf node_modules .next package-lock.json tsconfig.tsbuildinfo prisma/dev.db prisma/dev.db-journal data/local-state.json data/local-db-lock.json uploads .env .env.local
```

## Tacos

Keep the build boring until the core flow is solid.

If it does not help a buyer open a trade, lock escrow accounting, mark payment, release/refund, resolve a dispute, audit the ledger, protect users, protect the wallet, or keep admins from making expensive mistakes, it can wait.

Tacos later. Ledger first.

## Notes

This is a development prototype. Review wallet custody, compliance, admin controls, audit logging, and operational security before any public deployment or real BTC handling.
