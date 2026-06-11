import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useProgress = create(
  persist(
    (set, get) => ({
      completedLessons: [],
      quizScores: {},

      completeLesson: (slug) =>
        set((state) => ({
          completedLessons: state.completedLessons.includes(slug)
            ? state.completedLessons
            : [...state.completedLessons, slug],
        })),

      setQuizScore: (slug, score) =>
        set((state) => ({
          quizScores: { ...state.quizScores, [slug]: score },
        })),

      getLessonProgress: (slug) => {
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
