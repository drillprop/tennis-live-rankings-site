# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A Next.js 16+ application for displaying live tennis rankings (WTA). Built with React 19, TypeScript, and Tailwind CSS v4. Uses shadcn/ui components and modern React patterns (Server Components, Suspense).

**Key Technologies:**
- Next.js 16.1.6 (App Router)
- React 19.2.4 & React DOM 19.2.4
- TypeScript 5
- Tailwind CSS v4 with PostCSS
- @tanstack/react-table for table rendering
- Zod for data validation
- shadcn/ui for component library

## Common Development Commands

```bash
# Development
pnpm dev                # Start dev server (port 3000 with turbopack)

# Building & Running
pnpm build              # Build production bundle
pnpm start              # Start production server

# Code Quality
pnpm lint               # Run ESLint on all files
pnpm prettier:check     # Check formatting (doesn't fix)
pnpm prettier:fix       # Fix formatting

# Pre-commit Hooks
git commit              # Automatically runs prettier + eslint --fix on staged *.{ts,tsx,js,jsx}
```

## Code Architecture

### Directory Structure

```
src/
├── app/                 # Next.js App Router (pages and layouts)
│   ├── page.tsx         # Home page
│   ├── layout.tsx       # Root layout with fonts & metadata
│   ├── globals.css      # Global styles
│   └── wta-live-ranking/  # WTA ranking page
├── components/          # Reusable React components
│   ├── shadcn/          # shadcn/ui components (button, table, etc.)
│   └── header/          # App header component
├── modules/             # Feature modules (domain-specific components)
│   └── wta-live-ranking/
│       └── wta-live-ranking-table/  # Complex table component with @tanstack/react-table
├── schemas/             # Zod validation schemas for API responses
├── lib/                 # Utility functions (e.g., cn() for className merging)
├── config/              # Configuration files (env variables)
└── consts/              # Constants (e.g., country flags map)
```

### Architectural Patterns

**Page Structure:** Uses Next.js App Router. Pages can be Server Components by default; use `"use client"` only for interactive components that need browser APIs (useState, useEffect, etc.).

**Data Fetching:** Leverage Server Components and async/await. The `WtaLiveRankingTable` demonstrates using a Promise passed from a Server Component to a Client Component via the `use()` hook.

**Components:**
- **shadcn/ui Components** (`src/components/shadcn/`): Unstyled, accessible UI primitives imported from shadcn. Customize via className props and Tailwind.
- **Feature Modules** (`src/modules/`): Domain-specific, feature-rich components combining shadcn primitives, business logic, and styling.
- **Client Components** (`"use client"`): Use sparingly; only for interactivity. Prefer Server Components for layouts, data fetching, and rendering.

**Table Implementation:** Uses `@tanstack/react-table` v8 with TanStack's `createColumnHelper` and `useReactTable` hook. See `WtaLiveRankingTable` for example column definitions, styling with `cn()` utility, and conditional cell rendering.

**Styling:**
- Tailwind CSS v4 with `prettier-plugin-tailwindcss` for automatic class sorting.
- Use `cn()` utility (from `@/lib/utils`) to merge Tailwind classes conditionally: `cn({ "text-red-600": condition }, "base-class")`.
- Tailwind attributes plugin configured to sort classes in custom attributes (e.g., `activeClassName`).

**Validation:** Zod schemas in `src/schemas/` validate API responses. Config uses `z.object()` and `.parse()` to ensure type safety at runtime.

### Import Aliases

TypeScript path alias `@/*` maps to `src/*`. Always use `@/` for imports within src:
```tsx
import { Header } from "@/components/header/header";
import { cn } from "@/lib/utils";
import { WtaPlayer } from "@/schemas/wta-ranking";
```

## Code Style & Quality

