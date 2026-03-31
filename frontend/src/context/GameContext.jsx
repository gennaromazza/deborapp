import { createContext, useContext, useState, useEffect } from 'react'

const GameContext = createContext(null)

const LEVELS = [
  { minXP: 0, title: 'Semplicino', emoji: '🌱' },
  { minXP: 100, title: 'Scopritore', emoji: '🔍' },
  { minXP: 250, title: 'Esploratore', emoji: '🌲' },
  { minXP: 500, title: 'Navigatore', emoji: '🧭' },
  { minXP: 800, title: 'Avventuriero', emoji: '⚡' },
  { minXP: 1200, title: 'Esperto', emoji: '🧙' },
  { minXP: 1700, title: 'Matemago', emoji: '⭐' },
  { minXP: 2300, title: 'Campione', emoji: '🏆' },
  { minXP: 3000, title: 'Leggenda', emoji: '👑' },
]

const BADGES = {
  firstChapter: { emoji: '🎯', title: 'Primo Capitolo', desc: 'Completa il primo capitolo' },
  halfBook: { emoji: '📖', title: 'Mezzo Libro', desc: 'Completa 3 capitoli' },
  fullBook: { emoji: '📚', title: 'Libro Completo', desc: 'Completa tutti i 6 capitoli' },
  perfectChapter: { emoji: '💯', title: 'Capitolo Perfetto', desc: '10/10 in un capitolo' },
  streak3: { emoji: '🔥', title: 'In Streak', desc: '3 giorni consecutivi' },
  speedster: { emoji: '⚡', title: 'Velocista', desc: 'Completa 5 pagine in 10 min' },
  perfecter: { emoji: '✨', title: 'Perfezionista', desc: 'Tutte le risposte giuste in un capitolo' },
}

const XP_VALUES = {
  pageView: 5,
  pageComplete: 15,
  exerciseCorrect: 25,
  miniGameWin: 50,
  chapterComplete: 100,
  dailyBonus: 20,
  perfectBonus: 30,
}

export { LEVELS, BADGES, XP_VALUES }

export function GameProvider({ children, productId, children: child }) {
  const [xp, setXP] = useState(0)
  const [level, setLevel] = useState(0)
  const [coins, setCoins] = useState(0)
  const [badges, setBadges] = useState([])
  const [streak, setStreak] = useState(0)
  const [lastActiveDate, setLastActiveDate] = useState(null)

  useEffect(() => {
    if (!productId) return
    
    const savedXP = localStorage.getItem(`xp_${productId}`)
    const savedLevel = localStorage.getItem(`level_${productId}`)
    const savedCoins = localStorage.getItem(`coins_${productId}`)
    const savedBadges = localStorage.getItem(`badges_${productId}`)
    const savedStreak = localStorage.getItem(`streak_${productId}`)
    const savedLastDate = localStorage.getItem(`lastActive_${productId}`)

    if (savedXP) setXP(parseInt(savedXP))
    if (savedLevel) setLevel(parseInt(savedLevel))
    if (savedCoins) setCoins(parseInt(savedCoins))
    if (savedBadges) setBadges(JSON.parse(savedBadges))
    if (savedStreak) setStreak(parseInt(savedStreak))
    if (savedLastDate) setLastActiveDate(savedLastDate)
  }, [productId])

  useEffect(() => {
    if (!productId) return
    localStorage.setItem(`xp_${productId}`, xp.toString())
    localStorage.setItem(`level_${productId}`, level.toString())
    localStorage.setItem(`coins_${productId}`, coins.toString())
    localStorage.setItem(`badges_${productId}`, JSON.stringify(badges))
    localStorage.setItem(`streak_${productId}`, streak.toString())
    localStorage.setItem(`lastActive_${productId}`, new Date().toISOString().split('T')[0])
  }, [xp, level, coins, badges, streak, productId])

  const addXP = (amount, type = 'pageView') => {
    setXP(prev => {
      const newXP = prev + amount
      
      const newLevel = LEVELS.reduce((acc, lvl, idx) => {
        if (newXP >= lvl.minXP) return idx
        return acc
      }, 0)
      
      if (newLevel !== level) {
        setLevel(newLevel)
        triggerLevelUp(newLevel)
      }
      
      return newXP
    })

    if (type === 'exerciseCorrect' || type === 'miniGameWin') {
      setCoins(prev => prev + Math.floor(amount / 2))
    }
  }

  const triggerLevelUp = (newLevel) => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('levelUp', { 
        detail: { level: newLevel, data: LEVELS[newLevel] } 
      }))
    }
  }

  const earnBadge = (badgeKey) => {
    if (!badges.includes(badgeKey)) {
      setBadges(prev => [...prev, badgeKey])
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('badgeEarned', { 
          detail: { badge: BADGES[badgeKey], key: badgeKey } 
        }))
      }
      return true
    }
    return false
  }

  const checkStreak = () => {
    const today = new Date().toISOString().split('T')[0]
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0]
    
    if (lastActiveDate === yesterday) {
      setStreak(prev => prev + 1)
      if (streak + 1 >= 3) {
        earnBadge('streak3')
      }
    } else if (lastActiveDate !== today) {
      setStreak(0)
    }
  }

  const getCurrentLevel = () => LEVELS[level]
  
  const getNextLevel = () => LEVELS[level + 1] || null
  
  const getProgressToNextLevel = () => {
    const current = LEVELS[level]
    const next = LEVELS[level + 1]
    if (!next) return 100
    
    const progress = ((xp - current.minXP) / (next.minXP - current.minXP)) * 100
    return Math.min(100, Math.max(0, progress))
  }

  const value = {
    xp,
    level,
    coins,
    badges,
    streak,
    addXP,
    earnBadge,
    checkStreak,
    getCurrentLevel,
    getNextLevel,
    getProgressToNextLevel,
    LEVELS,
    BADGES,
    XP_VALUES,
  }

  return (
    <GameContext.Provider value={value}>
      {child}
    </GameContext.Provider>
  )
}

export function useGame() {
  const context = useContext(GameContext)
  if (!context) {
    throw new Error('useGame must be used within a GameProvider')
  }
  return context
}

export default GameContext