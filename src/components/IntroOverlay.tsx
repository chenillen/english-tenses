import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { seedFromDate } from '../utils/seeds'
import { badgeColor, colorBasic } from '../utils/colors'
import type { IntroOverlayProps, TColor } from '../types'

const SLIDE_COUNT = 5

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

  const c = colorBasic[dailyLesson.color] || colorBasic.blue
  const bg = badgeColor[dailyLesson.color] || badgeColor.blue
  const isIntroSlide = slide < SLIDE_COUNT

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-canvas dark:bg-[#0D0D0D]"
      >
        {isIntroSlide ? (
          <div className="mx-auto flex w-full max-w-lg flex-col items-center px-6 py-8">
            <button
              onClick={onClose}
              className="mb-8 self-end text-sm font-medium text-text-muted transition-colors hover:text-text-secondary dark:text-[#777777] dark:hover:text-[#9B9B9B]"
            >
              {t('intro.skip')}
            </button>

            <div className="mb-12 flex gap-1.5">
              {Array.from({ length: SLIDE_COUNT }).map((_, i) => (
                <div
                  key={i}
                  className={`h-1 w-8 rounded-full transition-all duration-300 ${
                    i === slide
                      ? 'bg-text-primary dark:bg-[#EDEDED]'
                      : i < slide
                        ? 'bg-text-tertiary dark:bg-[#555555]'
                        : 'bg-progress-bg dark:bg-[#2A2A2A]'
                  }`}
                />
              ))}
            </div>

            <div className="mb-6 text-center">
              <p className="mb-1 text-xs font-medium uppercase tracking-wider text-text-muted dark:text-[#777777]">
                {t('intro.subtitle')}
              </p>
              <h1 className="font-heading text-2xl font-extrabold tracking-tight text-text-primary dark:text-[#EDEDED]">
                {t(`intro.slides.${slide + 1}.title`)}
              </h1>
            </div>

            <motion.div
              key={slide}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-12 text-center"
            >
              <p className="text-lg leading-relaxed text-text-secondary dark:text-[#9B9B9B]">
                {t(`intro.slides.${slide + 1}.body`)}
              </p>
            </motion.div>

            <div className="flex w-full items-center justify-between">
              <button
                onClick={prevSlide}
                disabled={slide === 0}
                className="rounded-lg px-4 py-2.5 text-sm font-medium text-text-muted transition-colors hover:text-text-secondary disabled:opacity-0 dark:text-[#777777] dark:hover:text-[#9B9B9B]"
              >
                {t('intro.prev')}
              </button>

              <button
                onClick={nextSlide}
                className="rounded-md bg-text-primary px-6 py-2.5 text-sm font-semibold text-white transition-all hover:bg-[#333333] active:scale-[0.98] dark:bg-[#EDEDED] dark:text-text-primary dark:hover:bg-[#CCCCCC]"
              >
                {slide === SLIDE_COUNT - 1 ? t('intro.start') : t('intro.next')}
              </button>
            </div>
          </div>
        ) : (
          <div className="mx-auto flex w-full max-w-lg flex-col items-center px-6 py-8">
            <span className="mb-6 text-xs font-medium uppercase tracking-wider text-text-muted dark:text-[#777777]">
              {t('hero.todayTense')}
            </span>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-8 w-full"
            >
              <Link
                to={`/lesson/${dailyLesson.slug}`}
                className="block rounded-xl border border-border bg-surface p-8 text-center transition-all duration-200 hover:border-border-hover hover:shadow-[0_2px_12px_rgba(0,0,0,0.04)] dark:border-[#2A2A2A] dark:bg-[#1A1A1A] dark:hover:border-[#333333] dark:hover:shadow-[0_2px_12px_rgba(0,0,0,0.15)]"
              >
                <div className={`mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-lg ${bg}`}>
                  <span className="text-2xl font-bold text-white">{dailyLesson.id}</span>
                </div>
                <h2 className="mb-2 font-heading text-2xl font-extrabold tracking-tight text-text-primary dark:text-[#EDEDED]">
                  {t(`lessons.${dailyLesson.slug}.name`)}
                </h2>
                <p className="text-sm text-text-secondary dark:text-[#9B9B9B]">
                  {t(`lessons.${dailyLesson.slug}.description`)}
                </p>
              </Link>
            </motion.div>

            <div className="flex w-full flex-col gap-3">
              <button
                onClick={onClose}
                className="w-full rounded-md bg-text-primary py-3.5 text-sm font-semibold text-white transition-all hover:bg-[#333333] active:scale-[0.98] dark:bg-[#EDEDED] dark:text-text-primary dark:hover:bg-[#CCCCCC]"
              >
                {t('hero.startLearning')}
              </button>
              <button
                onClick={onClose}
                className="text-sm font-medium text-text-muted transition-colors hover:text-text-secondary dark:text-[#777777] dark:hover:text-[#9B9B9B]"
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