**ESLint Config:** Flat config in `eslint.config.mjs` includes Next.js, Prettier, and TypeScript rules. Custom rules enforce:
- `react/jsx-curly-brace-presence`: No unnecessary braces in props/children
- `react/self-closing-comp`: Self-close empty tags
- `import/no-duplicates`: Combine duplicate imports with `{ "prefer-inline": true }`
- `@typescript-eslint/return-await`: Required in try…catch blocks only
- `@typescript-eslint/no-unused-vars`: Allow unused vars prefixed with `_`

**Prettier Config:** `prettier.config.js`
- Print width: 100 characters
- Tabs: 4 spaces (useTabs: true)
- Trailing commas: all
- Import sorting: `@/` imports first, then relative `./ imports`
- Tailwind sorting enabled
- Semi-colons required

**Pre-commit Hook:** Husky + lint-staged automatically run `prettier --write` and `eslint --fix` on staged `*.{ts,tsx,js,jsx}` files before each commit. CI (GitHub Actions) runs the same checks on push.

## Key Dependencies & Their Use

- **@tanstack/react-table:** Headless table library for building the rankings table with custom columns and styling.
- **clsx & tailwind-merge:** Used in `cn()` utility to safely merge Tailwind classes without specificity issues.
- **Zod:** Runtime validation of environment variables and API responses.
- **lucide-react:** Icon library (if icons are needed).
- **@radix-ui/react-slot:** Primitive for forwarding props/refs in composed components.
- **class-variance-authority:** Can be used for component variants (bundled but not heavily used yet).

## Configuration Notes

- **TypeScript:** `compilerOptions.strict: true` enforces strict type checking. Path alias `@/*` → `./src/*`.
- **Next.js:** Uses Turbopack for faster dev rebuilds. No custom `next.config.ts` modifications needed for standard use.
- **Tailwind v4:** Uses new `@tailwindcss/postcss` plugin. Avoid inline theme config; keep global styles in `globals.css`.
- **Environment Variables:** Validated via Zod schema in `src/config/env.ts`. Required: `API_URL`.

## Git Workflow

- Branch naming: Feature branches use `feat/` prefix (e.g., `feat/upgrade-next`).
- CI runs on push only (after husky pre-commit enforcement).
- Commits should be descriptive; conventional commit style preferred.

## Common Mistakes to Avoid

1. **Forgetting `"use client"`:** Hooks and browser APIs only work in client components. Server Components can't use state or event handlers.
2. **Misusing `cn()`:** Always use `cn()` for conditional classes, not string concatenation.
3. **Hard-coding strings:** Extract to `src/consts/` or `src/config/` for reusability.
4. **Not validating API responses:** Always use Zod schemas to validate external data.
5. **Styling in JS:** Keep styles in Tailwind classes; avoid inline styles or styled-components.

## Testing & Debugging

- **Type Checking:** Run `tsc --noEmit` to check for TS errors without building.
- **Linting:** `pnpm lint` catches style and logic issues; `pnpm prettier:fix` auto-fixes formatting.
- **Local Testing:** Start dev server with `pnpm dev`, open http://localhost:3000.
- **Building:** `pnpm build` catches issues that only surface during optimization passes.

## File Locations to Know

- `.eslintignore` patterns: Defined in `eslint.config.mjs` via `globalIgnores()`.
- `.prettierignore`: `src/app/globals.css` tailwindcss stylesheet reference.
- Next.js config: `next.config.ts` (minimal; most config via `tsconfig.json`).
- Tailwind config: `tailwind.config.ts` (if present) or inline in Next.js; currently uses PostCSS.
- Type overrides: `tsconfig.json` `pnpm.overrides` enforces React 19.2.14 types across the project.

## Recent Changes

- Next.js upgraded from v15 to v16.1.6 with turbopack support in dev.
- React upgraded to v19.2.4 with React DOM v19.2.4.
- Husky v9 + lint-staged added for pre-commit hooks (Feb 2026).
- ESLint and Prettier configs refined for strict consistency.
