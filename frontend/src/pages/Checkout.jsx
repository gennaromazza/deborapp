import { useState, useEffect } from 'react'
import { Link, useSearchParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Check, ShoppingBag, Loader2, Sparkles, ArrowRight, BookOpen, Printer, Monitor, Users, Info, AlertCircle, ExternalLink } from 'lucide-react'
import toast from 'react-hot-toast'
import { supabase } from '../utils/supabase'
import PageTransition from '../components/PageTransition'
import Breadcrumb from '../components/Breadcrumb'
import { getProductCategory } from '../constants/productCategories'

const tierInfo = {
  'un-caffe': { name: 'Un Caffè', maxProducts: 1, price: '3,90', emoji: '☕', stripeLink: 'https://buy.stripe.com/7sYbJ2fawcnhfQcatGgbm02' },
  'caffe-cornetto': { name: 'Caffè & Cornetto', maxProducts: 2, price: '6,90', emoji: '☕🥐', stripeLink: 'https://buy.stripe.com/eVqfZi7I472X7jG0T6gbm01' },
  'colazione-completa': { name: 'Colazione Completa', maxProducts: 4, price: '12,90', emoji: '☕🥐🧃', stripeLink: 'https://buy.stripe.com/28EfZi2nKbjdcE0eJWgbm03' },
  'la-merenda': { name: 'La Merenda', maxProducts: 999, price: '24,90', emoji: '☕🥐🧃🍰', stripeLink: 'https://buy.stripe.com/8x2dRageA2MHbzWcBOgbm04' },
}

const categoryIcons = {
  monitor: Monitor,
  printer: Printer,
  book: BookOpen,
  users: Users,
}

