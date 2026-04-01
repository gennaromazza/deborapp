import { useState, useEffect } from 'react'
import useAudio from '../hooks/useAudio'

const STORAGE_KEY = 'magic-backpack-stickers'

export function loadStickers() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : []
  } catch { return [] }
}

export function saveStickers(stickers) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(stickers))
}

export function unlockSticker(stickerId) {
  const stickers = loadStickers()
  if (!stickers.includes(stickerId)) {
    stickers.push(stickerId)
    saveStickers(stickers)
    return STICKERS.find(s => s.id === stickerId)
  }
  return null
}

export function checkAndUnlockStickers(progress) {
  const unlocked = []
  const stickers = loadStickers()

  if (progress.completedMissions?.length >= 6 && !stickers.includes('rainbow-master')) {
    unlocked.push(unlockSticker('rainbow-master'))
  }
  if (progress.collectedWords?.length >= 10 && !stickers.includes('word-collector')) {
    unlocked.push(unlockSticker('word-collector'))
  }
  if (progress.streakDays >= 3 && !stickers.includes('streak-3')) {
    unlocked.push(unlockSticker('streak-3'))
  }
  if (progress.unlockedWorlds?.length >= 5 && !stickers.includes('all-worlds')) {
    unlocked.push(unlockSticker('all-worlds'))
  }

  return unlocked.filter(Boolean)
}

const STICKERS = [
  { id: 'rainbow-master', name: 'Maestro dei Colori', emoji: '🌈', world: 'rainbow', condition: 'complete_world' },
  { id: 'speed-learner', name: 'Velocista', emoji: '⚡', world: 'any', condition: 'fast_complete' },
  { id: 'perfect-score', name: 'Perfetto', emoji: '💎', world: 'any', condition: 'no_errors' },
  { id: 'pet-lover', name: 'Amico degli Animali', emoji: '🐾', world: 'pets', condition: 'complete_world' },
  { id: 'jungle-explorer', name: 'Esploratore', emoji: '🧭', world: 'wild', condition: 'complete_world' },
  { id: 'fruit-chef', name: 'Chef della Frutta', emoji: '👨‍🍳', world: 'fruits', condition: 'complete_world' },
  { id: 'pilot', name: 'Pilota', emoji: '✈️', world: 'transport', condition: 'complete_world' },
  { id: 'word-collector', name: 'Collezionista', emoji: '📚', world: 'any', condition: 'collect_10' },
  { id: 'streak-3', name: '3 Giorni', emoji: '🔥', world: 'any', condition: 'streak_3' },
  { id: 'all-worlds', name: 'Campione', emoji: '🏆', world: 'any', condition: 'all_worlds' },
]

