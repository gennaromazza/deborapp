import { useState } from 'react'
import useAudio from '../hooks/useAudio'
import { loadProgress } from '../hooks/useProgress'
import { WORLDS } from '../data/worlds'
import AvatarDisplay from './AvatarDisplay'

export default function BackpackView({ onBack, profile }) {
  const audio = useAudio()
  const progress = loadProgress()
  const [selectedWord, setSelectedWord] = useState(null)

  const allWords = WORLDS.flatMap(w => w.words)
  const collectedWords = allWords.filter(w => progress.collectedWords.includes(w.id))

  const handleWordTap = (word) => {
    setSelectedWord(word.id)
    audio.speakWord(word.word)
    setTimeout(() => setSelectedWord(null), 1000)
  }

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-700 p-4">
      <style>{`
        @keyframes popIn {
          0% { opacity: 0; transform: scale(0.5); }
          70% { transform: scale(1.1); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        .pop-in { animation: popIn 0.5s ease-out; }
        .float { animation: float 3s ease-in-out infinite; }
      `}</style>

      <button onClick={onBack} className="absolute top-4 left-4 z-40 text-white font-bold bg-black bg-opacity-30 rounded-full px-4 py-2 hover:bg-opacity-50">← Mappa</button>

      <div className="text-center pt-16">
        {profile?.avatarUrl && (
          <div className="mb-4 flex justify-center">
            <AvatarDisplay avatarUrl={profile.avatarUrl} childName={profile.childName} size="lg" />
          </div>
        )}
        <div className="text-7xl mb-4 float">🎒✨</div>
        <h1 className="text-3xl font-bold text-white mb-2">
          {profile ? `Lo Zaino di ${profile.childName}` : 'Il Mio Zaino Magico'}
        </h1>
        <p className="text-white text-opacity-80 mb-8">
          {collectedWords.length} parole raccolte • {progress.stars} ⭐
        </p>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 px-4 pb-24 overflow-y-auto max-h-96">
        {collectedWords.map(word => (
          <div
            key={word.id}
            className={`bg-white bg-opacity-20 rounded-2xl p-4 text-center cursor-pointer transition-all duration-300 hover:bg-opacity-30 hover:scale-105 ${selectedWord === word.id ? 'scale-110 bg-opacity-40' : ''}`}
            onClick={() => handleWordTap(word)}
          >
            <div className="text-4xl mb-2">{word.emoji}</div>
            <p className="text-white font-bold text-sm">{word.word}</p>
            <p className="text-white text-opacity-60 text-xs">{word.translation}</p>
            {selectedWord === word.id && (
              <div className="text-yellow-400 text-xs mt-1 pop-in">🔊</div>
            )}
          </div>
        ))}
        {collectedWords.length === 0 && (
          <div className="col-span-full text-center text-white text-opacity-60 py-12">
            <div className="text-6xl mb-4">🎒</div>
            <p className="text-xl">
              {profile ? `Lo zaino di ${profile.childName} è vuoto!` : 'Il tuo zaino è vuoto!'}
            </p>
            <p className="text-sm mt-2">Inizia a raccogliere parole dai mondi!</p>
          </div>
        )}
      </div>

      {selectedWord && (
        <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 bg-white rounded-2xl px-6 py-4 shadow-2xl pop-in">
          <div className="text-center">
            <div className="text-5xl mb-2">
              {collectedWords.find(w => w.id === selectedWord)?.emoji}
            </div>
            <p className="text-xl font-bold text-purple-700">
              {collectedWords.find(w => w.id === selectedWord)?.word}
            </p>
            <p className="text-sm text-gray-500">
              {collectedWords.find(w => w.id === selectedWord)?.translation}
            </p>
          </div>
        </div>
      )}

      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-white bg-opacity-20 rounded-full px-6 py-3">
        <p className="text-white text-sm font-bold">
          🔊 Tocca una parola per ascoltarla!
        </p>
      </div>
    </div>
  )
}
