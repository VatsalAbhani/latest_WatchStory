# Contributing to WatchStory

Thank you for contributing. This document explains how to set up, run, and contribute safely.

## Prerequisites
- Node.js 18+
- PNPM installed

Install PNPM if needed:
```bash
npm i -g pnpm
# or
corepack enable && corepack prepare pnpm@latest --activate
```

## Setup
```bash
pnpm install
```

## Run (development)
```bash
pnpm dev
```
- App + API at `http://localhost:8080`
- API routes under `/api/*`

## Build and run (production)
```bash
pnpm build
pnpm start
```

## Quality checks
- Type check: `pnpm typecheck`
- Tests: `pnpm test`

## Commit & PR
- Keep commits focused and descriptive
- Reference changed area (client/server/shared/docs)
- Update `Changelog.md` for any user-visible or developer-impacting change
- Explain rationale in PR description

## Coding guidelines
- TypeScript throughout
- Only add server endpoints when strictly necessary (per Fusion Starter rules)
- Use Tailwind and components in `client/components/ui`
- Prefer small, readable functions; comment only non-obvious logic

## Routes
- SPA pages in `client/pages/*`, wired in `client/App.tsx`
- API routes in `server/routes/*`, mounted in `server/index.ts`
- Share types via `shared/*`

## Before merging
- [ ] `pnpm typecheck` passes
- [ ] `pnpm test` passes
- [ ] `pnpm build` succeeds
- [ ] `Changelog.md` updated

## Reporting issues
Open an issue with steps to reproduce, expected vs actual, and environment details.
