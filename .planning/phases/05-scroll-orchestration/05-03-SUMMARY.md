---
phase: 05-scroll-orchestration
plan: "03"
subsystem: ui
tags: [gsap, animation, content, hero, tailwind]

requires:
  - phase: 05-01
    provides: scrollProgressRef
  - phase: 04-intro-motion
    provides: useHeroTimeline, GSAP quickSetter pattern

provides:
  - Support copy "Built for the way you actually think." appears mid-scroll (20–60%)
  - Support copy styled as editorial aside: text-base, zinc-200, italic
  - CTA remains accessible through 80%+ of scroll (unchanged)

affects: [07-fallbacks, 08-polish]

tech-stack:
  added: []
  patterns: [scroll window timing via dual fade-in/fade-out Math.max/min formula]

key-files:
  created: []
  modified:
    - src/components/hero/HeroContent.tsx
    - src/hooks/useHeroTimeline.ts
  deleted: []
---

# 05-03 Summary: Support Copy Text & Animation Timing

**One-liner:** Support copy updated to "Built for the way you actually think." with mid-scroll appearance window (20%→peak 40%→60% fade-out).

## What Was Done

### T1 — HeroContent.tsx
Updated `.hero-support-copy` paragraph:
- Text: `"Designed for focused writing sessions..."` → `"Built for the way you actually think."`
- Classes: `text-sm text-zinc-300` → `text-base text-zinc-200 italic`
- `opacity-0` preserved (GSAP controls opacity at runtime)

### T2 — useHeroTimeline.ts
Replaced one-line opacity formula with dual fade-in/fade-out window:
```ts
// Before:
setSupportCopyOpacity(Math.min(1, progress * 3) * fadeOut);

// After:
const supportCopyFadeIn = Math.max(0, Math.min(1, (progress - 0.20) / 0.20));
const supportCopyFadeOut = Math.max(0, Math.min(1, (0.60 - progress) / 0.20));
setSupportCopyOpacity(supportCopyFadeIn * supportCopyFadeOut);
```

## Verification

- `bun run lint` — 0 errors, 106 warnings (all pre-existing)
- `bun run build` — OpenNext build complete, no new errors

## Decisions Made

- Timing formula matches exactly what was captured in 05-CONTEXT.md (discuss-phase decisions)
- No other quickSetter calls in `applyScrollProgress` were touched
- `opacity-0` class retained to prevent FOUC before GSAP init

## Deviations from Plan

None — implemented exactly as specified in 05-03-PLAN.md.

## Next Phase Readiness

Phase 5 complete. All T5.x criteria met. Ready for Phase 6 (Responsive and Mobile).

---
*Phase: 05-scroll-orchestration*
*Completed: 2026-04-05*
