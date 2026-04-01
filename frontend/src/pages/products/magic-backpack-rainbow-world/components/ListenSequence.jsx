import { useState, useEffect, useRef } from 'react'

export default function ListenSequence({ items, audio, profile, onComplete }) {
  const [sequence, setSequence] = useState([])
  const [userSequence, setUserSequence] = useState([])
  const [currentStep, setCurrentStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [showResult, setShowResult] = useState(null)
  const [round, setRound] = useState(0)
  const [maxRounds, setMaxRounds] = useState(3)
  const [shuffledItems, setShuffledItems] = useState([])

  useEffect(() => {
    const shuffled = [...items].sort(() => Math.random() - 0.5).slice(0, 4)
    setShuffledItems(shuffled)
    generateSequence()
  }, [])

  useEffect(() => {
    if (round >= maxRounds) {
      onComplete()
    } else {
      const shuffled = [...items].sort(() => Math.random() - 0.5).slice(0, 4)
      setShuffledItems(shuffled)
      generateSequence()
    }
  }, [round])

  const generateSequence = () => {
    const seq = []
    for (let i = 0; i < 3; i++) {
      const randomItem = shuffledItems[Math.floor(Math.random() * shuffledItems.length)]
      seq.push(randomItem)
    }
    setSequence(seq)
    setUserSequence([])
    setCurrentStep(0)
    setShowResult(null)
  }

  const playSequence = async () => {
    setIsPlaying(true)
    for (let i = 0; i < sequence.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 800))
      audio.speakWord(sequence[i].word)
      setCurrentStep(i + 1)
      await new Promise(resolve => setTimeout(resolve, 600))
    }
    setIsPlaying(false)
    setCurrentStep(0)
  }

  useEffect(() => {
    if (shuffledItems.length > 0 && sequence.length === 0) {
      const seq = []
      for (let i = 0; i < 3; i++) {
        const randomItem = shuffledItems[Math.floor(Math.random() * shuffledItems.length)]
        seq.push(randomItem)
      }
      setSequence(seq)
    }
  }, [shuffledItems])

  const handleItemClick = (item) => {
    if (isPlaying || showResult !== null) return

    const expectedItem = sequence[userSequence.length]
    
    if (item.id === expectedItem.id) {
      const newUserSequence = [...userSequence, item]
      setUserSequence(newUserSequence)
      audio.speakWord(item.word)

      if (newUserSequence.length === sequence.length) {
        setShowResult(true)
        audio.speak('Perfect!')
        setTimeout(() => {
          setRound(round + 1)
        }, 1500)
      }
    } else {
      setShowResult(false)
      audio.speak('Wrong! Try again!')
      setTimeout(() => {
        setUserSequence([])
        setShowResult(null)
        playSequence()
      }, 1500)
    }
  }

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center pt-16 px-4">
      <style>{`
        @keyframes popIn {
          0% { opacity: 0; transform: scale(0.5); }
          70% { transform: scale(1.1); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          75% { transform: translateX(10px); }
        }
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(74, 222, 128, 0.5); }
          50% { box-shadow: 0 0 40px rgba(74, 222, 128, 0.8); }
        }
        @keyframes highlight {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.15); }
        }
        .pop-in { animation: popIn 0.5s ease-out; }
        .shake { animation: shake 0.4s ease; }
        .glow { animation: glow 1s ease infinite; }
        .highlight { animation: highlight 0.5s ease infinite; }
      `}</style>

      <div className="bg-white bg-opacity-90 rounded-2xl px-6 py-4 mb-6 shadow-lg max-w-lg w-full text-center">
        <p className="text-sm text-gray-500 mb-1">🎵 Ascolta e tocca in ordine:</p>
        <p className="text-lg font-bold text-purple-700">Ascolta la sequenza e ripetila!</p>
      </div>

      <div className="flex gap-2 mb-6">
        {sequence.map((item, i) => (
          <div
            key={i}
            className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl transition-all ${
              i < userSequence.length
                ? 'bg-green-400 text-white glow'
                : i < currentStep
                ? 'bg-purple-500 text-white highlight'
                : 'bg-gray-300'
            }`}
          >
            {i < userSequence.length ? '✓' : item.emoji}
          </div>
        ))}
      </div>

      {!isPlaying && userSequence.length === 0 && showResult === null && (
        <button
          onClick={playSequence}
          className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-full text-xl shadow-lg hover:scale-105 transition-transform mb-6"
        >
          🔊 Ascolta la sequenza
        </button>
      )}

      {isPlaying && (
        <div className="text-xl text-white font-bold mb-6 animate-pulse">
          Ascolta... {currentStep} / {sequence.length}
        </div>
      )}

      <div className="flex gap-4 flex-wrap justify-center">
        {shuffledItems.map((item, i) => {
          const isInSequence = userSequence.some(u => u.id === item.id)
          const isHighlighted = isPlaying && sequence[currentStep]?.id === item.id

          return (
            <button
              key={`${item.id}-${i}`}
              className={`px-6 py-4 rounded-2xl font-bold text-xl shadow-lg transition-all pop-in ${
                isInSequence
                  ? 'bg-green-400 text-white scale-90 opacity-50'
                  : showResult === false
                  ? 'bg-red-400 text-white shake'
                  : isHighlighted
                  ? 'bg-purple-500 text-white glow scale-110'
                  : 'bg-white text-purple-700 hover:bg-purple-100 hover:scale-105'
              }`}
              style={{ animationDelay: `${i * 0.1}s` }}
              onClick={() => handleItemClick(item)}
              disabled={isPlaying || showResult !== null}
            >
              <div className="text-3xl mb-1">{item.emoji}</div>
              {item.word}
            </button>
          )
        })}
      </div>

      <p className="text-white text-sm mt-6 opacity-70">
        Round {round + 1} di {maxRounds}
      </p>
    </div>
  )
}