import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

function seedFromDate() {
  const today = new Date()
  const key = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`
  let hash = 0
  for (let i = 0; i < key.length; i++) {
    hash = ((hash << 5) - hash) + key.charCodeAt(i)
    hash |= 0
  }
  return Math.abs(hash)
}

const bgColorMap = {
  blue: 'bg-blue-500',
  orange: 'bg-orange-500',
  purple: 'bg-purple-500',
  green: 'bg-green-500',
  red: 'bg-red-500',
}

const borderColorMap = {
  blue: 'border-blue-200 dark:border-blue-800',
  orange: 'border-orange-200 dark:border-orange-800',
  purple: 'border-purple-200 dark:border-purple-800',
  green: 'border-green-200 dark:border-green-800',
  red: 'border-red-200 dark:border-red-800',
}

const lightColorMap = {
  blue: 'bg-blue-50 dark:bg-blue-950',
  orange: 'bg-orange-50 dark:bg-orange-950',
  purple: 'bg-purple-50 dark:bg-purple-950',
  green: 'bg-green-50 dark:bg-green-950',
  red: 'bg-red-50 dark:bg-red-950',
}

const textColorMap = {
  blue: 'text-blue-600 dark:text-blue-400',
  orange: 'text-orange-600 dark:text-orange-400',
  purple: 'text-purple-600 dark:text-purple-400',
  green: 'text-green-600 dark:text-green-400',
  red: 'text-red-600 dark:text-red-400',
}

const levelColors = [
  '',
  'bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300',
  'bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300',
  'bg-rose-100 text-rose-700 dark:bg-rose-900 dark:text-rose-300',
  'bg-violet-100 text-violet-700 dark:bg-violet-900 dark:text-violet-300',
]

export default function DailyTenseHero({ lessons }) {
  const { t } = useTranslation()

  const dailyIndex = seedFromDate() % lessons.length
  const lesson = lessons[dailyIndex]

  const bg = bgColorMap[lesson.color]
  const border = borderColorMap[lesson.color]
  const light = lightColorMap[lesson.color]
  const textCol = textColorMap[lesson.color]
  const levelBadge = levelColors[lesson.level]

  return (
    <motion.div
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-8 sm:mb-12"
    >
      <Link
        to={`/lesson/${lesson.slug}`}
        className="group block overflow-hidden rounded-3xl border border-zinc-200 bg-white transition-colors hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700"
      >
        <div className="flex flex-col lg:flex-row">
          <div className={`flex items-center justify-center p-8 lg:w-48 lg:shrink-0 ${bg}`}>
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="flex h-24 w-24 items-center justify-center rounded-3xl bg-white/20 backdrop-blur-sm"
            >
              <span className="text-4xl font-extrabold text-white drop-shadow-md">
                {String(lesson.id).padStart(2, '0')}
              </span>
            </motion.div>
          </div>

          <div className="flex flex-1 flex-col justify-center p-6 sm:p-8">
            <div className="mb-1 flex items-center gap-3">
              <span className={`inline-flex rounded-lg px-2.5 py-1 text-xs font-semibold ${levelBadge}`}>
                {t('home.level')} {lesson.level}
              </span>
              <span className={`inline-flex rounded-lg px-2.5 py-1 text-xs font-semibold ${light} ${textCol}`}>
                {t(`difficulty.${lesson.difficulty}`)}
              </span>
              <span className="text-xs font-medium uppercase tracking-wider text-zinc-400">
                {t('hero.todayTense')}
              </span>
            </div>

            <h2 className="mb-2 text-2xl font-extrabold text-zinc-900 transition-colors group-hover:text-zinc-700 dark:text-white dark:group-hover:text-zinc-300 sm:text-3xl">
              {t(`lessons.${lesson.slug}.name`)}
            </h2>

            <p className="mb-4 max-w-lg text-zinc-500 dark:text-zinc-400">
              {t(`lessons.${lesson.slug}.description`)}
            </p>

            <span
              className={`inline-flex w-fit items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition-colors ${bg} text-white group-hover:opacity-90`}
            >
              {t('hero.startLearning')}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
              </svg>
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
