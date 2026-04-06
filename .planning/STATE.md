---
gsd_state_version: 1.0
milestone: v1.1
milestone_name: Hero Experience
status: complete
last_updated: "2026-04-06T18:49:59.229Z"
last_activity: 2026-04-06
progress:
  total_phases: 8
  completed_phases: 3
  total_plans: 9
  completed_plans: 9
  percent: 100
---

# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-04-05)

**Core value:** A hero section so cinematically premium that visitors feel compelled to join the private beta before scrolling past it.
**Current focus:** Phase 07 — fallbacks-and-reduced-motion

## Current Position

Phase: 07 (fallbacks-and-reduced-motion) — COMPLETE ✅
Plan: 3 of 3
Status: Verified — all 14 acceptance criteria passed
Last activity: 2026-04-06

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
| 5 | 3/3 | ✅ Done |
| 6 | 3/3 | ✅ Done |

*Updated after GSD initialization*
| Phase 07 P01 | 5m | 2 tasks | 2 files |
| Phase 07 P02 | 2m | 2 tasks | 2 files |
| Phase 07 P03 | 3m | 2 tasks | 3 files |

## Accumulated Context

### Decisions

- Phase 1–4: GSAP ↔ R3F bridge via mutable refs established — GSAP sets target values, R3F lerps in useFrame
- Phase 2: DPR capped at 1.5 mobile / recommendedMaxDpr desktop via useDeviceCapabilities
- Phase 3: CSS classes established for GSAP targeting: `.hero-headline`, `.hero-subheadline`, `.hero-support-copy`, `.hero-cta`, `.hero-cta-primary`, `.hero-cta-secondary`, `.hero-scroll-cue`
- Phase 4: `useGSAP` from `@gsap/react` used throughout — auto-cleanup via gsap.context()
- [Phase 07]: Video opacity raised from 40% to 70% without mix-blend-screen for clear fallback visibility
- [Phase 07]: aria-hidden=true added to HeroCanvas wrapper — 3D canvas is decorative content
- [Phase 07-02]: transition-duration:0.01ms instead of 0/none — preserves animationend/transitionend event firing for JS listeners
- [Phase 07-02]: HeroMobile GSAP scoped to containerRef to prevent selector leaks to desktop HeroContent
- [Phase 07]: text-zinc-400 selected for disclaimer to match secondary CTA styling while achieving 7.73:1 WCAG AA contrast
- [Phase 07]: aria-label wording 'Hero — Join the Private Beta' matches primary CTA action for consistent screen reader experience

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
