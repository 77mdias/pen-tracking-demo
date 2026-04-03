# HERO TECHNICAL BUILD PLAN — Smart Pen Demo
**Project:** Smart Pen Premium Demo  
**Document Type:** Hero Technical Build Plan  
**Version:** 1.0  
**Date:** 2026-04-03

---

## 1. Purpose

This document defines the **technical implementation plan** for the Smart Pen hero section.

It translates the Hero Spec into an execution-ready engineering plan, focused on:

- architecture
- component boundaries
- animation strategy
- performance
- responsive behavior
- 3D scene implementation
- scroll orchestration
- fallback strategy
- production constraints

This build plan is intended to support implementation with:
- Next.js
- React Three Fiber
- three.js
- GSAP
- TailwindCSS
- selective Framer Motion usage

---

## 2. Build Goals

The hero must achieve the following outcomes:

1. Feel premium and cinematic on desktop
2. Remain smooth and credible on mid-range hardware
3. Degrade gracefully on weaker devices and mobile
4. Keep the product as the main visual focus
5. Support conversion with a strong CTA hierarchy
6. Avoid scroll jank and visual overengineering
7. Be modular enough for future refinement

---

## 3. Recommended Tech Stack

## Core
- **Next.js** (App Router)
- **TypeScript**
- **TailwindCSS**
- **React Three Fiber**
- **three.js**
- **@react-three/drei**
- **GSAP**
- **GSAP ScrollTrigger**

## Optional / Conditional
- **Framer Motion** for lightweight UI entrance effects
- **Lenis** for smooth scrolling if the full site uses it consistently
- **Leva** only during development for tuning scene values, never shipped
- **gltfjsx** for componentizing a GLB model if useful

## Avoid using as core hero drivers
- raw wheel-event frame stepping
- excessive CSS-only transform choreography
- multiple competing animation libraries controlling the same element
- shader-heavy effects unless justified and tested

---

## 4. High-Level Build Strategy

## Desktop
Use a **3D-first hero** driven by:
- React Three Fiber for product rendering
- GSAP for timeline orchestration
- ScrollTrigger for scroll-based progression
- Tailwind for structure and layering

## Mobile
Use a **reduced-complexity hero**:
- lighter 3D scene or optimized video/still fallback
- simplified animation
- less scroll dependency
- stronger emphasis on typography and CTA

## Principle
The desktop hero is the premium showcase.  
The mobile hero is the conversion-safe simplified adaptation.

---

## 5. Build Phases

## Phase 1 — Static Composition
Goal:
Establish a premium hero without relying on complex animation.

Deliverables:
- basic layout
- text hierarchy
- CTA hierarchy
- product placement
- background tone
- hero responsive shell

Success criteria:
- hero already looks premium before advanced motion is added

---

## Phase 2 — 3D Product Scene
Goal:
Introduce the pen as a premium 3D object.

Deliverables:
- optimized pen model integrated into R3F
- base camera position
- base lighting rig
- idle motion
- initial material tuning

Success criteria:
- pen silhouette reads clearly
- scene feels premium while static
- performance is acceptable

---

## Phase 3 — Intro Motion
Goal:
Add first-load motion and entrance choreography.

Deliverables:
- product intro motion
- text stagger
- CTA entrance
- optional ambient UI details fade-in

Success criteria:
- motion feels intentional
- load state feels polished
- nothing feels aggressive or gimmicky

---

## Phase 4 — Scroll Narrative
Goal:
Add controlled scroll-linked story progression.

Deliverables:
- subtle product rotation
- slight camera shifts
- text state changes
- stronger beta invitation emphasis

Success criteria:
- scroll enhances the experience without trapping the user
- no visible stutter
- hero still works without deep scrolling

---

## Phase 5 — Optimization & Fallbacks
Goal:
Harden the experience for production.

