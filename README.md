# Satoshi's Ranch

Bitcoin P2P escrow marketplace prototype.

Satoshi's Ranch is a marketplace-style app for buyer/seller Bitcoin trades with escrow-style accounting, seller offers, disputes, admin tools, audit logs, and ledger checks.

Real Bitcoin custody and mainnet broadcast are disabled.

## Stack

- Next.js
- TypeScript
- Prisma
- SQLite for local development
- Postgres-ready schema
- DB-backed trades, offers, disputes, wallet accounting, and admin flows
- Disabled Bitcoin wallet adapter

## Setup

Install dependencies:

```bash
npm install --no-package-lock
```

Create env files:

```bash
cp .env.example .env.local
cp .env.example .env
```

Set up the database:

```bash
npm run db:push
npm run db:seed
```

Run the app:

```bash
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
```

Additional audits may be available depending on the current build:

```bash
npm run audit:env
npm run audit:db
npm run audit:ledger
npm run audit:routes
npm run audit:safety
npm run audit:secrets
npm run audit:functional
npm run audit:db-first
npm run audit:no-json-state
npm run audit:auth
npm run audit:trade-engine
npm run audit:wallet-disabled
npm run audit:admin-enforcement
npm run audit:protected-pages
npm run audit:idempotency
npm run audit:csrf
npm run audit:async-routes
npm run audit:no-hardcoded-actors
npm run audit:ledger-movement
```

## Env

Use `.env.example` as the template.

Local SQLite default:

```env
DATABASE_URL="file:./dev.db"
```

Required/local vars usually include:

```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
APP_ENV=local
DATABASE_URL="file:./dev.db"

SESSION_SECRET=
PASSWORD_PEPPER=
ADMIN_EMAILS=

BTC_NETWORK=regtest
BTC_WALLET_MODE=disabled
BTC_MAINNET_BROADCAST_ENABLED=false
```

Optional provider vars:

```env
DIRECT_URL=

STORAGE_PROVIDER=local
S3_ENDPOINT=
S3_BUCKET=
S3_ACCESS_KEY_ID=
S3_SECRET_ACCESS_KEY=
S3_REGION=

WORKER_SECRET=
REDIS_URL=

EMAIL_PROVIDER=mock
RESEND_API_KEY=
FROM_EMAIL=no-reply@satoshisranch.local

TELEGRAM_BOT_TOKEN=
TELEGRAM_ADMIN_CHAT_ID=

BITCOIN_RPC_URL=
BITCOIN_RPC_USERNAME=
BITCOIN_RPC_PASSWORD=
BITCOIN_RPC_WALLET=
BTC_INDEXER_URL=
```

Do not commit real env files, keys, tokens, wallet material, or database files.

## Local accounts

Seeded users are defined in:

```text
prisma/seed.ts
```

Expected local users:

```text
admin@satoshisranch.local
seller@satoshisranch.local
buyer@satoshisranch.local
```

Check the seed file for current local passwords and roles.

## Database

The app uses Prisma.

Local commands:

```bash
npm run db:push
npm run db:seed
npm run db:reset
```

Generated DB files should stay out of git:

```text
prisma/dev.db
prisma/dev.db-journal
```

## Wallet safety

Real Bitcoin movement is disabled.

Required defaults:

```env
BTC_WALLET_MODE=disabled
BTC_MAINNET_BROADCAST_ENABLED=false
```

Withdrawal approval should not broadcast BTC in this build. The wallet adapter should block broadcast attempts unless the wallet layer is intentionally replaced and reviewed.

Mainnet should not be enabled until the escrow accounting, trade engine, dispute flow, admin controls, ledger reconciliation, and wallet integration have been reviewed and tested with regtest/testnet.

## Git cleanup before commit

Run this before committing:

```bash
rm -rf node_modules .next package-lock.json tsconfig.tsbuildinfo prisma/dev.db prisma/dev.db-journal data/local-state.json data/local-db-lock.json uploads .env .env.local
```

## API areas

Main API groups:

```text
/api/auth/*
/api/me
/api/offers/*
/api/markets/*
/api/trades/*
/api/wallet/*
/api/admin/*
/api/cron/*
```

Admin routes should require admin access. Money-moving routes should use the trade/ledger engines and idempotency checks.

## Ledger rules

BTC accounting should go through the ledger.

Examples:

```text
Seller escrow lock:
Debit seller available
Credit trade escrow

Release:
Debit trade escrow
Credit buyer available
Debit trade escrow
Credit platform fee revenue

Refund:
Debit trade escrow
Credit seller available

Withdrawal request:
Debit user available
Credit pending withdrawal

Withdrawal rejection:
Debit pending withdrawal
Credit user available
```

No route should mutate wallet balances directly.

## Trade states

Trade states should remain strict:

```text
OFFER_OPEN
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

Trade state changes should create trade events and audit logs.

## Admin rules

Admin actions should be logged.

Examples:

```text
seller approval
seller rejection
dispute resolution
withdrawal approval
withdrawal rejection
worker run
risk flag updates
admin notes
manual adjustments
```

Sensitive admin actions should stay boring, obvious, and auditable.

## Tacos

Tacos are the reminder not to overcomplicate the build.

If a feature does not help one of these things, it can wait:

- open a trade
- lock escrow accounting
- mark paid
- release or refund
- resolve a dispute
- audit the ledger
- protect users
- protect the wallet
- help admins avoid mistakes

No bubbly AI UI. No giant SaaS hero pages. No fake hype.

Tables, filters, trade rooms, audit logs, disputes, and boring safety controls first.

## Notes

This is a prototype and development foundation, not a production exchange.

Before using real infrastructure, review:

- auth
- admin permissions
- CSRF
- idempotency
- trade transactions
- ledger reconciliation
- wallet adapter behavior
- withdrawal approval flow
- dispute resolution flow
- backup and recovery
- legal/compliance posture
