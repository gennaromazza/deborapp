import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Mail, Send, Loader2, MapPin, Clock, Heart, MessageSquare } from 'lucide-react'
import toast from 'react-hot-toast'
import Breadcrumb from '../components/Breadcrumb.jsx'
import PageNavigation from '../components/PageNavigation'
import PageTransition from '../components/PageTransition'
import { supabaseUrl } from '../utils/supabase'

const ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd3bmR3cGV3bHJhYWd6cm9zcHViIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ4OTUwODQsImV4cCI6MjA5MDQ3MTA4NH0.iBeoXAXf9x8OjgCTBW5Uq4vqrLU1jPM3-9na-t6Ihjg'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    document.title = 'Contatti - Debora di Bellucci | Scrivimi per Informazioni e Collaborazioni'

    const setMeta = (name, content, attr = 'name') => {
      let el = document.querySelector(`meta[${attr}="${name}"]`)
      if (!el) {
        el = document.createElement('meta')
        el.setAttribute(attr, name)
        document.head.appendChild(el)
      }
      el.setAttribute('content', content)
    }

    setMeta('description', 'Contatta Debora di Bellucci per informazioni sui prodotti, problemi con il PIN, richieste di collaborazione o feedback. Risposta entro 24-48 ore.')
    setMeta('og:title', 'Contatti - Debora di Bellucci')
    setMeta('og:description', 'Hai domande sui prodotti digitali per bambini? Contatta Debora di Bellucci.', 'property')
    setMeta('og:type', 'website', 'property')
    setMeta('og:url', 'https://deborapp.vercel.app/contatti', 'property')
    setMeta('og:image', 'https://deborapp.vercel.app/official_logo.png', 'property')
    setMeta('twitter:card', 'summary_large_image')
    setMeta('twitter:title', 'Contatti - Debora di Bellucci')
    setMeta('twitter:description', 'Contatta Debora di Bellucci per informazioni sui prodotti.')
    setMeta('twitter:image', 'https://deborapp.vercel.app/official_logo.png')

    let canonical = document.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.setAttribute('rel', 'canonical')
      document.head.appendChild(canonical)
    }
    canonical.setAttribute('href', 'https://deborapp.vercel.app/contatti')

    return () => {}
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch(`${supabaseUrl}/functions/v1/send-contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${ANON_KEY}`,
          'apikey': ANON_KEY,
        },
        body: JSON.stringify(formData),
      })

      const data = await res.json()
      console.log('send-contact response:', { status: res.status, data })

      if (!res.ok || data?.error) {
        toast.error(data?.error || 'Errore durante l\'invio. Riprova.')
      } else {
        toast.success('Messaggio inviato con successo! Ti risponderò presto.')
        setFormData({ name: '', email: '', subject: '', message: '' })
      }
    } catch (err) {
      console.error('send-contact error:', err)
      toast.error('Errore di connessione. Riprova.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <PageTransition>
      <div className="overflow-hidden">
        <section className="relative py-20 bg-mesh">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <Breadcrumb />
            <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <span className="badge badge-pink mb-4 inline-flex">
              <Heart className="w-3.5 h-3.5" />
              Parliamone
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-extrabold text-gray-800 mb-6">
              Contattami
            </h1>
            <p className="font-body text-xl text-gray-500 max-w-2xl mx-auto">
              Hai domande, richieste o vuoi collaborare? Scrivimi pure, sono qui per te!
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-5 gap-12">
            <div className="lg:col-span-2 space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="card p-6"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pastel-pink to-pastel-peach flex items-center justify-center flex-shrink-0 shadow-md">
                    <Mail className="w-6 h-6 text-pastel-pink-dark" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-lg text-gray-800 mb-1">
                      Email
                    </h3>
                    <p className="font-body text-gray-500 text-sm">
                      deboradibelluccidigital@gmail.com
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="card p-6"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pastel-lavender to-pastel-sky flex items-center justify-center flex-shrink-0 shadow-md">
                    <Clock className="w-6 h-6 text-pastel-lavender-dark" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-lg text-gray-800 mb-1">
                      Tempi di risposta
                    </h3>
                    <p className="font-body text-gray-500 text-sm">
                      Rispondo entro 24-48 ore nei giorni lavorativi
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="card p-6"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pastel-mint to-pastel-sky flex items-center justify-center flex-shrink-0 shadow-md">
                    <MessageSquare className="w-6 h-6 text-pastel-mint-dark" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-lg text-gray-800 mb-1">
                      Cosa posso fare per te
                    </h3>
                    <ul className="font-body text-gray-500 text-sm space-y-1 mt-2">
                      <li>Informazioni sui prodotti</li>
                      <li>Problemi con il PIN</li>
                      <li>Richieste di collaborazione</li>
                      <li>Feedback e suggerimenti</li>
                    </ul>
                  </div>
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="lg:col-span-3"
            >
              <div className="card-glass p-8">
                <h2 className="font-display text-xl font-bold text-gray-800 mb-6">
                  Scrivimi un messaggio
                </h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="name" className="block font-body font-medium text-gray-600 mb-2">
                        Nome *
                      </label>
                      <input
                        id="name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Il tuo nome"
                        className="input-field"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block font-body font-medium text-gray-600 mb-2">
                        Email *
                      </label>
                      <input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="La tua email"
                        className="input-field"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block font-body font-medium text-gray-600 mb-2">
                      Oggetto *
                    </label>
                    <input
                      id="subject"
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="Di cosa vuoi parlarmi?"
                      className="input-field"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block font-body font-medium text-gray-600 mb-2">
                      Messaggio *
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Scrivi il tuo messaggio qui..."
                      className="input-field min-h-[120px] resize-y"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Invio in corso...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Invia messaggio
                      </>
                    )}
                  </button>

                  <p className="text-center text-gray-400 text-xs font-body">
                    In alternativa, scrivimi direttamente a{' '}
                    <a href="mailto:deboradibelluccidigital@gmail.com" className="text-pastel-pink-dark hover:underline">
                      deboradibelluccidigital@gmail.com
                    </a>
                  </p>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      <PageNavigation />
    </div>
  </PageTransition>
  )
}
