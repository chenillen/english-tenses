import { useTranslation } from 'react-i18next'
import { useMemo } from 'react'

export default function useLocale() {
  const { i18n } = useTranslation()
  return useMemo(() => i18n.language?.split('-')[0] || 'en', [i18n.language])
}
