import { motion } from 'framer-motion'
import { Sparkles, X } from 'lucide-react'

export default function LevelUpPopup({ level, data, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.5, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.5, y: 50 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        className="bg-white rounded-3xl shadow-2xl p-8 max-w-sm mx-4 text-center relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-2 hover:bg-pastel-lavender/50 rounded-full transition-colors"
        >
          <X className="w-5 h-5 text-gray-400" />
        </button>

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 300 }}
          className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-pastel-yellow to-pastel-peach flex items-center justify-center shadow-lg"
        >
          <span className="text-5xl">{data?.emoji || '⭐'}</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-pastel-yellow/50 rounded-full mb-4">
            <Sparkles className="w-4 h-4 text-pastel-yellow-dark" />
            <span className="text-sm font-display font-bold text-pastel-yellow-dark">LIVELLO UP!</span>
          </div>

          <h2 className="font-display text-3xl font-bold text-gray-800 mb-2">
            Livello {level}
          </h2>
          
          <p className="font-body text-gray-500 mb-6">
            Sei diventato un <strong className="text-pastel-pink-dark">{data?.title || 'Esploratore'}</strong>!
          </p>
        </motion.div>

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5 }}
          className="flex justify-center gap-2"
        >
          {[...Array(5)].map((_, i) => (
            <motion.span
              key={i}
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.6 + i * 0.1, type: 'spring' }}
              className="text-2xl"
            >
              ⭐
            </motion.span>
          ))}
        </motion.div>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          onClick={onClose}
          className="btn-primary mt-6 w-full"
        >
          Continua l'avventura!
        </motion.button>
      </motion.div>
    </motion.div>
  )
}