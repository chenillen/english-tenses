# AGENTS.md

## Branch Strategy (Git-Flow)

```
master       ── production, auto-deploys to GitHub Pages
feature/*    ── new features and non-urgent fixes
hotfix/*     ── urgent production fixes
```

### Branch Rules

- `master` is the production branch. Only merge via PR. Pushes trigger GitHub Pages deploy.
- Create a `feature/<name>` branch from `master` for all new work.
- Create a `hotfix/<name>` branch from `master` for critical production fixes.
- Keep feature branches short-lived and focused on one change.
- Delete the feature branch after merge (both remote and local).
- Rebase feature branches onto `master` before merging if there are conflicts.
- Never commit directly to `master`.

## PR Workflow

- Never merge a PR until Coderabbit has finished its code review and all issues are resolved.
- Wait for CI checks and automated reviews to complete before merging.
- Squash and rebase before merging to keep history clean.
