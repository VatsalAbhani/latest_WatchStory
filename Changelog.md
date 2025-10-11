# Changelog – WatchStory

This file records all notable changes to the project. Before making any change, review this log to understand prior decisions and constraints. After making changes, register them here in the most relevant section.

Conventions:
- Use reverse chronological order (newest first)
- Group by date; include a short title and details
- Note affected files/dirs and rationale
- Use present tense, concise bullets

## 2025-01-15 – Fix missing cn utility import in Index.tsx
- What changed: Add missing `import { cn } from "@/lib/utils"` to `client/pages/Index.tsx` to resolve "Cannot find name 'cn'" error
- Why: The `cn` utility function is used for conditional className composition but wasn't imported
- Affected: `client/pages/Index.tsx`
- Notes: Fixes TypeScript compilation error in the HomeWatchCarousel component

## 2025-09-16 – Developer workflow docs and contribution guide
- What changed: Document how to run the project locally with PNPM (dev, build, start, test, typecheck) and add `CONTRIBUTING.md` with setup, quality checks, commit/PR, routing, and coding guidelines
- Why: Ensure consistent local setup and contribution practices; reduce onboarding friction
- Affected: Documentation (`Changelog.md`, `CONTRIBUTING.md`)
- Notes: No functional code changes; application behavior unchanged

## 2025-09-12 – Changelog initialized
- Add Changelog.md to establish change tracking process
- Conventions defined for future entries
- No functional code changes


Template for future entries:

## YYYY-MM-DD – Short title
- What changed: brief description
- Why: rationale/context
- Affected: list of key files/dirs
- Notes: any follow-ups, migrations, or risks

## 2025-10-01 – Replace Inter with Satoshi (Fontshare)
- What changed: Import Satoshi from Fontshare and set it as the base UI font via `--font-primary` and `html { font-family }`. Updated components using `var(--font-primary)` fallbacks.
- Why: Typography update to align with brand direction.
- Affected: `client/global.css`
- Notes: Display font `Cormorant Garamond` unchanged for headings (`.font-title`). Source: Fontshare Satoshi (`https://www.fontshare.com/?q=Satoshi`).
 
## 2025-10-02 – Fix nested useEffect cleanup in Layout
- What changed: Adjust `useEffect` in `client/components/Layout.tsx` to return a single cleanup function instead of a function that returns another cleanup. Removed nested return and used a single `setTimeout` inside the cleanup.
- Why: Resolve TypeScript error “Argument of type '() => () => () => void' is not assignable to parameter of type 'EffectCallback'”. React `useEffect` must return `void` or a single destructor function.
- Affected: `client/components/Layout.tsx`
- Notes: No behavior change; timing preserved (300ms delay) before killing `ScrollTrigger`s and resetting scroll.