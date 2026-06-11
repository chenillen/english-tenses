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
