import { useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Check, X } from '@phosphor-icons/react'
import type { QuizCardProps } from '../types'

export default function QuizCard({ quiz, onComplete }: QuizCardProps) {
  const { t } = useTranslation()
  const [current, setCurrent] = useState<number>(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [answered, setAnswered] = useState<boolean>(false)
  const [correct, setCorrect] = useState<number>(0)
  const [finished, setFinished] = useState<boolean>(false)

  const question = quiz[current]
  const total = quiz.length

  const handleSelect = (index: number) => {
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
      const finalCorrect = correct + (selected === question.answer ? 1 : 0)
      const percent = Math.round((finalCorrect / total) * 100)
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
        className="rounded-xl border border-border bg-surface p-8 text-center dark:border-[#2A2A2A] dark:bg-[#1A1A1A]"
      >
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-level-1 dark:bg-[#1A2A1A]">
          <Check weight="bold" size={32} className="text-level-1-text dark:text-level-1-text" />
        </div>
        <h3 className="mb-2 text-xl font-bold text-text-primary dark:text-[#EDEDED]">{t('quiz.complete')}</h3>
        <p className="mb-1 text-3xl font-extrabold tabular-nums text-text-primary dark:text-[#EDEDED]">{percent}%</p>
        <p className="text-sm text-text-secondary dark:text-[#9B9B9B]">
          {correct} {t('quiz.of')} {total} {t('quiz.correct')}
        </p>
      </motion.div>
    )
  }

  return (
    <div className="rounded-xl border border-border bg-surface dark:border-[#2A2A2A] dark:bg-[#1A1A1A]">
      <div className="flex items-center justify-between border-b border-border px-6 py-4 dark:border-[#2A2A2A]">
        <span className="text-sm font-semibold text-text-primary dark:text-[#EDEDED]">
          {t('quiz.question')} {current + 1} {t('quiz.of')} {total}
        </span>
        <div className="flex gap-1">
          {Array.from({ length: total }).map((_, i) => (
            <div
              key={i}
              className={`h-1.5 w-6 rounded-full transition-colors ${
                i < current
                  ? 'bg-level-1-text'
                  : i === current
                    ? 'bg-text-primary dark:bg-[#EDEDED]'
                    : 'bg-progress-bg dark:bg-[#2A2A2A]'
              }`}
            />
          ))}
        </div>
      </div>

      <div className="p-6">
        <p className="mb-6 text-lg font-medium text-text-primary dark:text-[#EDEDED]">
          {question.question}
        </p>

        <div className="space-y-3">
          {question.options.map((option, index) => {
            const isSelected = selected === index
            const isCorrect = index === question.answer
            let bg = 'bg-surface-raised dark:bg-[#242424] hover:bg-surface-hover dark:hover:bg-[#333333]'
            let border = 'border-border dark:border-[#2A2A2A]'

            if (answered) {
              if (isCorrect) {
                bg = 'bg-level-1 dark:bg-[#1A2A1A]'
                border = 'border-level-1-text/30 dark:border-level-1-text/30'
              } else if (isSelected && !isCorrect) {
                bg = 'bg-perfect-bg dark:bg-[#3A1A1A]'
                border = 'border-perfect-text/30 dark:border-perfect-text/30'
              }
            }

            return (
              <button
                key={index}
                onClick={() => handleSelect(index)}
                disabled={answered}
                className={`flex w-full items-center gap-3 rounded-lg border p-4 text-left transition-all ${bg} ${border} ${
                  answered ? 'cursor-default' : 'cursor-pointer active:scale-[0.98]'
                }`}
              >
                <span className={`flex h-8 w-8 items-center justify-center rounded-md text-sm font-semibold ${
                  answered && isCorrect
                    ? 'bg-level-1-text text-white'
                    : answered && isSelected && !isCorrect
                      ? 'bg-perfect-text text-white'
                      : 'bg-progress-bg text-text-secondary dark:bg-[#2A2A2A] dark:text-[#9B9B9B]'
                }`}>
                  {String.fromCharCode(65 + index)}
                </span>
                <span className={`text-sm font-medium ${
                  answered && isCorrect
                    ? 'text-level-1-text dark:text-level-1-text'
                    : answered && isSelected && !isCorrect
                      ? 'text-perfect-text dark:text-perfect-text'
                      : 'text-text-primary dark:text-[#EDEDED]'
                }`}>
                  {option}
                </span>
                {answered && isCorrect && (
                  <Check weight="bold" size={20} className="ml-auto text-level-1-text dark:text-level-1-text" />
                )}
                {answered && isSelected && !isCorrect && (
                  <X weight="bold" size={20} className="ml-auto text-perfect-text dark:text-perfect-text" />
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
              className="mt-4 w-full rounded-md bg-text-primary py-3.5 text-sm font-semibold text-white transition-all hover:bg-[#333333] active:scale-[0.98] dark:bg-[#EDEDED] dark:text-text-primary dark:hover:bg-[#CCCCCC]"
            >
              {current + 1 < total ? t('quiz.nextQuestion') : t('quiz.finishQuiz')}
            </button>
          </motion.div>
        )}
      </div>
    </div>
  )
}
