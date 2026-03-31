import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, Heart, Star, BookOpen, Palette, Lightbulb, Users, Award, ChevronRight } from 'lucide-react'

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
              <span className="font-body text-sm text-gray-600">Contenuti magici per bambini</span>
            </motion.div>

            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-extrabold text-gray-800 mb-6 leading-tight">
              Ciao, sono{' '}
              <span className="text-gradient">Debora</span>
            </h1>

            <p className="font-body text-xl md:text-2xl text-gray-500 mb-10 max-w-2xl mx-auto leading-relaxed">
              Creo storie, attività e contenuti digitali che ispirano la fantasia dei più piccoli
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/portfolio" className="btn-primary inline-flex items-center justify-center gap-2 text-base">
                Scopri i miei prodotti
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
                title: 'Contenuti Digitali',
                desc: 'Materiali scaricabili pronti all\'uso, pensati per genitori ed educatori',
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
              Come accedere ai contenuti
            </motion.h2>
            <motion.p variants={itemVariants} className="section-subtitle">
              Un processo semplice e veloce per sbloccare i tuoi prodotti digitali
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
                title: 'Acquista',
                desc: 'Trova il prodotto perfetto su Gumroad, Etsy o altre piattaforme',
                color: 'from-pastel-pink to-pastel-peach',
              },
              {
                step: '02',
                title: 'Ricevi il PIN',
                desc: 'Ti arriverà un\'email con il tuo codice di accesso personale',
                color: 'from-pastel-lavender to-pastel-sky',
              },
              {
                step: '03',
                title: 'Scarica',
                desc: 'Inserisci il PIN sul sito e accedi subito al tuo prodotto',
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
