# DESIGN.md

Design principles for the English Tenses app. Every component, page, and layout decision must align with these rules before shipping.

---

## Design Read

Reading this as: **educational learning app for ESL beginners, mobile-first, with a premium utilitarian minimalist editorial language, leaning toward warm monochrome + Inter body + Geist headings + Geist Mono + Phosphor Icons + ambient subtle motion.**

---

## Dials

| Dial | Value | Rationale |
|------|-------|-----------|
| `DESIGN_VARIANCE` | 5 | Clean and predictable. Centered heroes, symmetric grids. Learners scan for patterns; chaos hurts comprehension. |
| `MOTION_INTENSITY` | 3 | Static baseline with refined micro-interactions. Page transitions, staggered card enter (600ms bezier), timeline reveal, quiz feedback. Subtle hover shadows. No parallax, no scroll-hijack. |
| `VISUAL_DENSITY` | 3 | Airy and scannable. One concept per card. Generous whitespace between sections (py-24+ for section gaps). |

---

## Typography

### Font Stack

Three sans-serif fonts, each with a specific role:

| Role | Font | Weights | Loading |
|------|------|---------|---------|
| Body / UI / Buttons | **Inter** | 400, 500, 600, 700, 800 | Google Fonts |
| Hero / Main Headlines | **Geist** | 400, 500, 600, 700, 800 | Google Fonts |
| Code / Formulas / Meta | **Geist Mono** | 400, 500, 600 | Google Fonts |

**Rule:** All three fonts loaded via Google Fonts `<link>` in `index.html`. Configured in Tailwind `@theme` as `--font-sans` (Inter), `--font-heading` (Geist), `--font-mono` (Geist Mono). No serif fonts anywhere.

### Usage by Role

| Element | Font Family | Tailwind Class |
|---------|-------------|----------------|
| Hero headline, page titles, lesson titles, intro slide titles | Geist | `font-heading` |
| Body text, UI labels, buttons, badges, descriptions | Inter | `font-sans` (default) |
| Grammar formulas, code blocks, technical labels | Geist Mono | `font-mono` |

### Scale (locked)

| Role | Classes | Weight |
|------|---------|--------|
| Daily tense hero number | `text-4xl` | `font-extrabold` |
| Page main heading (Geist) | `text-3xl sm:text-4xl` | `font-extrabold tracking-tight` |
| Lesson title, progress count, quiz score (Geist) | `text-2xl` | `font-extrabold tracking-tight` |
| Section title, quiz complete heading | `text-xl` | `font-bold` |
| Header title, lesson card name, quiz question | `text-lg` | `font-semibold` |
| Body text, button label, example sentence | `text-sm` | `font-medium` or `font-semibold` |
| Meta label, badge, timeline label | `text-xs` | `font-medium` or `font-semibold` |
| Difficulty badge | `text-[10px]` | `font-semibold uppercase tracking-wider` |

### Tracking

- `tracking-tight` -- all headings
- `tracking-wider` -- uppercase section labels (e.g., "TIMELINE", "FORMULA", "EXAMPLES")
- `tabular-nums` -- progress percentages, quiz scores, any number that changes (prevents CLS)

### Typography Rules

- No serif fonts of any kind. All fonts are sans-serif.
- No Fraunces, No Instrument Serif, No Playfair Display.
- Geist for hero/main headings. Inter for body text. Geist Mono for code.
- No mixed-family emphasis. Bold/italic within the same family only.
- Headlines are single-line on desktop. Subtext stays under 25 words.
- Grammar formulas use `<code>` with `font-mono`.
- Em-dash is banned. Use hyphens.

---

## Color System

### Warm Monochrome Base

All structural UI uses a warm monochrome palette. No cool grays, no pure black, no pure white.

