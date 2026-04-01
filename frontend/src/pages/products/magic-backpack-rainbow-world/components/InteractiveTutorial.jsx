import { useState, useEffect } from 'react'

export default function InteractiveTutorial({ onComplete, audio }) {
  const [step, setStep] = useState(0)
  const [highlighted, setHighlighted] = useState(null)

  const steps = [
    {
      title: "Benvenuto! 👋",
      text: "Ti spiego come funziona il Magic Backpack!",
      emoji: "🎒",
      action: null,
    },
    {
      title: "Tocca per Ascoltare 👆",
      text: "Tocca un oggetto per sentire come si dice in inglese!",
      emoji: "🔊",
      action: "tap",
      demo: "apple",
    },
    {
      title: "Trascina nello Zaino 🎒",
      text: "Trascina gli oggetti nello zaino per raccoglierli!",
      emoji: "🎒",
      action: "drag",
    },
    {
      title: "Costruisci Frasi 📝",
      text: "Metti le parole in ordine per formare frasi in inglese!",
      emoji: "📝",
      action: null,
    },
    {
      title: "Ascolta e Ripeti 🗣️",
      text: "Ascolta la frase e poi ripetila! Non preoccuparti se sbagli!",
      emoji: "🗣️",
      action: null,
    },
    {
      title: "Completa la Frase ✍️",
      text: "Scegli la parola giusta per completare la frase!",
      emoji: "✍️",
      action: null,
    },
    {
      title: "Sblocca Mondi 🌍",
      text: "Completa tutte le missioni per sbloccare il mondo successivo!",
      emoji: "🌈",
      action: null,
    },
    {
      title: "Pronto? 🚀",
      text: "Ora tocca a te! Buon divertimento!",
      emoji: "🎉",
      action: null,
    },
  ]

  useEffect(() => {
    if (audio) {
      const messages = [
        "Benvenuto! Ti spiego come funziona!",
        "Tocca un oggetto per ascoltare la pronuncia!",
        "Trascina gli oggetti nello zaino per raccoglierli!",
        "Metti le parole in ordine per formare frasi!",
        "Ascolta la frase e poi ripetila!",
        "Scegli la parola giusta per completare!",
        "Completa le missioni per sbloccare nuovi mondi!",
        "Ora tocca a te! Buon divertimento!",
      ]
      audio.speakItalian(messages[step])
    }
  }, [step, audio])

  const currentStep = steps[step]

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
        .slide-up { animation: slideUp 0.5s ease-out; }
        .pulse { animation: pulse 2s ease-in-out infinite; }
      `}</style>

      <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl slide-up">
        <div className="flex gap-2 mb-6">
          {steps.map((_, i) => (
            <div
              key={i}
              className={`h-2 flex-1 rounded-full transition-all duration-300 ${
                i <= step ? 'bg-gradient-to-r from-purple-500 to-pink-500' : 'bg-gray-200'
              }`}
            />
          ))}
        </div>

        <div className="text-center mb-6">
          <div className="text-7xl mb-4 pulse">{currentStep.emoji}</div>
          <h2 className="text-2xl font-bold text-purple-700 mb-3">{currentStep.title}</h2>
          <p className="text-gray-600 text-lg">{currentStep.text}</p>
        </div>

        {currentStep.action === 'tap' && (
          <div className="bg-purple-100 rounded-xl p-4 mb-6 text-center">
            <div className="text-5xl mb-2">🍎</div>
            <p className="text-purple-700 font-bold">Tocca = Ascolta!</p>
          </div>
        )}

        {currentStep.action === 'drag' && (
          <div className="bg-pink-100 rounded-xl p-4 mb-6 text-center">
            <div className="text-3xl mb-2">👆 ➡️ 🎒</div>
            <p className="text-pink-700 font-bold">Trascina = Raccogli!</p>
          </div>
        )}

        <div className="flex justify-between">
          <button
            onClick={() => setStep(Math.max(0, step - 1))}
            className={`px-6 py-3 rounded-full font-bold transition-all ${
              step > 0 ? 'bg-gray-200 text-gray-700 hover:bg-gray-300' : 'invisible'
            }`}
          >
            ← Indietro
          </button>

          {step < steps.length - 1 ? (
            <button
              onClick={() => setStep(step + 1)}
              className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-full hover:scale-105 transition-transform"
            >
              Avanti →
            </button>
          ) : (
            <button
              onClick={onComplete}
              className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold rounded-full hover:scale-105 transition-transform"
            >
              🚀 Inizia!
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
