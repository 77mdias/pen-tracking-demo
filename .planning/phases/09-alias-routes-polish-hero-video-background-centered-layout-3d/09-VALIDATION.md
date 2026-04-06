---
phase: 9
slug: alias-routes-polish-hero-video-background-centered-layout-3d
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-04-07
---

# Phase 9 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Vitest 4.1.2 |
| **Config file** | `vitest.config.ts` (dir: `tests`, globals: true) |
| **Quick run command** | `bun run vitest tests/unit/` |
| **Full suite command** | `bun run vitest` |
| **Estimated runtime** | ~5 seconds |

---

## Sampling Rate

- **After every task commit:** Run `bun run vitest tests/unit/`
- **After every plan wave:** Run `bun run lint && bun run tsc && bun run vitest`
- **Before `/gsd-verify-work`:** Full suite must be green + visual QA at 375/768/1024/1440px
- **Max feedback latency:** <10 seconds (unit tests only; R3F visual checked per wave)

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Threat Ref | Secure Behavior | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|------------|-----------------|-----------|-------------------|-------------|--------|
| 9-01-01 | 09-01 | 1 | REQ-9.1 aliasSceneConfig shape | T-09-01 / — | N/A | unit | `bun run vitest tests/unit/aliasSceneConfig.test.ts` | ❌ W0 | ⬜ pending |
| 9-01-02 | 09-01 | 1 | REQ-9.4 AliasCanvas dynamic import | — | N/A | smoke | `bun run tsc` | ✅ existing | ⬜ pending |
| 9-02-01 | 09-02 | 1 | REQ-9.2 aboutData shape | T-09-02 / — | N/A | unit | `bun run vitest tests/unit/aboutData.test.ts` | ❌ W0 | ⬜ pending |
| 9-02-02 | 09-02 | 1 | REQ-9.5 AboutSection renders | — | N/A | unit | `bun run vitest tests/unit/aboutSection.test.ts` | ❌ W0 | ⬜ pending |
| 9-03-01 | 09-03 | 2 | REQ-9.3 No #ef233c in alias routes | — | N/A | automated grep | `grep -rn "#ef233c" src/app/beta/ src/app/auth/ src/app/dashboard/` | N/A | ⬜ pending |
| 9-03-02 | 09-03 | 2 | REQ-9.4 AliasLayout two-column renders | — | N/A | visual | dev server 1024px | N/A | ⬜ pending |
| 9-04-01 | 09-04 | 3 | REQ-9.6 AboutSection in home + /beta | — | N/A | visual | dev server scroll-to-bottom | N/A | ⬜ pending |
| 9-04-02 | 09-04 | 3 | REQ-9.7 Mobile: 3D pen hidden at 375px | — | N/A | visual | dev server 375px | N/A | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `tests/unit/aliasSceneConfig.test.ts` — validates aliasSceneConfig shape: cameraPosition is [number,number,number], penPosition is [number,number,number], idleAmplitude > 0
- [ ] `tests/unit/aboutData.test.ts` — validates TECH_STACK_CARDS.length === 6, PROJECT_STATS array has required fields (label, value), all entries non-empty
- [ ] `tests/unit/aboutSection.test.ts` — lightweight import/render smoke check for AboutSection (server-component compatible)

*Note: R3F Canvas components require a browser WebGL context — no unit tests possible. Validated visually per wave.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| 3D pen renders without artifacts at 768px+ | REQ-9.4 | R3F requires WebGL browser | Start `bun run dev`, open /beta at 768px, verify pen floats |
| Pen animation continuous (not tied to scroll) | REQ-9.4 | Runtime behavior | On /beta, scroll up/down — pen should keep floating regardless |
| Mobile 375px: 3D panel hidden, form stacked | REQ-9.7 | Visual layout | Dev tools 375px on /auth — single-column, no canvas |
| AboutSection glass panels + blue accents visible | REQ-9.6 | Visual design | On home + /beta, scroll to bottom — verify design tokens match |
| `prefers-reduced-motion`: pen static | Phase 7 preservation | OS setting required | Enable reduced motion in DevTools — pen idle animation stops |
| No console errors on any alias route | Quality gate | Runtime check | DevTools console clean on /beta, /auth, /dashboard |
