# Visual & Design System Overhaul

Merge the Creative Agency editorial design system (Inter/Manrope, `#ef233c` red accent, black bg, dashed borders, sharp corners) with the existing PenFlow77 design system. Add visual section transition indicators, integrate the pen video as a blurred background layer, and enable the 3D pen canvas on mobile.

---

## Proposed Changes

### Fonts & Layout Root

#### [MODIFY] [layout.tsx](file:///home/jeandias/projects/penflow77/src/app/layout.tsx)

- Add **Inter** and **Manrope** from `next/font/google` as the new default display and heading fonts
- Keep Montserrat + Open Sans as CSS variable fallbacks for backward compatibility
- Add `font-inter` as the default body class

---

### Design Tokens & Global CSS

#### [MODIFY] [globals.css](file:///home/jeandias/projects/penflow77/src/app/globals.css)

- Update `:root` variables:
  - `--color-bg: #000000` (pure black, Creative DS)
  - `--color-accent: #ef233c` (red, Creative DS primary)
  - `--color-accent-blue: #007bff` (kept as secondary accent)
  - Keep glass-panel variables
- Add new utility classes:
  - `.editorial-border` — `border: 1px solid` with zinc-800, dashed variant
  - `.corner-accent` — pseudo-element corner brackets in `#ef233c`
  - `.gradient-blur` — progressive blur effect from Creative DS
  - `.border-gradient` — animated conic-gradient border spinning effect
  - `.font-manrope` / `.font-inter` / `.font-oswald` families
- Update `@theme inline` to include new accent color tokens
- Add `fadeSlideIn` keyframe from Creative DS

---

### Section Transition Divider

#### [NEW] [SectionDivider.tsx](file:///home/jeandias/projects/penflow77/src/components/product-intro/SectionDivider.tsx)

Visual indicator component placed between each scroll-hijacked section:
- Horizontal gradient line (fades from transparent → `#ef233c` → transparent)
- Small animated dot/pulse at center
- Subtle vertical spacing (64px above/below)
- Creates a clear "you're moving between sections" visual signal

#### [MODIFY] [ProductIntroSection.tsx](file:///home/jeandias/projects/penflow77/src/components/product-intro/ProductIntroSection.tsx)

- Insert `<SectionDivider />` between each feature section

---

### Video Background Layer

#### [NEW] [VideoBackground.tsx](file:///home/jeandias/projects/penflow77/src/components/hero/VideoBackground.tsx)

Full-viewport video background component:
- Uses `/videos/animation.mp4` as `<video>` source
- Applies heavy blur (`blur(20px)`) + low opacity (~0.3) + saturation for glass effect — keeps 3D pen as protagonist
- Positioned behind the R3F canvas layer (z-index below canvas)
- Loops, muted, playsInline, preload="metadata"

#### [MODIFY] [HeroSection.tsx](file:///home/jeandias/projects/penflow77/src/components/hero/HeroSection.tsx)

- Insert `<VideoBackground />` as a sticky layer behind the 3D canvas
- Video visible across hero + product-intro scroll area
- Respects `prefers-reduced-motion` (pauses video)

---

### Mobile 3D Pen

#### [MODIFY] [HeroSection.tsx](file:///home/jeandias/projects/penflow77/src/components/hero/HeroSection.tsx)

