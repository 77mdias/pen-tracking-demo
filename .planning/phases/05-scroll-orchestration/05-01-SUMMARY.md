---
phase: 05-scroll-orchestration
plan: "01"
subsystem: hooks
tags: [gsap, scroll, scrolltrigger, animation]

requires:
  - phase: 04-intro-motion
    provides: useGSAP pattern, GSAP plugin registration

provides:
  - Normalized scroll progress (0→1) via ScrollTrigger scrub
  - progressRef (mutable) for R3F useFrame consumption without React re-renders

affects: [05-02-scroll-3d, 05-03-content-transitions, 06-responsive]

tech-stack:
  added: []
  patterns: [ScrollTrigger scrub into mutable ref — never useState]

key-files:
  created: []
  modified: []
  deleted: []
---

# 05-01 Summary: useHeroScrollProgress — Brownfield Audit

**One-liner:** Scroll progress hook already complete — ScrollTrigger scrub writes to progressRef, consumed by R3F useFrame.

## What Was Done

Brownfield audit only. No code changes.

`src/hooks/useHeroScrollProgress.ts` was verified as complete against T5.1 acceptance criteria:
- `ScrollTrigger.create` wired with `start: "top top"`, `end: "bottom top"`, `scrub: true`
- `onUpdate` writes `self.progress` → `progressRef.current` (mutable ref, no React state)
- Reduced-motion guard: returns early, `progressRef.current = 0`
- Cleanup: `trigger.kill()` on unmount
- `progressRef` exported and consumed by `HeroScene.tsx` (T5.2) and `useHeroTimeline.ts` (T5.3)

## Decisions Made

None — followed existing implementation.

## Deviations from Plan

None — audit only plan, no executor tasks.

## Next Phase Readiness

T5.1 complete. progressRef available to all scroll consumers.

---
*Phase: 05-scroll-orchestration*
*Completed: 2026-04-05*
