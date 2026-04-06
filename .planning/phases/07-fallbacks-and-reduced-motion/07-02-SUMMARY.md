---
plan: 07-02
phase: 7
subsystem: hero-fallbacks
tags: [reduced-motion, css, gsap, hero-mobile, accessibility]
dependency_graph:
  requires: [07-01]
  provides: [full-reduced-motion-compliance, hero-mobile-animation]
  affects: [src/app/globals.css, src/components/hero/HeroMobile.tsx]
tech_stack:
  added: []
  patterns: [gsap-scope-containerRef, reduced-motion-gate, universal-transition-kill]
key_files:
  modified:
    - src/app/globals.css
    - src/components/hero/HeroMobile.tsx
decisions:
  - "Used transition-duration: 0.01ms (not 0/none) so animationend/transitionend events still fire for any JS listeners"
  - "HeroMobile GSAP entrance scoped to containerRef to prevent selector leaks to desktop HeroContent"
  - "CTA-first stagger order (CTA → headline → subheadline) matches Phase 6 UX hierarchy decision"
metrics:
  duration: "2 minutes"
  completed: "2026-04-06"
  tasks_completed: 2
  files_modified: 2
---

# Phase 7 Plan 02: Reduced Motion Audit — Full Compliance Summary

**One-liner:** Universal CSS transition kill-switch + GSAP-gated HeroMobile entrance animation closing all remaining `prefers-reduced-motion` compliance gaps.

## What Was Built

Closed the two remaining accessibility gaps in `prefers-reduced-motion` compliance:

1. **CSS Transition Kill-Switch (`globals.css`):** The existing `@media (prefers-reduced-motion: reduce)` block was extended with a universal `*, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }` rule. This covers button hover transitions (`transition-all duration-150/200` on CTA buttons), decorative fades, and any other CSS transitions not targeted by the per-selector rules above it.

2. **HeroMobile Entrance Animation (`HeroMobile.tsx`):** Added a GSAP staggered entrance animation (CTA → headline → subheadline) with a `reducedMotion` prop gate. When `reducedMotion=true`, `gsap.set()` immediately sets `opacity:1, y:0` on all targets — no animation plays. When `reducedMotion=false`, elements fade-in with stagger (delay 0.2s, power2.out). Removed `void reducedMotion` placeholder — prop is now fully consumed.

## Tasks Completed

| # | Task | Commit | Files |
|---|------|--------|-------|
| 1 | CSS transition kill-switch | e8f24e9 | src/app/globals.css |
| 2 | HeroMobile GSAP entrance + reduced-motion gate | a6fc52f | src/components/hero/HeroMobile.tsx |

## Decisions Made

- **`0.01ms` not `0` or `none`:** Ensures `animationend`/`transitionend` events still fire for any JS listeners. Using `none` could break GSAP callbacks that listen to CSS animation events.
- **`scope: containerRef`:** GSAP selectors scoped to HeroMobile's container prevent `.hero-headline`/`.hero-cta`/`.hero-subheadline` from accidentally targeting desktop HeroContent elements.
- **`revertOnUpdate: true`:** GSAP reverts and re-applies when `reducedMotion` changes (e.g., user toggles OS reduced-motion setting at runtime).

## Deviations from Plan

None — plan executed exactly as written.

## Known Stubs

None — all functionality fully wired.

## Verification

- `bun run lint`: ✅ 0 errors (106 pre-existing warnings, unrelated to this plan)
- `bun run build`: ✅ Build succeeds

## Self-Check: PASSED
