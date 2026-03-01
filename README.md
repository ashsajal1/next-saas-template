# Next SaaS Template

A production-ready SaaS starter template built with Next.js 14, featuring modern tooling, comprehensive testing, and beautiful UI components.

## Features

- **Next.js 14** - App Router with server components, streaming, and optimized builds
- **TypeScript 5** - Full type safety with strict mode
- **Clerk Authentication** - Complete auth system with social providers
- **Prisma ORM** - Type-safe database operations with PostgreSQL/Neon
- **Tailwind CSS** - Utility-first styling with custom design tokens
- **Shadcn/ui** - 50+ accessible UI components (Radix UI + Tailwind)
- **Storybook** - Component documentation and visual testing
- **Testing Suite** - Vitest for unit/integration, Cypress for E2E
- **PWA Support** - Progressive Web App with offline capabilities
- **Dark Mode** - Built-in theme switching
- **Role-Based Access** - Admin and user role management
- **Sentry Monitoring** - Error tracking and performance instrumentation
- **Resend Email** - Transactional email notifications
- **Rate Limiting** - Upstash-powered protection for public form endpoints

## Quick Start

```bash
# Clone the repository
git clone https://github.com/ashsajal1/next-saas-template.git
cd next-saas-template

# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your credentials

# Run database migrations
npx prisma migrate dev

# Start development server
pnpm dev
```

## Project Architecture

```
next-saas-template/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (admin)/           # Admin routes (protected)
│   │   │   ├── admin/
│   │   │   │   ├── @users/    # Parallel route for user management
│   │   │   │   ├── actions.ts # Server actions
│   │   │   │   └── page.tsx
│   │   │   └── layout.tsx
│   │   ├── (auth)/            # Authentication routes
│   │   │   ├── sign-in/
│   │   │   ├── sign-up/
│   │   │   └── layout.tsx
│   │   ├── (common)/          # Public routes
│   │   │   ├── pricing/
│   │   │   ├── features/
│   │   │   └── about/
│   │   ├── (private)/         # Authenticated user routes
│   │   │   ├── dashboard/
│   │   │   ├── profile/
│   │   │   └── settings/
│   │   ├── __stories__/       # Storybook stories for app components
│   │   ├── layout.tsx         # Root layout
│   │   ├── page.tsx           # Home page
│   │   ├── loading.tsx        # Global loading state
│   │   ├── error.tsx          # Global error boundary
│   │   ├── not-found.tsx      # 404 page
│   │   └── globals.css        # Global styles + Tailwind
│   ├── components/
│   │   ├── ui/                # shadcn/ui components
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── input.tsx
│   │   │   ├── badge.tsx
│   │   │   └── __stories__/   # Component stories
│   │   ├── navbar.tsx         # Navigation components
│   │   ├── navbar-client.tsx
│   │   ├── navbar-logic.tsx
│   │   ├── hero-section.tsx
│   │   ├── footer.tsx
│   │   ├── mode-toggle.tsx    # Dark mode toggle
│   │   ├── theme-provider.tsx
│   │   └── __tests__/         # Component tests
│   ├── lib/
│   │   ├── utils.ts           # Utility functions (cn, etc.)
│   │   ├── roles.ts           # Role-based access control
│   │   └── prisma.ts          # Database client
│   ├── middleware.ts          # Clerk auth middleware
│   └── global.d.ts            # Global types
├── prisma/
│   └── schema.prisma          # Database schema
├── __tests__/                 # Test files
│   ├── unit/                  # Unit tests
│   └── integration/           # Integration tests
├── cypress/
│   └── e2e/                   # E2E tests
├── .storybook/
│   ├── main.ts                # Storybook config
│   └── preview.ts             # Preview settings
├── public/                    # Static assets
└── package.json
```

## Available Scripts

