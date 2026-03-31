import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Heart, Sparkles, BookOpen, Star, Palette, Lightbulb, GraduationCap, Coffee, Baby, Home, Clock, Smartphone } from 'lucide-react'
import Breadcrumb from '../components/Breadcrumb'
import PageNavigation from '../components/PageNavigation'
import PageTransition from '../components/PageTransition'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

export default function About() {
  useEffect(() => {
    document.title = 'Chi sono - Debora di Bellucci | Mamma e Creatrice di Contenuti per Bambini'

    const setMeta = (name, content, attr = 'name') => {
      let el = document.querySelector(`meta[${attr}="${name}"]`)
      if (!el) {
        el = document.createElement('meta')
        el.setAttribute(attr, name)
        document.head.appendChild(el)
      }
      el.setAttribute('content', content)
    }

    setMeta('description', 'Scopri la storia di Debora di Bellucci, mamma di Antonio e Gabriel, creatrice di contenuti digitali per bambini. Storie, attività creative e schede didattiche.')
    setMeta('og:title', 'Chi sono - Debora di Bellucci | Mamma e Creatrice di Contenuti per Bambini')
    setMeta('og:description', 'Scopri la storia di Debora di Bellucci, mamma e creatrice di contenuti digitali per bambini da Aversa.', 'property')
    setMeta('og:type', 'profile', 'property')
    setMeta('og:url', 'https://deborapp.vercel.app/chi-sono', 'property')
    setMeta('og:image', 'https://deborapp.vercel.app/author_family.png', 'property')
    setMeta('twitter:card', 'summary_large_image')
    setMeta('twitter:title', 'Chi sono - Debora di Bellucci')
    setMeta('twitter:description', 'Scopri la storia di Debora di Bellucci, mamma e creatrice di contenuti digitali per bambini.')
    setMeta('twitter:image', 'https://deborapp.vercel.app/author_family.png')

    let canonical = document.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.setAttribute('rel', 'canonical')
      document.head.appendChild(canonical)
    }
    canonical.setAttribute('href', 'https://deborapp.vercel.app/chi-sono')

    let jsonLd = document.getElementById('jsonld-about')
    if (!jsonLd) {
      jsonLd = document.createElement('script')
      jsonLd.id = 'jsonld-about'
      jsonLd.type = 'application/ld+json'
      document.head.appendChild(jsonLd)
    }
    jsonLd.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "ProfilePage",
      "mainEntity": {
        "@type": "Person",
        "name": "Debora di Bellucci",
        "url": "https://deborapp.vercel.app/chi-sono",
        "image": "https://deborapp.vercel.app/author_family.png",
        "jobTitle": "Creatrice di contenuti digitali per bambini",
        "description": "Mamma di Antonio e Gabriel, 38 anni, vivo ad Aversa. Creo contenuti digitali per bambini con la missione di allontanarli dagli schermi e accendere la loro fantasia.",
        "birthPlace": {
          "@type": "Place",
          "name": "Aversa, Italia"
        },
        "knowsAbout": ["Educazione bambini", "Attività creative", "Matematica per bambini", "Schede didattiche", "Storie per bambini"],
        "worksFor": {
          "@type": "Organization",
          "name": "Debora di Bellucci Digital",
          "url": "https://deborapp.vercel.app"
        }
      }
    })

    return () => {
      if (jsonLd) jsonLd.textContent = ''
    }
  }, [])
  return (
    <PageTransition>
      <div className="overflow-hidden">
        <section className="relative py-24 bg-mesh overflow-hidden">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-20 left-10 w-64 h-64 bg-pastel-pink/30 rounded-full blur-3xl" />
            <div className="absolute bottom-10 right-10 w-72 h-72 bg-pastel-lavender/30 rounded-full blur-3xl" />
            <div className="absolute top-40 right-20 w-40 h-40 bg-pastel-sky/20 rounded-full blur-2xl" />
          </div>
          <div className="max-w-5xl mx-auto px-4 sm:px-6 relative">
            <Breadcrumb />
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="flex justify-center md:justify-start"
              >
                <div className="relative">
                  <motion.div
                    className="absolute -inset-4 bg-gradient-to-br from-pastel-pink via-pastel-lavender to-pastel-sky rounded-full opacity-40 blur-xl"
                    animate={{ scale: [1, 1.05, 1], rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                  />
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring', stiffness: 150, delay: 0.2, duration: 0.8 }}
                    className="relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 rounded-full overflow-hidden shadow-2xl ring-4 ring-white"
                  >
                    <img
                      src="/author_family.png"
                      alt="Debora con i suoi bambini Antonio e Gabriel"
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, delay: 0.8 }}
                    className="absolute -bottom-2 -right-2 w-16 h-16 bg-gradient-to-br from-pastel-pink to-pastel-lavender rounded-2xl flex items-center justify-center shadow-lg"
                  >
                    <Heart className="w-7 h-7 text-white" />
                  </motion.div>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, delay: 1 }}
                    className="absolute -top-2 -left-2 w-12 h-12 bg-gradient-to-br from-pastel-yellow to-pastel-peach rounded-xl flex items-center justify-center shadow-lg"
                  >
                    <Sparkles className="w-5 h-5 text-white" />
                  </motion.div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-center md:text-left"
              >
                <span className="badge badge-pink mb-4 inline-flex">
                  <Heart className="w-3.5 h-3.5" />
                  La mia storia
                </span>

                <h1 className="font-display text-4xl md:text-5xl font-extrabold text-gray-800 mb-3">
                  Ciao, sono <span className="text-gradient">Debora</span>
                </h1>

                <p className="font-body text-lg text-gray-400 mb-4">
                  38 anni, Aversa — mamma di Antonio e Gabriel
                </p>

                <p className="font-body text-xl text-gray-500 leading-relaxed mb-6">
                  Creo contenuti digitali per bambini, con la passione per le storie che fanno sognare e le attività che fanno crescere
                </p>

                <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                  <div className="flex items-center gap-2 px-4 py-2 bg-pastel-pink/50 rounded-xl">
                    <BookOpen className="w-4 h-4 text-pastel-pink-dark" />
                    <span className="font-body text-sm text-gray-600">Autrice</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-pastel-lavender/50 rounded-xl">
                    <Palette className="w-4 h-4 text-pastel-lavender-dark" />
                    <span className="font-body text-sm text-gray-600">Creatrice</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-pastel-mint/50 rounded-xl">
                    <Baby className="w-4 h-4 text-pastel-mint-dark" />
                    <span className="font-body text-sm text-gray-600">Mamma</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

      {/* Bio section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={containerVariants}
            className="prose prose-lg max-w-none"
          >
            <motion.div variants={itemVariants} className="card-glass p-8 md:p-10 mb-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pastel-pink to-pastel-peach flex items-center justify-center flex-shrink-0 shadow-md">
                  <Home className="w-6 h-6 text-pastel-pink-dark" />
                </div>
                <div>
                  <h2 className="font-display text-2xl font-bold text-gray-800 mb-3">
                    Chi sono
                  </h2>
                  <p className="font-body text-gray-500 leading-relaxed">
                    Mi chiamo Debora, ho 38 anni e vivo ad Aversa. Sono una mamma come tante, senza una storia straordinaria alle spalle o competenze accademiche in ambito pedagogico, ma ho un tesoro inestimabile: i miei due splendidi bambini, Antonio e Gabriel.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="card-glass p-8 md:p-10 mb-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pastel-lavender to-pastel-sky flex items-center justify-center flex-shrink-0 shadow-md">
                  <Clock className="w-6 h-6 text-pastel-lavender-dark" />
                </div>
                <div>
                  <h2 className="font-display text-2xl font-bold text-gray-800 mb-3">
                    La mia giornata
                  </h2>
                  <p className="font-body text-gray-500 leading-relaxed">
                    La mia giornata è fatta di corse contro il tempo, di lavoro, di casa e, soprattutto, della ricerca costante del meglio per loro. Negli ultimi anni ho notato, come molti genitori, la facilità con cui gli schermi—telefoni, tablet e TV—catturano e ipnotizzano i nostri figli.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="card-glass p-8 md:p-10 mb-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pastel-mint to-pastel-sky flex items-center justify-center flex-shrink-0 shadow-md">
                  <Smartphone className="w-6 h-6 text-pastel-mint-dark" />
                </div>
                <div>
                  <h2 className="font-display text-2xl font-bold text-gray-800 mb-3">
                    Perché ho scritto questo libro
                  </h2>
                  <p className="font-body text-gray-500 leading-relaxed">
                    Lo scopo di questo piccolo manuale nasce proprio da lì: dal desiderio profondo di allontanarli, almeno per un po', dalla tecnologia passiva. Mi sono appassionata alla ricerca e alla sperimentazione di attività casalinghe, materiali poveri e giochi fai-da-te che potessero non solo distrarli, ma stimolarli attivamente, aiutandoli nella crescita, nella coordinazione e nell'uso delle loro manine.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="card-glass p-8 md:p-10">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pastel-yellow to-pastel-peach flex items-center justify-center flex-shrink-0 shadow-md">
                  <BookOpen className="w-6 h-6 text-pastel-yellow-dark" />
                </div>
                <div>
                  <h2 className="font-display text-2xl font-bold text-gray-800 mb-3">
                    Cosa troverai in queste pagine
                  </h2>
                  <p className="font-body text-gray-500 leading-relaxed">
                    Quello che troverai in queste pagine è il frutto delle mie giornate sul tappeto con Antonio e Gabriel: idee semplici, veloci e alla portata di tutti, per trasformare il tempo insieme in occasioni di sviluppo e, soprattutto, in bellissimi ricordi.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* What I create */}
      <section className="py-20 bg-mesh">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="text-center mb-12"
          >
            <motion.span variants={itemVariants} className="badge badge-lavender mb-4 inline-flex">
              <Sparkles className="w-3.5 h-3.5" />
              Cosa creo
            </motion.span>
            <motion.h2 variants={itemVariants} className="section-title">
              I miei contenuti
            </motion.h2>
            <motion.p variants={itemVariants} className="font-body text-gray-500 max-w-2xl mx-auto">
              Creo storie illustrate, attività creative, schede didattiche e contenuti digitali pensati per stimolare la fantasia e la curiosità dei bambini. Ogni prodotto è realizzato con cura, attenzione ai dettagli e tanto amore per il mondo dell'infanzia.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="text-center mb-12"
          >
            <motion.span variants={itemVariants} className="badge badge-lavender mb-4 inline-flex">
              <Sparkles className="w-3.5 h-3.5" />
              Valori
            </motion.span>
            <motion.h2 variants={itemVariants} className="section-title">
              I valori che guidano il mio lavoro
            </motion.h2>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 gap-6"
          >
            {[
              {
                icon: Heart,
                title: 'Amore per i bambini',
                desc: 'Ogni prodotto è pensato con il cuore, come se lo stessi creando per Antonio e Gabriel',
                color: 'from-pastel-pink to-pastel-peach',
              },
              {
                icon: Lightbulb,
                title: 'Creatività',
                desc: 'La fantasia è il motore di tutto: ogni pagina, ogni illustrazione è unica',
                color: 'from-pastel-lavender to-pastel-sky',
              },
              {
                icon: Star,
                title: 'Qualità',
                desc: 'Non scendo mai a compromessi sulla qualità dei miei contenuti',
                color: 'from-pastel-yellow to-pastel-peach',
              },
              {
                icon: Coffee,
                title: 'Dedizione',
                desc: 'Ogni prodotto nasce da ore di ricerca, progettazione e amore per il dettaglio',
                color: 'from-pastel-mint to-pastel-sky',
              },
            ].map((value, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="card p-6"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${value.color} flex items-center justify-center mb-4 shadow-md`}>
                  <value.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-display font-bold text-lg text-gray-800 mb-2">
                  {value.title}
                </h3>
                <p className="font-body text-gray-500 text-sm leading-relaxed">
                  {value.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-mesh">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="card-glass p-10"
          >
            <h2 className="font-display text-2xl font-bold text-gray-800 mb-4">
              Vuoi saperne di più?
            </h2>
            <p className="font-body text-gray-500 mb-6">
              Scrivimi pure per qualsiasi domanda o per una collaborazione
            </p>
            <a href="/contatti" className="btn-primary inline-flex items-center gap-2">
              Contattami
              <Heart className="w-5 h-5" />
            </a>
          </motion.div>
        </div>
        </section>
        <PageNavigation />
      </div>
    </PageTransition>
  )
}
