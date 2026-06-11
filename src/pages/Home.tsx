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
        <motion.h1
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-2 font-heading text-3xl font-extrabold tracking-tight text-text-primary dark:text-[#EDEDED] sm:text-4xl"
        >
          {t('app.title')}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="text-sm leading-relaxed text-text-secondary dark:text-[#9B9B9B]"
        >
          {t('app.subtitle')}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-6 rounded-xl border border-border bg-surface-raised p-5 dark:border-[#2A2A2A] dark:bg-[#242424] sm:p-6"
        >
          <div className="flex items-end justify-between mb-3">
            <div>
              <span className="text-2xl font-extrabold tabular-nums text-text-primary dark:text-[#EDEDED]">
                {getOverallProgress()}
              </span>
              <span className="text-sm text-text-muted dark:text-[#777777]"> / 12</span>
              <span className="ml-2 text-sm font-medium text-text-tertiary dark:text-[#777777]">
                {t('home.lessonsCompleted')}
              </span>
            </div>
            <span className="text-sm font-semibold tabular-nums text-text-tertiary dark:text-[#777777]">
              {Math.round((getOverallProgress() / 12) * 100)}%
            </span>
          </div>
          <ProgressBar current={getOverallProgress()} total={12} />
        </motion.div>
      </div>

      {levels.map((level, lvlIndex) => {
        const levelLessons = lessons.filter((l: Lesson) => l.level === level)
        if (levelLessons.length === 0) return null

        return (
          <div key={level} className="mb-10">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 + lvlIndex * 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="mb-4"
            >
              <h2 className="text-lg font-bold text-text-primary dark:text-[#EDEDED]">
                {t(`home.levelLabels.${level}`)}
              </h2>
              <p className="text-sm text-text-muted dark:text-[#777777]">{t(`home.levelDescs.${level}`)}</p>
            </motion.div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {levelLessons.map((lesson: Lesson, index: number) => (
                <Link
                  key={lesson.id}
                  to={`/lesson/${lesson.slug}`}
                  className="block h-full focus:outline-none"
                >
                  <LessonCard
                    lesson={lesson}
                    completed={completedLessons.includes(lesson.slug)}
                    score={quizScores[lesson.slug]}
                    index={lvlIndex * 3 + index}
                  />
                </Link>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}
