import type { JSX } from 'react'
import type { TimelineType } from '../types'

const iconProps = {
  width: 20,
  height: 20,
  viewBox: '0 0 20 20',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

function SimplePresentIcon() {
  return (
    <svg {...iconProps}>
      <path d="M10 4a6 6 0 1 1-4.24 1.76" />
      <polyline points="6 1 6 4.5 9.5 4.5" />
    </svg>
  )
}

function SimplePastIcon() {
  return (
    <svg {...iconProps}>
      <line x1="4" y1="10" x2="16" y2="10" />
      <polyline points="8 6 4 10 8 14" />
    </svg>
  )
}

function SimpleFutureIcon() {
  return (
    <svg {...iconProps}>
      <line x1="4" y1="10" x2="16" y2="10" />
      <polyline points="12 6 16 10 12 14" />
    </svg>
  )
}

function PresentContinuousIcon() {
  return (
    <svg {...iconProps}>
      <circle cx="10" cy="10" r="2" fill="currentColor" stroke="none" />
      <circle cx="10" cy="10" r="5" opacity={0.5} />
      <circle cx="10" cy="10" r="8" opacity={0.25} />
    </svg>
  )
}

function PastContinuousIcon() {
  return (
    <svg {...iconProps}>
      <path d="M2 10 Q5 6 8 10 Q11 14 14 10 Q17 6 18 10" />
    </svg>
  )
}

function FutureContinuousIcon() {
  return (
    <svg {...iconProps}>
      <path d="M2 14 Q5 10 8 14 Q11 18 14 10 Q15 6 18 4" />
    </svg>
  )
}

function PresentPerfectIcon() {
  return (
    <svg {...iconProps}>
      <circle cx="10" cy="10" r="7" />
      <polyline points="7 10 9.5 12.5 13.5 7.5" />
    </svg>
  )
}

function PastPerfectIcon() {
  return (
    <svg {...iconProps}>
      <circle cx="8" cy="10" r="6" />
      <circle cx="12" cy="10" r="6" opacity={0.4} />
    </svg>
  )
}

function FuturePerfectIcon() {
  return (
    <svg {...iconProps}>
      <circle cx="10" cy="10" r="8" opacity={0.3} />
      <circle cx="10" cy="10" r="5" opacity={0.6} />
      <circle cx="10" cy="10" r="2" fill="currentColor" stroke="none" />
    </svg>
  )
}

function PresentPerfectContinuousIcon() {
  return (
    <svg {...iconProps}>
      <line x1="2" y1="10" x2="18" y2="10" opacity={0.3} />
      <circle cx="14" cy="10" r="2" fill="currentColor" stroke="none" />
      <path d="M2 10 Q6 7 10 10" />
    </svg>
  )
}

function PastPerfectContinuousIcon() {
  return (
    <svg {...iconProps}>
      <line x1="2" y1="10" x2="18" y2="10" opacity={0.3} />
      <circle cx="6" cy="10" r="2" fill="currentColor" stroke="none" />
      <path d="M6 10 Q10 7 14 10 Q16 11.5 18 10" />
    </svg>
  )
}

function FuturePerfectContinuousIcon() {
  return (
    <svg {...iconProps}>
      <line x1="2" y1="10" x2="18" y2="10" opacity={0.3} />
      <circle cx="16" cy="10" r="2" fill="currentColor" stroke="none" />
      <path d="M2 12 Q6 8 10 12 Q13 14.5 16 10" />
    </svg>
  )
}

const tenseIcons: Record<TimelineType, () => JSX.Element> = {
  'present-center': SimplePresentIcon,
  'past-point': SimplePastIcon,
  'future-point': SimpleFutureIcon,
  'continuous-present': PresentContinuousIcon,
  'continuous-past': PastContinuousIcon,
  'continuous-future': FutureContinuousIcon,
  'perfect-present': PresentPerfectIcon,
  'perfect-past': PastPerfectIcon,
  'perfect-future': FuturePerfectIcon,
  'perfect-continuous-present': PresentPerfectContinuousIcon,
  'perfect-continuous-past': PastPerfectContinuousIcon,
  'perfect-continuous-future': FuturePerfectContinuousIcon,
}

export default tenseIcons
