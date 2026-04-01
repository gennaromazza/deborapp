import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Check, Sparkles, ArrowRight, Coffee, Croissant, UtensilsCrossed, CakeSlice } from 'lucide-react'
import { supabase } from '../utils/supabase'

const iconMap = {
  'coffee': Coffee,
  'coffee-croissant': Coffee,
  'full-breakfast': UtensilsCrossed,
  'snack': CakeSlice,
}

const gradientMap = {
  'un-caffe': 'from-pastel-peach to-pastel-yellow',
  'caffe-cornetto': 'from-pastel-pink to-pastel-lavender',
  'colazione-completa': 'from-pastel-lavender to-pastel-sky',
  'la-merenda': 'from-pastel-mint to-pastel-lavender',
}

const fallbackTiers = [
  {
    tier_key: 'un-caffe',
    display_name: 'Un Caffè',
    subtitle: 'Per iniziare',
    description: 'Scegli un\'attività e portala a casa. Un momento speciale, tutto vostro.',
    price_display: '3,90',
    product_count: 1,
    features: ['1 attività a scelta', 'Accesso immediato', 'Stampa o usa online', 'Perfetto per provare'],
    is_recommended: false,
    icon: 'coffee',
    stripe_payment_link: null,
  },
  {
    tier_key: 'caffe-cornetto',
    display_name: 'Caffè & Cornetto',
    subtitle: 'Il più scelto',
    description: 'Due attività da vivere insieme. Più scelta, più sorrisi, più tempo di qualità.',
    price_display: '6,90',
    product_count: 2,
    features: ['2 attività a scelta', 'Accesso immediato', 'Stampa o usa online', 'Risparmi rispetto al singolo', 'Il preferito dai genitori'],
    is_recommended: true,
    icon: 'coffee-croissant',
    stripe_payment_link: null,
  },
  {
    tier_key: 'colazione-completa',
    display_name: 'Colazione Completa',
    subtitle: 'Per famiglie curiose',
    description: 'Quattro attività per una settimana di scoperte. Il kit perfetto per il tempo insieme.',
    price_display: '12,90',
    product_count: 4,
    features: ['4 attività a scelta', 'Accesso immediato', 'Stampa o usa online', 'Mix interattivo + stampabile', 'Ideale per il weekend'],
    is_recommended: false,
    icon: 'full-breakfast',
    stripe_payment_link: null,
  },
  {
    tier_key: 'la-merenda',
    display_name: 'La Merenda',
    subtitle: 'Il pacchetto completo',
    description: 'Tutto il catalogo a disposizione. Per chi vuole il massimo della creatività.',
    price_display: '24,90',
    product_count: 999,
    features: ['Tutte le attività', 'Accesso immediato', 'Stampa o usa online', 'Anteprime esclusive', 'Aggiornamenti futuri inclusi'],
    is_recommended: false,
    icon: 'snack',
    stripe_payment_link: null,
  },
]

export default function PricingTiers() {
  const [tiers, setTiers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchTiers() {
      try {
        const { data, error } = await supabase
          .from('pricing_tiers')
          .select('*')
          .eq('is_active', true)
          .order('sort_order', { ascending: true })

        if (!error && data && data.length > 0) {
          setTiers(data)
        } else {
          setTiers(fallbackTiers)
        }
      } catch {
        setTiers(fallbackTiers)
      } finally {
        setLoading(false)
      }
    }
    fetchTiers()
  }, [])

  if (loading) {
    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="card p-6">
            <div className="h-12 w-12 rounded-2xl skeleton mb-4" />
            <div className="h-6 skeleton w-3/4 mb-2" />
            <div className="h-4 skeleton w-1/2 mb-4" />
            <div className="space-y-2">
              <div className="h-4 skeleton w-full" />
              <div className="h-4 skeleton w-5/6" />
              <div className="h-4 skeleton w-2/3" />
            </div>
            <div className="h-12 skeleton w-full mt-6" />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {tiers.map((tier, index) => {
        const Icon = iconMap[tier.icon] || Coffee
        const gradient = gradientMap[tier.tier_key] || 'from-pastel-pink to-pastel-lavender'
        const isRecommended = tier.is_recommended

        return (
          <motion.div
            key={tier.tier_key}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`relative card overflow-hidden ${isRecommended ? 'ring-2 ring-pastel-pink-dark shadow-lg' : ''}`}
          >
            {isRecommended && (
              <div className="absolute -top-0 left-0 right-0 bg-gradient-to-r from-pastel-pink-dark to-pastel-lavender-dark text-white text-center py-1.5 text-xs font-display font-bold tracking-wide">
                Il più scelto
              </div>
            )}

            <div className={`p-6 ${isRecommended ? 'pt-10' : ''}`}>
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-4 shadow-md`}>
                <Icon className="w-6 h-6 text-white" />
              </div>

              <h3 className="font-display font-bold text-xl text-gray-800 mb-1">
                {tier.display_name}
              </h3>

              {tier.subtitle && (
                <p className="font-body text-sm text-pastel-pink-dark font-medium mb-3">
                  {tier.subtitle}
                </p>
              )}

              <p className="font-body text-sm text-gray-500 leading-relaxed mb-4">
                {tier.description}
              </p>

              <div className="flex items-baseline gap-1 mb-5">
                <span className="font-display text-3xl font-extrabold text-gray-800">
                  {tier.price_display}
                </span>
                <span className="font-body text-gray-400 text-sm">€</span>
              </div>

              <ul className="space-y-2.5 mb-6">
                {tier.features.map((feature, fi) => (
                  <li key={fi} className="flex items-start gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-pastel-mint flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-pastel-mint-dark" />
                    </div>
                    <span className="font-body text-sm text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>

              {tier.stripe_payment_link ? (
                <a
                  href={tier.stripe_payment_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full flex items-center justify-center gap-2 py-3 rounded-2xl font-display font-semibold text-sm transition-all duration-300 ${
                    isRecommended
                      ? 'bg-gradient-to-r from-pastel-pink-dark to-pastel-lavender-dark text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5'
                      : 'bg-pastel-cream text-gray-700 hover:bg-pastel-pink hover:text-pastel-pink-dark'
                  }`}
                >
                  <Sparkles className="w-4 h-4" />
                  Sblocca
                  <ArrowRight className="w-4 h-4" />
                </a>
              ) : (
                <Link
                  to={`/acquista?tier=${tier.tier_key}`}
                  className={`w-full flex items-center justify-center gap-2 py-3 rounded-2xl font-display font-semibold text-sm transition-all duration-300 ${
                    isRecommended
                      ? 'bg-gradient-to-r from-pastel-pink-dark to-pastel-lavender-dark text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5'
                      : 'bg-pastel-cream text-gray-700 hover:bg-pastel-pink hover:text-pastel-pink-dark'
                  }`}
                >
                  <Sparkles className="w-4 h-4" />
                  Sblocca
                  <ArrowRight className="w-4 h-4" />
                </Link>
              )}
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}
