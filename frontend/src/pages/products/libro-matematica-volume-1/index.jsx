import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Home, Download, Star, Award, BookOpen, ArrowLeft } from 'lucide-react'
import { supabase } from '../../../utils/supabase'
import { generatePDF } from '../../../utils/pdfGenerator'
import { chapters } from './data/chapters'
import BookCover from './components/BookCover'
import Chapter from './components/Chapter'
import BadgeScreen from './components/BadgeScreen'
import { chapter1Pages } from './data/content.jsx'
import { chapter2Pages } from './data/content.jsx'
import { chapter3Pages } from './data/content.jsx'
import { chapter4Pages } from './data/content.jsx'
import { chapter5Pages } from './data/content.jsx'
import { chapter6Pages } from './data/content.jsx'

const chapterPagesMap = {
  1: chapter1Pages,
  2: chapter2Pages,
  3: chapter3Pages,
  4: chapter4Pages,
  5: chapter5Pages,
  6: chapter6Pages,
}

export default function LibroMatematicaVolume1() {
  const { productId, chapterId } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [currentChapter, setCurrentChapter] = useState(parseInt(chapterId) || 0)
  const [progress, setProgress] = useState({})
  const [badges, setBadges] = useState([])
  const [showBadges, setShowBadges] = useState(false)

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
    const savedBadges = localStorage.getItem(`badges_${productId}`)
    if (savedProgress) setProgress(JSON.parse(savedProgress))
    if (savedBadges) setBadges(JSON.parse(savedBadges))
  }, [productId])

  useEffect(() => {
    localStorage.setItem(`progress_${productId}`, JSON.stringify(progress))
  }, [progress, productId])

  useEffect(() => {
    localStorage.setItem(`badges_${productId}`, JSON.stringify(badges))
  }, [badges, productId])

  useEffect(() => {
    setCurrentChapter(parseInt(chapterId) || 0)
  }, [chapterId])

  const completePage = (chapterId, pageId) => {
    setProgress(prev => {
      const newProgress = { ...prev }
      if (!newProgress[chapterId]) newProgress[chapterId] = []
      if (!newProgress[chapterId].includes(pageId)) {
        newProgress[chapterId] = [...newProgress[chapterId], pageId]
      }
      return newProgress
    })
  }

  const earnBadge = (chapterId) => {
    if (!badges.includes(chapterId)) {
      setBadges(prev => [...prev, chapterId])
      setShowBadges(true)
      setTimeout(() => setShowBadges(false), 5000)
    }
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
            <button
              onClick={() => setShowBadges(!showBadges)}
              className="relative p-2 hover:bg-pastel-yellow/50 rounded-xl transition-colors"
            >
              <Award className="w-5 h-5 text-pastel-yellow-dark" />
              {badges.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-pastel-pink-dark text-white text-xs rounded-full flex items-center justify-center">
                  {badges.length}
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
          onEarnBadge={earnBadge}
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
          <BadgeScreen badges={badges} onClose={() => setShowBadges(false)} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {badges.length > 0 && badges.includes(currentChapter) && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-50"
          >
            <div className="bg-white rounded-2xl shadow-xl p-6 flex items-center gap-3 border-2 border-pastel-yellow">
              <Star className="w-8 h-8 text-pastel-yellow-dark" />
              <div>
                <p className="font-display font-bold text-gray-800">Nuovo Badge!</p>
                <p className="font-body text-gray-500 text-sm">Hai completato un capitolo!</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