| Token | CSS Variable | Light | Dark | Usage |
|-------|-------------|-------|------|-------|
| Canvas | `--color-canvas` | `#F7F6F3` | `#0D0D0D` | Root page background |
| Surface | `--color-surface` | `#FFFFFF` | `#1A1A1A` | Card backgrounds |
| Surface Raised | `--color-surface-raised` | `#F9F9F8` | `#242424` | Elevated cards, formula rows |
| Surface Hover | `--color-surface-hover` | `#F3F2F0` | `#333333` | Interactive hover states |
| Border | `--color-border` | `#EAEAEA` | `#2A2A2A` | Card borders, dividers, accordion separators |
| Border Hover | `--color-border-hover` | `#D9D9D9` | `#333333` | Interactive card border on hover |
| Progress BG | `--color-progress-bg` | `#E8E7E4` | `#2A2A2A` | Progress bar empty track |
| Text Primary | `--color-text-primary` | `#111111` | `#EDEDED` | Headlines, body text |
| Text Secondary | `--color-text-secondary` | `#787774` | `#9B9B9B` | Descriptions, meta |
| Text Tertiary | `--color-text-tertiary` | `#9B9A97` | `#777777` | Secondary labels |
| Text Muted | `--color-text-muted` | `#B4B3AF` | `#777777` | Placeholders, captions |

### Pastel Accent Colors (5 Tense Categories)

Each tense category has three color levels: a mid-tone for filled badges, a light pastel background, and a readable text color. These are highly desaturated.

| Category | Badge (fill) | Background (pastel) | Text |
|----------|-------------|---------------------|------|
| Present (Blue) | `#5BA4CF` | `#E1F3FE` | `#1F6C9F` |
| Past (Orange) | `#C8844A` | `#FEF3E8` | `#9F5B2D` |
| Future (Purple) | `#8B5FBF` | `#F3EDFC` | `#6B3F9F` |
| Continuous (Green) | `#5C8F5A` | `#EDF3EC` | `#346538` |
| Perfect (Red) | `#C45552` | `#FDEBEC` | `#9F2F2D` |

**Usage pattern:**

- `bg-present` / `bg-past` etc. -- filled badges, lesson number circles, CTA buttons
- `bg-present-bg` / `bg-past-bg` etc. -- tinted card backgrounds, tag backgrounds
- `text-present-text` / `text-past-text` etc. -- colored text on neutral backgrounds

**Rule:** Accent colors only appear on their associated tense content. No color leakage between categories.

### Semantic Feedback Colors

| Meaning | Pastel BG | Text | Usage |
|---------|-----------|------|-------|
| Success / Correct | `#EDF3EC` | `#346538` | Quiz correct answers, completion checkmarks |
| Error / Wrong | `#FDEBEC` | `#9F2F2D` | Quiz wrong answers, mistake strikethrough |
| Warning / Tricky | `#FBF3DB` | `#956400` | Tricky examples |
| Level 1 (Beginner) | `#EDF3EC` | `#346538` | Level badge |
| Level 2 (Intermediate) | `#FBF3DB` | `#956400` | Level badge |
| Level 3 (Advanced) | `#FEF3E8` | `#9F5B2D` | Level badge |
| Level 4 (Expert) | `#F3EDFC` | `#6B3F9F` | Level badge |

### What We Avoid

- Gradients (none on cards, buttons, or backgrounds)
- Glass morphism / backdrop-blur (Header uses `backdrop-blur-xl` for sticky-nav function only)
- Heavy box shadows -- shadows only on hover: `0 2px 12px rgba(0,0,0,0.04)` max
- Neon glows / outer glows
- Pure black (`#000000`) or pure white (`#FFFFFF` for backgrounds; surface white is OK as a card)
- Bright primary-colored backgrounds for large sections
- Warm beige/cream #F5F1EA family as default (we use #F7F6F3 canvas which is bone, not beige)

---

## Shape & Radius

### Border Radius Scale (locked, Protocol-compliant)

| Element | Radius | Tailwind |
|---------|--------|----------|
| Cards, sections | 12px | `rounded-xl` |
| Internal panels, quiz options, internal card elements | 8px | `rounded-lg` |
| Buttons, CTAs | 6px | `rounded-md` |
| Lesson number badges, formula icon containers | 8px | `rounded-lg` |
| Tags, difficulty badges, progress bar background | Full | `rounded-full` |

**Rule:** No `rounded-3xl` (24px), no `rounded-2xl` (16px). `rounded-full` is reserved for small tags and badges only -- never for cards or large containers.

### Card Pattern

```
rounded-xl border border-border bg-surface p-5 sm:p-6
```

Interactive cards add:

```
hover:border-border-hover hover:shadow-[0_2px_12px_rgba(0,0,0,0.04)] transition-all duration-200
```

