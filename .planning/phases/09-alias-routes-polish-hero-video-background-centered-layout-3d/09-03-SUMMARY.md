---
phase: 09-alias-routes-polish-hero-video-background-centered-layout-3d
plan: "03"
subsystem: pages/alias-routes
tags: [alias-layout, about-section, color-migration, integration]
dependency_graph:
  requires:
    - "09-01 (AliasLayout, AliasPenCanvas, AliasPenScene, aliasSceneConfig)"
    - "09-02 (AboutSection, aboutData)"
  provides:
    - "/beta page with AliasLayout 3D two-column layout + AboutSection"
    - "/auth page with AliasLayout 3D two-column layout"
    - "/dashboard page with blue accent color system"
    - "Home page with AboutSection as final section"
  affects:
    - "All alias routes user-facing appearance"
    - "Global accent color: red (#ef233c) → blue (#007bff)"
tech_stack:
  added: []
  patterns:
    - "AliasLayout wrapping: children = left column, 3D pen = right column (md+)"
    - "next/dynamic with ssr:true for server-rendered dynamic imports"
    - "Fragment wrapper (<>) for AliasLayout + AboutSection sibling pattern"
key_files:
  created: []
  modified:
    - src/app/beta/page.tsx
    - src/app/auth/page.tsx
    - src/app/dashboard/page.tsx
    - src/app/page.tsx
decisions:
  - "AliasLayout replaces <main> wrapper — BetaContent and AuthContent no longer render <main>"
  - "AboutSection rendered outside AliasLayout as a sibling Fragment child (not inside two-column grid)"
  - "Auth error text <p role='alert'> preserves #ef233c — semantically red is correct for validation errors"
  - "Dashboard gets color migration only — no AliasLayout (dashboard is a different page archetype)"
  - "AboutSection uses ssr:true dynamic import on home page — same pattern as ProductIntroSection"
metrics:
  duration: "~8 minutes"
  completed: "2025-01-20"
  tasks_completed: 3
  files_modified: 4
---

# Phase 09 Plan 03: Integration — AliasLayout + AboutSection + Color Migration Summary

**One-liner:** Wired AliasLayout (3D two-column layout) into /beta and /auth pages, added AboutSection to home and /beta, and migrated all alias route accent colors from red (#ef233c) to blue (#007bff) with one semantic exception preserved.

## What Was Built

### Task 1 — /beta page: AliasLayout + AboutSection + color migration

`src/app/beta/page.tsx` was refactored to:
- Remove the `<main>` wrapper from `BetaContent` (AliasLayout renders its own `<main>`)
- Wrap the `<section className="glass-panel">` as `children` to `<AliasLayout>` — making it the left column with the 3D pen scene hidden on mobile
- Add `<AboutSection />` as a Fragment sibling after `<AliasLayout>` for full-width placement below the queue card
- Migrate all 4 color occurrences: `#ef233c` → `#007bff` (Private Beta label, Join/Sign-in buttons, dashboard hover border)
- Import `AliasLayout` directly and `AboutSection` via `next/dynamic` with `ssr: true`

### Task 2 — /auth page: AliasLayout + color migration + /dashboard color migration

`src/app/auth/page.tsx` was refactored to:
- Both render branches (signed-in welcome view + sign-in form) now return `<AliasLayout>` as their root
- All 8 `#ef233c` occurrences changed to `#007bff`: Access labels (×2), Continue to beta button, hover borders (×3), email input focus ring (×2), submit button (×4 instances)
- **EXCEPTION preserved**: `<p className="... text-[#ef233c]" role="alert">` — validation error text stays red (semantic correctness)

`src/app/dashboard/page.tsx` received color-only migration:
- 5 occurrences replaced: Dashboard Preview label, Start the journey button (border + bg + hover), Back to landing hover border, Beta queue hover border, Back to landing hover border in signed-in nav
- No structural changes — dashboard remains a standalone full-width page

### Task 3 — Home page: AboutSection added

`src/app/page.tsx` updated to:
- Import `AboutSection` via `next/dynamic` with `ssr: true` (matches ProductIntroSection pattern)
- Render `<AboutSection />` inside `<main>` after `<HeroSection>` (outside the hero scroll region)
- AboutSection has its own `bg-[#050a14]` and `py-24 lg:py-32` padding making it the page's final section

## Verification Results

| Check | Result |
|-------|--------|
| `bun run tsc --noEmit` | ✅ Exit 0 |
| `bun run lint` | ✅ Exit 0 (104 pre-existing warnings in `creative-agency-template.aura.build/`, 0 errors) |
| `bun run vitest --run` | ✅ 27/27 tests pass |
| `bun run build` | ✅ OpenNext build complete |
| `/beta color audit` | ✅ 0 matches for #ef233c |
| `/auth color audit` | ✅ Exactly 1 match (error text role="alert") |
| `/dashboard color audit` | ✅ 0 matches |
| AliasLayout in /beta | ✅ 5 references (import + 1 render) |
| AliasLayout in /auth | ✅ 5 references (import + 2 renders) |
| AboutSection in home | ✅ 3 references |
| AboutSection in /beta | ✅ 4 references |

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Comment text contained `#ef233c` literal causing false grep match**
- **Found during:** Task 1 color audit
- **Issue:** A code comment `{/* CTA area — all #ef233c → #007bff per D-6 */}` contained the literal color string, causing grep to report 1 match instead of 0 for /beta page
- **Fix:** Changed comment to `{/* CTA area — accent colors migrated to blue per D-6 */}` — description preserved, grep test passes correctly
- **Files modified:** `src/app/beta/page.tsx`
- **Commit:** 493cc42

## Known Stubs

None. All components render real data from Wave 1 components (AliasLayout, AboutSection, aboutData).

## Threat Flags

None. This plan performs layout restructuring and color value swaps only. No new network endpoints, auth paths, file access patterns, or schema changes introduced.

## Self-Check: PASSED

- `src/app/beta/page.tsx` — FOUND ✓
- `src/app/auth/page.tsx` — FOUND ✓
- `src/app/dashboard/page.tsx` — FOUND ✓
- `src/app/page.tsx` — FOUND ✓
- Commit 493cc42 — FOUND ✓
