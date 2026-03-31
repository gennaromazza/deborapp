import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RefreshCw, CheckCircle, XCircle, Star } from 'lucide-react'

const cardEmojis = ['🍎', '🍃', '⭐', '🌰', '🦋', '🍄', '🪨', '🫐']

function shuffleArray(array) {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

function MemoryCard({ emoji, isFlipped, isMatched, onClick, disabled }) {
  return (
    <motion.button
      whileHover={!disabled && !isMatched ? { scale: 1.05 } : {}}
      whileTap={!disabled && !isMatched ? { scale: 0.95 } : {}}
      onClick={onClick}
      disabled={disabled || isMatched}
      className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl transition-all perspective-1000 ${
        isMatched 
          ? 'opacity-50' 
          : isFlipped 
          ? 'rotate-y-180' 
          : ''
      }`}
      style={{ transformStyle: 'preserve-3d' }}
    >
      <motion.div
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.4 }}
        className="w-full h-full relative"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Back of card (hidden) */}
        <div 
          className="absolute inset-0 rounded-xl bg-gradient-to-br from-pastel-pink to-pastel-lavender flex items-center justify-center shadow-md"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <span className="text-2xl sm:text-3xl">❓</span>
        </div>
        
        {/* Front of card (revealed) */}
        <div 
          className={`absolute inset-0 rounded-xl flex items-center justify-center shadow-md ${
            isMatched 
              ? 'bg-pastel-mint' 
              : 'bg-white border-2 border-pastel-lavender'
          }`}
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <span className="text-3xl sm:text-4xl">{emoji}</span>
          {isMatched && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-2 -right-2 w-6 h-6 bg-pastel-mint-dark rounded-full flex items-center justify-center"
            >
              <CheckCircle className="w-4 h-4 text-white" />
            </motion.div>
          )}
        </div>
      </motion.div>
    </motion.button>
  )
}

export default function MemoryGame({ onComplete, onCorrect }) {
  const [cards, setCards] = useState([])
  const [flipped, setFlipped] = useState([])
  const [matched, setMatched] = useState([])
  const [moves, setMoves] = useState(0)
  const [gameComplete, setGameComplete] = useState(false)
  const [canPlay, setCanPlay] = useState(true)

  useEffect(() => {
    startNewGame()
  }, [])

  const startNewGame = () => {
    const selectedEmojis = cardEmojis.slice(0, 4)
    const cardPairs = [...selectedEmojis, ...selectedEmojis]
    const shuffled = shuffleArray(cardPairs)
    setCards(shuffled)
    setFlipped([])
    setMatched([])
    setMoves(0)
    setGameComplete(false)
    setCanPlay(true)
  }

  const handleCardClick = (index) => {
    if (!canPlay || flipped.includes(index) || matched.includes(cards[index])) {
      return
    }

    const newFlipped = [...flipped, index]
    setFlipped(newFlipped)

    if (newFlipped.length === 2) {
      setCanPlay(false)
      setMoves(prev => prev + 1)

      const [first, second] = newFlipped
      if (cards[first] === cards[second]) {
        setMatched(prev => [...prev, cards[first]])
        setFlipped([])
        setCanPlay(true)
        
        if (onCorrect) onCorrect()
        
        const totalMatches = matched.length + 1
        if (totalMatches === 4) {
          setGameComplete(true)
          if (onComplete) onComplete(moves + 1)
        }
      } else {
        setTimeout(() => {
          setFlipped([])
          setCanPlay(true)
        }, 1000)
      }
    }
  }

  const isWinning = matched.length === 4

  return (
    <div className="bg-pastel-lavender/30 rounded-2xl p-5 mt-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display font-bold text-lg text-gray-800 flex items-center gap-2">
          🧠 Memory
        </h3>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-500">
            Mosse: <strong className="text-pastel-pink-dark">{moves}</strong>
          </span>
          <button
            onClick={startNewGame}
            className="p-2 hover:bg-pastel-lavender/50 rounded-lg transition-colors"
            title="Ricomincia"
          >
            <RefreshCw className="w-4 h-4 text-gray-400" />
          </button>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="grid grid-cols-4 gap-2 sm:gap-3">
          {cards.map((emoji, index) => (
            <MemoryCard
              key={index}
              emoji={emoji}
              isFlipped={flipped.includes(index) || matched.includes(emoji)}
              isMatched={matched.includes(emoji)}
              onClick={() => handleCardClick(index)}
              disabled={!canPlay}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {gameComplete && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-6 text-center p-4 bg-white/80 rounded-2xl border-2 border-pastel-mint"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200 }}
              className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-pastel-mint mb-2"
            >
              <Star className="w-6 h-6 text-pastel-mint-dark" />
            </motion.div>
            <p className="font-display font-bold text-gray-800">
              Perfetto! Hai vinto in {moves} mosse!
            </p>
            <button
              onClick={startNewGame}
              className="btn-secondary mt-3 text-sm"
            >
              Gioca ancora
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}