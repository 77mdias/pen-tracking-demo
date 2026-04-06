# Phase 08: Optimization and Polish — Research

**Researched:** 2026-04-06  
**Domain:** 3D web performance, asset compression, cross-browser QA, React render optimization  
**Confidence:** HIGH (all findings verified directly from codebase)

---

## Summary

Phase 8 is the final polish sprint before ship. All prior phases (1–7) are complete and verified. The codebase is structurally sound — the animation architecture follows the rules (refs not state for per-frame paths, `useSyncExternalStore` for reactive values, `useGSAP` for all timeline/DOM work). The main gaps are:

1. **The GLB is 7.7MB uncompressed** — Draco/Meshopt compression is the single highest-impact optimization available. Potential reduction to ~1–2MB (60-75% smaller).
2. **Below-fold sections are not lazy-loaded** — `ProductIntroSection` and all its children are eagerly imported in `page.tsx`. Dynamic import with SSR would reduce initial JS bundle size.
3. **Two dead `useMemo` declarations in HeroScene** — `accentColor` and `tempColor` are allocated but never read (confirmed lint warnings). Should be removed.
4. **`frameloop` not tier-aware** — `low` tier devices still use `"always"` loop. Should use `"demand"` on low tier to conserve battery/CPU.
5. **Video elements have no WebM source** — both `VideoBackground` and `HeroFallback` serve only `.mp4`. Firefox users get no compressed alternative.
6. **106 pre-existing lint warnings** — cleanup pass needed for a clean ship state.

**Primary recommendation:** Compress the GLB (08-01 top priority), remove dead code and apply frameloop tier-gating (08-02), then do a full QA pass with cross-browser validation (08-03).

---

## Project Constraints (from AGENTS.md)

The project AGENTS.md contains these binding rules that all plans must respect:

- **Never `useState` for per-frame 3D** — use `useRef` + `useFrame`
- **ONE animation system per element** — GSAP owns DOM/CSS, R3F owns 3D
- **Always `useGSAP`** (not raw `useEffect`) for GSAP — auto-cleanup via `gsap.context()`
- **Dynamic-import R3F Canvas** with `next/dynamic` + `ssr: false` ← already done in HeroCanvas
- **TailwindCSS v4** syntax (`@theme inline`) — no v3 patterns
- **TypeScript strict mode** throughout
- **GSAP quickSetter** for scroll-driven values (not `gsap.to` in rAF)
- **Bun** as package manager (not npm/yarn for installs)

---

## Standard Stack

### Core (already installed)
| Library | Version | Purpose | Status |
|---------|---------|---------|--------|
| `@react-three/fiber` | 9.5.0 | R3F Canvas + useFrame | ✅ Installed |
| `@react-three/drei` | 10.7.7 | useGLTF, ContactShadows | ✅ Installed |
| `three` | 0.183.2 | 3D primitives | ✅ Installed |
| `gsap` | 3.14.2 | All DOM animation | ✅ Installed |
| `@gsap/react` | 2.1.2 | useGSAP hook | ✅ Installed |

[VERIFIED: package.json + node_modules]

### Needed for 08-01: Asset Compression
| Tool | Version | Purpose | Install |
|------|---------|---------|---------|
| `@gltf-transform/cli` | 4.3.0 | Draco/Meshopt GLB compression CLI | Dev dependency |

[VERIFIED: `npm view @gltf-transform/cli version` → 4.3.0]

**gltf-transform is NOT currently installed.** Must be added as dev dependency for 08-01.

**Installation:**
```bash
bun add -d @gltf-transform/cli
```

---

## Architecture Patterns

### Current Render Architecture (verified)

