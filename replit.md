# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Structure

```text
artifacts-monorepo/
├── artifacts/              # Deployable applications
│   └── api-server/         # Express API server
├── lib/                    # Shared libraries
│   ├── api-spec/           # OpenAPI spec + Orval codegen config
│   ├── api-client-react/   # Generated React Query hooks
│   ├── api-zod/            # Generated Zod schemas from OpenAPI
│   └── db/                 # Drizzle ORM schema + DB connection
├── scripts/                # Utility scripts (single workspace package)
│   └── src/                # Individual .ts scripts, run via `pnpm --filter @workspace/scripts run <script>`
├── pnpm-workspace.yaml     # pnpm workspace (artifacts/*, lib/*, lib/integrations/*, scripts)
├── tsconfig.base.json      # Shared TS options (composite, bundler resolution, es2022)
├── tsconfig.json           # Root TS project references
└── package.json            # Root package with hoisted devDeps
```

## TypeScript & Composite Projects

Every package extends `tsconfig.base.json` which sets `composite: true`. The root `tsconfig.json` lists all packages as project references. This means:

- **Always typecheck from the root** — run `pnpm run typecheck` (which runs `tsc --build --emitDeclarationOnly`). This builds the full dependency graph so that cross-package imports resolve correctly. Running `tsc` inside a single package will fail if its dependencies haven't been built yet.
- **`emitDeclarationOnly`** — we only emit `.d.ts` files during typecheck; actual JS bundling is handled by esbuild/tsx/vite...etc, not `tsc`.
- **Project references** — when package A depends on package B, A's `tsconfig.json` must list B in its `references` array. `tsc --build` uses this to determine build order and skip up-to-date packages.

## Root Scripts

- `pnpm run build` — runs `typecheck` first, then recursively runs `build` in all packages that define it
- `pnpm run typecheck` — runs `tsc --build --emitDeclarationOnly` using project references

## Packages

### `artifacts/api-server` (`@workspace/api-server`)

Express 5 API server. Routes live in `src/routes/` and use `@workspace/api-zod` for request and response validation and `@workspace/db` for persistence.

- Entry: `src/index.ts` — reads `PORT`, starts Express
- App setup: `src/app.ts` — mounts CORS, JSON/urlencoded parsing, routes at `/api`
- Routes: `src/routes/index.ts` mounts sub-routers; `src/routes/health.ts` exposes `GET /health` (full path: `/api/health`)
- Depends on: `@workspace/db`, `@workspace/api-zod`
- `pnpm --filter @workspace/api-server run dev` — run the dev server
- `pnpm --filter @workspace/api-server run build` — production esbuild bundle (`dist/index.cjs`)
- Build bundles an allowlist of deps (express, cors, pg, drizzle-orm, zod, etc.) and externalizes the rest

### `lib/db` (`@workspace/db`)

Database layer using Drizzle ORM with PostgreSQL. Exports a Drizzle client instance and schema models.

- `src/index.ts` — creates a `Pool` + Drizzle instance, exports schema
- `src/schema/index.ts` — barrel re-export of all models
- `src/schema/<modelname>.ts` — table definitions with `drizzle-zod` insert schemas (no models definitions exist right now)
- `drizzle.config.ts` — Drizzle Kit config (requires `DATABASE_URL`, automatically provided by Replit)
- Exports: `.` (pool, db, schema), `./schema` (schema only)

Production migrations are handled by Replit when publishing. In development, we just use `pnpm --filter @workspace/db run push`, and we fallback to `pnpm --filter @workspace/db run push-force`.

### `lib/api-spec` (`@workspace/api-spec`)

Owns the OpenAPI 3.1 spec (`openapi.yaml`) and the Orval config (`orval.config.ts`). Running codegen produces output into two sibling packages:

1. `lib/api-client-react/src/generated/` — React Query hooks + fetch client
2. `lib/api-zod/src/generated/` — Zod schemas

Run codegen: `pnpm --filter @workspace/api-spec run codegen`

### `lib/api-zod` (`@workspace/api-zod`)

Generated Zod schemas from the OpenAPI spec (e.g. `HealthCheckResponse`). Used by `api-server` for response validation.

### `lib/api-client-react` (`@workspace/api-client-react`)

Generated React Query hooks and fetch client from the OpenAPI spec (e.g. `useHealthCheck`, `healthCheck`).

### `scripts` (`@workspace/scripts`)

Utility scripts package. Each script is a `.ts` file in `src/` with a corresponding npm script in `package.json`. Run scripts via `pnpm --filter @workspace/scripts run <script>`. Scripts can import any workspace package (e.g., `@workspace/db`) by adding it as a dependency in `scripts/package.json`.

### `artifacts/mobile` (`@workspace/mobile`) — PeptidePath App

Expo ~54 React Native app. Auth via AsyncStorage with hashed passwords (SHA-256 + salt via `expo-crypto`).

