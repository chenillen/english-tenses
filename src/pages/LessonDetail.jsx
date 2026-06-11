import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import lessons from '../data/lessons'
import useProgress from '../store/progress'
import Timeline from '../components/Timeline'
import QuizCard from '../components/QuizCard'

const colorStyles = {
  blue: { bg: 'bg-blue-50 dark:bg-blue-950', text: 'text-blue-600 dark:text-blue-400', badge: 'bg-blue-500' },
  orange: { bg: 'bg-orange-50 dark:bg-orange-950', text: 'text-orange-600 dark:text-orange-400', badge: 'bg-orange-500' },
  purple: { bg: 'bg-purple-50 dark:bg-purple-950', text: 'text-purple-600 dark:text-purple-400', badge: 'bg-purple-500' },
  green: { bg: 'bg-green-50 dark:bg-green-950', text: 'text-green-600 dark:text-green-400', badge: 'bg-green-500' },
  red: { bg: 'bg-red-50 dark:bg-red-950', text: 'text-red-600 dark:text-red-400', badge: 'bg-red-500' },
}

const categoryLabels = {
  present: 'Present',
  past: 'Past',
  future: 'Future',
}

export default function LessonDetail() {
  const { slug } = useParams()
  const lesson = lessons.find((l) => l.slug === slug)
  const completeLesson = useProgress((s) => s.completeLesson)
  const setQuizScore = useProgress((s) => s.setQuizScore)
  const getLessonProgress = useProgress((s) => s.getLessonProgress)

  if (!lesson) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <p className="text-xl font-semibold text-zinc-500">Lesson not found</p>
          <Link to="/" className="mt-4 inline-block text-blue-500 hover:underline">
            Back to Home
          </Link>
        </div>
      </div>
    )
  }

  const c = colorStyles[lesson.color] || colorStyles.blue
  const isCompleted = getLessonProgress(lesson.slug)

  const handleQuizComplete = (score) => {
    setQuizScore(lesson.slug, score)
    completeLesson(lesson.slug)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const fadeUp = {
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
      <Link
        to="/"
        className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
        Back to lessons
      </Link>

      <motion.div {...fadeUp} transition={{ duration: 0.3 }}>
        <div className="mb-6 flex items-center gap-3">
          <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${c.badge}`}>
            <span className="text-lg font-bold text-white">{lesson.id}</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-extrabold text-zinc-900 dark:text-white">
                {lesson.name}
              </h1>
              {isCompleted && (
                <span className={`inline-flex items-center rounded-full ${c.bg} px-2.5 py-0.5 text-xs font-semibold ${c.text}`}>
                  Completed
                </span>
              )}
            </div>
            <p className="text-zinc-500 dark:text-zinc-400">{lesson.chineseName}</p>
          </div>
        </div>
      </motion.div>

      <motion.div
        {...fadeUp}
        transition={{ duration: 0.3, delay: 0.05 }}
        className="mb-8 rounded-3xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900 sm:p-6"
      >
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-zinc-400">Timeline</h2>
        <Timeline type={lesson.timelineType} color={lesson.color} />
        <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">{lesson.description}</p>
      </motion.div>

      <motion.div
        {...fadeUp}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="mb-8 rounded-3xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900 sm:p-6"
      >
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-zinc-400">Usage</h2>
        <div className="grid gap-2 sm:grid-cols-2">
          {lesson.usage.map((u, i) => (
            <div
              key={i}
              className={`flex items-center gap-3 rounded-2xl p-3 ${c.bg}`}
            >
              <span className={`flex h-6 w-6 items-center justify-center rounded-lg text-xs font-bold ${c.text} bg-white/80 dark:bg-zinc-900/80`}>
                {i + 1}
              </span>
              <span className={`text-sm font-medium ${c.text}`}>{u}</span>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        {...fadeUp}
        transition={{ duration: 0.3, delay: 0.15 }}
        className="mb-8 rounded-3xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900 sm:p-6"
      >
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-zinc-400">Grammar Formula</h2>
        <div className="space-y-3">
          {[
            { label: 'Positive', value: lesson.formula.positive, icon: '✓' },
            { label: 'Negative', value: lesson.formula.negative, icon: '✗' },
            { label: 'Question', value: lesson.formula.question, icon: '?' },
          ].map((f, i) => (
            <div
              key={i}
              className="flex items-center gap-3 rounded-2xl bg-zinc-50 p-4 dark:bg-zinc-800"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-zinc-200 text-xs font-bold text-zinc-600 dark:bg-zinc-700 dark:text-zinc-300">
                {f.icon}
              </span>
              <div>
                <span className="block text-xs font-medium text-zinc-400">{f.label}</span>
                <code className="text-sm font-semibold text-zinc-900 dark:text-white">{f.value}</code>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        {...fadeUp}
        transition={{ duration: 0.3, delay: 0.2 }}
        className="mb-8 rounded-3xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900 sm:p-6"
      >
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-zinc-400">Examples</h2>
        <div className="space-y-3">
          {lesson.examples.map((ex, i) => (
            <div
              key={i}
              className="rounded-2xl bg-zinc-50 p-4 dark:bg-zinc-800"
            >
              <p className="text-sm font-medium text-zinc-900 dark:text-white">{ex.en}</p>
              <p className="mt-1 text-xs text-zinc-400">{ex.cn}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {lesson.mistakes && lesson.mistakes.length > 0 && (
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.3, delay: 0.25 }}
          className="mb-8 rounded-3xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900 sm:p-6"
        >
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-zinc-400">Common Mistakes</h2>
          <div className="space-y-3">
            {lesson.mistakes.map((m, i) => (
              <div key={i} className="space-y-2">
                <div className="flex items-center gap-2 rounded-2xl bg-red-50 p-3 dark:bg-red-950">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-red-500"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                  <span className="text-sm line-through text-red-700 dark:text-red-300">{m.wrong}</span>
                </div>
                <div className="flex items-center gap-2 rounded-2xl bg-emerald-50 p-3 dark:bg-emerald-950">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-emerald-500"><polyline points="20 6 9 17 4 12"/></svg>
                  <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">{m.correct}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      <motion.div
        {...fadeUp}
        transition={{ duration: 0.3, delay: 0.3 }}
        className="mb-8"
      >
        <h2 className="mb-4 text-xl font-bold text-zinc-900 dark:text-white">Quiz</h2>
        <QuizCard quiz={lesson.quiz} onComplete={handleQuizComplete} />
      </motion.div>
    </div>
  )
}
