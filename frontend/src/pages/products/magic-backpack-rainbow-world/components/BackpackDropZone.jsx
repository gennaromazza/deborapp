import { useState, useRef, useEffect, useMemo } from 'react'

export default function BackpackDropZone({
  isOpen,
  isDropTarget,
  collectedItems,
  onToggle,
  objects,
  profile,
  onDrop,
  hasTarget,
  registerDropZone,
}) {
  const [dropAnim, setDropAnim] = useState(false)
  const [showItems, setShowItems] = useState(false)
  const dropZoneRef = useRef(null)

  const visibleCollectedItems = useMemo(
    () => objects.filter((object) => collectedItems[object.id]),
    [objects, collectedItems]
  )

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setShowItems(true), 200)
    } else {
      setShowItems(false)
    }
  }, [isOpen])

  useEffect(() => {
    if (dropZoneRef.current && registerDropZone) {
      registerDropZone(dropZoneRef.current)
    }
  }, [registerDropZone])

  const handleDrop = () => {
    if (onDrop && hasTarget) {
      setDropAnim(true)
      onDrop()
      setTimeout(() => setDropAnim(false), 800)
    }
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 pointer-events-none">
      <style>{`
        @keyframes backpackOpen {
          0% { transform: scale(1) translateY(0); }
          30% { transform: scale(1.2) translateY(-20px); }
          60% { transform: scale(1.1) translateY(-10px); }
          100% { transform: scale(1) translateY(0); }
        }
        @keyframes backpackGlow {
          0%, 100% { filter: drop-shadow(0 0 10px rgba(255, 215, 0, 0.5)); }
          50% { filter: drop-shadow(0 0 30px rgba(255, 215, 0, 0.9)); }
        }
        @keyframes dropIn {
          0% { transform: scale(1) translateY(0); opacity: 1; }
          50% { transform: scale(0.5) translateY(20px); opacity: 0.8; }
          100% { transform: scale(0) translateY(40px); opacity: 0; }
        }
        @keyframes itemPopIn {
          0% { opacity: 0; transform: scale(0) translateY(20px); }
          70% { transform: scale(1.2) translateY(-5px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        .backpack-open { animation: backpackOpen 0.5s ease-out; }
        .backpack-glow { animation: backpackGlow 1s ease-in-out infinite; }
        .drop-in { animation: dropIn 0.6s ease-in forwards; }
        .item-pop-in { animation: itemPopIn 0.4s ease-out forwards; }
        .float { animation: float 3s ease-in-out infinite; }
      `}</style>

      <div ref={dropZoneRef} className="flex flex-col items-center pb-4 pointer-events-auto">
        <div
          onClick={onToggle}
          className={`relative transition-all duration-300 cursor-pointer ${
            isDropTarget ? 'backpack-glow scale-110' : ''
          } ${dropAnim ? 'backpack-open' : ''}`}
        >
          <div className={`text-6xl select-none float ${isDropTarget ? 'backpack-glow' : ''}`}>
            {isOpen ? '🎒✨' : '🎒'}
          </div>

          {isDropTarget && (
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-yellow-400 text-black px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap animate-bounce">
              Rilascia qui! 👆
            </div>
          )}

          {dropAnim && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-4xl drop-in">✨</div>
            </div>
          )}
        </div>

        <p className="text-white text-sm mt-2 font-bold drop-shadow-lg">
          {isOpen
            ? `Tocca per chiudere${profile ? `, ${profile.childName}` : ''}`
            : `Tocca per aprire${profile ? `, ${profile.childName}` : ''}`}
        </p>

        {isOpen && (
          <div
            className="bg-white bg-opacity-95 rounded-2xl px-6 py-4 mt-2 shadow-2xl max-w-xs"
            style={{ animation: 'itemPopIn 0.4s ease-out' }}
          >
            <p className="text-sm font-bold text-purple-700 mb-3 text-center">
              {profile ? `Raccolta di ${profile.childName}:` : 'La tua raccolta:'}
            </p>
            <div className="flex gap-3 justify-center flex-wrap">
              {showItems &&
                visibleCollectedItems.map((object, index) => (
                  <div
                    key={object.id}
                    className="text-3xl"
                    style={{ animation: `itemPopIn 0.3s ease-out ${index * 0.1}s both` }}
                  >
                    {object.emoji}
                  </div>
                ))}
              {visibleCollectedItems.length === 0 && (
                <span className="text-gray-400 text-sm">Lo zaino è vuoto...</span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
