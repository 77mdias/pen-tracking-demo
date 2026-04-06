---
phase: 09-alias-routes-polish-hero-video-background-centered-layout-3d
plan: "01"
subsystem: alias-routes-3d
tags: [r3f, three.js, layout, alias-routes, 3d-pen, idle-animation]
dependency_graph:
  requires:
    - "08-x: pen3D.glb model (preloaded by HeroScene)"
    - "hooks/useDeviceCapabilities"
    - "hooks/useReducedMotion"
  provides:
    - "AliasLayout — two-column layout shell for /beta and /auth"
    - "AliasPenCanvas — R3F Canvas wrapper with ssr:false"
    - "AliasPenScene — idle-only R3F scene (float + Y rotation)"
    - "aliasSceneConfig — typed config constants for alias pen scene"
  affects:
    - "09-03-PLAN.md (wires AliasLayout into actual route pages)"
tech_stack:
  added:
    - "@react-three/fiber (Canvas, useFrame)"
    - "@react-three/drei (useGLTF, ContactShadows)"
    - "three (Group, Object3D)"
  patterns:
    - "TDD: RED (failing test) → GREEN (implementation)"
    - "next/dynamic with ssr:false for R3F Canvas"
    - "refs-only useFrame (no useState in animation paths)"
    - "CSS hidden md:block for responsive hiding (no JS)"
key_files:
  created:
    - "src/lib/three/aliasSceneConfig.ts"
    - "src/components/alias/AliasPenScene.tsx"
    - "src/components/alias/AliasPenCanvas.tsx"
    - "src/components/alias/AliasLayout.tsx"
    - "tests/unit/aliasSceneConfig.test.ts"
  modified: []
decisions:
  - id: D-1
    description: "aliasSceneConfig uses gentler idle values than heroSceneConfig: yAmplitude=0.06 (hero: 0.04), yFrequency=0.6 (hero: 0.8, slower), rotationYSpeed=0.15 (continuous Y vs hero oscillating Z)"
  - id: D-2
    description: "AliasPenScene has zero scroll/pointer coupling — idle float + continuous Y rotation only. This is intentional and architecturally distinct from HeroScene."
  - id: D-3
    description: "AliasLayout uses CSS hidden md:block exclusively for responsive hiding — no JS/useMediaQuery to avoid hydration mismatch. supportsWebGL check only gates Canvas instantiation."
metrics:
  duration_minutes: 4
  completed_date: "2026-04-06"
  tasks_completed: 3
  files_created: 5
  files_modified: 0
---

# Phase 9 Plan 01: AliasLayout + 3D Pen Side-Panel System Summary

**One-liner:** Idle-only R3F pen scene (float + continuous Y rotation) with two-column AliasLayout wrapper using CSS-only responsive hiding and next/dynamic ssr:false.

## What Was Built

Four production files + one unit test establishing the 3D pen side-panel system for alias routes (/beta, /auth):

### `src/lib/three/aliasSceneConfig.ts`
Typed const config with camera (`position: [0, 0.1, 3.2]`, `fov: 35`) and pen settings (idle `yAmplitude: 0.06`, `yFrequency: 0.6`, `rotationYSpeed: 0.15`). Values intentionally differ from `heroSceneConfig` for visual distinction — calmer float, continuous Y rotation instead of oscillating Z.

### `src/components/alias/AliasPenScene.tsx`
Simplified idle-only R3F scene: `useGLTF('/models/pen3D.glb')`, `useFrame` with sin-wave Y float + continuous Y rotation. Zero `useState` in animation paths — refs only per D-3. `reducedMotion` guard at top of `useFrame` keeps pen static. Blue accent `pointLight` at `[1.5, 0, 2]` color `#007bff` ties scene to design system. `ContactShadows` on medium/high tier only.

### `src/components/alias/AliasPenCanvas.tsx`
R3F `Canvas` wrapper with `dpr={[1, maxDpr]}` (maxDpr ≤ 1.5 from `useDeviceCapabilities`), `frameloop='demand'` when `reducedMotion`, `aria-hidden="true"` on outer div (3D is decorative), `alpha: true` (transparent background). Simpler than `HeroCanvas` by design — no scroll/pose props.

### `src/components/alias/AliasLayout.tsx`
Two-column grid (`grid-cols-1 md:grid-cols-2`) with `next/dynamic({ ssr: false })` for `AliasPenCanvas`. Canvas column: `"relative hidden h-[500px] md:block"` — CSS-only responsive hiding (no JS hydration risk). `supportsWebGL` check gates Canvas instantiation. `h-[500px]` gives the `absolute inset-0` Canvas a sized parent. `AliasLayout` owns the `<main>` tag.

### `tests/unit/aliasSceneConfig.test.ts`
5 assertions: camera.position length + types, camera.fov positive, pen.position length + types, pen.rotation length + types, idle values all positive. TDD workflow: RED (module not found) → GREEN (all pass).

## Task Commits

| Task | Description | Commit |
|------|-------------|--------|
| 1 | aliasSceneConfig + unit tests (TDD) | 88c0ea7 |
| 2 | AliasPenScene + AliasPenCanvas | 3f5ef35 |
| 3 | AliasLayout two-column wrapper | 8600a73 |

## Decisions Made

1. **Gentler config values**: `aliasSceneConfig` uses `yFrequency=0.6` (slower than hero's 0.8) and continuous Y rotation (`rotationYSpeed=0.15`) vs hero's oscillating Z rotation — creates "display case" spin feel fitting a side panel.

2. **No scroll coupling**: `AliasPenScene` has zero `scrollProgressRef`, `penTargetRef`, or pointer parallax. Idle animation is always-on by design (pen shows product while user fills form).

3. **CSS-first mobile hiding**: `hidden md:block` via Tailwind, not `useMediaQuery` JS — avoids server/client hydration mismatch. `supportsWebGL` only gates Canvas init (resource concern, not layout concern).

## Deviations from Plan

None - plan executed exactly as written.

## Known Stubs

None — all components are complete and functional. Route pages consuming `AliasLayout` will be wired in 09-03.

## Threat Flags

None — pure client-side UI components. No new API surfaces, no server state, no auth changes. Canvas is `aria-hidden="true"` and renders only a decorative GLB model.

## Self-Check: PASSED

Files exist:
- ✅ src/lib/three/aliasSceneConfig.ts
- ✅ src/components/alias/AliasPenScene.tsx
- ✅ src/components/alias/AliasPenCanvas.tsx
- ✅ src/components/alias/AliasLayout.tsx
- ✅ tests/unit/aliasSceneConfig.test.ts

Commits exist:
- ✅ 88c0ea7 — feat(09-01): aliasSceneConfig + unit tests (TDD)
- ✅ 3f5ef35 — feat(09-01): AliasPenScene + AliasPenCanvas
- ✅ 8600a73 — feat(09-01): AliasLayout two-column wrapper

Tests: ✅ 5/5 passing
TypeScript: ✅ 0 errors
Lint: ✅ 0 errors (104 pre-existing warnings in node_modules only)
