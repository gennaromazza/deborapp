import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Save, Eye, Image, X, AlertCircle, CheckCircle, Sparkles, Loader2 } from 'lucide-react'
import { supabase } from '../../utils/supabase'
import RichTextEditor from '../../components/RichTextEditor'

export default function BlogEditor() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEdit = Boolean(id)
  
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [preview, setPreview] = useState(false)
  const [showSeo, setShowSeo] = useState(false)
  const [message, setMessage] = useState(null)
  const [uploading, setUploading] = useState(false)
  
  // AI modal
  const [showAiModal, setShowAiModal] = useState(false)
  const [aiGenerating, setAiGenerating] = useState(false)
  const [aiPrompt, setAiPrompt] = useState('')
  const [aiLength, setAiLength] = useState('medium')
  
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    featured_image: '',
    author_image: '/author_family.png',
    author_name: 'Debora di Bellucci',
    category: 'Generale',
    tags: '',
    meta_title: '',
    meta_description: '',
    is_published: false,
    is_featured: false,
    published_at: ''
  })

  useEffect(() => {
    if (isEdit) {
      fetchPost()
    }
  }, [id])

  async function fetchPost() {
    setLoading(true)
    const { data } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('id', id)
      .single()
    
    if (data) {
      setFormData({
        ...data,
        tags: data.tags?.join(', ') || ''
      })
    }
    setLoading(false)
  }

  function generateSlug(title) {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
  }

  function handleChange(e) {
    const { name, value, type, checked } = e.target
    
    if (name === 'title' && !isEdit) {
      setFormData(prev => ({
        ...prev,
        [name]: value,
        slug: generateSlug(value)
      }))
    } else if (name === 'slug') {
      setFormData(prev => ({
        ...prev,
        slug: generateSlug(value)
      }))
    } else if (type === 'checkbox') {
      setFormData(prev => ({ ...prev, [name]: checked }))
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
  }

  async function handleImageUpload(e) {
    const file = e.target.files?.[0]
    if (!file) return
    
    setUploading(true)
    try {
      const fileName = `blog/${Date.now()}-${file.name}`
      const { data, error } = await supabase.storage
        .from('blog-images')
        .upload(fileName, file)
      
      if (error) throw error
      
      const { data: { publicUrl } } = supabase.storage
        .from('blog-images')
        .getPublicUrl(fileName)
      
      setFormData(prev => ({ ...prev, featured_image: publicUrl }))
      setMessage({ type: 'success', text: 'Immagine caricata!' })
    } catch (err) {
      setMessage({ type: 'error', text: 'Errore nel caricamento' })
    }
    setUploading(false)
    setTimeout(() => setMessage(null), 3000)
  }

  async function handleAiGenerate() {
    if (!aiPrompt.trim()) {
      setMessage({ type: 'error', text: 'Inserisci un argomento per l\'IA' })
      return
    }
    
    setAiGenerating(true)
    setMessage(null)
    
    try {
      const { data, error } = await supabase.functions.invoke('generate-blog-post', {
        body: {
          title: formData.title || aiPrompt,
          category: formData.category,
          length: aiLength,
          customPrompt: aiPrompt,
        },
      })
      
      if (error) {
        setMessage({ type: 'error', text: `Errore: ${error.message || 'Errore sconosciuto'}` })
      } else if (data?.error) {
        setMessage({ type: 'error', text: data.error })
      } else if (data?.content) {
        setFormData(prev => ({
          ...prev,
          content: data.content,
          excerpt: data.excerpt || data.content.replace(/<[^>]*>/g, '').slice(0, 200),
          slug: data.slug || prev.slug,
          tags: data.tags ? data.tags.join(', ') : prev.tags,
          meta_title: data.meta_title || prev.meta_title,
          meta_description: data.meta_description || prev.meta_description,
          category: data.category || prev.category,
        }))
        setMessage({ type: 'success', text: 'Articolo generato con successo!' })
        setShowAiModal(false)
      } else {
        setMessage({ type: 'error', text: 'Risposta inaspettata dall\'IA' })
      }
    } catch (err) {
      setMessage({ type: 'error', text: `Errore di connessione: ${err.message || 'Riprova'}` })
    }
    
    setAiGenerating(false)
    setTimeout(() => setMessage(null), 8000)
  }

  async function handleSave(publish = false) {
    if (!formData.title || !formData.content) {
      setMessage({ type: 'error', text: 'Titolo e contenuto sono obbligatori' })
      return
    }
    
    setSaving(true)
    
    const postData = {
      ...formData,
      tags: formData.tags ? formData.tags.split(',').map(t => t.trim()).filter(Boolean) : [],
      meta_title: formData.meta_title || formData.title,
      meta_description: formData.meta_description || formData.excerpt?.slice(0, 160),
      published_at: publish || formData.is_published ? new Date().toISOString() : null
    }
    
    try {
      if (isEdit) {
        await supabase.from('blog_posts').update(postData).eq('id', id)
      } else {
        await supabase.from('blog_posts').insert(postData)
      }
      
      setMessage({ type: 'success', text: isEdit ? 'Articolo aggiornato!' : 'Articolo salvato!' })
      setTimeout(() => navigate('/admin/blog'), 1500)
    } catch (err) {
      setMessage({ type: 'error', text: 'Errore nel salvataggio' })
    }
    
    setSaving(false)
    setTimeout(() => setMessage(null), 3000)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-pastel-cream flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-pastel-pink-dark border-t-transparent" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-pastel-cream">
      <header className="glass sticky top-0 z-50 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/admin/blog" className="text-pastel-pink-dark hover:text-pink-600 transition-colors">
              ← Indietro
            </Link>
            <h1 className="font-display font-bold text-xl text-gray-800">
              {isEdit ? 'Modifica Articolo' : 'Nuovo Articolo'}
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPreview(!preview)}
              className="btn-secondary flex items-center gap-2"
            >
              <Eye className="w-4 h-4" />
              Preview
            </button>
            <button
              onClick={() => handleSave(false)}
              disabled={saving}
              className="btn-secondary flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              {saving ? 'Salvataggio...' : 'Salva Bozze'}
            </button>
            <button
              onClick={() => handleSave(true)}
              disabled={saving}
              className="btn-primary flex items-center gap-2"
            >
              {saving ? 'Pubblicazione...' : 'Pubblica'}
            </button>
          </div>
        </div>
      </header>

      {message && (
        <div className={`max-w-5xl mx-auto px-4 sm:px-6 py-3 ${
          message.type === 'success' ? 'bg-pastel-mint/50' : 'bg-pastel-pink/50'
        }`}>
          <div className="flex items-center gap-2">
            {message.type === 'success' 
              ? <CheckCircle className="w-5 h-5 text-pastel-mint-dark" />
              : <AlertCircle className="w-5 h-5 text-pastel-pink-dark" />
            }
            <span className="font-body text-sm">{message.text}</span>
          </div>
        </div>
      )}

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        {preview ? (
          <PreviewMode formData={formData} onClose={() => setPreview(false)} />
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Title */}
              <div className="card p-6">
                <label className="block font-display font-semibold text-gray-800 mb-2">
                  Titolo *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Titolo dell'articolo..."
                  className="input-field text-lg"
                  maxLength={100}
                />
                <div className="text-xs text-gray-400 mt-1 text-right">
                  {formData.title.length}/100
                </div>
              </div>

              {/* Slug */}
              <div className="card p-6">
                <label className="block font-display font-semibold text-gray-800 mb-2">
                  URL Slug
                </label>
                <div className="flex items-center gap-2">
                  <span className="text-gray-400 text-sm">/blog/</span>
                  <input
                    type="text"
                    name="slug"
                    value={formData.slug}
                    onChange={handleChange}
                    placeholder="slug-articolo"
                    className="input-field flex-1"
                  />
                </div>
              </div>

              {/* Excerpt */}
              <div className="card p-6">
                <label className="block font-display font-semibold text-gray-800 mb-2">
                  Riassunto (Excerpt)
                </label>
                <textarea
                  name="excerpt"
                  value={formData.excerpt}
                  onChange={handleChange}
                  placeholder="Breve descrizione per SEO e anteprima..."
                  className="input-field min-h-[80px]"
                  maxLength={300}
                />
                <div className="text-xs text-gray-400 mt-1 text-right">
                  {formData.excerpt.length}/300
                </div>
              </div>

              {/* Content - WYSIWYG Editor */}
              <div className="card p-6">
                <div className="flex items-center justify-between mb-4">
                  <label className="font-display font-semibold text-gray-800">
                    Contenuto *
                  </label>
                  <button
                    onClick={() => setShowAiModal(true)}
                    className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
                  >
                    <Sparkles className="w-4 h-4" />
                    Scrivi con IA
                  </button>
                </div>
                <RichTextEditor
                  value={formData.content}
                  onChange={(content) => setFormData(prev => ({ ...prev, content }))}
                  placeholder="Scrivi il tuo articolo qui..."
                />
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Status */}
              <div className="card p-6">
                <h3 className="font-display font-bold text-gray-800 mb-4">Pubblicazione</h3>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="is_published"
                      checked={formData.is_published}
                      onChange={handleChange}
                      className="w-5 h-5 rounded border-gray-300 text-pastel-pink-dark focus:ring-pastel-pink"
                    />
                    <span className="font-body text-gray-700">Pubblicato</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="is_featured"
                      checked={formData.is_featured}
                      onChange={handleChange}
                      className="w-5 h-5 rounded border-gray-300 text-pastel-pink-dark focus:ring-pastel-pink"
                    />
                    <span className="font-body text-gray-700">In evidenza</span>
                  </label>
                </div>
              </div>

              {/* Category & Tags */}
              <div className="card p-6">
                <h3 className="font-display font-bold text-gray-800 mb-4">Categoria & Tag</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-500 mb-1">Categoria</label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="input-field"
                    >
                      <option value="Generale">Generale</option>
                      <option value="Matematica">Matematica</option>
                      <option value="Creatività">Creatività</option>
                      <option value="Educazione">Educazione</option>
                      <option value="Famiglia">Famiglia</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-500 mb-1">Tag (separati da virgola)</label>
                    <input
                      type="text"
                      name="tags"
                      value={formData.tags}
                      onChange={handleChange}
                      placeholder="scuola, matematica, bambini"
                      className="input-field"
                    />
                  </div>
                </div>
              </div>

              {/* Featured Image */}
              <div className="card p-6">
                <h3 className="font-display font-bold text-gray-800 mb-4">Immagine</h3>
                <div className="space-y-4">
                  {formData.featured_image && (
                    <div className="relative aspect-video bg-pastel-lavender/30 rounded-lg overflow-hidden">
                      <img 
                        src={formData.featured_image} 
                        alt="Featured"
                        className="w-full h-full object-cover"
                      />
                      <button
                        onClick={() => setFormData(prev => ({ ...prev, featured_image: '' }))}
                        className="absolute top-2 right-2 p-1 bg-white rounded-full shadow"
                      >
                        <X className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>
                  )}
                  <label className="flex items-center justify-center gap-2 p-3 border-2 border-dashed border-pastel-lavender rounded-lg cursor-pointer hover:bg-pastel-lavender/20 transition-colors">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      disabled={uploading}
                    />
                    <Image className="w-5 h-5 text-pastel-lavender-dark" />
                    <span className="text-sm text-gray-600">
                      {uploading ? 'Caricamento...' : 'Carica Immagine'}
                    </span>
                  </label>
                </div>
              </div>

              {/* SEO Panel */}
              <div className="card p-6">
                <button
                  onClick={() => setShowSeo(!showSeo)}
                  className="w-full flex items-center justify-between"
                >
                  <h3 className="font-display font-bold text-gray-800">SEO</h3>
                  <span className="text-sm text-gray-400">
                    {showSeo ? '▼' : '▶'}
                  </span>
                </button>
                
                {showSeo && (
                  <div className="mt-4 space-y-4">
                    <div>
                      <label className="block text-sm text-gray-500 mb-1">Meta Title</label>
                      <input
                        type="text"
                        name="meta_title"
                        value={formData.meta_title}
                        onChange={handleChange}
                        placeholder={formData.title}
                        className="input-field text-sm"
                        maxLength={60}
                      />
                      <div className="text-xs text-gray-400 mt-1">
                        {formData.meta_title?.length || 0}/60
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-500 mb-1">Meta Description</label>
                      <textarea
                        name="meta_description"
                        value={formData.meta_description}
                        onChange={handleChange}
                        placeholder={formData.excerpt?.slice(0, 160)}
                        className="input-field text-sm min-h-[80px]"
                        maxLength={160}
                      />
                      <div className="text-xs text-gray-400 mt-1">
                        {formData.meta_description?.length || 0}/160
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* AI Modal */}
      {showAiModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl max-w-lg w-full p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <h2 className="font-display text-xl font-bold text-gray-800">Scrivi con IA</h2>
              </div>
              <button
                onClick={() => setShowAiModal(false)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Di cosa vuoi parlare?
                </label>
                <textarea
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                  placeholder="Es: 5 attività creative per insegnare la matematica ai bambini..."
                  className="input-field min-h-[100px]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Lunghezza articolo
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { value: 'short', label: 'Breve', desc: '400-600 parole' },
                    { value: 'medium', label: 'Medio', desc: '600-900 parole' },
                    { value: 'long', label: 'Lungo', desc: '900-1200 parole' },
                  ].map(opt => (
                    <button
                      key={opt.value}
                      onClick={() => setAiLength(opt.value)}
                      className={`p-3 rounded-xl text-center transition-all ${
                        aiLength === opt.value
                          ? 'bg-gradient-to-br from-purple-500 to-pink-500 text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      <div className="font-medium text-sm">{opt.label}</div>
                      <div className={`text-xs ${aiLength === opt.value ? 'text-white/80' : 'text-gray-400'}`}>
                        {opt.desc}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={handleAiGenerate}
                disabled={aiGenerating || !aiPrompt.trim()}
                className="w-full py-3 rounded-xl font-medium flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {aiGenerating ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Generazione in corso...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Genera Articolo
                  </>
                )}
              </button>

              <p className="text-xs text-gray-400 text-center">
                L'IA genera un articolo SEO-friendly. Puoi modificarlo dopo.
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}

function PreviewMode({ formData, onClose }) {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-display text-xl font-bold text-gray-800">Preview</h2>
        <button onClick={onClose} className="btn-secondary">Chiudi Preview</button>
      </div>
      <div className="card p-8">
        <h1 className="font-display text-3xl font-bold text-gray-800 mb-4">{formData.title || 'Titolo...'}</h1>
        <p className="text-gray-500 mb-6">{formData.excerpt || 'Riassunto...'}</p>
        <div 
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: formData.content || '<p class="text-gray-400">Contenuto...</p>' }}
        />
      </div>
    </div>
  )
}
