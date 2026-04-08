import { useState, useEffect, useMemo, useRef, useCallback } from 'react'

const shuffleOptions = (options) => [...options].sort(() => Math.random() - 0.5)
const normalize = (value) => String(value || '').trim().toLowerCase()

export default function FillTheGap({ sentences, audio, profile, onComplete }) {
  const safeSentences = useMemo(() => {
    if (!Array.isArray(sentences)) return []
    return sentences.filter(sentence => sentence?.english && sentence?.gap)
  }, [sentences])

  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [isCorrect, setIsCorrect] = useState(null)
  const [shuffledOptions, setShuffledOptions] = useState([])
  const [isEvaluating, setIsEvaluating] = useState(false)
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
    setSelectedAnswer(null)
    setIsCorrect(null)
    setIsEvaluating(false)

    if (!currentSentence) {
      setShuffledOptions([])
      return
    }

    const fallbackOptions = Array.isArray(currentSentence.gapOptions) && currentSentence.gapOptions.length > 0
      ? currentSentence.gapOptions
      : [currentSentence.gap]

    setShuffledOptions(shuffleOptions(fallbackOptions))
    audio?.speakSentence?.(currentSentence.english)
  }, [currentIndex, currentSentence, audio, clearQueuedTimeouts])

  const handleSelect = (word) => {
    if (!currentSentence || isEvaluating || isCorrect === true) return

    setSelectedAnswer(word)
    const answerIsCorrect = normalize(word) === normalize(currentSentence.gap)

    if (answerIsCorrect) {
      setIsCorrect(true)
      setIsEvaluating(true)
      audio?.speak?.(`Great! ${currentSentence.english}`)
      queueTimeout(() => {
        if (currentIndex < safeSentences.length - 1) {
          setCurrentIndex(prev => prev + 1)
          setIsCorrect(null)
          setIsEvaluating(false)
        } else if (typeof onComplete === 'function') {
          onComplete()
        }
      }, 2000)
      return
    }

    setIsCorrect(false)
    setIsEvaluating(true)
    audio?.speak?.('Riprova!')
    queueTimeout(() => {
      setSelectedAnswer(null)
      setIsCorrect(null)
      setIsEvaluating(false)
    }, 1000)
  }

  if (!currentSentence) {
    return (
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-white text-xl font-bold">Caricamento frase...</span>
      </div>
    )
  }

  const sentenceParts = String(currentSentence.english || '').split(' ')
  const rawGapIndex = sentenceParts.findIndex(w => normalize(w) === normalize(currentSentence.gap))
  const gapIndex = rawGapIndex >= 0 ? rawGapIndex : Math.max(0, sentenceParts.length - 1)

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
          25% { transform: translateX(-6px); }
          75% { transform: translateX(6px); }
        }
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 10px rgba(74, 222, 128, 0.5); }
          50% { box-shadow: 0 0 30px rgba(74, 222, 128, 0.8); }
        }
        .pop-in { animation: popIn 0.5s ease-out; }
        .shake { animation: shake 0.4s ease; }
        .glow { animation: glow 1s ease infinite; }
      `}</style>

      <div className="bg-white bg-opacity-90 rounded-2xl px-6 py-4 mb-8 shadow-lg max-w-lg w-full text-center">
        <p className="text-sm text-gray-500 mb-1">📝 Completa la frase:</p>
        <p className="text-lg font-bold text-purple-700 mb-3">{currentSentence.italian}</p>
      </div>

      <div className="bg-white bg-opacity-80 rounded-2xl px-8 py-6 mb-8 shadow-lg">
        <div className="flex flex-wrap gap-3 justify-center items-center">
          {sentenceParts.map((word, i) => (
            i === gapIndex ? (
              <span
                key={i}
                className={`inline-block px-4 py-2 rounded-xl border-4 text-lg font-bold transition-all ${
                  selectedAnswer && normalize(selectedAnswer) === normalize(word)
                    ? isCorrect === true
                      ? 'border-green-400 bg-green-100 text-green-700 glow'
                      : isCorrect === false
                      ? 'border-red-300 bg-red-50 text-red-700 shake'
                      : 'border-purple-400 bg-purple-100 text-purple-700'
                    : 'border-dashed border-gray-300 bg-gray-100 text-gray-400'
                }`}
                onClick={() => selectedAnswer && audio?.speakWord?.(selectedAnswer)}
              >
                {selectedAnswer && normalize(selectedAnswer) === normalize(word) ? (
                  <span className="flex items-center gap-2">
                    {selectedAnswer}
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        audio?.speakWord?.(selectedAnswer)
                      }}
                      className="text-purple-600 hover:text-purple-800"
                    >
                      🔊
                    </button>
                  </span>
                ) : '___'}
              </span>
            ) : (
              <span key={i} className="text-xl font-bold text-gray-700">
                {word}
              </span>
            )
          ))}
        </div>
      </div>

      <div className="flex gap-4 flex-wrap justify-center mb-8">
        {shuffledOptions.map((word, i) => (
          <button
            key={`${word}-${i}`}
            className={`px-8 py-4 rounded-2xl font-bold text-xl shadow-lg transition-all pop-in ${
              selectedAnswer === word
                ? isCorrect === true
                  ? 'bg-green-500 text-white scale-110'
                  : isCorrect === false
                  ? 'bg-red-400 text-white shake'
                  : 'bg-purple-500 text-white'
                : 'bg-white text-purple-700 hover:bg-purple-100 hover:scale-105'
            }`}
            style={{ animationDelay: `${i * 0.1}s` }}
            onClick={() => {
              handleSelect(word)
              audio?.speakWord?.(word)
            }}
            disabled={isEvaluating}
          >
            {word}
          </button>
        ))}
      </div>

      <button
        className="px-6 py-3 bg-white bg-opacity-80 rounded-full font-bold text-purple-700 hover:bg-opacity-100 transition-all flex items-center gap-2"
        onClick={() => audio?.speakSentence?.(currentSentence.english)}
      >
        🔊 Ascolta la frase
      </button>

      <p className="text-white text-sm mt-6 opacity-70">
        Frase {currentIndex + 1} di {safeSentences.length}
      </p>

      {isCorrect === true && (
        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
          <div className="bg-gradient-to-r from-green-400 to-emerald-500 rounded-3xl px-8 py-6 shadow-2xl pop-in">
            <p className="text-2xl font-bold text-white text-center">
              {profile ? `Esatto ${profile.childName}! 🎉` : 'Esatto! 🎉'}
            </p>
            <p className="text-lg text-white text-center mt-2">{currentSentence.english}</p>
          </div>
        </div>
      )}
    </div>
  )
}
