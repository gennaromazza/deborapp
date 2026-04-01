import { useState, useEffect, useCallback } from 'react'
import useAudio from './hooks/useAudio'
import { loadProgress, saveProgress, addCollectedWord, completeMission, unlockWorld } from './hooks/useProgress'
import { useUserProfile, saveUserProfile } from './hooks/useUserProfile'
import { getDialog } from './utils/dialogs'
import { checkAndUnlockStickers, StickerBook, StickerUnlockPopup } from './utils/stickers.jsx'
import { WORLDS } from './data/worlds'
import OnboardingFlow from './components/OnboardingFlow'
import AvatarDisplay from './components/AvatarDisplay'
import InteractiveTutorial from './components/InteractiveTutorial'
import WorldMap from './components/WorldMap'
import BackpackView from './components/BackpackView'
import VoiceWarning from './components/VoiceWarning'
import RewardPopup from './components/RewardPopup'
import ZainettoGuide from './components/ZainettoGuide'
import RainbowWorld from './worlds/RainbowWorld'
import MyLittlePets from './worlds/MyLittlePets'
import IntoTheWild from './worlds/IntoTheWild'
import FruitParty from './worlds/FruitParty'
import OnTheMove from './worlds/OnTheMove'

export default function MagicBackpackRainbowWorld({ productId, chapterId }) {
  const audio = useAudio()
  const { profile, updateProfile, isOnboarded } = useUserProfile()
  const [currentView, setCurrentView] = useState('map')
  const [progress, setProgress] = useState(loadProgress())
  const [rewardVisible, setRewardVisible] = useState(false)
  const [rewardMessage, setRewardMessage] = useState('')
  const [showOnboarding, setShowOnboarding] = useState(!isOnboarded)
  const [showTutorial, setShowTutorial] = useState(false)
  const [zainettoMessage, setZainettoMessage] = useState('')
  const [zainettoVisible, setZainettoVisible] = useState(false)
  const [showStickerBook, setShowStickerBook] = useState(false)
  const [newSticker, setNewSticker] = useState(null)
  const [magicMoment, setMagicMoment] = useState(null)

  useEffect(() => {
    if (isOnboarded && profile?.childName) {
      const welcomeMsg = getDialog('welcome', profile)
      setTimeout(() => {
        audio.speakItalian(welcomeMsg)
        setZainettoMessage(welcomeMsg)
        setZainettoVisible(true)
      }, 500)
    }
  }, [isOnboarded])

  useEffect(() => {
    const hasSeenTutorial = localStorage.getItem('magic-backpack-tutorial')
    if (isOnboarded && !hasSeenTutorial && currentView === 'map') {
      setShowTutorial(true)
    }
  }, [isOnboarded, currentView])

  const showZainetto = useCallback((msg) => {
    setZainettoMessage(msg)
    setZainettoVisible(true)
    audio.speakItalian(msg)
    setTimeout(() => setZainettoVisible(false), 4000)
  }, [audio])

  const handleOnboardingComplete = (data) => {
    const userProfile = {
      childName: data.childName,
      familyMembers: data.familyMembers || [],
      avatarUrl: data.photoPreview || null,
      consentGiven: data.consentGiven,
      createdAt: new Date().toISOString(),
    }
    saveUserProfile(userProfile)
    updateProfile(userProfile)
    setShowOnboarding(false)
  }

  const handleTutorialComplete = () => {
    localStorage.setItem('magic-backpack-tutorial', 'true')
    setShowTutorial(false)
    showZainetto('Ora tocca a te! Tocca un mondo per iniziare! 🌈')
  }

  const showReward = (msg) => {
    setRewardMessage(msg)
    setRewardVisible(true)
    setTimeout(() => setRewardVisible(false), 2000)
  }

  const handleWorldSelect = (worldId) => {
    setCurrentView(worldId)
    const world = WORLDS.find(w => w.id === worldId)
    if (profile) {
      const msg = `Andiamo nel mondo ${world?.name || worldId}!`
      showZainetto(msg)
    }
  }

  const handleBackToMap = () => {
    setProgress(loadProgress())
    setCurrentView('map')
    showZainetto('Bentornato alla mappa! Quale mondo scegli?')
  }

  const handleBackpackOpen = () => {
    setCurrentView('backpack')
    if (profile) {
      const msg = getDialog('backpack_open', profile, { count: progress.collectedWords.length })
      showZainetto(msg)
    }
  }

  const handleShowStickers = () => {
    setShowStickerBook(true)
  }

  useEffect(() => {
    const newStickers = checkAndUnlockStickers(progress)
    if (newStickers.length > 0) {
      setNewSticker(newStickers[0])
      audio.speakItalian(`Hai sbloccato un nuovo adesivo! ${newStickers[0].name}!`)
    }
  }, [progress])

  useEffect(() => {
    if (progress.collectedWords?.length > 0 && progress.collectedWords.length % 10 === 0) {
      setMagicMoment('coriandoli')
      setTimeout(() => setMagicMoment(null), 3000)
    }
  }, [progress.collectedWords?.length])

  const renderView = () => {
    const commonProps = {
      onBack: handleBackToMap,
      onBackpackOpen: handleBackpackOpen,
      showReward,
      profile,
      showZainetto,
    }

    switch (currentView) {
      case 'map':
        return <WorldMap onWorldSelect={handleWorldSelect} onBackpackOpen={handleBackpackOpen} profile={profile} onShowStickers={handleShowStickers} />
      case 'backpack':
        return <BackpackView onBack={handleBackToMap} profile={profile} />
      case 'rainbow':
        return <RainbowWorld {...commonProps} />
      case 'pets':
        return <MyLittlePets {...commonProps} />
      case 'wild':
        return <IntoTheWild {...commonProps} />
      case 'fruits':
        return <FruitParty {...commonProps} />
      case 'transport':
        return <OnTheMove {...commonProps} />
      default:
        return <WorldMap onWorldSelect={handleWorldSelect} onBackpackOpen={handleBackpackOpen} profile={profile} />
    }
  }

  if (showOnboarding) {
    return <OnboardingFlow onComplete={handleOnboardingComplete} />
  }

  return (
    <>
      {renderView()}
      <VoiceWarning voiceQuality={audio.voiceQuality} onDismiss={() => {}} />
      <RewardPopup message={rewardMessage} visible={rewardVisible} />
      <ZainettoGuide message={zainettoMessage} visible={zainettoVisible} audio={audio} />
      {showTutorial && <InteractiveTutorial onComplete={handleTutorialComplete} audio={audio} />}
      {showStickerBook && <StickerBook onClose={() => setShowStickerBook(false)} profile={profile} />}
      <StickerUnlockPopup sticker={newSticker} onClose={() => setNewSticker(null)} />
      {magicMoment === 'coriandoli' && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute text-2xl"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-${Math.random() * 20}%`,
                animation: `fall ${2 + Math.random() * 3}s linear forwards`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            >
              {['🎉', '⭐', '🌟', '✨', '🎊', '💫'][Math.floor(Math.random() * 6)]}
            </div>
          ))}
          <style>{`
            @keyframes fall {
              to { transform: translateY(120vh) rotate(360deg); opacity: 0; }
            }
          `}</style>
        </div>
      )}
    </>
  )
}
