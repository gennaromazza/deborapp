import { useState, useEffect } from 'react'
import useAudio from '../hooks/useAudio'
import { loadProgress, addCollectedWord, completeMission, unlockWorld } from '../hooks/useProgress'
import { WILD_WORLD } from '../data/words/wild'
import WordObject from '../components/WordObject'
import MissionBanner from '../components/MissionBanner'
import RewardPopup from '../components/RewardPopup'
import Backpack from '../components/Backpack'
import SentenceBuilder from '../components/SentenceBuilder'
import SpeakingPractice from '../components/SpeakingPractice'
import FillTheGap from '../components/FillTheGap'

const Sparkle = ({ x, y }) => (<div className="absolute pointer-events-none" style={{ left: x, top: y, fontSize: '2rem', animation: 'sparkle 1s ease-out forwards' }}>✨</div>)

export default function IntoTheWild({ onBack, onBackpackOpen, showReward, profile, showZainetto }) {
  const audio = useAudio()
  const progress = loadProgress()
  const [currentMission, setCurrentMission] = useState(WILD_WORLD.missions[0])
  const [missionIndex, setMissionIndex] = useState(0)
  const [rewardVisible, setRewardVisible] = useState(false)
  const [rewardMessage, setRewardMessage] = useState('')
  const [collected, setCollected] = useState({})
  const [draggingObj, setDraggingObj] = useState(null)
  const [dragPos, setDragPos] = useState({ x: 0, y: 0 })
  const [sparkles, setSparkles] = useState([])
  const [selectedMatch, setSelectedMatch] = useState(null)
  const [tapCompleted, setTapCompleted] = useState([])

  useEffect(() => {
    const msg = profile ? `Ciao ${profile.childName}! Benvenuto nella giungla!` : 'Benvenuto nella giungla!'
    audio.speakItalian(msg)
    if (showZainetto) showZainetto(msg)
  }, [])

  const showLocalReward = (msg) => { setRewardMessage(msg); setRewardVisible(true); setTimeout(() => setRewardVisible(false), 2000); if (showReward) showReward(msg) }
  const addSparkle = (x, y) => { const id = Date.now(); setSparkles(prev => [...prev, { id, x, y }]); setTimeout(() => setSparkles(prev => prev.filter(s => s.id !== id)), 1000) }

  const handleMissionComplete = () => {
    completeMission(currentMission.id)
    const successMsg = profile ? `Bravo ${profile.childName}! 🎉` : 'Bravo! 🎉'
    showLocalReward(successMsg)
    audio.speakItalian(successMsg)
    const nextIndex = missionIndex + 1
    if (nextIndex < WILD_WORLD.missions.length) { setMissionIndex(nextIndex); setCurrentMission(WILD_WORLD.missions[nextIndex]); setCollected({}); setTapCompleted([]); setSelectedMatch(null) }
    else { unlockWorld('fruits'); const completeMsg = profile ? `${profile.childName} ha completato la giungla! 🏆` : 'Mondo completato! 🏆'; setTimeout(() => { showLocalReward(completeMsg); audio.speakItalian(completeMsg); setTimeout(() => onBack(), 3000) }, 1000) }
  }

  const handleTap = (word) => { audio.speakWord(word.word); if (currentMission.type === 'tap' && !tapCompleted.includes(word.id)) { setTapCompleted([...tapCompleted, word.id]); addCollectedWord(word.id); if (tapCompleted.length + 1 >= WILD_WORLD.words.length) setTimeout(() => handleMissionComplete(), 1000) } }
  const handleDragStart = (e, obj) => {
    if (collected[obj.id]) return
    const clientX = e.touches ? e.touches[0].clientX : e.clientX; const clientY = e.touches ? e.touches[0].clientY : e.clientY; setDraggingObj(obj); setDragPos({ x: clientX, y: clientY })
    const handleMove = (ev) => { const cx = ev.touches ? ev.touches[0].clientX : ev.clientX; const cy = ev.touches ? ev.touches[0].clientY : ev.clientY; setDragPos({ x: cx, y: cy }) }
    const handleEnd = () => { document.removeEventListener('mousemove', handleMove); document.removeEventListener('mouseup', handleEnd); document.removeEventListener('touchmove', handleMove); document.removeEventListener('touchend', handleEnd); const backpackY = window.innerHeight - 120; const backpackX = window.innerWidth / 2; const dist = Math.sqrt(Math.pow(dragPos.x - backpackX, 2) + Math.pow(dragPos.y - backpackY, 2)); if (dist < 150 && currentMission.targetWords.includes(obj.id)) { setCollected(prev => ({ ...prev, [obj.id]: true })); addSparkle(dragPos.x, dragPos.y); const praise = profile ? `Bravo ${profile.childName}!` : 'Bravo!'; audio.speakItalian(praise); addCollectedWord(obj.id); setTimeout(() => handleMissionComplete(), 1000) } else if (dist < 150) audio.speakItalian('Riprova!'); setDraggingObj(null) }
    document.addEventListener('mousemove', handleMove); document.addEventListener('mouseup', handleEnd); document.addEventListener('touchmove', handleMove); document.addEventListener('touchend', handleEnd)
  }
  const handleMatchSelect = (word) => { setSelectedMatch(word.id); if (currentMission.targetWords.includes(word.id)) { const praise = profile ? `Bravo ${profile.childName}!` : 'Bravo!'; audio.speakItalian(praise); addCollectedWord(word.id); setTimeout(() => handleMissionComplete(), 1500) } else { audio.speakItalian('Riprova!'); setTimeout(() => setSelectedMatch(null), 800) } }

  const renderExercise = () => {
    switch (currentMission.type) {
      case 'tap': return (<div className="absolute inset-0 flex flex-col items-center justify-center pt-20"><p className="text-white text-xl font-bold mb-8 drop-shadow-lg">{currentMission.instruction} ({tapCompleted.length}/{WILD_WORLD.words.length})</p><div className="flex flex-wrap gap-6 justify-center px-4">{WILD_WORLD.words.map(word => (<WordObject key={word.id} obj={word} onTap={handleTap} isCollected={tapCompleted.includes(word.id)} isTarget={!tapCompleted.includes(word.id)} missionActive={true} />))}</div></div>)
      case 'drag': return (<div className="absolute inset-0 flex flex-col items-center justify-center pt-20"><div className="flex flex-wrap gap-6 justify-center px-4">{WILD_WORLD.words.map(word => (<WordObject key={word.id} obj={word} onTap={() => audio.speakWord(word.word)} onDragStart={handleDragStart} isCollected={!!collected[word.id]} isTarget={currentMission.targetWords.includes(word.id)} missionActive={true} />))}</div>{draggingObj && (<div className="fixed pointer-events-none z-50 text-6xl" style={{ left: dragPos.x - 40, top: dragPos.y - 40, transform: 'scale(1.2)', filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.3))' }}>{draggingObj.emoji}</div>)}{sparkles.map(s => <Sparkle key={s.id} x={s.x} y={s.y} />)}</div>)
      case 'match': const targetWord = WILD_WORLD.words.find(w => currentMission.targetWords.includes(w.id)); const options = [targetWord, ...WILD_WORLD.words.filter(w => !currentMission.targetWords.includes(w.id)).slice(0, 2)]; const shuffled = [...options].sort(() => Math.random() - 0.5); return (<div className="absolute inset-0 flex flex-col items-center justify-center pt-20"><p className="text-white text-xl font-bold mb-8 drop-shadow-lg">{currentMission.instruction}</p><div className="flex gap-6 justify-center px-4">{shuffled.map(word => (<div key={word.id} className={`cursor-pointer transition-all duration-300 ${selectedMatch === word.id ? 'scale-110' : 'hover:scale-105'}`} onClick={() => handleMatchSelect(word)}><div className="text-6xl">{word.emoji}</div>{selectedMatch === word.id && currentMission.targetWords.includes(word.id) && (<div className="text-green-400 text-2xl mt-2">✓</div>)}</div>))}</div></div>)
      case 'sentence': return <SentenceBuilder sentences={currentMission.sentences} audio={audio} profile={profile} onComplete={handleMissionComplete} />
      case 'speaking': return <SpeakingPractice sentences={currentMission.sentences} audio={audio} profile={profile} onComplete={handleMissionComplete} />
      case 'fillgap': return <FillTheGap sentences={currentMission.sentences} audio={audio} profile={profile} onComplete={handleMissionComplete} />
      default: return null
    }
  }

  return (
    <div className={`relative w-full h-screen overflow-hidden bg-gradient-to-br ${WILD_WORLD.background}`}>
      <style>{`@keyframes sparkle { 0% { opacity: 0; transform: scale(0) rotate(0deg); } 50% { opacity: 1; transform: scale(1.2) rotate(180deg); } 100% { opacity: 0; transform: scale(0) rotate(360deg); } }`}</style>
      <button onClick={onBack} className="absolute top-4 left-4 z-40 text-white font-bold bg-black bg-opacity-30 rounded-full px-4 py-2 hover:bg-opacity-50">← Mappa</button>
      <MissionBanner mission={currentMission?.instruction} completed={false} profile={profile} />
      {renderExercise()}
      <Backpack isOpen={false} animation="" collectedItems={progress.collectedWords.reduce((acc, w) => ({ ...acc, [w]: true }), {})} onToggle={onBackpackOpen} objects={WILD_WORLD.words} profile={profile} />
      <RewardPopup message={rewardMessage} visible={rewardVisible} />
    </div>
  )
}
