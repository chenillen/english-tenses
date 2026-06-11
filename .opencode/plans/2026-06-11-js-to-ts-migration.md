# JavaScript → TypeScript Migration (Strict Mode) Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Migrate the entire English Tenses project from JavaScript/JSX to TypeScript/TSX with `strict: true`, zero `any` usage, and full type safety.

**Architecture:** Create a shared `src/types.ts` file with all interfaces/type unions, rename all `.js`/`.jsx` files to `.ts`/`.tsx`, add type annotations to every component, hook, store, and utility. Extract shared utilities (`seedFromDate`) from duplicated inline code. All dependencies ship their own types — only `typescript` needs to be installed.

**Tech Stack:** TypeScript 5.7+ (strict), React 19 (JSX transform), Zustand v5, React Router v7, i18next v26, Framer Motion v12, Vite v7.

**Files affected:** 25 files (19 rename+type, 4 create, 3 modify). Zero new npm dependencies except `typescript`.

---

## Overview: File Migration Map

| # | Action | File |
|---|--------|------|
| 1 | CREATE | `tsconfig.json` |
| 2 | CREATE | `src/types.ts` |
| 3 | CREATE | `src/utils/seeds.ts` |
| 4 | CREATE | `src/vite-env.d.ts` |
| 5 | MODIFY | `package.json` (add `typescript` devDep) |
| 6 | MODIFY | `index.html` (update script src to `.tsx`) |
| 7 | MODIFY | `.gitignore` (add `*.tsbuildinfo`) |
| 8 | RENAME | `vite.config.js` → `vite.config.ts` |
| 9 | RENAME+TYPE | `src/data/lessons.js` → `src/data/lessons.ts` |
| 10 | RENAME+TYPE | `src/store/progress.js` → `src/store/progress.ts` |
| 11 | RENAME+TYPE | `src/hooks/useLocale.js` → `src/hooks/useLocale.ts` |
| 12 | RENAME+TYPE | `src/hooks/useTheme.js` → `src/hooks/useTheme.ts` |
| 13 | RENAME+TYPE | `src/i18n/config.js` → `src/i18n/config.ts` |
| 14 | RENAME+TYPE | `src/components/ProgressBar.jsx` → `src/components/ProgressBar.tsx` |
| 15 | RENAME+TYPE | `src/components/PageTransition.jsx` → `src/components/PageTransition.tsx` |
| 16 | RENAME+TYPE | `src/components/DailyTenseHero.jsx` → `src/components/DailyTenseHero.tsx` |
| 17 | RENAME+TYPE | `src/components/LessonCard.jsx` → `src/components/LessonCard.tsx` |
| 18 | RENAME+TYPE | `src/components/QuizCard.jsx` → `src/components/QuizCard.tsx` |
| 19 | RENAME+TYPE | `src/components/Timeline.jsx` → `src/components/Timeline.tsx` |
| 20 | RENAME+TYPE | `src/components/IntroOverlay.jsx` → `src/components/IntroOverlay.tsx` |
| 21 | RENAME+TYPE | `src/components/Header.jsx` → `src/components/Header.tsx` |
| 22 | RENAME+TYPE | `src/pages/Home.jsx` → `src/pages/Home.tsx` |
| 23 | RENAME+TYPE | `src/pages/LessonDetail.jsx` → `src/pages/LessonDetail.tsx` |
| 24 | RENAME+TYPE | `src/App.jsx` → `src/App.tsx` |
| 25 | RENAME+TYPE | `src/main.jsx` → `src/main.tsx` |

---

## Task 1: Project Setup — tsconfig.json, devDeps, vite-env.d.ts

**Files:**
- Create: `tsconfig.json`
- Create: `src/vite-env.d.ts`
- Modify: `package.json`
- Modify: `.gitignore`
- Modify: `index.html`

### Step 1: Create `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "moduleResolution": "bundler",
    "jsx": "react-jsx",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "allowImportingTsExtensions": true,
    "baseUrl": "."
  },
  "include": ["src", "vite.config.ts"],
  "exclude": ["node_modules", "dist"]
}
```

### Step 2: Create `src/vite-env.d.ts`

```typescript
/// <reference types="vite/client" />
```

### Step 3: Add `typescript` to devDependencies in `package.json`

Add under `devDependencies`:
```json
"typescript": "^5.7.0"
```

### Step 4: Add `*.tsbuildinfo` to `.gitignore`

Append to `.gitignore`:
```
*.tsbuildinfo
```

### Step 5: Update `index.html` — change script src

Line 14, change:
```html
<script type="module" src="/src/main.jsx"></script>
```
To:
```html
<script type="module" src="/src/main.tsx"></script>
```

### Step 6: Install dependencies

Run: `pnpm install`

### Step 7: Commit

```bash
git add tsconfig.json src/vite-env.d.ts package.json pnpm-lock.yaml .gitignore index.html
git commit -m "chore: add TypeScript config, devDeps, and entry point update"
```

---

## Task 2: Shared Types — `src/types.ts`

**Files:**
- Create: `src/types.ts`

### Step 1: Write `src/types.ts`

```typescript
// ---- Data Layer ----

export interface Example {
  en: string
  cn: string
  ja: string
}

export interface Mistake {
  wrong: string
  correct: string
}

export interface QuizQuestion {
  question: string
  options: string[]
  answer: number
}

export interface Formula {
  positive: string
  negative: string
  question: string
}

export type Category = 'present' | 'past' | 'future'

export type TColor = 'blue' | 'orange' | 'purple' | 'green' | 'red'

export type TimelineType =
  | 'present-center'
  | 'past-point'
  | 'future-point'
  | 'continuous-present'
  | 'continuous-past'
  | 'continuous-future'
  | 'perfect-present'
  | 'perfect-past'
  | 'perfect-future'
  | 'perfect-continuous-present'
  | 'perfect-continuous-past'
  | 'perfect-continuous-future'

export interface Lesson {
  id: number
  slug: string
  level: 1 | 2 | 3 | 4
  category: Category
  difficulty: 1 | 2 | 3 | 4
  color: TColor
  timelineType: TimelineType
  formula: Formula
  examples: Example[]
  mistakes: Mistake[]
  quiz: QuizQuestion[]
}