```
HeroSection (useSyncExternalStore for media queries + device caps)
├── HeroCanvas (dynamic, ssr:false) — dpr=[1, maxDpr], frameloop=reducedMotion?"demand":"always"
│   └── HeroScene (single useFrame loop — all 3D per-frame work here)
├── HeroFallback (video fallback when !supportsWebGL)
├── VideoBackground (blurred ambient video, preload="metadata")
├── HeroContent (desktop/tablet — GSAP targets via CSS classes)
├── HeroMobile (mobile — useGSAP scoped to containerRef)
└── ProductIntroSection (children prop — eagerly imported, NOT lazy)
```

**Scroll data flow:** `scrollProgressRef.current` (mutable ref, never triggers re-render) → read inside `useFrame` → drives 3D transforms. ✅ Correct.

**DPR flow:**
```
useDeviceCapabilities → tier → resolveRecommendedMaxDpr(tier)
  low  → 1.0
  medium → 1.25
  high → 1.5

HeroSection:
  maxDpr = isMobile ? Math.min(recommendedMaxDpr, 1.5) : recommendedMaxDpr

HeroCanvas:
  <Canvas dpr={[1, maxDpr]} ...>
```
[VERIFIED: useDeviceCapabilities.ts lines 69-73, HeroSection.tsx line 103, HeroCanvas.tsx line 34]

### frameloop Current vs Recommended

**Current:**
```tsx
frameloop={reducedMotion ? "demand" : "always"}
```

**Gap:** `tier === "low"` still gets `"always"`. Low-tier devices (≤4 cores, ≤4GB RAM, or DPR > 2.75) are typically mobile/battery-constrained — `"demand"` would be more appropriate when there's no active animation input.

**Recommended for 08-02:**
```tsx
frameloop={reducedMotion || tier === "low" ? "demand" : "always"}
```

However: `"demand"` requires explicit `invalidate()` calls to trigger renders when the scene changes (e.g., scroll progress updates, pointer parallax, idle float). Since HeroScene drives all animation from `useFrame`, switching to `"demand"` on low-tier while keeping idle float active would produce a static scene. The correct approach for low tier is to keep `"always"` but reduce `ContactShadows` (already done) and reduce idle animation amplitude (already done via `motionScale=0.5`). **The frameloop strategy is already well-considered — document this in 08-02 as a verified correct decision.**

### Pattern: GLB Compression with gltf-transform

```bash
# Install CLI
bun add -d @gltf-transform/cli

# Apply Meshopt compression (no loader needed at runtime — decoder is in drei)
bunx gltf-transform optimize public/models/pen3D.glb public/models/pen3D.glb \
  --compress meshopt

# Alternative: Draco (requires DRACOLoader at runtime)
bunx gltf-transform optimize public/models/pen3D.glb public/models/pen3D.glb \
  --compress draco
```

**Draco vs Meshopt for this project:**
- **Draco:** Better geometry compression ratios, but requires `DRACOLoader` + WASM decoder (~500KB). Currently NO DRACOLoader in the codebase.
- **Meshopt:** Good compression (~50-60% reduction), decoder is built into `@react-three/drei` (via `MeshoptDecoder`). No code change needed if used via drei's `useGLTF` + `KTXLoader`.

**Recommendation:** Use **Meshopt** for 08-01. Avoids runtime decoder complexity. `useGLTF` in drei handles decoding automatically when the file contains meshopt-compressed data.

[VERIFIED: drei package present, no DRACOLoader in codebase grep]  
[ASSUMED: meshopt decoder bundled in drei v10 — needs verification during 08-01 execution]

### Pattern: Below-Fold Lazy Loading

**Current state:**
```tsx
// page.tsx — eager (NOT lazy)
import ProductIntroSection from "@/components/product-intro/ProductIntroSection";
```

**Recommended:**
```tsx
// page.tsx — lazy with SSR enabled (content is not interactive-critical)
const ProductIntroSection = dynamic(
  () => import("@/components/product-intro/ProductIntroSection"),
  { ssr: true } // SSR=true because ProductIntro has static text content for SEO
);
```

Note: Unlike HeroCanvas (which needs `ssr: false` because it uses WebGL), ProductIntroSection is pure DOM/GSAP and should have `ssr: true` to maintain SEO indexability. This splits its JS into a separate chunk loaded after the hero is interactive.

