import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Globe, CaretDown, Sun, Moon } from '@phosphor-icons/react'
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

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-surface/80 backdrop-blur-xl dark:border-[#2A2A2A] dark:bg-[#0D0D0D]/80">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 sm:px-6">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <span className="text-lg font-bold tracking-tight text-text-primary dark:text-[#EDEDED] sm:text-xl">
            {t('app.title')}
          </span>
        </Link>

        <div className="flex items-center gap-2 sm:gap-3">
          <ProgressBar
            current={getOverallProgress()}
            total={12}
            className="hidden sm:flex"
          />

          <div className="relative" ref={ref}>
            <button
              onClick={() => setOpen(!open)}
              className="flex items-center gap-1.5 rounded-md bg-surface-raised px-3 py-2 text-xs font-medium text-text-secondary transition-colors hover:bg-surface-hover dark:bg-[#1A1A1A] dark:text-[#9B9B9B] dark:hover:bg-[#242424] sm:text-sm"
              aria-label="Select language"
            >
              <Globe weight="bold" size={14} />
              <span>{t(currentLang.labelKey)}</span>
              <CaretDown weight="bold" size={12} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {open && (
                <motion.div
                  initial={{ opacity: 0, y: -4, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -4, scale: 0.96 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-full mt-1.5 w-44 overflow-hidden rounded-xl border border-border bg-surface py-1 shadow-[0_4px_16px_rgba(0,0,0,0.06)] dark:border-[#333333] dark:bg-[#1A1A1A] dark:shadow-[0_4px_16px_rgba(0,0,0,0.25)]"
                >
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => changeLanguage(lang.code)}
                      className={`flex w-full items-center gap-2.5 px-4 py-2.5 text-sm transition-colors ${
                        i18n.language?.startsWith(lang.code)
                          ? 'bg-surface-raised font-semibold text-text-primary dark:bg-[#242424] dark:text-[#EDEDED]'
                          : 'text-text-secondary hover:bg-surface-raised dark:text-[#9B9B9B] dark:hover:bg-[#242424]'
                      }`}
                    >
                      <span className="text-sm">
                        {lang.code === 'en' ? 'EN' : lang.code === 'zh' ? 'CN' : 'JA'}
                      </span>
                      <span>{t(lang.labelKey)}</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button
            onClick={toggleTheme}
            className="flex h-9 w-9 items-center justify-center rounded-md bg-surface-raised text-text-secondary transition-colors hover:bg-surface-hover dark:bg-[#1A1A1A] dark:text-[#9B9B9B] dark:hover:bg-[#242424]"
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? (
              <Sun weight="bold" size={18} />
            ) : (
              <Moon weight="bold" size={18} />
            )}
          </button>
        </div>
      </div>
    </header>
  )
}
