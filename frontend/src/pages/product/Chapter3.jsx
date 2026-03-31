import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Check, Trophy } from 'lucide-react'

const pages = [
  { id: 1, type: 'story', emoji: '🏰', title: 'Il Castello delle Sottrazioni', content: (
    <div className="space-y-4">
      <div className="w-full h-48 bg-gradient-to-b from-pastel-lavender/50 to-pastel-sky/50 rounded-2xl flex items-center justify-center mb-6"><span className="text-7xl">🏰➖🔍</span></div>
      <p className="font-body text-gray-600 leading-relaxed">Dopo il Mercato delle Addizioni, Nino Numero, Lila Linea e Teo Tempo arrivarono davanti a un castello altissimo.</p>
      <div className="bg-pastel-lavender/30 rounded-xl p-4 text-center"><p className="font-display font-bold text-pastel-lavender-dark text-lg">"Qui si scopre ciò che resta."</p></div>
      <p className="font-body text-gray-600 leading-relaxed">"Quando qualcosa va via, quando togliamo, quando manca un pezzetto… entra in gioco la <strong>sottrazione</strong>."</p>
      <p className="font-body text-gray-600 leading-relaxed">La sottrazione è una lente speciale: ti aiuta a vedere il <strong>dopo</strong>. ✨🏰➖</p>
    </div>
  )},
  { id: 2, type: 'activity', emoji: '🍪', title: 'Togliere e vedere cosa resta', content: (
    <div className="space-y-4">
      <p className="font-body text-gray-600 leading-relaxed">La sottrazione può cominciare così: <strong>ho un gruppo</strong> e <strong>tolgo qualche elemento</strong>.</p>
      <div className="bg-pastel-lavender/30 rounded-xl p-4 text-center"><p className="font-body text-gray-600">7 biscotti - 2 biscotti = <strong>5 biscotti</strong></p><p className="font-display font-bold text-pastel-lavender-dark text-xl mt-1">7 - 2 = 5</p></div>
      <p className="font-body text-gray-600 leading-relaxed">Il segno <strong>-</strong> vuol dire <strong>togli</strong>, <strong>porta via</strong>, <strong>fai diminuire</strong>.</p>
    </div>
  ), activity: { type: 'fill', question: 'Quanti restano?', exercises: [
    { sequence: '5 mele - 1 mela = __', answer: '4' },
    { sequence: '8 fiori - 3 fiori = __', answer: '5' },
    { sequence: '9 chiavi - 2 chiavi = __', answer: '7' },
    { sequence: '6 bandierine - 4 bandierine = __', answer: '2' },
  ]}},
  { id: 3, type: 'activity', emoji: '⬇️', title: 'Contare indietro', content: (
    <div className="space-y-4">
      <p className="font-body text-gray-600 leading-relaxed">A volte, per sottrarre, possiamo <strong>contare indietro</strong>.</p>
      <div className="bg-pastel-lavender/30 rounded-xl p-4 text-center"><p className="font-body text-gray-600">9 - 3: Parti da 9, scendi di 3 passi:</p><p className="font-display font-bold text-pastel-lavender-dark text-xl mt-1">8, 7, 6 → 9 - 3 = 6</p></div>
    </div>
  ), activity: { type: 'fill', question: 'Scendi i gradini!', exercises: [
    { sequence: '7 - 2 = __', answer: '5' },
    { sequence: '10 - 1 = __', answer: '9' },
    { sequence: '12 - 3 = __', answer: '9' },
    { sequence: '15 - 4 = __', answer: '11' },
    { sequence: '18 - 2 = __', answer: '16' },
  ]}},
  { id: 4, type: 'activity', emoji: '⚔️', title: 'I cavalieri mancanti', content: (
    <div className="space-y-4">
      <p className="font-body text-gray-600 leading-relaxed">Nel cortile del castello, i cavalieri si allenavano in fila. Ma alcuni andarono a prendere l'acqua.</p>
      <p className="font-body text-gray-600 leading-relaxed">A volte la sottrazione risponde alla domanda: <strong>"Quanti mancano?"</strong></p>
    </div>
  ), activity: { type: 'fill', question: 'Chi è andato via?', exercises: [
    { sequence: '10 - 3 = __', answer: '7' },
    { sequence: '8 - 3 = __', answer: '5' },
    { sequence: '6 - 2 = __', answer: '4' },
    { sequence: '9 - 4 = __', answer: '5' },
    { sequence: '7 - 3 = __', answer: '4' },
    { sequence: '10 - 6 = __', answer: '4' },
  ]}},
  { id: 5, type: 'activity', emoji: '🌉', title: 'Quanto manca per arrivare?', content: (
    <div className="space-y-4">
      <p className="font-body text-gray-600 leading-relaxed">"Se sono sul 6 e devo arrivare al 10… quanti passi mi mancano?"</p>
      <div className="bg-pastel-lavender/30 rounded-xl p-4 text-center"><p className="font-body text-gray-600">Da 6 a 10 servono 4 passi</p><p className="font-display font-bold text-pastel-lavender-dark text-xl mt-1">10 - 6 = 4</p></div>
    </div>
  ), activity: { type: 'fill', question: 'Completa il ponte!', exercises: [
    { sequence: 'Da 5 a 8 mancano __ passi', answer: '3' },
    { sequence: 'Da 7 a 10 mancano __ passi', answer: '3' },
    { sequence: 'Da 9 a 12 mancano __ passi', answer: '3' },
    { sequence: 'Da 11 a 15 mancano __ passi', answer: '4' },
  ]}},
  { id: 6, type: 'activity', emoji: '🏗️', title: 'La differenza tra due torri', content: (
    <div className="space-y-4">
      <p className="font-body text-gray-600 leading-relaxed">Nel castello c'erano due torri costruite con mattoncini. Una torre aveva 9 blocchi, l'altra ne aveva 6.</p>
      <div className="bg-pastel-lavender/30 rounded-xl p-4 text-center"><p className="font-display font-bold text-pastel-lavender-dark text-xl">9 - 6 = 3</p><p className="font-body text-gray-600 mt-1">La differenza è 3 blocchi!</p></div>
    </div>
  ), activity: { type: 'fill', question: 'Confronta le torri!', exercises: [
    { sequence: '8 e 5 → differenza __', answer: '3' },
    { sequence: '10 e 7 → differenza __', answer: '3' },
    { sequence: '12 e 9 → differenza __', answer: '3' },
    { sequence: '6 e 2 → differenza __', answer: '4' },
  ]}},
  { id: 7, type: 'activity', emoji: '🏆', title: 'Sottrazioni furbe', content: (
    <div className="space-y-4">
      <p className="font-body text-gray-600 leading-relaxed">Nel castello ci sono tre sale della sfida. Ogni sala ti chiede un modo diverso di pensare.</p>
    </div>
  ), activity: { type: 'fill', question: 'Sfida a livelli!', exercises: [
    { sequence: '5 - 2 = __', answer: '3' },
    { sequence: '7 - 1 = __', answer: '6' },
    { sequence: '10 - 2 = __', answer: '8' },
    { sequence: '12 - 1 = __', answer: '11' },
    { sequence: '14 - 3 = __', answer: '11' },
    { sequence: '16 - 5 = __', answer: '11' },
  ]}},
  { id: 8, type: 'activity', emoji: '🔍', title: 'La grande cerca nel castello', content: (
    <div className="space-y-4">
      <p className="font-body text-gray-600 leading-relaxed">Osserva con calma il grande castello. Qui ogni dettaglio può diventare una sottrazione.</p>
    </div>
  ), activity: { type: 'fill', question: 'Cerca e sottrai!', exercises: [
    { sequence: '9 torce - 3 spente = __ accese', answer: '6' },
    { sequence: '8 finestre - 2 chiuse = __ aperte', answer: '6' },
    { sequence: '7 chiavi - 4 usate = __ restano', answer: '3' },
    { sequence: '10 bandiere - 1 cade = __ restano', answer: '9' },
  ]}},
  { id: 9, type: 'checklist', emoji: '✅', title: 'Quello che ora so fare', content: (
    <div className="space-y-4"><p className="font-body text-gray-600 leading-relaxed">Ben fatto. Hai quasi conquistato il sigillo del Castello delle Sottrazioni.</p></div>
  ), checklist: ['So togliere elementi da un gruppo', 'So capire quanti restano', 'So contare indietro', 'So trovare quanto manca', 'So confrontare due quantità', 'So scegliere una strategia semplice']},
  { id: 10, type: 'challenge', emoji: '🏆', title: 'Super Missione Finale', content: (
    <div className="space-y-4"><p className="font-body text-gray-600 leading-relaxed">Dado Giallo fece una giravolta sul ponte levatoio. "Ultima prova! Chi supera la Super Missione diventa Guardiano delle Differenze."</p></div>
  ), challenge: { title: 'Super Missione', exercises: [
    { question: '8 - 3 = __', answer: '5', type: 'fill' },
    { question: '10 - 4 = __', answer: '6', type: 'fill' },
    { question: '12 - 2 = __', answer: '10', type: 'fill' },
    { question: '15 - 5 = __', answer: '10', type: 'fill' },
    { question: '__ + 2 = 9', answer: '7', type: 'fill' },
    { question: '9 e 6 → differenza __', answer: '3', type: 'fill' },
  ], badge: { title: 'Guardiano delle Differenze', emoji: '🛡️', description: 'Hai conquistato il sigillo del Castello!' }}},
]

export default function Chapter3({ chapterId, currentPage, onPageChange, onCompletePage, onEarnBadge, progress, onNextChapter, onPrevChapter }) {
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
