import { useState, useEffect, useRef, useCallback } from 'react'
import useAudio from '../hooks/useAudio'
import { useDragAndDrop } from '../hooks/useDragAndDrop'
import { useMissionSelector, getDifficultyLabel } from '../hooks/useMissionSelector'
import { loadProgress, addCollectedWord, completeMission, unlockWorld } from '../hooks/useProgress'
import { getDialog } from '../utils/dialogs'
import { RAINBOW_WORLD } from '../data/words/rainbow'
import WordObject from '../components/WordObject'
import MissionBanner from '../components/MissionBanner'
import RewardPopup from '../components/RewardPopup'
import BackpackDropZone from '../components/BackpackDropZone'
import SentenceBuilder from '../components/SentenceBuilder'
import SpeakingPractice from '../components/SpeakingPractice'
import FillTheGap from '../components/FillTheGap'

const Sparkle = ({ x, y }) => (
  <div className="absolute pointer-events-none" style={{ left: x, top: y, fontSize: '2rem', animation: 'sparkle 1s ease-out forwards' }}>✨</div>
)

export default function RainbowWorld({ onBack, onBackpackOpen, showReward, profile }) {
  const audio = useAudio()
  const progress = loadProgress()
  const childAge = profile?.childAge || '4-5'
  const {
    currentMission,
    currentMissionIndex,
    totalMissions,
    nextMission,
    isComplete,
  } = useMissionSelector(RAINBOW_WORLD, childAge)

  const [rewardVisible, setRewardVisible] = useState(false)
  const [rewardMessage, setRewardMessage] = useState('')
  const [collected, setCollected] = useState({})
  const [sparkles, setSparkles] = useState([])
  const [selectedMatch, setSelectedMatch] = useState(null)
  const [tapCompleted, setTapCompleted] = useState([])
  const [backpackOpen, setBackpackOpen] = useState(false)
  const [isCompleting, setIsCompleting] = useState(false)

  useEffect(() => {
    if (currentMission) {
      setCollected({})
      setTapCompleted([])
      setSelectedMatch(null)
      setIsCompleting(false)
      const welcomeMsg = profile
        ? `Ciao ${profile.childName}! ${getDifficultyLabel(childAge)} - Mondo dei colori!`
        : `Benvenuto nel mondo dei colori!`
      audio.speakItalian(welcomeMsg)
    }
  }, [currentMissionIndex])

  const showLocalReward = (msg) => {
    setRewardMessage(msg)
    setRewardVisible(true)
    setTimeout(() => setRewardVisible(false), 2000)
    if (showReward) showReward(msg)
  }

  const addSparkle = (x, y) => {
    const id = Date.now()
    setSparkles(prev => [...prev, { id, x, y }])
    setTimeout(() => setSparkles(prev => prev.filter(s => s.id !== id)), 1000)
  }

  const handleDrop = useCallback((obj, pos) => {
    if (!currentMission?.targetWords?.includes(obj.id)) {
      audio.speakItalian('Riprova!')
      return false
    }
    setCollected(prev => ({ ...prev, [obj.id]: true }))
    addSparkle(pos.x, pos.y)
    const praise = profile ? `Bravo ${profile.childName}!` : 'Bravo!'
    audio.speakItalian(praise)
    addCollectedWord(obj.id)
    setTimeout(() => handleMissionComplete(), 1000)
    return true
  }, [currentMission, profile, audio, handleMissionComplete])

  const {
    draggingObj,
    dragPos,
    isOverDropZone,
    handleStart: handleDragStart,
    registerDropZone,
  } = useDragAndDrop({ onDrop: handleDrop })

  const handleMissionComplete = useCallback(() => {
    if (!currentMission || isCompleting) return
    setIsCompleting(true)
    
    completeMission(currentMission.id)
    const dialogType = profile?.familyMembers?.length > 0 && Math.random() > 0.5
      ? (Math.random() > 0.5 ? 'success_with_parent' : 'success_with_friend')
      : 'success'
    const successMsg = getDialog(dialogType, profile) + ' 🎉'
    showLocalReward(successMsg)
    audio.speakItalian(successMsg)

    if (isComplete) {
      unlockWorld('pets')
      const completeMsg = getDialog('world_complete', profile, { world: 'mondo dei colori' })
      setTimeout(() => {
        showLocalReward(completeMsg)
        audio.speakItalian(completeMsg)
        setTimeout(() => onBack(), 3000)
      }, 1000)
    } else {
      const next = nextMission()
      if (next) {
        setCollected({})
        setTapCompleted([])
        setSelectedMatch(null)
      }
    }
  }, [currentMission, isCompleting, profile, isComplete, audio, showLocalReward, onBack])

  const handleTap = useCallback((word) => {
    audio.speakWord(word.word)
    if (currentMission?.type === 'tap' && !tapCompleted.includes(word.id)) {
      const newTapCompleted = [...tapCompleted, word.id]
      setTapCompleted(newTapCompleted)
      addCollectedWord(word.id)
      if (newTapCompleted.length >= currentMission.targetWords?.length) {
        setTimeout(() => handleMissionComplete(), 1000)
      }
    }
  }, [currentMission, tapCompleted, audio, handleMissionComplete])

  const handleMatchSelect = useCallback((word) => {
    setSelectedMatch(word.id)
    if (currentMission?.targetWords?.includes(word.id)) {
      audio.speak('Great!')
      addCollectedWord(word.id)
      setTimeout(() => handleMissionComplete(), 1500)
    } else {
      audio.speak('Try again!')
      setTimeout(() => setSelectedMatch(null), 800)
    }
  }, [currentMission, audio, handleMissionComplete])

  const renderExercise = () => {
    if (!currentMission) return null

    switch (currentMission.type) {
      case 'tap':
        return (
          <div className="absolute inset-0 flex flex-col items-center justify-center pt-20">
            <p className="text-white text-xl font-bold mb-8 drop-shadow-lg">
              {currentMission.instruction} ({tapCompleted.length}/{RAINBOW_WORLD.words.length})
            </p>
            <div className="flex flex-wrap gap-6 justify-center px-4">
              {RAINBOW_WORLD.words.map(word => (
                <WordObject
                  key={word.id}
                  obj={word}
                  onTap={handleTap}
                  isCollected={tapCompleted.includes(word.id)}
                  isTarget={!tapCompleted.includes(word.id)}
                  missionActive={true}
                  audio={audio}
                />
              ))}
            </div>
          </div>
        )
      case 'drag':
        return (
          <div className="absolute inset-0 flex flex-col items-center justify-center pt-20 pb-32">
            <p className="text-white text-xl font-bold mb-6 drop-shadow-lg text-center">
              {currentMission.instruction}
            </p>
            <div className="flex flex-wrap gap-6 justify-center px-4">
              {RAINBOW_WORLD.words.map(word => (
                <WordObject
                  key={word.id}
                  obj={word}
                  onTap={handleTap}
                  onDragStart={(e) => handleDragStart(e, word)}
                  isCollected={!!collected[word.id]}
                  isTarget={currentMission.targetWords?.includes(word.id)}
                  missionActive={true}
                  audio={audio}
                />
              ))}
            </div>
            {draggingObj && (
              <div
                className="fixed pointer-events-none z-50 transition-transform duration-75"
                style={{
                  left: dragPos.x - 40,
                  top: dragPos.y - 40,
                  transform: 'scale(1.3)',
                  filter: 'drop-shadow(0 12px 24px rgba(0,0,0,0.4))',
                }}
              >
                <div className="text-7xl">{draggingObj.emoji}</div>
              </div>
            )}
            {sparkles.map(s => <Sparkle key={s.id} x={s.x} y={s.y} />)}
          </div>
        )
      case 'match':
        const targetWord = RAINBOW_WORLD.words.find(w => currentMission.targetWords?.includes(w.id))
        const options = [targetWord, ...RAINBOW_WORLD.words.filter(w => !currentMission.targetWords?.includes(w.id)).slice(0, 2)]
        const shuffled = [...options].sort(() => Math.random() - 0.5)
        return (
          <div className="absolute inset-0 flex flex-col items-center justify-center pt-20">
            <p className="text-white text-xl font-bold mb-8 drop-shadow-lg">{currentMission.instruction}</p>
            <div className="flex gap-6 justify-center px-4">
              {shuffled.map(word => (
                <div key={word.id} className={`cursor-pointer transition-all duration-300 ${selectedMatch === word.id ? 'scale-110' : 'hover:scale-105'}`} onClick={() => handleMatchSelect(word)}>
                  <div className="text-6xl">{word.emoji}</div>
                  {selectedMatch === word.id && currentMission.targetWords?.includes(word.id) && (<div className="text-green-400 text-2xl mt-2">✓</div>)}
                </div>
              ))}
            </div>
          </div>
        )
      case 'sentence':
        return <SentenceBuilder sentences={currentMission.sentences} audio={audio} profile={profile} onComplete={handleMissionComplete} />
      case 'speaking':
        return <SpeakingPractice sentences={currentMission.sentences} audio={audio} profile={profile} onComplete={handleMissionComplete} />
      case 'fillgap':
        return <FillTheGap sentences={currentMission.sentences} audio={audio} profile={profile} onComplete={handleMissionComplete} />
      default:
        return null
    }
  }

  const hasDragMission = currentMission?.type === 'drag'

  if (!currentMission) {
    return (
      <div className={`relative w-full h-screen overflow-hidden bg-gradient-to-br ${RAINBOW_WORLD.background}`}>
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <div className="text-6xl mb-4">🌈</div>
            <p className="text-white text-xl font-bold">Caricamento...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`relative w-full h-screen overflow-hidden bg-gradient-to-br ${RAINBOW_WORLD.background}`}>
      <style>{`
        @keyframes sparkle { 0% { opacity: 0; transform: scale(0) rotate(0deg); } 50% { opacity: 1; transform: scale(1.2) rotate(180deg); } 100% { opacity: 0; transform: scale(0) rotate(360deg); } }
      `}</style>

      <button onClick={onBack} className="absolute top-4 left-4 z-40 text-white font-bold bg-black bg-opacity-30 rounded-full px-4 py-2 hover:bg-opacity-50">← Mappa</button>

      <MissionBanner
        mission={currentMission?.instruction}
        completed={false}
        profile={profile}
        difficulty={getDifficultyLabel(childAge)}
        progress={`${currentMissionIndex + 1}/${totalMissions}`}
      />

      {renderExercise()}

      {hasDragMission && (
        <BackpackDropZone
          isOpen={backpackOpen}
          isDropTarget={isOverDropZone}
          collectedItems={progress.collectedWords.reduce((acc, w) => ({ ...acc, [w]: true }), {})}
          onToggle={() => setBackpackOpen(!backpackOpen)}
          objects={RAINBOW_WORLD.words}
          profile={profile}
          hasTarget={!!draggingObj && currentMission.targetWords?.includes(draggingObj.id)}
          registerDropZone={registerDropZone}
        />
      )}

      {!hasDragMission && (
        <BackpackDropZone
          isOpen={backpackOpen}
          isDropTarget={false}
          collectedItems={progress.collectedWords.reduce((acc, w) => ({ ...acc, [w]: true }), {})}
          onToggle={() => setBackpackOpen(!backpackOpen)}
          objects={RAINBOW_WORLD.words}
          profile={profile}
          hasTarget={false}
          registerDropZone={registerDropZone}
        />
      )}

      <RewardPopup message={rewardMessage} visible={rewardVisible} />
    </div>
  )
}