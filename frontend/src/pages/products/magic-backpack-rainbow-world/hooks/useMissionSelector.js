import { useState, useCallback, useEffect } from 'react'

const DIFFICULTY_MAP = {
  '3-4': { maxMissionTypes: ['tap', 'drag'], maxSentences: 1, maxWords: 4 },
  '4-5': { maxMissionTypes: ['tap', 'drag', 'match'], maxSentences: 2, maxWords: 5 },
  '5-6': { maxMissionTypes: ['tap', 'drag', 'match', 'sentence'], maxSentences: 2, maxWords: 6 },
  '6-7': { maxMissionTypes: ['tap', 'drag', 'match', 'sentence', 'speaking', 'fillgap'], maxSentences: 3, maxWords: 7 },
  '7-8': { maxMissionTypes: ['tap', 'drag', 'match', 'sentence', 'speaking', 'fillgap'], maxSentences: 4, maxWords: 8 },
}

export function useMissionSelector(worldData, childAge = '4-5') {
  const [sessionMissions, setSessionMissions] = useState([])
  const [currentMissionIndex, setCurrentMissionIndex] = useState(0)

  const generateSession = useCallback(() => {
    if (!worldData || !worldData.missions) {
      console.warn('useMissionSelector: worldData non valido', worldData)
      return []
    }

    const difficulty = DIFFICULTY_MAP[childAge] || DIFFICULTY_MAP['4-5']
    const allMissions = worldData.missions || []

    const filtered = allMissions.filter(m => {
      if (!m.type || !difficulty.maxMissionTypes.includes(m.type)) return false
      if (m.sentences && m.sentences.length > difficulty.maxSentences) return false
      if (m.targetWords && m.targetWords.length > difficulty.maxWords) return false
      return true
    })

    const shuffled = [...filtered].sort(() => Math.random() - 0.5)
    const sessionSize = Math.min(3 + Math.floor(Math.random() * 2), shuffled.length)
    const session = shuffled.slice(0, Math.max(1, sessionSize))

    setSessionMissions(session)
    setCurrentMissionIndex(0)
    return session
  }, [worldData, childAge])

  useEffect(() => {
    if (sessionMissions.length === 0 && worldData?.missions?.length > 0) {
      generateSession()
    }
  }, [worldData, sessionMissions.length, generateSession])

  const nextMission = useCallback(() => {
    if (currentMissionIndex < sessionMissions.length - 1) {
      setCurrentMissionIndex(prev => prev + 1)
      return sessionMissions[currentMissionIndex + 1]
    }
    return null
  }, [currentMissionIndex, sessionMissions])

  const isComplete = currentMissionIndex >= sessionMissions.length - 1 && sessionMissions.length > 0

  return {
    sessionMissions,
    currentMission: sessionMissions[currentMissionIndex] || null,
    currentMissionIndex,
    totalMissions: sessionMissions.length,
    generateSession,
    nextMission,
    isComplete,
  }
}

export function getDifficultyLabel(age) {
  const labels = {
    '3-4': '🐣 Principiante',
    '4-5': '🐥 Esploratore',
    '5-6': '🐤 Avventuriero',
    '6-7': '🦋 Esperto',
    '7-8': '🌟 Campione',
  }
  return labels[age] || labels['4-5']
}
