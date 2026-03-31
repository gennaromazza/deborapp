import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Send, Loader2, MapPin, Clock, Heart, MessageSquare } from 'lucide-react'
import toast from 'react-hot-toast'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    await new Promise(resolve => setTimeout(resolve, 1500))

    toast.success('Messaggio inviato con successo! Ti risponderò presto.')
    setFormData({ name: '', email: '', subject: '', message: '' })
    setLoading(false)
  }

  return (
    <div className="overflow-hidden">
      <section className="relative py-20 bg-mesh">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
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
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
