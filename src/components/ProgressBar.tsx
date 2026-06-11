import { motion } from 'framer-motion'
import type { ProgressBarProps } from '../types'

export default function ProgressBar({ current, total, className = '' }: ProgressBarProps) {
  const percent = Math.round((current / total) * 100)

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="h-2 flex-1 overflow-hidden rounded-full bg-progress-bg dark:bg-[#2A2A2A]" style={{ minWidth: 80 }}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="h-full rounded-full bg-text-primary dark:bg-[#EDEDED]"
        />
      </div>
      <span className="text-xs font-semibold tabular-nums text-text-tertiary dark:text-[#777777]">
        {current}/{total}
      </span>
    </div>
  )
}
