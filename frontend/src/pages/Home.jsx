import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, Heart, Star, BookOpen, Palette, Lightbulb, Users, Award, ChevronRight, Quote, Instagram, Gift, Clock, ArrowUpRight } from 'lucide-react'
import { supabase } from '../utils/supabase'
import ProductCard from '../components/ProductCard'

const floatingShapes = [
  { emoji: '🌸', top: '10%', left: '5%', delay: 0, size: 'text-4xl md:text-5xl' },
  { emoji: '⭐', top: '20%', right: '10%', delay: 1, size: 'text-3xl md:text-4xl' },
  { emoji: '🦋', top: '60%', left: '8%', delay: 2, size: 'text-4xl md:text-5xl' },
  { emoji: '🌈', top: '70%', right: '5%', delay: 3, size: 'text-3xl md:text-4xl' },
  { emoji: '🎨', top: '40%', left: '15%', delay: 1.5, size: 'text-3xl md:text-4xl' },
  { emoji: '📚', top: '80%', left: '20%', delay: 0.5, size: 'text-3xl md:text-4xl' },
  { emoji: '✨', top: '15%', left: '50%', delay: 2.5, size: 'text-2xl md:text-3xl' },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.3 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([])
  const [freeProducts, setFreeProducts] = useState([])
  const [totalProducts, setTotalProducts] = useState(0)

  useEffect(() => {
    async function fetchFeatured() {
      const { data } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(3)
      if (data) setFeaturedProducts(data)
    }
    fetchFeatured()
  }, [])

  useEffect(() => {
    async function fetchFreeProducts() {
      const now = new Date().toISOString()
      const { data } = await supabase
        .from('products')
        .select('*')
        .eq('is_free', true)
        .or(`free_until.is.null,free_until.gt.${now}`)
        .order('created_at', { ascending: false })
        .limit(3)
      if (data) setFreeProducts(data)
    }
    fetchFreeProducts()
  }, [])

  useEffect(() => {
    async function fetchTotal() {
      const { count } = await supabase
        .from('products')
        .select('*', { count: 'exact', head: true })
      if (count) setTotalProducts(count)
    }
    fetchTotal()
  }, [])

  useEffect(() => {
    document.title = 'Debora di Bellucci - Storie, Attività e Schede Didattiche per Bambini'

    const setMeta = (name, content, attr = 'name') => {
      let el = document.querySelector(`meta[${attr}="${name}"]`)
      if (!el) {
        el = document.createElement('meta')
        el.setAttribute(attr, name)
        document.head.appendChild(el)
      }
      el.setAttribute('content', content)
    }

    setMeta('description', 'Debora di Bellucci crea storie incantevoli, attività creative e schede didattiche per bambini. Esperienze digitali per ispirare fantasia e tempo di qualità in famiglia.')
    setMeta('keywords', 'attività bambini, schede didattiche, libro matematica bambini, imparare matematica giocando, storie per bambini, esperienze digitali bambini, attività creative famiglia, tempo qualità bambini')
    setMeta('og:title', 'Debora di Bellucci - Storie, Attività e Schede Didattiche per Bambini')
    setMeta('og:description', 'Debora di Bellucci crea storie incantevoli, attività creative e schede didattiche per bambini. Contenuti digitali per ispirare fantasia e apprendimento.', 'property')
    setMeta('og:type', 'website', 'property')
    setMeta('og:url', 'https://deborapp.vercel.app/', 'property')
    setMeta('og:image', 'https://deborapp.vercel.app/official_logo.png', 'property')
    setMeta('og:image:width', '1200', 'property')
    setMeta('og:image:height', '630', 'property')
    setMeta('twitter:card', 'summary_large_image')
    setMeta('twitter:title', 'Debora di Bellucci - Storie, Attività e Schede Didattiche per Bambini')
    setMeta('twitter:description', 'Debora di Bellucci crea storie incantevoli, attività creative e schede didattiche per bambini.')
    setMeta('twitter:image', 'https://deborapp.vercel.app/official_logo.png')

    let canonical = document.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.setAttribute('rel', 'canonical')
      document.head.appendChild(canonical)
    }
    canonical.setAttribute('href', 'https://deborapp.vercel.app/')

    let jsonLd = document.getElementById('jsonld-home')
    if (!jsonLd) {
      jsonLd = document.createElement('script')
      jsonLd.id = 'jsonld-home'
      jsonLd.type = 'application/ld+json'
      document.head.appendChild(jsonLd)
    }
    jsonLd.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebSite",
          "@id": "https://deborapp.vercel.app/#website",
          "name": "Debora di Bellucci",
          "url": "https://deborapp.vercel.app/",
          "description": "Contenuti digitali per bambini - Storie, attività creative e schede didattiche",
          "inLanguage": "it-IT",
          "author": {
            "@id": "https://deborapp.vercel.app/#person"
          }
        },
        {
          "@type": "Organization",
          "@id": "https://deborapp.vercel.app/#organization",
          "name": "Debora di Bellucci",
          "url": "https://deborapp.vercel.app/",
          "logo": {
            "@type": "ImageObject",
            "url": "https://deborapp.vercel.app/official_logo.png"
          },
          "contactPoint": {
            "@type": "ContactPoint",
            "email": "deboradibelluccidigital@gmail.com",
            "contactType": "customer support",
            "availableLanguage": "Italian"
          },
          "sameAs": []
        },
        {
          "@type": "Person",
          "@id": "https://deborapp.vercel.app/#person",
          "name": "Debora di Bellucci",
          "url": "https://deborapp.vercel.app/chi-sono",
          "jobTitle": "Creatrice di contenuti digitali per bambini",
          "description": "Mamma di Antonio e Gabriel, 38 anni, vivo ad Aversa. Creo contenuti digitali per bambini con la missione di allontanarli dagli schermi e accendere la loro fantasia.",
          "knowsAbout": ["Educazione bambini", "Attività creative", "Matematica per bambini", "Schede didattiche"]
        },
        {
          "@type": "FAQPage",
          "@id": "https://deborapp.vercel.app/#faq",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "Cosa offre Debora di Bellucci?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Debora di Bellucci crea storie originali, attività creative, schede didattiche e contenuti digitali per bambini. I suoi prodotti includono libri interattivi di matematica, materiali scaricabili e risorse educative per genitori e insegnanti."
              }
            },
            {
              "@type": "Question",
              "name": "Come funziona il sistema PIN per accedere ai prodotti?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Dopo aver acquistato un prodotto su piattaforme come Gumroad o Etsy, riceverai un'email con un codice PIN a 6 cifre. Inserisci il PIN nella pagina Accesso PIN del sito per sbloccare immediatamente i tuoi contenuti digitali."
              }
            },
            {
              "@type": "Question",
              "name": "Per quale fascia d'età sono pensati i contenuti?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "I contenuti di Debora di Bellucci sono progettati principalmente per bambini dai 3 ai 10 anni, con attività differenziate per età: giochi sensoriali per i più piccoli, schede didattiche e libri interattivi di matematica per la scuola primaria."
              }
            },
            {
              "@type": "Question",
              "name": "I prodotti sono scaricabili o si usano online?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Dipende dal tipo di prodotto. I materiali come schede e attività creative sono scaricabili in formato PDF. I libri interattivi, come il Libro di Matematica, si utilizzano direttamente online attraverso il sito web."
              }
            }
          ]
        }
      ]
    })

    return () => {
      if (jsonLd) jsonLd.textContent = ''
    }
  }, [])

  return (
    <div className="overflow-hidden">
      <section className="relative min-h-[95vh] flex items-center justify-center bg-mesh">
        <div className="absolute inset-0 overflow-hidden">
          {floatingShapes.map((shape, i) => (
            <motion.div
              key={i}
              className={`absolute ${shape.size}`}
              style={{ top: shape.top, left: shape.left, right: shape.right }}
              animate={{ y: [0, -20, 0], rotate: [0, 5, -5, 0] }}
              transition={{ duration: 6, repeat: Infinity, delay: shape.delay, ease: 'easeInOut' }}
            >
              {shape.emoji}
            </motion.div>
          ))}
        </div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 text-center py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="inline-flex items-center gap-2 bg-white/80 backdrop-blur px-5 py-2.5 rounded-full mb-8 shadow-md"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Sparkles className="w-4 h-4 text-pastel-pink-dark" />
              <span className="font-body text-sm text-gray-600">Attività creative per famiglie</span>
            </motion.div>

            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-extrabold text-gray-800 mb-6 leading-tight">
              Ciao, sono{' '}
              <span className="text-gradient">Debora</span>
            </h1>

            <p className="font-body text-xl md:text-2xl text-gray-500 mb-10 max-w-2xl mx-auto leading-relaxed">
              Creo storie, attività e contenuti digitali che ispirano la fantasia dei più piccoli
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/attivita" className="btn-primary inline-flex items-center justify-center gap-2 text-base">
                Scopri le attività
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/accesso-pin" className="btn-secondary inline-flex items-center justify-center gap-2 text-base">
                Hai già un PIN?
                <Heart className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-6 h-10 border-2 border-pastel-lavender-dark/30 rounded-full flex justify-center pt-2"
            >
              <div className="w-1.5 h-3 bg-pastel-lavender-dark/50 rounded-full" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="flex justify-center"
            >
              <div className="relative">
                <motion.div
                  className="absolute -inset-3 bg-gradient-to-br from-pastel-pink via-pastel-lavender to-pastel-sky rounded-full opacity-30 blur-xl"
                  animate={{ scale: [1, 1.08, 1] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                />
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: 'spring', stiffness: 150, delay: 0.2 }}
                  className="relative w-56 h-56 sm:w-64 sm:h-64 rounded-full overflow-hidden shadow-xl ring-4 ring-white"
                >
                  <img
                    src="/author_family.png"
                    alt="Debora con i suoi bambini Antonio e Gabriel"
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: 'spring', stiffness: 200, delay: 0.6 }}
                  className="absolute -bottom-1 -right-1 w-14 h-14 bg-gradient-to-br from-pastel-pink to-pastel-lavender rounded-xl flex items-center justify-center shadow-lg"
                >
                  <Heart className="w-6 h-6 text-white" />
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <span className="badge badge-pink mb-4 inline-flex">
                <Heart className="w-3.5 h-3.5" />
                Chi sono
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-extrabold text-gray-800 mb-4">
                Ciao, sono <span className="text-gradient">Debora</span>
              </h2>
              <p className="font-body text-lg text-gray-500 leading-relaxed mb-4">
                Mamma di Antonio e Gabriel, 38 anni, vivo ad Aversa. Creo contenuti digitali per bambini con una missione: allontanarli dagli schermi e accendere la loro fantasia.
              </p>
              <p className="font-body text-gray-500 leading-relaxed mb-6">
                Ogni storia, ogni attività nasce dalle mie giornate sul tappeto con i miei figli. Idee semplici, alla portata di tutti, per trasformare il tempo insieme in bellissimi ricordi.
              </p>
              <Link to="/chi-sono" className="btn-primary inline-flex items-center gap-2">
                Scopri la mia storia
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={containerVariants}
            className="text-center mb-16"
          >
            <motion.span variants={itemVariants} className="badge badge-pink mb-4">
              <Star className="w-3.5 h-3.5" />
              Perché scegliermi
            </motion.span>
            <motion.h2 variants={itemVariants} className="section-title">
              Perché scegliere i miei contenuti?
            </motion.h2>
            <motion.p variants={itemVariants} className="section-subtitle">
              Ogni prodotto è creato con amore e attenzione per stimolare la creatività dei bambini
            </motion.p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="grid md:grid-cols-3 gap-8"
          >
            {[
              {
                icon: BookOpen,
                emoji: '📚',
                title: 'Storie Incantevoli',
                desc: 'Narrative originali che catturano l\'immaginazione e insegnano valori importanti',
                color: 'from-pastel-pink to-pastel-peach',
                badge: 'badge-pink',
              },
              {
                icon: Palette,
                emoji: '🎨',
                title: 'Attività Creative',
                desc: 'Esercizi e giochi educativi per sviluppare la creatività e il pensiero logico',
                color: 'from-pastel-lavender to-pastel-sky',
                badge: 'badge-lavender',
              },
              {
                icon: Lightbulb,
                emoji: '✨',
                title: 'Esperienze Digitali',
                desc: 'Materiali pronti all\'uso, pensati per genitori ed educatori. Tempo di qualità, insieme.',
                color: 'from-pastel-mint to-pastel-sky',
                badge: 'badge-mint',
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ y: -8 }}
                className="group p-8 rounded-3xl bg-white border border-pastel-lavender/30 hover:border-pastel-pink/50 hover:shadow-soft-lg transition-all duration-300"
              >
                <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-3xl shadow-md group-hover:scale-110 transition-transform duration-300`}>
                  {feature.emoji}
                </div>
                <h3 className="font-display font-bold text-xl text-gray-800 mb-3 text-center">
                  {feature.title}
                </h3>
                <p className="font-body text-gray-500 text-center leading-relaxed">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-mesh">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={containerVariants}
            className="text-center mb-16"
          >
            <motion.span variants={itemVariants} className="badge badge-lavender mb-4">
              <Award className="w-3.5 h-3.5" />
              I miei numeri
            </motion.span>
            <motion.h2 variants={itemVariants} className="section-title">
              Un mondo di creatività
            </motion.h2>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {[
              { number: '50+', label: 'Prodotti creati', icon: '📚' },
              { number: '1000+', label: 'Bambini felici', icon: '😊' },
              { number: '100%', label: 'Passione', icon: '💖' },
              { number: '24h', label: 'Supporto', icon: '⚡' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                className="card-glass p-6 text-center"
              >
                <div className="text-3xl mb-3">{stat.icon}</div>
                <div className="font-display text-3xl md:text-4xl font-extrabold text-gradient mb-2">
                  {stat.number}
                </div>
                <div className="font-body text-gray-500 text-sm">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={containerVariants}
            className="text-center mb-16"
          >
            <motion.span variants={itemVariants} className="badge badge-mint mb-4">
              <Users className="w-3.5 h-3.5" />
              Come funziona
            </motion.span>
            <motion.h2 variants={itemVariants} className="section-title">
              Come accedere alle attività
            </motion.h2>
            <motion.p variants={itemVariants} className="section-subtitle">
              Un processo semplice e veloce per sbloccare le tue esperienze creative
            </motion.p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            {[
              {
                step: '01',
                title: 'Scegli',
                desc: 'Scegli il livello che fa per voi: da un\'attività a tutto il catalogo',
                color: 'from-pastel-pink to-pastel-peach',
              },
              {
                step: '02',
                title: 'Ricevi il PIN',
                desc: 'Dopo il pagamento, ti arriverà un\'email con il tuo codice di accesso',
                color: 'from-pastel-lavender to-pastel-sky',
              },
              {
                step: '03',
                title: 'Scoprite insieme',
                desc: 'Inserisci il PIN e accedi subito alle attività. Pronti a divertirvi!',
                color: 'from-pastel-mint to-pastel-sky',
              },
            ].map((step, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="relative"
              >
                <div className="card p-8 text-center h-full">
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br ${step.color} text-white font-display font-bold text-lg mb-4 shadow-md`}>
                    {step.step}
                  </div>
                  <h3 className="font-display font-bold text-xl text-gray-800 mb-3">
                    {step.title}
                  </h3>
                  <p className="font-body text-gray-500 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
                {i < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 text-pastel-lavender-dark/30">
                    <ChevronRight className="w-8 h-8" />
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {freeProducts.length > 0 && (
        <section className="py-24 bg-gradient-to-b from-green-50 via-emerald-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="inline-block mb-4"
              >
                <Gift className="w-10 h-10 text-green-500" />
              </motion.div>
              <span className="badge mb-4 inline-flex" style={{ background: '#DCFCE7', color: '#166534' }}>
                <Sparkles className="w-3.5 h-3.5" />
                Prova prima di scegliere
              </span>
              <h2 className="section-title">
                Assaggia la magia, senza impegno
              </h2>
              <p className="section-subtitle max-w-2xl mx-auto">
                Ecco alcune attività gratuite che ho preparato per voi. Provatele, divertitevi insieme — poi se vi va, scoprite tutto il resto.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8 mb-10">
              {freeProducts.map((product, index) => {
                const now = new Date()
                const freeUntil = product.free_until ? new Date(product.free_until) : null
                const daysLeft = freeUntil ? Math.ceil((freeUntil - now) / (1000 * 60 * 60 * 24)) : null

                return (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -8 }}
                    className="group"
                  >
                    <Link to={`/prodotto/${product.id}`} className="block card overflow-hidden h-full">
                      <div className="aspect-[4/3] bg-gradient-to-br from-green-100 to-emerald-100 relative overflow-hidden">
                        {product.cover_image ? (
                          <img
                            src={product.cover_image}
                            alt={product.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Gift className="w-16 h-16 text-green-300" />
                          </div>
                        )}
                        <div className="absolute top-3 left-3">
                          <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-body font-medium bg-green-100 text-green-700 shadow-sm">
                            <Gift className="w-3 h-3" />
                            Gratuito
                          </span>
                        </div>
                        {daysLeft !== null && daysLeft <= 7 && (
                          <div className="absolute top-3 right-3">
                            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-body font-medium bg-amber-100 text-amber-700">
                              <Clock className="w-3 h-3" />
                              {daysLeft === 0 ? 'Oggi!' : `${daysLeft}g`}
                            </span>
                          </div>
                        )}
                        <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all">
                          <div className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
                            <ArrowUpRight className="w-5 h-5 text-green-600" />
                          </div>
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="font-display font-bold text-lg text-gray-800 mb-2 group-hover:text-green-600 transition-colors">
                          {product.title}
                        </h3>
                        <p className="font-body text-gray-500 text-sm line-clamp-2">
                          {product.description}
                        </p>
                        <div className="mt-4 flex items-center gap-1 text-green-600 font-body text-sm font-medium">
                          Prova ora
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                )
              })}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <p className="font-body text-gray-500 mb-4">
                Queste sono solo <strong>{freeProducts.length}</strong> delle <strong>{totalProducts}</strong> attività disponibili
              </p>
              <Link to="/attivita" className="btn-primary inline-flex items-center gap-2">
                Scopri tutti i livelli
                <ArrowRight className="w-5 h-5" />
              </Link>
              <p className="font-body text-gray-400 text-sm mt-4">
                Ogni attività è un momento speciale da vivere insieme. Scegliete quello che vi ispira di più.
              </p>
            </motion.div>
          </div>
        </section>
      )}

      <section className="py-20 bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-500 to-orange-400 rounded-5xl blur-2xl opacity-20 -z-10" />
            <div className="bg-white/90 backdrop-blur-lg p-10 md:p-14 rounded-5xl shadow-soft-lg border border-pink-100">
              <div className="text-center mb-10">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 via-pink-100 to-orange-100 px-4 py-1.5 rounded-full mb-4">
                  <Instagram className="w-4 h-4 text-pink-500" />
                  <span className="font-body text-sm font-medium text-gray-700">Seguici su Instagram</span>
                </div>
                <h2 className="font-display text-3xl md:text-4xl font-extrabold text-gray-800 mb-3">
                  Unisciti alla community di{' '}
                  <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 bg-clip-text text-transparent">
                    @mammabisdioggi
                  </span>
                </h2>
                <p className="font-body text-lg text-gray-500 leading-relaxed max-w-2xl mx-auto">
                  Anteprime, idee creative, consigli per mamme e papà, e tanti momenti per ispirare le vostre giornate insieme.
                </p>
              </div>

              <div className="elfsight-app-placeholder" data-elfsight-app-id="placeholder">
                <a
                  href="https://www.instagram.com/mammabisdioggi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block max-w-md mx-auto bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 p-[3px] rounded-2xl hover:scale-105 transition-transform"
                >
                  <div className="bg-white rounded-2xl p-6 flex flex-col items-center gap-4">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 p-[3px]">
                      <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                        <Instagram className="w-10 h-10 text-pink-500" />
                      </div>
                    </div>
                    <div className="text-center">
                      <p className="font-display font-bold text-lg text-gray-800">@mammabisdioggi</p>
                      <p className="font-body text-sm text-gray-500">Clicca per vedere il feed su Instagram</p>
                    </div>
                    <span className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 text-white font-body font-semibold shadow-md">
                      <Instagram className="w-5 h-5" />
                      Seguici ora
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </a>
              </div>

              <p className="text-center text-xs text-gray-400 mt-6">
                Per visualizzare il feed direttamente qui, configura un widget gratuito su{' '}
                <a href="https://elfsight.com/instagram-feed-instalink/" target="_blank" rel="noopener noreferrer" className="text-pink-500 hover:underline">
                  Elfsight Instagram Feed
                </a>{' '}
                e inserisci lo script in <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">index.html</code>
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-mesh">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-pastel-pink via-pastel-lavender to-pastel-sky rounded-5xl blur-3xl opacity-30 -z-10" />
            <div className="bg-white/80 backdrop-blur-lg p-12 md:p-16 rounded-5xl shadow-soft-lg border border-white/50">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="inline-block mb-6"
              >
                <Star className="w-12 h-12 text-pastel-yellow-dark" />
              </motion.div>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                Hai acquistato un prodotto?
              </h2>
              <p className="font-body text-gray-500 mb-8 text-lg max-w-xl mx-auto">
                Inserisci il PIN che hai ricevuto via email per accedere ai tuoi contenuti
              </p>
              <Link to="/accesso-pin" className="btn-primary inline-flex items-center gap-2 text-base">
                Accedi con il tuo PIN
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
