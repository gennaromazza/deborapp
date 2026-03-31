import { motion } from 'framer-motion'
import { BookOpen, Check, Play, Star, Zap, Award, Trophy } from 'lucide-react'
import { characters } from '../data/chapters'
import { useGame } from '../../../../context/GameContext'

export default function BookCover({ product, chapters, progress, chapterBadges = [], onSelectChapter }) {
  const { xp, level, coins, getCurrentLevel, streak, BADGES } = useGame()
  const currentLevel = getCurrentLevel()
  const totalBadges = chapterBadges.length + Object.keys(BADGES).length
  const totalCompleted = Object.values(progress).flat().length
  const totalPages = chapters.length * 10

  return (
    <div>
      {/* Game Stats Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 mb-8 shadow-sm border border-pastel-lavender/20"
      >
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pastel-yellow to-pastel-peach flex items-center justify-center shadow-md">
                <span className="text-2xl">{currentLevel.emoji}</span>
              </div>
              <div>
                <p className="font-display font-bold text-gray-800 text-sm">{currentLevel.title}</p>
                <p className="font-body text-xs text-gray-500">Livello {level + 1}</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-pastel-yellow/50 rounded-full">
              <Zap className="w-4 h-4 text-pastel-yellow-dark" />
              <span className="font-display font-bold text-pastel-yellow-dark">{xp} XP</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-pastel-peach/50 rounded-full">
              <span className="text-lg">🪙</span>
              <span className="font-display font-bold text-gray-800">{coins}</span>
            </div>
            {streak > 0 && (
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-pastel-pink/50 rounded-full">
                <span className="text-lg">🔥</span>
                <span className="font-display font-bold text-gray-800">{streak}</span>
              </div>
            )}
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-4">
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>Progresso totale</span>
            <span>{totalCompleted}/{totalPages} pagine</span>
          </div>
          <div className="h-2 bg-pastel-lavender rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-pastel-pink-dark to-pastel-lavender-dark"
              initial={{ width: 0 }}
              animate={{ width: `${(totalCompleted / totalPages) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
      </motion.div>

      {/* Book Title */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-pastel-pink via-pastel-lavender to-pastel-sky mb-4 shadow-lg">
          <BookOpen className="w-12 h-12 text-white" />
        </div>
        <h1 className="font-display text-3xl md:text-4xl font-extrabold text-gray-800 mb-2">
          {product.title}
        </h1>
        <p className="font-body text-lg text-gray-500 mb-3 max-w-xl mx-auto">
          {product.description}
        </p>
        {(totalBadges > 0 || totalCompleted > 0) && (
          <div className="inline-flex items-center gap-2 flex-wrap justify-center">
            {totalCompleted > 0 && (
              <span className="badge badge-lavender">
                <Star className="w-3.5 h-3.5" />
                {totalCompleted} pagine
              </span>
            )}
            {chapterBadges.length > 0 && (
              <span className="badge badge-pink">
                <Award className="w-3.5 h-3.5" />
                {chapterBadges.length}/6 capitoli
              </span>
            )}
          </div>
        )}
      </motion.div>

      {/* Characters */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-center mb-8"
      >
        <p className="font-body text-gray-500 text-sm mb-3">I tuoi compagni di avventura:</p>
        <div className="flex justify-center gap-2 flex-wrap">
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

      {/* Chapters Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {chapters.map((chapter, i) => {
          const chapterPages = progress[chapter.id] || []
          const isComplete = chapterPages.length >= 10
          const isStarted = chapterPages.length > 0
          const progressPercent = (chapterPages.length / 10) * 100
          const hasBadge = chapterBadges.includes(chapter.id)

          return (
            <motion.button
              key={chapter.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.08 }}
              whileHover={{ scale: 1.03, y: -4 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onSelectChapter(chapter.id)}
              className={`card p-5 text-left relative overflow-hidden ${
                isComplete ? 'ring-2 ring-pastel-mint-dark' : isStarted ? 'ring-1 ring-pastel-yellow/50' : ''
              }`}
            >
              {/* Progress bar at bottom */}
              <div
                className="absolute bottom-0 left-0 h-1.5 bg-gradient-to-r from-pastel-pink-dark to-pastel-lavender-dark transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />

              <div className="flex items-start gap-3">
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 ${
                  isComplete 
                    ? 'bg-pastel-mint' 
                    : isStarted 
                    ? 'bg-pastel-yellow/30'
                    : 'bg-pastel-lavender'
                }`}>
                  {isComplete ? (
                    <Check className="w-7 h-7 text-pastel-mint-dark" />
                  ) : (
                    chapter.emoji
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-body font-semibold text-pastel-lavender-dark uppercase tracking-wide">
                      Capitolo {chapter.id}
                    </span>
                    {hasBadge && (
                      <span className="text-lg">🏆</span>
                    )}
                  </div>
                  <h3 className="font-display font-bold text-gray-800 text-sm leading-tight">
                    {chapter.title}
                  </h3>
                  <p className="font-body text-gray-400 text-xs mt-1">
                    {chapterPages.length}/10 pagine
                    {isStarted && !isComplete && ' • In corso'}
                  </p>
                </div>
                <Play className={`w-6 h-6 flex-shrink-0 mt-1 ${isComplete ? 'text-pastel-mint-dark' : 'text-pastel-pink-dark'}`} />
              </div>
            </motion.button>
          )
        })}
      </div>

      {/* Completion celebration */}
      {chapterBadges.length === 6 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-8 text-center p-8 bg-gradient-to-br from-pastel-yellow/30 to-pastel-peach/30 rounded-3xl border-2 border-pastel-yellow"
        >
          <Trophy className="w-16 h-16 text-pastel-yellow-dark mx-auto mb-4" />
          <h3 className="font-display text-2xl font-bold text-gray-800 mb-2">
            🎉 Hai completato il libro!
          </h3>
          <p className="font-body text-gray-500">
            Sei un vero matemago! Scarica il tuo certificato.
          </p>
        </motion.div>
      )}
    </div>
  )
}