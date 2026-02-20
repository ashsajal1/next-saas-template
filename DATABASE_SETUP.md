# Database Setup Guide

This guide explains how to fix the `PrismaClientInitializationError` when the database doesn't exist.

## The Error

```
Error creating checkout session: PrismaClientInitializationError: 
Invalid `prisma.user.findUnique()` invocation:

Database `next_saas_template` does not exist on the database server at `localhost:5432`.
```

## Root Cause

The PostgreSQL database specified in your `.env.local` file hasn't been created yet. Prisma can't connect to a database that doesn't exist.

## Prerequisites

- PostgreSQL installed and running
- Database credentials available

## Solution Steps

### 1. Verify PostgreSQL is Running

```bash
psql --version
```

### 2. Create the Database

Connect to PostgreSQL and create the database:

```bash
psql postgresql://postgres:1234@localhost:5432/postgres -c "CREATE DATABASE next_saas_template;"
```

**Note:** Replace `postgres:1234` with your actual PostgreSQL username and password from `.env.local`.

### 3. Set Up Environment Variables

Create a `.env` file in the project root (if it doesn't exist) with the DATABASE_URL:

```bash
echo 'DATABASE_URL="postgresql://postgres:1234@localhost:5432/next_saas_template"' > .env
```

### 4. Run Prisma Migrations

Apply the database schema:

```bash
pnpm exec prisma migrate dev --name init
```

This will:
- Create all necessary tables (User, Subscription, etc.)
- Set up relationships
- Generate the Prisma Client

### 5. Verify the Setup

The migration should output:
```
✔ Generated Prisma Client (v5.22.0)
Your database is now in sync with your schema.
```

## Quick Command Summary

```bash
# 1. Create database
psql postgresql://postgres:1234@localhost:5432/postgres -c "CREATE DATABASE next_saas_template;"

# 2. Set env variable
echo 'DATABASE_URL="postgresql://postgres:1234@localhost:5432/next_saas_template"' > .env

# 3. Run migrations
pnpm exec prisma migrate dev --name init
```

## Troubleshooting

### Connection Refused
If you get a connection error, ensure PostgreSQL is running:
```bash
sudo systemctl start postgresql  # Linux
brew services start postgresql   # macOS
```

### Permission Denied
Make sure the PostgreSQL user has permission to create databases:
```bash
psql -U postgres -c "ALTER USER postgres CREATEDB;"
```

### Database Already Exists
If the database already exists, you can reset it:
```bash
psql postgresql://postgres:1234@localhost:5432/postgres -c "DROP DATABASE next_saas_template;"
psql postgresql://postgres:1234@localhost:5432/postgres -c "CREATE DATABASE next_saas_template;"
```

## Next Steps

After the database is set up:
1. Test the Stripe checkout flow
2. Verify webhook events are being processed
3. Check that user subscriptions are saved correctly

## Related Files

- `.env.local` - Contains database credentials
- `prisma/schema.prisma` - Database schema definition
- `src/lib/prisma.ts` - Prisma client configuration
