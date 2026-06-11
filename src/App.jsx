
import { motion } from 'framer-motion'
import lessons from './data/lessons'

export default function App() {
  return (
    <main className="min-h-screen p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">English Tenses</h1>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {lessons.map((lesson) => (
            <motion.div
              key={lesson.id}
              whileHover={{ y: -4 }}
              className="rounded-2xl border p-5 shadow-sm"
            >
              <h2 className="text-xl font-semibold">{lesson.name}</h2>
              <p>{lesson.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  )
}
