---
phase: 8
slug: optimization-and-polish
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-04-06
---

# Phase 8 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | vitest |
| **Config file** | `vitest.config.ts` |
| **Quick run command** | `bun run lint` |
| **Full suite command** | `bun run build && bun run lint` |
| **Estimated runtime** | ~20 seconds |

---

## Sampling Rate

- **After every task commit:** Run `bun run lint`
- **After every plan wave:** Run `bun run build && bun run lint`
- **Before `/gsd-verify-work`:** Full suite must be green
- **Max feedback latency:** 20 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Threat Ref | Secure Behavior | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|------------|-----------------|-----------|-------------------|-------------|--------|
| 08-01-01 | 01 | 1 | GLB compression | — | N/A | manual | check file size after compression | ❌ W0 | ⬜ pending |
| 08-01-02 | 01 | 1 | Below-fold lazy load | — | N/A | unit | `bun run build` (bundle split verified) | ❌ W0 | ⬜ pending |
| 08-02-01 | 02 | 1 | Dead useMemo removal | — | N/A | unit | `bun run lint` (no warnings) | ❌ W0 | ⬜ pending |
| 08-02-02 | 02 | 1 | DPR cap validation | — | N/A | unit | `bun run lint && bun run build` | ❌ W0 | ⬜ pending |
| 08-03-01 | 03 | 2 | Cross-browser QA | — | N/A | manual | visual check at 375/768/1024/1440px | ❌ W0 | ⬜ pending |
| 08-03-02 | 03 | 2 | Final polish | — | N/A | unit | `bun run build` | ❌ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- Existing infrastructure covers all phase requirements — vitest + ESLint + tsc already in place.

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| GLB loads correctly after compression | 08-01 | Runtime WebGL check required | Load dev server → verify pen model renders correctly |
| 60fps desktop performance | 08-02 | Requires browser profiler | Chrome DevTools → Performance tab → record hero scroll |
| Cross-browser visual check | 08-03 | Multiple browsers required | Check Safari, Firefox, Chrome at 375/768/1024/1440px |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 20s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
