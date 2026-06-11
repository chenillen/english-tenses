import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { ArrowRight } from '@phosphor-icons/react'
import { seedFromDate } from '../utils/seeds'
import { badgeColor, colorBasic, levelColors } from '../utils/colors'
import type { DailyTenseHeroProps, TColor } from '../types'

const borderColorMap: Record<TColor, string> = {
  blue: 'border-present-bg dark:border-[#1A3A4D]',
  orange: 'border-past-bg dark:border-[#3A2A1A]',
  purple: 'border-future-bg dark:border-[#2A2040]',
  green: 'border-continuous-bg dark:border-[#1A2A1A]',
  red: 'border-perfect-bg dark:border-[#3A1A1A]',
}

export default function DailyTenseHero({ lessons }: DailyTenseHeroProps) {
  const { t } = useTranslation()

  const dailyIndex = seedFromDate() % lessons.length
  const lesson = lessons[dailyIndex]

  const bg = badgeColor[lesson.color]
  const border = borderColorMap[lesson.color]
  const c = colorBasic[lesson.color]
  const levelBadge = levelColors[lesson.level]

  return (
    <motion.div
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-8 sm:mb-12"
    >
      <Link
        to={`/lesson/${lesson.slug}`}
        className="group block overflow-hidden rounded-xl border border-border bg-surface transition-all duration-200 hover:border-border-hover hover:shadow-[0_2px_12px_rgba(0,0,0,0.04)] dark:border-[#2A2A2A] dark:bg-[#1A1A1A] dark:hover:border-[#333333] dark:hover:shadow-[0_2px_12px_rgba(0,0,0,0.15)]"
      >
        <div className="flex flex-col lg:flex-row">
          <div className={`flex items-center justify-center p-8 lg:w-48 lg:shrink-0 ${bg}`}>
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="flex h-24 w-24 items-center justify-center rounded-xl bg-white/20"
            >
              <span className="text-4xl font-extrabold text-white">
                {String(lesson.id).padStart(2, '0')}
              </span>
            </motion.div>
          </div>

          <div className="flex flex-1 flex-col justify-center p-6 sm:p-8">
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold uppercase tracking-wider ${levelBadge}`}>
                {t('home.level')} {lesson.level}
              </span>
              <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold uppercase tracking-wider ${c.bg} ${c.text}`}>
                {t(`difficulty.${lesson.difficulty}`)}
              </span>
              <span className="text-xs font-medium uppercase tracking-wider text-text-muted dark:text-[#777777]">
                {t('hero.todayTense')}
              </span>
            </div>

            <h2 className="mb-2 font-heading text-2xl font-extrabold tracking-tight text-text-primary transition-colors group-hover:text-text-secondary dark:text-[#EDEDED] dark:group-hover:text-[#CCCCCC] sm:text-3xl">
              {t(`lessons.${lesson.slug}.name`)}
            </h2>

            <p className="mb-5 max-w-lg text-sm leading-relaxed text-text-secondary dark:text-[#9B9B9B]">
              {t(`lessons.${lesson.slug}.description`)}
            </p>

            <span
              className={`inline-flex w-fit items-center gap-2 rounded-md px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:opacity-90 ${bg}`}
            >
              {t('hero.startLearning')}
              <ArrowRight weight="bold" size={16} />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
