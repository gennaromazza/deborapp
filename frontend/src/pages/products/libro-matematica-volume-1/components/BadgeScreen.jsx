import { motion, AnimatePresence } from 'framer-motion'
import { Star, Award, Trophy, Sparkles, Lock, CheckCircle2 } from 'lucide-react'
import { badgeData } from '../data/chapters'
import { BADGES } from '../../../../context/GameContext'

export default function BadgeScreen({ badges = [], gameBadges, onClose, chapterBadges = [] }) {
  const chaptersComplete = badges.length
  const allComplete = chaptersComplete === 6
  
  const gameBadgesList = Object.entries(BADGES).map(([key, data]) => ({
    key,
    ...data
  }))

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="sticky top-0 bg-white rounded-t-3xl p-6 pb-4 border-b border-pastel-lavender/20">
          <div className="flex items-center justify-between">
            <div className="text-center flex-1">
              {allComplete ? (
                <>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200 }}
                    className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-pastel-yellow to-pastel-peach mb-3"
                  >
                    <Trophy className="w-8 h-8 text-pastel-yellow-dark" />
                  </motion.div>
                  <h2 className="font-display text-xl font-bold text-gray-800">
                    Complimenti! 🎉
                  </h2>
                </>
              ) : (
                <>
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-pastel-lavender to-pastel-pink mb-3">
                    <Award className="w-8 h-8 text-pastel-lavender-dark" />
                  </div>
                  <h2 className="font-display text-xl font-bold text-gray-800">
                    I tuoi Traguardi
                  </h2>
                  <p className="font-body text-gray-500 text-sm mt-1">
                    {chaptersComplete}/6 capitoli + {gameBadgesList.filter(b => gameBadges?.includes(b.key)).length} traguardi speciali
                  </p>
                </>
              )}
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-pastel-lavender/50 rounded-full transition-colors"
            >
              <Sparkles className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>

        <div className="p-6 pt-0 space-y-6">
          {/* Chapter Badges */}
          <div>
            <h3 className="font-display font-bold text-gray-800 mb-3 flex items-center gap-2">
              <span className="text-lg">📖</span> Capitoli
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {Object.entries(badgeData).map(([id, badge]) => {
                const earned = badges.includes(parseInt(id))
                return (
                  <motion.div
                    key={id}
                    whileHover={earned ? { scale: 1.03 } : {}}
                    className={`p-3 rounded-xl text-center transition-all ${
                      earned
                        ? `bg-gradient-to-br ${badge.color} shadow-md`
                        : 'bg-gray-100 opacity-40'
                    }`}
                  >
                    <span className="text-2xl block mb-1">{earned ? badge.emoji : '🔒'}</span>
                    <p className={`font-display font-bold text-xs ${earned ? 'text-white' : 'text-gray-400'}`}>
                      Cap. {id}
                    </p>
                  </motion.div>
                )
              })}
            </div>
          </div>

          {/* Game Badges */}
          {gameBadgesList.length > 0 && (
            <div>
              <h3 className="font-display font-bold text-gray-800 mb-3 flex items-center gap-2">
                <span className="text-lg">⭐</span> Traguardi Speciali
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {gameBadgesList.map((badge) => {
                  const earned = gameBadges?.includes(badge.key)
                  return (
                    <motion.div
                      key={badge.key}
                      whileHover={earned ? { scale: 1.03 } : {}}
                      className={`p-3 rounded-xl text-center transition-all ${
                        earned
                          ? 'bg-gradient-to-br from-pastel-yellow/50 to-pastel-peach/50 border-2 border-pastel-yellow'
                          : 'bg-gray-100 opacity-40'
                      }`}
                    >
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <span className="text-xl">{earned ? badge.emoji : '🔒'}</span>
                        {earned && <CheckCircle2 className="w-4 h-4 text-pastel-mint-dark" />}
                      </div>
                      <p className={`font-display font-bold text-xs ${earned ? 'text-gray-800' : 'text-gray-400'}`}>
                        {badge.title}
                      </p>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          )}
        </div>

        <div className="p-6 pt-0">
          <button
            onClick={onClose}
            className="btn-primary w-full flex items-center justify-center gap-2"
          >
            <Sparkles className="w-5 h-5" />
            Continua l'avventura!
          </button>
        </div>
      </motion.div>
    </div>
  )
}