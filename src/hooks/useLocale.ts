import { useTranslation } from 'react-i18next'
import { useMemo } from 'react'
import type { Locale } from '../types'

const SUPPORTED_LOCALES: readonly Locale[] = ['en', 'zh', 'ja']

function isSupportedLocale(code: string): code is Locale {
  return (SUPPORTED_LOCALES as readonly string[]).includes(code)
}

export default function useLocale(): Locale {
  const { i18n } = useTranslation()
  return useMemo(() => {
    const base = i18n.language?.split('-')[0]
    return base && isSupportedLocale(base) ? base : 'en'
  }, [i18n.language])
}
