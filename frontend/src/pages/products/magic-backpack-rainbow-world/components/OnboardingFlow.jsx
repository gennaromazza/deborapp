import { useState, useCallback } from 'react'

export default function OnboardingFlow({ onComplete }) {
  const [step, setStep] = useState(0)
  const [childName, setChildName] = useState('')
  const [familyNames, setFamilyNames] = useState(['', '', '', ''])
  const [familyRoles, setFamilyRoles] = useState(['Mamma', 'Papà', 'Nonna', 'Amico/a'])
  const [photo, setPhoto] = useState(null)
  const [photoPreview, setPhotoPreview] = useState(null)
  const [consent, setConsent] = useState(false)
  const [avatarStyle, setAvatarStyle] = useState('cartoon')

  const handlePhotoUpload = useCallback((e) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (ev) => {
        setPhoto(file)
        setPhotoPreview(ev.target.result)
      }
      reader.readAsDataURL(file)
    }
  }, [])

  const handleFamilyNameChange = (index, value) => {
    const updated = [...familyNames]
    updated[index] = value
    setFamilyNames(updated)
  }

  const handleRoleChange = (index, value) => {
    const updated = [...familyRoles]
    updated[index] = value
    setFamilyRoles(updated)
  }

  const handleSubmit = () => {
    if (!childName.trim() || !consent) return

    const familyMembers = familyNames
      .filter(n => n.trim())
      .map((name, i) => ({
        name: name.trim(),
        role: familyRoles[i],
      }))

    onComplete({
      childName: childName.trim(),
      familyMembers,
      photo,
      photoPreview,
      avatarStyle,
      consentGiven: true,
    })
  }

  const steps = [
    // Step 0: Welcome
    <div key="welcome" className="text-center">
      <div className="text-7xl mb-6 animate-bounce">🎒✨</div>
      <h2 className="text-3xl font-bold text-purple-700 mb-4">Benvenuto nel Mondo Magico!</h2>
      <p className="text-gray-600 text-lg mb-6">
        Un'avventura interattiva dove l'inglese si impara giocando!
      </p>
      <div className="flex justify-center gap-4 text-4xl mb-6">
        <span>🌈</span><span>🐶</span><span>🦁</span><span>🍎</span><span>🚗</span>
      </div>
      <p className="text-gray-500">5 mondi da esplorare • Parole da collezionare • Divertimento assicurato!</p>
    </div>,

    // Step 1: Child Name
    <div key="child" className="text-center">
      <div className="text-6xl mb-6">👦</div>
      <h2 className="text-2xl font-bold text-purple-700 mb-6">Come si chiama il piccolo esploratore?</h2>
      <input
        type="text"
        value={childName}
        onChange={(e) => setChildName(e.target.value)}
        placeholder="Nome del bambino..."
        className="w-full max-w-xs px-6 py-4 text-xl text-center rounded-2xl border-4 border-purple-300 focus:border-purple-500 focus:outline-none"
        maxLength={20}
      />
      {childName && (
        <p className="mt-4 text-lg text-purple-600 font-bold">
          Ciao {childName}! 👋
        </p>
      )}
    </div>,

    // Step 2: Family Names
    <div key="family" className="text-center">
      <div className="text-6xl mb-4">👨‍👩‍👧‍👦</div>
      <h2 className="text-2xl font-bold text-purple-700 mb-2">Chi fa parte della squadra?</h2>
      <p className="text-gray-500 mb-6">Aggiungi fino a 4 persone speciali (opzionale)</p>
      <div className="space-y-3 max-w-sm mx-auto">
        {familyNames.map((name, i) => (
          <div key={i} className="flex items-center gap-2">
            <select
              value={familyRoles[i]}
              onChange={(e) => handleRoleChange(i, e.target.value)}
              className="px-3 py-2 rounded-xl border-2 border-purple-200 focus:border-purple-400 focus:outline-none text-sm"
            >
              <option>Mamma</option>
              <option>Papà</option>
              <option>Nonna</option>
              <option>Nonno</option>
              <option>Fratello</option>
              <option>Sorella</option>
              <option>Amico/a</option>
              <option>Zia</option>
              <option>Zio</option>
              <option>Maestra</option>
            </select>
            <input
              type="text"
              value={name}
              onChange={(e) => handleFamilyNameChange(i, e.target.value)}
              placeholder="Nome..."
              className="flex-1 px-4 py-2 rounded-xl border-2 border-purple-200 focus:border-purple-400 focus:outline-none"
              maxLength={20}
            />
          </div>
        ))}
      </div>
    </div>,

    // Step 3: Photo Upload
    <div key="photo" className="text-center">
      <div className="text-6xl mb-4">📸</div>
      <h2 className="text-2xl font-bold text-purple-700 mb-2">Aggiungi una foto di {childName || 'bambino'}</h2>
      <p className="text-gray-500 mb-6">Creeremo un avatar cartoon speciale!</p>
      
      <div className="relative w-48 h-48 mx-auto mb-6">
        {photoPreview ? (
          <div className="relative w-full h-full">
            <img
              src={photoPreview}
              alt="Avatar preview"
              className="w-full h-full object-cover rounded-3xl"
              style={{
                filter: 'saturate(1.5) contrast(1.1) brightness(1.05)',
              }}
            />
            <div className="absolute inset-0 rounded-3xl border-4 border-purple-400 pointer-events-none"></div>
            <div className="absolute -bottom-4 -right-4 text-5xl">🎒</div>
          </div>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-purple-200 to-pink-200 rounded-3xl flex items-center justify-center border-4 border-dashed border-purple-400">
            <span className="text-6xl">👤</span>
          </div>
        )}
      </div>

      <label className="inline-block bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-3 px-8 rounded-full cursor-pointer hover:scale-105 transition-transform">
        📁 Scegli Foto
        <input
          type="file"
          accept="image/*"
          onChange={handlePhotoUpload}
          className="hidden"
        />
      </label>
      <p className="text-xs text-gray-400 mt-3">JPG, PNG - Max 5MB</p>
    </div>,

    // Step 4: Consent
    <div key="consent" className="text-center">
      <div className="text-6xl mb-4">🔒</div>
      <h2 className="text-2xl font-bold text-purple-700 mb-4">Privacy e Consenso</h2>
      <div className="bg-white rounded-2xl p-6 text-left max-w-md mx-auto border-2 border-purple-200">
        <p className="text-sm text-gray-600 mb-4">
          Per personalizzare l'esperienza del bambino, raccogliamo:
        </p>
        <ul className="text-sm text-gray-600 space-y-2 mb-4">
          <li>✅ Nome del bambino (per dialoghi personalizzati)</li>
          <li>✅ Nomi familiari/amici (per dialoghi personalizzati)</li>
          <li>✅ Foto (solo per creare l'avatar cartoon)</li>
        </ul>
        <p className="text-sm text-gray-600 mb-4">
          <strong>I dati sono salvati in modo sicuro</strong> e non vengono condivisi con terzi.
          La foto viene trasformata in avatar e non viene mai utilizzata per altri scopi.
        </p>
        <p className="text-sm text-gray-600">
          Puoi cancellare tutti i dati in qualsiasi momento dalla sezione Genitori.
        </p>
      </div>
      <label className="flex items-center justify-center gap-3 mt-6 cursor-pointer">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="w-6 h-6 rounded border-purple-300 text-purple-600 focus:ring-purple-500"
        />
        <span className="text-gray-700 font-medium">
          Acconsento al trattamento dei dati per personalizzare l'esperienza
        </span>
      </label>
    </div>,
  ]

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-purple-500 via-pink-400 to-yellow-300 flex items-center justify-center z-50 p-4">
      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .slide-up { animation: slideUp 0.5s ease-out; }
      `}</style>

      <div className="bg-white rounded-3xl p-8 max-w-lg w-full shadow-2xl slide-up">
        {/* Progress bar */}
        <div className="flex gap-2 mb-8">
          {steps.map((_, i) => (
            <div
              key={i}
              className={`h-2 flex-1 rounded-full transition-all duration-300 ${
                i <= step ? 'bg-purple-500' : 'bg-gray-200'
              }`}
            />
          ))}
        </div>

        {/* Content */}
        <div className="min-h-[300px]">
          {steps[step]}
        </div>

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <button
            onClick={() => setStep(Math.max(0, step - 1))}
            className={`px-6 py-3 rounded-full font-bold transition-all ${
              step > 0
                ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                : 'invisible'
            }`}
          >
            ← Indietro
          </button>

          {step < steps.length - 1 ? (
            <button
              onClick={() => {
                if (step === 1 && !childName.trim()) return
                setStep(step + 1)
              }}
              className={`px-8 py-3 rounded-full font-bold transition-all ${
                step === 1 && !childName.trim()
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:scale-105'
              }`}
            >
              Avanti →
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={!consent}
              className={`px-8 py-3 rounded-full font-bold transition-all ${
                consent
                  ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:scale-105'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              🚀 Inizia l'Avventura!
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
