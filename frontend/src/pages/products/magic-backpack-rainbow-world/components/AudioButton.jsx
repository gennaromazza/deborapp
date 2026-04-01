import { useState } from 'react'

const AudioButton = ({ word, audio, showAllModes = false }) => {
  const [activeMode, setActiveMode] = useState(null)

  const handlePlay = (mode) => {
    setActiveMode(mode)
    switch (mode) {
      case 'word':
        audio.speakWord(word)
        break
      case 'slow':
        audio.speakSlow(word)
        break
      case 'sentence':
        audio.speakSentence(word)
        break
    }
    setTimeout(() => setActiveMode(null), 1000)
  }

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => handlePlay('word')}
        className={`p-2 rounded-full transition-all ${
          activeMode === 'word'
            ? 'bg-purple-500 text-white scale-110'
            : 'bg-white bg-opacity-80 text-purple-700 hover:bg-opacity-100 hover:scale-105'
        }`}
        title="Ascolta parola"
      >
        <span className="text-lg">🔊</span>
      </button>

      {showAllModes && (
        <>
          <button
            onClick={() => handlePlay('slow')}
            className={`p-2 rounded-full transition-all ${
              activeMode === 'slow'
                ? 'bg-blue-500 text-white scale-110'
                : 'bg-white bg-opacity-80 text-blue-700 hover:bg-opacity-100 hover:scale-105'
            }`}
            title="Ascolta lentamente"
          >
            <span className="text-lg">🐢</span>
          </button>

          <button
            onClick={() => handlePlay('sentence')}
            className={`p-2 rounded-full transition-all ${
              activeMode === 'sentence'
                ? 'bg-green-500 text-white scale-110'
                : 'bg-white bg-opacity-80 text-green-700 hover:bg-opacity-100 hover:scale-105'
            }`}
            title="Ascolta frase"
          >
            <span className="text-lg">💬</span>
          </button>
        </>
      )}
    </div>
  )
}

export default AudioButton