**Rule:** Cards get a 1px `#EAEAEA` border. Subtle shadow only on hover. Never drop shadow by default.

### Card Grid Consistency

Lesson cards in a grid row must have identical height. Achieved by:

- `h-full` on the wrapping `<Link>` and the card's `motion.div`
- `flex flex-col` on the card to make it a vertical flex container
- `truncate` on the lesson name and English name to prevent overflow
- `line-clamp-2` on the description to cap at 2 lines
- Progress bar container always rendered (even when score is null, the track is visible as a placeholder) with a fixed-width score label (`w-8`). This keeps the bottom spacing consistent across completed and uncompleted cards.

### Dividers & Separators

Accordion-style separators between list items use `border-b border-border`. No box containers around each item. Clean separation with `border-bottom: 1px solid #EAEAEA`.

---

## Layout

### Container Widths

| Context | Max Width | Tailwind |
|---------|-----------|----------|
| Home page | 1024px | `max-w-5xl` |
| Lesson detail | 768px | `max-w-3xl` |
| Intro overlay | 512px | `max-w-lg` |
| All pages | Centered | `mx-auto` |

### Page Padding

- Mobile (< 640px): `px-4 py-8`
- Tablet+ (640px+): `sm:px-6 sm:py-12`

### Section Spacing

Massive vertical padding between sections: `py-24` to `py-32`. Typography is constrained to `max-w-5xl`.

### Grid Systems

| Context | Columns |
|---------|---------|
| Lesson grid (mobile) | 1 column |
| Lesson grid (tablet) | 2 columns (`sm:grid-cols-2`) |
| Lesson grid (desktop) | 3 columns (`lg:grid-cols-3`) |
| Usage cards (LessonDetail) | 1 col mobile, 2 cols `sm:grid-cols-2` |

### Layout Rules

- Mobile collapse is explicit in every component.
- Navigation is single-line on all viewports. Header max 72px.
- Never use `h-screen`. Use `min-h-[100dvh]` for full-height sections.
- Grid over flex-math. Never `w-[calc(33%-1rem)]`.
- Hero content fits initial viewport. Headline max 2 lines on desktop.

---

## Motion

### Library: Framer Motion (`framer-motion`)

Import from `framer-motion` (legacy package, as established in this project).

### Animation Catalog

| Animation | Trigger | Duration | Easing | Where |
|-----------|---------|----------|--------|-------|
| Page transition | Route change | 300ms | `easeInOut` | `PageTransition` -- opacity 0→1, y 8→0 |
| Card enter stagger | Mount | 500ms x index*0.06 | `[0.16, 1, 0.3, 1]` | `LessonCard` grid -- opacity 0→1, y 16→0 |
| Card hover lift | `whileHover` | -- | duration 200ms | `LessonCard` -- y 0→-2 + shadow shift |
| DailyTenseHero badge pulse | Infinite | 3000ms loop | `easeInOut` | Hero badge -- scale [1, 1.05, 1] |
| Header dropdown | `AnimatePresence` | 150ms | -- | Language switcher |
| Intro slide transition | Slide change | -- | -- | `IntroOverlay` -- fade + y 16→0 |
| Timeline bar reveal | Mount | 800ms delay 0.2s | `easeOut` | `Timeline` -- scaleX 0→1 |
| Timeline dot | Mount | 400ms delay 0.6s | `easeOut` | `Timeline` -- opacity + scale |
| Timeline pulse | Infinite | 1500ms | -- | Continuous/PerfectContinuous variants only |
| Quiz next button | Reveal | Spring | -- | `QuizCard` -- opacity 0→1, y 8→0 |
| Quiz score screen | Reveal | -- | -- | `QuizCard` -- opacity 0→1, scale 0.95→1 |
| Progress bar fill | Mount | 600ms | `easeOut` | `ProgressBar` -- width 0→target% |
| Lesson section reveal | Mount | 600ms stagger | `[0.16, 1, 0.3, 1]` | `LessonDetail` sections -- opacity + y 16→0 |
| Button press | `:active` | -- | -- | `active:scale-[0.98]` tactile feedback |

### Motion Rules

