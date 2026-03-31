import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Key, ArrowRight, Loader2, CheckCircle, Sparkles, Gamepad2 } from 'lucide-react'
import toast from 'react-hot-toast'
import { supabase } from '../utils/supabase'

export default function AccessPin() {
  const [pin, setPin] = useState('')
  const [loading, setLoading] = useState(false)
  const [productData, setProductData] = useState(null)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (pin.trim().length !== 6) {
      toast.error('Il PIN deve essere di 6 cifre')
      return
    }

    setLoading(true)
    try {
      const { data, error } = await supabase.functions.invoke('verify-pin', {
        body: { pin: pin.trim() },
      })

      if (error || data?.error) {
        toast.error(data?.error || 'PIN non valido. Controlla e riprova.')
        setProductData(null)
      } else {
        toast.success('PIN verificato con successo!')
        if (data.type === 'app' && data.product_id) {
          navigate(`/prodotto/${data.product_id}`)
        } else {
          setProductData(data)
        }
      }
    } catch (err) {
      toast.error('Errore di connessione. Riprova.')
    } finally {
      setLoading(false)
    }
  }

  if (productData) {
    return (
      <section className="py-20">
        <div className="max-w-xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="card-glass p-10 text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
              className="w-20 h-20 mx-auto mb-6 rounded-full bg-pastel-mint flex items-center justify-center"
            >
              <CheckCircle className="w-10 h-10 text-pastel-mint-dark" />
            </motion.div>
            <h2 className="font-display text-2xl font-bold text-gray-800 mb-3">
              Accesso sbloccato!
            </h2>
            <p className="font-body text-gray-500 mb-6">
              Ecco il tuo prodotto: <strong className="text-pastel-pink-dark">{productData.product_title}</strong>
            </p>
            <a
              href={productData.download_link}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center gap-2"
            >
              Scarica il prodotto
              <ArrowRight className="w-5 h-5" />
            </a>
            <button
              onClick={() => { setProductData(null); setPin('') }}
              className="block mx-auto mt-6 text-pastel-lavender-dark font-body font-medium hover:underline"
            >
              Verifica un altro PIN
            </button>
          </motion.div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-mesh">
      <div className="max-w-xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card-glass p-10"
        >
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200 }}
              className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-pastel-pink to-pastel-lavender flex items-center justify-center shadow-lg"
            >
              <Key className="w-9 h-9 text-pastel-pink-dark" />
            </motion.div>
            <h1 className="font-display text-2xl font-bold text-gray-800 mb-2">
              Accedi con il tuo PIN
            </h1>
            <p className="font-body text-gray-500">
              Inserisci il codice PIN a 6 cifre che hai ricevuto via email
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="pin" className="block font-body font-medium text-gray-600 mb-2">
                Codice PIN
              </label>
              <input
                id="pin"
                type="text"
                maxLength={6}
                value={pin}
                onChange={(e) => setPin(e.target.value.replace(/\D/g, ''))}
                placeholder="123456"
                className="input-field text-center text-2xl tracking-[0.5em] font-mono"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading || pin.length !== 6}
              className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Verifica in corso...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Verifica PIN
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 p-4 bg-pastel-lavender/30 rounded-2xl">
            <p className="font-body text-gray-500 text-sm text-center">
              Non hai ancora un PIN? Acquista un prodotto sulle nostre piattaforme e lo riceverai via email!
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
