import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Key, ArrowRight, Loader2, CheckCircle, Sparkles, Gamepad2, FileText, Package } from 'lucide-react'
import toast from 'react-hot-toast'
import { supabase } from '../utils/supabase'
import Breadcrumb from '../components/Breadcrumb'
import PageTransition from '../components/PageTransition'

export default function AccessPin() {
  const [pin, setPin] = useState('')
  const [loading, setLoading] = useState(false)
  const [productData, setProductData] = useState(null)
  const [customerName, setCustomerName] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    document.title = 'Accedi con il tuo PIN - Debora di Bellucci'

    const setMeta = (name, content, attr = 'name') => {
      let el = document.querySelector(`meta[${attr}="${name}"]`)
      if (!el) {
        el = document.createElement('meta')
        el.setAttribute(attr, name)
        document.head.appendChild(el)
      }
      el.setAttribute('content', content)
    }

    setMeta('description', 'Inserisci il tuo codice PIN a 6 cifre per accedere ai prodotti digitali acquistati. Hai ricevuto il PIN via email dopo l\'acquisto su Gumroad o Etsy.')
    setMeta('robots', 'noindex, nofollow')
    setMeta('og:title', 'Accedi con il tuo PIN - Debora di Bellucci')
    setMeta('og:description', 'Inserisci il tuo codice PIN per accedere ai prodotti digitali acquistati.', 'property')
    setMeta('og:type', 'website', 'property')
    setMeta('og:url', 'https://deborapp.vercel.app/accesso-pin', 'property')
    setMeta('og:image', 'https://deborapp.vercel.app/official_logo.png', 'property')
    setMeta('twitter:card', 'summary_large_image')
    setMeta('twitter:title', 'Accedi con il tuo PIN')
    setMeta('twitter:description', 'Inserisci il tuo codice PIN per accedere ai prodotti digitali.')
    setMeta('twitter:image', 'https://deborapp.vercel.app/official_logo.png')

    let canonical = document.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.setAttribute('rel', 'canonical')
      document.head.appendChild(canonical)
    }
    canonical.setAttribute('href', 'https://deborapp.vercel.app/accesso-pin')

    return () => {}
  }, [])

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
        setCustomerName('')
      } else {
        toast.success('Benvenuto!')
        setCustomerName(data.customer_name || '')
        
        if (data.type === 'app' && data.products?.length === 1) {
          navigate(`/prodotto/${data.products[0].id}`)
        } else {
          setProductData(data.products)
        }
      }
    } catch (err) {
      toast.error('Errore di connessione. Riprova.')
    } finally {
      setLoading(false)
    }
  }

  if (productData && productData.length > 0) {
    return (
      <PageTransition>
        <section className="py-20">
          <div className="max-w-2xl mx-auto px-4 sm:px-6">
            <Breadcrumb />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="card-glass p-8"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
                className="w-20 h-20 mx-auto mb-6 rounded-full bg-pastel-mint flex items-center justify-center"
              >
                <CheckCircle className="w-10 h-10 text-pastel-mint-dark" />
              </motion.div>
              
              <h2 className="font-display text-2xl font-bold text-gray-800 mb-2 text-center">
                Ciao{customerName ? `, ${customerName}` : ''}! 👋
              </h2>
              <p className="font-body text-gray-500 mb-8 text-center">
                Ecco i tuoi prodotti acquistati:
              </p>

              <div className="space-y-4">
                {productData.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="flex items-center gap-4 p-4 bg-white/60 rounded-2xl border border-pastel-lavender/30 hover:border-pastel-pink/50 transition-all"
                  >
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      product.type === 'app' 
                        ? 'bg-gradient-to-br from-pastel-pink to-pastel-lavender' 
                        : 'bg-gradient-to-br from-pastel-mint to-pastel-sky'
                    }`}>
                      {product.type === 'app' ? (
                        <Gamepad2 className="w-6 h-6 text-white" />
                      ) : (
                        <FileText className="w-6 h-6 text-white" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-display font-bold text-gray-800">{product.title}</h3>
                      {product.description && (
                        <p className="font-body text-sm text-gray-500 line-clamp-1">{product.description}</p>
                      )}
                    </div>
                    {product.type === 'app' ? (
                      <Link
                        to={`/prodotto/${product.id}`}
                        className="btn-primary py-2 px-4 text-sm"
                      >
                        Apri
                      </Link>
                    ) : (
                      <a
                        href={product.download_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-secondary py-2 px-4 text-sm"
                      >
                        Scarica
                      </a>
                    )}
                  </motion.div>
                ))}
              </div>

              <button
                onClick={() => { setProductData(null); setPin(''); setCustomerName('') }}
                className="block mx-auto mt-8 text-pastel-lavender-dark font-body font-medium hover:underline"
              >
                Verifica un altro PIN
              </button>
            </motion.div>
          </div>
        </section>
      </PageTransition>
    )
  }
    return (
      <PageTransition>
        <section className="py-20 bg-mesh">
        <div className="max-w-xl mx-auto px-4 sm:px-6">
          <Breadcrumb />
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
  </PageTransition>
  )
}
