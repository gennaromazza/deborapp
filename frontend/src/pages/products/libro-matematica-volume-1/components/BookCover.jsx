import { motion } from 'framer-motion'
import { BookOpen, Check, Play, Star } from 'lucide-react'
import { characters } from '../data/chapters'

export default function BookCover({ product, chapters, progress, onSelectChapter }) {
  const totalBadges = chapters.filter((_, i) => (progress[i + 1] || []).length >= 10).length

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-pastel-pink via-pastel-lavender to-pastel-sky mb-6 shadow-lg">
          <BookOpen className="w-12 h-12 text-white" />
        </div>
        <h1 className="font-display text-3xl md:text-4xl font-extrabold text-gray-800 mb-3">
          {product.title}
        </h1>
        <p className="font-body text-lg text-gray-500 mb-4 max-w-xl mx-auto">
          {product.description}
        </p>
        {totalBadges > 0 && (
          <div className="inline-flex items-center gap-2 badge badge-pink">
            <Star className="w-4 h-4" />
            {totalBadges}/6 capitoli completati!
          </div>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-center mb-10"
      >
        <p className="font-body text-gray-500 text-sm mb-3">I tuoi compagni di avventura:</p>
        <div className="flex justify-center gap-3 flex-wrap">
          {characters.map((char, i) => (
            <motion.span
              key={i}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4 + i * 0.1, type: 'spring' }}
              className="px-3 py-1.5 bg-white rounded-full shadow-sm text-sm font-body font-medium text-gray-600"
            >
              {char}
            </motion.span>
          ))}
        </div>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {chapters.map((chapter, i) => {
          const chapterPages = progress[chapter.id] || []
          const isComplete = chapterPages.length >= 10
          const progressPercent = (chapterPages.length / 10) * 100

          return (
            <motion.button
              key={chapter.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.08 }}
              whileHover={{ scale: 1.03, y: -4 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onSelectChapter(chapter.id)}
              className={`card p-5 text-left relative overflow-hidden ${isComplete ? 'ring-2 ring-pastel-mint-dark' : ''}`}
            >
              <div
                className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-pastel-pink-dark to-pastel-lavender-dark transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />

              <div className="flex items-start gap-3">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 ${isComplete ? 'bg-pastel-mint' : 'bg-pastel-lavender'}`}>
                  {isComplete ? <Check className="w-6 h-6 text-pastel-mint-dark" /> : chapter.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-body font-semibold text-pastel-lavender-dark uppercase tracking-wide">
                      Capitolo {chapter.id}
                    </span>
                    {isComplete && (
                      <span className="badge badge-mint text-xs">
                        <Star className="w-3 h-3" />
                        Completato
                      </span>
                    )}
                  </div>
                  <h3 className="font-display font-bold text-gray-800 text-sm leading-tight">
                    {chapter.title}
                  </h3>
                  <p className="font-body text-gray-400 text-xs mt-1">
                    {chapterPages.length}/10 pagine
                  </p>
                </div>
                <Play className="w-5 h-5 text-pastel-pink-dark flex-shrink-0 mt-1" />
              </div>
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}
