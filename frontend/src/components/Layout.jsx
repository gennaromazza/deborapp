import { useState, useEffect, useRef } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { BookOpen, Home, LayoutGrid, Key, Menu, X, User, Mail, Sparkles, ChevronUp, ChevronRight, Heart, Star } from 'lucide-react'

export default function Layout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [activeIndicator, setActiveIndicator] = useState({ x: 0, width: 0 })
  const navRef = useRef(null)
  const location = useLocation()
  const isAdmin = location.pathname.startsWith('/admin')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
      setShowScrollTop(window.scrollY > 400)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [location.pathname])

  useEffect(() => {
    if (navRef.current) {
      const activeLink = navRef.current.querySelector('[data-active="true"]')
      if (activeLink) {
        setActiveIndicator({
          x: activeLink.offsetLeft,
          width: activeLink.offsetWidth,
        })
      }
    }
  }, [location.pathname])

  const navLinks = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/chi-sono', label: 'Chi sono', icon: User },
    { path: '/portfolio', label: 'Portfolio', icon: LayoutGrid },
    { path: '/contatti', label: 'Contatti', icon: Mail },
    { path: '/accesso-pin', label: 'Accedi con PIN', icon: Key },
  ]

  if (isAdmin) {
    return (
      <div className="min-h-screen bg-pastel-cream">
        <Outlet />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className={`sticky top-0 z-50 transition-all duration-500 ${scrolled ? 'glass shadow-lg shadow-pastel-pink/10' : 'bg-transparent'}`}>
        <div className="absolute inset-0 bg-gradient-to-r from-pastel-pink/30 via-transparent to-pastel-lavender/30 opacity-0 transition-opacity duration-500 pointer-events-none" />
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between relative">
          <Link to="/" className="flex items-center gap-3 group z-10">
            <motion.img
              src="/official_logo.png"
              alt="Debora di Bellucci Logo"
              whileHover={{ rotate: 15, scale: 1.15 }}
              whileTap={{ scale: 0.95 }}
              className="w-11 h-11 rounded-2xl shadow-lg group-hover:shadow-xl transition-shadow duration-300 object-contain"
            />
            <div className="hidden sm:block">
              <span className="font-display font-bold text-lg text-gray-800 block leading-tight">
                Debora
              </span>
              <span className="font-body text-xs text-gray-500 block -mt-0.5">
                di Bellucci
              </span>
            </div>
          </Link>

          <div ref={navRef} className="hidden lg:flex items-center relative">
            <motion.div
              className="absolute h-9 rounded-xl bg-pastel-pink/80 backdrop-blur-sm"
              animate={{ x: activeIndicator.x, width: activeIndicator.width }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            />
            {navLinks.map(({ path, label }) => (
              <Link
                key={path}
                to={path}
                data-active={location.pathname === path}
                className={`relative z-10 px-4 py-2 rounded-xl font-body font-medium text-sm transition-colors duration-200 ${
                  location.pathname === path
                    ? 'text-pastel-pink-dark'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {label}
              </Link>
            ))}
            <div className="ml-3 pl-3 border-l border-pastel-lavender/50">
              <Link
                to="/admin/login"
                className="flex items-center gap-1.5 px-3 py-2 text-gray-400 hover:text-pastel-lavender-dark hover:bg-pastel-lavender/30 rounded-xl transition-all duration-200 text-sm font-body font-medium"
              >
                <User className="w-3.5 h-3.5" />
                Admin
              </Link>
            </div>
          </div>

          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 text-gray-600 hover:text-pastel-pink-dark rounded-xl hover:bg-pastel-pink/30 transition-all z-50 relative"
          >
            <AnimatePresence mode="wait">
              {mobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-6 h-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="w-6 h-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </nav>

        <AnimatePresence>
          {mobileMenuOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setMobileMenuOpen(false)}
                className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
              />
              <motion.div
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                className="lg:hidden fixed top-16 left-4 right-4 bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl shadow-pastel-pink/20 border border-pastel-lavender/30 z-40 overflow-hidden"
              >
                <div className="p-3 space-y-1">
                  {navLinks.map(({ path, label, icon: Icon }, index) => (
                    <Link
                      key={path}
                      to={path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center gap-3 py-3.5 px-4 rounded-2xl font-body font-medium transition-all duration-200 ${
                        location.pathname === path
                          ? 'bg-gradient-to-r from-pastel-pink to-pastel-lavender/50 text-pastel-pink-dark shadow-md'
                          : 'text-gray-600 hover:bg-pastel-lavender/20'
                      }`}
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <motion.div
                        whileTap={{ scale: 0.9 }}
                        className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                          location.pathname === path
                            ? 'bg-white/50'
                            : 'bg-pastel-lavender/30'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </motion.div>
                      <span>{label}</span>
                      {location.pathname === path && (
                        <ChevronRight className="w-4 h-4 ml-auto" />
                      )}
                    </Link>
                  ))}
                  <div className="pt-2 mt-2 border-t border-pastel-lavender/30">
                    <Link
                      to="/admin/login"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-3 py-3.5 px-4 rounded-2xl font-body font-medium text-gray-400 hover:bg-pastel-lavender/20 transition-all"
                    >
                      <div className="w-9 h-9 rounded-xl bg-pastel-lavender/30 flex items-center justify-center">
                        <User className="w-4 h-4" />
                      </div>
                      <span>Admin</span>
                    </Link>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="relative bg-white border-t border-pastel-lavender/30 mt-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-pastel-pink/10 via-transparent to-pastel-lavender/10 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16">
          <div className="grid md:grid-cols-4 gap-10 mb-12">
            <div className="md:col-span-1">
              <div className="flex items-center gap-3 mb-5">
                <img
                  src="/official_logo.png"
                  alt="Debora di Bellucci Logo"
                  className="w-11 h-11 rounded-2xl shadow-lg object-contain"
                />
                <div>
                  <span className="font-display font-bold text-lg text-gray-800 block leading-tight">
                    Debora
                  </span>
                  <span className="font-body text-xs text-gray-500 block -mt-0.5">
                    di Bellucci
                  </span>
                </div>
              </div>
              <p className="font-body text-gray-500 text-sm leading-relaxed mb-5">
                Creo storie, attività e contenuti digitali che ispirano la fantasia dei più piccoli
              </p>
              <div className="flex gap-2">
                <motion.div whileHover={{ scale: 1.1 }} className="w-9 h-9 rounded-xl bg-pastel-pink flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-pastel-pink-dark" />
                </motion.div>
                <motion.div whileHover={{ scale: 1.1 }} className="w-9 h-9 rounded-xl bg-pastel-lavender flex items-center justify-center">
                  <Heart className="w-4 h-4 text-pastel-lavender-dark" />
                </motion.div>
                <motion.div whileHover={{ scale: 1.1 }} className="w-9 h-9 rounded-xl bg-pastel-mint flex items-center justify-center">
                  <Star className="w-4 h-4 text-pastel-mint-dark" />
                </motion.div>
              </div>
            </div>

            <div>
              <h4 className="font-display font-bold text-gray-800 mb-5 flex items-center gap-2">
                <span className="w-1.5 h-5 rounded-full bg-pastel-pink-dark" />
                Navigazione
              </h4>
              <div className="space-y-3">
                {navLinks.map(({ path, label }) => (
                  <Link
                    key={path}
                    to={path}
                    className="group flex items-center gap-2 font-body text-gray-500 text-sm hover:text-pastel-pink-dark transition-all"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-pastel-lavender-dark group-hover:text-pastel-pink-dark group-hover:translate-x-0.5 transition-all" />
                    {label}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-display font-bold text-gray-800 mb-5 flex items-center gap-2">
                <span className="w-1.5 h-5 rounded-full bg-pastel-lavender-dark" />
                Contenuti
              </h4>
              <div className="space-y-3">
                <Link to="/portfolio" className="group flex items-center gap-2 font-body text-gray-500 text-sm hover:text-pastel-lavender-dark transition-all">
                  <ChevronRight className="w-3.5 h-3.5 text-pastel-lavender-dark group-hover:translate-x-0.5 transition-all" />
                  Storie
                </Link>
                <Link to="/portfolio" className="group flex items-center gap-2 font-body text-gray-500 text-sm hover:text-pastel-lavender-dark transition-all">
                  <ChevronRight className="w-3.5 h-3.5 text-pastel-lavender-dark group-hover:translate-x-0.5 transition-all" />
                  Attività creative
                </Link>
                <Link to="/portfolio" className="group flex items-center gap-2 font-body text-gray-500 text-sm hover:text-pastel-lavender-dark transition-all">
                  <ChevronRight className="w-3.5 h-3.5 text-pastel-lavender-dark group-hover:translate-x-0.5 transition-all" />
                  Materiali digitali
                </Link>
                <Link to="/accesso-pin" className="group flex items-center gap-2 font-body text-gray-500 text-sm hover:text-pastel-lavender-dark transition-all">
                  <ChevronRight className="w-3.5 h-3.5 text-pastel-lavender-dark group-hover:translate-x-0.5 transition-all" />
                  Accedi con PIN
                </Link>
              </div>
            </div>

            <div>
              <h4 className="font-display font-bold text-gray-800 mb-5 flex items-center gap-2">
                <span className="w-1.5 h-5 rounded-full bg-pastel-mint-dark" />
                Contatti
              </h4>
              <Link
                to="/contatti"
                className="group flex items-center gap-3 p-4 rounded-2xl bg-pastel-mint/30 hover:bg-pastel-mint/50 transition-all mb-3"
              >
                <div className="w-10 h-10 rounded-xl bg-pastel-mint flex items-center justify-center">
                  <Mail className="w-4 h-4 text-pastel-mint-dark" />
                </div>
                <div>
                  <p className="font-body font-medium text-gray-700 text-sm">Scrivimi</p>
                  <p className="font-body text-gray-400 text-xs">Risposta entro 24-48h</p>
                </div>
              </Link>
              <p className="font-body text-gray-400 text-xs">
                Sempre disponibile per collaborazioni e domande
              </p>
            </div>
          </div>

          <div className="border-t border-pastel-lavender/30 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="font-body text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} Debora di Bellucci &mdash; Tutti i diritti riservati
            </p>
            <div className="flex items-center gap-2 text-gray-400 text-xs font-body">
              <Sparkles className="w-4 h-4 text-pastel-pink-dark" />
              <span>Creatrice di contenuti digitali per bambini</span>
            </div>
          </div>
        </div>
      </footer>

      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-6 right-6 w-12 h-12 bg-gradient-to-br from-pastel-pink-dark to-pastel-lavender-dark text-white rounded-2xl shadow-lg hover:shadow-xl flex items-center justify-center z-50"
          >
            <ChevronUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}
