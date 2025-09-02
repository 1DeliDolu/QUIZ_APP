Server (Express + Prisma + MySQL) — local setup (no Docker)

1. Install dependencies

```bash
cd server
npm install
```

2. Create `.env` from `.env.example` and set `DATABASE_URL` to your local MySQL

3. Generate Prisma client and run migrations

```bash
npm run prisma:generate
npm run prisma:migrate
```

4. Seed and run dev server

```bash
npm run seed
npm run dev
```
