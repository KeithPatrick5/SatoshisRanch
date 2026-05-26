# Local setup

```bash
cp .env.example .env.local
cp .env.example .env
npm install --no-package-lock
npm run db:push
npm run db:seed
npm run dev
```

Run audits:

```bash
npm run build
npm run audit:local
```

Do not add real secrets to GitHub. Keep `.env`, `.env.local`, wallet files, and uploads out of git.
