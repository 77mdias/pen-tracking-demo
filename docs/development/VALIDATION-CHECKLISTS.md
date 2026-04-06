# Manual Validation Checklists

> Reproducible manual checks for critical UX flows that are not fully automated.
> Run these checks after every significant landing, hero, or funnel change.

---

## Hero / Landing (`/`)

| # | Check | Expected Result |
|---|-------|-----------------|
| 1 | Page loads on 1440px viewport | Hero visible above the fold, H1 readable, CTA button visible |
| 2 | Page loads on 768px viewport | Layout adap cleanly, no horizontal overflow, CTA visible |
| 3 | Page loads on 375px viewport | Mobile layout, H1 readable, CTA visible, no text clipping |
| 4 | WebGL available, reduced-motion OFF | 3D pen renders, text animates in, scroll works |
| 5 | reduced-motion ON (`prefers-reduced-motion`) | No GSAP animations fire, hero content immediately visible, CTA prominent |
| 6 | WebGL NOT available | `HeroFallback` renders instead of `HeroCanvas` (static or video) |
| 7 | CTA "Join the Private Beta" click | Navigates to `/auth` |
| 8 | Below-fold ProductIntroSection renders | All subsections visible on scroll: Bridge, AI Writing, Smart Sync, Focus Mode, CTA |
| 9 | No console errors on load | DevTools Console shows 0 errors (warnings OK) |

---

## Funnel: `/auth` → `/beta` → `/dashboard`

| # | Check | Expected Result |
|---|-------|-----------------|
| 1 | `/auth` loads | Email form is visible with input + submit button |
| 2 | Submit without email or invalid email | Validation message shown, no navigation |
| 3 | Submit with valid email (e.g. `user@test.com`) | Loading state shown, then redirected to `/beta` |
| 4 | `/beta` loads after sign-in | Shows user's email, queue position (180-250), "Join private beta" button |
| 5 | Click "Join private beta" on `/beta` | Status updates to joined with date and user name |
| 6 | Navigate to `/dashboard` after joining | Shows personalized "Welcome back, {name}" with beta status |
| 7 | Access `/dashboard` WITHOUT prior sign-in | Shows "Dashboard Preview" with cards and CTA "Start the journey" → `/auth` |
| 8 | CTA on `/beta` footer | Navigate to `/dashboard` |
| 9 | LocalStorage has funnel context | `simulateSignIn` context persists across page reloads |

---

## Build & Deploy Gate

| # | Check | Expected Result |
|---|-------|-----------------|
| 1 | `bun run lint` | Exits 0 (warnings OK, no errors) |
| 2 | `bun run typecheck` | Exits 0 |
| 3 | `bun run build` | Exits 0, `.open-next/worker.js` generated |
| 4 | `bun run test` | All test suites green |
