import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight } from 'lucide-react'

const pageNavigation = {
  '/': {
    prev: null,
    next: { path: '/chi-sono', label: 'Chi sono' },
  },
  '/chi-sono': {
    prev: { path: '/', label: 'Home' },
    next: { path: '/attivita', label: 'Attività' },
  },
  '/portfolio': {
    prev: { path: '/chi-sono', label: 'Chi sono' },
    next: { path: '/attivita', label: 'Attività' },
  },
  '/attivita': {
    prev: { path: '/chi-sono', label: 'Chi sono' },
    next: { path: '/contatti', label: 'Contatti' },
  },
  '/contatti': {
    prev: { path: '/attivita', label: 'Attività' },
    next: { path: '/accesso-pin', label: 'Accedi con PIN' },
  },
  '/accesso-pin': {
    prev: { path: '/contatti', label: 'Contatti' },
    next: null,
  },
}

export default function PageNavigation() {
  const location = useLocation()
  const nav = pageNavigation[location.pathname]
  
  if (!nav) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex items-center justify-between gap-4 mt-16 pt-8 border-t border-pastel-lavender/30"
    >
      {nav.prev ? (
        <Link
          to={nav.prev.path}
          className="group flex items-center gap-3 px-5 py-3 rounded-2xl bg-white border border-pastel-lavender/30 hover:border-pastel-pink/50 hover:shadow-md transition-all duration-300"
        >
          <motion.div
            whileHover={{ x: -3 }}
            className="w-8 h-8 rounded-xl bg-pastel-lavender/30 flex items-center justify-center group-hover:bg-pastel-pink/30 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-gray-500 group-hover:text-pastel-pink-dark" />
          </motion.div>
          <div>
            <p className="text-xs text-gray-400 font-body">Precedente</p>
            <p className="text-sm font-body font-medium text-gray-700 group-hover:text-pastel-pink-dark transition-colors">
              {nav.prev.label}
            </p>
          </div>
        </Link>
      ) : (
        <div />
      )}

      {nav.next ? (
        <Link
          to={nav.next.path}
          className="group flex items-center gap-3 px-5 py-3 rounded-2xl bg-white border border-pastel-lavender/30 hover:border-pastel-pink/50 hover:shadow-md transition-all duration-300"
        >
          <div>
            <p className="text-xs text-gray-400 font-body">Successivo</p>
            <p className="text-sm font-body font-medium text-gray-700 group-hover:text-pastel-pink-dark transition-colors">
              {nav.next.label}
            </p>
          </div>
          <motion.div
            whileHover={{ x: 3 }}
            className="w-8 h-8 rounded-xl bg-pastel-lavender/30 flex items-center justify-center group-hover:bg-pastel-pink/30 transition-colors"
          >
            <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-pastel-pink-dark" />
          </motion.div>
        </Link>
      ) : (
        <div />
      )}
    </motion.div>
  )
}
