# Database

Local default uses Prisma with SQLite:

```env
DATABASE_URL=file:./dev.db
```

Commands:

```bash
npm run db:push
npm run db:seed
npm run db:reset
```

Later production deployments should switch to Postgres by updating `DATABASE_URL`, changing the Prisma datasource provider, and running migrations in a controlled environment.
