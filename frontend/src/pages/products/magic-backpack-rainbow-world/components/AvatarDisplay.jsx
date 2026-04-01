import { useState, useEffect } from 'react'

export default function AvatarDisplay({ avatarUrl, childName, size = 'md', showName = true, reaction = 'idle', showSparkle = false }) {
  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32',
    xl: 'w-48 h-48',
  }

  const [sparkles, setSparkles] = useState([])

  useEffect(() => {
    if (showSparkle) {
      const newSparkles = Array.from({ length: 8 }, (_, i) => ({
        id: i,
        angle: (i / 8) * 360,
      }))
      setSparkles(newSparkles)
      setTimeout(() => setSparkles([]), 1500)
    }
  }, [showSparkle])

  const getReactionClass = () => {
    switch (reaction) {
      case 'success':
        return 'animate-[jump_0.5s_ease-in-out]'
      case 'error':
        return 'animate-[shrink_0.3s_ease-in-out]'
      case 'unlock':
        return 'animate-[unlockPulse_0.6s_ease-in-out]'
      default:
        return 'animate-[float_3s_ease-in-out_infinite]'
    }
  }

  const containerClass = `${sizeClasses[size]} relative ${getReactionClass()}`

  return (
    <div className="flex flex-col items-center">
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes jump {
          0% { transform: translateY(0) scale(1); }
          30% { transform: translateY(-30px) scale(1.1); }
          60% { transform: translateY(-10px) scale(0.95); }
          100% { transform: translateY(0) scale(1); }
        }
        @keyframes shrink {
          0% { transform: scale(1); }
          50% { transform: scale(0.9); }
          100% { transform: scale(1); }
        }
        @keyframes unlockPulse {
          0% { transform: scale(1) rotate(0deg); filter: brightness(1); }
          25% { transform: scale(1.2) rotate(-5deg); filter: brightness(1.3); }
          50% { transform: scale(1) rotate(5deg); filter: brightness(1); }
          75% { transform: scale(1.15) rotate(-3deg); filter: brightness(1.2); }
          100% { transform: scale(1) rotate(0deg); filter: brightness(1); }
        }
        @keyframes sparkleOut {
          0% { opacity: 1; transform: rotate(var(--angle)) translateY(0) scale(1); }
          100% { opacity: 0; transform: rotate(var(--angle)) translateY(40px) scale(0); }
        }
      `}</style>

      <div className={containerClass}>
        {sparkles.map(s => (
          <div
            key={s.id}
            className="absolute inset-0 pointer-events-none"
            style={{
              '--angle': `${s.angle}deg`,
              animation: 'sparkleOut 1s ease-out forwards',
            }}
          >
            <div className="absolute top-0 left-1/2 text-xl">✨</div>
          </div>
        ))}

        {avatarUrl ? (
          <div className="relative w-full h-full">
            <img
              src={avatarUrl}
              alt={`Avatar di ${childName}`}
              className="w-full h-full object-cover rounded-3xl shadow-lg"
            />
            <div className="absolute -bottom-2 -right-2 text-2xl filter drop-shadow-lg">🎒</div>
            {reaction === 'success' && (
              <div className="absolute -top-2 -right-2 text-2xl animate-bounce">😊</div>
            )}
            {reaction === 'error' && (
              <div className="absolute -top-2 -right-2 text-2xl">😢</div>
            )}
          </div>
        ) : (
          <div className={`w-full h-full bg-gradient-to-br from-purple-400 to-pink-400 rounded-3xl flex items-center justify-center shadow-lg relative`}>
            <span className="text-4xl">👤</span>
            {reaction === 'success' && (
              <div className="absolute -top-2 -right-2 text-2xl animate-bounce">😊</div>
            )}
            {reaction === 'error' && (
              <div className="absolute -top-2 -right-2 text-2xl">😢</div>
            )}
          </div>
        )}

        {showSparkle && !sparkles.length && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="absolute text-xl"
                style={{
                  left: '50%',
                  top: '50%',
                  transform: `rotate(${i * 60}deg) translateY(-20px)`,
                  animation: 'sparkleOut 1s ease-out forwards',
                  animationDelay: `${i * 0.1}s`,
                }}
              >
                ✨
              </div>
            ))}
          </div>
        )}
      </div>

      {showName && childName && (
        <p className="mt-2 font-bold text-white drop-shadow-lg text-sm">
          {childName} ⭐
        </p>
      )}
    </div>
  )
}