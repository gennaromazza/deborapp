import { motion } from 'framer-motion'
import { Heart, Sparkles, BookOpen, Star, Palette, Lightbulb, GraduationCap, Coffee } from 'lucide-react'

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
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, delay: 0.3 }}
              className="w-32 h-32 mx-auto mb-8 rounded-full bg-gradient-to-br from-pastel-pink via-pastel-lavender to-pastel-sky p-1 shadow-lg"
            >
              <div className="w-full h-full rounded-full bg-pastel-cream flex items-center justify-center">
                <span className="text-5xl">👩‍🎨</span>
              </div>
            </motion.div>

            <span className="badge badge-pink mb-4 inline-flex">
              <Heart className="w-3.5 h-3.5" />
              La mia storia
            </span>

            <h1 className="font-display text-4xl md:text-5xl font-extrabold text-gray-800 mb-6">
              Ciao, sono <span className="text-gradient">Debora</span>
            </h1>

            <p className="font-body text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
              Creatrice di contenuti digitali per bambini, con la passione per le storie che fanno sognare e le attività che fanno crescere
            </p>
          </motion.div>
        </div>
      </section>

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
                  <BookOpen className="w-6 h-6 text-pastel-pink-dark" />
                </div>
                <div>
                  <h2 className="font-display text-2xl font-bold text-gray-800 mb-3">
                    La mia passione
                  </h2>
                  <p className="font-body text-gray-500 leading-relaxed">
                    Fin da piccola ho sempre amato le storie. Quelle che ti fanno ridere, piangere, sognare. 
                    Quando sono diventata mamma, ho scoperto un nuovo modo di vivere questa passione: 
                    creare contenuti che potessero ispirare altri bambini come avevano ispirato me.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="card-glass p-8 md:p-10 mb-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pastel-lavender to-pastel-sky flex items-center justify-center flex-shrink-0 shadow-md">
                  <Palette className="w-6 h-6 text-pastel-lavender-dark" />
                </div>
                <div>
                  <h2 className="font-display text-2xl font-bold text-gray-800 mb-3">
                    Cosa creo
                  </h2>
                  <p className="font-body text-gray-500 leading-relaxed">
                    Creo storie illustrate, attività creative, schede didattiche e contenuti digitali 
                    pensati per stimolare la fantasia e la curiosità dei bambini. Ogni prodotto è 
                    realizzato con cura, attenzione ai dettagli e tanto amore per il mondo dell'infanzia.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="card-glass p-8 md:p-10">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pastel-mint to-pastel-sky flex items-center justify-center flex-shrink-0 shadow-md">
                  <GraduationCap className="w-6 h-6 text-pastel-mint-dark" />
                </div>
                <div>
                  <h2 className="font-display text-2xl font-bold text-gray-800 mb-3">
                    La mia missione
                  </h2>
                  <p className="font-body text-gray-500 leading-relaxed">
                    Il mio obiettivo è creare un ponte tra educazione e divertimento. 
                    Credo che i bambini imparino meglio quando si divertono, e che ogni storia 
                    possa essere un'opportunità per crescere. Per questo ogni mio prodotto 
                    è pensato per essere sia educativo che magico.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

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
                desc: 'Ogni prodotto è pensato con il cuore, come se lo stessi creando per mio figlio',
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

      <section className="py-20 bg-white">
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
    </div>
  )
}
