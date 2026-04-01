import { useState, useEffect, useCallback } from 'react'
import { WORLDS } from '../data/worlds'
import { loadProgress } from '../hooks/useProgress'
import AvatarDisplay from './AvatarDisplay'

const WorldCard = ({ world, isUnlocked, progress, onClick }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [bounce, setBounce] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setBounce(true)
      setTimeout(() => setBounce(false), 600)
    }, 3000 + Math.random() * 2000)
    return () => clearInterval(interval)
  }, [])

  const handleClick = () => {
    if (isUnlocked) {
      onClick(world.id)
    }
  }

  const completedMissions = progress?.completedMissions?.filter(m => m.startsWith(world.id)) || []
  const missionCount = WORLDS.find(w => w.id === world.id)?.missions?.length || 6

  return (
    <div
      className={`relative cursor-pointer transition-all duration-300 ${
        isUnlocked ? 'hover:scale-110' : 'opacity-50 grayscale'
      } ${bounce && isUnlocked ? 'animate-bounce' : ''}`}
      style={{ animation: isHovered ? 'float 2s ease-in-out infinite' : 'none' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      <div className={`w-24 h-24 sm:w-32 sm:h-32 rounded-3xl bg-gradient-to-br ${world.background} flex items-center justify-center shadow-lg border-4 ${isUnlocked ? 'border-white' : 'border-gray-500'}`}>
        <span className="text-4xl sm:text-5xl">{world.emoji}</span>
      </div>
      <p className="text-center text-white font-bold mt-2 text-sm sm:text-base drop-shadow-lg">
        {world.name}
      </p>
      {isUnlocked && (
        <div className="absolute -top-2 -right-2 bg-yellow-400 rounded-full w-8 h-8 flex items-center justify-center shadow-lg">
          <span className="text-xs font-bold">{completedMissions.length}/{missionCount}</span>
        </div>
      )}
      {!isUnlocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 rounded-3xl">
          <span className="text-3xl">🔒</span>
        </div>
      )}
      {isUnlocked && completedMissions.length === missionCount && (
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-green-500 rounded-full px-2 py-0.5 shadow-lg">
          <span className="text-xs font-bold text-white">✅</span>
        </div>
      )}
    </div>
  )
}

const BackpackCenter = ({ onClick, collectedCount }) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleClick = () => {
    setIsOpen(!isOpen)
    onClick()
  }

  return (
    <div
      className="relative cursor-pointer transition-all duration-300 hover:scale-110"
      onClick={handleClick}
      style={{ animation: 'float 4s ease-in-out infinite' }}
    >
      <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-2xl border-4 border-white pulse-glow">
        <span className="text-6xl sm:text-7xl">{isOpen ? '🎒✨' : '🎒'}</span>
      </div>
      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-white rounded-full px-3 py-1 shadow-lg">
        <span className="text-sm font-bold text-purple-700">{collectedCount} parole</span>
      </div>
      {collectedCount > 0 && (
        <div className="absolute -top-2 -right-2 bg-yellow-400 rounded-full w-8 h-8 flex items-center justify-center animate-bounce shadow-lg">
          <span className="text-lg">⭐</span>
        </div>
      )}
    </div>
  )
}

