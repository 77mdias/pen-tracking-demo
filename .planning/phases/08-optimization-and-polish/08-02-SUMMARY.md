---
phase: 08-optimization-and-polish
plan: 02
subsystem: ui
tags: [three.js, react-three-fiber, performance, dead-code-removal, webgl]

# Dependency graph
requires:
  - phase: 08-01
    provides: performance foundations and monitoring for hero 3D scene
provides:
  - Lean HeroScene.tsx with no dead useMemo allocations
  - Conditional cam.updateProjectionMatrix() (skips matrix recalc when FOV stable)
  - Verified DPR/frameloop architecture documented
affects: [hero-3d-rendering, frame-budget]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Conditional matrix updates: guard cam.updateProjectionMatrix() with threshold (0.001) to avoid per-frame matrix recalculations when value is stable"
    - "Dead useMemo audit: useMemo allocating objects that flow only to refs should be removed in favour of direct ref.current access"

key-files:
  created: []
  modified:
    - src/components/hero/HeroScene.tsx

key-decisions:
  - "Remove Color import from three — only used by dead useMemo calls, not needed anywhere else in HeroScene"
  - "Guard cam.updateProjectionMatrix() with Math.abs(newFov - cam.fov) > 0.001 — skips expensive matrix multiply every frame when FOV is stable (common case)"
  - "frameloop='always' is correct for low tier — 'demand' would freeze idle float animation; low tier already has motionScale=0.5 and ContactShadows disabled"
  - "DPR cap wiring verified correct: useDeviceCapabilities (low→1, medium→1.25, high→1.5) → HeroSection → HeroCanvas dpr={[1, maxDpr]}"

patterns-established:
  - "DPR flow: resolveRecommendedMaxDpr(tier) → HeroSection maxDpr → Canvas dpr=[1,maxDpr]"

requirements-completed: []

# Metrics
duration: 8min
completed: 2026-04-06
---

# Phase 8 Plan 02: Dead Code Removal & DPR/Frameloop Verification Summary

**Removed two dead `useMemo(() => new Color())` allocations from HeroScene, optimized `cam.updateProjectionMatrix()` to skip when FOV is stable, and documented DPR/frameloop architecture as verified-correct.**

## Performance

- **Duration:** 8 min
- **Started:** 2026-04-06T19:24:29Z
- **Completed:** 2026-04-06T19:32:00Z
- **Tasks:** 2
- **Files modified:** 1

## Accomplishments
- Removed `accentColor` and `tempColor` dead useMemo declarations (Color objects allocated but never read)
- Removed `Color` from the three.js import (no longer used after dead useMemo removal)
- Optimized `cam.updateProjectionMatrix()` to only run when FOV changes by more than 0.001 — saves a matrix multiply every frame in the common stable-FOV case
- Verified DPR cap wiring is correct end-to-end: `useDeviceCapabilities` → `HeroSection` → `HeroCanvas` → `<Canvas dpr={[1, maxDpr]}>`
- Verified frameloop strategy is correct: `"demand"` for `reducedMotion`, `"always"` otherwise (low tier handled via motionScale + ContactShadows disabled, not frameloop)
- Confirmed no `useState` in `HeroScene.tsx` or `HeroCanvas.tsx` (all per-frame values use refs)
- Confirmed single `useFrame` callback in `HeroScene.tsx`

## Task Commits

Each task was committed atomically:

1. **Task 1: Remove dead useMemo declarations and optimize FOV update** — `36db184` (perf)
2. **Task 2: Verify and document DPR cap and frameloop architecture** — verification only, no code changes

**Plan metadata:** _(docs commit — see below)_

## Files Created/Modified
- `src/components/hero/HeroScene.tsx` — Removed `accentColor`/`tempColor` useMemo, removed `Color` import, added FOV-change guard on `cam.updateProjectionMatrix()`

## Decisions Made
- **`Color` import removal:** `Color` was only referenced in the two dead useMemo calls. After removal, no other site in HeroScene used `Color` directly — the accent light color is set via `accentLightRef.current.color.set(acc.color)` which calls the Three.js `Color.set()` method internally without needing a separate `Color` instance in scope.
- **FOV guard threshold 0.001:** Chosen because `lerp` converges asymptotically; at < 0.001 difference, the visual delta is imperceptible and the matrix recalculation provides no benefit.
- **frameloop='always' for all non-reducedMotion tiers:** Switching low tier to `"demand"` would freeze the idle float animation. Low tier already receives reduced motion budget via `motionScale=0.5` and ContactShadows being disabled — frameloop is not the right lever for low-tier optimization.

## DPR Architecture Verification (Task 2)

| Tier | `resolveRecommendedMaxDpr` | HeroSection cap | Canvas `dpr` range |
|------|---------------------------|-----------------|-------------------|
| low  | 1                         | min(1, 1.5) = 1 | [1, 1]            |
| medium | 1.25                    | 1.25            | [1, 1.25]         |
| high | 1.5                       | 1.5             | [1, 1.5]          |

Mobile additionally caps `recommendedMaxDpr` to `1.5` (no effect since high tier already returns 1.5 as its max).

**Frameloop:**
- `frameloop={reducedMotion ? "demand" : "always"}` — correct
- `"demand"` pauses rAF completely; idle float runs via `useFrame` so it needs `"always"`
- `reducedMotion` is set via `prefers-reduced-motion` OS setting — correct gate

**Render anti-patterns:**
- `useState` in HeroScene.tsx: 0 occurrences ✅
- `useState` in HeroCanvas.tsx: 0 occurrences ✅
- `useFrame` calls in HeroScene.tsx: 1 (import + 1 call = grep count 2; actual callbacks = 1) ✅

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None.

## User Setup Required
None - no external service configuration required.

## Known Stubs
None.

## Threat Flags
None — dead code removal and per-frame optimization, no new network surfaces or auth paths.

## Self-Check: PASSED
- `src/components/hero/HeroScene.tsx` — exists, Color import removed, dead useMemo removed, FOV guard added ✅
- Commit `36db184` — exists ✅
- `bun run lint` — 0 errors (104 warnings all from vendor file `iconify_654a1ef798a3.js`) ✅
- `bun run build` — compiled successfully ✅

## Next Phase Readiness
- HeroScene is lean and production-ready
- DPR/frameloop architecture is documented and verified-correct
- Phase 08 complete — ready for final QA and ship

---
*Phase: 08-optimization-and-polish*
*Completed: 2026-04-06*
