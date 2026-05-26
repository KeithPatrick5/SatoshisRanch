# API Endpoints

Public: `/api/health`, `/api/markets/offers`, `/api/markets/offers/[id]`, `/api/traders/[username]`, `/api/price/btc`.

Auth: `/api/auth/register`, `/api/auth/login`, `/api/auth/logout`, `/api/me`, `/api/auth/2fa/setup`, `/api/auth/2fa/verify`.

Offers/trades/wallet/admin/cron routes are present under `app/api`.


## Database/local health

- `GET /api/admin/db-health` checks local database collections.