const WorldMap = ({ onWorldSelect, onBackpackOpen, profile, onShowStickers }) => {
  const [progress, setProgress] = useState(loadProgress())
  const [showIntro, setShowIntro] = useState(true)

  const refreshProgress = useCallback(() => {
    setProgress(loadProgress())
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => setShowIntro(false), 3000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const interval = setInterval(refreshProgress, 1000)
    return () => clearInterval(interval)
  }, [refreshProgress])

  const handleWorldClick = (worldId) => {
    refreshProgress()
    const updatedProgress = loadProgress()
    if (updatedProgress.unlockedWorlds.includes(worldId)) {
      onWorldSelect(worldId)
    }
  }

  const handleBackpackClick = () => {
    onBackpackOpen()
  }

  const worldPositions = [
    { top: '8%', left: '10%' },
    { top: '8%', right: '10%' },
    { top: '45%', left: '3%', transform: 'translateY(-50%)' },
    { top: '45%', right: '3%', transform: 'translateY(-50%)' },
    { bottom: '10%', left: '50%', transform: 'translateX(-50%)' },
  ]

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500">
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes sparkle {
          0%, 100% { opacity: 0; transform: scale(0); }
          50% { opacity: 1; transform: scale(1); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(255,255,255,0.3); }
          50% { box-shadow: 0 0 40px rgba(255,255,255,0.6); }
        }
        .sparkle { animation: sparkle 2s ease-in-out infinite; }
        .slide-up { animation: slideUp 0.8s ease-out; }
        .pulse-glow { animation: pulse-glow 3s ease-in-out infinite; }
      `}</style>

      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute text-white sparkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 12 + 8}px`,
              animationDelay: `${Math.random() * 2}s`,
              opacity: Math.random() * 0.5 + 0.3,
            }}
          >
            ✨
          </div>
        ))}
      </div>

      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute top-20 left-10 text-6xl" style={{ animation: 'float 6s ease-in-out infinite' }}>☁️</div>
        <div className="absolute top-32 right-20 text-5xl" style={{ animation: 'float 8s ease-in-out infinite', animationDelay: '1s' }}>☁️</div>
        <div className="absolute bottom-40 left-1/4 text-4xl" style={{ animation: 'float 7s ease-in-out infinite', animationDelay: '2s' }}>☁️</div>
      </div>

      <div className="absolute top-6 left-1/2 transform -translate-x-1/2 text-center slide-up z-10">
        {profile && (
          <div className="flex items-center gap-3 mb-2 justify-center">
            <AvatarDisplay avatarUrl={profile.avatarUrl} childName={profile.childName} size="sm" showName={false} />
            <h1 className="text-2xl sm:text-3xl font-bold text-white drop-shadow-lg">
              🎒 Magic Backpack 🌈
            </h1>
          </div>
        )}
        {!profile && (
          <h1 className="text-2xl sm:text-3xl font-bold text-white drop-shadow-lg">
            🎒 Magic Backpack 🌈
          </h1>
        )}
        <p className="text-white text-opacity-80 mt-1 text-sm">Scegli un mondo per iniziare!</p>
      </div>

      {WORLDS.map((world, index) => (
        <div key={world.id} className="absolute" style={worldPositions[index]}>
          <WorldCard
            world={world}
            isUnlocked={progress.unlockedWorlds.includes(world.id)}
            progress={progress}
            onClick={handleWorldClick}
          />
        </div>
      ))}

      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <BackpackCenter
          onClick={handleBackpackClick}
          collectedCount={progress.collectedWords.length}
        />
      </div>

      <div className="absolute bottom-4 left-4 flex gap-2">
        <button
          className="bg-white bg-opacity-20 text-white rounded-full px-3 py-2 text-xs font-bold hover:bg-opacity-40 transition-all"
          onClick={onShowStickers}
        >
          🎨 Adesivi
        </button>
        <button
          className="bg-white bg-opacity-20 text-white rounded-full px-3 py-2 text-xs font-bold hover:bg-opacity-40 transition-all"
          onClick={() => {
            if (confirm('Vuoi resettare tutti i progressi?')) {
              localStorage.removeItem('magic-backpack-progress')
              localStorage.removeItem('magic-backpack-stickers')
              window.location.reload()
            }
          }}
        >
          👨 Genitori
        </button>
      </div>

      {showIntro && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl p-8 text-center max-w-sm mx-4" style={{ animation: 'slideUp 0.5s ease-out' }}>
            {profile?.avatarUrl && (
              <div className="mb-4 flex justify-center">
                <AvatarDisplay avatarUrl={profile.avatarUrl} childName={profile.childName} size="lg" />
              </div>
            )}
            <div className="text-7xl mb-4">🎒🌈</div>
            <h2 className="text-2xl font-bold text-purple-700 mb-3">
              {profile ? `Ciao ${profile.childName}! 👋` : 'Benvenuto!'}
            </h2>
            <p className="text-gray-600 mb-4">Tocca un mondo colorato per iniziare l'avventura!</p>
            <div className="bg-purple-100 rounded-xl p-3 mb-4">
              <p className="text-sm text-purple-700 font-bold">🎯 Come funziona:</p>
              <p className="text-xs text-purple-600 mt-1">1. Tocca gli oggetti per ascoltare</p>
              <p className="text-xs text-purple-600">2. Trascina nello zaino per raccogliere</p>
              <p className="text-xs text-purple-600">3. Completa 6 missioni per sbloccare il prossimo mondo!</p>
            </div>
            <div className="text-4xl animate-bounce">👆</div>
          </div>
        </div>
      )}
    </div>
  )
}

export default WorldMap
