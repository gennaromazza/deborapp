import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Plus, Loader2, Trash2, Copy, Check, Mail, Sparkles, Clock, Package, CheckCircle, X, ChevronDown, ChevronUp } from 'lucide-react'
import toast from 'react-hot-toast'
import { supabase } from '../../utils/supabase'
import { getProductCategory } from '../../constants/productCategories'

export default function AdminUsers() {
  const [users, setUsers] = useState([])
  const [products, setProducts] = useState([])
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    selected_product_ids: [],
  })
  const [submitting, setSubmitting] = useState(false)
  const [copiedPin, setCopiedPin] = useState(null)
  const [expandedOrder, setExpandedOrder] = useState(null)

  useEffect(() => {
    fetchData()
  }, [])

  async function fetchData() {
    const [{ data: usersData }, { data: productsData }, { data: ordersData }] = await Promise.all([
      supabase
        .from('users')
        .select('*')
        .order('created_at', { ascending: false }),
      supabase.from('products').select('id, title, category').order('title'),
      supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false }),
    ])
    setUsers(usersData || [])
    setProducts(productsData || [])
    setOrders(ordersData || [])
    setLoading(false)
  }

  const generatePin = () => Math.floor(100000 + Math.random() * 900000).toString()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (formData.selected_product_ids.length === 0) {
      toast.error('Seleziona almeno un prodotto')
      return
    }
    setSubmitting(true)

    const pin = generatePin()

    const { error } = await supabase.functions.invoke('send-pin', {
      body: {
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email,
        product_ids: formData.selected_product_ids,
        pin,
      },
    })

    if (error) {
      toast.error('Errore durante la creazione del PIN')
    } else {
      toast.success(`PIN ${pin} generato e inviato via email!`)
      setFormData({ first_name: '', last_name: '', email: '', selected_product_ids: [] })
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
    const productIds = user.product_ids || (user.product_id ? [user.product_id] : [])
    const { error } = await supabase.functions.invoke('send-pin', {
      body: {
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        product_ids: productIds,
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

  const fulfillOrder = async (order) => {
    setShowForm(true)
    setFormData({
      first_name: order.first_name,
      last_name: order.last_name,
      email: order.email,
      selected_product_ids: order.selected_product_ids || [],
    })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const deleteOrder = async (id) => {
    if (!confirm('Eliminare questo ordine?')) return
    const { error } = await supabase.from('orders').delete().eq('id', id)
    if (error) {
      toast.error('Errore durante l\'eliminazione')
    } else {
      toast.success('Ordine eliminato')
      fetchData()
    }
  }

  const markOrderFulfilled = async (id) => {
    const { error } = await supabase.from('orders').update({ status: 'fulfilled' }).eq('id', id)
    if (error) {
      toast.error('Errore durante l\'aggiornamento')
    } else {
      toast.success('Ordine segnato come evaso')
      fetchData()
    }
  }

  const toggleProduct = (productId) => {
    setFormData((prev) => ({
      ...prev,
      selected_product_ids: prev.selected_product_ids.includes(productId)
        ? prev.selected_product_ids.filter((id) => id !== productId)
        : [...prev.selected_product_ids, productId],
    }))
  }

  const pendingOrders = orders.filter((o) => o.status === 'pending')
  const fulfilledOrders = orders.filter((o) => o.status !== 'pending')

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
        {/* ORDINI PENDENTI */}
        {pendingOrders.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-5 h-5 text-amber-500" />
              <h2 className="font-display text-lg font-bold text-gray-800">
                Ordini pendenti ({pendingOrders.length})
              </h2>
            </div>

            <div className="space-y-3">
              {pendingOrders.map((order) => {
                const isExpanded = expandedOrder === order.id
                const selectedProducts = products.filter((p) =>
                  (order.selected_product_ids || []).includes(p.id)
                )

                return (
                  <motion.div
                    key={order.id}
                    layout
                    className="card overflow-hidden border-2 border-amber-200"
                  >
                    <div
                      className="p-4 flex items-center justify-between cursor-pointer hover:bg-amber-50/50 transition-colors"
                      onClick={() => setExpandedOrder(isExpanded ? null : order.id)}
                    >
                      <div className="flex items-center gap-4 flex-1 min-w-0">
                        <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                          <Package className="w-5 h-5 text-amber-600" />
                        </div>
                        <div className="min-w-0">
                          <p className="font-display font-semibold text-gray-800 truncate">
                            {order.first_name} {order.last_name}
                          </p>
                          <p className="font-body text-sm text-gray-500 truncate">{order.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 ml-4">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-body font-medium bg-pastel-lavender text-pastel-lavender-dark">
                          {order.tier_key?.replace(/-/g, ' ')}
                        </span>
                        <span className="font-body text-sm text-gray-400">
                          {(order.selected_product_ids || []).length} prodotti
                        </span>
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4 text-gray-400" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-gray-400" />
                        )}
                      </div>
                    </div>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="border-t border-amber-100"
                        >
                          <div className="p-4 space-y-3">
                            <div className="grid sm:grid-cols-2 gap-2">
                              {selectedProducts.map((p) => (
                                <div key={p.id} className="flex items-center gap-2 p-2 bg-pastel-lavender/20 rounded-lg">
                                  <Package className="w-4 h-4 text-pastel-lavender-dark flex-shrink-0" />
                                  <div className="min-w-0">
                                    <span className="font-body text-sm text-gray-700 truncate block">{p.title}</span>
                                    <span className="font-body text-xs text-gray-500">
                                      {getProductCategory(p.category).label}
                                    </span>
                                  </div>
                                </div>
                              ))}
                            </div>
                            <p className="font-body text-xs text-gray-400">
                              Ricevuto il {new Date(order.created_at).toLocaleDateString('it-IT', { day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                            </p>
                            <div className="flex gap-2">
                              <button
                                onClick={() => fulfillOrder(order)}
                                className="btn-primary flex items-center gap-2 text-sm"
                              >
                                <Sparkles className="w-4 h-4" />
                                Genera PIN
                              </button>
                              <button
                                onClick={() => markOrderFulfilled(order.id)}
                                className="px-4 py-2 rounded-xl bg-pastel-mint text-pastel-mint-dark font-body font-medium text-sm hover:bg-pastel-mint/80 transition-colors flex items-center gap-1.5"
                              >
                                <CheckCircle className="w-4 h-4" />
                                Segna come evaso
                              </button>
                              <button
                                onClick={() => deleteOrder(order.id)}
                                className="px-4 py-2 rounded-xl bg-red-50 text-red-400 font-body font-medium text-sm hover:bg-red-100 transition-colors flex items-center gap-1.5"
                              >
                                <X className="w-4 h-4" />
                                Elimina
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        )}

        {/* FORM GENERAZIONE PIN */}
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
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-3 gap-4">
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
              </div>

              <div>
                <label className="block font-body font-medium text-gray-600 mb-2">
                  Prodotti da sbloccare ({formData.selected_product_ids.length} selezionati)
                </label>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2 max-h-48 overflow-y-auto p-2 bg-pastel-cream/50 rounded-xl">
                  {products.map((p) => {
                    const isSelected = formData.selected_product_ids.includes(p.id)
                    return (
                      <label
                        key={p.id}
                        className={`flex items-center gap-2 p-3 rounded-xl cursor-pointer transition-all text-sm ${
                          isSelected
                            ? 'bg-pastel-pink/30 border-2 border-pastel-pink-dark'
                            : 'bg-white border-2 border-transparent hover:border-pastel-lavender'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleProduct(p.id)}
                          className="w-4 h-4 rounded accent-pastel-pink-dark"
                        />
                        <div className="min-w-0">
                          <span className="font-body text-gray-700 truncate block">{p.title}</span>
                          <span className="font-body text-xs text-gray-500">
                            {getProductCategory(p.category).label}
                          </span>
                        </div>
                      </label>
                    )
                  })}
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={submitting || formData.selected_product_ids.length === 0}
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
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false)
                    setFormData({ first_name: '', last_name: '', email: '', selected_product_ids: [] })
                  }}
                  className="px-4 py-2 rounded-xl text-gray-500 font-body text-sm hover:bg-gray-100 transition-colors"
                >
                  Annulla
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {/* TABELLA UTENTI */}
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
                    <th className="px-6 py-4 text-left font-display font-semibold text-gray-700 text-sm">Prodotti</th>
                    <th className="px-6 py-4 text-left font-display font-semibold text-gray-700 text-sm">PIN</th>
                    <th className="px-6 py-4 text-left font-display font-semibold text-gray-700 text-sm">Azioni</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-pastel-lavender/30">
                  {users.map((user) => {
                    const productIds = user.product_ids || (user.product_id ? [user.product_id] : [])
                    const userProducts = products.filter((p) => productIds.includes(p.id))

                    return (
                      <tr key={user.id} className="hover:bg-pastel-pink/10 transition-colors">
                        <td className="px-6 py-4 font-body text-gray-700 text-sm">
                          {user.first_name} {user.last_name}
                          {user.tier_key && (
                            <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-body bg-pastel-lavender/50 text-pastel-lavender-dark">
                              {user.tier_key.replace(/-/g, ' ')}
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 font-body text-gray-500 text-sm">{user.email}</td>
                        <td className="px-6 py-4">
                          <div className="flex flex-wrap gap-1">
                            {userProducts.length > 0 ? (
                              userProducts.map((p) => (
                                <span key={p.id} className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-body bg-pastel-mint/50 text-pastel-mint-dark">
                                  {p.title} - {getProductCategory(p.category).shortLabel}
                                </span>
                              ))
                            ) : (
                              <span className="font-body text-gray-400 text-sm">—</span>
                            )}
                          </div>
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
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ORDINI EVASI */}
        {fulfilledOrders.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-12"
          >
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle className="w-5 h-5 text-pastel-mint-dark" />
              <h2 className="font-display text-lg font-bold text-gray-800">
                Ordini evasi ({fulfilledOrders.length})
              </h2>
            </div>
            <div className="card overflow-hidden opacity-70">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-pastel-mint/30">
                    <tr>
                      <th className="px-6 py-3 text-left font-display font-semibold text-gray-600 text-sm">Nome</th>
                      <th className="px-6 py-3 text-left font-display font-semibold text-gray-600 text-sm">Email</th>
                      <th className="px-6 py-3 text-left font-display font-semibold text-gray-600 text-sm">Tier</th>
                      <th className="px-6 py-3 text-left font-display font-semibold text-gray-600 text-sm">Data</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-pastel-mint/20">
                    {fulfilledOrders.map((order) => (
                      <tr key={order.id} className="text-gray-400">
                        <td className="px-6 py-3 font-body text-sm">{order.first_name} {order.last_name}</td>
                        <td className="px-6 py-3 font-body text-sm">{order.email}</td>
                        <td className="px-6 py-3 font-body text-sm">{order.tier_key?.replace(/-/g, ' ')}</td>
                        <td className="px-6 py-3 font-body text-sm">
                          {new Date(order.created_at).toLocaleDateString('it-IT')}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  )
}
