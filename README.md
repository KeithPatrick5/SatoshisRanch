# Satoshi's Ranch

Local-first Bitcoin P2P escrow marketplace prototype inspired by LocalBitcoins. This repo is built to be turnkey: clone it, add local env vars, initialize the local database, seed demo data, and run.

## Current status

This is a **database-first local build**. The marketplace, seller approval flow, offers, trade states, fake escrow accounting, double-entry ledger, disputes, admin tools, notifications, workers, and audit suite are built for local development. Real Bitcoin custody and mainnet broadcast remain disabled.

## Quick start

```bash
cp .env.example .env.local
cp .env.example .env
npm install --no-package-lock
npm run db:push
npm run db:seed
npm run dev
```

Open `http://localhost:3000`.

## Audit

```bash
npm run build
npm run audit:local
```

## Safety defaults

- `BTC_WALLET_MODE=disabled`
- `BTC_MAINNET_BROADCAST_ENABLED=false`
- `WITHDRAWALS_ENABLED=false`
- No wallet seed, private key, API token, or database password belongs in GitHub.

## Local demo accounts

Seeded demo users use local-only placeholder passwords and must not be used in production. Replace auth/session configuration before any deployment.

## Important docs

- `docs/DB_FIRST_PHASES.md`
- `docs/DB_FIRST_AUDIT_SUMMARY.md`
- `docs/ENV_VARS.md`
- `docs/API_ENDPOINTS.md`
- `docs/WALLET_SAFETY.md`
- `docs/DEPLOYMENT_CHECKLIST.md`

## What is still not real

- Real BTC custody
- Mainnet broadcast
- Real hosted Postgres deployment
- Real S3 evidence uploads
- Real email/Telegram sends
- Redis-backed worker daemon
- Regtest/testnet wallet activation

Those are intentionally later phases after this local database-first layer is stable.

## Environment variables

All required and optional environment variables are documented in `.env.example` and `docs/ENV_VARS.md`. Copy `.env.example` to `.env.local` for Next.js and `.env` for Prisma CLI local commands.

## API surface

The API surface is documented in `docs/API_ENDPOINTS.md`. The local app includes auth, offers, trades, wallet, admin, worker, cron, marketplace, trader, and database-health routes.

## What still needs to be added

Real BTC custody, mainnet broadcast, hosted Postgres, real S3/R2 evidence uploads, live email/Telegram sends, Redis-backed workers, regtest/testnet watcher activation, and production auth hardening remain intentionally disabled until later phases.

## GitHub-only local build

This repo is intended to be safe for GitHub as a local-first development build. Do not commit `.env`, `.env.local`, wallet files, upload folders, generated databases, `node_modules`, or `.next`.
