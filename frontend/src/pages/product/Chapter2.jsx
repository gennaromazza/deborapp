import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Check, Trophy } from 'lucide-react'

const pages = [
  { id: 1, type: 'story', emoji: '🍎', title: 'Il Mercato delle Addizioni', content: (
    <div className="space-y-4">
      <div className="w-full h-48 bg-gradient-to-b from-pastel-peach/50 to-pastel-pink/50 rounded-2xl flex items-center justify-center mb-6">
        <span className="text-7xl">🍎➕🧺</span>
      </div>
      <p className="font-body text-gray-600 leading-relaxed">
        Dopo aver attraversato il Bosco dei Numeri, Nino Numero e Lila Linea arrivarono in una piazza piena di profumi, colori e vocine allegre.
      </p>
      <p className="font-body text-gray-600 leading-relaxed">
        C'erano bancarelle di mele lucide, cestini di fragole, fiori colorati e perfino un banco che vendeva biscotti a forma di numero.
      </p>
      <div className="bg-pastel-pink/30 rounded-xl p-4 text-center">
        <p className="font-display font-bold text-pastel-pink-dark text-lg">"Benvenuti al Mercato delle Addizioni!"</p>
      </div>
      <p className="font-body text-gray-600 leading-relaxed">
        "Qui si impara a mettere insieme," diceva un'insegna appesa tra due lampioni.
      </p>
      <p className="font-body text-gray-600 leading-relaxed">
        L'addizione serve proprio a questo: <strong>unire, aggiungere, completare</strong>. 🛍️✨➕
      </p>
    </div>
  )},
  { id: 2, type: 'activity', emoji: '🧺', title: 'Unire due gruppi', content: (
    <div className="space-y-4">
      <p className="font-body text-gray-600 leading-relaxed">
        L'addizione può cominciare così: <strong>ho un gruppo</strong> e <strong>lo unisco a un altro gruppo</strong>.
      </p>
      <div className="bg-pastel-lavender/30 rounded-xl p-4 text-center">
        <p className="font-body text-gray-600">3 mele + 2 mele = <strong>5 mele</strong></p>
        <p className="font-display font-bold text-pastel-lavender-dark text-xl mt-1">3 + 2 = 5</p>
      </div>
      <p className="font-body text-gray-600 leading-relaxed">
        Il segno <strong>+</strong> vuol dire <strong>aggiungi</strong>, <strong>metti insieme</strong>.
      </p>
    </div>
  ), activity: { type: 'fill', question: 'Cestini amici! Completa:', exercises: [
    { sequence: '2 pere + 3 pere = __', answer: '5' },
    { sequence: '4 limoni + 1 limone = __', answer: '5' },
    { sequence: '5 fragole + 2 fragole = __', answer: '7' },
    { sequence: '3 ciliegie + 3 ciliegie = __', answer: '6' },
  ]}},
  { id: 3, type: 'activity', emoji: '⏩', title: 'Contare avanti', content: (
    <div className="space-y-4">
      <p className="font-body text-gray-600 leading-relaxed">
        A volte non serve ricontare tutto da capo. Possiamo partire da un numero e <strong>andare avanti</strong>.
      </p>
      <div className="bg-pastel-lavender/30 rounded-xl p-4 text-center">
        <p className="font-body text-gray-600">5 + 3: Parti da 5, fai 3 passi avanti:</p>
        <p className="font-display font-bold text-pastel-lavender-dark text-xl mt-1">6, 7, 8 → 5 + 3 = 8</p>
      </div>
    </div>
  ), activity: { type: 'fill', question: 'Salti nel mercato!', exercises: [
    { sequence: '4 + 2 = __', answer: '6' },
    { sequence: '6 + 1 = __', answer: '7' },
    { sequence: '7 + 3 = __', answer: '10' },
    { sequence: '9 + 2 = __', answer: '11' },
    { sequence: '10 + 4 = __', answer: '14' },
  ]}},
  { id: 4, type: 'activity', emoji: '🏪', title: 'La bancarella dei frutti', content: (
    <div className="space-y-4">
      <p className="font-body text-gray-600 leading-relaxed">
        Il fruttivendolo del mercato aveva un problema: i cartellini con le somme si erano staccati!
      </p>
      <p className="font-body text-gray-600 leading-relaxed">
        <strong>Piccolo pensiero furbo:</strong> A volte addizioni diverse portano allo stesso risultato.
      </p>
    </div>
  ), activity: { type: 'fill', question: 'Rimetti i cartellini!', exercises: [
    { sequence: '2 + 2 = __', answer: '4' },
    { sequence: '5 + 1 = __', answer: '6' },
    { sequence: '4 + 3 = __', answer: '7' },
    { sequence: '6 + 2 = __', answer: '8' },
    { sequence: '7 + 1 = __', answer: '8' },
  ]}},
  { id: 5, type: 'activity', emoji: '🪙', title: 'Monete e spese', content: (
    <div className="space-y-4">
      <p className="font-body text-gray-600 leading-relaxed">
        Nel Mercato delle Addizioni si comprava usando solo monete da <strong>1</strong> e da <strong>2</strong>.
      </p>
      <p className="font-body text-gray-600 leading-relaxed">
        Per fare 4 puoi usare: 2+2, oppure 1+1+2, oppure 1+1+1+1
      </p>
    </div>
  ), activity: { type: 'fill', question: 'Paga il prezzo giusto!', exercises: [
    { sequence: 'Panino da 3: __ + __ = 3', answer: '1+2' },
    { sequence: 'Fiore da 4: __ + __ = 4', answer: '2+2' },
    { sequence: 'Mela da 5: __ + __ = 5', answer: '2+3' },
    { sequence: 'Biscotti da 6: __ + __ = 6', answer: '3+3' },
  ]}},
  { id: 6, type: 'activity', emoji: '🔟', title: 'Le coppie amiche del 10', content: (
    <div className="space-y-4">
      <p className="font-body text-gray-600 leading-relaxed">
        Ci sono numeri che stanno benissimo insieme perché formano <strong>10</strong>. Sono le <strong>coppie amiche del 10</strong>.
      </p>
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-pastel-pink/50 rounded-xl p-3 text-center font-mono font-bold">1 + 9 = 10</div>
        <div className="bg-pastel-lavender/50 rounded-xl p-3 text-center font-mono font-bold">2 + 8 = 10</div>
        <div className="bg-pastel-mint/50 rounded-xl p-3 text-center font-mono font-bold">3 + 7 = 10</div>
        <div className="bg-pastel-sky/50 rounded-xl p-3 text-center font-mono font-bold">4 + 6 = 10</div>
        <div className="bg-pastel-yellow/50 rounded-xl p-3 text-center font-mono font-bold col-span-2">5 + 5 = 10</div>
      </div>
    </div>
  ), activity: { type: 'fill', question: 'Completa il 10!', exercises: [
    { sequence: '1 + __ = 10', answer: '9' },
    { sequence: '2 + __ = 10', answer: '8' },
    { sequence: '4 + __ = 10', answer: '6' },
    { sequence: '7 + __ = 10', answer: '3' },
    { sequence: '9 + __ = 10', answer: '1' },
  ]}},
  { id: 7, type: 'activity', emoji: '🏆', title: 'Somme furbe', content: (
    <div className="space-y-4">
      <p className="font-body text-gray-600 leading-relaxed">
        È il momento della sfida! Ogni tenda del mercato ha un livello diverso.
      </p>
      <p className="font-body text-gray-600 leading-relaxed">
        <strong>Suggerimento:</strong> Per fare 8 + 3, puoi pensare: 8 + 2 = 10, poi ancora 1 = 11.
      </p>
    </div>
  ), activity: { type: 'fill', question: 'Sfida a livelli!', exercises: [
    { sequence: '1 + 2 = __', answer: '3' },
    { sequence: '3 + 2 = __', answer: '5' },
    { sequence: '8 + 2 = __', answer: '10' },
    { sequence: '9 + 3 = __', answer: '12' },
    { sequence: '8 + 3 = __', answer: '11' },
    { sequence: '9 + 4 = __', answer: '13' },
  ]}},
  { id: 8, type: 'activity', emoji: '🔍', title: 'La grande cerca nel mercato', content: (
    <div className="space-y-4">
      <p className="font-body text-gray-600 leading-relaxed">
        Osserva con calma la grande piazza del mercato. Qui ogni cosa può diventare una somma!
      </p>
    </div>
  ), activity: { type: 'count', question: 'Cerca e somma!', items: [
    { emoji: '🍎', count: 4, label: 'mele rosse' },
    { emoji: '🍏', count: 3, label: 'mele verdi' },
    { emoji: '🌻', count: 6, label: 'fiori gialli' },
    { emoji: '🪙', count: 7, label: 'monete' },
  ]}},
  { id: 9, type: 'checklist', emoji: '✅', title: 'Quello che ora so fare', content: (
    <div className="space-y-4">
      <p className="font-body text-gray-600 leading-relaxed">
        Ben fatto! Hai quasi conquistato il distintivo del Mercato delle Addizioni.
      </p>
    </div>
  ), checklist: [
    'So unire due gruppi',
    'So leggere un\'addizione',
    'So usare il segno +',
    'So contare avanti per trovare un risultato',
    'So trovare alcune coppie amiche del 10',
    'So spiegare una strategia semplice',
  ]},
  { id: 10, type: 'challenge', emoji: '🏆', title: 'Super Missione Finale', content: (
    <div className="space-y-4">
      <p className="font-body text-gray-600 leading-relaxed">
        Teo Tempo batté le mani. "Ultima prova! Chi supera la Super Missione diventa un vero Mercante delle Somme."
      </p>
    </div>
  ), challenge: { title: 'Super Missione', exercises: [
    { question: '3 + 4 = __', answer: '7', type: 'fill' },
    { question: '5 + 2 = __', answer: '7', type: 'fill' },
    { question: '8 + 1 = __', answer: '9', type: 'fill' },
    { question: '10 + 3 = __', answer: '13', type: 'fill' },
    { question: '6 + __ = 10', answer: '4', type: 'fill' },
    { question: '2 + __ = 10', answer: '8', type: 'fill' },
  ], badge: { title: 'Mercante delle Addizioni', emoji: '🧺', description: 'Hai conquistato il cestino dorato!' }}},
]

