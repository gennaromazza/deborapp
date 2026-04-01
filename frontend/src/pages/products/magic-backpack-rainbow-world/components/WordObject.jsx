import { useState } from 'react'

const WordObject = ({ obj, onTap, onDragStart, isCollected, isTarget, missionActive }) => {
  const [anim, setAnim] = useState('')
  const [glow, setGlow] = useState(false)

  const handleTap = () => {
    setAnim('bounce')
    setGlow(true)
    onTap(obj)
    setTimeout(() => {
      setAnim('')
      setGlow(false)
    }, 600)
  }

  const handleDragStart = (e) => {
    if (isCollected) return
    onDragStart(e, obj)
  }

  return (
    <div
      className={`relative cursor-pointer transition-all duration-200 select-none ${anim} ${isCollected ? 'opacity-50 scale-90' : 'hover:scale-105'}`}
      style={{
        fontSize: '5rem',
        filter: glow ? `drop-shadow(0 0 15px ${obj.color})` : 'none',
        touchAction: 'none',
      }}
      onClick={handleTap}
      onMouseDown={handleDragStart}
      onTouchStart={handleDragStart}
      draggable={false}
    >
      <div className="text-center">
        <span className="block">{obj.emoji}</span>
        <p className="text-white font-bold text-sm mt-1 drop-shadow">{obj.word}</p>
        <p className="text-white text-opacity-70 text-xs drop-shadow">({obj.translation})</p>
        {isCollected && (
          <span className="text-sm text-white bg-green-500 px-2 py-1 rounded-full" style={{ animation: 'popIn 0.5s ease-out' }}>
            ✓
          </span>
        )}
        {missionActive && isTarget && !isCollected && (
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-bold" style={{ animation: 'popIn 0.5s ease-out' }}>
            👆 TOCCA!
          </div>
        )}
      </div>
    </div>
  )
}

export default WordObject
