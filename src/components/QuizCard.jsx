import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function QuizCard({ quiz, onComplete }) {
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState(null)
  const [answered, setAnswered] = useState(false)
  const [correct, setCorrect] = useState(0)
  const [finished, setFinished] = useState(false)

  const question = quiz[current]
  const total = quiz.length

  const handleSelect = (index) => {
    if (answered) return
    setSelected(index)
    setAnswered(true)
    if (index === question.answer) {
      setCorrect((c) => c + 1)
    }
  }

  const handleNext = () => {
    if (current + 1 < total) {
      setCurrent(current + 1)
      setSelected(null)
      setAnswered(false)
    } else {
      const percent = Math.round(((correct + (selected === question.answer ? 1 : 0)) / total) * 100)
      setFinished(true)
      onComplete?.(percent)
    }
  }

  if (finished) {
    const percent = Math.round((correct / total) * 100)
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-3xl border border-zinc-200 bg-white p-8 text-center dark:border-zinc-800 dark:bg-zinc-900"
      >
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-600 dark:text-emerald-400"><polyline points="20 6 9 17 4 12"/></svg>
        </div>
        <h3 className="mb-2 text-xl font-bold text-zinc-900 dark:text-white">Quiz Complete!</h3>
        <p className="mb-1 text-3xl font-extrabold text-zinc-900 dark:text-white">{percent}%</p>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          {correct} of {total} correct
        </p>
      </motion.div>
    )
  }

  return (
    <div className="rounded-3xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
      <div className="flex items-center justify-between border-b border-zinc-100 px-6 py-4 dark:border-zinc-800">
        <span className="text-sm font-semibold text-zinc-900 dark:text-white">
          Question {current + 1} of {total}
        </span>
        <div className="flex gap-1">
          {Array.from({ length: total }).map((_, i) => (
            <div
              key={i}
              className={`h-1.5 w-6 rounded-full transition-colors ${
                i < current
                  ? 'bg-emerald-500'
                  : i === current
                    ? 'bg-zinc-900 dark:bg-white'
                    : 'bg-zinc-200 dark:bg-zinc-700'
              }`}
            />
          ))}
        </div>
      </div>

      <div className="p-6">
        <p className="mb-6 text-lg font-medium text-zinc-900 dark:text-white">
          {question.question}
        </p>

        <div className="space-y-3">
          {question.options.map((option, index) => {
            const isSelected = selected === index
            const isCorrect = index === question.answer
            let bg = 'bg-zinc-50 dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700'
            let border = 'border-zinc-200 dark:border-zinc-700'

            if (answered) {
              if (isCorrect) {
                bg = 'bg-emerald-50 dark:bg-emerald-950'
                border = 'border-emerald-300 dark:border-emerald-700'
              } else if (isSelected && !isCorrect) {
                bg = 'bg-red-50 dark:bg-red-950'
                border = 'border-red-300 dark:border-red-700'
              }
            }

            return (
              <button
                key={index}
                onClick={() => handleSelect(index)}
                disabled={answered}
                className={`flex w-full items-center gap-3 rounded-2xl border p-4 text-left transition-all ${bg} ${border} ${
                  answered ? 'cursor-default' : 'cursor-pointer active:scale-[0.98]'
                }`}
              >
                <span className={`flex h-8 w-8 items-center justify-center rounded-xl text-sm font-semibold ${
                  answered && isCorrect
                    ? 'bg-emerald-500 text-white'
                    : answered && isSelected && !isCorrect
                      ? 'bg-red-500 text-white'
                      : 'bg-zinc-200 text-zinc-600 dark:bg-zinc-700 dark:text-zinc-300'
                }`}>
                  {String.fromCharCode(65 + index)}
                </span>
                <span className={`text-sm font-medium ${
                  answered && isCorrect
                    ? 'text-emerald-700 dark:text-emerald-300'
                    : answered && isSelected && !isCorrect
                      ? 'text-red-700 dark:text-red-300'
                      : 'text-zinc-700 dark:text-zinc-300'
                }`}>
                  {option}
                </span>
                {answered && isCorrect && (
                  <svg className="ml-auto" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                )}
                {answered && isSelected && !isCorrect && (
                  <svg className="ml-auto" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                )}
              </button>
            )
          })}
        </div>

        {answered && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <button
              onClick={handleNext}
              className="mt-4 w-full rounded-2xl bg-zinc-900 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
            >
              {current + 1 < total ? 'Next Question' : 'Finish Quiz'}
            </button>
          </motion.div>
        )}
      </div>
    </div>
  )
}
