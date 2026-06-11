import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

const bgColorMap = {
  blue: 'bg-blue-500',
  orange: 'bg-orange-500',
  purple: 'bg-purple-500',
  green: 'bg-green-500',
  red: 'bg-red-500',
}

const levelColors = [
  '',
  'bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300',
  'bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300',
  'bg-rose-100 text-rose-700 dark:bg-rose-900 dark:text-rose-300',
  'bg-violet-100 text-violet-700 dark:bg-violet-900 dark:text-violet-300',
]

export default function LessonCard({ lesson, completed, score, index }) {
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

      <h3 className="mb-1 text-lg font-semibold text-zinc-900 dark:text-white">
        {name}
      </h3>
      <p className="mb-3 text-sm text-zinc-500 dark:text-zinc-400">
        {t(`lessons.${lesson.slug}.name`, { lng: 'en' })}
      </p>
      <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
        {description}
      </p>

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