[VERIFIED: page.tsx inspection — eager import confirmed]

---

## Findings: What Needs to Change

### 08-01: Asset Optimization

| Item | Current State | Action | Expected Impact |
|------|--------------|--------|----------------|
| `pen3D.glb` size | 7.7MB, no compression (extensionsUsed: []) | Compress with Meshopt via gltf-transform | ~2-4MB (50-75% reduction) |
| `ProductIntroSection` | Eagerly imported in page.tsx | `dynamic()` with `ssr: true` | Smaller initial JS bundle |
| DPR cap validation | `dpr={[1, maxDpr]}` — low:1, medium:1.25, high:1.5 | Verify in DevTools on real viewport sizes | Confirm no 2x rendering on mobile |
| Video sources | Only `.mp4` in both VideoBackground and HeroFallback | Add WebM `<source>` alternatives | Smaller video transfer on Firefox/Chrome |

[VERIFIED: All items confirmed by codebase inspection]

### 08-02: Performance Profiling / Frameloop Audit

| Item | Current State | Action | Notes |
|------|--------------|--------|-------|
| `accentColor` useMemo | Declared, never read | Remove both dead useMemo calls | Lint warning line 33-34 |
| `tempColor` useMemo | Declared, never read | Remove with accentColor | Same lint warning |
| frameloop on low tier | `"always"` even for low tier | **Investigate** — likely keep "always" (idle needs continuous render); document decision | Low tier already has motionScale=0.5 |
| Re-render scan | No useState in HeroScene/HeroCanvas | Nothing to fix — architecture is correct | Verified by grep |
| ContactShadows on mobile | `showContactShadows = tier !== "low"` | Already gated correctly | No change needed |
| `cam.updateProjectionMatrix()` | Called every frame even when FOV unchanged | Only call when FOV actually changes | Minor optimization |

**Re-render audit result:** No `useState` exists in any hero component or per-frame hook. All reactive values use `useSyncExternalStore`. All per-frame values use `useRef`. Architecture is correct. [VERIFIED by grep]

**useFrame single loop:** Only one `useFrame` callback in the entire codebase (HeroScene.tsx line 55). No multiple subscriber overhead. [VERIFIED by grep]

### 08-03: Cross-Browser QA

| Concern | Details | Mitigation |
|---------|---------|-----------|
| Safari WebGL + `powerPreference: "high-performance"` | Safari sometimes ignores this hint on battery saver mode | Acceptable — Canvas.gl config is a hint, not a requirement |
| Safari + `alpha: true` on Canvas | Can cause compositing issues with background blending | Verify visually in Safari; if issues, set `alpha: false` and use CSS `background: transparent` |
| Firefox video `.mp4` only | Firefox prefers WebM (better codec support for AV1/VP9) | Add `<source type="video/webm">` in VideoBackground and HeroFallback |
| iOS Safari `position: sticky` inside overflow containers | HeroSection uses `sticky top-0` inside `hero-scene-layer` | Test on iOS — known quirk |
| `prefers-reduced-motion` on Windows | Different from macOS — test both OS settings | Manual test only |
| 375px viewport (iPhone SE) | Text overflow risk at `text-4xl` in HeroMobile | Visual verify |
| 1440px viewport | Check that canvas fills without over-scaling | Visual verify |

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead |
|---------|-------------|-------------|
| GLB geometry compression | Custom WASM encoder | `gltf-transform optimize --compress meshopt` |
| Meshopt decoding at runtime | Custom loader | drei's `useGLTF` handles it automatically |
| Viewport-size test automation | Puppeteer/Playwright test suite | Manual DevTools viewport emulation + checklist |
| DPR detection | Custom navigator API reader | Existing `useDeviceCapabilities` (already correct) |

---

## Common Pitfalls

