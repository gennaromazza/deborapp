import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Users, BookOpen, LogOut, ArrowRight, Sparkles, TrendingUp } from 'lucide-react'
import { supabase } from '../../utils/supabase'

export default function AdminDashboard() {
  const [stats, setStats] = useState({ users: 0, products: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchStats() {
      const [{ count: userCount }, { count: productCount }] = await Promise.all([
        supabase.from('users').select('*', { count: 'exact', head: true }),
        supabase.from('products').select('*', { count: 'exact', head: true }),
      ])
      setStats({ users: userCount || 0, products: productCount || 0 })
      setLoading(false)
    }
    fetchStats()
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    window.location.href = '/admin/login'
  }

  return (
    <div className="min-h-screen bg-pastel-cream">
      <header className="glass sticky top-0 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-pastel-pink to-pastel-lavender flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-pastel-pink-dark" />
            </div>
            <h1 className="font-display font-bold text-xl text-gray-800">
              Pannello Admin
            </h1>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-gray-500 hover:text-red-400 transition-colors font-body text-sm"
          >
            <LogOut className="w-4 h-4" />
            Esci
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="mb-8">
          <h2 className="font-display text-2xl font-bold text-gray-800 mb-1">
            Benvenuta!
          </h2>
          <p className="font-body text-gray-500">
            Ecco un riepilogo del tuo portfolio
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="card p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="font-body text-gray-500 mb-1">Utenti Registrati</p>
                <p className="font-display text-4xl font-bold text-pastel-pink-dark">
                  {loading ? '...' : stats.users}
                </p>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-pastel-pink flex items-center justify-center">
                <Users className="w-7 h-7 text-pastel-pink-dark" />
              </div>
            </div>
            <Link
              to="/admin/utenti"
              className="mt-4 inline-flex items-center gap-1 text-pastel-pink-dark font-body font-medium hover:underline text-sm"
            >
              Gestisci utenti
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="card p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="font-body text-gray-500 mb-1">Prodotti</p>
                <p className="font-display text-4xl font-bold text-pastel-lavender-dark">
                  {loading ? '...' : stats.products}
                </p>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-pastel-lavender flex items-center justify-center">
                <BookOpen className="w-7 h-7 text-pastel-lavender-dark" />
              </div>
            </div>
            <Link
              to="/admin/prodotti"
              className="mt-4 inline-flex items-center gap-1 text-pastel-lavender-dark font-body font-medium hover:underline text-sm"
            >
              Gestisci prodotti
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>

        <div className="card p-8 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-pastel-mint mb-4">
            <TrendingUp className="w-6 h-6 text-pastel-mint-dark" />
          </div>
          <h2 className="font-display text-xl font-bold text-gray-800 mb-2">
            Azioni rapide
          </h2>
          <p className="font-body text-gray-500 mb-6">
            Genera un nuovo PIN e invialo a un acquirente
          </p>
          <Link to="/admin/utenti" className="btn-primary inline-flex items-center gap-2">
            Nuovo PIN
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </main>
    </div>
  )
}
