---
gsd_state_version: 1.0
milestone: v1.1
milestone_name: Hero Experience
status: executing
last_updated: "2026-04-06T20:22:19.423Z"
last_activity: 2026-04-06 -- Phase null execution started
progress:
  total_phases: 9
  completed_phases: 4
  total_plans: 15
  completed_plans: 13
  percent: 87
---

# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-04-05)

**Core value:** A hero section so cinematically premium that visitors feel compelled to join the private beta before scrolling past it.
**Current focus:** Phase null

## Current Position

Phase: null — EXECUTING
Plan: 1 of ?
Status: Executing Phase null
Last activity: 2026-04-06 -- Phase null execution started

Progress: [████████████████████] 100%

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
| Phase 08 P01 | 2 | 2 tasks | 4 files |
| Phase 08 P02 | 8m | 2 tasks | 1 file |
| Phase 09 P01 | 4 | 3 tasks | 5 files |

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
- [Phase 08]: Meshopt GLB compression via gltf-transform optimize reduced pen3D.glb from 7.7MB to 1.1MB (86% reduction)
- [Phase 08]: next/dynamic with ssr:true for ProductIntroSection — SSR preserves DOM for ScrollTrigger, JS still code-split
- [Phase 08-02]: Guard cam.updateProjectionMatrix() with Math.abs(newFov - cam.fov) > 0.001 — skips expensive matrix multiply every frame when FOV is stable
- [Phase 08-02]: frameloop='always' correct for all non-reducedMotion tiers — 'demand' would freeze idle float animation; low tier uses motionScale=0.5 instead
- [Phase 08-02]: DPR cap wiring verified: useDeviceCapabilities (low→1, medium→1.25, high→1.5) → HeroSection → HeroCanvas dpr=[1,maxDpr]
- [Phase 09]: aliasSceneConfig uses gentler idle values than heroSceneConfig: yFrequency=0.6 (slower), continuous Y rotation instead of oscillating Z
- [Phase 09]: AliasLayout uses CSS hidden md:block exclusively for responsive hiding — no JS/useMediaQuery to prevent hydration mismatch

### Roadmap Evolution

- Phase 1 added: Static Hero Shell
- Phase 2 added: 3D Scene Base
- Phase 3 added: Content & CTA Layer
- Phase 4 added: Intro Motion
- Phase 5 added: Scroll Orchestration
- Phase 6 added: Responsive and Mobile
- Phase 7 added: Fallbacks and Reduced Motion
- Phase 8 added: Optimization and Polish
- Phase 9 added: Alias Routes Polish — Hero video background, centered layout, 3D pen variants, and About section

### Notes

- `useHeroScrollProgress` already implemented in `src/hooks/useHeroScrollProgress.ts`
- Scroll-linked 3D transforms already in `src/components/hero/HeroScene.tsx` (pen rotation, camera shift via `scrollProgressRef`)
- Scroll content transitions partially implemented in `src/hooks/useHeroTimeline.ts` (`enableScrollNarrative` branch with quickSetters)
- Phase 5 implementation may be largely complete — plan phase should audit existing code against T5.1/T5.2/T5.3 acceptance criteria before adding new code
