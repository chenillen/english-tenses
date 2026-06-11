import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { CaretLeft, Check, X } from '@phosphor-icons/react'
import lessons from '../data/lessons'
import useProgress from '../store/progress'
import useLocale from '../hooks/useLocale'
import { useSpeech } from '../hooks/useSpeech'
import Timeline from '../components/Timeline'
import QuizCard from '../components/QuizCard'
import { colorFull } from '../utils/colors'
import type { Example, TrickyExample, Locale, Mistake } from '../types'

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

function SpeakerButton({
  text,
  speakingText,
  ttsSupported,
  onClick,
}: {
  text: string
  speakingText: string | null
  ttsSupported: boolean
  onClick: () => void
}) {
  if (!ttsSupported) return null

  const isActive = speakingText === text

  return (
    <button
      type="button"
      onClick={onClick}
      className={`ml-2 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md transition-colors ${
        isActive
          ? 'bg-present text-white'
          : 'bg-progress-bg text-text-muted hover:bg-present-bg hover:text-present-text dark:bg-[#2A2A2A] dark:text-[#777777] dark:hover:bg-[#1A3A4D] dark:hover:text-[#5BA4CF]'
      }`}
      aria-label={isActive ? 'Stop reading' : 'Read aloud'}
      title={isActive ? 'Stop reading' : 'Listen'}
    >
      {isActive ? (
        <span className="flex gap-0.5">
          <span className="h-2.5 w-0.5 animate-bounce rounded-full bg-white [animation-delay:0ms]" />
          <span className="h-2.5 w-0.5 animate-bounce rounded-full bg-white [animation-delay:150ms]" />
          <span className="h-2.5 w-0.5 animate-bounce rounded-full bg-white [animation-delay:300ms]" />
        </span>
      ) : (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
        </svg>
      )}
    </button>
  )
}

