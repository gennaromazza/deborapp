import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Check, Trophy } from 'lucide-react'

const pages = [
  { id: 1, type: 'story', emoji: '🏝️', title: "L'Isola delle Tabelline", content: (
    <div className="space-y-4">
      <div className="w-full h-48 bg-gradient-to-b from-pastel-sky/50 to-pastel-mint/50 rounded-2xl flex items-center justify-center mb-6"><span className="text-7xl">🏝️🔢🏴‍☠️</span></div>
      <p className="font-body text-gray-600 leading-relaxed">Dopo il Castello delle Sottrazioni, Nino Numero, Lila Linea, Teo Tempo, Dado Giallo e Ada Idee salirono su una piccola barca a vela.</p>
      <p className="font-body text-gray-600 leading-relaxed">In lontananza comparve un'isola piena di palme, corde, pontili e bandiere colorate. Sulla spiaggia, una grande tavola di legno diceva:</p>
      <div className="bg-pastel-sky/30 rounded-xl p-4 text-center"><p className="font-display font-bold text-pastel-sky-dark text-lg">"Benvenuti all'Isola delle Tabelline."</p></div>
      <p className="font-body text-gray-600 leading-relaxed">"Quando ci sono gruppi uguali, la matematica inventa una scorciatoia bellissima: la <strong>moltiplicazione</strong>."</p>
      <p className="font-body text-gray-600 leading-relaxed">Capitan Multiplo salutò da un pontile. "Io sono Capitan Multiplo! Qui troverete tesori, salti giganti e file ordinate." 🏴‍☠️✨🔢</p>
    </div>
  )},
  { id: 2, type: 'activity', emoji: '💰', title: 'Gruppi uguali', content: (
    <div className="space-y-4">
      <p className="font-body text-gray-600 leading-relaxed">La moltiplicazione comincia quando troviamo <strong>gruppi tutti uguali</strong>.</p>
      <div className="bg-pastel-sky/30 rounded-xl p-4 text-center"><p className="font-body text-gray-600">3 sacchetti × 2 monete = <strong>6 monete</strong></p><p className="font-display font-bold text-pastel-sky-dark text-xl mt-1">3 × 2 = 6</p></div>
      <p className="font-body text-gray-600 leading-relaxed">3 gruppi da 2 fanno 6.</p>
    </div>
  ), activity: { type: 'fill', question: 'Sacchetti del tesoro!', exercises: [
    { sequence: '2 sacchetti da 3 monete = __', answer: '6' },
    { sequence: '4 sacchetti da 2 monete = __', answer: '8' },
    { sequence: '3 casse da 4 perle = __', answer: '12' },
    { sequence: '5 ciotole da 2 conchiglie = __', answer: '10' },
  ]}},
  { id: 3, type: 'activity', emoji: '🔄', title: 'Addizione ripetuta', content: (
    <div className="space-y-4">
      <p className="font-body text-gray-600 leading-relaxed">La moltiplicazione è come un'addizione ripetuta.</p>
      <div className="bg-pastel-sky/30 rounded-xl p-4 text-center"><p className="font-body text-gray-600">4 gruppi da 3: 3 + 3 + 3 + 3 = 12</p><p className="font-display font-bold text-pastel-sky-dark text-xl mt-1">4 × 3 = 12</p></div>
    </div>
  ), activity: { type: 'fill', question: 'Trasforma la somma!', exercises: [
    { sequence: '2 + 2 + 2 = __ × __ = __', answer: '3×2=6' },
    { sequence: '3 + 3 + 3 = __ × __ = __', answer: '3×3=9' },
    { sequence: '4 + 4 = __ × __ = __', answer: '2×4=8' },
    { sequence: '5 + 5 + 5 = __ × __ = __', answer: '3×5=15' },
  ]}},
  { id: 4, type: 'activity', emoji: '🦘', title: 'I salti del capitano', content: (
    <div className="space-y-4">
      <p className="font-body text-gray-600 leading-relaxed">Capitan Multiplo tracciò una lunga linea sulla sabbia. "Le tabelline si possono anche camminare!"</p>
      <div className="bg-pastel-sky/30 rounded-xl p-4 text-center"><p className="font-body text-gray-600">4 × 2: salti di 2, quattro volte</p><p className="font-display font-bold text-pastel-sky-dark text-xl mt-1">2, 4, 6, 8 → 4 × 2 = 8</p></div>
    </div>
  ), activity: { type: 'fill', question: 'Salta sulla sabbia!', exercises: [
    { sequence: '3 salti da 2 = __', answer: '6' },
    { sequence: '4 salti da 3 = __', answer: '12' },
    { sequence: '5 salti da 2 = __', answer: '10' },
    { sequence: '3 salti da 4 = __', answer: '12' },
  ]}},
  { id: 5, type: 'activity', emoji: '📊', title: 'Le griglie del tesoro', content: (
    <div className="space-y-4">
      <p className="font-body text-gray-600 leading-relaxed">Quando gli oggetti sono disposti in righe e colonne, possiamo contarli più facilmente.</p>
      <div className="bg-pastel-sky/30 rounded-xl p-4 text-center"><p className="font-body text-gray-600">2 righe da 3 conchiglie = 6</p><p className="font-display font-bold text-pastel-sky-dark text-xl mt-1">2 × 3 = 6</p></div>
    </div>
  ), activity: { type: 'fill', question: 'Conta per righe!', exercises: [
    { sequence: '2 righe da 4 = __', answer: '8' },
    { sequence: '3 righe da 3 = __', answer: '9' },
    { sequence: '4 righe da 2 = __', answer: '8' },
    { sequence: '5 righe da 2 = __', answer: '10' },
  ]}},
  { id: 6, type: 'activity', emoji: '📋', title: 'Le prime tabelline amiche', content: (
    <div className="space-y-4">
      <p className="font-body text-gray-600 leading-relaxed">Ada portò tutti sotto una tenda fatta di vele colorate. Lì c'erano tre tavole appese.</p>
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-pastel-pink/50 rounded-xl p-3 text-center"><p className="font-display font-bold text-pastel-pink-dark">Tabellina del 2</p><p className="font-mono text-sm mt-1">2, 4, 6, 8, 10</p></div>
        <div className="bg-pastel-lavender/50 rounded-xl p-3 text-center"><p className="font-display font-bold text-pastel-lavender-dark">Tabellina del 3</p><p className="font-mono text-sm mt-1">3, 6, 9, 12, 15</p></div>
        <div className="bg-pastel-mint/50 rounded-xl p-3 text-center"><p className="font-display font-bold text-pastel-mint-dark">Tabellina del 4</p><p className="font-mono text-sm mt-1">4, 8, 12, 16, 20</p></div>
      </div>
    </div>
  ), activity: { type: 'fill', question: 'Completa la sequenza!', exercises: [
    { sequence: '2, 4, 6, __, __', answer: '8,10' },
    { sequence: '3, 6, 9, __, __', answer: '12,15' },
    { sequence: '4, 8, 12, __, __', answer: '16,20' },
  ]}},
  { id: 7, type: 'activity', emoji: '🏆', title: 'Moltiplicazioni furbe', content: (
    <div className="space-y-4">
      <p className="font-body text-gray-600 leading-relaxed">È il momento della sfida. Ogni zona dell'isola ti chiede una strategia diversa.</p>
    </div>
  ), activity: { type: 'fill', question: 'Sfida a livelli!', exercises: [
    { sequence: '3 gruppi da 2 = __', answer: '6' },
    { sequence: '2 gruppi da 5 = __', answer: '10' },
    { sequence: '4 gruppi da 3 = __', answer: '12' },
    { sequence: '2 + 2 + 2 + 2 = __ × __ = __', answer: '4×2=8' },
    { sequence: '3 salti da 4 = __', answer: '12' },
    { sequence: '2 righe da 6 = __', answer: '12' },
  ]}},
  { id: 8, type: 'activity', emoji: '🔍', title: 'La grande cerca sull\'isola', content: (
    <div className="space-y-4">
      <p className="font-body text-gray-600 leading-relaxed">Osserva con calma l'Isola delle Tabelline. Qui i gruppi uguali sono nascosti ovunque.</p>
    </div>
  ), activity: { type: 'fill', question: 'Cerca e moltiplica!', exercises: [
    { sequence: '3 palme × 2 cocchi = __', answer: '6' },
    { sequence: '4 casse × 3 monete = __', answer: '12' },
    { sequence: '2 barche × 4 remi = __', answer: '8' },
    { sequence: '5 stelle × 2 puntini = __', answer: '10' },
  ]}},
  { id: 9, type: 'checklist', emoji: '✅', title: 'Quello che ora so fare', content: (
    <div className="space-y-4"><p className="font-body text-gray-600 leading-relaxed">Ben fatto. Hai quasi conquistato il distintivo dell'Isola delle Tabelline.</p></div>
  ), checklist: ['So riconoscere gruppi uguali', 'So contare per 2, per 3 e per 4', 'So trasformare un\'addizione ripetuta in moltiplicazione', 'So usare i salti sulla linea dei numeri', 'So leggere una griglia ordinata', 'So capire le prime tabelline in modo semplice']},
  { id: 10, type: 'challenge', emoji: '🏆', title: 'Super Missione Finale', content: (
    <div className="space-y-4"><p className="font-body text-gray-600 leading-relaxed">Capitan Multiplo aprì un piccolo forziere dorato. "Ultima prova! Chi supera la Super Missione diventa Custode delle Tabelline."</p></div>
  ), challenge: { title: 'Super Missione', exercises: [
    { question: '2 × 3 = __', answer: '6', type: 'fill' },
    { question: '4 × 2 = __', answer: '8', type: 'fill' },
    { question: '3 × 4 = __', answer: '12', type: 'fill' },
    { question: '5 × 2 = __', answer: '10', type: 'fill' },
    { question: '3 + 3 + 3 = __ × __ = __', answer: '3×3=9', type: 'fill' },
    { question: '2, 4, 6, __, __', answer: '8,10', type: 'fill' },
  ], badge: { title: 'Custode delle Tabelline', emoji: '🏅', description: 'Hai conquistato la stella marina dorata!' }}},
]