- Remove `isMobile` gating that shows [HeroMobile](file:///home/jeandias/projects/penflow77/src/components/hero/HeroMobile.tsx#8-31) instead of [HeroCanvas](file:///home/jeandias/projects/penflow77/src/components/hero/HeroCanvas.tsx#19-56)
- Always render [HeroCanvas](file:///home/jeandias/projects/penflow77/src/components/hero/HeroCanvas.tsx#19-56) (fallback only for `!supportsWebGL`)
- Pass mobile-specific props: lower DPR (max 1.5), simplified tier
- Disable pointer parallax on mobile (already done)

#### [MODIFY] [HeroMobile.tsx](file:///home/jeandias/projects/penflow77/src/components/hero/HeroMobile.tsx)

- Keep as WebGL-unavailable fallback only (rename concept in comments)
- No longer the "mobile" variant — it's the "no-WebGL" fallback

---

### Component Restyling — Creative DS Merge

#### [MODIFY] [HeroContent.tsx](file:///home/jeandias/projects/penflow77/src/components/hero/HeroContent.tsx)

- Switch headline to `font-manrope` with gradient-text treatment from Creative DS
- Update badge to use border-gradient pattern with subtle red accent dot
- Update subheadline to use `font-sans` (Inter) with zinc-400 color
- Apply staggered word opacity pattern from Creative DS h1

#### [MODIFY] [HeroCTA.tsx](file:///home/jeandias/projects/penflow77/src/components/hero/HeroCTA.tsx)

- Primary button: conic-gradient spinning border effect (Creative DS pattern)
- Secondary button: editorial red border-spin on hover
- Remove rounded corners → `rounded-none`
- Uppercase tracking-wide labels

#### [MODIFY] [ProductIntroBridge.tsx](file:///home/jeandias/projects/penflow77/src/components/product-intro/ProductIntroBridge.tsx)

- Switch to Manrope headline with gradient opacity per word
- Red accent label instead of blue
- Feature pillars grid: dashed border cards with corner accents
- Editorial typography treatment

#### [MODIFY] [FeatureAIWriting.tsx](file:///home/jeandias/projects/penflow77/src/components/product-intro/FeatureAIWriting.tsx)

- Glass panel → editorial card with dashed border + corner accents
- Section label: red accent
- Bullet dots: red instead of gold
- Stat accent: red gradient

#### [MODIFY] [FeatureSmartSync.tsx](file:///home/jeandias/projects/penflow77/src/components/product-intro/FeatureSmartSync.tsx)

- Same editorial card treatment
- Sync pipeline cards: dashed border with red hover
- Label: red accent

#### [MODIFY] [FeatureFocusMode.tsx](file:///home/jeandias/projects/penflow77/src/components/product-intro/FeatureFocusMode.tsx)

- Same editorial card treatment
- Feature detail cards: editorial style
- Label: red accent

#### [MODIFY] [ProductIntroCTA.tsx](file:///home/jeandias/projects/penflow77/src/components/product-intro/ProductIntroCTA.tsx)

- Switch CTA to editorial style with conic-gradient border button
- Red accent label
- Sharp, editorial typography

#### [MODIFY] [HeroAmbientDetails.tsx](file:///home/jeandias/projects/penflow77/src/components/hero/HeroAmbientDetails.tsx)

- Adjust blob colors to include red tones alongside blue/cyan
- Matches the new accent palette

---

## Verification Plan

### Build Check
```bash
bun run build
```
Must compile without errors.

### Browser Visual Testing
Open `http://localhost:3000` in browser at the following viewports and verify:
1. **375px** (mobile) — 3D pen renders, video background visible + blurred, editorial styling applied
2. **768px** (tablet) — reduced motion amplitude, editorial cards visible
3. **1024px** (desktop) — full 3D + scroll narrative, section dividers visible between folds
4. **1440px** (large desktop) — premium layout, all transitions smooth

### Manual Verification Checklist
- [ ] Section dividers (red gradient line + dot) visible between each fold transition
- [ ] Video background plays behind 3D pen with heavy blur/glass effect
- [ ] 3D pen is clearly more prominent than background video
- [ ] 3D pen renders on mobile (not just a static fallback)
- [ ] All text uses Manrope/Inter fonts (editorial feel)
- [ ] Buttons have conic-gradient border animation on hover
- [ ] Cards use dashed borders + corner accent brackets
- [ ] Red `#ef233c` accent color is dominant throughout
- [ ] `prefers-reduced-motion: reduce` — all animations disabled, content immediately visible
