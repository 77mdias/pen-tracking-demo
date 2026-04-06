# Phase 5: Scroll Orchestration - Context

**Gathered:** 2026-04-05
**Status:** Ready for planning
**Source:** discuss-phase session

<domain>
## Phase Boundary

Phase 5 delivers the scroll-deepened narrative experience for the hero section. When the user scrolls through the hero, the 3D pen rotates, camera shifts, and the DOM content evolves in a cinematic sequence that reinforces the "Write. Think. Evolve." brand story.

**In scope:**
- Scroll progress tracking (useHeroScrollProgress)
- Scroll-linked 3D transforms: pen rotation + camera shift (HeroScene)
- Scroll-linked content transitions: headline, subheadline, support copy, CTA (useHeroTimeline)

**Out of scope (Phase 6+):**
- Snap scroll between product intro sections (useSnapScroll — already implemented)
- Mobile-specific scroll behavior
- Reduced motion path

</domain>

<decisions>
## Implementation Decisions

### Support Copy (Scroll Reward)

**Decision: Keep as a "scroll reward" — appears briefly during scroll as a premium detail.**

- **Text:** `"Built for the way you actually think."` ← CHANGED from "Designed for focused writing sessions with a subtle intelligent layer."
- **Timing:** Appears at 20% scroll progress (delayed appearance — more surprising), peaks fully around 30-40%, fades with the rest of the content but stays visible until ~60% scroll
- **Prominence:** Larger than current — upgrade from `text-sm text-zinc-300` to `text-base` or `text-lg`, more readable as a statement
- **Style:** Maintain italic or slightly differentiated style to feel like an "editorial aside"

**Implementation guidance:**
```ts
// In useHeroTimeline.ts applyScrollProgress:
// Appears after 20% scroll, peaks at 40%, fades by 60%
const supportCopyFadeIn = Math.max(0, Math.min(1, (progress - 0.20) / 0.20)); // 0→1 between 20-40%
const supportCopyFadeOut = Math.max(0, Math.min(1, (0.60 - progress) / 0.20)); // 1→0 between 40-60%
const supportCopyOpacity = supportCopyFadeIn * supportCopyFadeOut;
```

### Scroll Narrative (Unlocked — the agent's Discretion)

The overall scroll narrative was **not discussed** — downstream agents should maintain the current well-implemented behavior:
- Headline scales down + fades by 40% scroll (keep)
- Subheadline shifts down + fades by 40% scroll (keep)
- CTA stays visible until 80%+ scroll (keep — CTA always accessible rule)
- Pen rotates 15° across scroll range (keep — configured in heroSceneConfig.scroll.rotationRangeDegrees)
- Camera shifts 0.3 units across scroll range (keep — configured in heroSceneConfig.scroll.cameraShift)

### 3D Rotation (Unlocked — the agent's Discretion)

15° rotation range and 0.3 camera shift were **not discussed** — keep existing values from `heroSceneConfig.ts`. The current implementation already satisfies T5.2 acceptance criteria.

### Snap Scroll Interaction (Unlocked — the agent's Discretion)

The interaction between `useHeroScrollProgress` and `useSnapScroll` was **not discussed**. The snap scroll snap threshold (30px) means the scrub narrative plays during the 0.85s snap animation. This is acceptable. No changes requested.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Animation Architecture
- `src/hooks/useHeroScrollProgress.ts` — Scroll progress hook (COMPLETE — do not rewrite)
- `src/hooks/useHeroTimeline.ts` — GSAP timeline with scroll narrative (UPDATE support copy text + timing)
- `src/components/hero/HeroScene.tsx` — Scroll-linked 3D transforms (COMPLETE — do not rewrite)
- `src/components/hero/HeroContent.tsx` — DOM content layer with `.hero-support-copy` element

### Configuration
- `src/lib/three/heroSceneConfig.ts` — Scroll rotation range (15°) and camera shift (0.3) — do not change values unless explicitly instructed

### Design System
- `design-system.html` — Typography scale, color tokens, glass panel patterns
- `HERO_SPEC_smart_pen.md` — Creative direction and narrative structure

### Project Architecture (locked decisions)
- `.planning/STATE.md` — Phase decisions and established patterns (GSAP↔R3F bridge, CSS class names)
- `.planning/ROADMAP.md` — Phase 5 goal and plan breakdown

</canonical_refs>

<specifics>
## Specific Implementation Notes

### Support Copy Element
```tsx
// Current (HeroContent.tsx) — text to UPDATE:
<p className="hero-support-copy font-inter mt-2 max-w-md text-center text-sm text-zinc-300 opacity-0">
  Designed for focused writing sessions with a subtle intelligent layer.
</p>

// Target state — text AND classes to UPDATE:
<p className="hero-support-copy font-inter mt-2 max-w-md text-center text-base text-zinc-200 opacity-0 italic">
  Built for the way you actually think.
</p>
```

### Support Copy Animation (useHeroTimeline.ts)
Current behavior: `setSupportCopyOpacity(Math.min(1, progress * 3) * fadeOut)` — appears 0-33%, fades with headline

Target behavior: appears at 20% scroll, peaks 30-40%, fully gone by 60%
```ts
// Replace current setSupportCopyOpacity call with:
const supportCopyFadeIn = Math.max(0, Math.min(1, (progress - 0.20) / 0.20));
const supportCopyFadeOut = Math.max(0, Math.min(1, (0.60 - progress) / 0.20));
setSupportCopyOpacity(supportCopyFadeIn * supportCopyFadeOut);
```

### T5.x Acceptance Criteria Status (brownfield audit)
- **T5.1 useHeroScrollProgress:** ✅ COMPLETE — ScrollTrigger, scrub:true, useRef, cleanup
- **T5.2 Scroll-linked 3D:** ✅ COMPLETE — pen rotates 15°, camera shifts in useFrame via lerp
- **T5.3 Content transitions:** ✅ COMPLETE with 1 gap fixed (CTA now fades at 80%+ not 40%)
  - Remaining gap: support copy timing + text needs the updates above
</specifics>

<deferred>
## Deferred Ideas

- "Should the hero section have more scroll depth (200vh) to let users explore the narrative?" — deferred, not discussed; current h-screen is fine for Phase 5
- "Animate the hero-scroll-cue arrow in a loop to invite scrolling" — deferred to Phase 8 polish
- "Add a progress indicator showing position in the hero scroll" — not in scope

</deferred>

---

*Phase: 05-scroll-orchestration*
*Context gathered: 2026-04-05 via discuss-phase session*
