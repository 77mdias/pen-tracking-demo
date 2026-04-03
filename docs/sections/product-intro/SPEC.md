# PRODUCT INTRO SECTION SPEC — Smart Pen Demo

**Project:** Smart Pen Premium Demo  
**Document Type:** Section Creative & Technical Specification  
**Section:** Product Intro (Second Fold)  
**Version:** 1.0  
**Date:** 2026-04-03  
**Depends on:** Hero Section (completed)

---

## 1. Section Purpose

The Product Intro is the **first section below the hero fold**. Its job is to transition the user from *emotional desire* (established by the hero) into *rational understanding* of what the Smart Pen actually does.

This section must:

- **Continue the cinematic quality** established by the hero
- **Introduce the three core value pillars** (AI Writing, Smart Sync, Focus Mode)
- **Maintain the 3D pen as a transitional element** — the pen from the hero persists or re-enters, reinforcing product continuity
- **Progressively reveal features** through scroll-driven storytelling, not static grids
- **Drive toward the private beta CTA** with increasing urgency

This is NOT a feature dump. It is a **narrative product reveal** — each pillar gets its own visual moment.

---

## 2. Strategic Goal

After experiencing this section, the user should understand:

- The pen is more than hardware — it has an intelligent software layer
- Three specific abilities make it worth desiring: AI Writing, Smart Sync, Focus Mode
- The product ecosystem is cohesive, not fragmented
- They want to scroll further or click "Join the Private Beta"

### Conversion Reinforcement

A secondary CTA appears at the end of this section, echoing the hero CTA but with a stronger urgency signal: "Limited spots available."

---

## 3. Narrative Structure

The section unfolds in **four narrative beats**, each scroll-triggered:

### Beat 1 — The Transition Bridge
> "More than a pen."

- A typographic statement bridges the hero to the features
- The 3D pen from the hero is still visible, transitioning from hero pose to a new angle
- Minimal supporting copy — one short sentence
- Purpose: signal the narrative is deepening

### Beat 2 — AI Writing Assist
> "Write. Refine. Evolve."

- The pen subtly rotates to reveal a "writing" angle
- A glass-panel card appears alongside with icon + headline + short description
- Animated line or particle effect suggesting digital text processing
- Copy focus: clarity, suggestions, intelligent rewriting
- Key visual: the pen appears to "think" — subtle glow or pulse on the pen tip

### Beat 3 — Smart Sync
> "Every stroke, everywhere."

- The pen shifts to a slight overhead view, suggesting connectivity
- Sync visualization: subtle animated lines or dots connecting pen to cloud iconography
- Glass-panel card with icon + headline + short description
- Copy focus: seamless cloud sync, multi-device access, real-time
- Key visual: connection lines radiating from pen

### Beat 4 — Focus Mode
> "Silence the noise."

- The pen returns to a centered, restful pose
- Ambient lighting dims slightly for dramatic effect
- The surrounding UI fades to emphasize isolation and simplicity
- Glass-panel card: icon + headline + short description
- Copy focus: minimal UI, distraction-free, deep work, single-purpose mode
- Key visual: the pen in a pool of quiet light

---

## 4. 3D Pen Continuity Strategy

### Core Concept

The 3D pen model (`/public/models/pen3D.glb`) is **shared between hero and product-intro sections**. This creates a seamless cinematic flow.

### Technical Approach — Option A: Shared Canvas (Recommended)

The R3F Canvas extends beyond the hero viewport, spanning both hero and product-intro sections. The pen's position, rotation, and lighting are driven by a **unified scroll progress** value that maps across both sections.

```
Scroll Progress 0.0–1.0 → Hero section
Scroll Progress 1.0–2.0 → Product Intro section (remapped to 0.0–1.0 locally)
```

**Advantages:**
- No model reload or duplicate canvas
- Seamless visual transition between sections
- Single animation loop = better performance

**Implementation:**
- The `HeroCanvas` becomes a `SceneCanvas` that spans `h-[200vh]` or uses `position: sticky`
- A new `useProductIntroScrollProgress` hook returns progress for the second fold
- The `HeroScene` component reads both progress refs and interpolates accordingly
- New lighting/rotation targets are defined in a `productIntroSceneConfig.ts`

