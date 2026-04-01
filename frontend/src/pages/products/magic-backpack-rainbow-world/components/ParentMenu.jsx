import { useState } from 'react'
import { clearUserProfile } from '../hooks/useUserProfile'
import { clearProgress, loadProgress } from '../hooks/useProgress'
import { loadStickers } from '../utils/stickers'

export default function ParentMenu({ isOpen, onClose, profile, onEditProfile, onChangeAvatar, onResetProgress, onRestartOnboarding }) {
  const [showConfirm, setShowConfirm] = useState(false)
  const [confirmAction, setConfirmAction] = useState(null)
  const [parentGate, setParentGate] = useState(null)
  const [gateAnswer, setGateAnswer] = useState('')

  if (!isOpen) return null

  const generateGate = () => {
    const ops = ['+', '×']
    const op = ops[Math.floor(Math.random() * ops.length)]
    let a, b, answer
    if (op === '+') {
      a = Math.floor(Math.random() * 20) + 10
      b = Math.floor(Math.random() * 30) + 10
      answer = a + b
    } else {
      a = Math.floor(Math.random() * 9) + 2
      b = Math.floor(Math.random() * 9) + 2
      answer = a * b
    }
    setParentGate({ question: `${a} ${op} ${b} = ?`, answer: String(answer) })
    setGateAnswer('')
  }

  const handleAction = (action) => {
    if (action === 'reset' || action === 'fullReset' || action === 'export') {
      generateGate()
      setConfirmAction(action)
      setShowConfirm(true)
    } else if (action === 'import') {
      const input = document.createElement('input')
      input.type = 'file'
      input.accept = '.json'
      input.onchange = (e) => {
        const file = e.target.files[0]
        if (!file) return
        const reader = new FileReader()
        reader.onload = (ev) => {
          try {
            const data = JSON.parse(ev.target.result)
            if (data.profile) {
              localStorage.setItem('magic-backpack-user', JSON.stringify(data.profile))
            }
            if (data.progress) {
              localStorage.setItem('magic-backpack-progress', JSON.stringify(data.progress))
            }
            if (data.stickers !== undefined) {
              localStorage.setItem('magic-backpack-stickers', JSON.stringify(data.stickers))
            }
            window.location.reload()
          } catch {
            alert('File non valido')
          }
        }
        reader.readAsText(file)
      }
      input.click()
    } else {
      onClose()
      action()
    }
  }

  const handleGateSubmit = () => {
    if (gateAnswer === parentGate.answer) {
      if (confirmAction === 'reset') {
        clearProgress()
        onResetProgress?.()
      } else if (confirmAction === 'fullReset') {
        clearProgress()
        clearUserProfile()
        localStorage.removeItem('magic-backpack-stickers')
        onRestartOnboarding?.()
      } else if (confirmAction === 'export') {
        const data = {
          profile: JSON.parse(localStorage.getItem('magic-backpack-user') || '{}'),
          progress: loadProgress(),
          stickers: loadStickers(),
          exportedAt: new Date().toISOString(),
        }
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `magic-backpack-backup-${new Date().toISOString().split('T')[0]}.json`
        a.click()
        URL.revokeObjectURL(url)
      }
      setShowConfirm(false)
      setConfirmAction(null)
      setParentGate(null)
      onClose()
    } else {
      setGateAnswer('')
      generateGate()
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-3xl p-6 w-80 max-w-[90vw] shadow-2xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-purple-700">👨 Menu Genitori</h2>
          <button onClick={onClose} className="text-2xl text-gray-400 hover:text-gray-600">✕</button>
        </div>

        {showConfirm ? (
          parentGate ? (
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-2">Risolvi per confermare:</p>
              <p className="text-3xl font-bold text-purple-700 mb-4">{parentGate.question}</p>
              <input
                type="number"
                value={gateAnswer}
                onChange={(e) => setGateAnswer(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleGateSubmit()}
                className="w-full px-4 py-3 text-xl text-center rounded-xl border-4 border-purple-300 focus:border-purple-500 focus:outline-none mb-4"
                placeholder="?"
                autoFocus
              />
              <div className="flex gap-3 justify-center">
                <button
                  onClick={() => { setShowConfirm(false); setParentGate(null) }}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-xl font-bold"
                >
                  ❌ Annulla
                </button>
                <button
                  onClick={handleGateSubmit}
                  className="px-4 py-2 bg-purple-500 text-white rounded-xl font-bold"
                >
                  ✅ Conferma
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <p className="text-lg text-gray-700 mb-4">
                {confirmAction === 'reset'
                  ? 'Resettare tutti i progressi?'
                  : 'Eliminare tutto incluso il profilo?'}
              </p>
              <div className="flex gap-3 justify-center">
                <button
                  onClick={() => setShowConfirm(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-xl font-bold"
                >
                  ❌ Annulla
                </button>
                <button
                  onClick={() => { generateGate() }}
                  className="px-4 py-2 bg-red-500 text-white rounded-xl font-bold"
                >
                  ✅ Conferma
                </button>
              </div>
            </div>
          )
        ) : (
          <div className="space-y-3">
            <button
              onClick={() => handleAction(onEditProfile)}
              className="w-full p-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-bold flex items-center gap-3 hover:scale-105 transition-transform"
            >
              <span className="text-2xl">👤</span>
              <div className="text-left">
                <div>Modifica profilo bambino</div>
                <div className="text-xs opacity-80">Cambia nome e familiari</div>
              </div>
            </button>

            <button
              onClick={() => handleAction(onChangeAvatar)}
              className="w-full p-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl font-bold flex items-center gap-3 hover:scale-105 transition-transform"
            >
              <span className="text-2xl">📸</span>
              <div className="text-left">
                <div>Cambia foto avatar</div>
                <div className="text-xs opacity-80">Carica una nuova foto</div>
              </div>
            </button>

            <button
              onClick={() => handleAction(() => onEditProfile?.())}
              className="w-full p-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-bold flex items-center gap-3 hover:scale-105 transition-transform"
            >
              <span className="text-2xl">🏆</span>
              <div className="text-left">
                <div>Vedi progressi</div>
                <div className="text-xs opacity-80">Parole e stickers collezionati</div>
              </div>
            </button>

            <button
              onClick={() => handleAction('export')}
              className="w-full p-4 bg-gradient-to-r from-indigo-500 to-blue-500 text-white rounded-xl font-bold flex items-center gap-3 hover:scale-105 transition-transform"
            >
              <span className="text-2xl">💾</span>
              <div className="text-left">
                <div>Esporta backup</div>
                <div className="text-xs opacity-80">Salva progressi su file</div>
              </div>
            </button>

            <button
              onClick={() => handleAction('import')}
              className="w-full p-4 bg-gradient-to-r from-teal-500 to-green-500 text-white rounded-xl font-bold flex items-center gap-3 hover:scale-105 transition-transform"
            >
              <span className="text-2xl">📂</span>
              <div className="text-left">
                <div>Importa backup</div>
                <div className="text-xs opacity-80">Ripristina da file</div>
              </div>
            </button>

            <button
              onClick={() => handleAction('reset')}
              className="w-full p-4 bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-xl font-bold flex items-center gap-3 hover:scale-105 transition-transform"
            >
              <span className="text-2xl">🔄</span>
              <div className="text-left">
                <div>Resetta progressi</div>
                <div className="text-xs opacity-80">Ricomincia da capo i mondi</div>
              </div>
            </button>

            <button
              onClick={() => handleAction('fullReset')}
              className="w-full p-4 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl font-bold flex items-center gap-3 hover:scale-105 transition-transform"
            >
              <span className="text-2xl">🗑️</span>
              <div className="text-left">
                <div>Elimina profilo</div>
                <div className="text-xs opacity-80">Rimuovi tutto e ricomincia</div>
              </div>
            </button>
          </div>
        )}
      </div>
    </div>
  )
}