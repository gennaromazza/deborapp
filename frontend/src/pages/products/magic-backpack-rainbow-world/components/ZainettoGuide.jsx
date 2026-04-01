import { useState, useEffect } from 'react'

const ZAINETTO_MESSAGES = {
  welcome: [
    "Ciao! Sono Zainetto! 🎒✨",
    "Benvenuto! Giochiamo insieme!",
  ],
  tap: [
    "Tocca per ascoltare! 👆",
    "Tocca l'oggetto! 👆🔊",
  ],
  drag: [
    "Trascina qui! 👆➡️🎒",
    "Metti nello zaino! 🎒",
  ],
  success: [
    "Bravissimo! 🎉✨",
    "Sei un campione! ⭐",
    "Fantastico! 🌟",
  ],
  error: [
    "Ops! Riprova! 💪",
    "Quasi! Ancora! 🌟",
  ],
  complete: [
    "Mondo completato! 🏆",
    "Sei fantastico! 🎉🌈",
  ],
  idle: [
    "Tocca qualcosa! 👆",
    "Cosa facciamo? 🤔",
  ],
}

export default function ZainettoGuide({ message, position = 'bottom-left', visible = true, audio }) {
  const [expression, setExpression] = useState('happy')
  const [currentMsg, setCurrentMsg] = useState('')
  const [bounce, setBounce] = useState(false)

  useEffect(() => {
    if (message) {
      setCurrentMsg(message)
      setBounce(true)
      setTimeout(() => setBounce(false), 600)

      if (message.includes('Bravo') || message.includes('fantastico') || message.includes('campione')) {
        setExpression('excited')
      } else if (message.includes('Ops') || message.includes('riprova')) {
        setExpression('thinking')
      } else {
        setExpression('happy')
      }
    }
  }, [message])

  if (!visible) return null

  const positionClasses = {
    'bottom-left': 'bottom-24 left-4',
    'bottom-right': 'bottom-24 right-4',
    'top-left': 'top-20 left-4',
    'top-right': 'top-20 right-4',
  }

  const getEmoji = () => {
    switch (expression) {
      case 'excited': return '🎒✨😆'
      case 'thinking': return '🎒🤔'
      case 'happy':
      default: return '🎒😊'
    }
  }

  return (
    <div className={`fixed ${positionClasses[position]} z-40 max-w-xs ${bounce ? 'animate-bounce' : ''}`}>
      <style>{`
        @keyframes popIn {
          0% { opacity: 0; transform: scale(0.5) translateY(10px); }
          70% { transform: scale(1.05); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        .pop-in { animation: popIn 0.4s ease-out; }
      `}</style>
      
      <div className="bg-white rounded-2xl shadow-xl border-2 border-purple-300 overflow-hidden pop-in">
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 px-3 py-2 flex items-center gap-2">
          <span className="text-2xl">{getEmoji()}</span>
          <span className="text-white font-bold text-sm">Zainetto</span>
        </div>
        <div className="p-3">
          <p className="text-gray-700 text-sm font-medium">{currentMsg}</p>
        </div>
      </div>
    </div>
  )
}
