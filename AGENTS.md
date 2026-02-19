# AGENTS.md - Agentic Coding Guidelines

## Build & Development Commands

```bash
# Development
pnpm run dev              # Start Next.js dev server

# Production
pnpm run build           # Build for production (includes prisma generate)
pnpm run start           # Start production server

# Code Quality
pnpm run lint            # Run ESLint (Next.js rules)

# Testing
pnpm run test            # Run all Vitest tests
pnpm run test -- src/__tests__/middleware.test.ts    # Run single test file
pnpm run test -- --reporter=verbose                  # Run with verbose output

# E2E Testing
pnpm run test:e2e        # Run Cypress E2E tests headlessly
pnpm run test:e2e:ui     # Open Cypress interactive mode

# PWA
pnpm run generate-pwa-assets   # Generate PWA icons from public/next.svg
```

## Technology Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript 5.x (strict mode enabled)
- **Styling**: Tailwind CSS 3.x + shadcn/ui
- **Auth**: Clerk
- **Database**: Prisma ORM (PostgreSQL/Neon)
- **Testing**: Vitest + @testing-library/react + jsdom + Cypress (E2E)
- **Icons**: Lucide React
- **UI Components**: Radix UI primitives via shadcn

## Code Style Guidelines

### Imports (Order Matters)
```typescript
// 1. React/Next core
import { useState } from "react";
import Link from "next/link";

// 2. Third-party libraries
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

// 3. Local modules (use @/ aliases)
import { cn } from "@/lib/utils";
import Navbar from "@/components/navbar";
import { checkRole } from "@/lib/roles";
```

### File Organization
```
src/
├── app/                    # Next.js App Router
│   ├── (admin)/           # Route groups with parentheses
│   ├── (auth)/
│   ├── (common)/
│   ├── (private)/
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/
│   ├── ui/                # shadcn components
│   └── *.tsx              # Custom components (PascalCase)
├── lib/
│   ├── utils.ts           # Utility functions
│   ├── roles.ts           # Role checking
│   └── prisma.ts          # Database client
├── __tests__/             # Test files
└── global.d.ts            # Global types
```

### Naming Conventions
- **Components**: PascalCase (e.g., `NavbarClient`, `HeroSection`)
- **Files**: 
  - Components: PascalCase (e.g., `HeroSection.tsx`)
  - Pages/Actions: kebab-case (e.g., `actions.ts`, `page.tsx`)
- **Functions**: camelCase (e.g., `checkRole`, `setRole`)
- **Constants**: UPPER_SNAKE_CASE for true constants, camelCase for config arrays
- **Types/Interfaces**: PascalCase with descriptive names
- **Server Actions**: camelCase with "use server" directive

### Component Patterns

#### Client Components
```typescript
"use client";

import { useState } from "react";

export default function ComponentName() {
  const [state, setState] = useState(initialValue);
  
  return <div className="...">...</div>;
}
```

#### Server Components (Default)
```typescript
import { User } from "@clerk/nextjs/server";

export default async function PageName() {
  const data = await fetchData();
  return <div>...</div>;
}
```

#### Server Actions
```typescript
"use server";

import { revalidatePath } from "next/cache";

export async function actionName(formData: FormData) {
  try {
    // Perform action
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    return { error: "Error message" };
  }
}
```

### TypeScript Guidelines

- Enable strict mode (enforced in tsconfig.json)
- Always type function parameters and return types
- Use `interface` for object shapes, `type` for unions/complex types
- Prefer explicit types over `any`
- Use `@/global` for shared type definitions

```typescript
// Good
interface UserProps {
  id: string;
  email: string;
  role: "admin" | "user" | "moderator";
}

export async function getUser(id: string): Promise<UserProps | null> {
  // implementation
}

// Avoid
function badFunction(data: any): any {
  return data;
}
```

### Styling with Tailwind

- Use shadcn/ui components as base
- Use `cn()` utility for conditional classes
- Follow mobile-first responsive design
- Use semantic color tokens (e.g., `bg-primary`, `text-muted-foreground`)

```typescript
import { cn } from "@/lib/utils";

<div className={cn(
  "base-classes",
  isActive && "active-classes",
  className
)} />
```

### Error Handling

- Wrap async operations in try-catch blocks
- Return error objects from server actions, don't throw
- Use proper error messages for user feedback

```typescript
try {
  const result = await asyncOperation();
  return { success: result };
} catch (error) {
  console.error("Contextual error:", error);
  return { error: "User-friendly error message" };
}
```

### Testing Patterns

#### Unit & Integration Tests
Place tests in `__tests__` directories or as `.test.ts` files:

```typescript
import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

describe('ComponentName', () => {
  it('should render correctly', () => {
    render(<ComponentName />);
    expect(screen.getByText('Expected Text')).toBeDefined();
  });

  it('should handle user interaction', async () => {
    const user = userEvent.setup();
    render(<ComponentName />);
    await user.click(screen.getByRole('button'));
    // assertions
  });
});
```

#### E2E Tests with Cypress
Place E2E tests in `cypress/e2e/` directory:

```typescript
// cypress/e2e/home.cy.ts
describe('Home Page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should load the home page', () => {
    cy.url().should('eq', Cypress.config().baseUrl + '/');
  });

  it('should display main content', () => {
    cy.get('h1').should('be.visible');
  });
});
```

**Custom Commands** (defined in `cypress/support/commands.ts`):
- `cy.login(email, password)` - Authenticate user
- `cy.isAuthenticated()` - Check auth status
- `cy.logout()` - Sign out
- `cy.visitProtected(url)` - Visit protected routes with auth check

**Best Practices**:
- Use `data-testid` attributes for element selection
- Leverage `cy.session()` for auth persistence
- Keep tests independent and isolated
- Use fixtures in `cypress/fixtures/` for test data

### Environment Variables

Required variables in `.env.local`:
```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
DATABASE_URL=
```

### Key Principles

1. **Prefer Server Components** - Use client components only when needed (interactivity, browser APIs)
2. **Use Route Groups** - Organize routes with (group) naming for layout separation
3. **Follow shadcn/ui Patterns** - Use the CLI to add components: `npx shadcn add button`
4. **Maintain Type Safety** - Avoid `any`, use proper TypeScript types
5. **Test Critical Paths** - Write tests for utilities, components, and server actions
6. **Use Path Aliases** - Always use `@/` imports for local modules

## Git Commit Style

Use Conventional Commits with gitmoji for clear, semantic commit messages:

### Format
```
<type>: <description>

[optional body]

[optional footer(s)]
```

### Common Types with Emojis
- ✨ `feat:` - New feature
- 🐛 `fix:` - Bug fix
- 📝 `docs:` - Documentation changes
- 🎨 `style:` - Code style (formatting, semicolons, etc.)
- ♻️ `refactor:` - Code refactoring
- ✅ `test:` - Adding or updating tests
- 🔧 `chore:` - Build process, dependencies, etc.
- ⚡️ `perf:` - Performance improvements
- 🔒 `security:` - Security-related changes

### Examples
```bash
# Feature
✨ feat: add user authentication with Clerk

# Bug fix
🐛 fix: resolve hydration error on profile page

# Tests
✅ test: add unit tests for role utilities

# Refactoring
♻️ refactor: simplify navbar scroll logic

# Styling
🎨 style: update dark mode card backgrounds
```

### Guidelines
1. Use imperative mood ("Add feature" not "Added feature")
2. Keep first line under 50 characters
3. Add detailed description in body if needed
4. Reference issues/PRs in footer when applicable
5. Group related changes in single commits
6. Avoid vague messages like "fix stuff" or "update"