export default function Chapter2({ chapterId, currentPage, onPageChange, onCompletePage, onEarnBadge, progress, onNextChapter, onPrevChapter }) {
  const [answers, setAnswers] = useState({})
  const [checkedItems, setCheckedItems] = useState({})
  const [badgeEarned, setBadgeEarned] = useState(false)
  const page = pages[currentPage]
  if (!page) return null

  const handleAnswer = (i, v) => setAnswers(prev => ({ ...prev, [`${page.id}-${i}`]: v }))
  const handleCheck = (i) => setCheckedItems(prev => ({ ...prev, [i]: !prev[i] }))
  const isPageComplete = () => {
    if (page.type === 'story') return true
    if (page.type === 'checklist') return Object.values(checkedItems).filter(Boolean).length >= 3
    if (page.type === 'challenge') return page.challenge.exercises.every((_, i) => answers[`${page.id}-${i}`])
    if (page.activity?.exercises) return page.activity.exercises.every((_, i) => answers[`${page.id}-${i}`])
    return true
  }

  const handleNext = () => {
    if (isPageComplete()) onCompletePage(chapterId, page.id)
    if (currentPage < pages.length - 1) onPageChange(currentPage + 1)
    else if (!badgeEarned) { setBadgeEarned(true); onEarnBadge(chapterId) }
  }

  const renderActivity = () => {
    if (page.type === 'checklist') return (
      <div className="bg-pastel-lavender/30 rounded-2xl p-5 mt-4">
        <div className="space-y-3">
          {page.checklist.map((item, i) => (
            <label key={i} className="flex items-center gap-3 cursor-pointer">
              <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${checkedItems[i] ? 'bg-pastel-pink-dark border-pastel-pink-dark' : 'border-pastel-lavender-dark'}`} onClick={() => handleCheck(i)}>
                {checkedItems[i] && <Check className="w-4 h-4 text-white" />}
              </div>
              <span className="font-body text-gray-600">⭐ {item}</span>
            </label>
          ))}
        </div>
      </div>
    )
    if (page.type === 'challenge') return (
      <div className="bg-gradient-to-br from-pastel-yellow/50 to-pastel-peach/50 rounded-2xl p-5 mt-4">
        <h3 className="font-display font-bold text-lg text-gray-800 mb-4 flex items-center gap-2"><Trophy className="w-5 h-5 text-pastel-yellow-dark" />{page.challenge.title}</h3>
        <div className="space-y-3">
          {page.challenge.exercises.map((ex, i) => {
            const k = `${page.id}-${i}`, a = answers[k], ok = a?.toLowerCase().replace(/\s/g, '') === ex.answer.toLowerCase().replace(/\s/g, '')
            return (<div key={i} className="bg-white/60 rounded-xl p-3"><p className="font-body text-gray-700 mb-2">{ex.question}</p><input type="text" value={a || ''} onChange={(e) => handleAnswer(i, e.target.value)} className={`input-field text-sm ${ok ? 'border-pastel-mint-dark bg-pastel-mint/30' : ''}`} placeholder="?" />{ok && <p className="text-pastel-mint-dark text-sm flex items-center gap-1 mt-1"><Check className="w-4 h-4" /> Corretto!</p>}</div>)
          })}
        </div>
        {badgeEarned && (<motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200 }} className="mt-6 text-center p-6 bg-white/80 rounded-2xl border-2 border-pastel-yellow"><span className="text-5xl block mb-3">{page.challenge.badge.emoji}</span><p className="font-display font-bold text-xl text-gray-800 mb-1">{page.challenge.badge.title}</p><p className="font-body text-gray-500">{page.challenge.badge.description}</p></motion.div>)}
      </div>
    )
    if (page.activity?.type === 'fill') return (
      <div className="bg-pastel-lavender/30 rounded-2xl p-5 mt-4">
        <h3 className="font-display font-bold text-lg text-gray-800 mb-4">{page.activity.question}</h3>
        <div className="space-y-3">
          {page.activity.exercises.map((ex, i) => {
            const k = `${page.id}-${i}`, a = answers[k], ok = a?.toLowerCase().replace(/\s/g, '') === ex.answer.toLowerCase().replace(/\s/g, '')
            return (<div key={i} className="bg-white/60 rounded-xl p-3"><p className="font-body text-gray-700 mb-2">{ex.sequence}</p><input type="text" value={a || ''} onChange={(e) => handleAnswer(i, e.target.value)} className={`input-field text-sm ${ok ? 'border-pastel-mint-dark bg-pastel-mint/30' : ''}`} placeholder="?" />{ok && <p className="text-pastel-mint-dark text-sm flex items-center gap-1 mt-1"><Check className="w-4 h-4" /> Corretto!</p>}</div>)
          })}
        </div>
      </div>
    )
    if (page.activity?.type === 'count') return (
      <div className="bg-pastel-lavender/30 rounded-2xl p-5 mt-4">
        <h3 className="font-display font-bold text-lg text-gray-800 mb-4">{page.activity.question}</h3>
        <div className="space-y-3">
          {page.activity.items.map((item, i) => {
            const k = `${page.id}-${i}`, a = answers[k], ok = a === String(item.count)
            return (<div key={i} className="bg-white/60 rounded-xl p-3 flex items-center justify-between"><div className="flex items-center gap-2"><span className="text-xl">{item.emoji}</span><span className="font-body text-gray-600">Quanti {item.label}?</span></div><div className="flex items-center gap-2"><input type="number" value={a || ''} onChange={(e) => handleAnswer(i, e.target.value)} className={`input-field text-sm w-16 text-center ${ok ? 'border-pastel-mint-dark bg-pastel-mint/30' : ''}`} placeholder="?" min="0" max="20" />{ok && <Check className="w-5 h-5 text-pastel-mint-dark" />}</div></div>)
          })}
        </div>
      </div>
    )
    return null
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <button onClick={() => currentPage > 0 && onPageChange(currentPage - 1)} disabled={currentPage === 0} className="flex items-center gap-2 px-4 py-2 rounded-xl font-body font-medium text-gray-500 hover:text-pastel-pink-dark disabled:opacity-30 disabled:cursor-not-allowed transition-all"><ChevronLeft className="w-5 h-5" /><span className="hidden sm:inline">Indietro</span></button>
        <span className="font-body text-sm text-gray-400">Pagina {currentPage + 1} di {pages.length}</span>
        <button onClick={handleNext} className="flex items-center gap-2 px-4 py-2 rounded-xl font-body font-medium text-pastel-pink-dark hover:bg-pastel-pink/50 transition-all"><span className="hidden sm:inline">{currentPage < pages.length - 1 ? 'Avanti' : 'Fine'}</span><ChevronRight className="w-5 h-5" /></button>
      </div>
      <motion.div key={currentPage} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="card p-6 md:p-8">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-3xl">{page.emoji}</span>
          <div><span className="text-xs font-body font-semibold text-pastel-lavender-dark uppercase tracking-wide">Pagina {page.id}</span><h2 className="font-display font-bold text-xl text-gray-800">{page.title}</h2></div>
          {progress.includes(page.id) && (<span className="ml-auto badge badge-mint"><Check className="w-3.5 h-3.5" />Completata</span>)}
        </div>
        {page.content}{renderActivity()}
        <div className="flex justify-center gap-1.5 mt-8">{pages.map((_, i) => (<button key={i} onClick={() => onPageChange(i)} className={`w-2.5 h-2.5 rounded-full transition-all ${i === currentPage ? 'bg-pastel-pink-dark w-6' : progress.includes(pages[i].id) ? 'bg-pastel-mint-dark' : 'bg-pastel-lavender'}`} />))}</div>
      </motion.div>
      <div className="flex items-center justify-between mt-6">
        <button onClick={onPrevChapter} className="btn-ghost flex items-center gap-2 text-sm"><ChevronLeft className="w-4 h-4" />Capitolo precedente</button>
        {currentPage === pages.length - 1 && (<button onClick={onNextChapter} className="btn-primary flex items-center gap-2 text-sm">Prossimo capitolo<ChevronRight className="w-4 h-4" /></button>)}
      </div>
    </div>
  )
}
