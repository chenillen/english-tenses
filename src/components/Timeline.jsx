import { motion } from 'framer-motion'

const colorMap = {
  blue: { bg: 'bg-blue-500', light: 'bg-blue-100 dark:bg-blue-900', text: 'text-blue-600 dark:text-blue-400' },
  orange: { bg: 'bg-orange-500', light: 'bg-orange-100 dark:bg-orange-900', text: 'text-orange-600 dark:text-orange-400' },
  purple: { bg: 'bg-purple-500', light: 'bg-purple-100 dark:bg-purple-900', text: 'text-purple-600 dark:text-purple-400' },
  green: { bg: 'bg-green-500', light: 'bg-green-100 dark:bg-green-900', text: 'text-green-600 dark:text-green-400' },
  red: { bg: 'bg-red-500', light: 'bg-red-100 dark:bg-red-900', text: 'text-red-600 dark:text-red-400' },
}

function SimpleTimeline({ color, point, label }) {
  const c = colorMap[color] || colorMap.blue

  return (
    <div className="flex items-center gap-3 py-4">
      <span className={`text-xs font-medium ${c.text}`}>{label[0]}</span>
      <div className="relative flex h-1 flex-1 rounded-full bg-zinc-200 dark:bg-zinc-700">
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className={`absolute inset-y-0 rounded-full ${c.bg}`}
          style={{
            left: point === 'past' ? '0%' : point === 'future' ? '66%' : '33%',
            width: '33%',
            transformOrigin: point === 'past' ? 'left' : point === 'future' ? 'right' : 'center',
          }}
        />
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className={`absolute top-1/2 h-3 w-3 -translate-y-1/2 rounded-full border-2 border-white dark:border-zinc-900 ${c.bg}`}
          style={{
            left: point === 'past' ? '16%' : point === 'future' ? '83%' : '50%',
          }}
        />
      </div>
      <span className={`text-xs font-medium ${c.text}`}>{label[1]}</span>
    </div>
  )
}

function ContinuousTimeline({ color, position }) {
  const c = colorMap[color] || colorMap.green

  const positionMap = {
    'continuous-present': { left: '33%', width: '33%', label: 'Present' },
    'continuous-past': { left: '0%', width: '33%', label: 'Past' },
    'continuous-future': { left: '66%', width: '33%', label: 'Future' },
  }

  const pos = positionMap[position] || positionMap['continuous-present']

  return (
    <div className="flex items-center gap-3 py-4">
      <span className={`text-xs font-medium ${c.text}`}>Past</span>
      <div className="relative flex h-1 flex-1 rounded-full bg-zinc-200 dark:bg-zinc-700">
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className={`h-full rounded-full ${c.bg}`}
          style={{
            position: 'absolute',
            left: pos.left,
            width: pos.width,
          }}
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 1, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
          className={`absolute top-1/2 h-2 w-2 -translate-y-1/2 rounded-full ${c.bg}`}
          style={{
            left: `calc(${pos.left} + ${pos.width})`,
            marginLeft: '-4px',
          }}
        />
      </div>
      <span className={`text-xs font-medium ${c.text}`}>Future</span>
    </div>
  )
}

function PerfectTimeline({ color, position }) {
  const c = colorMap[color] || colorMap.red

  const positionMap = {
    'perfect-present': { start: '0%', end: '50%' },
    'perfect-past': { start: '0%', end: '16%' },
    'perfect-future': { start: '0%', end: '83%' },
  }

  const pos = positionMap[position] || positionMap['perfect-present']

  return (
    <div className="flex items-center gap-3 py-4">
      <span className={`text-xs font-medium ${c.text}`}>Past</span>
      <div className="relative flex h-1 flex-1 rounded-full bg-zinc-200 dark:bg-zinc-700">
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className={`absolute inset-y-0 rounded-full ${c.bg}`}
          style={{
            left: pos.start,
            width: pos.end,
            transformOrigin: 'left',
          }}
        />
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
          className={`absolute top-1/2 h-3 w-3 -translate-y-1/2 rounded-full border-2 border-white dark:border-zinc-900 ${c.bg}`}
          style={{ left: pos.end, marginLeft: '-6px' }}
        />
      </div>
      <span className={`text-xs font-medium ${c.text}`}>Future</span>
    </div>
  )
}

function PerfectContinuousTimeline({ color, position }) {
  const c = colorMap[color] || colorMap.green

  const positionMap = {
    'perfect-continuous-present': { start: '0%', width: '50%' },
    'perfect-continuous-past': { start: '0%', width: '16%' },
    'perfect-continuous-future': { start: '0%', width: '83%' },
  }

  const pos = positionMap[position] || positionMap['perfect-continuous-present']

  return (
    <div className="flex items-center gap-3 py-4">
      <span className={`text-xs font-medium ${c.text}`}>Past</span>
      <div className="relative flex h-1 flex-1 rounded-full bg-zinc-200 dark:bg-zinc-700">
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className={`h-full rounded-full ${c.bg}`}
          style={{
            position: 'absolute',
            left: pos.start,
            width: pos.width,
          }}
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 1, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
          className={`absolute top-1/2 h-2 w-2 -translate-y-1/2 rounded-full ${c.bg}`}
          style={{
            left: pos.width,
            marginLeft: '-4px',
          }}
        />
      </div>
      <span className={`text-xs font-medium ${c.text}`}>Future</span>
    </div>
  )
}

export default function Timeline({ type, color }) {
  if (type === 'present-center' || type === 'past-point' || type === 'future-point') {
    const labelMap = {
      'present-center': ['Past', 'Future'],
      'past-point': ['Past', 'Future'],
      'future-point': ['Past', 'Future'],
    }
    const pointMap = { 'present-center': 'present', 'past-point': 'past', 'future-point': 'future' }
    return <SimpleTimeline color={color} point={pointMap[type]} label={labelMap[type]} />
  }

  if (type.startsWith('continuous-')) {
    return <ContinuousTimeline color={color} position={type} />
  }

  if (type.startsWith('perfect-continuous-')) {
    return <PerfectContinuousTimeline color={color} position={type} />
  }

  if (type.startsWith('perfect-')) {
    return <PerfectTimeline color={color} position={type} />
  }

  return <SimpleTimeline color="blue" point="present" label={['Past', 'Future']} />
}