### Technical Approach — Option B: Sticky Canvas Layer

A single sticky canvas sits at `position: fixed` or `position: sticky` on top of the page. The DOM content scrolls beneath/beside it. The canvas is shared globally and receives scroll progress from whichever section is active.

**Advantages:**
- Cleaner DOM separation
- Canvas completely independent from section layout
- Easier to extend to future sections

**Disadvantages:**
- z-index complexity
- Need careful pointer event management
- May complicate mobile fallback

### Recommendation

**Use Option A (Shared Canvas)** for the initial implementation. It is simpler, more predictable, and easier to debug. Option B can be adopted later if more sections require the 3D pen.

---

## 5. Visual Design Rules

### Design System Compliance (Mandatory)

All design decisions must use tokens from `design-system.html`:

| Element | Token |
|---------|-------|
| Background | `#050a14` (page bg) |
| Section bg accent | Subtle `radial-gradient` with `rgba(0,123,255,0.06)` shift per beat |
| Cards | `.glass-panel` pattern exactly as defined |
| Card borders | Top `0.15`, sides `0.08`, bottom `0.05` opacity |
| Headings | Montserrat (`font-heading`), `text-4xl md:text-5xl font-medium tracking-tight` |
| Body text | Open Sans, `text-base text-gray-400 leading-relaxed` |
| Micro labels | `text-[10px] uppercase tracking-[0.2em] text-gray-300` |
| Feature icons | Glass icon containers: `w-14 h-14 bg-gradient-to-br from-white/10 to-transparent border border-white/10 rounded-2xl` |
| Dividers | `h-px bg-white/10` |
| Primary accent | `#007bff` gradient `→ #00bfff` |
| CTA at section end | Same primary button pattern as hero |

### Layout

- Max width: `max-w-7xl mx-auto px-6`
- Section padding: `py-32` (8rem top/bottom)
- Feature cards: split layout — text on one side, visual (3D or illustration) on the other
- Cards alternate alignment per beat: left-right-left pattern
- 8pt spacing grid

### Typography for This Section

| Element | Classes |
|---------|---------|
| Section micro label | `text-[10px] uppercase tracking-[0.2em] text-gray-300` |
| Beat headline | `font-heading text-4xl md:text-5xl font-medium tracking-tight text-white` |
| Beat subheadline | `text-lg md:text-xl text-white/70 leading-relaxed font-light max-w-lg` |
| Feature card title | `font-heading text-xl font-medium text-white tracking-tight` |
| Feature card body | `text-base text-gray-400 leading-relaxed` |
| Emphasis text | `text-transparent bg-clip-text bg-gradient-to-r from-[#007bff] to-cyan-400` |

---

## 6. Motion Design

### Entrance Pattern

Each beat enters via scroll-reveal:
- Cards: `opacity: 0 → 1`, `translateY(40px → 0)`, duration `0.8s`, easing `power2.out`
- Headline: split-line reveal with `80ms` stagger
- Icon containers: slight scale `0.85 → 1` + opacity
- Stagger between elements in a beat: `120ms`

### 3D Pen Motion Per Beat

| Beat | Pen Rotation (from hero end pose) | Camera Shift | Lighting Change |
|------|------------------------------------|-------------|-----------------|
| 1 (Bridge) | Slight Y-axis rotation +10° | None | None |
| 2 (AI Writing) | Tilt forward 8°, slight Z-roll | Slight zoom in | Warm accent light on pen tip |
| 3 (Smart Sync) | Rotate Y +25° (show side profile) | Shift right 0.15 | Cool cyan rim light |
| 4 (Focus Mode) | Return to centered, slight backward lean | Pull back slightly | Dim all except key light |

### Easing

- Card entrance: `power2.out`
- 3D pen transitions: `power3.inOut` via lerp in `useFrame`
- Text reveals: `cubic-bezier(0.23, 1, 0.32, 1)` (from design system `.split-line`)

