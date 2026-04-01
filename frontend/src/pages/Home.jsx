import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, Heart, Star, BookOpen, Palette, Lightbulb, Users, Award, ChevronRight, Quote } from 'lucide-react'
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
