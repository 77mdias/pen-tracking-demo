---
plan: 10-03
phase: 10
subsystem: alias-ux / 3d-scene
tags: [three-js, drag-rotation, pointer-events, video-background, overflow-fix]
dependency_graph:
  requires: [10-01]
  provides: [alias-drag-rotation, alias-video-bg, alias-overflow-fix]
  affects: [AliasLayout, AliasPenCanvas, AliasPenScene]
tech_stack:
  added: []
  patterns: [pointer-capture, lerp-smoothing, refs-in-animation-path, dynamic-import-ssr-false]
key_files:
  created: []
  modified:
    - src/components/alias/AliasLayout.tsx
    - src/components/alias/AliasPenCanvas.tsx
    - src/components/alias/AliasPenScene.tsx
decisions:
  - Pointer capture used on pointer-down so drag continues outside the element boundary
  - isDraggingRef and dragRot*Ref kept as useRef (not useState) per D-3 to avoid re-render in animation path
  - dragRotYRef synced to current idle rotation on each idle frame to eliminate jump on grab mid-spin
  - X-rotation clamped to ±0.8 rad to prevent pen flipping upside down
metrics:
  duration: 7m
  completed: "2026-04-06"
  tasks_completed: 4
  files_modified: 3
---

# Phase 10 Plan 03: Alias 3D Pen UX — Drag Rotation + Overflow Fix + Video Background Summary

**One-liner:** Interactive drag-to-rotate 3D pen on alias routes with pointer-capture, lerp-smoothed idle↔drag transitions, overflow fix, and VideoBackground added.

## What Was Done

All 4 tasks executed in a single pass:

1. **Overflow fix** (`AliasLayout.tsx`): Replaced `h-[500px]` fixed height on the right column with `flex-1 self-stretch min-h-[500px]`, allowing the column to grow with the grid row and eliminate clipping during the float animation.

2. **VideoBackground** (`AliasLayout.tsx`): Added `next/dynamic` import of `VideoBackground` with `ssr: false`. Added `relative` to `<main>`, inserted `<VideoBackground className="z-0" />` as first child, and ensured both content columns carry `relative z-10`.

3. **Drag rotation** (`AliasPenCanvas.tsx`): Added 5 animation refs (`isDraggingRef`, `lastPointerX/YRef`, `dragRotX/YRef`) plus `isGrabbing` useState for cursor CSS only. Pointer-down captures the pointer; move accumulates delta into drag refs; up/leave releases. Wrapped the Canvas in the outer drag div with `cursor-grab` / `cursor-grabbing`.

4. **AliasPenScene drag consumption** (`AliasPenScene.tsx`): Added `MutableRefObject` type import, `lerp` import, three new props in the type and function signature. Replaced the simple `useFrame` spin with drag-aware version: X-rotation lerped toward `rx + dragRotXRef.current`; when dragging, Y lerped toward target; when idle, Y continuously incremented and `dragRotYRef` synced to avoid jump on grab.

## Commits

| Hash | Message |
|------|---------|
| `6160026` | `feat(10-03): alias pen UX — drag rotation, overflow fix, video background` |

## Deviations from Plan

None — plan executed exactly as written.

## Known Stubs

None.

## Threat Flags

None — no new network endpoints, auth paths, or schema changes introduced.

## Self-Check: PASSED