Deliverables:
- reduced motion behavior
- mobile fallback
- weak-device degradation strategy
- asset optimization
- cleanup and code split review

Success criteria:
- stable experience across device classes
- no obvious jank
- fallback experience still feels premium

---

## 6. Recommended File / Folder Structure

For a Next.js app router project:

```txt
src/
  app/
    (marketing)/
      page.tsx
      layout.tsx
  components/
    hero/
      HeroSection.tsx
      HeroScene.tsx
      HeroCanvas.tsx
      HeroContent.tsx
      HeroCTA.tsx
      HeroAmbientDetails.tsx
      HeroScrollCue.tsx
      HeroFallback.tsx
      HeroMobile.tsx
  hooks/
    useHeroTimeline.ts
    useHeroScrollProgress.ts
    useReducedMotion.ts
    useDeviceCapabilities.ts
    useMediaQuery.ts
  lib/
    gsap/
      registerGsap.ts
    three/
      heroSceneConfig.ts
      heroLighting.ts
      heroMaterials.ts
      heroCamera.ts
    utils/
      lerp.ts
      clamp.ts
      rafThrottle.ts
  assets/
    models/
      smart-pen.glb
    textures/
      ...
  styles/
    globals.css
```

### Structure rationale
- keep hero code isolated
- separate scene logic from content logic
- keep GSAP hooks out of JSX-heavy components
- centralize configuration values so scene tuning is easier later

---

## 7. Component Responsibilities

## `HeroSection`
Top-level orchestration component.

Responsibilities:
- layout shell
- responsive switching
- layering order
- initial sizing
- CTA and content composition
- canvas + text alignment

Should not contain:
- raw animation setup logic
- low-level scene details

---

## `HeroCanvas`
Wrapper around the 3D canvas.

Responsibilities:
- Canvas mount
- renderer settings
- suspense boundary
- performance-related canvas props
- scene injection

---

## `HeroScene`
Contains the 3D scene.

Responsibilities:
- product model
- lighting
- camera rig
- product animation state
- subtle pointer interaction
- idle movement

Should not contain:
- text content
- DOM CTA logic
- high-level page layout

---

## `HeroContent`
The text layer above or beside the scene.

Responsibilities:
- headline
- subheadline
- supporting microcopy
- CTA row
- content spacing
- semantic heading structure

---

## `HeroCTA`
Reusable CTA group.

Responsibilities:
- primary button
- secondary button
- trust microcopy
- button states
- accessible interactions

---

## `HeroAmbientDetails`
Optional non-primary premium details.

Responsibilities:
- subtle supporting labels
- ambient UI hints
- tiny status indicators

Rule:
These must remain visually subordinate to the product and copy.

---

## `HeroScrollCue`
Subtle bottom cue.

Responsibilities:
- indicate continuation
- avoid stealing focus

---

## `HeroFallback`
Fallback for low-power or unsupported contexts.

Responsibilities:
- static image or video-based hero
- preserve hierarchy and CTA clarity

---

## `HeroMobile`
Dedicated mobile variant or mobile-first adaptation layer.

Responsibilities:
- simplified composition
- lower scene complexity
- layout optimization
- reduced motion path

---

## 8. Hook Responsibilities

## `useHeroTimeline`
Handles GSAP setup for intro and scroll sequencing.

Responsibilities:
- register animations
- manage refs
- create timelines
- cleanup on unmount
- isolate ScrollTrigger logic

---

## `useHeroScrollProgress`
Maps scroll progress to scene values or UI states.

Responsibilities:
- progress normalization
- value interpolation
- state bridging between DOM and scene

---

## `useReducedMotion`
Returns whether reduced motion is preferred.

Responsibilities:
- accessibility-based motion disabling
- simplify hero behavior

---

## `useDeviceCapabilities`
Detects whether high-end effects are safe.

Possible signals:
- viewport width
- DPR limits
- hardware concurrency approximation
- device memory if available
- user agent heuristics as a last resort