export default function Chapter4({ chapterId, currentPage, onPageChange, onCompletePage, onEarnBadge, progress, onNextChapter, onPrevChapter }) {
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
    if (page.type === 'checklist') return (<div className="bg-pastel-lavender/30 rounded-2xl p-5 mt-4"><div className="space-y-3">{page.checklist.map((item, i) => (<label key={i} className="flex items-center gap-3 cursor-pointer"><div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${checkedItems[i] ? 'bg-pastel-pink-dark border-pastel-pink-dark' : 'border-pastel-lavender-dark'}`} onClick={() => handleCheck(i)}>{checkedItems[i] && <Check className="w-4 h-4 text-white" />}</div><span className="font-body text-gray-600">⭐ {item}</span></label>))}</div></div>)
    if (page.type === 'challenge') return (<div className="bg-gradient-to-br from-pastel-yellow/50 to-pastel-peach/50 rounded-2xl p-5 mt-4"><h3 className="font-display font-bold text-lg text-gray-800 mb-4 flex items-center gap-2"><Trophy className="w-5 h-5 text-pastel-yellow-dark" />{page.challenge.title}</h3><div className="space-y-3">{page.challenge.exercises.map((ex, i) => { const k = `${page.id}-${i}`, a = answers[k], ok = a?.toLowerCase().replace(/\s/g, '') === ex.answer.toLowerCase().replace(/\s/g, ''); return (<div key={i} className="bg-white/60 rounded-xl p-3"><p className="font-body text-gray-700 mb-2">{ex.question}</p><input type="text" value={a || ''} onChange={(e) => handleAnswer(i, e.target.value)} className={`input-field text-sm ${ok ? 'border-pastel-mint-dark bg-pastel-mint/30' : ''}`} placeholder="?" />{ok && <p className="text-pastel-mint-dark text-sm flex items-center gap-1 mt-1"><Check className="w-4 h-4" /> Corretto!</p>}</div>) })}</div>{badgeEarned && (<motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200 }} className="mt-6 text-center p-6 bg-white/80 rounded-2xl border-2 border-pastel-yellow"><span className="text-5xl block mb-3">{page.challenge.badge.emoji}</span><p className="font-display font-bold text-xl text-gray-800 mb-1">{page.challenge.badge.title}</p><p className="font-body text-gray-500">{page.challenge.badge.description}</p></motion.div>)}</div>)
    if (page.activity?.type === 'fill') return (<div className="bg-pastel-lavender/30 rounded-2xl p-5 mt-4"><h3 className="font-display font-bold text-lg text-gray-800 mb-4">{page.activity.question}</h3><div className="space-y-3">{page.activity.exercises.map((ex, i) => { const k = `${page.id}-${i}`, a = answers[k], ok = a?.toLowerCase().replace(/\s/g, '') === ex.answer.toLowerCase().replace(/\s/g, ''); return (<div key={i} className="bg-white/60 rounded-xl p-3"><p className="font-body text-gray-700 mb-2">{ex.sequence}</p><input type="text" value={a || ''} onChange={(e) => handleAnswer(i, e.target.value)} className={`input-field text-sm ${ok ? 'border-pastel-mint-dark bg-pastel-mint/30' : ''}`} placeholder="?" />{ok && <p className="text-pastel-mint-dark text-sm flex items-center gap-1 mt-1"><Check className="w-4 h-4" /> Corretto!</p>}</div>) })}</div></div>)
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
        <div className="flex items-center gap-3 mb-6"><span className="text-3xl">{page.emoji}</span><div><span className="text-xs font-body font-semibold text-pastel-lavender-dark uppercase tracking-wide">Pagina {page.id}</span><h2 className="font-display font-bold text-xl text-gray-800">{page.title}</h2></div>{progress.includes(page.id) && (<span className="ml-auto badge badge-mint"><Check className="w-3.5 h-3.5" />Completata</span>)}</div>
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
