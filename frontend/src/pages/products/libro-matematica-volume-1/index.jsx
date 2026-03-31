import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Home, Download, Star, Award, BookOpen, ArrowLeft, Zap, Trophy } from 'lucide-react'
import { supabase } from '../../../utils/supabase'
import { generatePDF } from '../../../utils/pdfGenerator'
import { chapters } from './data/chapters'
import BookCover from './components/BookCover'
import Chapter from './components/Chapter'
import BadgeScreen from './components/BadgeScreen'
import LevelUpPopup from './components/LevelUpPopup'
import { chapter1Pages } from './data/content.jsx'
import { chapter2Pages } from './data/content.jsx'
import { chapter3Pages } from './data/content.jsx'
import { chapter4Pages } from './data/content.jsx'
import { chapter5Pages } from './data/content.jsx'
import { chapter6Pages } from './data/content.jsx'
import { GameProvider, useGame, XP_VALUES } from '../../../context/GameContext'

const chapterPagesMap = {
  1: chapter1Pages,
  2: chapter2Pages,
  3: chapter3Pages,
  4: chapter4Pages,
  5: chapter5Pages,
  6: chapter6Pages,
}

function GameHeader({ product }) {
  const { xp, level, coins, getCurrentLevel, getProgressToNextLevel, getNextLevel, streak } = useGame()
  const currentLevel = getCurrentLevel()
  const nextLevel = getNextLevel()
  const progress = getProgressToNextLevel()
  const [showXP, setShowXP] = useState(false)
  
  return (
    <div className="flex items-center gap-3">
      <button
        onClick={() => setShowXP(!showXP)}
        className="flex items-center gap-2 px-3 py-1.5 bg-white/80 rounded-full shadow-sm hover:shadow-md transition-all"
      >
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pastel-yellow to-pastel-peach flex items-center justify-center">
          <span className="text-lg">{currentLevel.emoji}</span>
        </div>
        <div className="hidden sm:block text-left">
          <div className="text-xs font-display font-bold text-gray-800 leading-tight">
            {currentLevel.title}
          </div>
          <div className="text-[10px] text-gray-500">Lv.{level + 1}</div>
        </div>
        {xp > 0 && (
          <div className="hidden sm:flex items-center gap-1 px-2 py-0.5 bg-pastel-yellow/50 rounded-lg">
            <Zap className="w-3 h-3 text-pastel-yellow-dark" />
            <span className="text-xs font-bold text-pastel-yellow-dark">{xp}</span>
          </div>
        )}
      </button>
      
      {showXP && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, x: -10 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          className="absolute top-full mt-2 left-0 z-50 bg-white rounded-2xl shadow-xl p-4 w-64 border border-pastel-lavender/30"
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Livello</span>
              <span className="font-display font-bold text-gray-800">{level + 1}</span>
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-gray-500">Progresso</span>
                <span className="text-pastel-yellow-dark font-medium">{xp} XP</span>
              </div>
              <div className="h-2 bg-pastel-lavender rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-gradient-to-r from-pastel-yellow to-pastel-peach"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                />
              </div>
              {nextLevel && (
                <div className="text-[10px] text-gray-400 mt-1 text-right">
                  {nextLevel.minXP - xp} XP al prossimo livello
                </div>
              )}
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-pastel-lavender/20">
              <div className="flex items-center gap-1">
                <span className="text-lg">🪙</span>
                <span className="font-display font-bold text-gray-800">{coins}</span>
              </div>
              {streak > 0 && (
                <div className="flex items-center gap-1">
                  <span className="text-lg">🔥</span>
                  <span className="font-display font-bold text-gray-800">{streak}</span>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}

function GameContent() {
  const { productId, chapterId } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [currentChapter, setCurrentChapter] = useState(parseInt(chapterId) || 0)
  const [progress, setProgress] = useState({})
  const [chapterBadges, setChapterBadges] = useState([])
  const [showBadges, setShowBadges] = useState(false)
  const [showLevelUp, setShowLevelUp] = useState(null)
  
  const { addXP, earnBadge, checkStreak, BADGES, XP_VALUES } = useGame()

  useEffect(() => {
    checkStreak()
  }, [])

  useEffect(() => {
    async function fetchProduct() {
      const { data } = await supabase
        .from('products')
        .select('*')
        .eq('id', productId)
        .single()

      if (data) setProduct(data)
      setLoading(false)
    }
    fetchProduct()
  }, [productId])

  useEffect(() => {
    const savedProgress = localStorage.getItem(`progress_${productId}`)
    const savedBadges = localStorage.getItem(`chapter_badges_${productId}`)
    if (savedProgress) setProgress(JSON.parse(savedProgress))
    if (savedBadges) setChapterBadges(JSON.parse(savedBadges))
  }, [productId])

  useEffect(() => {
    localStorage.setItem(`progress_${productId}`, JSON.stringify(progress))
  }, [progress, productId])

  useEffect(() => {
    localStorage.setItem(`chapter_badges_${productId}`, JSON.stringify(chapterBadges))
  }, [chapterBadges, productId])

  useEffect(() => {
    setCurrentChapter(parseInt(chapterId) || 0)
  }, [chapterId])

  useEffect(() => {
    const handleLevelUp = (e) => {
      setShowLevelUp(e.detail)
    }
    window.addEventListener('levelUp', handleLevelUp)
    return () => window.removeEventListener('levelUp', handleLevelUp)
  }, [])

  const completePage = (chapterId, pageId) => {
    setProgress(prev => {
      const newProgress = { ...prev }
      if (!newProgress[chapterId]) newProgress[chapterId] = []
      if (!newProgress[chapterId].includes(pageId)) {
        newProgress[chapterId] = [...newProgress[chapterId], pageId]
        addXP(XP_VALUES.pageComplete, 'pageComplete')
        
        const chapterPages = newProgress[chapterId].length
        if (chapterPages === 10) {
          addXP(XP_VALUES.perfectBonus, 'perfectChapter')
          earnBadge('perfectChapter')
        }
      }
      return newProgress
    })
  }

  const earnChapterBadge = (chapterId) => {
    if (!chapterBadges.includes(chapterId)) {
      setChapterBadges(prev => [...prev, chapterId])
      addXP(XP_VALUES.chapterComplete, 'chapterComplete')
      
      const completedChapters = chapterBadges.length + 1
      if (completedChapters === 1) {
        earnBadge('firstChapter')
      } else if (completedChapters === 3) {
        earnBadge('halfBook')
      } else if (completedChapters === 6) {
        earnBadge('fullBook')
      }
      
      return true
    }
    return false
  }

  const chapterProgress = currentChapter > 0 ? (progress[currentChapter] || []).length : 0
  const progressPercent = (chapterProgress / 10) * 100

  const handleDownload = () => {
    generatePDF(product, chapters, progress)
  }

  const handleSelectChapter = (id) => {
    navigate(`/prodotto/${productId}/${id}`, { replace: true })
    setCurrentChapter(id)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-pastel-cream flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-pastel-pink-dark border-t-transparent" />
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-pastel-cream flex items-center justify-center">
        <div className="text-center">
          <BookOpen className="w-16 h-16 text-pastel-lavender-dark/50 mx-auto mb-4" />
          <h2 className="font-display text-xl font-bold text-gray-800 mb-2">Prodotto non trovato</h2>
          <button onClick={() => navigate('/')} className="btn-primary">Torna alla Home</button>
        </div>
      </div>
    )
  }

  const currentChapterData = currentChapter > 0 ? chapters[currentChapter - 1] : null
  const currentChapterPages = currentChapter > 0 ? chapterPagesMap[currentChapter] : null

  return (
    <div className="min-h-screen bg-gradient-to-b from-pastel-cream via-white to-pastel-cream">
      <header className="glass sticky top-0 z-50 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => currentChapter > 0 ? navigate(`/prodotto/${productId}`, { replace: true }) : navigate('/')}
              className="p-2 hover:bg-pastel-lavender/50 rounded-xl transition-colors"
            >
              {currentChapter > 0 ? <ArrowLeft className="w-5 h-5 text-gray-600" /> : <Home className="w-5 h-5 text-gray-600" />}
            </button>
            <div className="flex items-center gap-2">
              <span className="text-2xl">{currentChapter > 0 ? currentChapterData?.emoji : '📘'}</span>
              <h1 className="font-display font-bold text-lg text-gray-800 hidden sm:block">
                {currentChapter > 0 ? currentChapterData?.title : product.title}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <GameHeader product={product} />
            
            <button
              onClick={() => setShowBadges(!showBadges)}
              className="relative p-2 hover:bg-pastel-yellow/50 rounded-xl transition-colors"
            >
              <Award className="w-5 h-5 text-pastel-yellow-dark" />
              {(chapterBadges.length + Object.keys(BADGES).filter(k => k.includes('Chapter') || k.includes('Book')).length) > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-pastel-pink-dark text-white text-xs rounded-full flex items-center justify-center">
                  {chapterBadges.length}
                </span>
              )}
            </button>
            <button
              onClick={handleDownload}
              className="p-2 hover:bg-pastel-mint/50 rounded-xl transition-colors"
              title="Scarica PDF"
            >
              <Download className="w-5 h-5 text-pastel-mint-dark" />
            </button>
          </div>
        </div>

        {currentChapter > 0 && (
          <div className="h-1 bg-pastel-lavender">
            <motion.div
              className="h-full bg-gradient-to-r from-pastel-pink-dark to-pastel-lavender-dark"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        )}
      </header>

      {currentChapter === 0 && (
        <div className="max-w-5xl mx-auto px-4 py-8">
          <BookCover
            product={product}
            chapters={chapters}
            progress={progress}
            chapterBadges={chapterBadges}
            onSelectChapter={handleSelectChapter}
          />
        </div>
      )}

      {currentChapter > 0 && currentChapterPages && (
        <Chapter
          chapterId={currentChapter}
          pages={currentChapterPages}
          title={currentChapterData?.title}
          emoji={currentChapterData?.emoji}
          onCompletePage={completePage}
          onEarnBadge={earnChapterBadge}
          onNextChapter={() => {
            if (currentChapter < 6) {
              handleSelectChapter(currentChapter + 1)
            } else {
              handleSelectChapter(0)
            }
          }}
          onPrevChapter={() => {
            if (currentChapter > 1) {
              handleSelectChapter(currentChapter - 1)
            } else {
              handleSelectChapter(0)
            }
          }}
          progress={progress[currentChapter] || []}
        />
      )}

      <AnimatePresence>
        {showBadges && (
          <BadgeScreen 
            badges={chapterBadges} 
            gameBadges={BADGES}
            onClose={() => setShowBadges(false)} 
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {chapterBadges.length > 0 && chapterBadges.includes(currentChapter) && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-50"
          >
            <div className="bg-white rounded-2xl shadow-xl p-6 flex items-center gap-3 border-2 border-pastel-yellow">
              <Trophy className="w-8 h-8 text-pastel-yellow-dark" />
              <div>
                <p className="font-display font-bold text-gray-800">Capitolo Completato!</p>
                <p className="font-body text-gray-500 text-sm">Hai guadagnato XP e un badge!</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showLevelUp && (
          <LevelUpPopup 
            level={showLevelUp.level + 1} 
            data={showLevelUp.data}
            onClose={() => setShowLevelUp(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  )
}

export default function LibroMatematicaVolume1() {
  const { productId } = useParams()
  
  return (
    <GameProvider productId={productId}>
      <GameContent />
    </GameProvider>
  )
}