### Reduced Motion

When `prefers-reduced-motion` is active:
- All cards immediately visible
- No scroll-linked 3D animation
- Pen stays in a neutral static pose
- Feature icons render without scale animation
- Content readable without scrolling

---

## 7. Responsive Strategy

### Desktop (≥1024px)

- Full 3D pen + scroll-linked rotation
- Split layouts: text left / canvas right, alternating
- All four beats visible on scroll
- Pointer parallax on pen continues

### Tablet (768px–1023px)

- Reduced 3D motion amplitude (×0.6)
- Cards stack to full-width, centered
- Text and visual area no longer split — stacked vertically
- Pen remains but with simpler transitions

### Mobile (<768px)

- **No 3D pen in this section** — only hero has the 3D element
- Replace pen with static icon illustrations or subtle CSS animations
- Cards: single column, full width
- Simplified scroll reveals (opacity only, no translateY)
- Beat headlines slightly smaller: `text-3xl md:text-4xl`
- CTA visible early, never buried

---

## 8. Accessibility

- Each beat has a proper heading hierarchy: `h2` for section title, `h3` for beat titles
- All icons have `aria-label` descriptions
- Glass-panel cards have proper `role="article"` or semantic grouping
- Feature descriptions are screen-reader friendly
- No critical information conveyed only through 3D animation
- Keyboard focus: CTA at section end receives proper focus flow
- Color contrast: all text meets WCAG 2.1 AA over `#050a14` background

---

## 9. Content (Final Copy)

### Section Label
`[ 01. PRODUCT ]`

### Beat 1 — Bridge
- **Headline:** "More than a pen."
- **Body:** "A new kind of writing experience — where premium hardware meets an intelligent digital layer."

### Beat 2 — AI Writing
- **Icon:** Brain/Sparkle
- **Label:** `AI WRITING ASSIST`
- **Headline:** "Write. Refine. Evolve."
- **Body:** "Intelligent suggestions that sharpen your clarity without breaking your flow. The pen learns your style, suggests refinements, and keeps your voice intact."

### Beat 3 — Smart Sync
- **Icon:** Cloud/Arrows
- **Label:** `SMART SYNC`
- **Headline:** "Every stroke, everywhere."
- **Body:** "Your writing syncs seamlessly across devices in real-time. From pen to cloud to screen — nothing is ever lost."

### Beat 4 — Focus Mode
- **Icon:** Target/Circle
- **Label:** `FOCUS MODE`
- **Headline:** "Silence the noise."
- **Body:** "A distraction-free writing mode that strips away everything but you and the page. Deep work, protected."

### Section End CTA
- **Primary:** "Join the Private Beta"
- **Microcopy:** "Limited spots available. Early access waves closing soon."

---

## 10. Component Architecture

```
components/
└── product-intro/
    ├── ProductIntroSection.tsx      # Layout shell, responsive gate, scroll orchestration
    ├── ProductIntroCanvas.tsx       # R3F Canvas wrapper (if using separate canvas)
    ├── ProductIntroScene.tsx        # 3D pen poses per beat (if using separate canvas)
    ├── ProductIntroBridge.tsx       # Beat 1: transition statement
    ├── FeatureCard.tsx              # Reusable glass-panel feature card
    ├── FeatureAIWriting.tsx         # Beat 2: AI writing content + visual
    ├── FeatureSmartSync.tsx         # Beat 3: sync content + visual
    ├── FeatureFocusMode.tsx         # Beat 4: focus content + visual
    └── ProductIntroCTA.tsx          # End-of-section CTA block

hooks/
├── useProductIntroTimeline.ts      # GSAP entrance timeline for section
└── useProductIntroScrollProgress.ts # Scroll progress 0→1 for this section

lib/
└── three/
    └── productIntroSceneConfig.ts  # 3D pose targets per beat
```

### Component Responsibilities

