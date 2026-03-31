import { motion } from 'framer-motion'
import { BookOpen, ArrowUpRight } from 'lucide-react'

export default function ProductCard({ product, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="card group cursor-pointer"
    >
      <div className="aspect-[4/3] bg-gradient-to-br from-pastel-pink to-pastel-lavender relative overflow-hidden">
        {product.cover_image ? (
          <img
            src={product.cover_image}
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <BookOpen className="w-16 h-16 text-pastel-lavender-dark/50 group-hover:scale-110 transition-transform duration-300" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
          <div className="w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center shadow-lg">
            <ArrowUpRight className="w-5 h-5 text-pastel-pink-dark" />
          </div>
        </div>
      </div>
      <div className="p-6">
        <h3 className="font-display font-bold text-xl text-gray-800 mb-2 group-hover:text-pastel-pink-dark transition-colors">
          {product.title}
        </h3>
        <p className="font-body text-gray-500 line-clamp-3 leading-relaxed">
          {product.description}
        </p>
      </div>
    </motion.div>
  )
}
