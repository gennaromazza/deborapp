import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase } from '../../utils/supabase'
import LibroMatematicaVolume1 from './libro-matematica-volume-1'

const productComponents = {
  'libro-matematica-volume-1': LibroMatematicaVolume1,
}

export default function ProductRouter() {
  const { productId, chapterId } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [ProductComponent, setProductComponent] = useState(null)

  useEffect(() => {
    async function fetchAndRoute() {
      if (!productId) {
        navigate('/', { replace: true })
        return
      }

      const { data: product } = await supabase
        .from('products')
        .select('*')
        .eq('id', productId)
        .single()

      if (!product) {
        setLoading(false)
        return
      }

      const slug = product.slug || 'libro-matematica-volume-1'
      const Component = productComponents[slug]

      if (Component) {
        setProductComponent(() => Component)
      }
      
      setLoading(false)
    }

    fetchAndRoute()
  }, [productId, navigate])

  if (loading) {
    return (
      <div className="min-h-screen bg-pastel-cream flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-pastel-pink-dark border-t-transparent" />
      </div>
    )
  }

  if (!ProductComponent) {
    return (
      <div className="min-h-screen bg-pastel-cream flex items-center justify-center">
        <div className="text-center">
          <h2 className="font-display text-2xl font-bold text-gray-800 mb-2">Prodotto non trovato</h2>
          <p className="font-body text-gray-500 mb-4">
            Il prodotto "{productId}" non è stato configurato nel sistema.
          </p>
          <button onClick={() => navigate('/')} className="btn-primary">
            Torna alla Home
          </button>
        </div>
      </div>
    )
  }

  return <ProductComponent productId={productId} chapterId={chapterId} />
}