| Component | Responsibility |
|-----------|---------------|
| `ProductIntroSection` | Section shell, z-index, responsive gate, hook orchestration |
| `ProductIntroCanvas` | R3F canvas (only if separate from hero canvas) |
| `ProductIntroScene` | Read scroll progress, interpolate pen to beat-specific poses |
| `ProductIntroBridge` | "More than a pen" transition text |
| `FeatureCard` | Reusable card: icon + label + headline + body |
| `FeatureAIWriting` | Beat 2 specific layout + visual enhancements |
| `FeatureSmartSync` | Beat 3 specific layout + visual enhancements |
| `FeatureFocusMode` | Beat 4 specific layout + visual enhancements |
| `ProductIntroCTA` | Conversion block with CTA + microcopy |

---

## 11. Performance Budget

| Metric | Target |
|--------|--------|
| FPS during scroll | ≥55fps on mid-range desktop |
| Additional JS bundle | <15KB gzipped (section-specific code) |
| No additional 3D assets | Reuses `pen3D.glb` from hero |
| Intersection Observer | Lazy-render cards not in viewport |
| GSAP timelines | Scoped, cleaned up on unmount |
| No new fonts or heavy assets | Zero additional network requests for core |

---

## 12. Integration with Hero

### Scroll Flow

```
┌──────────────────────────┐
│      Hero Section        │  scroll: 0.0 → 1.0
│    (h-screen, 100vh)     │
├──────────────────────────┤
│   Product Intro Section  │  scroll: 0.0 → 1.0 (local)
│   (~200vh or auto)       │
│                          │
│   Beat 1: Bridge         │  progress 0.0 → 0.2
│   Beat 2: AI Writing     │  progress 0.2 → 0.5
│   Beat 3: Smart Sync     │  progress 0.5 → 0.75
│   Beat 4: Focus Mode     │  progress 0.75 → 1.0
│                          │
│   [CTA Block]            │
└──────────────────────────┘
```

### Pen State Handoff

The pen ends the hero at:
- **Position:** `[0, 0, 0]` + scroll offsets
- **Rotation:** base `[0.15, 0.4, 0]` + ~15° Y rotation from hero scroll
- **Camera:** base + shifts from hero scroll

The product-intro section **picks up from these values** and continues the choreography. There must be NO visual jump or reset.

---

## 13. Success Criteria

The product intro section is successful if:

1. **Transition from hero feels seamless** — no visual break or jarring reset
2. **Each feature is understood in <5 seconds** of its beat being visible
3. **The 3D pen reinforces each feature** without being distracting
4. **Cards feel premium** — glass-panel aesthetic matches design system exactly
5. **CTA at section end feels like a natural next step**, not a hard sell
6. **Performance remains smooth** — no scroll jank, no FPS drops
7. **Mobile looks intentional**, not like a degraded desktop
8. **Reduced motion users** get full content understanding without animation
9. **Users want to keep scrolling** after this section

---

## 14. Risk Areas

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| 3D pen transition jank between hero and section | High | Breaks immersion | Use shared canvas; extensive lerp testing |
| Too much content per beat | Medium | Visual fatigue | Strict one-card-per-beat rule |
| Feature cards look generic | Medium | Loses premium feel | Follow glass-panel design system exactly; unique visual per beat |
| Scroll progress desync between sections | Medium | Broken choreography | Test scroll boundaries carefully; use GSAP markers |
| Mobile fallback feels empty without 3D | Medium | Loss of engagement | Use quality icon illustrations and CSS animations |
| Performance regression from extended canvas | Low | FPS drops | Profile; consider `frameloop="demand"` when section not visible |
| Copy too long or too vague | Low | Low engagement | Keep to one headline + two sentences max per beat |

---

## 15. Open Decisions

These need to be resolved before or during implementation:

1. **Shared canvas vs separate canvas?** — Recommendation is shared, but needs prototype validation
2. **Exact pen poses per beat** — Requires tuning once 3D integration works
3. **Feature icons** — Use Lucide (via Iconify) or custom SVGs?
4. **Sound design?** — Optional subtle ambient transitions per beat (likely not for MVP)
5. **Particle effects for AI Writing beat?** — Adds premium feel but has performance cost
