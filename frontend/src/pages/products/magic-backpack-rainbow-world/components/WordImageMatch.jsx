import { useState, useEffect } from 'react'

export default function WordImageMatch({ items, audio, profile, onComplete }) {
  const [cards, setCards] = useState([])
  const [flipped, setFlipped] = useState([])
  const [matched, setMatched] = useState([])
  const [canFlip, setCanFlip] = useState(true)
  const [attempts, setAttempts] = useState(0)
  const [showComplete, setShowComplete] = useState(false)

  useEffect(() => {
    const wordCards = items.slice(0, 4).map(item => ({ ...item, type: 'word', id: `word-${item.id}` }))
    const imageCards = items.slice(0, 4).map(item => ({ ...item, type: 'image', id: `image-${item.id}` }))
    setCards([...wordCards, ...imageCards].sort(() => Math.random() - 0.5))
  }, [items])

  const handleFlip = (card) => {
    if (!canFlip || flipped.includes(card.id) || matched.includes(card.id)) return

    const newFlipped = [...flipped, card.id]
    setFlipped(newFlipped)

    if (newFlipped.length === 2) {
      setCanFlip(false)
      setAttempts(prev => prev + 1)

      const first = cards.find(c => c.id === newFlipped[0])
      const second = cards.find(c => c.id === newFlipped[1])

      if (first.id.replace('word-', '').replace('image-', '') === second.id.replace('word-', '').replace('image-', '')) {
        setMatched(prev => [...prev, first.id, second.id])
        audio.speak('Great!')
        setTimeout(() => setCanFlip(true), 500)
        
        if (matched.length + 2 === items.length * 2) {
          setShowComplete(true)
          setTimeout(onComplete, 2000)
        }
      } else {
        audio.speak('Try again!')
        setTimeout(() => {
          setFlipped([])
          setCanFlip(true)
        }, 1000)
      }
    }
  }

  const isFlipped = (card) => flipped.includes(card.id) || matched.includes(card.id)

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center pt-16 px-4">
      <style>{`
        @keyframes flipIn {
          0% { transform: rotateY(90deg); }
          100% { transform: rotateY(0deg); }
        }
        @keyframes matchPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
        .flip-in { animation: flipIn 0.4s ease-out; }
        .match-pulse { animation: matchPulse 0.5s ease-in-out; }
      `}</style>

      <div className="bg-white bg-opacity-90 rounded-2xl px-6 py-4 mb-6 shadow-lg max-w-lg w-full text-center">
        <p className="text-sm text-gray-500 mb-1">🎴 Memory:</p>
        <p className="text-lg font-bold text-purple-700">Abbina parola e immagine!</p>
      </div>

      <div className="grid grid-cols-4 gap-3 mb-6">
        {cards.map((card, i) => {
          const isMatched = matched.includes(card.id)
          const isFlippedNow = isFlipped(card)

          return (
            <button
              key={`${card.id}-${i}`}
              className={`w-16 h-20 sm:w-20 sm:h-24 rounded-xl shadow-lg transition-all flip-in ${
                isMatched
                  ? 'bg-green-100 border-2 border-green-400 match-pulse'
                  : isFlippedNow
                  ? 'bg-white border-2 border-purple-400'
                  : 'bg-gradient-to-br from-purple-500 to-pink-500 hover:scale-105'
              }`}
              style={{ animationDelay: `${i * 0.05}s` }}
              onClick={() => handleFlip(card)}
              disabled={isMatched}
            >
              {isFlippedNow ? (
                <div className="flex flex-col items-center justify-center h-full">
                  {card.type === 'word' ? (
                    <span className="font-bold text-xs sm:text-sm text-purple-700">{card.word}</span>
                  ) : (
                    <span className="text-2xl sm:text-3xl">{card.emoji}</span>
                  )}
                </div>
              ) : (
                <div className="flex items-center justify-center h-full text-2xl sm:text-3xl">❓</div>
              )}
            </button>
          )
        })}
      </div>

      <div className="flex gap-4">
        <button
          className="px-6 py-3 bg-white bg-opacity-80 rounded-full font-bold text-purple-700 hover:bg-opacity-100 transition-all"
          onClick={() => {
            const unmatched = cards.filter(c => !matched.includes(c.id) && c.type === 'word')
            if (unmatched.length > 0) {
              audio.speakWord(unmatched[0].word)
            }
          }}
        >
          🔊 Ascolta una parola
        </button>
        <div className="px-6 py-3 bg-white bg-opacity-80 rounded-full font-bold text-purple-700">
          Tentativi: {attempts}
        </div>
      </div>

      {showComplete && (
        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
          <div className="bg-gradient-to-r from-green-400 to-emerald-500 rounded-3xl px-8 py-6 shadow-2xl animate-bounce">
            <p className="text-2xl font-bold text-white text-center">
              {profile ? `Perfetto ${profile.childName}! 🎉` : 'Perfetto! 🎉'}
            </p>
            <p className="text-lg text-white text-center mt-2">{attempts} tentativi</p>
          </div>
        </div>
      )}
    </div>
  )
}