Use carefully:
This should be a graceful tuning mechanism, not a rigid blocker.

---

## `useMediaQuery`
Handles responsive branching.

Responsibilities:
- desktop vs mobile hero logic
- conditional asset loading

---

## 9. Rendering Strategy

## Canvas setup recommendations
- use antialias only if visually necessary
- clamp device pixel ratio
- use performant tone mapping choices
- avoid excessive shadows where possible
- keep clearColor aligned with page design

Example goals:
- DPR cap around `1.5` to `2` depending on performance
- preserve battery and thermal sanity
- avoid treating every device like a high-end workstation

## Camera strategy
Use a controlled perspective camera with:
- strong silhouette framing
- stable initial pose
- minimal movement range
- subtle parallax response

## Scene scale strategy
- normalize the pen model scale
- keep scene units consistent
- store tunable values in a config file

---

## 10. 3D Scene Plan

## Required scene elements
- pen model
- camera
- key light
- fill light
- rim light
- shadow strategy
- optional subtle environment reflections

## Pen behavior
- initial stable pose
- slow idle movement
- slight orientation change on scroll
- slight camera response to pointer
- no aggressive movement

## Lighting plan
Recommended setup:
- one dominant key
- soft fill
- subtle rim
- optional HDRI/environment reflection, very controlled

### Avoid
- too many light sources
- overblown highlights
- unrealistic toy-like shine
- visual noise from excessive reflection complexity

---

## 11. Model Pipeline

## Preferred asset format
- `.glb`

## Asset optimization requirements
- clean mesh
- reduced poly count
- compressed textures
- merged materials where reasonable
- avoid unnecessary geometry

## Suggested asset workflow
1. create or obtain pen model
2. clean geometry in DCC tool
3. optimize materials
4. export `.glb`
5. compress with glTF pipeline / Draco / Meshopt if appropriate
6. profile in-browser
7. refine lighting after real browser validation

## Important
Do not over-optimize too early if it hurts material quality.  
First get a premium silhouette and believable materials, then optimize carefully.

---

## 12. Animation Architecture

Split animations into three groups:

## A. Scene idle animation
Handled inside the 3D scene loop or a controlled spring/lerp pattern.

Includes:
- slight floating
- slight rotational drift
- subtle pointer response

This must be low-amplitude and nearly invisible in isolation.

---

## B. Intro timeline
Handled by GSAP.

Includes:
- scene reveal
- text fade/slide
- CTA entrance
- ambient detail fade-in

This sequence should happen once on load.

---

## C. Scroll-linked progression
Handled by GSAP ScrollTrigger or a synchronized scroll progress layer.

Includes:
- small product orientation changes
- copy emphasis transitions
- CTA reinforcement
- optional layout tightening

Keep the range restrained.  
The hero should not become a long scrubbed movie unless deliberately designed that way.

---

## 13. GSAP Usage Plan

## GSAP should control
- text entrance sequencing
- CTA appearance
- ambient DOM layers
- scroll progress mapping
- maybe high-level wrapper transforms

## GSAP should not directly micromanage every frame of 3D state
Use GSAP to orchestrate values, but let the scene interpolate smoothly.

### Recommended pattern
- GSAP updates target values
- scene reads those targets
- R3F interpolates visually

This prevents motion from feeling too rigid and reduces jank.

---

## 14. ScrollTrigger Strategy

## Recommended behavior
- trigger after hero enters viewport
- use a restrained scrub
- keep the narrative short
- do not block normal page progression

### Suggested scroll-linked effects
- pen rotates 5–15 degrees across the interaction span
- camera shifts slightly
- headline subtly compresses or fades in emphasis
- secondary line or microcopy appears
- CTA remains present and strong

### Avoid
- long pinning sequences unless tested carefully
- total hijacking of scroll behavior
- frame-by-frame wheel locking
- forcing users to complete animation before continuing

