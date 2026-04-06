---
phase: 06-responsive-and-mobile
plan: "02"
subsystem: ui
tags: [react, routing, mobile, hero, typescript]

requires:
  - phase: 06-01
    provides: HeroMobile component

provides:
  - HeroSection mobile routing: isMobile → HeroMobile, else → HeroContent
  - HeroContent cleaned of isMobile prop (tablet+desktop only)

affects: [07-fallbacks]

tech-stack:
  added: []
  patterns: [conditional component routing via isMobile flag]

key-files:
  created: []
  modified:
    - src/components/hero/HeroSection.tsx
    - src/components/hero/HeroContent.tsx
  deleted: []
---

# 06-02 Summary: HeroSection Routing + HeroContent Cleanup

**One-liner:** HeroSection now routes isMobile → HeroMobile; HeroContent cleaned of all mobile logic and is now tablet+desktop only.

## What Was Done

### HeroSection.tsx
- Added `import HeroMobile from "@/components/hero/HeroMobile"`
- Replaced `<HeroContent isMobile={isMobile} isTablet={isTablet} />` with:
  ```tsx
  {isMobile ? <HeroMobile reducedMotion={reducedMotion} /> : <HeroContent isTablet={isTablet} />}
  ```
- Outer container div (padding conditionals) unchanged

### HeroContent.tsx
- Removed `isMobile?: boolean` from `HeroContentProps`
- Removed isMobile ternary for subheadline (desktop copy is now constant)
- Removed `isMobile={isMobile}` from `<HeroCTA />` call

## Decisions Made

- Desktop copy is now the canonical subheadline in HeroContent (mobile copy exclusively in HeroMobile)
- TypeScript strict mode validates no other callers pass isMobile to HeroContent

## Deviations from Plan

None — all changes as specified. lint 0 errors, build clean.

---
*Phase: 06-responsive-and-mobile*
*Completed: 2026-04-05*
