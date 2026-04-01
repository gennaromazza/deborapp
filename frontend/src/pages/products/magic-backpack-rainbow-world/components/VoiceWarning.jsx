const VoiceWarning = ({ voiceQuality, onDismiss }) => {
  if (voiceQuality === 'excellent' || voiceQuality === 'good') return null

  const getMessage = () => {
    switch (voiceQuality) {
      case 'fallback':
        return {
          title: 'Audio disponibile',
          text: 'La voce inglese potrebbe non essere ottimale. Per la migliore pronuncia, usa Microsoft Edge.',
          action: 'Edge ha voci inglesi migliori',
        }
      case 'none':
        return {
          title: 'Voce inglese non trovata',
          text: 'Per una migliore esperienza audio, usa Microsoft Edge oppure installa una voce inglese nelle impostazioni del dispositivo.',
          action: 'Come installare una voce inglese',
        }
      default:
        return null
    }
  }

  const message = getMessage()
  if (!message) return null

  return (
    <div className="fixed top-4 right-4 z-50 max-w-sm">
      <div className="bg-yellow-100 border-l-4 border-yellow-500 rounded-lg shadow-lg p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <span className="text-2xl">🔊</span>
          </div>
          <div className="ml-3 flex-1">
            <h3 className="text-sm font-bold text-yellow-800">{message.title}</h3>
            <p className="mt-1 text-xs text-yellow-700">{message.text}</p>
            {voiceQuality === 'none' && (
              <a
                href="https://support.microsoft.com/en-gb/windows/learn-to-use-narrator-with-microsoft-edge-6239097c-2b07-4d46-a28f-8f1e9f3e7e7f"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-block text-xs font-medium text-yellow-800 underline hover:text-yellow-900"
              >
                {message.action} →
              </a>
            )}
          </div>
          <button
            onClick={onDismiss}
            className="ml-4 flex-shrink-0 text-yellow-600 hover:text-yellow-800"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  )
}

export default VoiceWarning
