import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { ProgressState } from '../types'

const useProgress = create<ProgressState>()(
  persist(
    (set, get) => ({
      completedLessons: [],
      quizScores: {},

      completeLesson: (slug: string) =>
        set((state) => ({
          completedLessons: state.completedLessons.includes(slug)
            ? state.completedLessons
            : [...state.completedLessons, slug],
        })),

      setQuizScore: (slug: string, score: number) =>
        set((state) => ({
          quizScores: { ...state.quizScores, [slug]: score },
        })),

      getLessonProgress: (slug: string) => {
        const state = get()
        return state.completedLessons.includes(slug)
      },

      getOverallProgress: () => {
        const state = get()
        return state.completedLessons.length
      },

      resetProgress: () =>
        set({ completedLessons: [], quizScores: {} }),
    }),
    {
      name: 'english-tenses-progress',
    }
  )
)

export default useProgress
