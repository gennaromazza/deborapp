import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Plus, Loader2, Trash2, Copy, Check, Mail, Sparkles } from 'lucide-react'
import toast from 'react-hot-toast'
import { supabase } from '../../utils/supabase'

export default function AdminUsers() {
  const [users, setUsers] = useState([])
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    product_id: '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [copiedPin, setCopiedPin] = useState(null)

  useEffect(() => {
    fetchData()
  }, [])

  async function fetchData() {
    const [{ data: usersData }, { data: productsData }] = await Promise.all([
      supabase
        .from('users')
        .select('*, products(title)')
        .order('created_at', { ascending: false }),
      supabase.from('products').select('id, title').order('title'),
    ])
    setUsers(usersData || [])
    setProducts(productsData || [])
    setLoading(false)
  }

  const generatePin = () => Math.floor(100000 + Math.random() * 900000).toString()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)

    const pin = generatePin()

    const { error } = await supabase.functions.invoke('send-pin', {
      body: {
        ...formData,
        pin,
      },
    })

    if (error) {
      toast.error('Errore durante la creazione del PIN')
    } else {
      toast.success(`PIN ${pin} generato e inviato via email!`)
      setFormData({ first_name: '', last_name: '', email: '', product_id: '' })
      setShowForm(false)
      fetchData()
    }

    setSubmitting(false)
  }

  const handleDelete = async (id) => {
    if (!confirm('Sei sicuro di voler eliminare questo utente?')) return

    const { error } = await supabase.from('users').delete().eq('id', id)
    if (error) {
      toast.error('Errore durante l\'eliminazione')
    } else {
      toast.success('Utente eliminato')
      fetchData()
    }
  }

  const copyPin = (pin) => {
    navigator.clipboard.writeText(pin)
    setCopiedPin(pin)
    toast.success('PIN copiato!')
    setTimeout(() => setCopiedPin(null), 2000)
  }

  const resendEmail = async (user) => {
    const { error } = await supabase.functions.invoke('send-pin', {
      body: {
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        product_id: user.product_id,
        pin: user.pin,
        resend: true,
      },
    })

    if (error) {
      toast.error('Errore durante il rinvio email')
    } else {
      toast.success('Email reinviata con successo!')
    }
  }

  return (
    <div className="min-h-screen bg-pastel-cream">
      <header className="glass sticky top-0 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/admin" className="text-gray-500 hover:text-pastel-pink-dark transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="font-display font-bold text-xl text-gray-800">
              Gestione Utenti
            </h1>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="btn-primary flex items-center gap-2 text-sm"
          >
            <Plus className="w-4 h-4" />
            Nuovo PIN
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card p-6 mb-8"
          >
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-pastel-pink-dark" />
              <h2 className="font-display text-lg font-bold text-gray-800">
                Genera nuovo PIN
              </h2>
            </div>
            <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
              <input
                type="text"
                placeholder="Nome"
                value={formData.first_name}
                onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                className="input-field"
                required
              />
              <input
                type="text"
                placeholder="Cognome"
                value={formData.last_name}
                onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                className="input-field"
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="input-field"
                required
              />
              <select
                value={formData.product_id}
                onChange={(e) => setFormData({ ...formData, product_id: e.target.value })}
                className="input-field"
                required
              >
                <option value="">Seleziona prodotto</option>
                {products.map((p) => (
                  <option key={p.id} value={p.id}>{p.title}</option>
                ))}
              </select>
              <button
                type="submit"
                disabled={submitting}
                className="btn-primary flex items-center justify-center gap-2 disabled:opacity-50 text-sm"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Invio...
                  </>
                ) : (
                  <>
                    <Mail className="w-4 h-4" />
                    Genera e Invia
                  </>
                )}
              </button>
            </form>
          </motion.div>
        )}

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-pastel-pink-dark border-t-transparent" />
          </div>
        ) : users.length === 0 ? (
          <div className="card p-12 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-pastel-lavender/50 flex items-center justify-center">
              <Mail className="w-8 h-8 text-pastel-lavender-dark/50" />
            </div>
            <p className="font-body text-gray-500 text-lg">
              Nessun utente registrato. Genera il primo PIN!
            </p>
          </div>
        ) : (
          <div className="card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-pastel-lavender/30">
                  <tr>
                    <th className="px-6 py-4 text-left font-display font-semibold text-gray-700 text-sm">Nome</th>
                    <th className="px-6 py-4 text-left font-display font-semibold text-gray-700 text-sm">Email</th>
                    <th className="px-6 py-4 text-left font-display font-semibold text-gray-700 text-sm">Prodotto</th>
                    <th className="px-6 py-4 text-left font-display font-semibold text-gray-700 text-sm">PIN</th>
                    <th className="px-6 py-4 text-left font-display font-semibold text-gray-700 text-sm">Azioni</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-pastel-lavender/30">
                  {users.map((user) => (
                    <tr key={user.id} className="hover:bg-pastel-pink/10 transition-colors">
                      <td className="px-6 py-4 font-body text-gray-700 text-sm">
                        {user.first_name} {user.last_name}
                      </td>
                      <td className="px-6 py-4 font-body text-gray-500 text-sm">{user.email}</td>
                      <td className="px-6 py-4 font-body text-gray-500 text-sm">
                        {user.products?.title || '—'}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <code className="bg-pastel-lavender/50 px-3 py-1 rounded-lg font-mono text-pastel-lavender-dark font-bold text-sm">
                            {user.pin}
                          </code>
                          <button
                            onClick={() => copyPin(user.pin)}
                            className="p-1.5 text-gray-400 hover:text-pastel-pink-dark transition-colors rounded-lg hover:bg-pastel-pink/30"
                          >
                            {copiedPin === user.pin ? (
                              <Check className="w-4 h-4 text-pastel-mint-dark" />
                            ) : (
                              <Copy className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => resendEmail(user)}
                            className="p-2 text-gray-400 hover:text-pastel-sky-dark transition-colors rounded-lg hover:bg-pastel-sky/30"
                            title="Reinvia email"
                          >
                            <Mail className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(user.id)}
                            className="p-2 text-gray-400 hover:text-red-400 transition-colors rounded-lg hover:bg-red-50"
                            title="Elimina"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
