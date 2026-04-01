import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Home, ChevronRight } from 'lucide-react'

const breadcrumbMap = {
  '/chi-sono': [
    { label: 'Home', path: '/' },
    { label: 'Chi sono', path: '/chi-sono' },
  ],
  '/portfolio': [
    { label: 'Home', path: '/' },
    { label: 'Portfolio', path: '/portfolio' },
  ],
  '/attivita': [
    { label: 'Home', path: '/' },
    { label: 'Attività', path: '/attivita' },
  ],
  '/grazie': [
    { label: 'Home', path: '/' },
    { label: 'Grazie', path: '/grazie' },
  ],
  '/contatti': [
    { label: 'Home', path: '/' },
    { label: 'Contatti', path: '/contatti' },
  ],
  '/accesso-pin': [
    { label: 'Home', path: '/' },
    { label: 'Accedi con PIN', path: '/accesso-pin' },
  ],
  '/admin': [
    { label: 'Home', path: '/' },
    { label: 'Dashboard', path: '/admin' },
  ],
  '/admin/utenti': [
    { label: 'Home', path: '/' },
    { label: 'Dashboard', path: '/admin' },
    { label: 'Utenti', path: '/admin/utenti' },
  ],
  '/admin/prodotti': [
    { label: 'Home', path: '/' },
    { label: 'Dashboard', path: '/admin' },
    { label: 'Prodotti', path: '/admin/prodotti' },
  ],
}

export default function Breadcrumb() {
  const location = useLocation()
  const path = location.pathname
  
  let breadcrumbs = breadcrumbMap[path]
  
  if (!breadcrumbs) {
    for (const [key, value] of Object.entries(breadcrumbMap)) {
      if (path.startsWith(key) && key !== '/') {
        breadcrumbs = value
        break
      }
    }
  }
  
  if (!breadcrumbs || breadcrumbs.length <= 1) return null

  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-2 text-sm font-body mb-6"
    >
      {breadcrumbs.map((crumb, index) => {
        const isLast = index === breadcrumbs.length - 1
        
        return (
          <div key={crumb.path} className="flex items-center gap-2">
            {index > 0 && (
              <ChevronRight className="w-3.5 h-3.5 text-pastel-lavender-dark/50" />
            )}
            {isLast ? (
              <span className="text-pastel-pink-dark font-medium">
                {crumb.label}
              </span>
            ) : (
              <Link
                to={crumb.path}
                className="text-gray-500 hover:text-pastel-pink-dark transition-colors flex items-center gap-1.5"
              >
                {index === 0 && <Home className="w-3.5 h-3.5" />}
                <span>{crumb.label}</span>
              </Link>
            )}
          </div>
        )
      })}
    </motion.nav>
  )
}
