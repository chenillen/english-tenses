import { motion } from 'framer-motion'

export default function ProgressBar({ current, total, className = '' }) {
  const percent = Math.round((current / total) * 100)

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="h-2 flex-1 overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-700" style={{ minWidth: 80 }}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="h-full rounded-full bg-zinc-900 dark:bg-white"
        />
      </div>
      <span className="text-xs font-semibold tabular-nums text-zinc-500 dark:text-zinc-400">
        {current}/{total}
      </span>
    </div>
  )
}