- No infinite loops except DailyTenseHero badge pulse + Timeline continuous variants.
- No `window.addEventListener('scroll')`.
- No GSAP, no ScrollTrigger. Motion intensity is 3.
- `AnimatePresence mode="wait"` on page transitions.
- Animate `transform` and `opacity` ONLY. Never `top`, `left`, `width`, `height`.
- Hover: cards shift shadow from `0 0 0` to `0 2px 12px rgba(0,0,0,0.04)` over 200ms.
- Staggered reveals: lists and grids enter with cascade delay (`delay: index * 80ms`).
- If a single very slow-moving ambient gradient is used in the future, apply it to a `position: fixed; pointer-events: none` layer. Never on scrolling containers.

---

## Icons

### Library: Phosphor Icons (Bold weight)

Install: `pnpm add @phosphor-icons/react`
Import: `import { Check, X, Globe, Sun, Moon, CaretDown, CaretLeft, ArrowRight } from '@phosphor-icons/react'`

**Standard:** All icons use `weight="bold"` for a thicker, more technical stroke aesthetic. Standardized stroke width across all icon instances.

**Rule:** No icon library mixing. Phosphor Bold exclusively. No Lucide, no Heroicons, no Feather.

### Icon Map

| Icon | Usage |
|------|-------|
| `Check` | Quiz correct answers, completion badge, correct example |
| `X` | Quiz wrong answers, mistake strikethrough |
| `Globe` | Language switcher button |
| `Sun` / `Moon` | Theme toggle |
| `CaretDown` | Dropdown indicator |
| `CaretLeft` | Back navigation |
| `ArrowRight` | CTA forward indicator |
| Speaker SVG (hand-rolled) | TTS button (custom animation needs inline SVG) |

---

## Components & Conventions

### Color Maps

Shared color utility at `src/utils/colors.ts`. Three lookup patterns:

- `colorBasic`: `{ bg, light, text }` for backgrounds + text
- `colorFull`: `{ bg, light, text, badge }` for components needing a badge fill
- `badgeColor`: simple `bg-{color}` mapping for badge fills
- `levelColors`: Array of level badge styles

### Button Styles

| Variant | Classes | Usage |
|---------|---------|-------|
| Primary CTA | `bg-text-primary text-white rounded-md hover:bg-[#333333] active:scale-[0.98]` | Main actions, quiz submit, intro skip |
| Secondary | `bg-surface-raised rounded-md text-text-secondary hover:bg-surface-hover` | Back links, alternative actions |
| Ghost / text-only | `text-text-muted hover:text-text-secondary` | Theme toggle, language switcher |
| Quiz option (default) | `bg-surface-raised rounded-lg border border-border` | Unanswered quiz options |
| Quiz option (correct) | `bg-level-1 border-level-1-text/30` | Correct answer |
| Quiz option (wrong) | `bg-perfect-bg border-perfect-text/30` | Wrong answer |
| Tense CTA | `bg-{tense-color} text-white rounded-md` | DailyTenseHero CTA, tense-specific buttons |

### Form & Input

- Labels above inputs (`gap-2`)
- No placeholder-as-label
- Error text below inputs
- Focus ring: `focus-visible:outline-2 outline-offset-2 outline-present`

### States

- Loading: Skeletal loaders matching final layout shape (future)
- Empty: Graceful message
- Error: Inline messages
- Tactile: `active:scale-[0.98]` on all buttons

### Keystroke Micro-UIs (Grammar Formulas)

Grammar formulas render as:

```html
<code className="font-mono text-sm font-semibold text-text-primary dark:text-[#EDEDED]">
  Subject + Verb
</code>
```

---

## Dark Mode

Strategy: Tailwind `dark:` variant. Toggle `.dark` class on `<html>` via `useTheme`.

```css
@custom-variant dark (&:where(.dark, .dark *));
```

Default: respects `prefers-color-scheme`. Persists to `tense-craft-theme` in localStorage.

Background transition: `transition: background-color 0.3s ease, color 0.3s ease` on body.

**Page Theme Lock:** One theme for the entire page. No section inversions mid-page.

---

## Responsive & Viewport

| Prefix | Width | Devices |
|--------|-------|---------|
| (none) | < 640px | Mobile (375-414px) |
| `sm:` | 640px+ | Large phones, tablets |
| `lg:` | 1024px+ | Desktop |

