import { useState, useEffect, useCallback } from 'react'

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

export default { STICKERS, loadStickers, saveStickers, unlockSticker, checkAndUnlockStickers, StickerBook, StickerUnlockPopup }
