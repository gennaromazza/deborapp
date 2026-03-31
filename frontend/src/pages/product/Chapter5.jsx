import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Check, Trophy } from 'lucide-react'

const pages = [
  { id: 1, type: 'story', emoji: '🍕', title: 'La Città delle Divisioni Giuste', content: (
    <div className="space-y-4">
      <div className="w-full h-48 bg-gradient-to-b from-pastel-peach/50 to-pastel-yellow/50 rounded-2xl flex items-center justify-center mb-6"><span className="text-7xl">🍕🤖➗</span></div>
      <p className="font-body text-gray-600 leading-relaxed">Dopo aver lasciato il Castello delle Sottrazioni, Nino Numero, Lila Linea, Teo Tempo e Dado Giallo arrivarono in una città davvero curiosa.</p>
      <p className="font-body text-gray-600 leading-relaxed">Le case erano tutte in fila, i vasi avevano la stessa distanza tra loro, le finestre sembravano messe con il righello.</p>
      <div className="bg-pastel-peach/30 rounded-xl p-4 text-center"><p className="font-display font-bold text-pastel-peach-dark text-lg">"Qui ogni cosa si divide con giustizia."</p></div>
      <p className="font-body text-gray-600 leading-relaxed">"Qui vuol dire soprattutto <strong>distribuire bene</strong>, <strong>fare gruppi uguali</strong>, <strong>non lasciare nessuno senza</strong>."</p>
      <p className="font-body text-gray-600 leading-relaxed">Robo-Ordina, un piccolo robot azzurro, salutò: "Nella Città delle Divisioni Giuste aiutiamo tutti a condividere in modo corretto." ⚙️✨➗</p>
    </div>
  )},
  { id: 2, type: 'activity', emoji: '🧁', title: 'Dividere in parti uguali', content: (
    <div className="space-y-4">
      <p className="font-body text-gray-600 leading-relaxed">La divisione può cominciare così: <strong>ho tanti oggetti</strong> e devo <strong>distribuirli in parti uguali</strong>.</p>
      <div className="bg-pastel-peach/30 rounded-xl p-4 text-center"><p className="font-body text-gray-600">8 dolcetti ÷ 4 piattini = <strong>2 per piattino</strong></p><p className="font-display font-bold text-pastel-peach-dark text-xl mt-1">8 diviso 4 = 2</p></div>
    </div>
  ), activity: { type: 'fill', question: 'Piattini giusti!', exercises: [
    { sequence: '6 biscotti ÷ 3 piatti = __ per piatto', answer: '2' },
    { sequence: '10 fragole ÷ 2 cestini = __ per cestino', answer: '5' },
    { sequence: '12 matite ÷ 4 barattoli = __ per barattolo', answer: '3' },
    { sequence: '9 fiori ÷ 3 vasi = __ per vaso', answer: '3' },
  ]}},
  { id: 3, type: 'activity', emoji: '📦', title: 'Fare gruppi uguali', content: (
    <div className="space-y-4">
      <p className="font-body text-gray-600 leading-relaxed">La divisione non serve solo a distribuire. Serve anche a <strong>formare gruppi tutti uguali</strong>.</p>
      <div className="bg-pastel-peach/30 rounded-xl p-4 text-center"><p className="font-body text-gray-600">12 palline in gruppi da 3 = 4 gruppi</p><p className="font-display font-bold text-pastel-peach-dark text-xl mt-1">12 diviso 3 = 4</p></div>
    </div>
  ), activity: { type: 'fill', question: 'Gruppi ordinati!', exercises: [
    { sequence: '8 palline in gruppi da 2 = __ gruppi', answer: '4' },
    { sequence: '15 biscotti in gruppi da 3 = __ gruppi', answer: '5' },
    { sequence: '12 mattoni in gruppi da 4 = __ gruppi', answer: '3' },
    { sequence: '10 caramelle in gruppi da 5 = __ gruppi', answer: '2' },
  ]}},
  { id: 4, type: 'activity', emoji: '🍕', title: 'La pizzeria delle fette giuste', content: (
    <div className="space-y-4">
      <p className="font-body text-gray-600 leading-relaxed">Nella pizzeria della città c'era una regola importantissima: <strong>tutti devono ricevere la stessa quantità</strong>.</p>
      <p className="font-body text-gray-600 leading-relaxed">Dividere bene significa fare attenzione agli altri. La matematica può essere anche un modo per essere giusti.</p>
    </div>
  ), activity: { type: 'fill', question: 'Dividi le pizze!', exercises: [
    { sequence: '8 fette ÷ 4 amici = __ a testa', answer: '2' },
    { sequence: '6 fette ÷ 3 amici = __ a testa', answer: '2' },
    { sequence: '10 fette ÷ 2 amici = __ a testa', answer: '5' },
    { sequence: '12 fette ÷ 6 amici = __ a testa', answer: '2' },
  ]}},
  { id: 5, type: 'activity', emoji: '🤖', title: 'Le scatole dei robot', content: (
    <div className="space-y-4">
      <p className="font-body text-gray-600 leading-relaxed">Robo-Ordina lavorava in un laboratorio pieno di scatole colorate. Ogni scatola doveva contenere lo stesso numero di oggetti.</p>
      <p className="font-body text-gray-600 leading-relaxed"><strong>Piccolo segreto:</strong> 12 ÷ 3 = 4 ma 12 ÷ 4 = 3. Stessi numeri, ma storia diversa!</p>
    </div>
  ), activity: { type: 'fill', question: 'Riempi le scatole!', exercises: [
    { sequence: '12 cubi ÷ 3 scatole = __ per scatola', answer: '4' },
    { sequence: '16 bottoni ÷ 4 scatole = __ per scatola', answer: '4' },
    { sequence: '18 perline ÷ 6 scatole = __ per scatola', answer: '3' },
    { sequence: '20 tappi ÷ 5 scatole = __ per scatola', answer: '4' },
  ]}},
  { id: 6, type: 'activity', emoji: '🍬', title: 'Quando avanza qualcosa', content: (
    <div className="space-y-4">
      <p className="font-body text-gray-600 leading-relaxed">A volte si può dividere quasi tutto… ma <strong>qualcosa avanza</strong>.</p>
      <div className="bg-pastel-peach/30 rounded-xl p-4 text-center"><p className="font-body text-gray-600">7 caramelle ÷ 2 sacchetti = 3 per sacchetto, avanza 1</p><p className="font-display font-bold text-pastel-peach-dark text-xl mt-1">7 ÷ 2 = 3 con resto 1</p></div>
      <p className="font-body text-gray-600 leading-relaxed">Quel pezzetto che avanza si chiama <strong>resto</strong>.</p>
    </div>
  ), activity: { type: 'fill', question: 'C\'è resto o non c\'è?', exercises: [
    { sequence: '7 ÷ 2 = 3 con resto __', answer: '1' },
    { sequence: '10 ÷ 3 = 3 con resto __', answer: '1' },
    { sequence: '9 ÷ 2 = 4 con resto __', answer: '1' },
    { sequence: '8 ÷ 4 = 2 con resto __', answer: '0' },
  ]}},
  { id: 7, type: 'activity', emoji: '🏆', title: 'Divisioni furbe', content: (
    <div className="space-y-4">
      <p className="font-body text-gray-600 leading-relaxed">È arrivato il momento della sfida. Ogni quartiere della città ha una missione diversa.</p>
    </div>
  ), activity: { type: 'fill', question: 'Sfida a livelli!', exercises: [
    { sequence: '6 ÷ 2 = __', answer: '3' },
    { sequence: '8 ÷ 4 = __', answer: '2' },
    { sequence: '12 ÷ 3 = __', answer: '4' },
    { sequence: '15 ÷ 5 = __', answer: '3' },
    { sequence: '7 ÷ 3 = __ con resto __', answer: '2r1' },
    { sequence: '11 ÷ 5 = __ con resto __', answer: '2r1' },
  ]}},
  { id: 8, type: 'activity', emoji: '🔍', title: 'La grande cerca nella città', content: (
    <div className="space-y-4">
      <p className="font-body text-gray-600 leading-relaxed">Osserva con calma la Città delle Divisioni Giuste. Ovunque ci sono gruppi da formare e cose da distribuire.</p>
    </div>
  ), activity: { type: 'fill', question: 'Cerca e dividi!', exercises: [
    { sequence: '8 biscotti ÷ 4 piatti = __', answer: '2' },
    { sequence: '12 fiori ÷ 3 vasi = __', answer: '4' },
    { sequence: '10 ruote ÷ 5 scatole = __', answer: '2' },
    { sequence: '9 palloncini ÷ 2 mazzi = __ con resto __', answer: '4r1' },
  ]}},
  { id: 9, type: 'checklist', emoji: '✅', title: 'Quello che ora so fare', content: (
    <div className="space-y-4"><p className="font-body text-gray-600 leading-relaxed">Ben fatto. Hai quasi conquistato il distintivo della Città delle Divisioni Giuste.</p></div>
  ), checklist: ['So dividere in parti uguali', 'So formare gruppi uguali', 'So capire quanti oggetti vanno in ogni gruppo', 'So capire quanti gruppi si formano', 'So accorgermi se avanza qualcosa', 'So raccontare una divisione con parole semplici']},
  { id: 10, type: 'challenge', emoji: '🏆', title: 'Super Missione Finale', content: (
    <div className="space-y-4"><p className="font-body text-gray-600 leading-relaxed">Robo-Ordina si fermò al centro della piazza. "Ultima prova! Chi supera la Super Missione diventa Custode delle Divisioni Giuste."</p></div>
  ), challenge: { title: 'Super Missione', exercises: [
    { question: '8 ÷ 2 = __', answer: '4', type: 'fill' },
    { question: '12 ÷ 4 = __', answer: '3', type: 'fill' },
    { question: '15 ÷ 3 = __', answer: '5', type: 'fill' },
    { question: '18 ÷ 6 = __', answer: '3', type: 'fill' },
    { question: '7 ÷ 2 = __ con resto __', answer: '3r1', type: 'fill' },
    { question: '10 ÷ 4 = __ con resto __', answer: '2r2', type: 'fill' },
  ], badge: { title: 'Custode delle Divisioni', emoji: '🤖', description: 'Hai conquistato la ruota dentata dorata!' }}},
]

export default function Chapter5({ chapterId, currentPage, onPageChange, onCompletePage, onEarnBadge, progress, onNextChapter, onPrevChapter }) {
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
