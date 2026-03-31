import { useState, useEffect } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { BookOpen, Home, LayoutGrid, Key, Menu, X, User, Mail, Sparkles, ChevronUp } from 'lucide-react'

export default function Layout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [showScrollTop, setShowScrollTop] = useState(false)
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
      <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'glass shadow-sm' : 'bg-transparent'}`}>
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <motion.div
              whileHover={{ rotate: 10, scale: 1.1 }}
              className="w-10 h-10 rounded-xl bg-gradient-to-br from-pastel-pink to-pastel-lavender flex items-center justify-center shadow-md"
            >
              <BookOpen className="w-5 h-5 text-pastel-pink-dark" />
            </motion.div>
            <span className="font-display font-bold text-xl text-gray-800 hidden sm:block">
              Debora di Bellucci
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map(({ path, label }) => (
              <Link
                key={path}
                to={path}
                className={`px-4 py-2 rounded-xl font-body font-medium text-sm transition-all duration-200 ${
                  location.pathname === path
                    ? 'bg-pastel-pink text-pastel-pink-dark'
                    : 'text-gray-500 hover:text-pastel-pink-dark hover:bg-pastel-pink/50'
                }`}
              >
                {label}
              </Link>
            ))}
            <Link
              to="/admin/login"
              className="ml-2 flex items-center gap-1.5 px-4 py-2 text-gray-400 hover:text-pastel-lavender-dark hover:bg-pastel-lavender/30 rounded-xl transition-all duration-200 text-sm font-body font-medium"
            >
              <User className="w-3.5 h-3.5" />
              Admin
            </Link>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-gray-600 hover:text-pastel-pink-dark rounded-xl hover:bg-pastel-pink/30 transition-all"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white/95 backdrop-blur-lg border-t border-pastel-lavender/30"
            >
              <div className="px-4 py-4 space-y-1">
                {navLinks.map(({ path, label, icon: Icon }) => (
                  <Link
                    key={path}
                    to={path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 py-3 px-4 rounded-xl font-body font-medium transition-all ${
                      location.pathname === path
                        ? 'bg-pastel-pink text-pastel-pink-dark'
                        : 'text-gray-500 hover:bg-pastel-lavender/30'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {label}
                  </Link>
                ))}
                <Link
                  to="/admin/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 py-3 px-4 rounded-xl font-body font-medium text-gray-400 hover:bg-pastel-lavender/30 transition-all"
                >
                  <User className="w-5 h-5" />
                  Admin
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="bg-white border-t border-pastel-lavender/30 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pastel-pink to-pastel-lavender flex items-center justify-center shadow-md">
                  <BookOpen className="w-5 h-5 text-pastel-pink-dark" />
                </div>
                <span className="font-display font-bold text-lg text-gray-800">
                  Debora di Bellucci
                </span>
              </div>
              <p className="font-body text-gray-500 text-sm leading-relaxed">
                Creo storie, attività e contenuti digitali che ispirano la fantasia dei più piccoli
              </p>
            </div>

            <div>
              <h4 className="font-display font-bold text-gray-800 mb-4">Navigazione</h4>
              <div className="space-y-2">
                {navLinks.map(({ path, label }) => (
                  <Link
                    key={path}
                    to={path}
                    className="block font-body text-gray-500 text-sm hover:text-pastel-pink-dark transition-colors"
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-display font-bold text-gray-800 mb-4">Contatti</h4>
              <Link
                to="/contatti"
                className="flex items-center gap-2 font-body text-gray-500 text-sm hover:text-pastel-pink-dark transition-colors mb-2"
              >
                <Mail className="w-4 h-4" />
                Scrivimi un messaggio
              </Link>
              <p className="font-body text-gray-400 text-xs mt-4">
                Rispondo entro 24-48 ore
              </p>
            </div>
          </div>

          <div className="border-t border-pastel-lavender/30 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="font-body text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} Debora di Bellucci &mdash; Tutti i diritti riservati
            </p>
            <div className="flex items-center gap-1 text-gray-400 text-xs font-body">
              <Sparkles className="w-3.5 h-3.5 text-pastel-pink-dark" />
              <span>Creatrice di contenuti digitali per bambini</span>
            </div>
          </div>
        </div>
      </footer>

      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-6 right-6 w-12 h-12 bg-pastel-pink-dark text-white rounded-full shadow-lg hover:shadow-xl flex items-center justify-center z-50"
          >
            <ChevronUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}