export default function Checkout() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const tierKey = searchParams.get('tier')
  const tier = tierKey ? tierInfo[tierKey] : null

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedIds, setSelectedIds] = useState([])
  const [formData, setFormData] = useState({ first_name: '', last_name: '', email: '' })
  const [submitting, setSubmitting] = useState(false)
  const [step, setStep] = useState(1)

  useEffect(() => {
    if (!tier) {
      navigate('/attivita')
      return
    }

    document.title = `Scegli le tue attività - ${tier.name} | Debora di Bellucci`

    async function fetchProducts() {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false })

      if (!error && data) {
        const paidProducts = data.filter(p => !p.is_free || (p.free_until && p.free_until <= new Date().toISOString()))
        setProducts(paidProducts)
      }
      setLoading(false)
    }
    fetchProducts()
  }, [tier, navigate])

  const maxProducts = tier?.maxProducts || 1
  const isAllProducts = tierKey === 'la-merenda'

  const toggleProduct = (id) => {
    setSelectedIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((pid) => pid !== id)
      }
      if (prev.length >= maxProducts && !isAllProducts) {
        toast.error(`Puoi selezionare al massimo ${maxProducts} attività`)
        return prev
      }
      return [...prev, id]
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (selectedIds.length === 0) {
      toast.error('Seleziona almeno un\'attività')
      return
    }
    setSubmitting(true)

    const { error } = await supabase
      .from('orders')
      .insert([{
        first_name: formData.first_name.trim(),
        last_name: formData.last_name.trim(),
        email: formData.email.trim().toLowerCase(),
        tier_key: tierKey,
        selected_product_ids: selectedIds,
        status: 'pending',
      }])

    if (error) {
      toast.error('Errore durante l\'invio dell\'ordine. Riprova.')
      setSubmitting(false)
    } else {
      toast.success('Ordine inviato! Verrai reindirizzato al pagamento...')
      setStep(3)
    }
  }

  const handleStripePayment = () => {
    window.open(tier.stripeLink, '_blank')
    navigate(`/grazie?tier=${tierKey}`)
  }

  if (!tier) return null

  return (
    <PageTransition>
      <section className="py-16 bg-mesh">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <Breadcrumb />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-pastel-pink/30 via-pastel-lavender/30 to-pastel-sky/30 px-4 py-2 rounded-full mb-4">
              <span className="text-xl">{tier.emoji}</span>
              <span className="font-body text-sm font-medium text-gray-700">{tier.name} — €{tier.price}</span>
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-extrabold text-gray-800 mb-3">
              Scegli le tue attività
            </h1>
            <p className="font-body text-gray-500 text-lg max-w-xl mx-auto">
              {isAllProducts
                ? 'Hai scelto tutto il catalogo! Seleziona le attività che ti incuriosiscono di più.'
                : `Seleziona ${maxProducts === 1 ? "l'attività" : `${maxProducts} attività`} che preferisci.`}
            </p>
          </motion.div>

          {step === 3 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="card p-10 text-center max-w-md mx-auto"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center"
              >
                <Check className="w-10 h-10 text-white" />
              </motion.div>
              <h2 className="font-display text-2xl font-bold text-gray-800 mb-3">
                Ordine registrato!
              </h2>
              <p className="font-body text-gray-500 mb-6">
                Il tuo ordine è stato salvato. Completa il pagamento per ricevere il PIN via email.
              </p>
              <button
                onClick={handleStripePayment}
                className="btn-primary inline-flex items-center gap-2 text-base mb-4"
              >
                <ExternalLink className="w-5 h-5" />
                Paga ora con Stripe
              </button>
              <div className="flex items-center justify-center gap-2 text-sm text-gray-400 font-body">
                <Info className="w-4 h-4" />
                <span>Si aprirà Stripe in una nuova scheda</span>
              </div>
            </motion.div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                {loading ? (
                  <div className="grid sm:grid-cols-2 gap-4">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="card p-4">
                        <div className="aspect-[4/3] skeleton rounded-2xl mb-3" />
                        <div className="h-5 skeleton w-3/4 mb-2" />
                        <div className="h-4 skeleton w-full" />
                      </div>
                    ))}
                  </div>
                ) : products.length === 0 ? (
                  <div className="card p-12 text-center">
                    <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <p className="font-body text-gray-500">Nessuna attività disponibile al momento.</p>
                  </div>
                ) : (
                  <div className="grid sm:grid-cols-2 gap-4">
                    {products.map((product) => {
                      const isSelected = selectedIds.includes(product.id)
                      const category = getProductCategory(product.category)
                      const CatIcon = categoryIcons[category.iconKey] || BookOpen
                      const canSelect = selectedIds.length < maxProducts || isSelected || isAllProducts

                      return (
                        <motion.div
                          key={product.id}
                          whileHover={{ y: -4 }}
                          onClick={() => canSelect && toggleProduct(product.id)}
                          className={`card cursor-pointer transition-all duration-200 border-2 ${
                            isSelected
                              ? 'border-pastel-pink-dark shadow-lg bg-pastel-pink/10'
                              : canSelect
                                ? 'border-transparent hover:border-pastel-lavender'
                                : 'border-transparent opacity-50 cursor-not-allowed'
                          }`}
                        >
                          <div className="aspect-[4/3] bg-gradient-to-br from-pastel-pink/20 to-pastel-lavender/20 relative rounded-t-2xl overflow-hidden">
                            {product.cover_image ? (
                              <img
                                src={product.cover_image}
                                alt={product.title}
                                className="w-full h-full object-cover"
                                loading="lazy"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <CatIcon className="w-12 h-12 text-pastel-lavender-dark/40" />
                              </div>
                            )}
                            {isSelected && (
                              <div className="absolute top-3 right-3 w-8 h-8 bg-pastel-pink-dark rounded-full flex items-center justify-center shadow-md">
                                <Check className="w-5 h-5 text-white" />
                              </div>
                            )}
                            <div className="absolute bottom-3 left-3">
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-body font-medium bg-white/90 backdrop-blur text-gray-600">
                                <CatIcon className="w-3 h-3" />
                                {category.label}
                              </span>
                            </div>
                          </div>
                          <div className="p-4">
                            <h3 className="font-display font-bold text-base text-gray-800 mb-1">
                              {product.title}
                            </h3>
                            <p className="font-body text-sm text-gray-500 line-clamp-2">
                              {product.description}
                            </p>
                          </div>
                        </motion.div>
                      )
                    })}
                  </div>
                )}
              </div>

              <div className="lg:col-span-1">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="sticky top-24"
                >
                  <div className="card p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <ShoppingBag className="w-5 h-5 text-pastel-pink-dark" />
                      <h2 className="font-display font-bold text-lg text-gray-800">
                        Il tuo ordine
                      </h2>
                    </div>

                    <div className="bg-pastel-cream rounded-xl p-4 mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-body text-sm text-gray-600">{tier.emoji} {tier.name}</span>
                        <span className="font-display font-bold text-gray-800">€{tier.price}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-body text-sm text-gray-500">
                          Attività selezionate
                        </span>
                        <span className={`font-display font-bold text-sm ${
                          selectedIds.length >= maxProducts && !isAllProducts
                            ? 'text-pastel-mint-dark'
                            : 'text-gray-600'
                        }`}>
                          {selectedIds.length}{isAllProducts ? '' : `/${maxProducts}`}
                        </span>
                      </div>
                      {!isAllProducts && selectedIds.length < maxProducts && (
                        <div className="flex items-center gap-1.5 mt-2 text-xs text-amber-600">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>Seleziona ancora {maxProducts - selectedIds.length}</span>
                        </div>
                      )}
                    </div>

                    {selectedIds.length > 0 && (
                      <div className="mb-4 space-y-2 max-h-40 overflow-y-auto">
                        {products
                          .filter((p) => selectedIds.includes(p.id))
                          .map((p) => (
                            <div key={p.id} className="flex items-center gap-2 text-sm">
                              <Check className="w-4 h-4 text-pastel-mint-dark flex-shrink-0" />
                              <span className="font-body text-gray-600 truncate">{p.title}</span>
                            </div>
                          ))}
                      </div>
                    )}

                    {step === 1 ? (
                      <button
                        onClick={() => {
                          if (selectedIds.length === 0) {
                            toast.error('Seleziona almeno un\'attività')
                            return
                          }
                          setStep(2)
                        }}
                        disabled={selectedIds.length === 0}
                        className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50 text-sm"
                      >
                        Continua
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-3">
                        <input
                          type="text"
                          placeholder="Nome"
                          value={formData.first_name}
                          onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                          className="input-field text-sm"
                          required
                        />
                        <input
                          type="text"
                          placeholder="Cognome"
                          value={formData.last_name}
                          onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                          className="input-field text-sm"
                          required
                        />
                        <input
                          type="email"
                          placeholder="Email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="input-field text-sm"
                          required
                        />
                        <div className="flex items-start gap-2 bg-pastel-lavender/30 rounded-xl p-3">
                          <Info className="w-4 h-4 text-pastel-lavender-dark flex-shrink-0 mt-0.5" />
                          <p className="font-body text-xs text-gray-500">
                            Dopo il pagamento riceverai il PIN via email entro 1 ora.
                          </p>
                        </div>
                        <button
                          type="submit"
                          disabled={submitting}
                          className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50 text-sm"
                        >
                          {submitting ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin" />
                              Salvataggio...
                            </>
                          ) : (
                            <>
                              <Sparkles className="w-4 h-4" />
                              Procedi al pagamento
                            </>
                          )}
                        </button>
                        <button
                          type="button"
                          onClick={() => setStep(1)}
                          className="w-full text-center text-sm text-gray-400 hover:text-gray-600 font-body"
                        >
                          ← Torna alla selezione
                        </button>
                      </form>
                    )}
                  </div>
                </motion.div>
              </div>
            </div>
          )}

          <div className="text-center mt-8">
            <Link to="/attivita" className="inline-flex items-center gap-2 text-gray-400 hover:text-gray-600 font-body text-sm">
              <ArrowLeft className="w-4 h-4" />
              Torna alle attività
            </Link>
          </div>
        </div>
      </section>
    </PageTransition>
  )
}
