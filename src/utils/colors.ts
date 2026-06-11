import type { TColor, ColorStyleBasic, ColorStyleFull } from '../types'

export const colorBasic: Record<TColor, ColorStyleBasic> = {
  blue: { bg: 'bg-present-bg dark:bg-[#0F2B3D]', light: 'bg-present-bg dark:bg-[#0F2B3D]', text: 'text-present-text dark:text-[#5BA4CF]' },
  orange: { bg: 'bg-past-bg dark:bg-[#2D1F12]', light: 'bg-past-bg dark:bg-[#2D1F12]', text: 'text-past-text dark:text-[#C8844A]' },
  purple: { bg: 'bg-future-bg dark:bg-[#1F1630]', light: 'bg-future-bg dark:bg-[#1F1630]', text: 'text-future-text dark:text-[#8B5FBF]' },
  green: { bg: 'bg-continuous-bg dark:bg-[#122114]', light: 'bg-continuous-bg dark:bg-[#122114]', text: 'text-continuous-text dark:text-[#5C8F5A]' },
  red: { bg: 'bg-perfect-bg dark:bg-[#2D1213]', light: 'bg-perfect-bg dark:bg-[#2D1213]', text: 'text-perfect-text dark:text-[#C45552]' },
}

export const colorFull: Record<TColor, ColorStyleFull> = {
  blue: { ...colorBasic.blue, badge: 'bg-present dark:bg-present' },
  orange: { ...colorBasic.orange, badge: 'bg-past dark:bg-past' },
  purple: { ...colorBasic.purple, badge: 'bg-future dark:bg-future' },
  green: { ...colorBasic.green, badge: 'bg-continuous dark:bg-continuous' },
  red: { ...colorBasic.red, badge: 'bg-perfect dark:bg-perfect' },
}

export const badgeColor: Record<TColor, string> = {
  blue: 'bg-present',
  orange: 'bg-past',
  purple: 'bg-future',
  green: 'bg-continuous',
  red: 'bg-perfect',
}

export const borderColorMap: Record<TColor, string> = {
  blue: 'border-present-bg dark:border-[#1A3A4D]',
  orange: 'border-past-bg dark:border-[#3A2A1A]',
  purple: 'border-future-bg dark:border-[#2A2040]',
  green: 'border-continuous-bg dark:border-[#1A2A1A]',
  red: 'border-perfect-bg dark:border-[#3A1A1A]',
}

export const levelColors: string[] = [
  '',
  'bg-level-1 dark:bg-[#1A2A1A] text-level-1-text dark:text-level-1-text',
  'bg-level-2 dark:bg-[#2A2418] text-level-2-text dark:text-level-2-text',
  'bg-level-3 dark:bg-[#2A1C14] text-level-3-text dark:text-level-3-text',
  'bg-level-4 dark:bg-[#221A30] text-level-4-text dark:text-level-4-text',
]
