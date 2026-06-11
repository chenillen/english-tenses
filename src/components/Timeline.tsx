import { motion } from 'framer-motion'
import { badgeColor, colorBasic } from '../utils/colors'
import type { TColor, TimelineType } from '../types'

type PointType = 'past' | 'present' | 'future'

interface SimpleTimelineProps {
  color: TColor
  point: PointType
  label: [string, string]
}

function SimpleTimeline({ color, point, label }: SimpleTimelineProps) {
  const c = colorBasic[color] || colorBasic.blue
  const dotBg = badgeColor[color] || badgeColor.blue

  return (
    <div className="flex items-center gap-3 py-4">
      <span className={`text-xs font-medium ${c.text}`}>{label[0]}</span>
      <div className="relative flex h-1 flex-1 rounded-full bg-progress-bg dark:bg-[#2A2A2A]">
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className={`absolute inset-y-0 rounded-full ${dotBg}`}
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
          className={`absolute top-1/2 h-3 w-3 -translate-y-1/2 rounded-full border-2 border-white dark:border-[#1A1A1A] ${dotBg}`}
          style={{
            left: point === 'past' ? '16%' : point === 'future' ? '83%' : '50%',
          }}
        />
      </div>
      <span className={`text-xs font-medium ${c.text}`}>{label[1]}</span>
    </div>
  )
}

interface ContinuousTimelineProps {
  color: TColor
  position: string
}

function ContinuousTimeline({ color, position }: ContinuousTimelineProps) {
  const c = colorBasic[color] || colorBasic.green
  const dotBg = badgeColor[color] || badgeColor.green

  const positionMap: Record<string, { left: string; width: string }> = {
    'continuous-present': { left: '33%', width: '33%' },
    'continuous-past': { left: '0%', width: '33%' },
    'continuous-future': { left: '66%', width: '33%' },
  }

  const pos = positionMap[position] || positionMap['continuous-present']

  return (
    <div className="flex items-center gap-3 py-4">
      <span className={`text-xs font-medium ${c.text}`}>Past</span>
      <div className="relative flex h-1 flex-1 rounded-full bg-progress-bg dark:bg-[#2A2A2A]">
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className={`h-full rounded-full ${dotBg}`}
          style={{ position: 'absolute', left: pos.left, width: pos.width }}
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 1, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
          className={`absolute top-1/2 h-2 w-2 -translate-y-1/2 rounded-full ${dotBg}`}
          style={{ left: `calc(${pos.left} + ${pos.width})`, marginLeft: '-4px' }}
        />
      </div>
      <span className={`text-xs font-medium ${c.text}`}>Future</span>
    </div>
  )
}

interface PerfectTimelineProps {
  color: TColor
  position: string
}

function PerfectTimeline({ color, position }: PerfectTimelineProps) {
  const c = colorBasic[color] || colorBasic.red
  const dotBg = badgeColor[color] || badgeColor.red

  const positionMap: Record<string, { start: string; end: string }> = {
    'perfect-present': { start: '0%', end: '50%' },
    'perfect-past': { start: '0%', end: '16%' },
    'perfect-future': { start: '0%', end: '83%' },
  }

  const pos = positionMap[position] || positionMap['perfect-present']

  return (
    <div className="flex items-center gap-3 py-4">
      <span className={`text-xs font-medium ${c.text}`}>Past</span>
      <div className="relative flex h-1 flex-1 rounded-full bg-progress-bg dark:bg-[#2A2A2A]">
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className={`absolute inset-y-0 rounded-full ${dotBg}`}
          style={{ left: pos.start, width: pos.end, transformOrigin: 'left' }}
        />
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
          className={`absolute top-1/2 h-3 w-3 -translate-y-1/2 rounded-full border-2 border-white dark:border-[#1A1A1A] ${dotBg}`}
          style={{ left: pos.end, marginLeft: '-6px' }}
        />
      </div>
      <span className={`text-xs font-medium ${c.text}`}>Future</span>
    </div>
  )
}

interface PerfectContinuousTimelineProps {
  color: TColor
  position: string
}

function PerfectContinuousTimeline({ color, position }: PerfectContinuousTimelineProps) {
  const c = colorBasic[color] || colorBasic.green
  const dotBg = badgeColor[color] || badgeColor.green

  const positionMap: Record<string, { start: string; width: string }> = {
    'perfect-continuous-present': { start: '0%', width: '50%' },
    'perfect-continuous-past': { start: '0%', width: '16%' },
    'perfect-continuous-future': { start: '0%', width: '83%' },
  }

  const pos = positionMap[position] || positionMap['perfect-continuous-present']

  return (
    <div className="flex items-center gap-3 py-4">
      <span className={`text-xs font-medium ${c.text}`}>Past</span>
      <div className="relative flex h-1 flex-1 rounded-full bg-progress-bg dark:bg-[#2A2A2A]">
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className={`h-full rounded-full ${dotBg}`}
          style={{ position: 'absolute', left: pos.start, width: pos.width }}
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 1, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
          className={`absolute top-1/2 h-2 w-2 -translate-y-1/2 rounded-full ${dotBg}`}
          style={{ left: pos.width, marginLeft: '-4px' }}
        />
      </div>
      <span className={`text-xs font-medium ${c.text}`}>Future</span>
    </div>
  )
}

export default function Timeline({ type, color }: { type: TimelineType; color: TColor }) {
  if (type === 'present-center' || type === 'past-point' || type === 'future-point') {
    const pointMap: Record<string, PointType> = {
      'present-center': 'present',
      'past-point': 'past',
      'future-point': 'future',
    }
    return <SimpleTimeline color={color} point={pointMap[type]} label={['Past', 'Future']} />
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
