# Satoshi's Ranch

Satoshi's Ranch is a local-first Bitcoin P2P escrow marketplace prototype inspired by the old LocalBitcoins style of trading.

The project is designed as a serious build foundation for a Bitcoin-only P2P marketplace with seller offers, buyer trades, fake/local escrow accounting, admin dispute tools, double-entry ledger auditing, seller approvals, and hard-disabled mainnet wallet safety gates.

This repo is **not production-ready** and does **not** move real Bitcoin yet.

Current status:

- Local/database-first prototype
- SQLite/Prisma-ready foundation
- Fake BTC accounting only
- Real trade-state structure
- Real local audit structure
- Mainnet BTC disabled
- Wallet broadcast disabled
- Built for local testing and staged future integration

## Core idea

Buyer and seller agree on a fiat payment method off-platform.

The seller's BTC is locked in escrow inside the platform. The buyer pays the seller directly. The seller confirms payment. The platform releases BTC to the buyer. If there is a dispute, an admin reviews the trade, chat, evidence, and ledger state, then releases or refunds.

In the current local version, this uses fake BTC balances and local/database-first accounting. Real Bitcoin custody is intentionally disabled.

## What is real right now

The current repo includes:

- Local marketplace UI
- Local offer browsing and filtering
- Seller profiles
- Seller application flow
- Seller approval/rejection structure
- Offer create/pause/resume structure
- Trade room
- Trade states
- Mark paid/release/cancel/dispute flows
- Fake escrow accounting
- Double-entry ledger model
- Ledger audit scripts
- Admin dashboard
- Admin disputes
- Admin users
- Admin wallet page
- Admin ledger page
- Admin risk page
- Admin ops page
- Local notification outbox
- Local worker scan structure
- Prisma schema
- SQLite-ready local database setup
- Seed script
- Env/config documentation
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
- Production auth hardening
- Production admin approval controls

That is intentional. Do not turn on real Bitcoin before the fake escrow, ledger, auth, admin, dispute, and database flows are fully tested.

## Tech stack

Current foundation:

- Next.js
- TypeScript
- Prisma
- SQLite local default
- Postgres-ready later
- Local filesystem evidence storage shell
- Mock notification provider
- Disabled Bitcoin wallet provider
- Admin/audit-focused architecture

Future infrastructure options:

- Postgres: Supabase, Neon, Railway, Vercel Postgres, or self-hosted Postgres
- Storage: Cloudflare R2, AWS S3, Backblaze B2, or another S3-compatible provider
- Email: Resend, Postmark, SendGrid, or SMTP provider
- Telegram: Telegram Bot API
- Redis/queues: Upstash Redis, Redis, BullMQ
- Bitcoin: Bitcoin Core, regtest first, then testnet, then tiny-limit mainnet much later

## Local setup

### 1. Install dependencies

```bash
npm install --no-package-lock
```

This project intentionally avoids committing `package-lock.json`.

### 2. Create local env file

```bash
cp .env.example .env.local
cp .env.example .env
```

The `.env` copy is useful for Prisma CLI commands. `.env.local` is used by the Next app.

### 3. Set up the local database

```bash
npm run db:push
npm run db:seed
```

The default local database is SQLite:

```env
DATABASE_URL="file:./dev.db"
```

Generated database files should not be committed.

### 4. Start the app

```bash
npm run dev
```

Then open:

```text
http://localhost:3000
```

## Useful commands

```bash
npm run dev
npm run build
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

Database commands:

```bash
npm run db:push
npm run db:seed
npm run db:reset
```

## Local demo accounts

The seed script should provide local demo users for testing.

Expected local accounts:

```text
admin@satoshisranch.local
seller@satoshisranch.local
buyer@satoshisranch.local
```

Check `prisma/seed.ts` for the current seeded credentials and roles.

These are for local testing only. Change or remove them before any hosted deployment.

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

For hosted Postgres later:

```env
DATABASE_URL=
DIRECT_URL=
```

### Auth

```env
SESSION_SECRET=
PASSWORD_PEPPER=
ADMIN_EMAILS=
```

Local defaults are acceptable for local testing only. Production requires strong random values.

### Storage

```env
STORAGE_PROVIDER=local
S3_ENDPOINT=
S3_BUCKET=
S3_ACCESS_KEY_ID=
S3_SECRET_ACCESS_KEY=
S3_REGION=
```

Local mode stores evidence files locally in a gitignored folder.

### Workers

```env
WORKER_SECRET=
REDIS_URL=
```

Redis is not required for the local manual worker flow.

### Email

```env
EMAIL_PROVIDER=mock
RESEND_API_KEY=
FROM_EMAIL=no-reply@satoshisranch.local
```

### Telegram

```env
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