```bash
# Development
pnpm dev              # Start Next.js dev server
pnpm storybook        # Start Storybook (http://localhost:6006)

# Production
pnpm build           # Build for production
pnpm start           # Start production server

# Testing
pnpm test            # Run Vitest tests
pnpm test:e2e        # Run Cypress E2E tests
pnpm test:e2e:ui     # Open Cypress interactive mode

# Code Quality
pnpm lint            # Run ESLint

# PWA
pnpm generate-pwa-assets   # Generate PWA icons
```

## Docker

### Development (hot reload)

```bash
docker compose -f docker-compose.dev.yml up --build
```

This starts:
- `app` with `pnpm dev` on `http://localhost:3000`
- `postgres` on `localhost:5432`

Notes:
- Uses bind mounts for live code reload.
- Reads app secrets from `.env.local`.
- Run migrations after startup:

```bash
pnpm prisma migrate dev
```

### Production-like local run

```bash
docker compose up --build
```

This starts:
- `app` in production mode on `http://localhost:3000`
- `postgres` on `localhost:5432`

Notes:
- `docker-compose.yml` reads env from `.env`.
- Run production migrations:

```bash
pnpm prisma migrate deploy
```

## CI/CD

GitHub Actions workflows included:

- `CI` (`.github/workflows/ci.yml`)
: Runs:
  - Validation pipeline: `prisma validate`, `lint`, `test`, `build`
  - Docker build verification (no push)
  - Production dependency audit (`pnpm audit --prod --audit-level=high`)
  on pull requests and pushes to `main`/`master`.
- `CD Docker` (`.github/workflows/cd-docker.yml`)
: Builds and publishes a Docker image to `ghcr.io/<owner>/<repo>` on push to `main`/`master` and version tags.

Optional deployment trigger:
- Set `DEPLOY_WEBHOOK_URL` as a repository secret to call your hosting platform webhook after image publish.

## Environment Variables

Create `.env.local` with:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# Database
DATABASE_URL=postgresql://...

# Sentry
SENTRY_DSN=
NEXT_PUBLIC_SENTRY_DSN=
SENTRY_ORG=
SENTRY_PROJECT=
SENTRY_AUTH_TOKEN=

# Resend
RESEND_API_KEY=
RESEND_FROM_EMAIL=onboarding@resend.dev
LEADS_NOTIFICATION_EMAIL=

# Upstash Rate Limiting
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
```

## Storybook

Component documentation and visual testing with Storybook:

```bash
# Start Storybook
pnpm storybook
```

Stories are located in:
- `src/components/ui/__stories__/` - UI component stories
- `src/app/__stories__/` - Page component stories

Features:
- Interactive controls for all component props
- Accessibility testing with a11y addon
- Responsive viewport testing
- Auto-generated documentation from TypeScript types

## Testing

Comprehensive testing with Vitest and Cypress:

### Unit & Integration Tests (Vitest)
```bash
pnpm test                    # Run all tests
pnpm test -- --reporter=verbose   # Verbose output
```

### E2E Tests (Cypress)
```bash
pnpm test:e2e               # Run headlessly
pnpm test:e2e:ui            # Interactive mode
```

### PWA Assets

Generate PWA icons from your logo:

```bash
pnpm generate-pwa-assets
```

Replace `public/next.svg` with your logo before running.

## Contributing

We welcome contributions to enhance the functionality of this template. Here’s how you can contribute:

1. **Fork the repository**
2. **Create a new branch** for your feature or bug fix:
    ```bash
    git checkout -b feature-name
    ```
3. **Commit your changes**:
    ```bash
    git commit -m 'Add some feature'
    ```
4. **Push to the branch**:
    ```bash
    git push origin feature-name
    ```
5. **Create a pull request** to the `main` branch.

### Contribution Guidelines

- **Feature Requests**: If you have a feature request, please open an issue to discuss it before starting work.
- **Bug Reports**: Report bugs by opening an issue.
- **Code Style**: Follow the existing code style and conventions.
- **Testing**: Ensure your code is well-tested.

## License

This project is licensed under the MIT License.
