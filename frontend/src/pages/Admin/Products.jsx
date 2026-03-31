import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Plus, Loader2, Trash2, Edit2, Sparkles, BookOpen, Globe, Gamepad2 } from 'lucide-react'
import toast from 'react-hot-toast'
import { supabase } from '../../utils/supabase'

export default function AdminProducts() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    cover_image: '',
    download_link: '',
    type: 'link',
  })
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    fetchProducts()
  }, [])

  async function fetchProducts() {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false })
    if (!error) setProducts(data || [])
    setLoading(false)
  }

  const resetForm = () => {
    setFormData({ title: '', description: '', cover_image: '', download_link: '', type: 'link' })
    setEditingId(null)
    setShowForm(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)

    const dataToSave = { ...formData }
    if (dataToSave.type === 'app') {
      dataToSave.download_link = 'https://app.internal/' + dataToSave.title.toLowerCase().replace(/\s+/g, '-')
    }

    let error
    if (editingId) {
      ({ error } = await supabase
        .from('products')
        .update(dataToSave)
        .eq('id', editingId))
    } else {
      ({ error } = await supabase
        .from('products')
        .insert([dataToSave]))
    }

    if (error) {
      toast.error('Errore durante il salvataggio')
    } else {
      toast.success(editingId ? 'Prodotto aggiornato!' : 'Prodotto aggiunto!')
      resetForm()
      fetchProducts()
    }

    setSubmitting(false)
  }

  const handleEdit = (product) => {
    setFormData({
      title: product.title,
      description: product.description,
      cover_image: product.cover_image || '',
      download_link: product.download_link,
      type: product.type || 'link',
    })
    setEditingId(product.id)
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    if (!confirm('Sei sicuro? Verranno eliminati anche tutti i PIN associati.')) return

    const { error } = await supabase.from('products').delete().eq('id', id)
    if (error) {
      toast.error('Errore durante l\'eliminazione')
    } else {
      toast.success('Prodotto eliminato')
      fetchProducts()
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
              Gestione Prodotti
            </h1>
          </div>
          <button
            onClick={() => { resetForm(); setShowForm(!showForm) }}
            className="btn-primary flex items-center gap-2 text-sm"
          >
            <Plus className="w-4 h-4" />
            Nuovo Prodotto
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
                {editingId ? 'Modifica prodotto' : 'Nuovo prodotto'}
              </h2>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Type selector */}
              <div>
                <label className="block font-body font-medium text-gray-600 mb-2">
                  Tipo prodotto
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, type: 'link' })}
                    className={`p-4 rounded-xl border-2 transition-all text-left ${formData.type === 'link' ? 'border-pastel-pink-dark bg-pastel-pink/30' : 'border-pastel-lavender hover:border-pastel-pink-dark'}`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Globe className="w-5 h-5 text-pastel-pink-dark" />
                      <span className="font-display font-semibold text-gray-800">Link Esterno</span>
                    </div>
                    <p className="font-body text-sm text-gray-500">Prodotto venduto su Gumroad, Etsy, ecc.</p>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, type: 'app' })}
                    className={`p-4 rounded-xl border-2 transition-all text-left ${formData.type === 'app' ? 'border-pastel-lavender-dark bg-pastel-lavender/30' : 'border-pastel-lavender hover:border-pastel-lavender-dark'}`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Gamepad2 className="w-5 h-5 text-pastel-lavender-dark" />
                      <span className="font-display font-semibold text-gray-800">App Interattiva</span>
                    </div>
                    <p className="font-body text-sm text-gray-500">Mini-app contenuto nel sito (libri, giochi)</p>
                  </button>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Titolo prodotto"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="input-field"
                  required
                />
                <input
                  type="url"
                  placeholder="URL immagine copertina (opzionale)"
                  value={formData.cover_image}
                  onChange={(e) => setFormData({ ...formData, cover_image: e.target.value })}
                  className="input-field"
                />
              </div>
              <textarea
                placeholder="Descrizione del prodotto"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="input-field min-h-[100px] resize-y"
                required
              />
              {formData.type === 'link' && (
                <input
                  type="url"
                  placeholder="Link al prodotto (es. link Gumroad, Etsy, ecc.)"
                  value={formData.download_link}
                  onChange={(e) => setFormData({ ...formData, download_link: e.target.value })}
                  className="input-field"
                  required
                />
              )}
              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-primary flex items-center gap-2 disabled:opacity-50 text-sm"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Salvataggio...
                    </>
                  ) : (
                    editingId ? 'Aggiorna' : 'Salva'
                  )}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="btn-secondary text-sm"
                >
                  Annulla
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="card overflow-hidden">
                <div className="aspect-[4/3] skeleton rounded-none" />
                <div className="p-5 space-y-3">
                  <div className="h-5 skeleton w-3/4" />
                  <div className="h-4 skeleton w-full" />
                  <div className="h-4 skeleton w-2/3" />
                </div>
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="card p-12 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-pastel-lavender/50 flex items-center justify-center">
              <BookOpen className="w-8 h-8 text-pastel-lavender-dark/50" />
            </div>
            <p className="font-body text-gray-500 text-lg">
              Nessun prodotto. Aggiungi il primo!
            </p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="card group"
              >
                <div className="aspect-[4/3] bg-gradient-to-br from-pastel-pink to-pastel-lavender flex items-center justify-center relative">
                  {product.cover_image ? (
                    <img
                      src={product.cover_image}
                      alt={product.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <span className="text-4xl">{product.type === 'app' ? '🎮' : '📚'}</span>
                  )}
                  <div className="absolute top-3 left-3">
                    <span className={`badge text-xs ${product.type === 'app' ? 'badge-lavender' : 'badge-pink'}`}>
                      {product.type === 'app' ? '🎮 App' : '🔗 Link'}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => handleEdit(product)}
                      className="p-2 bg-white/90 rounded-lg shadow hover:bg-pastel-lavender transition-colors"
                    >
                      <Edit2 className="w-4 h-4 text-gray-600" />
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="p-2 bg-white/90 rounded-lg shadow hover:bg-red-50 transition-colors"
                    >
                      <Trash2 className="w-4 h-4 text-red-400" />
                    </button>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-display font-bold text-lg text-gray-800 mb-1">
                    {product.title}
                  </h3>
                  <p className="font-body text-gray-500 text-sm line-clamp-2 mb-3">
                    {product.description}
                  </p>
                  {product.type === 'link' ? (
                    <a
                      href={product.download_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-pastel-pink-dark font-body text-sm font-medium hover:underline"
                    >
                      Apri link &rarr;
                    </a>
                  ) : (
                    <span className="text-pastel-lavender-dark font-body text-sm font-medium">
                      App interattiva - ID: {product.id.substring(0, 8)}...
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
