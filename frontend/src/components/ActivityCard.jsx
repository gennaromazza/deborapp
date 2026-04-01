import { motion } from 'framer-motion'
import { ArrowUpRight, Printer, Monitor, Users, BookOpen, Palette } from 'lucide-react'

const categoryConfig = {
  'mini-app-interattive': {
    label: 'Mini App',
    color: 'bg-pastel-lavender text-pastel-lavender-dark',
    icon: Monitor,
  },
  'attivita-stampabili': {
    label: 'Da Stampare',
    color: 'bg-pastel-mint text-pastel-mint-dark',
    icon: Printer,
  },
  'percorsi-educativi': {
    label: 'Educativo',
    color: 'bg-pastel-sky text-pastel-sky-dark',
    icon: BookOpen,
  },
  'storie-avventure': {
    label: 'Storie',
    color: 'bg-pastel-pink text-pastel-pink-dark',
    icon: BookOpen,
  },
  'kit-famiglia': {
    label: 'In Famiglia',
    color: 'bg-pastel-peach text-pastel-peach-dark',
    icon: Users,
  },
}

const contextConfig = {
  'da-stampare': { label: 'Pronto da stampare', icon: Printer },
  'interattivo': { label: 'Interattivo', icon: Monitor },
  'in-famiglia': { label: 'Da fare insieme', icon: Users },
  'educativo': { label: 'Educativo', icon: BookOpen },
  'creativo': { label: 'Creativo', icon: Palette },
}

export default function ActivityCard({ activity, index }) {
  const catConfig = categoryConfig[activity.category] || {
    label: 'Attività',
    color: 'bg-pastel-lavender text-pastel-lavender-dark',
    icon: Palette,
  }

  const ctxConfig = contextConfig[activity.usage_context] || {
    label: 'Attività',
    icon: Palette,
  }

  const CatIcon = catConfig.icon
  const CtxIcon = ctxConfig.icon

  const images = activity.cover_images && activity.cover_images.length > 0
    ? activity.cover_images
    : activity.cover_image
      ? [activity.cover_image]
      : []

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="card group cursor-pointer"
    >
      <div className="aspect-[4/3] bg-gradient-to-br from-pastel-pink to-pastel-lavender relative overflow-hidden">
        {images.length > 0 ? (
          <img
            src={images[0]}
            alt={activity.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <CatIcon className="w-16 h-16 text-white/50 group-hover:scale-110 transition-transform duration-300" />
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-body font-medium shadow-sm ${catConfig.color}`}>
            <CatIcon className="w-3 h-3" />
            {catConfig.label}
          </span>
        </div>

        <div className="absolute bottom-3 left-3 flex items-center gap-1.5">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-body font-medium bg-white/90 backdrop-blur text-gray-600 shadow-sm">
            <CtxIcon className="w-3 h-3" />
            {ctxConfig.label}
          </span>
        </div>

        <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
          <div className="w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center shadow-lg">
            <ArrowUpRight className="w-5 h-5 text-pastel-pink-dark" />
          </div>
        </div>
      </div>

      <div className="p-6">
        <h3 className="font-display font-bold text-xl text-gray-800 mb-2 group-hover:text-pastel-pink-dark transition-colors">
          {activity.title}
        </h3>
        <p className="font-body text-gray-500 line-clamp-3 leading-relaxed">
          {activity.description}
        </p>
      </div>
    </motion.div>
  )
}
