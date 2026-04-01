import { useState, useEffect, useRef } from 'react'

export default function SpeakingPractice({ sentences, audio, profile, onComplete }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [listenCount, setListenCount] = useState(0)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [completed, setCompleted] = useState(false)
  const [hasMic, setHasMic] = useState(null)
  const [isRecording, setIsRecording] = useState(false)
  const [recordingUrl, setRecordingUrl] = useState(null)
  const [micChecked, setMicChecked] = useState(false)
  const [showFallback, setShowFallback] = useState(false)
  const [selfRating, setSelfRating] = useState(null)
  const mediaRecorderRef = useRef(null)
  const chunksRef = useRef([])
  const streamRef = useRef(null)

  const currentSentence = sentences[currentIndex]

  useEffect(() => {
    if (currentSentence) {
      setListenCount(0)
      setCompleted(false)
      setRecordingUrl(null)
      setSelfRating(null)
      audio.speakSentence(currentSentence.english)
    }
  }, [currentIndex, currentSentence])

  useEffect(() => {
    if (!micChecked) {
      checkMicrophone()
    }
  }, [])

  const checkMicrophone = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      setHasMic(true)
      stream.getTracks().forEach(track => track.stop())
    } catch {
      setHasMic(false)
      setShowFallback(true)
    }
    setMicChecked(true)
  }

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      streamRef.current = stream
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder
      chunksRef.current = []

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data)
      }

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' })
        const url = URL.createObjectURL(blob)
        setRecordingUrl(url)
        stream.getTracks().forEach(track => track.stop())
      }

      mediaRecorder.start()
      setIsRecording(true)
    } catch {
      setShowFallback(true)
      setHasMic(false)
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop()
    }
    setIsRecording(false)
  }

  const handleListen = (mode = 'sentence') => {
    setIsSpeaking(true)
    switch (mode) {
      case 'word':
        audio.speakWord(currentSentence.english.split(' ')[0])
        break
      case 'slow':
        audio.speak(currentSentence.english, { mode: 'slow' })
        break
      case 'sentence':
      default:
        audio.speakSentence(currentSentence.english)
        break
    }
    setTimeout(() => setIsSpeaking(false), 2000)
    setListenCount(prev => prev + 1)
  }

  const handleComplete = () => {
    setCompleted(true)
    audio.speak(profile ? `Bravo ${profile.childName}!` : 'Great job!')
    setTimeout(() => {
      if (currentIndex < sentences.length - 1) {
        setCurrentIndex(currentIndex + 1)
        setCompleted(false)
        setRecordingUrl(null)
        setSelfRating(null)
      } else {
        onComplete()
      }
    }, 2000)
  }

  if (!currentSentence) return null

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center pt-16 px-4">
      <style>{`
        @keyframes pulse-ring {
          0% { transform: scale(0.8); opacity: 1; }
          100% { transform: scale(1.5); opacity: 0; }
        }
        @keyframes popIn {
          0% { opacity: 0; transform: scale(0.5); }
          70% { transform: scale(1.1); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes recordPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7); }
          50% { box-shadow: 0 0 0 15px rgba(239, 68, 68, 0); }
        }
        .pulse-ring { animation: pulse-ring 1s ease-out infinite; }
        .pop-in { animation: popIn 0.5s ease-out; }
        .bounce { animation: bounce 0.6s ease; }
        .record-pulse { animation: recordPulse 1.5s ease-in-out infinite; }
      `}</style>

      <div className="bg-white bg-opacity-90 rounded-2xl px-6 py-4 mb-6 shadow-lg max-w-lg w-full text-center">
        <p className="text-sm text-gray-500 mb-2">🗣️ Ascolta e ripeti!</p>
        <p className="text-2xl font-bold text-purple-700 mb-2">{currentSentence.english}</p>
        <p className="text-gray-500 italic">{currentSentence.italian}</p>
      </div>

      <div className="relative mb-6">
        {isSpeaking && (
          <div className="absolute inset-0 rounded-full bg-purple-400 opacity-30 pulse-ring" />
        )}
        {isRecording && (
          <div className="absolute inset-0 rounded-full bg-red-400 opacity-30 pulse-ring" />
        )}
        <div className={`relative w-28 h-28 rounded-full flex items-center justify-center shadow-xl transition-all ${
          isRecording
            ? 'bg-gradient-to-br from-red-500 to-red-600 record-pulse'
            : isSpeaking
            ? 'bg-gradient-to-br from-purple-500 to-pink-500'
            : 'bg-gradient-to-br from-blue-500 to-cyan-500'
        }`}>
          <span className="text-5xl">
            {isRecording ? '⏺️' : isSpeaking ? '🔊' : '🎤'}
          </span>
        </div>
      </div>

      <div className="flex gap-3 mb-6 flex-wrap justify-center">
        <button
          className="px-4 py-2 bg-white bg-opacity-80 rounded-full font-bold text-purple-700 hover:bg-opacity-100 transition-all text-sm"
          onClick={() => handleListen('word')}
        >
          🔤 Parola
        </button>
        <button
          className="px-4 py-2 bg-white bg-opacity-80 rounded-full font-bold text-blue-700 hover:bg-opacity-100 transition-all text-sm"
          onClick={() => handleListen('slow')}
        >
          🐢 Lento
        </button>
        <button
          className="px-4 py-2 bg-white bg-opacity-80 rounded-full font-bold text-green-700 hover:bg-opacity-100 transition-all text-sm"
          onClick={() => handleListen('sentence')}
        >
          💬 Frase
        </button>
      </div>

      <div className="flex gap-4 mb-6">
        {hasMic && (
          <button
            className={`px-6 py-3 rounded-full font-bold text-lg transition-all flex items-center gap-2 ${
              isRecording
                ? 'bg-red-500 text-white hover:bg-red-600'
                : 'bg-gradient-to-r from-orange-400 to-red-500 text-white hover:scale-105'
            }`}
            onClick={isRecording ? stopRecording : startRecording}
          >
            {isRecording ? '⏹️ Stop' : '🎙️ Registra'}
          </button>
        )}

        {recordingUrl && (
          <div className="flex items-center gap-2">
            <audio controls src={recordingUrl} className="h-10" />
          </div>
        )}
      </div>

      {showFallback && (
        <div className="bg-yellow-100 border-2 border-yellow-400 rounded-xl px-4 py-3 mb-4 max-w-sm text-center">
          <p className="text-sm text-yellow-800">
            ⚠️ Microfono non disponibile. Puoi comunque ascoltare e premere "Ho ripetuto!"
          </p>
        </div>
      )}

      {recordingUrl && !selfRating && (
        <div className="bg-white bg-opacity-90 rounded-xl px-4 py-3 mb-4 max-w-sm text-center">
          <p className="text-sm text-gray-600 mb-2">Come è andata? Vota la tua pronuncia:</p>
          <div className="flex gap-2 justify-center">
            {[1, 2, 3].map(star => (
              <button
                key={star}
                onClick={() => setSelfRating(star)}
                className="text-3xl hover:scale-125 transition-transform"
              >
                {star <= selfRating ? '⭐' : '☆'}
              </button>
            ))}
          </div>
        </div>
      )}

      <button
        className={`px-10 py-4 rounded-full font-bold text-xl transition-all flex items-center gap-3 ${
          completed
            ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white bounce'
            : 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white hover:scale-105'
        }`}
        onClick={handleComplete}
      >
        {completed ? (
          <>✅ Bravo!</>
        ) : (
          <>{recordingUrl ? '✅ Ho ripetuto!' : '🎤 Tocca per ripetere!'}</>
        )}
      </button>

      <p className="text-white text-sm mt-4 opacity-70 text-center">
        Ascoltato {listenCount} volte • Frase {currentIndex + 1} di {sentences.length}
        {hasMic && !isRecording && !recordingUrl && (
          <span className="block text-xs mt-1">Premi 🎙️ Registra per ascoltare la tua voce</span>
        )}
      </p>

      {completed && (
        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-3xl px-8 py-6 shadow-2xl pop-in">
            <p className="text-2xl font-bold text-white text-center">
              {profile ? `Ottimo ${profile.childName}! 🌟` : 'Ottimo! 🌟'}
            </p>
            <p className="text-lg text-white text-center mt-2">La tua pronuncia è fantastica!</p>
          </div>
        </div>
      )}
    </div>
  )
}