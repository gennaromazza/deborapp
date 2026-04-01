import { useState, useEffect } from 'react'

export default function SpeakingPractice({ sentences, audio, profile, onComplete }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [listenCount, setListenCount] = useState(0)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [completed, setCompleted] = useState(false)

  const currentSentence = sentences[currentIndex]

  useEffect(() => {
    if (currentSentence) {
      setListenCount(0)
      setCompleted(false)
      audio.speakSentence(currentSentence.english)
    }
  }, [currentIndex, currentSentence])

  const handleListen = (mode = 'sentence') => {
    setIsSpeaking(true)
    switch (mode) {
      case 'word':
        audio.speakWord(currentSentence.english.split(' ')[0])
        break
      case 'slow':
        audio.speak(currentSentence.english, { mode: 'slow' })
        break
      case 'sentence':
      default:
        audio.speakSentence(currentSentence.english)
        break
    }
    setTimeout(() => setIsSpeaking(false), 2000)
    setListenCount(prev => prev + 1)
  }

  const handleRepeat = () => {
    setCompleted(true)
    audio.speak(profile ? `Bravo ${profile.childName}!` : 'Great job!')
    setTimeout(() => {
      if (currentIndex < sentences.length - 1) {
        setCurrentIndex(currentIndex + 1)
        setCompleted(false)
      } else {
        onComplete()
      }
    }, 2000)
  }

  if (!currentSentence) return null

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center pt-16 px-4">
      <style>{`
        @keyframes pulse-ring {
          0% { transform: scale(0.8); opacity: 1; }
          100% { transform: scale(1.5); opacity: 0; }
        }
        @keyframes popIn {
          0% { opacity: 0; transform: scale(0.5); }
          70% { transform: scale(1.1); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .pulse-ring { animation: pulse-ring 1s ease-out infinite; }
        .pop-in { animation: popIn 0.5s ease-out; }
        .bounce { animation: bounce 0.6s ease; }
      `}</style>

      <div className="bg-white bg-opacity-90 rounded-2xl px-6 py-4 mb-8 shadow-lg max-w-lg w-full text-center">
        <p className="text-sm text-gray-500 mb-2">🗣️ Ascolta e ripeti!</p>
        <p className="text-2xl font-bold text-purple-700 mb-2">{currentSentence.english}</p>
        <p className="text-gray-500 italic">{currentSentence.italian}</p>
      </div>

      <div className="relative mb-8">
        {isSpeaking && (
          <div className="absolute inset-0 rounded-full bg-purple-400 opacity-30 pulse-ring" />
        )}
        <div className="relative w-32 h-32 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-xl">
          <span className="text-6xl">{isSpeaking ? '🔊' : '🎤'}</span>
        </div>
      </div>

      <div className="flex gap-3 mb-8">
        <button
          className="px-5 py-3 bg-white bg-opacity-80 rounded-full font-bold text-purple-700 hover:bg-opacity-100 transition-all flex items-center gap-2"
          onClick={() => handleListen('word')}
        >
          🔤 Parola
        </button>
        <button
          className="px-5 py-3 bg-white bg-opacity-80 rounded-full font-bold text-blue-700 hover:bg-opacity-100 transition-all flex items-center gap-2"
          onClick={() => handleListen('slow')}
        >
          🐢 Lento
        </button>
        <button
          className="px-5 py-3 bg-white bg-opacity-80 rounded-full font-bold text-green-700 hover:bg-opacity-100 transition-all flex items-center gap-2"
          onClick={() => handleListen('sentence')}
        >
          💬 Frase
        </button>
      </div>

      <button
        className={`px-10 py-4 rounded-full font-bold text-xl transition-all flex items-center gap-3 ${
          completed
            ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white bounce'
            : 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white hover:scale-105'
        }`}
        onClick={handleRepeat}
      >
        {completed ? (
          <>✅ Bravo!</>
        ) : (
          <>🎤 Tocca per ripetere!</>
        )}
      </button>

      <p className="text-white text-sm mt-6 opacity-70">
        Ascoltato {listenCount} volte • Frase {currentIndex + 1} di {sentences.length}
      </p>

      {completed && (
        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-3xl px-8 py-6 shadow-2xl pop-in">
            <p className="text-2xl font-bold text-white text-center">
              {profile ? `Ottimo ${profile.childName}! 🌟` : 'Ottimo! 🌟'}
            </p>
            <p className="text-lg text-white text-center mt-2">La tua pronuncia è fantastica!</p>
          </div>
        </div>
      )}
    </div>
  )
}