export default function LessonDetail() {
  const { t } = useTranslation()
  const locale = useLocale()
  const { slug } = useParams<{ slug: string }>()
  const lesson = lessons.find((l) => l.slug === slug)
  const completeLesson = useProgress((s) => s.completeLesson)
  const setQuizScore = useProgress((s) => s.setQuizScore)
  const getLessonProgress = useProgress((s) => s.getLessonProgress)
  const { speak, stop, speakingText, supported: ttsSupported } = useSpeech()

  if (!lesson) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <p className="text-xl font-semibold text-text-secondary dark:text-[#9B9B9B]">{t('lesson.notFound')}</p>
          <Link to="/" className="mt-4 inline-block text-present-text hover:underline">
            {t('lesson.backToHome')}
          </Link>
        </div>
      </div>
    )
  }

  const c = colorFull[lesson.color] || colorFull.blue
  const isCompleted = getLessonProgress(lesson.slug)

  const handleQuizComplete = (score: number) => {
    setQuizScore(lesson.slug, score)
    completeLesson(lesson.slug)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handlePlayExample = (text: string) => {
    if (speakingText === text) {
      stop()
    } else {
      speak(text)
    }
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
      <Link
        to="/"
        className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-text-secondary transition-colors hover:text-text-primary dark:text-[#9B9B9B] dark:hover:text-[#EDEDED]"
      >
        <CaretLeft weight="bold" size={16} />
        {t('lesson.backToLessons')}
      </Link>

      <motion.div {...fadeUp} transition={{ duration: 0.3 }}>
        <div className="mb-6 flex items-center gap-3">
          <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${c.badge}`}>
            <span className="text-lg font-bold text-white">{lesson.id}</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-heading text-2xl font-extrabold tracking-tight text-text-primary dark:text-[#EDEDED]">
                {t(`lessons.${lesson.slug}.name`)}
              </h1>
              {isCompleted && (
                <span className={`inline-flex items-center rounded-full ${c.bg} px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider ${c.text}`}>
                  {t('lesson.completed')}
                </span>
              )}
            </div>
            <p className="text-sm text-text-tertiary dark:text-[#777777]">
              {t(`lessons.${lesson.slug}.name`, { lng: 'en' })}
            </p>
          </div>
        </div>
      </motion.div>

      <motion.div
        {...fadeUp}
        transition={{ duration: 0.3, delay: 0.05 }}
        className="mb-8 rounded-xl border border-border bg-surface p-5 dark:border-[#2A2A2A] dark:bg-[#1A1A1A] sm:p-6"
      >
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-text-muted dark:text-[#777777]">{t('lesson.timeline')}</h2>
        <Timeline type={lesson.timelineType} color={lesson.color} />
        <p className="mt-2 text-sm text-text-secondary dark:text-[#9B9B9B]">
          {t(`lessons.${lesson.slug}.description`)}
        </p>
      </motion.div>

      {usageItems && Array.isArray(usageItems) && usageItems.length > 0 && (
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="mb-8 rounded-xl border border-border bg-surface p-5 dark:border-[#2A2A2A] dark:bg-[#1A1A1A] sm:p-6"
        >
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-text-muted dark:text-[#777777]">{t('lesson.usage')}</h2>
          <div className="grid gap-2 sm:grid-cols-2">
            {usageItems.map((u: string, i: number) => (
              <div
                key={i}
                className={`flex items-center gap-3 rounded-lg p-3 ${c.bg}`}
              >
                <span className={`flex h-6 w-6 items-center justify-center rounded-md text-xs font-bold ${c.text} bg-white/80 dark:bg-[#1A1A1A]/80`}>
                  {i + 1}
                </span>
                <span className={`text-sm font-medium ${c.text}`}>{u}</span>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      <motion.div
        {...fadeUp}
        transition={{ duration: 0.3, delay: 0.15 }}
        className="mb-8 rounded-xl border border-border bg-surface p-5 dark:border-[#2A2A2A] dark:bg-[#1A1A1A] sm:p-6"
      >
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-text-muted dark:text-[#777777]">{t('lesson.grammarFormula')}</h2>
        <div className="space-y-3">
          {formulaItems.map((f: FormulaItem, i: number) => (
            <div
              key={i}
              className="flex items-center gap-3 rounded-lg bg-surface-raised p-4 dark:bg-[#242424]"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-md bg-progress-bg text-xs font-bold text-text-secondary dark:bg-[#2A2A2A] dark:text-[#9B9B9B]">
                {f.icon}
              </span>
              <div>
                <span className="block text-xs font-medium text-text-muted dark:text-[#777777]">{f.label}</span>
                <code className="font-mono text-sm font-semibold text-text-primary dark:text-[#EDEDED]">{f.value}</code>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        {...fadeUp}
        transition={{ duration: 0.3, delay: 0.2 }}
        className="mb-8 rounded-xl border border-border bg-surface p-5 dark:border-[#2A2A2A] dark:bg-[#1A1A1A] sm:p-6"
      >
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-text-muted dark:text-[#777777]">{t('lesson.examples')}</h2>
        <div className="space-y-3">
          {lesson.examples.map((ex: Example, i: number) => (
            <div
              key={i}
              className="rounded-lg bg-surface-raised p-4 dark:bg-[#242424]"
            >
              <div className="flex items-start justify-between gap-2">
                <p className="text-sm font-medium text-text-primary dark:text-[#EDEDED]">{ex.en}</p>
                <SpeakerButton
                  text={ex.en}
                  speakingText={speakingText}
                  ttsSupported={ttsSupported}
                  onClick={() => handlePlayExample(ex.en)}
                />
              </div>
              <p className="mt-1 text-xs text-text-muted dark:text-[#777777]">{getExampleTranslation(ex, locale)}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {lesson.trickyExamples && lesson.trickyExamples.length > 0 && (
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.3, delay: 0.22 }}
          className="mb-8 rounded-xl border border-border bg-surface p-5 dark:border-[#2A2A2A] dark:bg-[#1A1A1A] sm:p-6"
        >
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-text-muted dark:text-[#777777]">{t('lesson.trickyExamples')}</h2>
          <div className="space-y-3">
            {lesson.trickyExamples.map((ex: TrickyExample, i: number) => (
              <div
                key={i}
                className="rounded-lg bg-level-2 p-4 dark:bg-[#2A2418]"
              >
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-medium text-level-2-text dark:text-level-2-text">{ex.en}</p>
                  <SpeakerButton
                    text={ex.en}
                    speakingText={speakingText}
                    ttsSupported={ttsSupported}
                    onClick={() => handlePlayExample(ex.en)}
                  />
                </div>
                <p className="mt-1 text-xs text-level-2-text/70 dark:text-level-2-text/70">{getExampleTranslation(ex, locale)}</p>
                <p className="mt-2 rounded-md bg-[#956400]/10 px-3 py-1.5 text-xs leading-relaxed text-level-2-text dark:bg-[#956400]/20 dark:text-level-2-text">
                  {ex.explanation}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {lesson.mistakes && lesson.mistakes.length > 0 && (
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.3, delay: 0.25 }}
          className="mb-8 rounded-xl border border-border bg-surface p-5 dark:border-[#2A2A2A] dark:bg-[#1A1A1A] sm:p-6"
        >
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-text-muted dark:text-[#777777]">{t('lesson.commonMistakes')}</h2>
          <div className="space-y-3">
            {lesson.mistakes.map((m: Mistake, i: number) => (
              <div key={i} className="space-y-2">
                <div className="flex items-center gap-2 rounded-lg bg-perfect-bg p-3 dark:bg-[#3A1A1A]">
                  <X weight="bold" size={16} className="shrink-0 text-perfect-text dark:text-perfect-text" />
                  <span className="text-sm line-through text-perfect-text dark:text-perfect-text">{m.wrong}</span>
                </div>
                <div className="flex items-center gap-2 rounded-lg bg-level-1 p-3 dark:bg-[#1A2A1A]">
                  <Check weight="bold" size={16} className="shrink-0 text-level-1-text dark:text-level-1-text" />
                  <span className="text-sm font-medium text-level-1-text dark:text-level-1-text">{m.correct}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      <motion.div
        {...fadeUp}
        transition={{ duration: 0.3, delay: 0.3 }}
        className="mb-8"
      >
        <h2 className="mb-4 text-xl font-bold text-text-primary dark:text-[#EDEDED]">{t('lesson.quiz')}</h2>
        <QuizCard quiz={lesson.quiz} onComplete={handleQuizComplete} />
      </motion.div>
    </div>
  )
}
