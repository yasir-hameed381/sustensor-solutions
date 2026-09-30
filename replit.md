# Sustensor Solutions Profile

An interactive single-page advisory profile for Sustensor Solutions, with responsive presentation, architecture exploration, and print-ready PDF export.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/sustensor-profile/src/App.tsx` — profile content, interactions, navigation, and PDF export.
- `artifacts/sustensor-profile/src/index.css` — visual system, responsive layout, motion, and print rules.
- `artifacts/sustensor-profile/package.json` — frontend dependencies, including `html2pdf.js`.

## Architecture decisions

- The profile is frontend-only because the brief is a static, presentation-first company profile.
- The four architecture pillars are interactive so the detailed logic/solution copy stays scannable without losing depth.
- PDF export uses a dedicated print-friendly capture mode plus `page-break-inside: avoid` rules to keep sections intact.

## Product

- Presents Sustensor Solutions’ regional positioning and advisory capabilities.
- Lets visitors navigate to the reality check, architecture, regional lens, and contact areas.
- Exports the profile as a multi-page PDF and provides direct WhatsApp and corporate briefing actions.

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

_Populate as you build — sharp edges, "always run X before Y" rules._

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
