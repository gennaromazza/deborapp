import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Lock, Loader2, Sparkles } from 'lucide-react'
import toast from 'react-hot-toast'
import { supabase } from '../../utils/supabase'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  const from = location.state?.from?.pathname || '/admin'

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      toast.error('Credenziali non valide')
    } else {
      toast.success('Accesso effettuato!')
      navigate(from, { replace: true })
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-mesh p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card-glass w-full max-w-md p-8"
      >
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
            className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-pastel-lavender to-pastel-pink flex items-center justify-center shadow-lg"
          >
            <Lock className="w-8 h-8 text-pastel-lavender-dark" />
          </motion.div>
          <h1 className="font-display text-2xl font-bold text-gray-800">
            Pannello Admin
          </h1>
          <p className="font-body text-gray-500 mt-2">
            Accedi per gestire prodotti e utenti
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="block font-body font-medium text-gray-600 mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@esempio.it"
              className="input-field"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block font-body font-medium text-gray-600 mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="input-field"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Accesso in corso...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                Accedi
              </>
            )}
          </button>
        </form>
      </motion.div>
    </div>
  )
}