**Theme**: tint `#00C9A7`, accent `#4ECDC4`, dark bg `#080C12` — all in `constants/colors.ts`
**UI Components** (`components/ui/`):
- `Card` — `borderRadius: 20`, colored shadow (teal glow in dark), `elevated` prop
- `ThemedText` — variants: display/title/subtitle/body/caption/label/overline; `letterSpacing` tuned per variant
- `Button` — primary uses `LinearGradient` (`#00DEB8 → #00A88B`); secondary has border; spring press animation
- `Input` — teal focus ring shadow + colored label; `borderRadius: 14`; `minHeight: 54`
- `Badge` — border + translucent fill; updated category colors

**Key screens**:
- `(auth)/login.tsx` — brand logo with gradient, form card layout, background glow, gradient CTA
- `(auth)/register.tsx` — matching redesign with back button pill
- `(tabs)/index.tsx` — gradient avatar, gradient progress bar, gradient quick-action icons, `SectionLabel` helper, overline typography
- `(tabs)/profile.tsx` — gradient hero banner, stat cards, saved protocols, reminder toggles, premium upgrade card
- `protocol-builder.tsx` — 4-step builder, PDF export (A4 HTML), share card PNG via `react-native-view-shot`

**Subscription system** (Stripe-powered):
- Tiers: Free (1 protocol, no PDF/AI), Pro $9.99/mo (unlimited protocols, PDF export, reminders), Elite $29.99/mo (AI builder, advanced)
- `context/SubscriptionContext.tsx` — fetches tier from API, provides `canAddProtocol(n)`, `canExportPdf`, `canUseSmartBuilder`
- `components/PaywallModal.tsx` — bottom sheet paywall shown when free user hits locked feature
- `app/upgrade.tsx` — full 3-tier comparison screen with Stripe checkout via `expo-web-browser`
- Feature gates: calculator PDF → Pro; protocol save >1 → Pro; protocol PDF → Pro; AI builder → Elite
- Profile shows dynamic tier badge + "Manage Subscription" portal for paid users; upgrade card for free users
- Stripe integration: uses Replit connector (no STRIPE_SECRET_KEY env var needed); stripe-replit-sync mirrors Stripe data to `stripe.*` PostgreSQL schema
- Products seeded: `prod_UAUiPuk18P2aZ6` (Pro, $9.99/mo), `prod_UAUil3A16B5I6w` (Elite, $29.99/mo)
- Re-seed products: `pnpm --filter @workspace/scripts exec tsx src/seed-products.ts`

**Auth security** (`context/AuthContext.tsx`):
- Passwords hashed with SHA-256 + random 16-byte salt via `expo-crypto` before storing in AsyncStorage
- Storage keys migrated to `peptidepath_users_v2` / `peptidepath_session_v2` (v1 keys had plaintext passwords)
- All inputs sanitized: email normalized, name trimmed + `<>` stripped, password min 8 chars / max 128 chars
- Session integrity validated on load (type-checks all required fields)

**API security** (`app.ts` + `middleware/sanitize.ts`):
- `helmet` adds 7 security headers (X-Frame-Options, X-Content-Type-Options, etc.)
- `express-rate-limit`: global 200 req/15 min; waitlist 5/hr; stripe 20/min
- Body size limit: 50 KB (returns 413 for oversized payloads)
- CORS restricted to `*.replit.dev`, `*.repl.co`, and localhost origins
- Zod validation on all routes: users/sync, users/:id, stripe/checkout, stripe/portal, stripe/subscription/:id, waitlist
- `userId`/`id` params validated with `/^[\w\-\.@]+$/` regex to block path traversal
- `priceId` validated with `/^[\w_]+$/` regex
- Name fields: `<>` stripped (XSS mitigation); Drizzle ORM parameterized queries prevent SQL injection

**Storage keys**: `peptidepath_logs`, `peptidepath_bookmarks`, `peptidepath_protocols`, `peptidepath_journal`, `peptidepath_smart_protocols`, `peptidepath_prefs`, `peptidepath_users_v2`, `peptidepath_session_v2`, `peptidepath_subscription_level`
**UUID pattern**: `Date.now().toString() + Math.random().toString(36).substr(2, 9)`
**Web insets**: always add `Platform.OS === "web"` checks with 67px top + 34px bottom

**API Server routes** (`/api/...`):
- `GET /healthz` — health check
- `POST /users/sync` — upsert user in DB (called on login/signup)
- `GET /users/:id` — fetch user + subscription level
- `GET /stripe/products` — list active products with prices
- `POST /stripe/checkout` — create Stripe checkout session → returns `{ url }`
- `POST /stripe/portal` — create billing portal session → returns `{ url }`
- `GET /stripe/subscription/:userId` — get user's current subscription level
- `POST /stripe/webhook` — Stripe webhook (raw body; registered BEFORE express.json)
