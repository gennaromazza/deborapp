import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Star, Check, Sparkles, Trophy } from 'lucide-react'

export default function Chapter({ chapterId, pages, title, emoji, onCompletePage, onEarnBadge, onNextChapter, onPrevChapter, progress }) {
  const [currentPage, setCurrentPage] = useState(0)
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
      setCurrentPage(currentPage + 1)
    } else if (currentPage === pages.length - 1 && !badgeEarned) {
      setBadgeEarned(true)
      onEarnBadge(chapterId)
    }
  }

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1)
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

        <div className="flex justify-center gap-1.5 mt-8">
          {pages.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i)}
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
