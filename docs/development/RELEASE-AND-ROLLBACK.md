# Release & Rollback — PenFlow77

> Lightweight but explicit release discipline for the current project stage.
> Designed to be actually used — not a process so heavy it gets ignored.

---

## Pre-release Checklist

Before pushing any release to preview or production:

- [ ] `bun run lint` passes (exit 0, no errors)
- [ ] `bun run typecheck` passes (exit 0)
- [ ] `bun run build` passes (exit 0)
- [ ] `bun run test` passes (exit 0)
- [ ] Hero visible and CTA clickable at the three breakpoints (375px, 768px, 1440px)
- [ ] reduced-motion toggle does not break hero
- [ ] Funnel `/auth` → `/beta` → `/dashboard` navigates correctly
- [ ] No console errors on landing page
- [ ] Changelog entry added if user-facing change

## Release Flow

```
1. lint → typecheck → test → build (all must pass)
2. Manual smoke check on local preview
3. Deploy to preview (Cloudflare Pages preview URL)
4. Verify preview URL against checklists above
5. Deploy to production
6. Monitor 30-60 min post-deploy on production URL
```

## Rollback Triggers

Roll back if any of the following are observed on production:

- Hero above the fold is broken or invisible
- CTA buttons do not respond to clicks
- Funnel flow (`/auth` → `/beta` → `/dashboard`) is blocked
- `bun run` commands from the checklist fail on the live build
- Console errors are visible on initial page load that prevent interaction

## Rollback Steps

1. **Git**: Revert the last release commit(s) or deploy the previous known-good branch/tag
   ```bash
   git revert HEAD    # for single commit
   # or
   git checkout <last-known-good-tag> -- .
   ```
2. **Redeploy**: Push the reverted state through the same deploy pipeline
   ```bash
   bun run deploy
   ```
3. **Verify**: Run the Hero/Landing and Funnel checklists from `VALIDATION-CHECKLISTS.md`
4. **Communicate**: Document what triggered the rollback and what was broken

**RTO**: ~45 minutes

## Version Tagging

Tag releases with semantic versions for rollback reference:

```bash
git tag -a v0.X.Y -m "Release description"
git push origin v0.X.Y
```

## Environment Matrix

| Environment | How to Deploy | Validation Required |
|---|---|---|
| Local | `bun run dev` | Developer manual check |
| Preview | `bun run preview` then deploy to CF Pages preview URL | Full checklist |
| Production | `bun run deploy` | Full checklist + 30 min monitoring |
