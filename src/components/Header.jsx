import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import useTheme from '../hooks/useTheme'
import useProgress from '../store/progress'
import ProgressBar from './ProgressBar'

const languages = [
  { code: 'en', label: 'EN', flag: '🇺🇸' },
  { code: 'zh', label: '中文', flag: '🇨🇳' },
  { code: 'ja', label: '日本語', flag: '🇯🇵' },
]

export default function Header() {
  const { t, i18n } = useTranslation()
  const { theme, toggleTheme } = useTheme()
  const getOverallProgress = useProgress((s) => s.getOverallProgress)

  const changeLanguage = (code) => {
    i18n.changeLanguage(code)
  }

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/80 backdrop-blur-xl dark:border-zinc-800 dark:bg-zinc-950/80">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 sm:px-6">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <span className="text-lg font-bold tracking-tight text-zinc-900 dark:text-white sm:text-xl">
            {t('app.title')}
          </span>
        </Link>

        <div className="flex items-center gap-2 sm:gap-3">
          <ProgressBar
            current={getOverallProgress()}
            total={12}
            className="hidden sm:flex"
          />

          <div className="flex items-center rounded-xl bg-zinc-100 p-0.5 dark:bg-zinc-800">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => changeLanguage(lang.code)}
                className={`rounded-lg px-2 py-1 text-xs font-medium transition-all sm:px-2.5 sm:text-sm ${
                  i18n.language?.startsWith(lang.code)
                    ? 'bg-white text-zinc-900 shadow-sm dark:bg-zinc-700 dark:text-white'
                    : 'text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200'
                }`}
                aria-label={`Switch language to ${lang.label}`}
              >
                <span className="hidden sm:inline">{lang.label}</span>
                <span className="sm:hidden">{lang.code.toUpperCase()}</span>
              </button>
            ))}
          </div>

          <button
            onClick={toggleTheme}
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-100 text-zinc-600 transition-colors hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700"
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
            )}
          </button>
        </div>
      </div>
    </header>
  )
}
