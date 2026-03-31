import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Star, Check, Sparkles, Trophy } from 'lucide-react'

const pages = [
  // Page 1 - Apertura narrativa
  {
    id: 1,
    type: 'story',
    emoji: '🌲',
    title: 'Il Bosco dei Numeri',
    content: (
      <div className="space-y-4">
        <div className="w-full h-48 bg-gradient-to-b from-pastel-mint/50 to-pastel-lavender/50 rounded-2xl flex items-center justify-center mb-6">
          <span className="text-7xl">🌲🔢✨</span>
        </div>
        <p className="font-body text-gray-600 leading-relaxed">
          Benvenuto nel <strong>Bosco dei Numeri</strong>!
        </p>
        <p className="font-body text-gray-600 leading-relaxed">
          Questa mattina <strong>Nino Numero</strong> e <strong>Lila Linea</strong> hanno trovato una porticina nascosta tra due alberi altissimi. Sulla porticina c'era scritto:
        </p>
        <div className="bg-pastel-lavender/30 rounded-xl p-4 text-center">
          <p className="font-display font-bold text-pastel-lavender-dark text-lg">
            "Entrate solo se sapete osservare, contare e scoprire."
          </p>
        </div>
        <p className="font-body text-gray-600 leading-relaxed">
          Nino strizzò gli occhi. "Osservare? Contare? Mi piace già!"
        </p>
        <p className="font-body text-gray-600 leading-relaxed">
          Lila spinse piano la porticina e… wow! Davanti a loro si aprì un bosco davvero speciale. Sui rami crescevano mele numerate, i sassi lungo il sentiero avevano piccole stelle, e persino i funghi sembravano messi lì in fila per dire qualcosa.
        </p>
        <p className="font-body text-gray-600 leading-relaxed">
          "Qui i numeri non stanno fermi nei quaderni," disse una vocina allegra. Da dietro un cespuglio comparve <strong>Ada Idee</strong> con un cappello pieno di foglietti colorati.
        </p>
        <p className="font-body text-gray-600 leading-relaxed">
          "Nel Bosco dei Numeri," spiegò Ada, "i numeri si cercano, si toccano, si contano e si mettono in ordine. Ogni volta che risolvi una missione, il bosco ti regala una chiave d'oro."
        </p>
        <p className="font-body text-gray-600 leading-relaxed">
          Nino si guardò intorno emozionato. "Da dove cominciamo?"
        </p>
        <p className="font-body text-gray-600 leading-relaxed">
          Ada sorrise. "Dal primo superpotere dei matemaghi: <strong>contare con attenzione</strong>." 🌟🔍🍃
        </p>
      </div>
    ),
  },
  // Page 2 - Contare davvero
  {
    id: 2,
    type: 'activity',
    emoji: '👀',
    title: 'Contare davvero',
    content: (
      <div className="space-y-4">
        <p className="font-body text-gray-600 leading-relaxed">
          Contare non significa dire i numeri in fretta. Contare bene significa <strong>toccare con gli occhi</strong> ogni cosa una sola volta.
        </p>
        <p className="font-body text-gray-600 leading-relaxed">
          Ada mostrò una cesta trovata vicino al sentiero. Dentro c'erano ghiande, foglie, bacche, funghetti e sassolini.
        </p>
        <div className="bg-pastel-cream rounded-xl p-4">
          <p className="font-display font-semibold text-gray-700 mb-3">Le tre mosse per contare bene:</p>
          <ol className="space-y-2">
            <li className="flex items-center gap-2"><span className="w-6 h-6 rounded-full bg-pastel-pink-dark text-white text-xs flex items-center justify-center font-bold">1</span><span className="font-body text-gray-600">Guarda tutti gli oggetti</span></li>
            <li className="flex items-center gap-2"><span className="w-6 h-6 rounded-full bg-pastel-lavender-dark text-white text-xs flex items-center justify-center font-bold">2</span><span className="font-body text-gray-600">Scegline uno alla volta</span></li>
            <li className="flex items-center gap-2"><span className="w-6 h-6 rounded-full bg-pastel-mint-dark text-white text-xs flex items-center justify-center font-bold">3</span><span className="font-body text-gray-600">Dì un numero per ogni oggetto</span></li>
          </ol>
        </div>
        <div className="bg-pastel-lavender/30 rounded-xl p-4">
          <p className="font-display font-semibold text-gray-700 mb-3">Esempio:</p>
          <div className="flex flex-wrap gap-3 justify-center text-2xl">
            <span>🌰</span><span>🍃🍃</span><span>🫐🫐🫐</span><span>🍄🍄🍄🍄</span><span>🪨🪨🪨🪨🪨</span>
          </div>
          <p className="font-body text-gray-600 text-center mt-2">
            1 ghianda, 2 foglie, 3 bacche, 4 funghetti, 5 sassolini
          </p>
        </div>
      </div>
    ),
    activity: {
      type: 'count',
      question: 'Occhi da gufo! Quanti oggetti vedi?',
      items: [
        { emoji: '🌰', count: 1, label: 'ghiande' },
        { emoji: '🍃', count: 2, label: 'foglie' },
        { emoji: '🫐', count: 3, label: 'bacche' },
        { emoji: '🍄', count: 4, label: 'funghetti' },
        { emoji: '🪨', count: 5, label: 'sassolini' },
      ],
    },
  },
  // Page 3 - Numero e quantità
  {
    id: 3,
    type: 'activity',
    emoji: '🔢',
    title: 'Numero e quantità',
    content: (
      <div className="space-y-4">
        <p className="font-body text-gray-600 leading-relaxed">
          Ogni numero è un simbolo. Quel simbolo ci aiuta a dire <strong>quanti oggetti</strong> ci sono.
        </p>
        <p className="font-body text-gray-600 leading-relaxed">
          Il numero <strong>3</strong> non è solo una cifra scritta. È anche:
        </p>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-pastel-pink/50 rounded-xl p-3 text-center">
            <span className="text-2xl">🍃🍃🍃</span>
            <p className="font-body text-sm text-gray-600">3 foglie</p>
          </div>
          <div className="bg-pastel-lavender/50 rounded-xl p-3 text-center">
            <span className="text-2xl">🦘🦘🦘</span>
            <p className="font-body text-sm text-gray-600">3 salti</p>
          </div>
          <div className="bg-pastel-mint/50 rounded-xl p-3 text-center">
            <span className="text-2xl">🪨🪨🪨</span>
            <p className="font-body text-sm text-gray-600">3 sassolini</p>
          </div>
          <div className="bg-pastel-sky/50 rounded-xl p-3 text-center">
            <span className="text-2xl">👏👏👏</span>
            <p className="font-body text-sm text-gray-600">3 battiti di mani</p>
          </div>
        </div>
        <p className="font-body text-gray-600 leading-relaxed">
          Nino trovò dei cartelli appesi a uno spago. Su ogni cartello c'era un numero. Poco più sotto, c'erano gruppi di oggetti del bosco.
        </p>
        <p className="font-body text-gray-600 leading-relaxed">
          "Bisogna fare gli abbinamenti giusti!" esclamò.
        </p>
      </div>
    ),
    activity: {
      type: 'match',
      question: 'Collega ogni numero al gruppo giusto!',
      pairs: [
        { number: 1, emoji: '🍄', label: '1 fungo' },
        { number: 2, emoji: '🦋🦋', label: '2 farfalle' },
        { number: 4, emoji: '🍃🍃🍃🍃', label: '4 foglie' },
        { number: 6, emoji: '🪨🪨🪨🪨🪨🪨', label: '6 sassolini' },
        { number: 8, emoji: '🫐🫐🫐🫐🫐🫐🫐🫐', label: '8 bacche' },
        { number: 10, emoji: '⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐', label: '10 stelle' },
      ],
    },
  },
  // Page 4 - Sentiero dei numeri mancanti
  {
    id: 4,
    type: 'activity',
    emoji: '🛤️',
    title: 'Il sentiero dei numeri mancanti',
    content: (
      <div className="space-y-4">
        <p className="font-body text-gray-600 leading-relaxed">
          Lila e Nino arrivarono davanti a un sentiero di pietre tonde. Su ogni pietra c'era un numero… ma alcune pietre erano vuote!
        </p>
        <div className="bg-pastel-lavender/30 rounded-xl p-4 text-center">
          <p className="font-display font-semibold text-gray-700">
            "Attenti," disse Ada, "solo chi sa trovare i numeri mancanti può passare."
          </p>
        </div>
        <div className="bg-pastel-cream rounded-xl p-4">
          <p className="font-display font-semibold text-gray-700 mb-2">Trucco da esploratore:</p>
          <p className="font-body text-gray-600">
            Quando i numeri vanno avanti di uno in uno, puoi dire nella mente: <strong>uno in più, uno in più, uno in più…</strong>
          </p>
        </div>
      </div>
    ),
    activity: {
      type: 'fill',
      question: 'Completa il sentiero!',
      exercises: [
        { sequence: '1, 2, __, 4, 5', answer: '3' },
        { sequence: '5, 6, 7, __, 9', answer: '8' },
        { sequence: '11, __, 13, 14, 15', answer: '12' },
        { sequence: '16, 17, __, 19, 20', answer: '18' },
        { sequence: '10, 9, 8, __, 6', answer: '7' },
      ],
    },
  },
  // Page 5 - Chi viene prima? Chi viene dopo?
  {
    id: 5,
    type: 'activity',
    emoji: '↔️',
    title: 'Prima e dopo',
    content: (
      <div className="space-y-4">
        <p className="font-body text-gray-600 leading-relaxed">
          Nel bosco, i numeri adorano stare in fila. Ogni numero ha un vicino <strong>prima</strong> e un vicino <strong>dopo</strong>.
        </p>
        <div className="bg-pastel-lavender/30 rounded-xl p-4 text-center">
          <p className="font-body text-gray-600">
            Esempio: Se il numero è <strong>8</strong>:
          </p>
          <div className="flex items-center justify-center gap-4 mt-2">
            <span className="px-3 py-1 bg-pastel-pink rounded-lg font-mono font-bold text-pastel-pink-dark">7</span>
            <span className="font-body text-gray-400">← prima</span>
            <span className="px-3 py-1 bg-pastel-lavender-dark text-white rounded-lg font-mono font-bold">8</span>
            <span className="font-body text-gray-400">dopo →</span>
            <span className="px-3 py-1 bg-pastel-mint rounded-lg font-mono font-bold text-pastel-mint-dark">9</span>
          </div>
        </div>
      </div>
    ),
    activity: {
      type: 'fill',
      question: 'Trova i vicini del numero!',
      exercises: [
        { sequence: 'Prima di 6 c\'è __', answer: '5' },
        { sequence: 'Dopo 6 c\'è __', answer: '7' },
        { sequence: 'Prima di 12 c\'è __', answer: '11' },
        { sequence: 'Dopo 12 c\'è __', answer: '13' },
        { sequence: 'In mezzo tra 4 e 6 c\'è __', answer: '5' },
        { sequence: 'In mezzo tra 9 e 11 c\'è __', answer: '10' },
        { sequence: 'In mezzo tra 14 e 16 c\'è __', answer: '15' },
      ],
    },
  },
  // Page 6 - Linea dei numeri
  {
    id: 6,
    type: 'activity',
    emoji: '📏',
    title: 'La linea dei numeri',
    content: (
      <div className="space-y-4">
        <p className="font-body text-gray-600 leading-relaxed">
          Ada tirò una corda tra due alberi. Poi appese tante piccole carte numerate.
        </p>
        <div className="bg-pastel-lavender/30 rounded-xl p-4 text-center">
          <p className="font-display font-semibold text-gray-700">
            "Questa," disse, "è la <strong>linea dei numeri</strong>. Serve per vedere dove sta ogni numero."
          </p>
        </div>
        <div className="bg-pastel-cream rounded-xl p-4">
          <p className="font-display font-semibold text-gray-700 mb-3">Attività da fare:</p>
          <ol className="space-y-2">
            <li className="font-body text-gray-600">1. Metti in ordine i numeri da 0 a 20</li>
            <li className="font-body text-gray-600">2. Indica il numero più piccolo</li>
            <li className="font-body text-gray-600">3. Indica il numero più grande</li>
            <li className="font-body text-gray-600">4. Salta dal 3 al 6 contando: 3, 4, 5, 6</li>
            <li className="font-body text-gray-600">5. Vai indietro dal 10 al 7</li>
          </ol>
        </div>
        <div className="bg-pastel-mint/50 rounded-xl p-4 text-center">
          <p className="font-body text-gray-600">
            <strong>Missione movimento:</strong> Fai 5 passi avanti. Poi 2 passi indietro. Quale numero raggiungi se parti da 4?
          </p>
          <p className="font-display font-bold text-pastel-mint-dark text-xl mt-2">Risposta: 7!</p>
        </div>
      </div>
    ),
    activity: {
      type: 'fill',
      question: 'Completa la linea dei numeri!',
      exercises: [
        { sequence: '0, 1, 2, 3, __, 5', answer: '4' },
        { sequence: '5, 6, 7, __, 9, 10', answer: '8' },
        { sequence: '10, 11, __, 13, 14', answer: '12' },
        { sequence: '15, 16, 17, __, 19', answer: '18' },
        { sequence: '8, 7, 6, __, 4', answer: '5' },
      ],
    },
  },
  // Page 7 - Più, meno, uguale
  {
    id: 7,
    type: 'activity',
    emoji: '⚖️',
    title: 'Più, meno, uguale',
    content: (
      <div className="space-y-4">
        <p className="font-body text-gray-600 leading-relaxed">
          Nino osservò due alberi di mele. Uno era pienissimo, l'altro un po' meno.
        </p>
        <p className="font-body text-gray-600 leading-relaxed">
          "Quando confrontiamo due quantità," spiegò Ada, "possiamo dire:
        </p>
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-pastel-pink/50 rounded-xl p-3 text-center">
            <span className="text-3xl font-bold text-pastel-pink-dark">{'>'}</span>
            <p className="font-body text-sm text-gray-600 mt-1">maggiore di</p>
          </div>
          <div className="bg-pastel-lavender/50 rounded-xl p-3 text-center">
            <span className="text-3xl font-bold text-pastel-lavender-dark">{'<'}</span>
            <p className="font-body text-sm text-gray-600 mt-1">minore di</p>
          </div>
          <div className="bg-pastel-mint/50 rounded-xl p-3 text-center">
            <span className="text-3xl font-bold text-pastel-mint-dark">=</span>
            <p className="font-body text-sm text-gray-600 mt-1">uguale a</p>
          </div>
        </div>
      </div>
    ),
    activity: {
      type: 'fill',
      question: 'Confronta con il simbolo giusto! (> < =)',
      exercises: [
        { sequence: '4 __ 9', answer: '<' },
        { sequence: '10 __ 2', answer: '>' },
        { sequence: '7 __ 7', answer: '=' },
        { sequence: '12 __ 15', answer: '<' },
        { sequence: '18 __ 11', answer: '>' },
        { sequence: '6 __ 6', answer: '=' },
        { sequence: '3 __ 8', answer: '<' },
      ],
    },
  },
  // Page 8 - Cerca e conta
  {
    id: 8,
    type: 'activity',
    emoji: '🔍',
    title: 'La grande cerca nel bosco',
    content: (
      <div className="space-y-4">
        <p className="font-body text-gray-600 leading-relaxed">
          Questa è la pagina degli occhi super attenti. Osserva con calma e completa.
        </p>
        <div className="w-full h-48 bg-gradient-to-b from-pastel-mint/50 to-pastel-lavender/50 rounded-2xl flex items-center justify-center">
          <span className="text-5xl">🌲🍄🦋🌸🐰🪨🌟</span>
        </div>
        <p className="font-body text-gray-600 leading-relaxed">
          Nel bosco trovi tanti elementi nascosti. Conta con attenzione!
        </p>
      </div>
    ),
    activity: {
      type: 'count',
      question: 'Cerca e conta nel bosco!',
      items: [
        { emoji: '🍄', count: 12, label: 'funghi' },
        { emoji: '🦋', count: 9, label: 'farfalle' },
        { emoji: '🌸', count: 6, label: 'fiori' },
        { emoji: '🪨', count: 15, label: 'sassolini' },
        { emoji: '🐰', count: 4, label: 'coniglietti' },
        { emoji: '🪧', count: 3, label: 'cartelli' },
      ],
    },
  },
  // Page 9 - Riepilogo
  {
    id: 9,
    type: 'checklist',
    emoji: '✅',
    title: 'Quello che ora so fare',
    content: (
      <div className="space-y-4">
        <p className="font-body text-gray-600 leading-relaxed">
          Bravo! Hai quasi conquistato la prima chiave d'oro del Bosco dei Numeri.
        </p>
        <p className="font-body text-gray-600 leading-relaxed">
          Metti una stellina accanto a quello che sai fare:
        </p>
      </div>
    ),
    checklist: [
      'So contare oggetti senza saltarne nessuno',
      'So collegare un numero alla quantità giusta',
      'So mettere i numeri in ordine',
      'So trovare il numero che manca',
      'So dire quale numero viene prima e quale dopo',
      'So confrontare due quantità',
    ],
  },
  // Page 10 - Super missione + Badge
  {
    id: 10,
    type: 'challenge',
    emoji: '🏆',
    title: 'Super Missione Finale',
    content: (
      <div className="space-y-4">
        <p className="font-body text-gray-600 leading-relaxed">
          Ada tirò fuori una piccola chiave dorata.
        </p>
        <div className="bg-pastel-lavender/30 rounded-xl p-4 text-center">
          <p className="font-display font-bold text-pastel-lavender-dark">
            "Chi completa la Super Missione diventa Esploratore dei Numeri!"
          </p>
        </div>
        <p className="font-body text-gray-600 leading-relaxed">
          Completa tutte le sfide per guadagnare il tuo badge! 🏅
        </p>
      </div>
    ),
    challenge: {
      title: 'Super Missione',
      exercises: [
        { question: 'Scrivi i numeri da 5 a 12 in ordine', answer: '5,6,7,8,9,10,11,12', type: 'text' },
        { question: 'Prima di 9 c\'è __', answer: '8', type: 'fill' },
        { question: 'Dopo 14 c\'è __', answer: '15', type: 'fill' },
        { question: 'In mezzo tra 18 e 20 c\'è __', answer: '19', type: 'fill' },
        { question: '11 __ 13 (>, <, =)', answer: '<', type: 'fill' },
        { question: '16 __ 16 (>, <, =)', answer: '=', type: 'fill' },
        { question: '19 __ 12 (>, <, =)', answer: '>', type: 'fill' },
      ],
      badge: {
        title: 'Esploratore del Bosco dei Numeri',
        emoji: '🌲',
        description: 'Hai conquistato la chiave d\'oro del Bosco dei Numeri!',
      },
    },
  },
]