export function StickerBook({ onClose, profile }) {
  const stickers = loadStickers()
  const [selected, setSelected] = useState(null)

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
      <style>{`
        @keyframes popIn { 0% { opacity: 0; transform: scale(0.5); } 70% { transform: scale(1.1); } 100% { opacity: 1; transform: scale(1); } }
        .pop-in { animation: popIn 0.5s ease-out; }
      `}</style>
      <div className="bg-white rounded-3xl p-6 max-w-lg w-full max-h-[80vh] overflow-y-auto pop-in">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-purple-700">🎨 Adesivi di {profile?.childName || 'Bambino'}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl">✕</button>
        </div>
        <p className="text-gray-500 text-sm mb-4">{stickers.length}/{STICKERS.length} adesivi raccolti</p>
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
          {STICKERS.map(sticker => {
            const isUnlocked = stickers.includes(sticker.id)
            return (
              <div
                key={sticker.id}
                className={`relative rounded-2xl p-3 text-center cursor-pointer transition-all ${
                  isUnlocked ? 'bg-gradient-to-br from-purple-100 to-pink-100 hover:scale-105' : 'bg-gray-100 opacity-50'
                }`}
                onClick={() => isUnlocked && setSelected(sticker)}
              >
                <div className="text-4xl mb-1">{isUnlocked ? sticker.emoji : '🔒'}</div>
                <p className="text-xs font-bold text-gray-700">{isUnlocked ? sticker.name : '???'}</p>
              </div>
            )
          })}
        </div>
        {selected && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50" onClick={() => setSelected(null)}>
            <div className="bg-white rounded-3xl p-8 text-center pop-in" onClick={e => e.stopPropagation()}>
              <div className="text-7xl mb-4">{selected.emoji}</div>
              <h3 className="text-xl font-bold text-purple-700 mb-2">{selected.name}</h3>
              <p className="text-gray-500">Sbloccato nel mondo {selected.world}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export function StickerCorner({ audio, recentStickers = [] }) {
  const [unlockedStickers, setUnlockedStickers] = useState([])
  const [floatingSticker, setFloatingSticker] = useState(null)
  const [showCollection, setShowCollection] = useState(false)
  const [displayedStickers, setDisplayedStickers] = useState([])
  const [hasSpoken, setHasSpoken] = useState(false)

  const loadAndSetStickers = () => {
    const stickers = loadStickers()
    const unlocked = stickers.map(id => STICKERS.find(s => s.id === id)).filter(Boolean)
    setUnlockedStickers(unlocked)
    setDisplayedStickers(unlocked.slice(0, 4))
  }

  useEffect(() => {
    loadAndSetStickers()
  }, [])

  useEffect(() => {
    if (recentStickers.length > 0 && !hasSpoken) {
      const newSticker = recentStickers[recentStickers.length - 1]
      loadAndSetStickers()
      setFloatingSticker(newSticker)
      setHasSpoken(true)
      
      if (audio) {
        const synth = window.speechSynthesis
        synth.cancel()
        const utterance = new SpeechSynthesisUtterance(`Nuovo adesivo! ${newSticker.name}!`)
        utterance.rate = 1.1
        utterance.pitch = 1.1
        synth.speak(utterance)
      }

      setTimeout(() => {
        setFloatingSticker(null)
        loadAndSetStickers()
      }, 2500)
    }
  }, [recentStickers])

  useEffect(() => {
    if (unlockedStickers.length > displayedStickers.length && recentStickers.length === 0) {
      const newSticker = unlockedStickers[unlockedStickers.length - 1]
      setFloatingSticker(newSticker)
      setTimeout(() => {
        setFloatingSticker(null)
        loadAndSetStickers()
      }, 2500)
    }
  }, [unlockedStickers.length])

  if (unlockedStickers.length === 0) return null

  return (
    <>
      <style>{`
        @keyframes floatCorner {
          0% { transform: translateY(0) rotate(0deg); }
          25% { transform: translateY(-8px) rotate(5deg); }
          50% { transform: translateY(0) rotate(0deg); }
          75% { transform: translateY(-8px) rotate(-5deg); }
          100% { transform: translateY(0) rotate(0deg); }
        }
        @keyframes stickerAppear {
          0% { opacity: 0; transform: scale(0) translateY(-50px); }
          50% { transform: scale(1.3) translateY(-20px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes stickerFly {
          0% { opacity: 1; transform: scale(1.5) translateY(0); }
          50% { opacity: 1; transform: scale(1.2) translateY(-30px) rotate(10deg); }
          100% { opacity: 0; transform: scale(0.8) translateY(-100px) rotate(-10deg); }
        }
        @keyframes glowPulse {
          0%, 100% { box-shadow: 0 0 20px rgba(255, 215, 0, 0.6); }
          50% { box-shadow: 0 0 40px rgba(255, 215, 0, 0.9); }
        }
        .corner-float { animation: floatCorner 3s ease-in-out infinite; }
        .sticker-appear { animation: stickerAppear 0.6s ease-out forwards; }
        .sticker-fly { animation: stickerFly 1.5s ease-in-out forwards; }
        .glow-pulse { animation: glowPulse 1s ease-in-out infinite; }
      `}</style>

      {floatingSticker && (
        <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
          <div className="sticker-fly">
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl px-6 py-4 shadow-2xl glow-pulse">
              <div className="text-5xl mb-1">{floatingSticker.emoji}</div>
              <p className="text-lg font-bold text-white text-center">{floatingSticker.name}</p>
            </div>
          </div>
        </div>
      )}

      <div 
        className="fixed bottom-4 right-4 z-40 cursor-pointer group"
        onClick={() => setShowCollection(true)}
      >
        <div className="flex -space-x-2">
          {displayedStickers.map((sticker, i) => (
            <div
              key={sticker.id}
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-purple-100 to-pink-100 shadow-lg flex items-center justify-center text-2xl sm:text-3xl border-2 border-white corner-float"
              style={{ 
                animationDelay: `${i * 0.3}s`,
                zIndex: displayedStickers.length - i
              }}
            >
              {sticker.emoji}
            </div>
          ))}
          {unlockedStickers.length > 4 && (
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-white shadow-lg flex items-center justify-center text-sm font-bold text-purple-600 border-2 border-purple-200">
              +{unlockedStickers.length - 4}
            </div>
          )}
        </div>
        
        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-400 rounded-full flex items-center justify-center text-white text-xs font-bold border-2 border-white">
          {unlockedStickers.length}
        </div>

        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black bg-opacity-80 text-white text-xs px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Tocca per vedere tutti gli adesivi!
        </div>
      </div>

      {showCollection && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50" onClick={() => setShowCollection(false)}>
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full mx-4" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-purple-700">🎨 La tua collezione</h2>
              <button onClick={() => setShowCollection(false)} className="text-gray-400 hover:text-gray-600 text-2xl">✕</button>
            </div>
            <div className="grid grid-cols-5 gap-2">
              {unlockedStickers.map((sticker, i) => (
                <div
                  key={sticker.id}
                  className="aspect-square rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center text-2xl sticker-appear"
                  style={{ animationDelay: `${i * 0.1}s` }}
                  title={sticker.name}
                >
                  {sticker.emoji}
                </div>
              ))}
            </div>
            <p className="text-center text-gray-500 text-sm mt-4">{unlockedStickers.length} / {STICKERS.length} adesivi</p>
          </div>
        </div>
      )}
    </>
  )
}

export function StickerUnlockPopup({ sticker, onClose }) {
  if (!sticker) return null
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
      <style>{`
        @keyframes celebratePop {
          0% { opacity: 0; transform: scale(0.3) rotate(-10deg); }
          50% { transform: scale(1.2) rotate(5deg); }
          100% { opacity: 1; transform: scale(1) rotate(0deg); }
        }
        .celebrate { animation: celebratePop 0.8s ease-out; }
      `}</style>
      <div className="bg-gradient-to-r from-yellow-300 to-orange-400 rounded-3xl px-8 py-6 shadow-2xl celebrate">
        <p className="text-lg font-bold text-white mb-2">🎉 Nuovo Adesivo!</p>
        <div className="text-6xl mb-2">{sticker.emoji}</div>
        <p className="text-xl font-bold text-white">{sticker.name}</p>
      </div>
    </div>
  )
}

export default { STICKERS, loadStickers, saveStickers, unlockSticker, checkAndUnlockStickers, StickerBook, StickerUnlockPopup, StickerCorner }