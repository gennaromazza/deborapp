import { useState, useEffect, useMemo, useRef, useCallback } from 'react'

const shuffleWords = (words) => [...words].sort(() => Math.random() - 0.5)

export default function SentenceBuilder({ sentences, audio, profile, onComplete }) {
  const safeSentences = useMemo(() => {
    if (!Array.isArray(sentences)) return []
    return sentences.filter(sentence => Array.isArray(sentence?.words) && sentence.words.length > 0)
  }, [sentences])

  const [currentIndex, setCurrentIndex] = useState(0)
  const [placedWords, setPlacedWords] = useState([])
  const [availableWords, setAvailableWords] = useState([])
  const [isCorrect, setIsCorrect] = useState(null)
  const [shakeSlot, setShakeSlot] = useState(null)
  const timeoutIds = useRef([])

  const currentSentence = safeSentences[currentIndex] || null

  const clearQueuedTimeouts = useCallback(() => {
    timeoutIds.current.forEach(id => clearTimeout(id))
    timeoutIds.current = []
  }, [])

  const queueTimeout = useCallback((fn, delay) => {
    const id = setTimeout(fn, delay)
    timeoutIds.current.push(id)
    return id
  }, [])

  useEffect(() => {
    return () => {
      clearQueuedTimeouts()
    }
  }, [clearQueuedTimeouts])

  useEffect(() => {
    if (currentIndex >= safeSentences.length && safeSentences.length > 0) {
      setCurrentIndex(0)
    }
  }, [currentIndex, safeSentences.length])

  useEffect(() => {
    clearQueuedTimeouts()
    setShakeSlot(null)
    setIsCorrect(null)

    if (!currentSentence) {
      setPlacedWords([])
      setAvailableWords([])
      return
    }

    setPlacedWords(new Array(currentSentence.words.length).fill(null))
    setAvailableWords(shuffleWords(currentSentence.words))
    audio?.speakSentence?.(currentSentence.english)
  }, [currentIndex, currentSentence, audio, clearQueuedTimeouts])

  const handlePlaceWord = (word, sourceIndex) => {
    if (!currentSentence || isCorrect !== null) return

    const emptySlotIndex = placedWords.indexOf(null)
    if (emptySlotIndex === -1) return

    const newPlaced = [...placedWords]
    newPlaced[emptySlotIndex] = word
    setPlacedWords(newPlaced)

    const newAvailable = [...availableWords]
    if (sourceIndex >= 0 && sourceIndex < newAvailable.length) {
      newAvailable.splice(sourceIndex, 1)
    } else {
      const fallbackIndex = newAvailable.indexOf(word)
      if (fallbackIndex !== -1) newAvailable.splice(fallbackIndex, 1)
    }
    setAvailableWords(newAvailable)

    audio?.speak?.(word)
  }

  const handleRemoveWord = (slotIndex) => {
    if (!currentSentence || isCorrect !== null) return

    const word = placedWords[slotIndex]
    if (!word) return

    const newPlaced = [...placedWords]
    newPlaced[slotIndex] = null
    setPlacedWords(newPlaced)
    setAvailableWords(prev => [...prev, word])
  }

  const checkAnswer = () => {
    if (!currentSentence || isCorrect !== null) return

    if (placedWords.includes(null)) {
      setShakeSlot(placedWords.indexOf(null))
      queueTimeout(() => setShakeSlot(null), 500)
      audio?.speak?.('Completa la frase!')
      return
    }

    const isAnswerCorrect = placedWords.every((word, i) => word === currentSentence.words[i])
    setIsCorrect(isAnswerCorrect)

    if (isAnswerCorrect) {
      audio?.speak?.(`Great! ${currentSentence.english}`)
      queueTimeout(() => {
        if (currentIndex < safeSentences.length - 1) {
          setCurrentIndex(prev => prev + 1)
          setIsCorrect(null)
        } else if (typeof onComplete === 'function') {
          onComplete()
        }
      }, 2000)
      return
    }

    audio?.speak?.('Riprova!')
    queueTimeout(() => {
      setPlacedWords(new Array(currentSentence.words.length).fill(null))
      setAvailableWords(shuffleWords(currentSentence.words))
      setIsCorrect(null)
    }, 1500)
  }

  if (!currentSentence) {
    return (
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-white text-xl font-bold">Caricamento frase...</span>
      </div>
    )
  }

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center pt-16 px-4">
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-8px); }
          75% { transform: translateX(8px); }
        }
        @keyframes popIn {
          0% { opacity: 0; transform: scale(0.5); }
          70% { transform: scale(1.1); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 10px rgba(74, 222, 128, 0.5); }
          50% { box-shadow: 0 0 30px rgba(74, 222, 128, 0.8); }
        }
        .shake { animation: shake 0.4s ease; }
        .pop-in { animation: popIn 0.5s ease-out; }
        .glow { animation: glow 1s ease infinite; }
      `}</style>

      <div className="bg-white bg-opacity-90 rounded-2xl px-6 py-4 mb-6 shadow-lg max-w-lg w-full">
        <p className="text-sm text-gray-500 mb-1">📝 Costruisci la frase:</p>
        <p className="text-lg font-bold text-purple-700">{currentSentence.italian}</p>
      </div>

      <div className="flex gap-2 mb-8 flex-wrap justify-center">
        {placedWords.map((word, i) => (
          <div
            key={i}
            className={`w-24 h-14 rounded-xl border-4 flex items-center justify-center gap-1 transition-all ${
              word
                ? isCorrect === true
                  ? 'border-green-400 bg-green-100 glow'
                  : isCorrect === false
                  ? 'border-red-300 bg-red-50 shake'
                  : 'border-purple-400 bg-purple-100 cursor-pointer hover:bg-purple-200'
                : shakeSlot === i
                ? 'border-yellow-400 bg-yellow-50 shake'
                : 'border-dashed border-gray-300 bg-gray-50'
            }`}
          >
            {word && (
              <>
                <span
                  className="font-bold text-sm cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleRemoveWord(i)
                  }}
                >
                  {word}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    audio?.speakWord?.(word)
                  }}
                  className="text-purple-600 hover:text-purple-800 hover:scale-110 transition-transform"
                >
                  🔊
                </button>
              </>
            )}
          </div>
        ))}
      </div>

      <div className="flex gap-3 mb-8 flex-wrap justify-center">
        {availableWords.map((word, i) => (
          <button
            key={`${word}-${i}`}
            className="px-5 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-xl shadow-lg hover:scale-105 transition-transform pop-in"
            style={{ animationDelay: `${i * 0.1}s` }}
            onClick={() => handlePlaceWord(word, i)}
            disabled={isCorrect !== null}
          >
            {word}
          </button>
        ))}
      </div>

      <div className="flex gap-4">
        <button
          className="px-6 py-3 bg-white bg-opacity-80 rounded-full font-bold text-purple-700 hover:bg-opacity-100 transition-all flex items-center gap-2"
          onClick={() => audio?.speakSentence?.(currentSentence.english)}
        >
          🔊 Ascolta
        </button>
        <button
          className={`px-8 py-3 rounded-full font-bold transition-all flex items-center gap-2 ${
            placedWords.includes(null) || isCorrect !== null
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:scale-105'
          }`}
          onClick={checkAnswer}
          disabled={placedWords.includes(null) || isCorrect !== null}
        >
          ✅ Verifica
        </button>
      </div>

      <p className="text-white text-sm mt-4 opacity-70">
        Frase {currentIndex + 1} di {safeSentences.length}
      </p>

      {isCorrect === true && (
        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
          <div className="bg-gradient-to-r from-green-400 to-emerald-500 rounded-3xl px-8 py-6 shadow-2xl pop-in">
            <p className="text-2xl font-bold text-white text-center">
              {profile ? `Bravo ${profile.childName}! 🎉` : 'Bravo! 🎉'}
            </p>
            <p className="text-lg text-white text-center mt-2">{currentSentence.english}</p>
          </div>
        </div>
      )}
    </div>
  )
}
