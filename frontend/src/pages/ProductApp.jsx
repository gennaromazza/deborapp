import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Home, Download, Star, Award, BookOpen, ArrowLeft } from 'lucide-react'
import { supabase } from '../utils/supabase'
import BookCover from './product/BookCover'
import Chapter1 from './product/Chapter1'
import Chapter2 from './product/Chapter2'
import Chapter3 from './product/Chapter3'
import Chapter4 from './product/Chapter4'
import Chapter5 from './product/Chapter5'
import Chapter6 from './product/Chapter6'
import BadgeScreen from './product/BadgeScreen'
import { generatePDF } from '../utils/pdfGenerator'

const chapters = [
  { id: 1, title: 'Il Bosco dei Numeri', emoji: '🌲', component: Chapter1 },
  { id: 2, title: 'Il Mercato delle Addizioni', emoji: '🍎', component: Chapter2 },
  { id: 3, title: 'Il Castello delle Sottrazioni', emoji: '🏰', component: Chapter3 },
  { id: 4, title: "L'Isola delle Tabelline", emoji: '🏝️', component: Chapter4 },
  { id: 5, title: 'La Città delle Divisioni', emoji: '🍕', component: Chapter5 },
  { id: 6, title: 'Il Villaggio delle Forme', emoji: '🏘️', component: Chapter6 },
]

export default function ProductApp() {
  const { productId, chapterId } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [currentChapter, setCurrentChapter] = useState(parseInt(chapterId) || 0)
  const [currentPage, setCurrentPage] = useState(0)
  const [progress, setProgress] = useState({})
  const [badges, setBadges] = useState([])
  const [showBadges, setShowBadges] = useState(false)

  useEffect(() => {
    async function fetchProduct() {
      const { data, error } = await supabase
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

  const totalPages = currentChapter === 0 ? 1 : 10
  const chapterProgress = currentChapter > 0 ? (progress[currentChapter] || []).length : 0
  const progressPercent = (chapterProgress / totalPages) * 100

  const handleDownload = () => {
    generatePDF(product, chapters, progress)
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

  const ChapterComponent = currentChapter > 0 ? chapters[currentChapter - 1]?.component : null

  return (
    <div className="min-h-screen bg-gradient-to-b from-pastel-cream via-white to-pastel-cream">
      {/* Header */}
      <header className="glass sticky top-0 z-50 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => currentChapter > 0 ? setCurrentChapter(0) : navigate('/')}
              className="p-2 hover:bg-pastel-lavender/50 rounded-xl transition-colors"
            >
              {currentChapter > 0 ? <ArrowLeft className="w-5 h-5 text-gray-600" /> : <Home className="w-5 h-5 text-gray-600" />}
            </button>
            <div className="flex items-center gap-2">
              <span className="text-2xl">{currentChapter > 0 ? chapters[currentChapter - 1]?.emoji : '📘'}</span>
              <h1 className="font-display font-bold text-lg text-gray-800 hidden sm:block">
                {currentChapter > 0 ? chapters[currentChapter - 1]?.title : product.title}
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

        {/* Progress bar */}
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

      {/* Chapter selector */}
      {currentChapter === 0 && (
        <div className="max-w-5xl mx-auto px-4 py-8">
          <BookCover
            product={product}
            chapters={chapters}
            progress={progress}
            onSelectChapter={(id) => {
              setCurrentChapter(id)
              setCurrentPage(0)
            }}
          />
        </div>
      )}

      {/* Chapter content */}
      {currentChapter > 0 && ChapterComponent && (
        <ChapterComponent
          chapterId={currentChapter}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          onCompletePage={completePage}
          onEarnBadge={earnBadge}
          progress={progress[currentChapter] || []}
          onNextChapter={() => {
            if (currentChapter < 6) {
              setCurrentChapter(currentChapter + 1)
              setCurrentPage(0)
            } else {
              setCurrentChapter(0)
            }
          }}
          onPrevChapter={() => {
            if (currentChapter > 1) {
              setCurrentChapter(currentChapter - 1)
              setCurrentPage(0)
            } else {
              setCurrentChapter(0)
            }
          }}
        />
      )}

      {/* Badge notification */}
      <AnimatePresence>
        {showBadges && (
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