export default function Chapter1({ chapterId, currentPage, onPageChange, onCompletePage, onEarnBadge, progress, onNextChapter, onPrevChapter }) {
  const [answers, setAnswers] = useState({})
  const [checkedItems, setCheckedItems] = useState({})
  const [badgeEarned, setBadgeEarned] = useState(false)

  const page = pages[currentPage]
  if (!page) return null

  const handleAnswer = (exerciseIndex, value) => {
    setAnswers(prev => ({ ...prev, [`${page.id}-${exerciseIndex}`]: value }))
  }

  const handleCheck = (index) => {
    setCheckedItems(prev => ({ ...prev, [index]: !prev[index] }))
  }

  const isPageComplete = () => {
    if (page.type === 'story') return true
    if (page.type === 'checklist') return Object.values(checkedItems).filter(Boolean).length >= 3
    if (page.type === 'challenge') {
      return page.challenge.exercises.every((_, i) => answers[`${page.id}-${i}`])
    }
    if (page.activity?.type === 'fill' || page.activity?.type === 'count') {
      return page.activity.exercises?.every((_, i) => answers[`${page.id}-${i}`])
    }
    return true
  }

  const handleNext = () => {
    if (isPageComplete()) {
      onCompletePage(chapterId, page.id)
    }
    if (currentPage < pages.length - 1) {
      onPageChange(currentPage + 1)
    } else if (currentPage === pages.length - 1 && !badgeEarned) {
      setBadgeEarned(true)
      onEarnBadge(chapterId)
    }
  }

  const handlePrev = () => {
    if (currentPage > 0) {
      onPageChange(currentPage - 1)
    }
  }

  const renderActivity = () => {
    if (!page.activity && page.type !== 'checklist' && page.type !== 'challenge') return null

    if (page.type === 'checklist') {
      return (
        <div className="bg-pastel-lavender/30 rounded-2xl p-5 mt-4">
          <div className="space-y-3">
            {page.checklist.map((item, i) => (
              <label key={i} className="flex items-center gap-3 cursor-pointer group">
                <div
                  className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${
                    checkedItems[i] ? 'bg-pastel-pink-dark border-pastel-pink-dark' : 'border-pastel-lavender-dark group-hover:border-pastel-pink-dark'
                  }`}
                  onClick={() => handleCheck(i)}
                >
                  {checkedItems[i] && <Check className="w-4 h-4 text-white" />}
                </div>
                <span className="font-body text-gray-600">⭐ {item}</span>
              </label>
            ))}
          </div>
        </div>
      )
    }

    if (page.type === 'challenge') {
      return (
        <div className="bg-gradient-to-br from-pastel-yellow/50 to-pastel-peach/50 rounded-2xl p-5 mt-4">
          <h3 className="font-display font-bold text-lg text-gray-800 mb-4 flex items-center gap-2">
            <Trophy className="w-5 h-5 text-pastel-yellow-dark" />
            {page.challenge.title}
          </h3>
          <div className="space-y-4">
            {page.challenge.exercises.map((ex, i) => {
              const answerKey = `${page.id}-${i}`
              const userAnswer = answers[answerKey]
              const isCorrect = userAnswer?.toLowerCase().replace(/\s/g, '') === ex.answer.toLowerCase().replace(/\s/g, '')

              return (
                <div key={i} className="bg-white/60 rounded-xl p-3">
                  <p className="font-body text-gray-700 mb-2">{ex.question}</p>
                  <input
                    type="text"
                    value={userAnswer || ''}
                    onChange={(e) => handleAnswer(i, e.target.value)}
                    className={`input-field text-sm ${isCorrect ? 'border-pastel-mint-dark bg-pastel-mint/30' : ''}`}
                    placeholder="La tua risposta..."
                  />
                  {isCorrect && (
                    <p className="text-pastel-mint-dark text-sm font-body mt-1 flex items-center gap-1">
                      <Check className="w-4 h-4" /> Corretto!
                    </p>
                  )}
                </div>
              )
            })}
          </div>
          {badgeEarned && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200 }}
              className="mt-6 text-center p-6 bg-white/80 rounded-2xl border-2 border-pastel-yellow"
            >
              <span className="text-5xl block mb-3">{page.challenge.badge.emoji}</span>
              <p className="font-display font-bold text-xl text-gray-800 mb-1">
                {page.challenge.badge.title}
              </p>
              <p className="font-body text-gray-500">{page.challenge.badge.description}</p>
            </motion.div>
          )}
        </div>
      )
    }

    if (page.activity?.type === 'fill') {
      return (
        <div className="bg-pastel-lavender/30 rounded-2xl p-5 mt-4">
          <h3 className="font-display font-bold text-lg text-gray-800 mb-4">
            {page.activity.question}
          </h3>
          <div className="space-y-3">
            {page.activity.exercises.map((ex, i) => {
              const answerKey = `${page.id}-${i}`
              const userAnswer = answers[answerKey]
              const isCorrect = userAnswer?.toLowerCase().replace(/\s/g, '') === ex.answer.toLowerCase().replace(/\s/g, '')

              return (
                <div key={i} className="bg-white/60 rounded-xl p-3">
                  <p className="font-body text-gray-700 mb-2">{ex.sequence}</p>
                  <input
                    type="text"
                    value={userAnswer || ''}
                    onChange={(e) => handleAnswer(i, e.target.value)}
                    className={`input-field text-sm ${isCorrect ? 'border-pastel-mint-dark bg-pastel-mint/30' : ''}`}
                    placeholder="?"
                  />
                  {isCorrect && (
                    <p className="text-pastel-mint-dark text-sm font-body mt-1 flex items-center gap-1">
                      <Check className="w-4 h-4" /> Corretto!
                    </p>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      )
    }

    if (page.activity?.type === 'count') {
      return (
        <div className="bg-pastel-lavender/30 rounded-2xl p-5 mt-4">
          <h3 className="font-display font-bold text-lg text-gray-800 mb-4">
            {page.activity.question}
          </h3>
          <div className="space-y-3">
            {page.activity.items.map((item, i) => {
              const answerKey = `${page.id}-${i}`
              const userAnswer = answers[answerKey]
              const isCorrect = userAnswer === String(item.count)

              return (
                <div key={i} className="bg-white/60 rounded-xl p-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{item.emoji}</span>
                    <span className="font-body text-gray-600">Quanti {item.label}?</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={userAnswer || ''}
                      onChange={(e) => handleAnswer(i, e.target.value)}
                      className={`input-field text-sm w-16 text-center ${isCorrect ? 'border-pastel-mint-dark bg-pastel-mint/30' : ''}`}
                      placeholder="?"
                      min="0"
                      max="20"
                    />
                    {isCorrect && <Check className="w-5 h-5 text-pastel-mint-dark" />}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )
    }

    return null
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Page header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={handlePrev}
          disabled={currentPage === 0}
          className="flex items-center gap-2 px-4 py-2 rounded-xl font-body font-medium text-gray-500 hover:text-pastel-pink-dark disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        >
          <ChevronLeft className="w-5 h-5" />
          <span className="hidden sm:inline">Indietro</span>
        </button>
        <span className="font-body text-sm text-gray-400">
          Pagina {currentPage + 1} di {pages.length}
        </span>
        <button
          onClick={handleNext}
          className="flex items-center gap-2 px-4 py-2 rounded-xl font-body font-medium text-pastel-pink-dark hover:bg-pastel-pink/50 transition-all"
        >
          <span className="hidden sm:inline">{currentPage < pages.length - 1 ? 'Avanti' : 'Fine'}</span>
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Page content */}
      <motion.div
        key={currentPage}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="card p-6 md:p-8"
      >
        <div className="flex items-center gap-3 mb-6">
          <span className="text-3xl">{page.emoji}</span>
          <div>
            <span className="text-xs font-body font-semibold text-pastel-lavender-dark uppercase tracking-wide">
              Pagina {page.id}
            </span>
            <h2 className="font-display font-bold text-xl text-gray-800">
              {page.title}
            </h2>
          </div>
          {progress.includes(page.id) && (
            <span className="ml-auto badge badge-mint">
              <Check className="w-3.5 h-3.5" />
              Completata
            </span>
          )}
        </div>

        {page.content}
        {renderActivity()}

        {/* Page progress dots */}
        <div className="flex justify-center gap-1.5 mt-8">
          {pages.map((_, i) => (
            <button
              key={i}
              onClick={() => onPageChange(i)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                i === currentPage
                  ? 'bg-pastel-pink-dark w-6'
                  : progress.includes(pages[i].id)
                  ? 'bg-pastel-mint-dark'
                  : 'bg-pastel-lavender'
              }`}
            />
          ))}
        </div>
      </motion.div>

      {/* Chapter navigation */}
      <div className="flex items-center justify-between mt-6">
        <button
          onClick={onPrevChapter}
          className="btn-ghost flex items-center gap-2 text-sm"
        >
          <ChevronLeft className="w-4 h-4" />
          Capitolo precedente
        </button>
        {currentPage === pages.length - 1 && (
          <button
            onClick={onNextChapter}
            className="btn-primary flex items-center gap-2 text-sm"
          >
            Prossimo capitolo
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  )
}