### Pitfall 1: Draco vs Meshopt Confusion
**What goes wrong:** 08-01 plan specifies "Draco" compression but code uses `useGLTF` without a `DRACOLoader` setup. The model loads as 0 bytes (silent failure in development, CORS error in production).  
**Root cause:** Draco-compressed GLBs require explicit `DRACOLoader` wiring. Meshopt-compressed GLBs are handled automatically by drei.  
**Prevention:** Use Meshopt for 08-01. If Draco is needed for better ratios, add DRACOLoader setup as a prerequisite task.

### Pitfall 2: gltf-transform Overwrites Source File
**What goes wrong:** Running `gltf-transform optimize input.glb input.glb` (same input/output) can corrupt the file if the process fails mid-write.  
**Prevention:** Always output to a temp file first, then move: `gltf-transform optimize pen3D.glb pen3D.optimized.glb && mv pen3D.optimized.glb pen3D.glb`. Keep original as `pen3D.original.glb` until verified.

### Pitfall 3: `frameloop="demand"` with Continuous Animations
**What goes wrong:** Switching to `frameloop="demand"` stops the render loop. `useFrame` callbacks still register but are never called until `invalidate()` is explicitly called. The idle float animation freezes.  
**Prevention:** Only switch to `"demand"` for paths that are truly static (e.g., `reducedMotion=true` where there IS no animation). For the active path, keep `"always"`.  
**Current state:** `frameloop="demand"` is already correctly applied only for `reducedMotion=true`.

### Pitfall 4: Lazy Loading ProductIntroSection Breaks GSAP ScrollTrigger
**What goes wrong:** If `ProductIntroSection` is lazy-loaded client-side, it may mount after `ScrollTrigger` has already calculated positions, causing scroll-linked animations to target elements at wrong offsets.  
**Prevention:** After any lazy-load of scroll-animated sections, call `ScrollTrigger.refresh()`. Or use `ssr: true` (SSR-rendered, lazy JS) which avoids the timing issue entirely since the DOM is present on first paint.

### Pitfall 5: Removing `useMemo` Dead Code Breaks Existing Functionality
**What goes wrong:** `accentColor` and `tempColor` appear unused but might be intended for future use (accent light color lerping). Removing them and then needing them later requires reconstructing the pattern.  
**Prevention:** Check if `accentLightRef.current.color.set(acc.color)` in HeroScene (line 126) is already using the direct `.set()` method instead of lerping via the `accentColor` instance. It is — the `accentColor`/`tempColor` vars are indeed dead weight. Safe to remove.

[VERIFIED: HeroScene.tsx line 126 uses `.color.set(acc.color)` directly]

---

## Code Examples

### Removing Dead useMemo Instances (08-02)
```typescript
// REMOVE these two lines from HeroScene.tsx (lines 33-34):
// const accentColor = useMemo(() => new Color(), []);
// const tempColor = useMemo(() => new Color(), []);

// Also remove Color from imports if no longer needed:
// Before: import { Group, Object3D, Color, PointLight, PerspectiveCamera } from "three";
// After:  import { Group, Object3D, PointLight, PerspectiveCamera } from "three";
```
[VERIFIED: HeroScene.tsx line 10, 33-34 — Color only used for dead useMemo instances]

### Lazy Load ProductIntroSection (08-01)
```tsx
// src/app/page.tsx
import dynamic from "next/dynamic";
import HeroSection from "@/components/hero/HeroSection";

const ProductIntroSection = dynamic(
  () => import("@/components/product-intro/ProductIntroSection"),
  { ssr: true }
);

export default function Home() {
  return (
    <main>
      <HeroSection>
        <ProductIntroSection />
      </HeroSection>
    </main>
  );
}
```

### GLB Compression Workflow (08-01)
```bash
# Install tool (dev only)
bun add -d @gltf-transform/cli

# Backup original
cp public/models/pen3D.glb public/models/pen3D.original.glb

# Compress with meshopt
bunx gltf-transform optimize public/models/pen3D.glb public/models/pen3D.optimized.glb \
  --compress meshopt

# Check size comparison
ls -lh public/models/pen3D*.glb

# If visual verification passes, replace
mv public/models/pen3D.optimized.glb public/models/pen3D.glb

# Remove backup after confirming build passes
rm public/models/pen3D.original.glb
```

