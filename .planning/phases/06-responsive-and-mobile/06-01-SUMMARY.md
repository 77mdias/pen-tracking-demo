---
phase: 06-responsive-and-mobile
plan: "01"
subsystem: ui
tags: [react, tailwind, mobile, cta, hero]

requires:
  - phase: 03-content-cta-layer
    provides: HeroCTA component with isMobile prop

provides:
  - HeroMobile component: CTA-first layout (badge → CTA → headline → subheadline)
  - hero-headline, hero-subheadline classes on mobile for GSAP enter animation compatibility
  - reducedMotion prop accepted (Phase 7 ready)

affects: [07-fallbacks, 08-polish]

tech-stack:
  added: []
  patterns: [void unusedProp pattern for Phase 7 forward-compat]

key-files:
  created: []
  modified:
    - src/components/hero/HeroMobile.tsx
  deleted: []
---

# 06-01 Summary: HeroMobile Component

**One-liner:** HeroMobile stub replaced with CTA-first layout (badge → CTA → headline → subheadline) — no video, no glass circle, R3F canvas from HeroSection is the background.

## What Was Done

Full rewrite of `src/components/hero/HeroMobile.tsx`. Old stub had a video element + glass circle (wrong — those belong to HeroSection's canvas/video layer). New component is a pure DOM text/CTA layer.

Layout order (top to bottom):
1. Editorial badge: `border-gradient-spin`, red dot, "Smart Pen Premium Demo"
2. CTA: `<HeroCTA isMobile={true} />` — secondary button hidden automatically
3. Headline: two-line split, second line with white gradient, `text-4xl font-display`
4. Subheadline: mobile copy, `text-base text-zinc-300`

## Decisions Made

- `void reducedMotion` pattern used — prop kept for Phase 7 entrance animation, silences lint
- `className` prop removed — HeroSection owns the outer container, HeroMobile is always full-width
- `hero-headline`/`hero-subheadline` classes retained so `useHeroTimeline` GSAP enter targets remain valid on mobile

## Deviations from Plan

None — implemented exactly as specified.

---
*Phase: 06-responsive-and-mobile*
*Completed: 2026-04-05*
