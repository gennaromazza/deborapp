import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Heart, Coffee, ArrowRight, Star, Users } from 'lucide-react'
import { supabase } from '../utils/supabase'
import ActivityCard from '../components/ActivityCard'
import CategoryFilter from '../components/CategoryFilter'
import PricingTiers from '../components/PricingTiers'
import Breadcrumb from '../components/Breadcrumb'
import PageNavigation from '../components/PageNavigation'
import PageTransition from '../components/PageTransition'

export default function Activities() {
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState('all')
  const [categoryCounts, setCategoryCounts] = useState({})

  useEffect(() => {
    async function fetchActivities() {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false })

      if (!error && data) {
        setActivities(data)

        const counts = { all: data.length }
        data.forEach((a) => {
          const cat = a.category || 'attivita-stampabili'
          counts[cat] = (counts[cat] || 0) + 1
        })
        setCategoryCounts(counts)
      }
      setLoading(false)
    }
    fetchActivities()
  }, [])

  useEffect(() => {
    document.title = 'Attività Creative per Bambini e Famiglie | Debora di Bellucci'

    const setMeta = (name, content, attr = 'name') => {
      let el = document.querySelector(`meta[${attr}="${name}"]`)
      if (!el) {
        el = document.createElement('meta')
        el.setAttribute(attr, name)
        document.head.appendChild(el)
      }
      el.setAttribute('content', content)
    }

    setMeta('description', 'Attività creative, giochi educativi e momenti da vivere in famiglia. Scopri le proposte di Debora di Bellucci: contenuti pensati per ispirare fantasia e tempo di qualità insieme.')
    setMeta('keywords', 'attività creative bambini, giochi educativi famiglia, tempo qualità bambini, attività stampabili, mini app interattive bambini, percorsi educativi, storie per bambini')
    setMeta('og:title', 'Attività Creative per Bambini e Famiglie')
    setMeta('og:description', 'Attività creative, giochi educativi e momenti da vivere in famiglia. Scopri le proposte di Debora di Bellucci.', 'property')
    setMeta('og:type', 'website', 'property')
    setMeta('og:url', 'https://deborapp.vercel.app/attivita', 'property')
    setMeta('og:image', 'https://deborapp.vercel.app/official_logo.png', 'property')
    setMeta('twitter:card', 'summary_large_image')
    setMeta('twitter:title', 'Attività Creative per Bambini e Famiglie')
    setMeta('twitter:description', 'Attività creative, giochi educativi e momenti da vivere in famiglia.')
    setMeta('twitter:image', 'https://deborapp.vercel.app/official_logo.png')

    let canonical = document.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.setAttribute('rel', 'canonical')
      document.head.appendChild(canonical)
    }
    canonical.setAttribute('href', 'https://deborapp.vercel.app/attivita')

    let jsonLd = document.getElementById('jsonld-attivita')
    if (!jsonLd) {
      jsonLd = document.createElement('script')
      jsonLd.id = 'jsonld-attivita'
      jsonLd.type = 'application/ld+json'
      document.head.appendChild(jsonLd)
    }
    jsonLd.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": "Attività Creative per Bambini e Famiglie",
      "description": "Catalogo di attività creative, giochi educativi e momenti da vivere in famiglia. Contenuti pensati per ispirare fantasia e tempo di qualità insieme.",
      "url": "https://deborapp.vercel.app/attivita",
      "author": {
        "@type": "Person",
        "name": "Debora di Bellucci"
      }
    })

    return () => {
      if (jsonLd) jsonLd.textContent = ''
    }
  }, [])

  const filtered = activeCategory === 'all'
    ? activities
    : activities.filter((a) => (a.category || 'attivita-stampabili') === activeCategory)

  return (
    <PageTransition>
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <Breadcrumb />

          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <span className="badge badge-pink mb-4 inline-flex">
              <Sparkles className="w-3.5 h-3.5" />
              Attività creative
            </span>
            <h1 className="section-title">
              Attività da vivere,<br />momenti da ricordare
            </h1>
            <p className="section-subtitle max-w-3xl">
              Non semplici file da scaricare, ma esperienze pensate per stare insieme.
              Attività creative, giochi educativi e storie da scoprire — per bambini curiosi e famiglie che vogliono creare ricordi.
            </p>
          </motion.div>

          {/* Come funziona - mini sezione */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="card-glass p-8 mb-16"
          >
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 mb-2">
                <Coffee className="w-5 h-5 text-pastel-pink-dark" />
                <h2 className="font-display text-xl font-bold text-gray-800">
                  Come funziona
                </h2>
              </div>
              <p className="font-body text-gray-500 text-sm">
                Scegli quanto vuoi scoprire. Ogni livello sblocca attività diverse.
              </p>
            </div>
            <div className="grid sm:grid-cols-3 gap-6">
              {[
                {
                  step: '01',
                  title: 'Scegli il tuo livello',
                  desc: 'Da un\'attività singola a tutto il catalogo. Tu decidi.',
                  color: 'from-pastel-pink to-pastel-peach',
                },
                {
                  step: '02',
                  title: 'Paga in un click',
                  desc: 'Semplice, sicuro. Carta, PayPal o come preferisci.',
                  color: 'from-pastel-lavender to-pastel-sky',
                },
                {
                  step: '03',
                  title: 'Scopri e divertitevi',
                  desc: 'Ricevi il PIN via email e accedi subito ai contenuti.',
                  color: 'from-pastel-mint to-pastel-sky',
                },
              ].map((step, i) => (
                <div key={i} className="text-center">
                  <div className={`inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br ${step.color} text-white font-display font-bold text-sm mb-3 shadow-md`}>
                    {step.step}
                  </div>
                  <h3 className="font-display font-bold text-gray-800 mb-1">{step.title}</h3>
                  <p className="font-body text-sm text-gray-500">{step.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Pricing Tiers */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <div className="text-center mb-10">
              <span className="badge badge-lavender mb-4 inline-flex">
                <Coffee className="w-3.5 h-3.5" />
                Scegli il tuo livello
              </span>
              <h2 className="section-title">Quanto vuoi scoprire?</h2>
              <p className="section-subtitle">
                Ogni livello sblocca un numero diverso di attività. Più scegli, più risparmi.
              </p>
            </div>
            <PricingTiers />
          </motion.div>

          {/* Activities Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="text-center mb-8">
              <span className="badge badge-mint mb-4 inline-flex">
                <Heart className="w-3.5 h-3.5" />
                Esplora tutto
              </span>
              <h2 className="section-title">Tutte le attività</h2>
              <p className="section-subtitle">
                Scorri il catalogo e trova l'attività perfetta per voi
              </p>
            </div>

            <div className="mb-8">
              <CategoryFilter
                active={activeCategory}
                onChange={setActiveCategory}
                counts={categoryCounts}
              />
            </div>

            {loading ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="card overflow-hidden">
                    <div className="aspect-[4/3] skeleton rounded-none" />
                    <div className="p-6 space-y-3">
                      <div className="h-6 skeleton w-3/4" />
                      <div className="h-4 skeleton w-full" />
                      <div className="h-4 skeleton w-2/3" />
                    </div>
                  </div>
                ))}
              </div>
            ) : filtered.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="card-glass p-16 text-center"
              >
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-pastel-lavender/50 flex items-center justify-center">
                  <Star className="w-10 h-10 text-pastel-lavender-dark/50" />
                </div>
                <h3 className="font-display text-xl font-bold text-gray-800 mb-2">
                  Presto nuove attività!
                </h3>
                <p className="font-body text-gray-500">
                  Sto preparando nuove esperienze creative per le tue giornate insieme
                </p>
              </motion.div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filtered.map((activity, index) => (
                  <ActivityCard key={activity.id} activity={activity} index={index} />
                ))}
              </div>
            )}
          </motion.div>

          {/* CTA finale */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative mb-16"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-pastel-pink via-pastel-lavender to-pastel-sky rounded-5xl blur-3xl opacity-20 -z-10" />
            <div className="bg-white/80 backdrop-blur-lg p-10 md:p-14 rounded-5xl shadow-soft-lg border border-white/50 text-center">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="inline-block mb-4"
              >
                <Users className="w-10 h-10 text-pastel-pink-dark" />
              </motion.div>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-gray-800 mb-3">
                Pronti a scoprire qualcosa di nuovo?
              </h2>
              <p className="font-body text-gray-500 mb-6 max-w-lg mx-auto">
                Scegli il livello che fa per voi e iniziate insieme. Ogni attività è un momento che resta.
              </p>
              <a
                href="#pricing"
                className="btn-primary inline-flex items-center gap-2 text-base"
              >
                Scegli il tuo livello
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </motion.div>

          <PageNavigation />
        </div>
      </section>
    </PageTransition>
  )
}
