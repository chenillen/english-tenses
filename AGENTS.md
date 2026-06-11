# AGENTS.md

## Architecture

Single-page React app deployed to GitHub Pages. No backend, no database.

| Layer | Stack |
|-------|-------|
| Build | Vite 7, `base: '/english-tenses/'` |
| UI | React 19, TailwindCSS 4, Framer Motion |
| Routing | react-router-dom v7, `BrowserRouter basename="/english-tenses/"` |
| State | Zustand with `persist` middleware (`localStorage`) |
| i18n | i18next + react-i18next, browser language detection |
| Lang | TypeScript 5, strict mode, `noEmit` |

### Directory map

```
src/
  components/   — 8 reusable components (Header, Timeline, QuizCard, etc.)
  pages/        — Home and LessonDetail (the two routes)
  data/         — lessons.ts (12 tenses, hardcoded)
  store/        — progress.ts (Zustand + persist)
  hooks/        — useTheme, useLocale
  i18n/         — config + locales/{en,zh,ja}.json
  utils/        — seeds.ts (date-based deterministic seed)
```

## Critical constraints

### Vite base and Router basename must stay in sync

Both are `/english-tenses/`. Changing one without the other breaks assets or routing on GitHub Pages.

### TailwindCSS v4

Uses `@import 'tailwindcss'` in CSS (not `@tailwind base/components/utilities`). Custom theme colors use `@theme { --color-* }` syntax. Dark mode triggers via `.dark` class on `<html>` — `useTheme` toggles this.

### PNPM workspace

`pnpm-workspace.yaml` sets `allowBuilds: { esbuild: false }` — esbuild native postinstall builds are skipped. This is intentional to avoid native binary issues in CI.

### No test/lint infrastructure yet

There is no test framework, linter, or formatting tool configured. TypeScript `strict: true` is the only guard. Run `pnpm exec tsc --noEmit` to verify.

### localStorage keys (prefixed, no collisions)

- `english-tenses-progress` — Zustand persist store
- `english-tenses-theme` — `'light' | 'dark'`
- `english-tenses-intro-skipped` — `'true'` or absent

### Lessons data

Stateless. All 12 tenses are defined in `src/data/lessons.ts`. Each lesson has a `slug`, `level` (1-4), `category`, `color`, `timelineType`, `formula`, `examples` (with en/cn/ja), `mistakes`, and `quiz`. The `Example` type includes a `ja` field for Japanese — three locales are supported even though README only mentions English + Chinese.

## Commands

- `pnpm dev` — start dev server
- `pnpm build` — production build to `dist/`
- `pnpm preview` — preview the production build locally
- `pnpm exec tsc --noEmit` — typecheck (no `lint`/`test` scripts exist)

Only pnpm works here. Do not use npm or yarn.

### CI (GitHub Actions)

`.github/workflows/deploy.yml` triggers on push to `master` only. Uses pnpm 10, Node 22, builds, and deploys `dist/` to GitHub Pages.

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
