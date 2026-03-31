import { useState, useEffect } from 'react'
import { supabase } from '../utils/supabase'
import ProductCard from '../components/ProductCard'
import { BookOpen, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Portfolio() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProducts() {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false })

      if (!error && data) setProducts(data)
      setLoading(false)
    }
    fetchProducts()
  }, [])

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <span className="badge badge-lavender mb-4 inline-flex">
            <Sparkles className="w-3.5 h-3.5" />
            I miei prodotti
          </span>
          <h1 className="section-title">Il mio Portfolio</h1>
          <p className="section-subtitle">
            Scopri tutti i contenuti digitali che ho creato per i più piccoli
          </p>
        </motion.div>

        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="card overflow-hidden">
                <div className="aspect-[4/3] skeleton rounded-none" />
                <div className="p-6 space-y-3">
                  <div className="h-6 skeleton w-3/4" />
                  <div className="h-4 skeleton w-full" />
                  <div className="h-4 skeleton w-2/3" />
                </div>
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="card-glass p-16 text-center"
          >
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-pastel-lavender/50 flex items-center justify-center">
              <BookOpen className="w-10 h-10 text-pastel-lavender-dark/50" />
            </div>
            <h3 className="font-display text-xl font-bold text-gray-800 mb-2">
              Presto disponibili!
            </h3>
            <p className="font-body text-gray-500">
              Sto preparando nuovi contenuti magici per i tuoi piccoli
            </p>
          </motion.div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
