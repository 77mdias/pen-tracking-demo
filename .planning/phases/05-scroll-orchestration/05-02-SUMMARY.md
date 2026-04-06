---
phase: 05-scroll-orchestration
plan: "02"
subsystem: 3d-scene
tags: [r3f, three, scroll, animation, gsap, lerp]

requires:
  - phase: 05-01
    provides: progressRef with normalized scroll 0→1

provides:
  - Pen Y-axis rotation driven by scroll (15° range)
  - Camera X/Y/Z drift driven by scroll (0.3 units)
  - All transforms via useFrame lerp — no GSAP ownership of 3D elements

affects: [06-responsive, 08-optimization]

tech-stack:
  added: []
  patterns: [R3F useFrame lerp toward mutable ref targets — GSAP never touches Three.js objects]

key-files:
  created: []
  modified: []
  deleted: []
---

# 05-02 Summary: HeroScene 3D Scroll Transforms — Brownfield Audit

**One-liner:** Scroll-linked 3D transforms complete — pen rotates 15°, camera drifts 0.3 units, all via useFrame lerp consuming scrollProgressRef.

## What Was Done

Brownfield audit only. No code changes.

`src/components/hero/HeroScene.tsx` verified against T5.2 acceptance criteria:
- `targetRotY` updated per frame: `scrollProgressRef.current * rotationRangeDegrees`
- `targetRotX` subtle counter-rotation for premium feel
- `targetCameraX/Y/Z` updated per frame from `heroSceneConfig.scroll.cameraShift`
- All targets lerped in `useFrame` — GSAP bridge pattern maintained
- Reduced-motion guard: all targets freeze at zero when `reducedMotion` is true

Config values in `src/lib/three/heroSceneConfig.ts`:
- `scroll.rotationRangeDegrees: 15`
- `scroll.cameraShift: 0.3`

## Decisions Made

None — followed existing implementation. Config values locked per CONTEXT.md (not discussed = not changed).

## Deviations from Plan

None — audit only plan, no executor tasks.

## Next Phase Readiness

T5.2 complete. 3D scroll transforms stable and performant.

---
*Phase: 05-scroll-orchestration*
*Completed: 2026-04-05*
