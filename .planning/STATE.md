# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-04-05)

**Core value:** A hero section so cinematically premium that visitors feel compelled to join the private beta before scrolling past it.
**Current focus:** Phase 5 — Scroll Orchestration

## Current Position

Phase: 5 of 8 (Scroll Orchestration)
Plan: 0 of 3 in current phase
Status: Ready to plan
Last activity: 2026-04-05 — GSD initialized; Phases 1–4 retroactively marked complete; Phase 5 set as active

Progress: [████████░░░░░░░░░░░░] 40%

## Performance Metrics

**Velocity:**
- Total plans completed: ~12 (Phases 1–4, estimated)
- Average duration: —
- Total execution time: —

**By Phase:**

| Phase | Plans | Status |
|-------|-------|--------|
| 1 | ~3 | ✅ Done |
| 2 | ~3 | ✅ Done |
| 3 | ~3 | ✅ Done |
| 4 | ~3 | ✅ Done |
| 5 | 0/3 | 🚧 Active |

*Updated after GSD initialization*

## Accumulated Context

### Decisions

- Phase 1–4: GSAP ↔ R3F bridge via mutable refs established — GSAP sets target values, R3F lerps in useFrame
- Phase 2: DPR capped at 1.5 mobile / recommendedMaxDpr desktop via useDeviceCapabilities
- Phase 3: CSS classes established for GSAP targeting: `.hero-headline`, `.hero-subheadline`, `.hero-support-copy`, `.hero-cta`, `.hero-cta-primary`, `.hero-cta-secondary`, `.hero-scroll-cue`
- Phase 4: `useGSAP` from `@gsap/react` used throughout — auto-cleanup via gsap.context()

### Roadmap Evolution

- Phase 1 added: Static Hero Shell
- Phase 2 added: 3D Scene Base
- Phase 3 added: Content & CTA Layer
- Phase 4 added: Intro Motion
- Phase 5 added: Scroll Orchestration
- Phase 6 added: Responsive and Mobile
- Phase 7 added: Fallbacks and Reduced Motion
- Phase 8 added: Optimization and Polish

### Notes

- `useHeroScrollProgress` already implemented in `src/hooks/useHeroScrollProgress.ts`
- Scroll-linked 3D transforms already in `src/components/hero/HeroScene.tsx` (pen rotation, camera shift via `scrollProgressRef`)
- Scroll content transitions partially implemented in `src/hooks/useHeroTimeline.ts` (`enableScrollNarrative` branch with quickSetters)
- Phase 5 implementation may be largely complete — plan phase should audit existing code against T5.1/T5.2/T5.3 acceptance criteria before adding new code
