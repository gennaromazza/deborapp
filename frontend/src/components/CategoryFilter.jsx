import { motion } from 'framer-motion'
import { PRODUCT_CATEGORY_FILTERS } from '../constants/productCategories'

export default function CategoryFilter({ active, onChange, counts }) {
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {PRODUCT_CATEGORY_FILTERS.map((category) => {
        const isActive = active === category.key
        const count = counts?.[category.key]

        return (
          <motion.button
            key={category.key}
            whileTap={{ scale: 0.95 }}
            onClick={() => onChange(category.key)}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl font-body font-medium text-sm transition-all duration-300 ${
              isActive
                ? 'bg-gradient-to-r from-pastel-pink-dark to-pastel-lavender-dark text-white shadow-md'
                : 'bg-white text-gray-500 border border-pastel-lavender/50 hover:border-pastel-pink-dark/30 hover:text-gray-700'
            }`}
          >
            {category.label}
            {count !== undefined && (
              <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                isActive ? 'bg-white/20' : 'bg-pastel-lavender/50 text-gray-400'
              }`}>
                {count}
              </span>
            )}
          </motion.button>
        )
      })}
    </div>
  )
}