---

## 15. Framer Motion Usage Plan

Use Framer Motion only for:
- small UI fades
- button transitions
- minor content stagger if not already done in GSAP
- modal / overlay transitions elsewhere in the site

Do not let Framer Motion and GSAP fight over the same DOM nodes.

Rule:
One motion system per element.

---

## 16. Smooth Scroll Strategy

Use a smooth scroll library only if:
- the rest of the site uses it consistently
- it is tested with ScrollTrigger integration
- it does not degrade responsiveness

### Recommendation
If using Lenis:
- integrate carefully with GSAP ticker / update loop
- test mobile
- verify no lag on wheel and trackpad
- do not add it just because it looks fashionable

A premium site feels controlled, not artificially slippery.

---

## 17. Responsive Strategy

## Desktop
- full cinematic version
- full 3D hero
- richer motion
- stronger spatial composition

## Tablet
- reduced motion amplitude
- simplified 3D reactions
- maintain premium layout

## Mobile
- one-column content
- reduced scene complexity
- optional fallback to video or still
- CTA visible early
- no long scrub interactions

### Rule
Do not try to compress desktop choreography directly into mobile.

---

## 18. Fallback Strategy

Create at least three quality tiers.

## Tier 1 — Full premium
Use when:
- desktop / strong device
- sufficient GPU/CPU behavior
- normal motion settings

Features:
- full 3D
- scroll-linked motion
- pointer parallax
- ambient detail layers

## Tier 2 — Reduced premium
Use when:
- tablet
- weaker desktop
- reduced capability signals

Features:
- simplified 3D
- reduced reflections
- lighter motion
- fewer ambient layers

## Tier 3 — Safe fallback
Use when:
- mobile weak device
- reduced motion
- performance concerns

Features:
- optimized video or still
- strong typography
- no heavy scene logic
- preserved CTA flow

The fallback must still feel intentional, not broken.

---

## 19. Performance Plan

## Key performance rules
- keep hero payload disciplined
- lazy-load non-critical sections below hero
- defer heavy secondary assets
- cap DPR
- use compressed textures
- avoid unnecessary postprocessing
- profile first render and interaction

## Practical performance tactics
- dynamic import for hero scene if needed
- suspense for model loading
- use lower texture sizes where visually acceptable
- disable realtime shadows if not needed
- avoid transparent layered blur abuse
- reduce re-renders from state tied directly to pointer/scroll

## Interaction performance
- throttle pointer movement
- interpolate toward target values
- avoid setting React state on every movement tick
- keep animation math outside expensive component rerender paths

---

## 20. Accessibility Plan

## Mandatory support
- semantic heading structure
- keyboard-accessible CTAs
- visible focus states
- contrast-safe copy
- support for `prefers-reduced-motion`

## Reduced motion implementation
When reduced motion is true:
- disable scroll-linked scene choreography
- remove idle float if necessary
- keep product static or minimally animated
- make content immediately readable
- preserve CTA prominence

This should be a first-class mode, not an afterthought.

---

## 21. Suggested Implementation Order

## Step 1
Create a strong static DOM layout:
- headline
- subheadline
- CTA row
- spacing
- nav relationship
- hero height

## Step 2
Integrate a static pen render or temporary placeholder in the layout.

## Step 3
Add R3F canvas and place pen model with stable lighting.

## Step 4
Tune camera, materials, and silhouette until the product already feels premium.

## Step 5
Add initial load motion.

## Step 6
Add restrained pointer parallax.

## Step 7
Add short scroll narrative with ScrollTrigger.

## Step 8
Implement reduced motion behavior.

## Step 9
Implement device capability tiers and fallback path.

## Step 10
Profile and optimize.

This order prevents you from hiding weak composition behind fancy motion.

---

## 22. Engineering Quality Rules