// ---- Store ----

export interface QuizScores {
  [slug: string]: number
}

export interface ProgressState {
  completedLessons: string[]
  quizScores: QuizScores
  completeLesson: (slug: string) => void
  setQuizScore: (slug: string, score: number) => void
  getLessonProgress: (slug: string) => boolean
  getOverallProgress: () => number
  resetProgress: () => void
}

// ---- i18n ----

export type Locale = 'en' | 'zh' | 'ja'

// ---- Component Props ----

export interface IntroOverlayProps {
  lessons: Lesson[]
  onClose: () => void
}

export interface DailyTenseHeroProps {
  lessons: Lesson[]
}

export interface LessonCardProps {
  lesson: Lesson
  completed: boolean
  score?: number
  index: number
}

export interface QuizCardProps {
  quiz: QuizQuestion[]
  onComplete?: (score: number) => void
}

export interface TimelineProps {
  type: TimelineType
  color: TColor
}

export interface ProgressBarProps {
  current: number
  total: number
  className?: string
}

// ---- Internal Color Maps ----

export interface ColorStyleBasic {
  bg: string
  light: string
  text: string
}

export interface ColorStyleFull extends ColorStyleBasic {
  badge: string
}

export type ColorMap = Record<TColor, ColorStyleBasic>
export type ColorFullMap = Record<TColor, ColorStyleFull>
```

### Step 2: Commit

```bash
git add src/types.ts
git commit -m "feat: add shared TypeScript type definitions"
```

---

## Task 3: Shared Utility — `src/utils/seeds.ts`

**Files:**
- Create: `src/utils/seeds.ts`

Extract `seedFromDate` that currently exists identically in both `IntroOverlay.jsx` and `DailyTenseHero.jsx`.

### Step 1: Write `src/utils/seeds.ts`

```typescript
export function seedFromDate(): number {
  const today = new Date()
  const key = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`
  let hash = 0
  for (let i = 0; i < key.length; i++) {
    hash = ((hash << 5) - hash) + key.charCodeAt(i)
    hash |= 0
  }
  return Math.abs(hash)
}
```

### Step 2: Commit

```bash
git add src/utils/seeds.ts
git commit -m "feat: extract shared seedFromDate utility"
```

---

## Task 4: Data Layer — `src/data/lessons.ts`

**Files:**
- Delete: `src/data/lessons.js`
- Create: `src/data/lessons.ts`

### Step 1: Write `src/data/lessons.ts`

Copy entire array from `lessons.js`, add import and type annotation at top:

```typescript
import type { Lesson } from '../types'

const lessons: Lesson[] = [
  {
    id: 1,
    slug: 'simple-present',
    level: 1,
    category: 'present',
    difficulty: 1,
    color: 'blue',
    timelineType: 'present-center',
    formula: {
      positive: 'Subject + V1 (+ s/es for he/she/it)',
      negative: "Subject + do/does + not + V1",
      question: 'Do/Does + Subject + V1?',
    },
    examples: [
      { en: 'I go to school every day.', cn: '我每天去学校。', ja: '私は毎日学校に行きます。' },
      { en: 'She works at a bank.', cn: '她在银行工作。', ja: '彼女は銀行で働いています。' },
      { en: 'The sun rises in the east.', cn: '太阳从东方升起。', ja: '太陽は東から昇ります。' },
      { en: 'They play football on weekends.', cn: '他们周末踢足球。', ja: '彼らは週末にサッカーをします。' },
    ],
    mistakes: [
      { wrong: 'He go to school.', correct: 'He goes to school.' },
      { wrong: "She don't like coffee.", correct: "She doesn't like coffee." },
    ],
    quiz: [
      { question: 'He ____ football every day.', options: ['play', 'plays', 'playing', 'played'], answer: 1 },
      { question: 'They ____ to the gym on Mondays.', options: ['go', 'goes', 'going', 'gone'], answer: 0 },
      { question: 'She ____ not like vegetables.', options: ['do', 'does', 'is', 'are'], answer: 1 },
      { question: 'Water ____ at 100 degrees Celsius.', options: ['boil', 'boils', 'boiling', 'boiled'], answer: 1 },
    ],
  },
  // ... all 12 lessons (identical data to lessons.js)
]

export default lessons
```

### Step 2: Delete old file and commit

```bash
rm src/data/lessons.js
git add src/data/lessons.ts src/data/lessons.js
git commit -m "refactor: migrate lessons data to TypeScript"
```

---

## Task 5: Zustand Store — `src/store/progress.ts`

**Files:**
- Delete: `src/store/progress.js`
- Create: `src/store/progress.ts`

### Step 1: Write `src/store/progress.ts`

Zustand v5 requires the double-call generic pattern `create<T>()(...)` in TS.

```typescript
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { ProgressState } from '../types'

const useProgress = create<ProgressState>()(
  persist(
    (set, get) => ({
      completedLessons: [],
      quizScores: {},

      completeLesson: (slug: string) =>
        set((state) => ({
          completedLessons: state.completedLessons.includes(slug)
            ? state.completedLessons
            : [...state.completedLessons, slug],
        })),

      setQuizScore: (slug: string, score: number) =>
        set((state) => ({
          quizScores: { ...state.quizScores, [slug]: score },
        })),

      getLessonProgress: (slug: string) => {
        const state = get()
        return state.completedLessons.includes(slug)
      },

      getOverallProgress: () => {
        const state = get()
        return state.completedLessons.length
      },

      resetProgress: () =>
        set({ completedLessons: [], quizScores: {} }),
    }),
    {
      name: 'english-tenses-progress',
    }
  )
)

export default useProgress
```

### Step 2: Delete old file and commit

```bash
rm src/store/progress.js
git add src/store/progress.ts src/store/progress.js
git commit -m "refactor: migrate Zustand store to TypeScript"
```

---

## Task 6: Hooks — `useLocale.ts` and `useTheme.ts`

**Files:**
- Delete: `src/hooks/useLocale.js`
- Create: `src/hooks/useLocale.ts`
- Delete: `src/hooks/useTheme.js`
- Create: `src/hooks/useTheme.ts`

### Step 1: Write `src/hooks/useLocale.ts`

```typescript
import { useTranslation } from 'react-i18next'
import { useMemo } from 'react'
import type { Locale } from '../types'

export default function useLocale(): Locale {
  const { i18n } = useTranslation()
  return useMemo(() => (i18n.language?.split('-')[0] || 'en') as Locale, [i18n.language])
}
```

### Step 2: Write `src/hooks/useTheme.ts`

```typescript
import { useState, useEffect, useCallback } from 'react'

type Theme = 'light' | 'dark'

interface UseThemeReturn {
  theme: Theme
  toggleTheme: () => void
}

export default function useTheme(): UseThemeReturn {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === 'undefined') return 'light'
    const stored = localStorage.getItem('english-tenses-theme')
    if (stored === 'dark' || stored === 'light') return stored
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
    localStorage.setItem('english-tenses-theme', theme)
  }, [theme])

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
  }, [])

  return { theme, toggleTheme }
}
```

### Step 3: Delete old files and commit

```bash
rm src/hooks/useLocale.js src/hooks/useTheme.js
git add src/hooks/useLocale.ts src/hooks/useTheme.ts src/hooks/useLocale.js src/hooks/useTheme.js
git commit -m "refactor: migrate hooks to TypeScript"
```

---

## Task 7: i18n Config — `src/i18n/config.ts`

**Files:**
- Delete: `src/i18n/config.js`
- Create: `src/i18n/config.ts`

### Step 1: Write `src/i18n/config.ts`

```typescript
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import en from './locales/en.json'
import zh from './locales/zh.json'
import ja from './locales/ja.json'

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: { en, zh, ja },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  })

export default i18n
```

### Step 2: Delete old file and commit

```bash
rm src/i18n/config.js
git add src/i18n/config.ts src/i18n/config.js
git commit -m "refactor: migrate i18n config to TypeScript"
```

---

## Task 8: Leaf Components — ProgressBar, PageTransition

**Files:**
- Delete: `src/components/ProgressBar.jsx`
- Create: `src/components/ProgressBar.tsx`
- Delete: `src/components/PageTransition.jsx`
- Create: `src/components/PageTransition.tsx`

### Step 1: Write `src/components/ProgressBar.tsx`

```typescript
import { motion } from 'framer-motion'
import type { ProgressBarProps } from '../types'

export default function ProgressBar({ current, total, className = '' }: ProgressBarProps) {
  const percent = Math.round((current / total) * 100)

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="h-2 flex-1 overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-700" style={{ minWidth: 80 }}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="h-full rounded-full bg-zinc-900 dark:bg-white"
        />
      </div>
      <span className="text-xs font-semibold tabular-nums text-zinc-500 dark:text-zinc-400">
        {current}/{total}
      </span>
    </div>
  )
}
```

### Step 2: Write `src/components/PageTransition.tsx`

```typescript
import { type ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLocation } from 'react-router-dom'

interface PageTransitionProps {
  children: ReactNode
}

const variants = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
}

export default function PageTransition({ children }: PageTransitionProps) {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        variants={variants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
```

### Step 3: Delete old files and commit

```bash
rm src/components/ProgressBar.jsx src/components/PageTransition.jsx
git add src/components/ProgressBar.tsx src/components/PageTransition.tsx src/components/ProgressBar.jsx src/components/PageTransition.jsx
git commit -m "refactor: migrate ProgressBar and PageTransition to TypeScript"
```

---

## Task 9: Timeline Component — `src/components/Timeline.tsx`

**Files:**
- Delete: `src/components/Timeline.jsx`
- Create: `src/components/Timeline.tsx`

### Step 1: Write `src/components/Timeline.tsx`

```typescript
import { motion } from 'framer-motion'
import type { TColor, TimelineType, ColorMap } from '../types'

const colorMap: ColorMap = {
  blue: { bg: 'bg-blue-500', light: 'bg-blue-100 dark:bg-blue-900', text: 'text-blue-600 dark:text-blue-400' },
  orange: { bg: 'bg-orange-500', light: 'bg-orange-100 dark:bg-orange-900', text: 'text-orange-600 dark:text-orange-400' },
  purple: { bg: 'bg-purple-500', light: 'bg-purple-100 dark:bg-purple-900', text: 'text-purple-600 dark:text-purple-400' },
  green: { bg: 'bg-green-500', light: 'bg-green-100 dark:bg-green-900', text: 'text-green-600 dark:text-green-400' },
  red: { bg: 'bg-red-500', light: 'bg-red-100 dark:bg-red-900', text: 'text-red-600 dark:text-red-400' },
}

type PointType = 'past' | 'present' | 'future'

interface SimpleTimelineProps {
  color: TColor
  point: PointType
  label: [string, string]
}

function SimpleTimeline({ color, point, label }: SimpleTimelineProps) {
  const c = colorMap[color] || colorMap.blue
  return (
    <div className="flex items-center gap-3 py-4">
      <span className={`text-xs font-medium ${c.text}`}>{label[0]}</span>
      <div className="relative flex h-1 flex-1 rounded-full bg-zinc-200 dark:bg-zinc-700">
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className={`absolute inset-y-0 rounded-full ${c.bg}`}
          style={{
            left: point === 'past' ? '0%' : point === 'future' ? '66%' : '33%',
            width: '33%',
            transformOrigin: point === 'past' ? 'left' : point === 'future' ? 'right' : 'center',
          }}
        />
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className={`absolute top-1/2 h-3 w-3 -translate-y-1/2 rounded-full border-2 border-white dark:border-zinc-900 ${c.bg}`}
          style={{
            left: point === 'past' ? '16%' : point === 'future' ? '83%' : '50%',
          }}
        />
      </div>
      <span className={`text-xs font-medium ${c.text}`}>{label[1]}</span>
    </div>
  )
}

function ContinuousTimeline({ color, position }: { color: TColor; position: string }) {
  const c = colorMap[color] || colorMap.green
  const positionMap: Record<string, { left: string; width: string; label: string }> = {
    'continuous-present': { left: '33%', width: '33%', label: 'Present' },
    'continuous-past': { left: '0%', width: '33%', label: 'Past' },
    'continuous-future': { left: '66%', width: '33%', label: 'Future' },
  }
  const pos = positionMap[position] || positionMap['continuous-present']
  return (
    <div className="flex items-center gap-3 py-4">
      <span className={`text-xs font-medium ${c.text}`}>Past</span>
      <div className="relative flex h-1 flex-1 rounded-full bg-zinc-200 dark:bg-zinc-700">
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className={`h-full rounded-full ${c.bg}`}
          style={{ position: 'absolute', left: pos.left, width: pos.width }}
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 1, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
          className={`absolute top-1/2 h-2 w-2 -translate-y-1/2 rounded-full ${c.bg}`}
          style={{ left: `calc(${pos.left} + ${pos.width})`, marginLeft: '-4px' }}
        />
      </div>
      <span className={`text-xs font-medium ${c.text}`}>Future</span>
    </div>
  )
}

function PerfectTimeline({ color, position }: { color: TColor; position: string }) {
  const c = colorMap[color] || colorMap.red
  const positionMap: Record<string, { start: string; end: string }> = {
    'perfect-present': { start: '0%', end: '50%' },
    'perfect-past': { start: '0%', end: '16%' },
    'perfect-future': { start: '0%', end: '83%' },
  }
  const pos = positionMap[position] || positionMap['perfect-present']
  return (
    <div className="flex items-center gap-3 py-4">
      <span className={`text-xs font-medium ${c.text}`}>Past</span>
      <div className="relative flex h-1 flex-1 rounded-full bg-zinc-200 dark:bg-zinc-700">
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className={`absolute inset-y-0 rounded-full ${c.bg}`}
          style={{ left: pos.start, width: pos.end, transformOrigin: 'left' }}
        />
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
          className={`absolute top-1/2 h-3 w-3 -translate-y-1/2 rounded-full border-2 border-white dark:border-zinc-900 ${c.bg}`}
          style={{ left: pos.end, marginLeft: '-6px' }}
        />
      </div>
      <span className={`text-xs font-medium ${c.text}`}>Future</span>
    </div>
  )
}

function PerfectContinuousTimeline({ color, position }: { color: TColor; position: string }) {
  const c = colorMap[color] || colorMap.green
  const positionMap: Record<string, { start: string; width: string }> = {
    'perfect-continuous-present': { start: '0%', width: '50%' },
    'perfect-continuous-past': { start: '0%', width: '16%' },
    'perfect-continuous-future': { start: '0%', width: '83%' },
  }
  const pos = positionMap[position] || positionMap['perfect-continuous-present']
  return (
    <div className="flex items-center gap-3 py-4">
      <span className={`text-xs font-medium ${c.text}`}>Past</span>
      <div className="relative flex h-1 flex-1 rounded-full bg-zinc-200 dark:bg-zinc-700">
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className={`h-full rounded-full ${c.bg}`}
          style={{ position: 'absolute', left: pos.start, width: pos.width }}
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 1, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
          className={`absolute top-1/2 h-2 w-2 -translate-y-1/2 rounded-full ${c.bg}`}
          style={{ left: pos.width, marginLeft: '-4px' }}
        />
      </div>
      <span className={`text-xs font-medium ${c.text}`}>Future</span>
    </div>
  )
}

export default function Timeline({ type, color }: { type: TimelineType; color: TColor }) {
  if (type === 'present-center' || type === 'past-point' || type === 'future-point') {
    const labelMap: Record<string, [string, string]> = {
      'present-center': ['Past', 'Future'],
      'past-point': ['Past', 'Future'],
      'future-point': ['Past', 'Future'],
    }
    const pointMap: Record<string, PointType> = {
      'present-center': 'present',
      'past-point': 'past',
      'future-point': 'future',
    }
    return <SimpleTimeline color={color} point={pointMap[type]} label={labelMap[type]} />
  }
  if (type.startsWith('continuous-')) {
    return <ContinuousTimeline color={color} position={type} />
  }
  if (type.startsWith('perfect-continuous-')) {
    return <PerfectContinuousTimeline color={color} position={type} />
  }
  if (type.startsWith('perfect-')) {
    return <PerfectTimeline color={color} position={type} />
  }
  return <SimpleTimeline color="blue" point="present" label={['Past', 'Future']} />
}
```

### Step 2: Delete old file and commit

```bash
rm src/components/Timeline.jsx
git add src/components/Timeline.tsx src/components/Timeline.jsx
git commit -m "refactor: migrate Timeline component to TypeScript"
```

---

## Task 10: LessonCard Component — `src/components/LessonCard.tsx`

**Files:**
- Delete: `src/components/LessonCard.jsx`
- Create: `src/components/LessonCard.tsx`

### Step 1: Write `src/components/LessonCard.tsx`

```typescript
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import type { LessonCardProps, TColor } from '../types'

const bgColorMap: Record<TColor, string> = {
  blue: 'bg-blue-500',
  orange: 'bg-orange-500',
  purple: 'bg-purple-500',
  green: 'bg-green-500',
  red: 'bg-red-500',
}

const levelColors: string[] = [
  '',
  'bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300',
  'bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300',
  'bg-rose-100 text-rose-700 dark:bg-rose-900 dark:text-rose-300',
  'bg-violet-100 text-violet-700 dark:bg-violet-900 dark:text-violet-300',
]

export default function LessonCard({ lesson, completed, score, index }: LessonCardProps) {
  const { t } = useTranslation()
  const name = t(`lessons.${lesson.slug}.name`)
  const description = t(`lessons.${lesson.slug}.description`)
  const difficultyLabel = t(`difficulty.${lesson.difficulty}`)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -4 }}
      className="group relative overflow-hidden rounded-3xl border border-zinc-200 bg-white p-5 transition-colors hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700 sm:p-6"
    >
      {completed && (
        <div className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-600 dark:text-emerald-400"><polyline points="20 6 9 17 4 12"/></svg>
        </div>
      )}
      <div className="mb-3 flex items-center gap-3">
        <div className={`flex h-10 w-10 items-center justify-center rounded-2xl ${bgColorMap[lesson.color]}`}>
          <span className="text-sm font-bold text-white">{lesson.id}</span>
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="text-xs font-medium text-zinc-400 uppercase tracking-wide">
            {t('home.level')} {lesson.level}
          </span>
          <span className={`inline-flex w-fit rounded-lg px-2 py-0.5 text-[10px] font-semibold ${levelColors[lesson.level]}`}>
            {difficultyLabel}
          </span>
        </div>
      </div>
      <h3 className="mb-1 text-lg font-semibold text-zinc-900 dark:text-white">{name}</h3>
      <p className="mb-3 text-sm text-zinc-500 dark:text-zinc-400">
        {t(`lessons.${lesson.slug}.name`, { lng: 'en' })}
      </p>
      <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{description}</p>
      {score !== undefined && score !== null && (
        <div className="mt-4 flex items-center gap-2">
          <div className="flex-1">
            <div className="h-1.5 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${score}%` }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className={`h-full rounded-full ${bgColorMap[lesson.color]}`}
              />
            </div>
          </div>
          <span className="text-xs font-medium tabular-nums text-zinc-400">{score}%</span>
        </div>
      )}
    </motion.div>
  )
}
```

### Step 2: Delete old file and commit

```bash
rm src/components/LessonCard.jsx
git add src/components/LessonCard.tsx src/components/LessonCard.jsx
git commit -m "refactor: migrate LessonCard component to TypeScript"
```

---

## Task 11: QuizCard Component — `src/components/QuizCard.tsx`

**Files:**
- Delete: `src/components/QuizCard.jsx`
- Create: `src/components/QuizCard.tsx`

### Step 1: Write `src/components/QuizCard.tsx`

Same JSX as original. Only change: add type annotations to props and all `useState` calls.

```typescript
import { useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import type { QuizCardProps } from '../types'

export default function QuizCard({ quiz, onComplete }: QuizCardProps) {
  const { t } = useTranslation()
  const [current, setCurrent] = useState<number>(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [answered, setAnswered] = useState<boolean>(false)
  const [correct, setCorrect] = useState<number>(0)
  const [finished, setFinished] = useState<boolean>(false)

  const question = quiz[current]
  const total = quiz.length

  const handleSelect = (index: number) => {
    if (answered) return
    setSelected(index)
    setAnswered(true)
    if (index === question.answer) {
      setCorrect((c) => c + 1)
    }
  }

  const handleNext = () => {
    if (current + 1 < total) {
      setCurrent(current + 1)
      setSelected(null)
      setAnswered(false)
    } else {
      const finalCorrect = correct + (selected === question.answer ? 1 : 0)
      const percent = Math.round((finalCorrect / total) * 100)
      setFinished(true)
      onComplete?.(percent)
    }
  }

  // JSX identical to lines 38-155 of original QuizCard.jsx
  // ...
}
```

### Step 2: Delete old file and commit

```bash
rm src/components/QuizCard.jsx
git add src/components/QuizCard.tsx src/components/QuizCard.jsx
git commit -m "refactor: migrate QuizCard component to TypeScript"
```

---

## Task 12: DailyTenseHero Component — `src/components/DailyTenseHero.tsx`

**Files:**
- Delete: `src/components/DailyTenseHero.jsx`
- Create: `src/components/DailyTenseHero.tsx`

### Step 1: Write `src/components/DailyTenseHero.tsx`

Replace inline `seedFromDate` with import from `../utils/seeds`. Type all color maps.

```typescript
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { seedFromDate } from '../utils/seeds'
import type { DailyTenseHeroProps, TColor } from '../types'

const bgColorMap: Record<TColor, string> = {
  blue: 'bg-blue-500', orange: 'bg-orange-500', purple: 'bg-purple-500',
  green: 'bg-green-500', red: 'bg-red-500',
}

const borderColorMap: Record<TColor, string> = {
  blue: 'border-blue-200 dark:border-blue-800', orange: 'border-orange-200 dark:border-orange-800',
  purple: 'border-purple-200 dark:border-purple-800', green: 'border-green-200 dark:border-green-800',
  red: 'border-red-200 dark:border-red-800',
}

const lightColorMap: Record<TColor, string> = {
  blue: 'bg-blue-50 dark:bg-blue-950', orange: 'bg-orange-50 dark:bg-orange-950',
  purple: 'bg-purple-50 dark:bg-purple-950', green: 'bg-green-50 dark:bg-green-950',
  red: 'bg-red-50 dark:bg-red-950',
}

const textColorMap: Record<TColor, string> = {
  blue: 'text-blue-600 dark:text-blue-400', orange: 'text-orange-600 dark:text-orange-400',
  purple: 'text-purple-600 dark:text-purple-400', green: 'text-green-600 dark:text-green-400',
  red: 'text-red-600 dark:text-red-400',
}

const levelColors: string[] = [
  '', 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300',
  'bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300',
  'bg-rose-100 text-rose-700 dark:bg-rose-900 dark:text-rose-300',
  'bg-violet-100 text-violet-700 dark:bg-violet-900 dark:text-violet-300',
]

export default function DailyTenseHero({ lessons }: DailyTenseHeroProps) {
  const { t } = useTranslation()
  const dailyIndex = seedFromDate() % lessons.length
  const lesson = lessons[dailyIndex]
  const bg = bgColorMap[lesson.color]
  const levelBadge = levelColors[lesson.level]

  // JSX identical to original DailyTenseHero.jsx
  // ...
}
```

### Step 2: Delete old file and commit

```bash
rm src/components/DailyTenseHero.jsx
git add src/components/DailyTenseHero.tsx src/components/DailyTenseHero.jsx
git commit -m "refactor: migrate DailyTenseHero component to TypeScript"
```

---

## Task 13: IntroOverlay Component — `src/components/IntroOverlay.tsx`

**Files:**
- Delete: `src/components/IntroOverlay.jsx`
- Create: `src/components/IntroOverlay.tsx`

### Step 1: Write `src/components/IntroOverlay.tsx`

Replace inline `seedFromDate` with import. Add types to state and event handlers.

```typescript
import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { seedFromDate } from '../utils/seeds'
import type { IntroOverlayProps, TColor, ColorStyleBasic } from '../types'

const SLIDE_COUNT = 5

const colorStyles: Record<TColor, ColorStyleBasic> = {
  blue: { bg: 'bg-blue-500', light: 'bg-blue-50 dark:bg-blue-950', text: 'text-blue-600 dark:text-blue-400' },
  orange: { bg: 'bg-orange-500', light: 'bg-orange-50 dark:bg-orange-950', text: 'text-orange-600 dark:text-orange-400' },
  purple: { bg: 'bg-purple-500', light: 'bg-purple-50 dark:bg-purple-950', text: 'text-purple-600 dark:text-purple-400' },
  green: { bg: 'bg-green-500', light: 'bg-green-50 dark:bg-green-950', text: 'text-green-600 dark:text-green-400' },
  red: { bg: 'bg-red-500', light: 'bg-red-50 dark:bg-red-950', text: 'text-red-600 dark:text-red-400' },
}

export default function IntroOverlay({ lessons, onClose }: IntroOverlayProps) {
  const { t } = useTranslation()
  const [slide, setSlide] = useState<number>(0)
  const dailyIndex = seedFromDate() % lessons.length
  const dailyLesson = lessons[dailyIndex]

  const nextSlide = useCallback(() => {
    setSlide((s) => Math.min(s + 1, SLIDE_COUNT))
  }, [])
  const prevSlide = useCallback(() => {
    setSlide((s) => Math.max(s - 1, 0))
  }, [])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextSlide()
      if (e.key === 'ArrowLeft') prevSlide()
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [nextSlide, prevSlide, onClose])

  const c = colorStyles[dailyLesson.color] || colorStyles.blue
  const isIntroSlide = slide < SLIDE_COUNT

  // JSX identical to original IntroOverlay.jsx
  // ...
}
```

### Step 2: Delete old file and commit

```bash
rm src/components/IntroOverlay.jsx
git add src/components/IntroOverlay.tsx src/components/IntroOverlay.jsx
git commit -m "refactor: migrate IntroOverlay component to TypeScript"
```

---

## Task 14: Header Component — `src/components/Header.tsx`

**Files:**
- Delete: `src/components/Header.jsx`
- Create: `src/components/Header.tsx`

### Step 1: Write `src/components/Header.tsx`

Key changes: type `languages` array, `ref` as `useRef<HTMLDivElement>(null)`, `handleClick` event type.

```typescript
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useTheme from '../hooks/useTheme'
import useProgress from '../store/progress'
import ProgressBar from './ProgressBar'

interface Language {
  code: string
  labelKey: string
}

const languages: Language[] = [
  { code: 'en', labelKey: 'lang.en' },
  { code: 'zh', labelKey: 'lang.zh' },
  { code: 'ja', labelKey: 'lang.ja' },
]

export default function Header() {
  const { t, i18n } = useTranslation()
  const { theme, toggleTheme } = useTheme()
  const getOverallProgress = useProgress((s) => s.getOverallProgress)
  const [open, setOpen] = useState<boolean>(false)
  const ref = useRef<HTMLDivElement>(null)

  const currentLang = languages.find((l) => i18n.language?.startsWith(l.code)) || languages[0]

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const changeLanguage = (code: string) => {
    i18n.changeLanguage(code)
    setOpen(false)
  }

  // JSX identical to original Header.jsx
  // ...
}
```

### Step 2: Delete old file and commit

```bash
rm src/components/Header.jsx
git add src/components/Header.tsx src/components/Header.jsx
git commit -m "refactor: migrate Header component to TypeScript"
```

---

## Task 15: Home Page — `src/pages/Home.tsx`

**Files:**
- Delete: `src/pages/Home.jsx`
- Create: `src/pages/Home.tsx`

### Step 1: Write `src/pages/Home.tsx`

Type annotations on filter/map callbacks.

```typescript
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import lessons from '../data/lessons'
import useProgress from '../store/progress'
import LessonCard from '../components/LessonCard'
import ProgressBar from '../components/ProgressBar'
import DailyTenseHero from '../components/DailyTenseHero'
import type { Lesson } from '../types'

const levels = [1, 2, 3, 4]

export default function Home() {
  const { t } = useTranslation()
  const completedLessons = useProgress((s) => s.completedLessons)
  const quizScores = useProgress((s) => s.quizScores)
  const getOverallProgress = useProgress((s) => s.getOverallProgress)

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12">
      <DailyTenseHero lessons={lessons} />
      <div className="mb-8 sm:mb-12">
        <motion.h1 initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="mb-2 text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
          {t('app.title')}
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="text-zinc-500 dark:text-zinc-400">
          {t('app.subtitle')}
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mt-6 rounded-3xl border border-zinc-200 bg-zinc-50 p-5 dark:border-zinc-800 dark:bg-zinc-900 sm:p-6">
          <div className="flex items-end justify-between mb-3">
            <div>
              <span className="text-2xl font-extrabold tabular-nums text-zinc-900 dark:text-white">{getOverallProgress()}</span>
              <span className="text-sm text-zinc-400"> / 12</span>
              <span className="ml-2 text-sm font-medium text-zinc-500 dark:text-zinc-400">{t('home.lessonsCompleted')}</span>
            </div>
            <span className="text-sm font-semibold tabular-nums text-zinc-500 dark:text-zinc-400">{Math.round((getOverallProgress() / 12) * 100)}%</span>
          </div>
          <ProgressBar current={getOverallProgress()} total={12} />
        </motion.div>
      </div>

      {levels.map((level, lvlIndex) => {
        const levelLessons = lessons.filter((l: Lesson) => l.level === level)
        if (levelLessons.length === 0) return null
        return (
          <div key={level} className="mb-10">
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 + lvlIndex * 0.05 }} className="mb-4">
              <h2 className="text-lg font-bold text-zinc-900 dark:text-white">{t(`home.levelLabels.${level}`)}</h2>
              <p className="text-sm text-zinc-400">{t(`home.levelDescs.${level}`)}</p>
            </motion.div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {levelLessons.map((lesson: Lesson, index: number) => (
                <Link key={lesson.id} to={`/lesson/${lesson.slug}`} className="block focus:outline-none">
                  <LessonCard lesson={lesson} completed={completedLessons.includes(lesson.slug)} score={quizScores[lesson.slug]} index={lvlIndex * 3 + index} />
                </Link>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}
```

### Step 2: Delete old file and commit

```bash
rm src/pages/Home.jsx
git add src/pages/Home.tsx src/pages/Home.jsx
git commit -m "refactor: migrate Home page to TypeScript"
```

---

## Task 16: LessonDetail Page — `src/pages/LessonDetail.tsx`

**Files:**
- Delete: `src/pages/LessonDetail.jsx`
- Create: `src/pages/LessonDetail.tsx`

### Step 1: Write `src/pages/LessonDetail.tsx`

This is the most complex file. Key TS changes:
- `useParams` returns `string | undefined` — existing `if (!lesson)` guard handles both cases
- `t()` with `returnObjects: true` returns `unknown` → cast with `as string[] | undefined`
- Type `getExampleTranslation` params and return
- Type `colorStyles` as `ColorFullMap`

```typescript
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import lessons from '../data/lessons'
import useProgress from '../store/progress'
import useLocale from '../hooks/useLocale'
import Timeline from '../components/Timeline'
import QuizCard from '../components/QuizCard'
import type { Example, Locale, Mistake, ColorFullMap } from '../types'

const colorStyles: ColorFullMap = {
  blue: { bg: 'bg-blue-50 dark:bg-blue-950', text: 'text-blue-600 dark:text-blue-400', badge: 'bg-blue-500' },
  orange: { bg: 'bg-orange-50 dark:bg-orange-950', text: 'text-orange-600 dark:text-orange-400', badge: 'bg-orange-500' },
  purple: { bg: 'bg-purple-50 dark:bg-purple-950', text: 'text-purple-600 dark:text-purple-400', badge: 'bg-purple-500' },
  green: { bg: 'bg-green-50 dark:bg-green-950', text: 'text-green-600 dark:text-green-400', badge: 'bg-green-500' },
  red: { bg: 'bg-red-50 dark:bg-red-950', text: 'text-red-600 dark:text-red-400', badge: 'bg-red-500' },
}

function getExampleTranslation(ex: Example, locale: Locale): string {
  if (locale === 'zh') return ex.cn
  if (locale === 'ja') return ex.ja
  return ex.cn
}

interface FormulaItem {
  label: string
  value: string
  icon: string
}

export default function LessonDetail() {
  const { t } = useTranslation()
  const locale = useLocale()
  const { slug } = useParams<{ slug: string }>()
  const lesson = lessons.find((l) => l.slug === slug)
  const completeLesson = useProgress((s) => s.completeLesson)
  const setQuizScore = useProgress((s) => s.setQuizScore)
  const getLessonProgress = useProgress((s) => s.getLessonProgress)

  if (!lesson) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <p className="text-xl font-semibold text-zinc-500">{t('lesson.notFound')}</p>
          <Link to="/" className="mt-4 inline-block text-blue-500 hover:underline">
            {t('lesson.backToHome')}
          </Link>
        </div>
      </div>
    )
  }

  const c = colorStyles[lesson.color] || colorStyles.blue
  const isCompleted = getLessonProgress(lesson.slug)

  const handleQuizComplete = (score: number) => {
    setQuizScore(lesson.slug, score)
    completeLesson(lesson.slug)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const fadeUp = {
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
  }

  const usageItems = t(`lessons.${lesson.slug}.usage`, { returnObjects: true }) as string[] | undefined

  const formulaItems: FormulaItem[] = [
    { label: t('lesson.positive'), value: lesson.formula.positive, icon: '✓' },
    { label: t('lesson.negative'), value: lesson.formula.negative, icon: '✗' },
    { label: t('lesson.question'), value: lesson.formula.question, icon: '?' },
  ]

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
      <Link to="/" className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
        {t('lesson.backToLessons')}
      </Link>

      <motion.div {...fadeUp} transition={{ duration: 0.3 }}>
        <div className="mb-6 flex items-center gap-3">
          <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${c.badge}`}>
            <span className="text-lg font-bold text-white">{lesson.id}</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-extrabold text-zinc-900 dark:text-white">
                {t(`lessons.${lesson.slug}.name`)}
              </h1>
              {isCompleted && (
                <span className={`inline-flex items-center rounded-full ${c.bg} px-2.5 py-0.5 text-xs font-semibold ${c.text}`}>
                  {t('lesson.completed')}
                </span>
              )}
            </div>
            <p className="text-zinc-500 dark:text-zinc-400">
              {t(`lessons.${lesson.slug}.name`, { lng: 'en' })}
            </p>
          </div>
        </div>
      </motion.div>

      <motion.div {...fadeUp} transition={{ duration: 0.3, delay: 0.05 }} className="mb-8 rounded-3xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900 sm:p-6">
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-zinc-400">{t('lesson.timeline')}</h2>
        <Timeline type={lesson.timelineType} color={lesson.color} />
        <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">{t(`lessons.${lesson.slug}.description`)}</p>
      </motion.div>

      {usageItems && Array.isArray(usageItems) && usageItems.length > 0 && (
        <motion.div {...fadeUp} transition={{ duration: 0.3, delay: 0.1 }} className="mb-8 rounded-3xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900 sm:p-6">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-zinc-400">{t('lesson.usage')}</h2>
          <div className="grid gap-2 sm:grid-cols-2">
            {usageItems.map((u: string, i: number) => (
              <div key={i} className={`flex items-center gap-3 rounded-2xl p-3 ${c.bg}`}>
                <span className={`flex h-6 w-6 items-center justify-center rounded-lg text-xs font-bold ${c.text} bg-white/80 dark:bg-zinc-900/80`}>{i + 1}</span>
                <span className={`text-sm font-medium ${c.text}`}>{u}</span>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      <motion.div {...fadeUp} transition={{ duration: 0.3, delay: 0.15 }} className="mb-8 rounded-3xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900 sm:p-6">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-zinc-400">{t('lesson.grammarFormula')}</h2>
        <div className="space-y-3">
          {formulaItems.map((f: FormulaItem, i: number) => (
            <div key={i} className="flex items-center gap-3 rounded-2xl bg-zinc-50 p-4 dark:bg-zinc-800">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-zinc-200 text-xs font-bold text-zinc-600 dark:bg-zinc-700 dark:text-zinc-300">{f.icon}</span>
              <div>
                <span className="block text-xs font-medium text-zinc-400">{f.label}</span>
                <code className="text-sm font-semibold text-zinc-900 dark:text-white">{f.value}</code>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div {...fadeUp} transition={{ duration: 0.3, delay: 0.2 }} className="mb-8 rounded-3xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900 sm:p-6">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-zinc-400">{t('lesson.examples')}</h2>
        <div className="space-y-3">
          {lesson.examples.map((ex: Example, i: number) => (
            <div key={i} className="rounded-2xl bg-zinc-50 p-4 dark:bg-zinc-800">
              <p className="text-sm font-medium text-zinc-900 dark:text-white">{ex.en}</p>
              <p className="mt-1 text-xs text-zinc-400">{getExampleTranslation(ex, locale)}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {lesson.mistakes && lesson.mistakes.length > 0 && (
        <motion.div {...fadeUp} transition={{ duration: 0.3, delay: 0.25 }} className="mb-8 rounded-3xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900 sm:p-6">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-zinc-400">{t('lesson.commonMistakes')}</h2>
          <div className="space-y-3">
            {lesson.mistakes.map((m: Mistake, i: number) => (
              <div key={i} className="space-y-2">
                <div className="flex items-center gap-2 rounded-2xl bg-red-50 p-3 dark:bg-red-950">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-red-500"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                  <span className="text-sm line-through text-red-700 dark:text-red-300">{m.wrong}</span>
                </div>
                <div className="flex items-center gap-2 rounded-2xl bg-emerald-50 p-3 dark:bg-emerald-950">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-emerald-500"><polyline points="20 6 9 17 4 12"/></svg>
                  <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">{m.correct}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      <motion.div {...fadeUp} transition={{ duration: 0.3, delay: 0.3 }} className="mb-8">
        <h2 className="mb-4 text-xl font-bold text-zinc-900 dark:text-white">{t('lesson.quiz')}</h2>
        <QuizCard quiz={lesson.quiz} onComplete={handleQuizComplete} />
      </motion.div>
    </div>
  )
}
```

### Step 2: Delete old file and commit

```bash
rm src/pages/LessonDetail.jsx
git add src/pages/LessonDetail.tsx src/pages/LessonDetail.jsx
git commit -m "refactor: migrate LessonDetail page to TypeScript"
```

---

## Task 17: App Component — `src/App.tsx`

**Files:**
- Delete: `src/App.jsx`
- Create: `src/App.tsx`

### Step 1: Write `src/App.tsx`

```typescript
import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Header from './components/Header'
import PageTransition from './components/PageTransition'
import IntroOverlay from './components/IntroOverlay'
import Home from './pages/Home'
import LessonDetail from './pages/LessonDetail'
import lessons from './data/lessons'

function AppContent() {
  const [showIntro, setShowIntro] = useState<boolean>(false)
  const location = useLocation()

  useEffect(() => {
    const skipped = localStorage.getItem('english-tenses-intro-skipped')
    if (!skipped) {
      setShowIntro(true)
    }
  }, [])

  const closeIntro = () => {
    localStorage.setItem('english-tenses-intro-skipped', 'true')
    setShowIntro(false)
  }

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      {showIntro && <IntroOverlay lessons={lessons} onClose={closeIntro} />}
      <Header />
      <PageTransition key={location.pathname}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/lesson/:slug" element={<LessonDetail />} />
        </Routes>
      </PageTransition>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter basename="/english-tenses">
      <AppContent />
    </BrowserRouter>
  )
}
```

### Step 2: Delete old file and commit

```bash
rm src/App.jsx
git add src/App.tsx src/App.jsx
git commit -m "refactor: migrate App component to TypeScript"
```

---

## Task 18: Entry Point — `src/main.tsx`

**Files:**
- Delete: `src/main.jsx`
- Create: `src/main.tsx`

### Step 1: Write `src/main.tsx`

```typescript
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import './i18n/config'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
```

### Step 2: Delete old file and commit

```bash
rm src/main.jsx
git add src/main.tsx src/main.jsx
git commit -m "refactor: migrate entry point to TypeScript"
```

---

## Task 19: Vite Config — `vite.config.ts`

**Files:**
- Delete: `vite.config.js`
- Create: `vite.config.ts`

### Step 1: Write `vite.config.ts`

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/english-tenses/',
})
```

### Step 2: Delete old file and commit

```bash
rm vite.config.js
git add vite.config.ts vite.config.js
git commit -m "refactor: migrate Vite config to TypeScript"
```

---

## Task 20: Final Verification

### Step 1: Install dependencies

```bash
pnpm install
```

Expected: typescript installed, no errors.

### Step 2: Run TypeScript type check

```bash
pnpm exec tsc --noEmit
```

Expected: 0 errors with `strict: true`.

### Step 3: Run production build

```bash
pnpm build
```

Expected: Vite builds successfully, output to `dist/`.

### Step 4: Verify no JS/JSX files remain in src/

```bash
find src -name "*.js" -o -name "*.jsx"
```

Expected: no output.

### Step 5: Preview the build

```bash
pnpm preview
```

Visit `http://localhost:4173/english-tenses/` and spot-check:
- Home page loads with daily tense hero
- Intro overlay appears on first visit (clear localStorage to test)
- Language dropdown works with globe icon
- Lesson cards render with correct types
- Quiz interaction works correctly
- Timeline animations play
- Dark mode toggle works
- All 12 lesson detail pages render

### Step 6: Final commit

```bash
git add -A
git commit -m "chore: final TypeScript verification pass"
```

---

## Potential TS Pitfalls

1. **Zustand v5 `create` pattern**: Must use `create<T>()(config)` double-call, not `create<T>(config)`.
2. **`t()` with `returnObjects: true`**: Returns `unknown` by default. Cast with `as string[] | undefined`.
3. **`useParams`**: Returns `string | undefined`. Existing `if (!lesson)` guard already handles this.
4. **`useRef<HTMLDivElement>(null)`**: `ref.current` is `HTMLDivElement | null`. Use `ref.current &&` pattern (already done).
5. **`document.getElementById`**: Returns `HTMLElement | null` in strict mode. Use `!` assertion for `#root`.
6. **JSON imports**: Need `resolveJsonModule: true` in tsconfig (set in Task 1).
7. **`e.target as Node`**: Required in `contains()` call because `EventTarget` is not assignable to `Node`.
