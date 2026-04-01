import { useState, useEffect } from 'react'

export default function FillTheGap({ sentences, audio, profile, onComplete }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [isCorrect, setIsCorrect] = useState(null)
  const [shuffledOptions, setShuffledOptions] = useState([])

  const currentSentence = sentences[currentIndex]

  useEffect(() => {
    if (currentSentence) {
      setSelectedAnswer(null)
      setIsCorrect(null)
      setShuffledOptions([...currentSentence.gapOptions].sort(() => Math.random() - 0.5))
      audio.speakSentence(currentSentence.english)
    }
  }, [currentIndex, currentSentence])

  const handleSelect = (word) => {
    if (isCorrect) return
    setSelectedAnswer(word)

    if (word === currentSentence.gap) {
      setIsCorrect(true)
      audio.speak(`Great! ${currentSentence.english}`)
      setTimeout(() => {
        if (currentIndex < sentences.length - 1) {
          setCurrentIndex(currentIndex + 1)
          setIsCorrect(null)
        } else {
          onComplete()
        }
      }, 2000)
    } else {
      setIsCorrect(false)
      audio.speak('Riprova!')
      setTimeout(() => {
        setSelectedAnswer(null)
        setIsCorrect(null)
      }, 1000)
    }
  }

  if (!currentSentence) return null

  const sentenceParts = currentSentence.english.split(' ')
  const gapIndex = sentenceParts.findIndex(w => w.toLowerCase() === currentSentence.gap.toLowerCase())

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
                  selectedAnswer === word
                    ? isCorrect === true
                      ? 'border-green-400 bg-green-100 text-green-700 glow'
                      : isCorrect === false
                      ? 'border-red-300 bg-red-50 text-red-700 shake'
                      : 'border-purple-400 bg-purple-100 text-purple-700'
                    : 'border-dashed border-gray-300 bg-gray-100 text-gray-400'
                }`}
              >
                {selectedAnswer === word ? selectedAnswer : '___'}
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
            onClick={() => handleSelect(word)}
          >
            {word}
          </button>
        ))}
      </div>

      <button
        className="px-6 py-3 bg-white bg-opacity-80 rounded-full font-bold text-purple-700 hover:bg-opacity-100 transition-all flex items-center gap-2"
        onClick={() => audio.speakSentence(currentSentence.english)}
      >
        🔊 Ascolta la frase
      </button>

      <p className="text-white text-sm mt-6 opacity-70">
        Frase {currentIndex + 1} di {sentences.length}
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
