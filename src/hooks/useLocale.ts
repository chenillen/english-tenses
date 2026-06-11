import { useTranslation } from 'react-i18next'
import { useMemo } from 'react'
import type { Locale } from '../types'

export default function useLocale(): Locale {
  const { i18n } = useTranslation()
  return useMemo(() => (i18n.language?.split('-')[0] || 'en') as Locale, [i18n.language])
}
