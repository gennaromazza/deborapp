import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Plus, Loader2, Trash2, Edit2, Sparkles, BookOpen, Globe, Gamepad2, Upload, X, CheckCircle, AlertCircle, Image as ImageIcon } from 'lucide-react'
import toast from 'react-hot-toast'
import { supabase, supabaseUrl } from '../../utils/supabase'
import { processImage, formatFileSize } from '../../utils/imageProcessor'

const MAX_IMAGES = 10;

export default function AdminProducts() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    cover_image: '',
    cover_images: [],
    download_link: '',
    type: 'link',
  })
  const [submitting, setSubmitting] = useState(false)
  const [imageQueue, setImageQueue] = useState([])
  const fileInputRef = useRef(null)

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
    setFormData({ title: '', description: '', cover_image: '', cover_images: [], download_link: '', type: 'link' })
    setImageQueue([])
    setEditingId(null)
    setShowForm(false)
  }

  const handleFileSelect = async (e) => {
    const files = Array.from(e.target.files)
    const remaining = MAX_IMAGES - formData.cover_images.length - imageQueue.length

    if (remaining <= 0) {
      toast.error(`Massimo ${MAX_IMAGES} immagini per prodotto`)
      return
    }

    const filesToProcess = files.slice(0, remaining)

    if (files.length > remaining) {
      toast.error(`Aggiunte solo ${remaining} immagini (limite: ${MAX_IMAGES})`)
    }

    for (const file of filesToProcess) {
      if (!file.type.startsWith('image/')) {
        toast.error(`${file.name} non è un'immagine valida`)
        continue
      }

      const queueItem = {
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        file,
        fileName: file.name,
        originalSize: file.size,
        status: 'processing',
        progress: 0,
        message: 'Elaborazione...',
        previewUrl: URL.createObjectURL(file),
        result: null,
      }

      setImageQueue(prev => [...prev, queueItem])

      try {
        const result = await processImage(file, (progress, message) => {
          setImageQueue(prev =>
            prev.map(item =>
              item.id === queueItem.id
                ? { ...item, progress, message }
                : item
            )
          )
        })

        setImageQueue(prev =>
          prev.map(item =>
            item.id === queueItem.id
              ? { ...item, status: 'done', progress: 100, message: 'Pronta per l\'upload', result }
              : item
          )
        )
      } catch (err) {
        setImageQueue(prev =>
          prev.map(item =>
            item.id === queueItem.id
              ? { ...item, status: 'error', message: err.message }
              : item
          )
        )
        toast.error(`Errore elaborazione ${file.name}`)
      }
    }

    e.target.value = ''
  }

  const removeImageFromQueue = (id) => {
    setImageQueue(prev => {
      const item = prev.find(i => i.id === id)
      if (item?.previewUrl) URL.revokeObjectURL(item.previewUrl)
      return prev.filter(i => i.id !== id)
    })
  }

  const removeExistingImage = (index) => {
    setFormData(prev => ({
      ...prev,
      cover_images: prev.cover_images.filter((_, i) => i !== index)
    }))
  }

  const uploadImages = async () => {
    const readyItems = imageQueue.filter(item => item.status === 'done' && item.result)
    const uploadedUrls = []

    for (const item of readyItems) {
      setImageQueue(prev =>
        prev.map(i =>
          i.id === item.id
            ? { ...i, status: 'uploading', progress: 0, message: 'Upload in corso...' }
            : i
        )
      )

      try {
        const fileExt = 'jpg'
        const fileName = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}.${fileExt}`
        const filePath = `products/${fileName}`

        const { error: uploadError } = await supabase.storage
          .from('DigitalProduct')
          .upload(filePath, item.result.blob, {
            contentType: 'image/jpeg',
            cacheControl: '3600',
          })

        if (uploadError) throw uploadError

        const { data: urlData } = supabase.storage
          .from('DigitalProduct')
          .getPublicUrl(filePath)

        const publicUrl = urlData.publicUrl
        uploadedUrls.push(publicUrl)

        setImageQueue(prev =>
          prev.map(i =>
            i.id === item.id
              ? { ...i, status: 'uploaded', progress: 100, message: 'Upload completato' }
              : i
          )
        )
      } catch (err) {
        setImageQueue(prev =>
          prev.map(i =>
            i.id === item.id
              ? { ...i, status: 'error', message: 'Errore upload: ' + err.message }
              : i
          )
        )
        toast.error(`Errore upload ${item.fileName}`)
      }
    }

    return uploadedUrls
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)

      try {
        const uploadedUrls = await uploadImages()

        console.log('URLs caricate:', uploadedUrls)

        const newCoverImages = [
          ...formData.cover_images,
          ...uploadedUrls
        ]

        const dataToSave = {
          title: formData.title,
          description: formData.description,
          cover_image: newCoverImages[0] || formData.cover_image || '',
          cover_images: newCoverImages,
          download_link: formData.download_link,
          type: formData.type,
        }

        console.log('Dati da salvare:', dataToSave)

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

      if (error) throw error

      toast.success(editingId ? 'Prodotto aggiornato!' : 'Prodotto aggiunto!')
      resetForm()
      fetchProducts()
    } catch (err) {
      toast.error('Errore durante il salvataggio: ' + err.message)
    } finally {
      setSubmitting(false)
    }
  }

  const handleEdit = (product) => {
    setFormData({
      title: product.title,
      description: product.description,
      cover_image: product.cover_image || '',
      cover_images: product.cover_images || [],
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

  const allDone = imageQueue.every(item => item.status === 'done' || item.status === 'uploaded' || item.status === 'error')
  const hasReadyImages = imageQueue.some(item => item.status === 'done')

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
                <div>
                  <label className="block font-body font-medium text-gray-600 mb-2">
                    Immagini copertina (max {MAX_IMAGES})
                  </label>
                  <div
                    className="border-2 border-dashed border-pastel-lavender rounded-xl p-6 text-center cursor-pointer hover:border-pastel-pink-dark transition-colors"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleFileSelect}
                      className="hidden"
                    />
                    <Upload className="w-8 h-8 mx-auto mb-2 text-pastel-lavender-dark" />
                    <p className="font-body text-sm text-gray-600">
                      Clicca per selezionare le immagini
                    </p>
                    <p className="font-body text-xs text-gray-400 mt-1">
                      JPG, PNG, WebP - Max {MAX_IMAGES} immagini
                    </p>
                    <p className="font-body text-xs text-gray-400">
                      Ridimensionamento automatico a 1080px, max 1MB
                    </p>
                  </div>
                </div>
              </div>

              <AnimatePresence>
                {(formData.cover_images.length > 0 || imageQueue.length > 0) && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-3"
                  >
                    <h3 className="font-display font-semibold text-gray-700 flex items-center gap-2">
                      <ImageIcon className="w-4 h-4" />
                      Immagini ({formData.cover_images.length + imageQueue.length}/{MAX_IMAGES})
                    </h3>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                      {formData.cover_images.map((url, index) => (
                        <div key={index} className="relative group rounded-lg overflow-hidden border border-gray-200">
                          <img
                            src={url}
                            alt={`Copertina ${index + 1}`}
                            className="w-full aspect-square object-cover"
                          />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <button
                              type="button"
                              onClick={() => removeExistingImage(index)}
                              className="p-1.5 bg-red-500 rounded-full text-white hover:bg-red-600"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                          <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-xs py-1 px-2 text-center">
                            Esistente
                          </div>
                        </div>
                      ))}

                      {imageQueue.map((item) => (
                        <div key={item.id} className="relative rounded-lg overflow-hidden border border-gray-200 bg-gray-50">
                          <div className="aspect-square relative">
                            <img
                              src={item.previewUrl}
                              alt={item.fileName}
                              className="w-full h-full object-cover"
                            />

                            {item.status === 'processing' && (
                              <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white">
                                <Loader2 className="w-6 h-6 animate-spin mb-2" />
                                <span className="text-xs">{item.message}</span>
                              </div>
                            )}

                            {item.status === 'uploading' && (
                              <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white">
                                <Loader2 className="w-6 h-6 animate-spin mb-2" />
                                <span className="text-xs">{item.message}</span>
                              </div>
                            )}

                            {item.status === 'done' && (
                              <div className="absolute top-2 right-2">
                                <CheckCircle className="w-5 h-5 text-green-500" />
                              </div>
                            )}

                            {item.status === 'uploaded' && (
                              <div className="absolute top-2 right-2">
                                <CheckCircle className="w-5 h-5 text-green-500" />
                              </div>
                            )}

                            {item.status === 'error' && (
                              <div className="absolute inset-0 bg-red-500/50 flex flex-col items-center justify-center text-white">
                                <AlertCircle className="w-6 h-6 mb-2" />
                                <span className="text-xs text-center px-2">{item.message}</span>
                              </div>
                            )}
                          </div>

                          {item.result && (
                            <div className="p-2 text-xs text-gray-600 space-y-1">
                              <div className="flex justify-between">
                                <span>Originale:</span>
                                <span className="font-medium">{formatFileSize(item.originalSize)}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Ottimizzata:</span>
                                <span className="font-medium">{formatFileSize(item.result.size)}</span>
                              </div>
                              <div className="flex justify-between text-green-600">
                                <span>Riduzione:</span>
                                <span className="font-medium">-{item.result.compressionRatio}%</span>
                              </div>
                              <div className="text-gray-400">
                                {item.result.width}x{item.result.height}px
                              </div>
                            </div>
                          )}

                          <div className="h-1 bg-gray-200">
                            <div
                              className={`h-full transition-all duration-300 ${
                                item.status === 'error' ? 'bg-red-500' :
                                item.status === 'uploaded' ? 'bg-green-500' :
                                'bg-pastel-pink-dark'
                              }`}
                              style={{ width: `${item.progress}%` }}
                            />
                          </div>

                          <button
                            type="button"
                            onClick={() => removeImageFromQueue(item.id)}
                            className="absolute top-2 left-2 p-1 bg-white/90 rounded-full hover:bg-red-50 transition-colors"
                          >
                            <X className="w-3 h-3 text-gray-600" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

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
                    <>
                      {hasReadyImages && <Upload className="w-4 h-4" />}
                      {editingId ? 'Aggiorna' : 'Salva'}
                    </>
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
                  {product.cover_images?.length > 1 && (
                    <div className="absolute bottom-3 right-3 bg-black/60 text-white text-xs px-2 py-1 rounded-full">
                      {product.cover_images.length} foto
                    </div>
                  )}
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
                     <>
                       <a
                         href={product.download_link}
                         target="_blank"
                         rel="noopener noreferrer"
                         className="text-pastel-pink-dark font-body text-sm font-medium hover:underline"
                       >
                         Apri link &rarr;
                       </a>
                       <Link
                         to={`/prodotto/${product.id}`}
                         className="text-pastel-lavender-dark font-body text-sm font-medium hover:underline mt-1 block"
                       >
                         Visualizza prodotto
                       </Link>
                     </>
                   ) : (
                     <>
                       <span className="text-pastel-lavender-dark font-body text-sm font-medium">
                         App interattiva - ID: {product.id}
                       </span>
                       <Link
                         to={`/prodotto/${product.id}`}
                         className="text-pastel-lavender-dark font-body text-sm font-medium hover:underline mt-1 block"
                       >
                         Visualizza prodotto
                       </Link>
                     </>
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
