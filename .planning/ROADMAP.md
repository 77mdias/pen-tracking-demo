# Roadmap: PenFlow77 Smart Pen Demo

## Overview

Build a premium, Apple-like hero section for a fictional smart pen product demo. Starting from a scaffolded Next.js project, progress through static layout, 3D rendering, content/CTA, intro motion, scroll narrative, responsive adaptation, graceful degradation, and final optimization — delivering a ship-ready hero section that maximizes private beta conversions.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

<!-- ✅ v1.0 Hero Foundation (Phases 1–4) - COMPLETE 2026-04-05 -->

### Phase 1: Static Hero Shell ✅
**Goal**: Premium static hero layout with correct design tokens, typography, and glass panel components — looks expensive without motion
**Depends on**: Nothing (first phase)
**Plans**: 3 plans

Plans:
- [x] 01-01: Next.js app structure, TailwindCSS v4 setup, design tokens
- [x] 01-02: HeroSection layout shell and responsive gate
- [x] 01-03: Static canvas placeholder and design system compliance

### Phase 2: 3D Scene Base ✅
**Goal**: 3D pen rendering with cinematic lighting via React Three Fiber
**Depends on**: Phase 1
**Plans**: 3 plans

Plans:
- [x] 02-01: HeroCanvas dynamic import (ssr:false) and R3F setup
- [x] 02-02: HeroScene with pen GLB model, lighting configuration
- [x] 02-03: Idle float animation (useFrame), pointer parallax

### Phase 3: Content & CTA Layer ✅
**Goal**: Text hierarchy and CTA layer with conversion focus
**Depends on**: Phase 1
**Plans**: 3 plans

Plans:
- [x] 03-01: HeroContent with headline, subheadline, support copy
- [x] 03-02: HeroCTA primary/secondary buttons with design system
- [x] 03-03: HeroScrollCue and HeroAmbientDetails

### Phase 4: Intro Motion ✅
**Goal**: Polished load choreography, text reveals, and subtle idle life via GSAP
**Depends on**: Phase 2, Phase 3
**Plans**: 3 plans

Plans:
- [x] 04-01: GSAP plugin registration (registerGsap.ts)
- [x] 04-02: useHeroTimeline intro sequence (split-line reveals, CTA entrance)
- [x] 04-03: Reduced motion support and cleanup

### 🚧 v1.1 Hero Experience (In Progress)

**Milestone Goal:** Scroll narrative, responsive adaptation, fallbacks, and final optimization — delivering a ship-ready premium hero.

## Progress

| Phase | Milestone | Status | Completed |
|-------|-----------|--------|-----------|
| 1. Static Hero Shell | v1.0 | ✅ Complete | 2026-04-05 |
| 2. 3D Scene Base | v1.0 | ✅ Complete | 2026-04-05 |
| 3. Content & CTA Layer | v1.0 | ✅ Complete | 2026-04-05 |
| 4. Intro Motion | v1.0 | ✅ Complete | 2026-04-05 |
| 5. Scroll Orchestration | v1.1 | ✅ Complete | 2026-04-05 |
| 6. Responsive and Mobile | v1.1 | ✅ Complete | 2026-04-05 |
| 7. Fallbacks and Reduced Motion | v1.1 | ✅ Complete | 2026-04-06 |
| 8. Optimization and Polish | v1.1 | ✅ Complete | - |




### Phase 5: Scroll Orchestration

**Goal:** Scroll deepens the experience with narrative progression — pen rotates 5–15°, camera shifts, content evolves as user scrolls
**Requirements**: TBD
**Depends on:** Phase 4
**Plans:** 3 plans

Plans:
- [ ] 05-01: useHeroScrollProgress hook (ScrollTrigger, scrub, ref-based progress)
- [ ] 05-02: Scroll-linked 3D transforms in HeroScene (pen rotation, camera shift via lerp)
- [ ] 05-03: Scroll-linked content transitions in useHeroTimeline + HeroContent

### Phase 6: Responsive and Mobile

**Goal:** Hero works correctly across all device sizes — desktop full 3D, tablet reduced amplitude, mobile video/still fallback with CTA-first layout
**Requirements**: TBD
**Depends on:** Phase 5
**Plans:** 3 plans

Plans:
- [ ] 06-01: HeroMobile component (video/still fallback, CTA-first stacked layout, no scroll coupling)
- [ ] 06-02: Responsive gate in HeroSection (isMobile/isTablet routing to correct variant)
- [ ] 06-03: Tablet reduced motion amplitude and simplified 3D reactions

### Phase 7: Fallbacks and Reduced Motion

**Goal:** Graceful degradation — non-WebGL HeroFallback, full prefers-reduced-motion compliance, keyboard accessibility
**Requirements**: TBD
**Depends on:** Phase 6
**Plans:** 3/3 plans complete

Plans:
- [x] 07-01-PLAN.md — HeroFallback premium non-WebGL visual + HeroCanvas aria-hidden
- [x] 07-02-PLAN.md — CSS transition kill-switch + HeroMobile entrance animation with reduced-motion gate
- [x] 07-03-PLAN.md — Contrast fix, ARIA attributes, keyboard navigation verification

### Phase 8: Optimization and Polish ✅ Complete

**Goal:** Ship-ready, performant, premium hero section with stable 60fps on desktop and validated cross-browser quality
**Requirements**: TBD
**Depends on:** Phase 7
**Plans:** 3/3 plans complete

Plans:
- [x] 08-01-PLAN.md — Asset optimization (Meshopt GLB compression, below-fold lazy loading)
- [x] 08-02-PLAN.md — Performance cleanup (dead useMemo removal, FOV optimization, DPR/frameloop verification)
- [x] 08-03-PLAN.md — Final polish and cross-browser QA (375px, 768px, 1024px, 1440px viewports)

### Phase 9: Alias Routes Polish — 3D pen side panel, AboutSection, color alignment ✅ Complete

**Goal:** Add two-column AliasLayout (glass form left + 3D idle pen right) to /beta and /auth, create AboutSection with tech stack + project stats, integrate into home + /beta, migrate alias route colors from red to design system blue (#007bff)
**Requirements**: REQ-9.1, REQ-9.2, REQ-9.3, REQ-9.4, REQ-9.5, REQ-9.6, REQ-9.7
**Depends on:** Phase 8
**Plans:** 3/3 plans complete

Plans:
- [x] 09-01-PLAN.md — AliasCanvas + AliasPenScene + aliasSceneConfig + AliasLayout (3D pen system)
- [x] 09-02-PLAN.md — AboutSection + aboutData (about section component + data)
- [x] 09-03-PLAN.md — Integration: wire into routes, color migration, home page AboutSection

### Phase 10: Design System Polish & UX Refinements

**Goal:** Apply design-system2.html visual language to alias routes (/beta, /auth, /dashboard) and AboutSection; fix home page snap-scroll so users can reach AboutSection; add interactive mouse-drag pen rotation + video background + overflow fix to alias routes.
**Requirements**: REQ-10.1, REQ-10.2, REQ-10.3, REQ-10.4, REQ-10.5, REQ-10.6, REQ-10.7
**Depends on:** Phase 9
**Plans:** 2/3 plans executed

Plans:
- [x] 10-01-PLAN.md — Design system: apply design-system2.html patterns to alias routes + AboutSection
- [x] 10-02-PLAN.md — Home scroll fix: release snap-scroll past last section + "about" pen pose/animation
- [ ] 10-03-PLAN.md — Alias 3D pen UX: mouse-drag rotation, remove container clipping, video background