Mainnet must remain disabled until the project has completed regtest, testnet, hot-wallet caps, withdrawal review, audit logs, reconciliation, and tiny trade limit testing.

## Bitcoin safety rules

The current repo must not broadcast real Bitcoin transactions.

Required defaults:

```env
BTC_WALLET_MODE=disabled
BTC_MAINNET_BROADCAST_ENABLED=false
```

The disabled wallet provider should throw or block broadcast attempts.

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
```

Future auth endpoints:

```text
POST /api/auth/2fa/setup
POST /api/auth/2fa/verify
POST /api/auth/password-reset/request
POST /api/auth/password-reset/confirm
```

### Seller

```text
POST /api/seller/apply
POST /api/admin/sellers/:id/approve
POST /api/admin/sellers/:id/reject
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

### Cron/workers

```text
POST /api/cron/run
POST /api/cron/trade-expiry
POST /api/cron/ledger-reconcile
POST /api/cron/wallet-watch
POST /api/cron/notifications
```

## Ledger model

The ledger should follow double-entry accounting.

Every movement must be balanced.

Examples:

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

Withdrawal request:

```text
Debit: user available wallet
Credit: pending withdrawal liability
```

Withdrawal rejected:

```text
Debit: pending withdrawal liability
Credit: user available wallet
```

No trade or wallet action should mutate a balance without ledger entries.

## Trade states

The trade state machine must stay strict.

Expected states include:

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

Rules:

- Buyer cannot mark paid until escrow is funded.
- Seller cannot release before buyer marks paid.
- Seller cannot cancel after buyer marks paid.
- Admin resolution must write trade events and ledger entries.
- Every state change should write an audit log.
- Real BTC must not be involved until regtest/testnet phases.

## Admin rules

Admin actions should always create audit logs.

Admin-only operations include:

- Seller approval/rejection
- User suspension
- Trade freeze
- Dispute resolution
- Withdrawal approval/rejection
- Worker runs
- Ledger reconciliation review
- Risk flag dismissal

Future production requirements:

- Admin 2FA
- Strong session cookies
- Admin IP/device alerts
- Permission levels
- Dual approval for sensitive money movement
- Emergency freeze
- Maintenance mode
- Full exportable audit history

## GitHub safety

Before committing, clean generated files:

```bash
rm -rf node_modules .next package-lock.json tsconfig.tsbuildinfo prisma/dev.db prisma/dev.db-journal data/local-state.json data/local-db-lock.json uploads
```

Expected `.gitignore` coverage:

```gitignore
node_modules
.next
package-lock.json
tsconfig.tsbuildinfo
.env
.env.local
.env.production
.env*.local
prisma/dev.db
prisma/dev.db-journal
uploads
secrets
private
*.pem
*.key
wallet.dat
bitcoin-data
```

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

## Development priorities

Current priority order:

1. Keep local app working.
2. Keep mainnet disabled.
3. Finish database-backed fake escrow.
4. Harden auth and admin roles.
5. Harden ledger transactions.
6. Harden trade/dispute flows.
7. Add evidence upload flow.
8. Add real worker queue.
9. Add notification providers.
10. Add regtest Bitcoin Core.
11. Add testnet.
12. Consider tiny-limit mainnet only after repeated audits.

## What to build next

Recommended next engineering steps:

1. Fully replace any remaining local JSON reads/writes with Prisma repositories.
2. Make trade open, mark-paid, release, refund, and dispute resolution all DB transactions.
3. Add row-level locking or transaction-safe protection for trade actions.
4. Enforce idempotency keys on money-moving actions.
5. Add real file upload evidence with local storage first.
6. Add admin evidence viewer.
7. Add worker logs and recurring cron runner.
8. Add hosted Postgres documentation.
9. Add regtest Bitcoin Core docs and adapter tests.
10. Keep mainnet disabled.

## Production warning

This project coordinates fiat-for-BTC trades and is designed around custodial BTC escrow in later phases. That carries serious operational, legal, compliance, fraud, and wallet security risk.

Do not deploy as a real public marketplace until:

- Legal/compliance posture is reviewed.
- Auth is production-hardened.
- Admin controls are hardened.
- Wallet custody is professionally reviewed.
- Hot wallet limits exist.
- Cold storage process exists.
- Ledger reconciliation is proven.
- Dispute process is tested.
- Regtest and testnet are complete.
- Mainnet withdrawal code has been independently reviewed.
