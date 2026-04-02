import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase } from '../../utils/supabase'
import LibroMatematicaVolume1 from './libro-matematica-volume-1'
import MagicBackpackRainbowWorld from './magic-backpack-rainbow-world'

const productComponents = {
  'libro-matematica-volume-1': LibroMatematicaVolume1,
  'magic-backpack-rainbow-world': MagicBackpackRainbowWorld,
}

const TIMEOUT_MS = 10000

export default function ProductRouter() {
  const { productId, chapterId } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [ProductComponent, setProductComponent] = useState(null)
  const [isFree, setIsFree] = useState(false)
  const [error, setError] = useState(null)
  const timeoutRef = useRef(null)

  useEffect(() => {
    let isMounted = true

    async function fetchAndRoute() {
      if (!productId) {
        if (isMounted) {
          navigate('/', { replace: true })
        }
        return
      }

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }

      timeoutRef.current = setTimeout(() => {
        if (isMounted) {
          console.error('ProductRouter: timeout raggiunto per productId:', productId)
          setError('timeout')
          setLoading(false)
        }
      }, TIMEOUT_MS)

      try {
        console.log('ProductRouter: fetching product', productId)
        
        const { data: product, error: fetchError } = await supabase
          .from('products')
          .select('*')
          .eq('id', productId)
          .single()

        if (!isMounted) return

        if (fetchError) {
          console.error('ProductRouter: errore fetch', fetchError)
          setError(fetchError.message)
          setLoading(false)
          return
        }

        console.log('ProductRouter: product trovato', product)

        if (!product) {
          console.log('ProductRouter: prodotto non trovato')
          setLoading(false)
          return
        }

        const now = new Date().toISOString()
        const productIsFree = product.is_free && (!product.free_until || product.free_until > now)
        setIsFree(productIsFree)
        console.log('ProductRouter: isFree', productIsFree)

        if (!productIsFree) {
          const purchasedProducts = JSON.parse(sessionStorage.getItem('purchasedProducts') || '[]')
          console.log('ProductRouter: purchasedProducts', purchasedProducts)
          if (!purchasedProducts.includes(product.id)) {
            console.log('ProductRouter: redirect a /accesso-pin')
            navigate('/accesso-pin', { replace: true })
            return
          }
        }

        const slug = product.slug || 'libro-matematica-volume-1'
        console.log('ProductRouter: slug', slug)
        const Component = productComponents[slug]

        if (Component) {
          setProductComponent(() => Component)
          console.log('ProductRouter: componente impostato')
        } else {
          console.log('ProductRouter: componente non trovato per slug', slug)
        }
        
        setLoading(false)
      } catch (err) {
        if (isMounted) {
          console.error('ProductRouter: errore imprevisto', err)
          setError(err.message)
          setLoading(false)
        }
      } finally {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current)
          timeoutRef.current = null
        }
      }
    }

    fetchAndRoute()

    return () => {
      isMounted = false
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [productId, navigate])

  if (loading) {
    return (
      <div className="min-h-screen bg-pastel-cream flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-pastel-pink-dark border-t-transparent mb-4" />
        <p className="text-gray-500 text-sm">Caricamento in corso...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-pastel-cream flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="font-display text-2xl font-bold text-gray-800 mb-2">Errore di caricamento</h2>
          <p className="font-body text-gray-500 mb-2">
            {error === 'timeout' 
              ? 'Il server non risponde. Controlla la tua connessione.'
              : `Si è verificato un errore: ${error}`}
          </p>
          <p className="font-body text-gray-400 text-sm mb-4">
            Product ID: {productId}
          </p>
          <button 
            onClick={() => window.location.reload()} 
            className="btn-primary mr-2"
          >
            Riprova
          </button>
          <button onClick={() => navigate('/')} className="btn-secondary">
            Torna alla Home
          </button>
        </div>
      </div>
    )
  }

  if (!ProductComponent) {
    return (
      <div className="min-h-screen bg-pastel-cream flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h2 className="font-display text-2xl font-bold text-gray-800 mb-2">Prodotto non trovato</h2>
          <p className="font-body text-gray-500 mb-2">
            Il prodotto "{productId}" non è stato configurato nel sistema.
          </p>
          <p className="font-body text-gray-400 text-sm mb-4">
            Verifica che il prodotto esista nel database con lo slug corretto.
          </p>
          <button onClick={() => navigate('/')} className="btn-primary">
            Torna alla Home
          </button>
        </div>
      </div>
    )
  }

  return <ProductComponent productId={productId} chapterId={chapterId} isFree={isFree} />
}