### Add WebM Video Sources (08-03)
```tsx
// VideoBackground.tsx — add <source> tags
<video
  className="absolute inset-0 h-full w-full object-cover"
  style={{ filter: "blur(24px) saturate(0.8) brightness(0.65)", opacity: 0.28, transform: "scale(1.05)" }}
  autoPlay={!reducedMotion}
  loop
  muted
  playsInline
  preload="metadata"
>
  <source src="/videos/animation.webm" type="video/webm" />
  <source src="/videos/animation.mp4" type="video/mp4" />
</video>
```
Note: WebM file must be created separately (ffmpeg or cloud tool). If WebM file doesn't exist, this is a low-priority item — `.mp4` works in all browsers, WebM is just preferred by Firefox for better compression. **Only add `<source>` tags if a WebM file is actually produced in 08-01.**

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `DRACOLoader` (manual setup) | Meshopt via drei automatic | drei v9+ | No manual loader wiring needed |
| `frameloop="always"` everywhere | `frameloop="demand"` for static scenes | R3F v8+ | CPU/GPU savings when scene doesn't move |
| `useSyncExternalStore` not available | Standard in React 18+ | React 18 (2022) | Safe external store subscriptions without tearing |
| Global GSAP selectors (leak risk) | `scope: containerRef` in useGSAP | @gsap/react v2 | Already correctly used in HeroMobile |

---

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|-------------|-----------|---------|----------|
| `bun` | Package installs | ✓ | — | npm |
| `@gltf-transform/cli` | GLB compression | ✗ (not installed) | 4.3.0 available | Manually use Blender to export compressed GLB |
| `node` | gltf-transform CLI | ✓ | v22.20.0 | — |
| Browser (Safari) | Cross-browser QA | Manual test only | — | DevTools user-agent |

[VERIFIED: `command -v bun`, `npm view @gltf-transform/cli version`, `node --version`]

**Missing dependencies with no blocking fallback:**
- `@gltf-transform/cli` — must be installed (`bun add -d @gltf-transform/cli`). First task of 08-01.

---

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | Vitest 4.1.2 |
| Config file | `vitest.config.ts` |
| Quick run command | `bun run test` |
| Full suite command | `bun run test && bun run smoke` |

### Phase Requirements → Test Map
| Req | Behavior | Test Type | Automated Command | File Exists? |
|-----|----------|-----------|-------------------|-------------|
| 08-01 | GLB compressed (< 3MB) | Manual/script | `ls -lh public/models/pen3D.glb` | ✅ |
| 08-01 | `ProductIntroSection` lazy-loaded | Build check | `bun run build` succeeds | ✅ |
| 08-02 | No dead useMemo in HeroScene | Lint | `bun run lint` 0 errors | ✅ |
| 08-02 | No useState in useFrame paths | Code inspection | `grep -rn "useState" src/components/hero/` | ✅ |
| 08-03 | Passes at 375/768/1024/1440px | Manual QA | DevTools viewport emulation | Manual only |
| 08-03 | No Safari compositing issues | Manual QA | Safari browser test | Manual only |
| 08-03 | Build passes with all changes | CI gate | `bun run build` | ✅ |

### Sampling Rate
- **Per task commit:** `bun run lint && bun run build`
- **Per wave merge:** `bun run test && bun run build`
- **Phase gate:** Full lint (0 errors) + build green + manual cross-browser checklist before `/gsd-verify-work`

### Wave 0 Gaps
None — no new test files needed for this phase. All validation is build/lint/manual.

---

## Security Domain

