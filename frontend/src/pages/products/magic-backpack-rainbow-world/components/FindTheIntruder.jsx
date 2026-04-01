import { useState, useEffect } from 'react'

export default function FindTheIntruder({ items, audio, profile, onComplete }) {
  const [roundItems, setRoundItems] = useState([])
  const [selectedItem, setSelectedItem] = useState(null)
  const [isCorrect, setIsCorrect] = useState(null)
  const [round, setRound] = useState(0)
  const [maxRounds] = useState(3)

  useEffect(() => {
    generateRound()
  }, [round])

  const generateRound = () => {
    const mainItems = [...items].sort(() => Math.random() - 0.5).slice(0, 2)
    const intruderIdx = Math.floor(Math.random() * 3)
    const newItems = []
    for (let i = 0; i < 3; i++) {
      if (i === intruderIdx) {
        const otherWorldItems = [
          { id: 'intruder-dog', word: 'dog', emoji: '🐶', isIntruder: true },
          { id: 'intruder-cat', word: 'cat', emoji: '🐱', isIntruder: true },
          { id: 'intruder-tree', word: 'tree', emoji: '🌳', isIntruder: true },
          { id: 'intruder-car', word: 'car', emoji: '🚗', isIntruder: true },
        ]
        newItems.push(otherWorldItems[Math.floor(Math.random() * otherWorldItems.length)])
      } else {
        const mainItem = mainItems.pop() || items[0]
        newItems.push({ ...mainItem, isIntruder: false })
      }
    }
    setRoundItems(newItems.sort(() => Math.random() - 0.5))
    setSelectedItem(null)
    setIsCorrect(null)
  }

  const handleSelect = (item) => {
    if (isCorrect !== null) return
    setSelectedItem(item.id)

    if (item.isIntruder) {
      setIsCorrect(true)
      audio.speak('Great!')
      setTimeout(() => {
        if (round < maxRounds - 1) {
          setRound(round + 1)
        } else {
          onComplete()
        }
      }, 1500)
    } else {
      setIsCorrect(false)
      audio.speak('Try again!')
      setTimeout(() => {
        setSelectedItem(null)
        setIsCorrect(null)
      }, 1000)
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
        .pop-in { animation: popIn 0.5s ease-out; }
        .shake { animation: shake 0.4s ease; }
        .glow { animation: glow 1s ease infinite; }
      `}</style>

      <div className="bg-white bg-opacity-90 rounded-2xl px-6 py-4 mb-8 shadow-lg max-w-lg w-full text-center">
        <p className="text-sm text-gray-500 mb-1">🔍 Trova l'intruso:</p>
        <p className="text-lg font-bold text-purple-700">Quale NON appartiene al gruppo?</p>
      </div>

      <div className="flex gap-4 flex-wrap justify-center mb-8">
        {roundItems.map((item, i) => {
          const isSelected = selectedItem === item.id
          const showResult = isCorrect !== null && isSelected

          return (
            <button
              key={`${item.id}-${i}`}
              className={`px-8 py-6 rounded-2xl font-bold text-2xl shadow-lg transition-all pop-in ${
                showResult
                  ? isCorrect
                    ? 'bg-green-500 text-white glow scale-110'
                    : 'bg-red-400 text-white shake'
                  : isSelected
                  ? 'bg-purple-500 text-white'
                  : 'bg-white text-purple-700 hover:bg-purple-100 hover:scale-105 active:scale-95'
              }`}
              style={{ animationDelay: `${i * 0.1}s` }}
              onClick={() => handleSelect(item)}
              aria-label={item.word}
            >
              <div className="text-4xl mb-2">{item.emoji}</div>
              {item.word}
            </button>
          )
        })}
      </div>

      <button
        className="px-6 py-3 bg-white bg-opacity-80 rounded-full font-bold text-purple-700 hover:bg-opacity-100 active:scale-95 transition-all"
        onClick={() => {
          const firstItem = roundItems[0]
          if (firstItem) audio.speakWord(firstItem.word)
        }}
        aria-label="Ascolta le parole"
      >
        🔊 Ascolta
      </button>

      <p className="text-white text-sm mt-6 opacity-70">
        Round {round + 1} di {maxRounds}
      </p>
    </div>
  )
}