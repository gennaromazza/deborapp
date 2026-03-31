import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Check, Trophy } from 'lucide-react'

const pages = [
  { id: 1, type: 'story', emoji: '🏘️', title: 'Il Villaggio delle Forme e dei Percorsi', content: (
    <div className="space-y-4">
      <div className="w-full h-48 bg-gradient-to-b from-pastel-mint/50 to-pastel-sky/50 rounded-2xl flex items-center justify-center mb-6"><span className="text-7xl">🧭🔺🏡</span></div>
      <p className="font-body text-gray-600 leading-relaxed">Dopo la Città delle Divisioni Giuste, Nino Numero, Lila Linea, Teo Tempo, Dado Giallo e Ada Idee arrivarono in un luogo davvero sorprendente.</p>
      <p className="font-body text-gray-600 leading-relaxed">Le case sembravano disegnate con le forme del quaderno: alcune avevano il tetto a triangolo, altre finestre quadrate, altre ancora porte tonde come cerchi perfetti.</p>
      <div className="bg-pastel-mint/30 rounded-xl p-4 text-center"><p className="font-display font-bold text-pastel-mint-dark text-lg">"Benvenuti nel Villaggio delle Forme e dei Percorsi."</p></div>
      <p className="font-body text-gray-600 leading-relaxed">"Oggi impareremo a osservare dove si trovano le cose, che forma hanno e come si può arrivare da un posto all'altro."</p>
      <p className="font-body text-gray-600 leading-relaxed">Ada sorrise. "Chi saprà riconoscere forme e percorsi diventerà un vero Esploratore dello Spazio." 🗺️✨🏘️</p>
    </div>
  )},
  { id: 2, type: 'activity', emoji: '📍', title: 'Dove si trova?', content: (
    <div className="space-y-4">
      <p className="font-body text-gray-600 leading-relaxed">Per muoverci bene nello spazio dobbiamo usare parole speciali:</p>
      <div className="grid grid-cols-4 gap-2">
        {['sopra', 'sotto', 'dentro', 'fuori', 'vicino', 'lontano', 'destra', 'sinistra'].map((w, i) => (
          <div key={i} className="bg-pastel-lavender/50 rounded-xl p-2 text-center font-body font-medium text-gray-700 text-sm">{w}</div>
        ))}
      </div>
    </div>
  ), activity: { type: 'fill', question: 'Dove si trova?', exercises: [
    { sequence: 'Il gatto è __ il muretto (sopra/sotto)', answer: 'sopra' },
    { sequence: 'La palla è __ la panchina (sopra/sotto)', answer: 'sotto' },
    { sequence: 'Il fiore è __ il vaso (dentro/fuori)', answer: 'dentro' },
    { sequence: 'L\'aquilone è __ il recinto (dentro/fuori)', answer: 'fuori' },
  ]}},
  { id: 3, type: 'activity', emoji: '🗺️', title: 'Seguire un percorso', content: (
    <div className="space-y-4">
      <p className="font-body text-gray-600 leading-relaxed">Un percorso è una strada da seguire. Per descriverlo possiamo usare parole come:</p>
      <div className="flex flex-wrap gap-2 justify-center">
        {['avanti', 'indietro', 'gira a destra', 'gira a sinistra', 'attraversa', 'fermati'].map((w, i) => (
          <span key={i} className="px-3 py-1.5 bg-pastel-sky/50 rounded-full text-sm font-body font-medium text-gray-700">{w}</span>
        ))}
      </div>
      <p className="font-body text-gray-600 leading-relaxed">Esempio: Parti dalla fontana → Vai avanti → Gira a destra al grande albero → Arrivi alla panetteria.</p>
    </div>
  ), activity: { type: 'fill', question: 'Segui la mappa!', exercises: [
    { sequence: 'Parti dalla casa blu. Vai __ fino alla piazza.', answer: 'avanti' },
    { sequence: 'Gira a __ vicino al pozzo.', answer: 'destra' },
    { sequence: 'Vai avanti e arrivi al __.', answer: 'mercato' },
  ]}},
  { id: 4, type: 'activity', emoji: '🔷', title: 'La caccia alle forme', content: (
    <div className="space-y-4">
      <p className="font-body text-gray-600 leading-relaxed">Nel villaggio, le forme sono dappertutto. Le figure piane più importanti:</p>
      <div className="grid grid-cols-4 gap-3">
        <div className="bg-pastel-pink/50 rounded-xl p-3 text-center"><span className="text-3xl">⭕</span><p className="font-body text-sm mt-1">Cerchio</p></div>
        <div className="bg-pastel-lavender/50 rounded-xl p-3 text-center"><span className="text-3xl">⬜</span><p className="font-body text-sm mt-1">Quadrato</p></div>
        <div className="bg-pastel-mint/50 rounded-xl p-3 text-center"><span className="text-3xl">▬</span><p className="font-body text-sm mt-1">Rettangolo</p></div>
        <div className="bg-pastel-sky/50 rounded-xl p-3 text-center"><span className="text-3xl">🔺</span><p className="font-body text-sm mt-1">Triangolo</p></div>
      </div>
    </div>
  ), activity: { type: 'fill', question: 'Trova la forma giusta!', exercises: [
    { sequence: 'ruota → __', answer: 'cerchio' },
    { sequence: 'finestra piccola → __', answer: 'quadrato' },
    { sequence: 'porta → __', answer: 'rettangolo' },
    { sequence: 'tetto → __', answer: 'triangolo' },
  ]}},
  { id: 5, type: 'activity', emoji: '📦', title: 'I solidi del villaggio', content: (
    <div className="space-y-4">
      <p className="font-body text-gray-600 leading-relaxed">Alcune forme non sono piatte. Si possono toccare, girare, sollevare. Si chiamano <strong>solidi</strong>.</p>
      <div className="grid grid-cols-4 gap-3">
        <div className="bg-pastel-peach/50 rounded-xl p-3 text-center"><span className="text-3xl">🎲</span><p className="font-body text-sm mt-1">Cubo</p></div>
        <div className="bg-pastel-pink/50 rounded-xl p-3 text-center"><span className="text-3xl">⚽</span><p className="font-body text-sm mt-1">Sfera</p></div>
        <div className="bg-pastel-lavender/50 rounded-xl p-3 text-center"><span className="text-3xl">🥫</span><p className="font-body text-sm mt-1">Cilindro</p></div>
        <div className="bg-pastel-mint/50 rounded-xl p-3 text-center"><span className="text-3xl">🎉</span><p className="font-body text-sm mt-1">Cono</p></div>
      </div>
    </div>
  ), activity: { type: 'fill', question: 'Riconosci il solido!', exercises: [
    { sequence: 'Una palla ricorda una __', answer: 'sfera' },
    { sequence: 'Una scatola piccola ricorda un __', answer: 'cubo' },
    { sequence: 'Una lattina ricorda un __', answer: 'cilindro' },
    { sequence: 'Un cono gelato ricorda un __', answer: 'cono' },
  ]}},
  { id: 6, type: 'activity', emoji: '🪞', title: 'Lo specchio magico della simmetria', content: (
    <div className="space-y-4">
      <p className="font-body text-gray-600 leading-relaxed">Nel centro del villaggio c'era uno specchio magico. Mostrava solo una metà e chiedeva ai bambini di immaginare l'altra.</p>
      <p className="font-body text-gray-600 leading-relaxed">Quando due parti si corrispondono come in uno specchio, si parla di <strong>simmetria</strong>.</p>
      <p className="font-body text-gray-600 leading-relaxed">Cose simmetriche: una farfalla 🦋, una foglia 🍃, la lettera A.</p>
    </div>
  ), activity: { type: 'fill', question: 'Cerca le cose simmetriche! (sì/no)', exercises: [
    { sequence: 'Una farfalla è simmetrica? (sì/no)', answer: 'sì' },
    { sequence: 'Una palla è simmetrica? (sì/no)', answer: 'sì' },
    { sequence: 'Una nuvola storta è simmetrica? (sì/no)', answer: 'no' },
    { sequence: 'La lettera A è simmetrica? (sì/no)', answer: 'sì' },
  ]}},
  { id: 7, type: 'activity', emoji: '🏆', title: 'Percorsi e forme furbe', content: (
    <div className="space-y-4">
      <p className="font-body text-gray-600 leading-relaxed">È il momento della sfida. Ogni zona del villaggio ti mette alla prova in un modo diverso.</p>
    </div>
  ), activity: { type: 'fill', question: 'Sfida a livelli!', exercises: [
    { sequence: 'Il fiore è __ il vaso (dentro/fuori)', answer: 'dentro' },
    { sequence: 'Il cane è __ la staccionata (fuori/dentro)', answer: 'fuori' },
    { sequence: 'ruota → __', answer: 'cerchio' },
    { sequence: 'tetto → __', answer: 'triangolo' },
    { sequence: 'porta → __', answer: 'rettangolo' },
  ]}},
  { id: 8, type: 'activity', emoji: '🔍', title: 'La grande cerca nel villaggio', content: (
    <div className="space-y-4">
      <p className="font-body text-gray-600 leading-relaxed">Osserva con calma il Villaggio delle Forme e dei Percorsi. Ogni angolo nasconde una figura o una direzione.</p>
    </div>
  ), activity: { type: 'count', question: 'Cerca e trova!', items: [
    { emoji: '⭕', count: 5, label: 'cerchi' },
    { emoji: '🔺', count: 4, label: 'triangoli' },
    { emoji: '⬜', count: 3, label: 'quadrati' },
    { emoji: '▬', count: 6, label: 'rettangoli' },
  ]}},
  { id: 9, type: 'checklist', emoji: '✅', title: 'Quello che ora so fare', content: (
    <div className="space-y-4"><p className="font-body text-gray-600 leading-relaxed">Ben fatto. Hai quasi conquistato il distintivo del Villaggio delle Forme e dei Percorsi.</p></div>
  ), checklist: ['So descrivere dove si trova un oggetto', 'So seguire un piccolo percorso', 'So riconoscere cerchio, quadrato, rettangolo e triangolo', 'So distinguere alcune forme solide', 'So osservare una simmetria semplice', 'So usare una mappa illustrata']},
  { id: 10, type: 'challenge', emoji: '🏆', title: 'Super Missione Finale', content: (
    <div className="space-y-4"><p className="font-body text-gray-600 leading-relaxed">Lila Linea aprì la grande mappa del villaggio. "Ultima prova! Chi supera la Super Missione diventa Guida delle Forme e dei Percorsi."</p></div>
  ), challenge: { title: 'Super Missione', exercises: [
    { question: 'Il gatto è __ il tetto (sopra/sotto)', answer: 'sopra', type: 'fill' },
    { question: 'La palla è __ la panchina (sopra/sotto)', answer: 'sotto', type: 'fill' },
    { question: 'una ruota è un __', answer: 'cerchio', type: 'fill' },
    { question: 'una porta è un __', answer: 'rettangolo', type: 'fill' },
    { question: 'un tetto è un __', answer: 'triangolo', type: 'fill' },
    { question: 'palla → __ (solido)', answer: 'sfera', type: 'fill' },
    { question: 'scatola → __ (solido)', answer: 'cubo', type: 'fill' },
    { question: 'lattina → __ (solido)', answer: 'cilindro', type: 'fill' },
  ], badge: { title: 'Guida delle Forme e dei Percorsi', emoji: '🧭', description: 'Hai conquistato la freccia dorata!' }}},
]

export default function Chapter6({ chapterId, currentPage, onPageChange, onCompletePage, onEarnBadge, progress, onNextChapter, onPrevChapter }) {
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
    if (page.activity?.type === 'count') return (<div className="bg-pastel-lavender/30 rounded-2xl p-5 mt-4"><h3 className="font-display font-bold text-lg text-gray-800 mb-4">{page.activity.question}</h3><div className="space-y-3">{page.activity.items.map((item, i) => { const k = `${page.id}-${i}`, a = answers[k], ok = a === String(item.count); return (<div key={i} className="bg-white/60 rounded-xl p-3 flex items-center justify-between"><div className="flex items-center gap-2"><span className="text-xl">{item.emoji}</span><span className="font-body text-gray-600">Quanti {item.label}?</span></div><div className="flex items-center gap-2"><input type="number" value={a || ''} onChange={(e) => handleAnswer(i, e.target.value)} className={`input-field text-sm w-16 text-center ${ok ? 'border-pastel-mint-dark bg-pastel-mint/30' : ''}`} placeholder="?" min="0" max="20" />{ok && <Check className="w-5 h-5 text-pastel-mint-dark" />}</div></div>) })}</div></div>)
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
