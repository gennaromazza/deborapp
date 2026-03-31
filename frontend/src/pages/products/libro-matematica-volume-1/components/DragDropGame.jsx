import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, XCircle, RefreshCw, GripVertical } from 'lucide-react'

const sequenceData = [
  { items: ['1', '2', '3', '4', '5'], correct: true },
  { items: ['2', '4', '6', '8', '10'], correct: true },
  { items: ['5', '10', '15', '20', '25'], correct: true },
]

export default function DragDropGame({ onComplete, onCorrect }) {
  const [currentRound, setCurrentRound] = useState(0)
  const [items, setItems] = useState([])
  const [isComplete, setIsComplete] = useState(false)
  const [feedback, setFeedback] = useState(null)
  const [draggedIndex, setDraggedIndex] = useState(null)
  const dragItem = useRef()
  const dragOverItem = useRef()

  useState(() => {
    shuffleItems()
  }, [])

  const shuffleItems = () => {
    const round = sequenceData[currentRound]
    const shuffled = [...round.items].sort(() => Math.random() - 0.5)
    setItems(shuffled)
    setIsComplete(false)
    setFeedback(null)
  }

  useState(() => {
    shuffleItems()
  }, [currentRound])

  const handleDragStart = (e, position) => {
    dragItem.current = position
    setDraggedIndex(position)
  }

  const handleDragEnter = (e, position) => {
    dragOverItem.current = position
  }

  const handleDragEnd = () => {
    const copyListItems = [...items]
    const dragItemContent = copyListItems[dragItem.current]
    copyListItems.splice(dragItem.current, 1)
    copyListItems.splice(dragOverItem.current, 0, dragItemContent)
    dragItem.current = null
    dragOverItem.current = null
    setDraggedIndex(null)
    setItems(copyListItems)
  }

  const checkOrder = () => {
    const sorted = [...items].sort((a, b) => parseInt(a) - parseInt(b))
    const isCorrect = items.every((item, index) => item === sorted[index])
    
    if (isCorrect) {
      setFeedback('correct')
      if (onCorrect) onCorrect()
      
      setTimeout(() => {
        if (currentRound < sequenceData.length - 1) {
          setCurrentRound(prev => prev + 1)
          shuffleItems()
        } else {
          setIsComplete(true)
          if (onComplete) onComplete()
        }
      }, 1500)
    } else {
      setFeedback('wrong')
      setTimeout(() => setFeedback(null), 1000)
    }
  }

  return (
    <div className="bg-pastel-peach/30 rounded-2xl p-5 mt-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display font-bold text-lg text-gray-800 flex items-center gap-2">
          🔢 Ordina i Numeri
        </h3>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-500">
            Round: <strong className="text-pastel-pink-dark">{currentRound + 1}</strong>/{sequenceData.length}
          </span>
          <button
            onClick={shuffleItems}
            className="p-2 hover:bg-pastel-peach/50 rounded-lg transition-colors"
            title="Ricomincia"
          >
            <RefreshCw className="w-4 h-4 text-gray-400" />
          </button>
        </div>
      </div>

      <p className="font-body text-gray-500 text-sm mb-4">
        Trascina i numeri in ordine crescente (dal più piccolo al più grande)
      </p>

      <div className="flex justify-center gap-2 mb-6">
        <AnimatePresence>
          {items.map((item, index) => (
            <motion.div
              key={`${item}-${index}`}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
              onDragEnter={(e) => handleDragEnter(e, index)}
              onDragEnd={handleDragEnd}
              onDragOver={(e) => e.preventDefault()}
              className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center cursor-move touch-none transition-all ${
                draggedIndex === index 
                  ? 'opacity-50 scale-110' 
                  : 'hover:scale-105'
              } ${
                feedback === 'correct' 
                  ? 'bg-pastel-mint' 
                  : feedback === 'wrong' 
                  ? 'bg-pastel-pink'
                  : 'bg-white border-2 border-pastel-lavender hover:border-pastel-pink'
              }`}
            >
              <div className="flex items-center gap-1">
                <GripVertical className="w-3 h-3 text-gray-300" />
                <span className="font-display font-bold text-lg text-gray-800">{item}</span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="flex justify-center">
        <button
          onClick={checkOrder}
          className="btn-primary"
          disabled={feedback === 'correct'}
        >
          Verifica
        </button>
      </div>

      <AnimatePresence>
        {feedback && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`mt-4 flex items-center justify-center gap-2 p-3 rounded-xl ${
              feedback === 'correct' 
                ? 'bg-pastel-mint/50 text-pastel-mint-dark' 
                : 'bg-pastel-pink/50 text-pastel-pink-dark'
            }`}
          >
            {feedback === 'correct' ? (
              <>
                <CheckCircle className="w-5 h-5" />
                <span className="font-display font-bold">Corretto!</span>
              </>
            ) : (
              <>
                <XCircle className="w-5 h-5" />
                <span className="font-display font-bold">Riprova!</span>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isComplete && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-6 text-center p-4 bg-white/80 rounded-2xl border-2 border-pastel-yellow"
          >
            <p className="font-display font-bold text-gray-800 text-lg">
              🎉 Complimenti! Hai ordinato tutti i numeri!
            </p>
            <button
              onClick={() => {
                setCurrentRound(0)
                shuffleItems()
              }}
              className="btn-secondary mt-3"
            >
              Gioca ancora
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}