# Tense Craft

An interactive, mobile-first web app for learning all 12 English tenses through visual timelines, examples, quizzes, and progress tracking.

Built for ESL learners. English, Chinese, and Japanese supported.

**[Live Demo](https://chenillen.github.io/tense-craft/)**

---

## Features

- 12 tenses across 4 difficulty levels
- Animated timeline visualizations for each tense
- Grammar formulas with positive/negative/question forms
- Example sentences with text-to-speech playback
- Multiple-choice quizzes with immediate feedback
- Progress tracking with quiz scores (localStorage)
- Dark mode with system preference detection
- Three languages: English, Simplified Chinese, Japanese
- Keyboard-navigable intro overlay for first-time visitors
- Deterministic "Tense of the Day" picked from date seed

---

## Tech Stack

| Layer | Stack |
|-------|-------|
| Build | Vite 7 |
| UI | React 19, TailwindCSS 4, Framer Motion |
| Routing | react-router-dom v7 |
| State | Zustand with `persist` middleware |
| i18n | i18next + react-i18next |
| Icons | Phosphor Icons (Bold weight) |
| Lang | TypeScript 5, strict mode |

---

## Quick Start

```bash
pnpm install
pnpm dev
```

Open `http://localhost:5173/tense-craft/` in your browser.

```bash
pnpm build        # production build to dist/
pnpm preview      # preview production build locally
pnpm exec tsc --noEmit  # typecheck
```

---

## Architecture

Single-page React app with no backend. Two routes: Home (`/`) and Lesson Detail (`/lesson/:slug`).

```
src/
  components/   — 8 reusable components
  pages/        — Home and LessonDetail
  data/         — lessons.ts (12 tenses, hardcoded)
  store/        — progress.ts (Zustand + persist)
  hooks/        — useTheme, useLocale, useSpeech
  i18n/         — config + locales/{en,zh,ja}.json
  utils/        — colors.ts (shared palette), seeds.ts (date-based hash)
```

## Design

Warm monochrome palette (`#F7F6F3` canvas) with desaturated pastel accents for tense categories. Typography uses Inter (body), Geist (headings), and Geist Mono (code/formulas). Full design system documented in **[DESIGN.md](./DESIGN.md)**.

---

## Deployment

Deployed to GitHub Pages via GitHub Actions on push to `master`.

Vite `base` and React Router `basename` are both set to `/tense-craft/` and `/tense-craft` respectively.

---

## License

MIT