- TypeScript strict mode
- one responsibility per component
- one animation owner per element
- scene config stored in plain objects or constants
- motion values isolated from layout code
- cleanup all GSAP timelines and triggers
- keep DOM and canvas concerns separate
- avoid magic numbers scattered across files

---

## 23. Suggested Scene Config Shape

Example structure concept:

```ts
export const heroSceneConfig = {
  camera: {
    position: [0, 0.2, 4],
    fov: 30,
  },
  pen: {
    position: [0, 0, 0],
    rotation: [0.15, 0.4, 0],
    idleFloatAmplitude: 0.04,
    idleRotationAmplitude: 0.03,
  },
  lighting: {
    key: { position: [3, 2, 4], intensity: 1.6 },
    fill: { position: [-2, 1, 2], intensity: 0.6 },
    rim: { position: [0, 2, -3], intensity: 0.8 },
  },
};
```

Use this as a tuning pattern, not a final exact setup.

---

## 24. Suggested Ref Strategy for GSAP Integration

Typical refs:
- hero wrapper ref
- content ref
- headline ref
- subheadline ref
- cta ref
- ambient ref
- scroll trigger container ref

For scene coordination:
- shared mutable refs for target rotation/camera values
- GSAP updates targets
- R3F interpolates toward them

This gives a smoother result than hard-switching transforms.

---

## 25. Testing Plan

## Functional testing
- hero renders without crashing
- CTA works
- fallback path works
- resize behavior is stable
- reduced motion is respected

## Experience testing
- first impression feels premium
- copy is readable immediately
- scroll feels smooth
- pointer reaction is subtle
- mobile is not overloaded

## Performance testing
- profile on desktop Chrome
- profile on laptop battery mode if possible
- test on mobile Safari / Chrome
- verify no layout thrashing
- verify no memory leaks from animation setup

---

## 26. Common Failure Modes to Avoid

- excellent motion on a weak layout
- too much animation amplitude
- product too small in frame
- text fighting with the object
- scroll lag from poor synchronization
- mobile trying to behave like desktop
- weak fallback that feels broken
- reflections/materials that look cheap
- multiple animation systems touching the same target

---

## 27. Production Readiness Checklist

Before shipping, confirm:

- [ ] hero looks premium even with animation disabled
- [ ] pen silhouette is clear and attractive
- [ ] CTA hierarchy is obvious
- [ ] no scroll jank on tested devices
- [ ] reduced motion mode works correctly
- [ ] mobile fallback feels intentional
- [ ] 3D assets are optimized
- [ ] GSAP timelines clean up correctly
- [ ] no unnecessary rerenders during interaction
- [ ] text remains readable over all backgrounds

---

## 28. Recommended Next Deliverables

After this file, the most useful next implementation files are:

1. **Hero Implementation Prompt**
   - for Claude CLI / Codex / agent execution
   - includes exact quality rules
   - includes performance constraints
   - includes library usage rules

2. **Hero Wireframe Spec**
   - desktop layer map
   - mobile layer map
   - spacing and alignment system

3. **Hero Copy Pack**
   - multiple headline/subheadline systems
   - CTA alternatives
   - microcopy variants

4. **Hero Component Scaffold**
   - starter file tree
   - component signatures
   - hook signatures
   - scene config template

---

## 29. Final Build Recommendation

For your exact use case, the best production build decision is:

> Build the hero as a **modular React Three Fiber + GSAP cinematic system**, with a **reduced-complexity mobile path** and a **premium fallback layer** for weaker devices.

This is the best path because it maximizes:
- premium perception
- product desirability
- motion control
- future scalability
- adaptation to device constraints

---

## 30. Final Priority Order

When building, prioritize in this order:

1. composition
2. silhouette
3. typography hierarchy
4. CTA clarity
5. materials and lighting
6. intro motion
7. scroll motion
8. ambient detail
9. optimization polish

If the first five are strong, the hero already wins.
If only the last four are strong, the hero usually feels flashy but weak.