- Mobile-first. Default styles = mobile. Breakpoints add complexity.
- Grid collapses to single column: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`.
- Touch targets: min 44x44px.
- `-webkit-tap-highlight-color: transparent` globally.

---

## Accessibility

- Keyboard navigation for all interactive elements
- Visible focus rings (`focus-visible:outline-2 outline-offset-2 outline-present`)
- Semantic HTML (heading hierarchy, `<nav>`, `<main>`, `<section>`, `<button>`, `<label>`)
- Screen reader support (aria-labels on icon buttons)
- WCAG AA contrast minimum (4.5:1 body, 3:1 large text 18px+)

---

## Data & State

- Lesson data: `src/data/lessons.ts` (12 tenses, hardcoded)
- Progress: Zustand + persist → `tense-craft-progress` (localStorage)
- Theme: `useTheme` hook → `tense-craft-theme` (localStorage)
- Intro skipped: `tense-craft-intro-skipped` (localStorage)
- i18n: `i18next` + `react-i18next`, locales en/zh/ja
- Tense of the Day: date-based deterministic seed (`src/utils/seeds.ts`)

---

## Performance Targets

| Metric | Target |
|--------|--------|
| Lighthouse | > 90 |
| LCP | < 2.5s |
| CLS | < 0.1 |

- Fonts via Google Fonts with `font-display: swap`
- `tabular-nums` on numeric values
- `scroll-behavior: smooth` on `<html>`

---

## Component Inventory

| Component | File | Purpose |
|-----------|------|---------|
| `Header` | `src/components/Header.tsx` | Sticky nav with app title, progress, language switcher, theme toggle |
| `LessonCard` | `src/components/LessonCard.tsx` | Clickable lesson tile with number badge, name, completion, score bar |
| `DailyTenseHero` | `src/components/DailyTenseHero.tsx` | Featured "Tense of the Day" card with Geist heading |
| `Timeline` | `src/components/Timeline.tsx` | Animated timeline (4 variants) |
| `QuizCard` | `src/components/QuizCard.tsx` | Multiple-choice quiz with pastel feedback |
| `ProgressBar` | `src/components/ProgressBar.tsx` | Animated fill bar |
| `PageTransition` | `src/components/PageTransition.tsx` | Route change fade+slide |
| `IntroOverlay` | `src/components/IntroOverlay.tsx` | First-visit onboarding |

---

## What We Never Do

- Serif fonts of any kind (all-sans-serif: Inter body, Geist headings, Geist Mono code)
- Gradients, neon colors, 3D glassmorphism
- Pure black (`#000000`) or pure white (`#FFFFFF` for page backgrounds)
- `rounded-full` on large containers, cards, or buttons
- Lucide, Heroicons, or Feather icons
- Emojis in code, markup, or text
- Generic names (John Doe) or AI copy cliches (Elevate, Seamless)
- `h-screen` (use `min-h-[100dvh]`)
- `window.addEventListener('scroll')`
- Em-dash characters anywhere
- Serif fonts in body text or UI (all fonts are sans-serif)
- Decorative status dots, section numbering, scroll cues
- Photo-credit captions, version footers, locale strips
- Fake product screenshots built from `<div>` elements

---

## Pre-Flight Checklist

Before shipping any UI change, verify:

- [ ] Color: Warm monochrome base + correct pastel tense accent
- [ ] Dark mode: Tested in both modes, contrast parity confirmed
- [ ] Radius: 12px cards (`rounded-xl`), 8px panels (`rounded-lg`), 6px buttons (`rounded-md`), `rounded-full` only on small tags
- [ ] Cards: 1px `#EAEAEA` border, shadow only on hover
- [ ] Typography: Serif for hero/main titles, sans for body, mono for formulas. Inter not used anywhere.
- [ ] Icons: Phosphor Bold weight, no other icon library
- [ ] Motion: No infinite loops except the 2 approved, no scroll listeners, `transform`+`opacity` only
- [ ] Mobile: Single-column fallback, 44px touch targets, correct padding
- [ ] Accessibility: Keyboard nav, focus ring, semantic HTML, WCAG AA
- [ ] Copy: No em-dashes, no AI-slop, concrete language
- [ ] TypeScript: No type errors
- [ ] i18n: New strings in all 3 locale files
- [ ] Performance: No `h-screen`, no layout-triggering animations
