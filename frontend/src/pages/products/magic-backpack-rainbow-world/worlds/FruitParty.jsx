import { useState, useEffect, useCallback } from 'react'
import useAudio from '../hooks/useAudio'
import { useDragAndDrop } from '../hooks/useDragAndDrop'
import { loadProgress, addCollectedWord, completeMission, unlockWorld } from '../hooks/useProgress'
import { getDialog } from '../utils/dialogs'
import { FRUITS_WORLD } from '../data/words/fruits'
import { useMissionSelector, getDifficultyLabel } from '../hooks/useMissionSelector'
import WordObject from '../components/WordObject'
import MissionBanner from '../components/MissionBanner'
import RewardPopup from '../components/RewardPopup'
import BackpackDropZone from '../components/BackpackDropZone'
import SentenceBuilder from '../components/SentenceBuilder'
import SpeakingPractice from '../components/SpeakingPractice'
import FillTheGap from '../components/FillTheGap'

const Sparkle = ({ x, y }) => (<div className="absolute pointer-events-none" style={{ left: x, top: y, fontSize: '2rem', animation: 'sparkle 1s ease-out forwards' }}>✨</div>)

export default function FruitParty({ onBack, onBackpackOpen, showReward, profile, showZainetto }) {
  const audio = useAudio()
  const progress = loadProgress()
  const childAge = profile?.childAge || '4-5'
  const {
    currentMission,
    currentMissionIndex,
    totalMissions,
    nextMission,
    isComplete,
  } = useMissionSelector(FRUITS_WORLD, childAge)
  const [rewardVisible, setRewardVisible] = useState(false)
  const [rewardMessage, setRewardMessage] = useState('')
  const [collected, setCollected] = useState({})
  const [sparkles, setSparkles] = useState([])
  const [selectedMatch, setSelectedMatch] = useState(null)
  const [tapCompleted, setTapCompleted] = useState([])
  const [backpackOpen, setBackpackOpen] = useState(false)
  const [isCompleting, setIsCompleting] = useState(false)

  const showLocalReward = useCallback((msg) => {
    setRewardMessage(msg)
    setRewardVisible(true)
    setTimeout(() => setRewardVisible(false), 2000)
    if (showReward) showReward(msg)
  }, [showReward])

  const addSparkle = useCallback((x, y) => {
    const id = Date.now()
    setSparkles(prev => [...prev, { id, x, y }])
    setTimeout(() => setSparkles(prev => prev.filter(s => s.id !== id)), 1000)
  }, [])

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
    setCollected({})
    setTapCompleted([])
    setSelectedMatch(null)
    if (isComplete) { 
      unlockWorld('transport'); 
      const completeMsg = getDialog('world_complete', profile, { world: 'festa della frutta' }); 
      setTimeout(() => { 
        showLocalReward(completeMsg); 
        audio.speakItalian(completeMsg); 
        setTimeout(() => onBack(), 3000) 
      }, 1000) 
    } else { 
      nextMission() 
    }
  }, [currentMission, isCompleting, profile, isComplete, audio, showLocalReward, onBack, nextMission])

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
      const praise = profile ? `Bravo ${profile.childName}!` : 'Bravo!'
      audio.speakItalian(praise)
      addCollectedWord(word.id)
      setTimeout(() => handleMissionComplete(), 1500)
    } else {
      audio.speakItalian('Riprova!')
      setTimeout(() => setSelectedMatch(null), 800)
    }
  }, [currentMission, profile, audio, handleMissionComplete])

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
  }, [currentMission, profile, audio, handleMissionComplete, addSparkle])

  const {
    draggingObj,
    dragPos,
    isOverDropZone,
    handleStart: handleDragStart,
    registerDropZone,
  } = useDragAndDrop({ onDrop: handleDrop })

  useEffect(() => {
    if (currentMission) {
      setCollected({})
      setTapCompleted([])
      setSelectedMatch(null)
      setIsCompleting(false)
      const msg = profile ? `Ciao ${profile.childName}! Benvenuto alla festa della frutta!` : 'Benvenuto alla festa della frutta!'
      audio.speakItalian(msg)
      if (showZainetto) showZainetto(msg)
    }
  }, [currentMissionIndex])

  const renderExercise = () => {
    if (!currentMission) return null
    switch (currentMission.type) {
      case 'tap': return (<div className="absolute inset-0 flex flex-col items-center justify-center pt-20"><p className="text-white text-xl font-bold mb-8 drop-shadow-lg">{currentMission.instruction} ({tapCompleted.length}/{FRUITS_WORLD.words.length})</p><div className="flex flex-wrap gap-6 justify-center px-4">{FRUITS_WORLD.words.map(word => (<WordObject key={word.id} obj={word} onTap={handleTap} isCollected={tapCompleted.includes(word.id)} isTarget={!tapCompleted.includes(word.id)} missionActive={true} audio={audio} />))}</div></div>)
      case 'drag': return (
        <div className="absolute inset-0 flex flex-col items-center justify-center pt-20 pb-32">
          <p className="text-white text-xl font-bold mb-6 drop-shadow-lg text-center">{currentMission.instruction}</p>
          <div className="flex flex-wrap gap-6 justify-center px-4">
            {FRUITS_WORLD.words.map(word => (<WordObject key={word.id} obj={word} onTap={handleTap} onDragStart={(e) => handleDragStart(e, word)} isCollected={!!collected[word.id]} isTarget={currentMission.targetWords.includes(word.id)} missionActive={true} audio={audio} />))}
          </div>
          {draggingObj && (<div className="fixed pointer-events-none z-50 transition-transform duration-75" style={{ left: dragPos.x - 40, top: dragPos.y - 40, transform: 'scale(1.3)', filter: 'drop-shadow(0 12px 24px rgba(0,0,0,0.4))' }}><div className="text-7xl">{draggingObj.emoji}</div></div>)}
          {sparkles.map(s => <Sparkle key={s.id} x={s.x} y={s.y} />)}
        </div>
      )
      case 'match': const targetWord = FRUITS_WORLD.words.find(w => currentMission.targetWords.includes(w.id)); const options = [targetWord, ...FRUITS_WORLD.words.filter(w => !currentMission.targetWords.includes(w.id)).slice(0, 2)]; const shuffled = [...options].sort(() => Math.random() - 0.5); return (<div className="absolute inset-0 flex flex-col items-center justify-center pt-20"><p className="text-white text-xl font-bold mb-8 drop-shadow-lg">{currentMission.instruction}</p><div className="flex gap-6 justify-center px-4">{shuffled.map(word => (<div key={word.id} className={`cursor-pointer transition-all duration-300 ${selectedMatch === word.id ? 'scale-110' : 'hover:scale-105'}`} onClick={() => handleMatchSelect(word)}><div className="text-6xl">{word.emoji}</div>{selectedMatch === word.id && currentMission.targetWords.includes(word.id) && (<div className="text-green-400 text-2xl mt-2">✓</div>)}</div>))}</div></div>)
      case 'sentence': return <SentenceBuilder sentences={currentMission.sentences} audio={audio} profile={profile} onComplete={handleMissionComplete} />
      case 'speaking': return <SpeakingPractice sentences={currentMission.sentences} audio={audio} profile={profile} onComplete={handleMissionComplete} />
      case 'fillgap': return <FillTheGap sentences={currentMission.sentences} audio={audio} profile={profile} onComplete={handleMissionComplete} />
      default: return null
    }
  }

  const hasDragMission = currentMission?.type === 'drag'

  return (
    <div className={`relative w-full h-screen overflow-hidden bg-gradient-to-br ${FRUITS_WORLD.background}`}>
      <style>{`@keyframes sparkle { 0% { opacity: 0; transform: scale(0) rotate(0deg); } 50% { opacity: 1; transform: scale(1.2) rotate(180deg); } 100% { opacity: 0; transform: scale(0) rotate(360deg); } }`}</style>
      <button onClick={onBack} className="absolute top-4 left-4 z-40 text-white font-bold bg-black bg-opacity-30 rounded-full px-4 py-2 hover:bg-opacity-50">← Mappa</button>
      <MissionBanner mission={currentMission?.instruction} completed={false} profile={profile} difficulty={getDifficultyLabel(childAge)} progress={`${currentMissionIndex + 1}/${totalMissions}`} />
      {!currentMission && <div className="absolute inset-0 flex items-center justify-center"><span className="text-white text-2xl font-bold">Caricamento...</span></div>}
      {currentMission && renderExercise()}
      {hasDragMission ? (
        <BackpackDropZone
          isOpen={backpackOpen}
          isDropTarget={isOverDropZone}
          collectedItems={progress.collectedWords.reduce((acc, w) => ({ ...acc, [w]: true }), {})}
          onToggle={() => setBackpackOpen(!backpackOpen)}
          objects={FRUITS_WORLD.words}
          profile={profile}
          hasTarget={!!draggingObj && currentMission.targetWords.includes(draggingObj.id)}
          registerDropZone={registerDropZone}
        />
      ) : (
        <BackpackDropZone
          isOpen={backpackOpen}
          isDropTarget={false}
          collectedItems={progress.collectedWords.reduce((acc, w) => ({ ...acc, [w]: true }), {})}
          onToggle={() => setBackpackOpen(!backpackOpen)}
          objects={FRUITS_WORLD.words}
          profile={profile}
          hasTarget={false}
          registerDropZone={registerDropZone}
        />
      )}
      <RewardPopup message={rewardMessage} visible={rewardVisible} />
    </div>
  )
}
