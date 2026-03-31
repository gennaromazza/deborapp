import { motion } from 'framer-motion'
import { Star, Award, Trophy, Sparkles } from 'lucide-react'
import { badgeData } from '../data/chapters'

export default function BadgeScreen({ badges = [], onClose }) {
  const allComplete = badges.length === 6

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-8"
      >
        <div className="text-center mb-6">
          {allComplete ? (
            <>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200 }}
                className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-pastel-yellow to-pastel-peach mb-4"
              >
                <Trophy className="w-10 h-10 text-pastel-yellow-dark" />
              </motion.div>
              <h2 className="font-display text-2xl font-bold text-gray-800 mb-2">
                Complimenti! 🎉
              </h2>
              <p className="font-body text-gray-500">
                Hai completato tutti i capitoli!
              </p>
            </>
          ) : (
            <>
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-pastel-lavender to-pastel-pink mb-4">
                <Award className="w-10 h-10 text-pastel-lavender-dark" />
              </div>
              <h2 className="font-display text-2xl font-bold text-gray-800 mb-2">
                I tuoi Badge
              </h2>
              <p className="font-body text-gray-500">
                {badges.length}/6 capitoli completati
              </p>
            </>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          {Object.entries(badgeData).map(([id, badge]) => {
            const earned = badges.includes(parseInt(id))
            return (
              <motion.div
                key={id}
                whileHover={earned ? { scale: 1.05 } : {}}
                className={`p-4 rounded-2xl text-center transition-all ${
                  earned
                    ? `bg-gradient-to-br ${badge.color} shadow-md`
                    : 'bg-gray-100 opacity-50'
                }`}
              >
                <span className="text-3xl block mb-2">{earned ? badge.emoji : '🔒'}</span>
                <p className={`font-display font-bold text-sm ${earned ? 'text-white' : 'text-gray-400'}`}>
                  {badge.title}
                </p>
                {earned && (
                  <p className="font-body text-white/80 text-xs mt-1">
                    {badge.description}
                  </p>
                )}
              </motion.div>
            )
          })}
        </div>

        <button
          onClick={onClose}
          className="btn-primary w-full flex items-center justify-center gap-2"
        >
          <Sparkles className="w-5 h-5" />
          Continua a leggere!
        </button>
      </motion.div>
    </div>
  )
}
