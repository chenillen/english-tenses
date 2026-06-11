import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Check } from '@phosphor-icons/react'
import { badgeColor, levelColors } from '../utils/colors'
import type { LessonCardProps } from '../types'

export default function LessonCard({ lesson, completed, score, index }: LessonCardProps) {
  const { t } = useTranslation()

  const name = t(`lessons.${lesson.slug}.name`)
  const description = t(`lessons.${lesson.slug}.description`)
  const difficultyLabel = t(`difficulty.${lesson.difficulty}`)
  const enName = t(`lessons.${lesson.slug}.name`, { lng: 'en' })

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -2, boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}
      className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-border bg-surface p-5 transition-all duration-200 hover:border-border-hover dark:border-[#2A2A2A] dark:bg-[#1A1A1A] dark:hover:border-[#333333] dark:hover:shadow-[0_2px_12px_rgba(0,0,0,0.15)] sm:p-6"
    >
      {completed && (
        <div className="absolute right-4 top-4 flex h-7 w-7 items-center justify-center rounded-full bg-level-1 dark:bg-[#1A2A1A]">
          <Check weight="bold" size={14} className="text-level-1-text dark:text-level-1-text" />
        </div>
      )}

      <div className="mb-3 flex items-center gap-3">
        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${badgeColor[lesson.color]}`}>
          <span className="text-sm font-bold text-white">{lesson.id}</span>
        </div>
        <div className="min-w-0 flex flex-col gap-0.5">
          <span className="truncate text-xs font-medium uppercase tracking-wider text-text-muted dark:text-[#777777]">
            {t('home.level')} {lesson.level}
          </span>
          <span className={`inline-flex w-fit rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${levelColors[lesson.level]}`}>
            {difficultyLabel}
          </span>
        </div>
      </div>

      <h3 className="mb-1 truncate text-lg font-semibold text-text-primary dark:text-[#EDEDED]">
        {name}
      </h3>
      <p className="mb-3 truncate text-sm text-text-tertiary dark:text-[#777777]">
        {enName}
      </p>
      <p className="flex-1 text-sm leading-relaxed text-text-secondary line-clamp-2 dark:text-[#9B9B9B]">
        {description}
      </p>

      <div className="mt-4 flex items-center gap-2">
        <div className="flex-1">
          <div className="h-1.5 overflow-hidden rounded-full bg-progress-bg dark:bg-[#2A2A2A]">
            {score !== undefined && score !== null ? (
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${score}%` }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className={`h-full rounded-full ${badgeColor[lesson.color]}`}
              />
            ) : null}
          </div>
        </div>
        <span className="w-8 text-right text-xs font-medium tabular-nums text-text-muted dark:text-[#777777]">
          {score !== undefined && score !== null ? `${score}%` : ''}
        </span>
      </div>
    </motion.div>
  )
}
