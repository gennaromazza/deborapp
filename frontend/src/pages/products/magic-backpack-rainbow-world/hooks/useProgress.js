const STORAGE_KEY = 'magic-backpack-progress'

const defaultProgress = {
  unlockedWorlds: ['rainbow'],
  collectedWords: [],
  masteredWords: [],
  backpackItems: [],
  stars: 0,
  streakDays: 0,
  completedMissions: [],
  lastVisit: null,
}

export function loadProgress() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      const parsed = JSON.parse(saved)
      return { ...defaultProgress, ...parsed }
    }
  } catch (e) {
    console.warn('Failed to load progress:', e)
  }
  return { ...defaultProgress }
}

export function saveProgress(progress) {
  try {
    const today = new Date().toISOString().split('T')[0]
    const lastVisit = progress.lastVisit
    
    let streakDays = progress.streakDays || 0
    
    if (lastVisit) {
      const lastDate = new Date(lastVisit)
      const todayDate = new Date(today)
      const diffDays = Math.floor((todayDate - lastDate) / (1000 * 60 * 60 * 24))
      
      if (diffDays === 1) {
        streakDays += 1
      } else if (diffDays > 1) {
        streakDays = 1
      }
    } else {
      streakDays = 1
    }

    const updated = { ...progress, lastVisit: today, streakDays }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
    window.dispatchEvent(new CustomEvent('progress-updated', { detail: updated }))
    return updated
  } catch (e) {
    console.warn('Failed to save progress:', e)
    return progress
  }
}

export function addCollectedWord(wordId) {
  const progress = loadProgress()
  if (!progress.collectedWords.includes(wordId)) {
    progress.collectedWords.push(wordId)
    progress.stars += 1
  }
  return saveProgress(progress)
}

export function addMasteredWord(wordId) {
  const progress = loadProgress()
  if (!progress.masteredWords.includes(wordId)) {
    progress.masteredWords.push(wordId)
    progress.stars += 2
  }
  return saveProgress(progress)
}

export function completeMission(missionId) {
  const progress = loadProgress()
  if (!progress.completedMissions.includes(missionId)) {
    progress.completedMissions.push(missionId)
    progress.stars += 3
  }
  return saveProgress(progress)
}

export function unlockWorld(worldId) {
  const progress = loadProgress()
  if (!progress.unlockedWorlds.includes(worldId)) {
    progress.unlockedWorlds.push(worldId)
    return saveProgress(progress)
  }
  return progress
}

export function isWorldUnlocked(worldId) {
  const progress = loadProgress()
  return progress.unlockedWorlds.includes(worldId)
}

export function getWorldProgress(worldId) {
  const progress = loadProgress()
  const worldMissions = progress.completedMissions.filter(m => m.startsWith(worldId))
  const worldWords = progress.collectedWords.filter(w => {
    return w.includes(worldId) || progress.collectedWords.includes(w)
  })
  
  return {
    completedMissions: worldMissions,
    collectedWords: worldWords,
    stars: progress.stars,
    unlocked: progress.unlockedWorlds.includes(worldId),
  }
}

export function resetProgress() {
  localStorage.removeItem(STORAGE_KEY)
  return { ...defaultProgress }
}

export function clearProgress() {
  localStorage.removeItem(STORAGE_KEY)
}
