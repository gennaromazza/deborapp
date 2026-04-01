import { useState, useEffect, useCallback } from 'react'

const useAudio = () => {
  const [voices, setVoices] = useState([])
  const [enVoice, setEnVoice] = useState(null)
  const [itVoice, setItVoice] = useState(null)
  const [voiceQuality, setVoiceQuality] = useState('unknown')
  const [isSpeaking, setIsSpeaking] = useState(false)

  useEffect(() => {
    const loadVoices = () => {
      const allVoices = window.speechSynthesis.getVoices()
      setVoices(allVoices)

      const gbVoice = allVoices.find(v => v.lang.toLowerCase() === 'en-gb')
      const usVoice = allVoices.find(v => v.lang.toLowerCase() === 'en-us')
      const enVoice = allVoices.find(v => v.lang.toLowerCase().startsWith('en'))
      
      const itVoice = allVoices.find(v => v.lang.toLowerCase() === 'it-it') ||
                      allVoices.find(v => v.lang.toLowerCase().startsWith('it'))

      setEnVoice(gbVoice || usVoice || enVoice || null)
      setItVoice(itVoice || null)

      if (gbVoice || usVoice) {
        setVoiceQuality(gbVoice ? 'excellent' : 'good')
      } else if (enVoice) {
        setVoiceQuality('fallback')
      } else {
        setVoiceQuality('none')
      }
    }

    loadVoices()

    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices
    }

    return () => {
      window.speechSynthesis.onvoiceschanged = null
      window.speechSynthesis.cancel()
    }
  }, [])

  const speak = useCallback((text, options = {}) => {
    const { lang = 'en', mode = 'word', rate, pitch = 1.05 } = options

    window.speechSynthesis.cancel()

    let spokenText = text
    let spokenRate = rate
    let spokenPitch = pitch

    switch (mode) {
      case 'slow':
        spokenRate = rate || 0.7
        spokenPitch = pitch - 0.1
        break
      case 'sentence':
        spokenText = text
        spokenRate = rate || 0.9
        break
      default:
        spokenRate = rate || 0.9
        break
    }

    const utterance = new SpeechSynthesisUtterance(spokenText)
    utterance.rate = spokenRate
    utterance.pitch = spokenPitch
    utterance.volume = 1

    if (lang === 'it' && itVoice) {
      utterance.voice = itVoice
      utterance.lang = 'it-IT'
    } else if (lang === 'en' && enVoice) {
      utterance.voice = enVoice
      utterance.lang = 'en-GB'
    } else {
      utterance.lang = lang === 'it' ? 'it-IT' : 'en-GB'
    }

    utterance.onstart = () => setIsSpeaking(true)
    utterance.onend = () => setIsSpeaking(false)
    utterance.onerror = () => setIsSpeaking(false)

    window.speechSynthesis.speak(utterance)
  }, [enVoice, itVoice])

  const speakWord = useCallback((word) => {
    speak(word, { lang: 'en', mode: 'word' })
  }, [speak])

  const speakSlow = useCallback((word) => {
    speak(word, { lang: 'en', mode: 'slow' })
  }, [speak])

  const speakSentence = useCallback((word) => {
    speak(word, { lang: 'en', mode: 'sentence' })
  }, [speak])

  const speakItalian = useCallback((text) => {
    speak(text, { lang: 'it', mode: 'word' })
  }, [speak])

  const stop = useCallback(() => {
    window.speechSynthesis.cancel()
    setIsSpeaking(false)
  }, [])

  return {
    speak,
    speakWord,
    speakSlow,
    speakSentence,
    speakItalian,
    stop,
    isSpeaking,
    enVoice,
    itVoice,
    voices,
    voiceQuality,
    hasEnglishVoice: voiceQuality !== 'none',
  }
}

export default useAudio
