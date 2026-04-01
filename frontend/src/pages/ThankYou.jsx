import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Coffee, Mail, Sparkles, Heart, CupSoda, Clock } from 'lucide-react'
import PageTransition from '../components/PageTransition'

const tierInfo = {
  'un-caffe': {
    name: 'Un Caffè',
    emoji: '☕',
    detail: '1 attività a scelta',
  },
  'caffe-cornetto': {
    name: 'Caffè & Cornetto',
    emoji: '☕🥐',
    detail: '2 attività a scelta',
  },
  'colazione-completa': {
    name: 'Colazione Completa',
    emoji: '☕🥐🧃',
    detail: '4 attività a scelta',
  },
  'la-merenda': {
    name: 'La Merenda',
    emoji: '☕🥐🧃🍰',
    detail: 'Tutte le attività',
  },
}

export default function ThankYou() {
  const [searchParams] = useSearchParams()
  const [tier, setTier] = useState(null)

  useEffect(() => {
    const tierKey = searchParams.get('tier')
    if (tierKey && tierInfo[tierKey]) {
      setTier(tierInfo[tierKey])
    }

    const title = tier
      ? `Grazie per ${tier.name}! Il tuo PIN è in arrivo | Debora di Bellucci`
      : 'Grazie! Il tuo PIN è in arrivo | Debora di Bellucci'
    document.title = title

    const setMeta = (name, content, attr = 'name') => {
      let el = document.querySelector(`meta[${attr}="${name}"]`)
      if (!el) {
        el = document.createElement('meta')
        el.setAttribute(attr, name)
        document.head.appendChild(el)
      }
      el.setAttribute('content', content)
    }

    setMeta('description', 'Grazie per il tuo acquisto! Il tuo codice PIN è in arrivo via email.')
    setMeta('robots', 'noindex, nofollow')
  }, [searchParams, tier])

  return (
    <PageTransition>
      <section className="min-h-[85vh] flex items-center justify-center bg-mesh py-16">
        <div className="max-w-lg mx-auto px-4 sm:px-6 text-center">
          {/* Animated Coffee Cup */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            className="relative inline-block mb-8"
          >
            <motion.div
              className="w-28 h-28 mx-auto rounded-full bg-gradient-to-br from-pastel-peach via-pastel-pink to-pastel-lavender flex items-center justify-center shadow-lg"
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <span className="text-5xl">{tier?.emoji || '☕'}</span>
            </motion.div>

            {/* Steam animation */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex gap-1">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-1.5 h-6 bg-pastel-pink-dark/30 rounded-full"
                  animate={{
                    y: [0, -12, 0],
                    opacity: [0, 0.6, 0],
                    scaleY: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.4,
                    ease: 'easeInOut',
                  }}
                />
              ))}
            </div>

            {/* Sparkles */}
            <motion.div
              className="absolute -top-2 -right-2"
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            >
              <Sparkles className="w-5 h-5 text-pastel-yellow-dark" />
            </motion.div>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-display text-3xl md:text-4xl font-extrabold text-gray-800 mb-3"
          >
            {tier ? `Il tuo ${tier.name} è pronto!` : 'Il tuo caffè è pronto!'}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="font-body text-lg text-gray-500 mb-8"
          >
            {tier
              ? `Ottima scelta! ${tier.detail}. Il tuo PIN è già in viaggio verso la tua casella email.`
              : 'Grazie per la tua scelta. Il tuo PIN è già in viaggio verso la tua casella email.'}
          </motion.p>

          {/* Info Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="card-glass p-6 mb-8 text-left"
          >
            <div className="flex items-start gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-pastel-yellow flex items-center justify-center flex-shrink-0">
                <Clock className="w-5 h-5 text-pastel-yellow-dark" />
              </div>
              <div>
                <h3 className="font-display font-bold text-gray-800 mb-1">
                  Completa il pagamento
                </h3>
                <p className="font-body text-sm text-gray-500">
                  Se non hai ancora pagato, completa il pagamento per ricevere il tuo PIN.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-pastel-mint flex items-center justify-center flex-shrink-0">
                <Mail className="w-5 h-5 text-pastel-mint-dark" />
              </div>
              <div>
                <h3 className="font-display font-bold text-gray-800 mb-1">
                  Il PIN arriva via email
                </h3>
                <p className="font-body text-sm text-gray-500">
                  Dopo il pagamento, il tuo codice di accesso arriverà via email entro 1 ora. Controlla anche spam.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-pastel-lavender flex items-center justify-center flex-shrink-0">
                <CupSoda className="w-5 h-5 text-pastel-lavender-dark" />
              </div>
              <div>
                <h3 className="font-display font-bold text-gray-800 mb-1">
                  Inserisci il PIN
                </h3>
                <p className="font-body text-sm text-gray-500">
                  Appena lo ricevi, vai nella sezione <strong>Accedi con PIN</strong> per accedere alle tue attività.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Receipt Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="relative mb-8"
          >
            <div className="bg-white rounded-2xl shadow-md border border-pastel-lavender/30 p-5 max-w-xs mx-auto">
              {/* Zigzag top */}
              <div className="absolute -top-3 left-0 right-0 h-3 overflow-hidden">
                <svg viewBox="0 0 200 12" className="w-full h-full">
                  <polygon fill="white" points="0,12 10,0 20,12 30,0 40,12 50,0 60,12 70,0 80,12 90,0 100,12 110,0 120,12 130,0 140,12 150,0 160,12 170,0 180,12 190,0 200,12" />
                </svg>
              </div>

              <div className="text-center pt-2">
                <div className="flex items-center justify-center gap-1.5 mb-3">
                  <Heart className="w-4 h-4 text-pastel-pink-dark" />
                  <span className="font-display font-bold text-sm text-gray-800">Scontrino</span>
                  <Heart className="w-4 h-4 text-pastel-pink-dark" />
                </div>

                <div className="border-t border-dashed border-pastel-lavender pt-3 mb-3">
                  <div className="text-center font-display font-bold text-gray-800 mb-2">
                    {tier ? `${tier.emoji} ${tier.name}` : '☕ Attività creative'}
                  </div>
                  {tier && (
                    <div className="text-xs text-gray-500 mb-1">
                      {tier.detail}
                    </div>
                  )}
                  <div className="flex justify-between text-xs text-gray-400 mb-1">
                    <span>Tempo di qualità</span>
                    <span>illimitato</span>
                  </div>
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>Sorrisi inclusi</span>
                    <span>∞</span>
                  </div>
                </div>

                <div className="border-t border-dashed border-pastel-lavender pt-3 mb-3">
                  <div className="flex justify-between font-display font-bold text-gray-800">
                    <span>Totale</span>
                    <span>Pagato con ♥</span>
                  </div>
                </div>

                <div className="border-t border-dashed border-pastel-lavender pt-3">
                  <p className="font-body text-xs text-pastel-pink-dark font-medium animate-pulse">
                    PIN in arrivo entro 1h...
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-3 justify-center"
          >
            <Link
              to="/accesso-pin"
              className="btn-primary inline-flex items-center justify-center gap-2"
            >
              Ho già il PIN
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/attivita"
              className="btn-secondary inline-flex items-center justify-center gap-2"
            >
              Torna alle attività
            </Link>
          </motion.div>
        </div>
      </section>
    </PageTransition>
  )
}
