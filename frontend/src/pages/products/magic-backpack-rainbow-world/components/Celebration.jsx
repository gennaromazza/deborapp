import { useState, useEffect, useRef } from 'react'

const WORLD_COLORS = {
  rainbow: ['#FF6B6B', '#4ECDC4', '#FFE66D', '#95E1D3', '#F38181'],
  pets: ['#FFE66D', '#FF8C42', '#D4A574', '#8B4513', '#F5DEB3'],
  wild: ['#2ECC71', '#27AE60', '#1ABC9C', '#16A085', '#82E0AA'],
  fruits: ['#FF6B6B', '#FFA500', '#FFD700', '#98FB98', '#FF69B4'],
  transport: ['#3498DB', '#2980B9', '#1ABC9C', '#9B59B6', '#34495E'],
}

export function DoorTransition({ isOpen, onComplete, children }) {
  const [stage, setStage] = useState('closed')

  useEffect(() => {
    if (isOpen) {
      setStage('opening')
      setTimeout(() => setStage('open'), 600)
      setTimeout(onComplete, 1200)
    } else {
      setStage('closing')
      setTimeout(() => setStage('closed'), 600)
    }
  }, [isOpen])

  return (
    <div className={`fixed inset-0 z-50 pointer-events-none transition-all duration-700 ${
      stage === 'closed' ? 'opacity-0' : 'opacity-100'
    }`}>
      <div className={`absolute inset-0 bg-purple-900 transition-transform duration-700 origin-left ${
        stage === 'opening' ? 'translate-x-full' : stage === 'open' ? 'translate-x-full' : 'translate-x-0'
      }`} style={{ clipPath: 'polygon(0 0, 100% 0, 50% 50%, 100% 100%, 0 100%)' }} />
      <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
        stage === 'open' ? 'opacity-100' : 'opacity-0'
      }`}>
        {children}
      </div>
      <div className={`absolute inset-0 bg-purple-900 transition-transform duration-700 origin-right ${
        stage === 'opening' ? '-translate-x-full' : stage === 'open' ? '-translate-x-full' : 'translate-x-0'
      }`} style={{ clipPath: 'polygon(0 0, 50% 50, 100% 0, 100% 100%, 0 100%)' }} />
    </div>
  )
}

export function BackpackDance({ isDancing, children }) {
  return (
    <div className={`inline-block ${isDancing ? 'animate-bounce' : ''}`} style={{
      animation: isDancing ? 'backpackDance 0.5s ease-in-out infinite' : 'none',
    }}>
      <style>{`
        @keyframes backpackDance {
          0%, 100% { transform: translateY(0) rotate(0deg) scale(1); }
          25% { transform: translateY(-20px) rotate(-10deg) scale(1.1); }
          50% { transform: translateY(0) rotate(0deg) scale(1); }
          75% { transform: translateY(-15px) rotate(10deg) scale(1.05); }
        }
      `}</style>
      {children}
    </div>
  )
}

export function ParticleExplosion({ active, colorPalette = WORLD_COLORS.rainbow, onComplete }) {
  const canvasRef = useRef(null)
  const particles = useRef([])
  const animationRef = useRef(null)

  useEffect(() => {
    if (!active) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const centerX = canvas.width / 2
    const centerY = canvas.height / 2

    particles.current = Array.from({ length: 100 }, () => ({
      x: centerX,
      y: centerY,
      vx: (Math.random() - 0.5) * 20,
      vy: (Math.random() - 0.5) * 20 - 10,
      size: Math.random() * 8 + 4,
      color: colorPalette[Math.floor(Math.random() * colorPalette.length)],
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 10,
      life: 1,
    }))

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      let alive = false

      particles.current.forEach(p => {
        if (p.life <= 0) return
        alive = true

        p.x += p.vx
        p.y += p.vy
        p.vy += 0.5
        p.rotation += p.rotationSpeed
        p.life -= 0.015

        ctx.save()
        ctx.translate(p.x, p.y)
        ctx.rotate(p.rotation * Math.PI / 180)
        ctx.globalAlpha = p.life
        ctx.fillStyle = p.color
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size)
        ctx.restore()
      })

      if (alive) {
        animationRef.current = requestAnimationFrame(animate)
      } else if (onComplete) {
        onComplete()
      }
    }

    animate()

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [active, colorPalette, onComplete])

  if (!active) return null

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-40"
    />
  )
}

export function SparkleBurst({ active, x, y }) {
  const [sparkles, setSparkles] = useState([])

  useEffect(() => {
    if (!active) return
    const newSparkles = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      angle: (i / 12) * 360,
      distance: 0,
    }))
    setSparkles(newSparkles)

    let frame = 0
    const interval = setInterval(() => {
      frame++
      if (frame > 20) {
        setSparkles([])
        clearInterval(interval)
        return
      }
      setSparkles(prev => prev.map(s => ({
        ...s,
        distance: frame * 8,
        opacity: 1 - frame / 20,
      })))
    }, 30)

    return () => clearInterval(interval)
  }, [active])

  return (
    <div
      className="fixed pointer-events-none z-50"
      style={{ left: x, top: y, transform: 'translate(-50%, -50%)' }}
    >
      {sparkles.map(s => (
        <div
          key={s.id}
          className="absolute text-2xl"
          style={{
            transform: `rotate(${s.angle}deg) translateY(${s.distance}px)`,
            opacity: s.opacity,
          }}
        >
          ✨
        </div>
      ))}
    </div>
  )
}

export default function Celebration({ type, active, onComplete, worldColors }) {
  const [showDoor, setShowDoor] = useState(false)
  const [showParticles, setShowParticles] = useState(false)
  const [showSparkles, setShowSparkles] = useState(false)
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    if (!active) return

    switch (type) {
      case 'world_complete':
        setShowDoor(true)
        setTimeout(() => setShowParticles(true), 300)
        break
      case 'mission_complete':
        setShowSparkles(true)
        setSparklePos({ x: window.innerWidth / 2, y: window.innerHeight / 2 })
        setTimeout(() => setShowSparkles(false), 1000)
        break
      default:
        break
    }

    if (onComplete) {
      setTimeout(onComplete, 2000)
    }
  }, [active, type, onComplete])

  const colors = worldColors ? WORLD_COLORS[worldColors] : WORLD_COLORS.rainbow

  return (
    <>
      {showDoor && (
        <div className="fixed inset-0 bg-purple-900 z-50 flex items-center justify-center">
          <div className="text-6xl animate-pulse">🎒✨🌟</div>
        </div>
      )}
      <ParticleExplosion
        active={showParticles}
        colorPalette={colors}
        onComplete={() => setShowParticles(false)}
      />
      <SparkleBurst active={showSparkles} x={sparklePos.x} y={sparklePos.y} />
    </>
  )
}