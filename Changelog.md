# Changelog – WatchStory

This file records all notable changes to the project. Before making any change, review this log to understand prior decisions and constraints. After making changes, register them here in the most relevant section.

Conventions:
- Use reverse chronological order (newest first)
- Group by date; include a short title and details
- Note affected files/dirs and rationale
- Use present tense, concise bullets

## 2025-01-15 – Fix ref type mismatch in Footer.tsx AnimatedTextLink
- What changed: Change `linkRef` type from `HTMLAnchorElement` to `HTMLDivElement` in `AnimatedTextLink` component
- Why: The ref was being attached to `div` elements but typed for anchor elements, causing TypeScript error about incompatible ref types
- Affected: `client/components/Footer.tsx`
- Notes: Resolves TypeScript error "Type 'MutableRefObject<HTMLAnchorElement>' is not assignable to type 'LegacyRef<HTMLDivElement>'"

## 2025-01-15 – Fix missing BuyPageFilter props in Buy.tsx
- What changed: Add missing `sortOption`, `onSortChange`, and `onFilterChange` props to `BuyPageFilter` component in `client/pages/Buy.tsx` and implement corresponding handler functions
- Why: The `BuyPageFilter` component interface requires these props for sorting and filtering functionality, but they were missing from the component usage
- Affected: `client/pages/Buy.tsx`
- Notes: Fixed TypeScript error "Type is missing properties: sortOption, onSortChange, onFilterChange" by adding the missing props and their handler functions

## 2025-01-15 – Fix missing Watch interface properties in Index.tsx
- What changed: Add missing `bgColor` and `textColor` properties to `manyWatches` array in `client/pages/Index.tsx` to match the `Watch` interface expected by `HorizontalWatchShowcase` component
- Why: The `HorizontalWatchShowcase` component requires `bgColor` and `textColor` properties for dynamic theming, but the data mapping was missing these required fields
- Affected: `client/pages/Index.tsx`
- Notes: Fixed TypeScript error "Type is missing properties: bgColor, textColor" by adding `bgColor: 'bg-black'` and `textColor: 'text-offwhite'` to the watch objects

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