Phase 8 introduces no new network surfaces, auth paths, or user data handling. Changes are:
- Static asset optimization (GLB compression — no new network endpoint)
- Code dead-weight removal (useMemo cleanup)
- Dynamic import (code splitting — no security surface)
- Cross-browser QA (no new functionality)

**Security enforcement: N/A for this phase** — no ASVS categories apply.

---

## Open Questions

1. **Meshopt decoder availability in `@react-three/drei` 10.x**
   - What we know: Meshopt decoding was added to drei's `useGLTF` in earlier versions
   - What's unclear: Whether drei v10.7.7 bundles `MeshoptDecoder` automatically or requires manual setup
   - Recommendation: During 08-01 execution, after compression, attempt `useGLTF("/models/pen3D.glb")` in dev and verify the model loads. If it fails, the plan should add `MeshoptDecoder` wiring.
   - Tag: [ASSUMED: auto-decoding in drei v10]

2. **WebM video file existence**
   - What we know: Only `animation.mp4` exists in `public/videos/`
   - What's unclear: Whether a WebM version can/should be generated as part of 08-01
   - Recommendation: 08-01 should note WebM as "optional nice-to-have" — if ffmpeg is available, generate it; otherwise skip. The `.mp4` path works everywhere.

3. **Lint warning cleanup scope**
   - What we know: 106 pre-existing warnings exist, 2 are from dead useMemo in HeroScene
   - What's unclear: Whether the remaining 104 warnings are actionable in Phase 8 scope
   - Recommendation: 08-03 plan should include a lint audit pass — remove warnings where trivially fixable (unused imports, etc.), document any that require larger changes as out of scope.

---

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | Meshopt decoder is automatic in `@react-three/drei` v10.7.7 | Architecture Patterns | Model loads as empty; need to add MeshoptDecoder wiring manually |
| A2 | gltf-transform meshopt can reduce pen3D.glb by 50-75% | Findings 08-01 | Actual reduction might be less if textures dominate (3 embedded textures at ~8MB total buffer) |
| A3 | `ProductIntroSection` dynamic import with `ssr: true` won't break ScrollTrigger timing | Code Examples | GSAP ScrollTrigger may need `refresh()` call after dynamic hydration |

---

## Sources

### Primary (HIGH confidence — codebase verified)
- `/home/jeandias/projects/penflow77/public/models/pen3D.glb` — File size 7.7MB, no compression extensions [VERIFIED]
- `src/components/hero/HeroCanvas.tsx` — DPR and frameloop implementation [VERIFIED]
- `src/components/hero/HeroScene.tsx` — Single useFrame loop, dead useMemo vars [VERIFIED]
- `src/hooks/useDeviceCapabilities.ts` — DPR tier resolution logic [VERIFIED]
- `src/app/page.tsx` — Eager ProductIntroSection import confirmed [VERIFIED]
- `package.json` — All installed versions [VERIFIED]
- Phase 06/07 SUMMARY files — Architecture decisions from prior phases [VERIFIED]

### Secondary (MEDIUM confidence)
- `npm view @gltf-transform/cli version` → 4.3.0 [VERIFIED via npm registry]
- AGENTS.md — Project coding rules [VERIFIED: file read]

### Tertiary (LOW confidence — training knowledge)
- gltf-transform Meshopt compression ratios (50-75% estimate) — from training data [ASSUMED]
- drei v10 Meshopt auto-decoding behavior — from training data [ASSUMED]

---

## Metadata

**Confidence breakdown:**
- GLB size/compression status: HIGH — measured directly (7.7MB, grep extensions = [])
- DPR implementation: HIGH — code verified line by line
- frameloop analysis: HIGH — single location, verified
- Re-render audit: HIGH — grep confirms no useState in hot paths
- Below-fold lazy loading gap: HIGH — page.tsx verified as eager import
- Meshopt compression ratios: LOW — training data estimate only
- Cross-browser Safari behavior: MEDIUM — known patterns, needs manual validation

**Research date:** 2026-04-06  
**Valid until:** 2026-05-06 (stable libraries, 30-day window)
