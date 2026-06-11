import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

const SLIDE_COUNT = 5

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

export default function IntroOverlay({ lessons, onClose }) {
  const { t } = useTranslation()
  const [slide, setSlide] = useState(0)

  const dailyIndex = seedFromDate() % lessons.length
  const dailyLesson = lessons[dailyIndex]

  const nextSlide = useCallback(() => {
    setSlide((s) => Math.min(s + 1, SLIDE_COUNT))
  }, [])

  const prevSlide = useCallback(() => {
    setSlide((s) => Math.max(s - 1, 0))
  }, [])

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'ArrowRight') nextSlide()
      if (e.key === 'ArrowLeft') prevSlide()
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [nextSlide, prevSlide, onClose])

  const colorStyles = {
    blue: { bg: 'bg-blue-500', light: 'bg-blue-50 dark:bg-blue-950', text: 'text-blue-600 dark:text-blue-400' },
    orange: { bg: 'bg-orange-500', light: 'bg-orange-50 dark:bg-orange-950', text: 'text-orange-600 dark:text-orange-400' },
    purple: { bg: 'bg-purple-500', light: 'bg-purple-50 dark:bg-purple-950', text: 'text-purple-600 dark:text-purple-400' },
    green: { bg: 'bg-green-500', light: 'bg-green-50 dark:bg-green-950', text: 'text-green-600 dark:text-green-400' },
    red: { bg: 'bg-red-500', light: 'bg-red-50 dark:bg-red-950', text: 'text-red-600 dark:text-red-400' },
  }

  const c = colorStyles[dailyLesson.color] || colorStyles.blue
  const isIntroSlide = slide < SLIDE_COUNT

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-white dark:bg-zinc-950"
      >
        {isIntroSlide ? (
          <div className="mx-auto flex w-full max-w-lg flex-col items-center px-6 py-8">
            <button
              onClick={onClose}
              className="mb-8 self-end text-sm font-medium text-zinc-400 transition-colors hover:text-zinc-600 dark:hover:text-zinc-300"
            >
              {t('intro.skip')}
            </button>

            <div className="mb-12 flex gap-1.5">
              {Array.from({ length: SLIDE_COUNT }).map((_, i) => (
                <div
                  key={i}
                  className={`h-1 w-8 rounded-full transition-all duration-300 ${
                    i === slide
                      ? 'bg-zinc-900 dark:bg-white'
                      : i < slide
                        ? 'bg-zinc-300 dark:bg-zinc-600'
                        : 'bg-zinc-200 dark:bg-zinc-700'
                  }`}
                />
              ))}
            </div>

            <div className="mb-6 text-center">
              <p className="mb-1 text-xs font-medium uppercase tracking-wider text-zinc-400">
                {t('intro.subtitle')}
              </p>
              <h1 className="text-2xl font-extrabold text-zinc-900 dark:text-white">
                {t(`intro.slides.${slide + 1}.title`)}
              </h1>
            </div>

            <motion.div
              key={slide}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-12 text-center"
            >
              <p className="text-lg leading-relaxed text-zinc-600 dark:text-zinc-300">
                {t(`intro.slides.${slide + 1}.body`)}
              </p>
            </motion.div>

            <div className="flex w-full items-center justify-between">
              <button
                onClick={prevSlide}
                disabled={slide === 0}
                className="rounded-2xl px-4 py-2.5 text-sm font-medium text-zinc-400 transition-colors hover:text-zinc-600 disabled:opacity-0 dark:hover:text-zinc-300"
              >
                {t('intro.prev')}
              </button>

              <button
                onClick={slide === SLIDE_COUNT - 1 ? nextSlide : nextSlide}
                className="rounded-2xl bg-zinc-900 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
              >
                {slide === SLIDE_COUNT - 1 ? t('intro.start') : t('intro.next')}
              </button>
            </div>
          </div>
        ) : (
          <div className="mx-auto flex w-full max-w-lg flex-col items-center px-6 py-8">
            <span className="mb-6 text-xs font-medium uppercase tracking-wider text-zinc-400">
              {t('hero.todayTense')}
            </span>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-8 w-full"
            >
              <Link
                to={`/lesson/${dailyLesson.slug}`}
                className="block rounded-3xl border border-zinc-200 bg-white p-8 text-center transition-colors hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700"
              >
                <div className={`mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl ${c.bg}`}>
                  <span className="text-2xl font-bold text-white">{dailyLesson.id}</span>
                </div>
                <h2 className="mb-2 text-2xl font-extrabold text-zinc-900 dark:text-white">
                  {t(`lessons.${dailyLesson.slug}.name`)}
                </h2>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  {t(`lessons.${dailyLesson.slug}.description`)}
                </p>
              </Link>
            </motion.div>

            <div className="flex w-full flex-col gap-3">
              <button
                onClick={onClose}
                className="w-full rounded-2xl bg-zinc-900 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
              >
                {t('hero.startLearning')}
              </button>
              <button
                onClick={onClose}
                className="text-sm font-medium text-zinc-400 transition-colors hover:text-zinc-600 dark:hover:text-zinc-300"
              >
                {t('intro.skip')}
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  )
}
