import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Calendar, User, Tag, ChevronRight, Search } from 'lucide-react'
import { supabase } from '../utils/supabase'
import PageTransition from '../components/PageTransition'

export default function BlogList() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [categories, setCategories] = useState([])

  useEffect(() => {
    fetchPosts()
  }, [selectedCategory])

  useEffect(() => {
    document.title = 'Blog - Consigli, Attività e Idee per Bambini | Debora di Bellucci'

    const setMeta = (name, content, attr = 'name') => {
      let el = document.querySelector(`meta[${attr}="${name}"]`)
      if (!el) {
        el = document.createElement('meta')
        el.setAttribute(attr, name)
        document.head.appendChild(el)
      }
      el.setAttribute('content', content)
    }

    setMeta('description', 'Leggi il blog di Debora di Bellucci: consigli pratici, attività creative, schede didattiche e idee per accompagnare i tuoi bambini nel mondo della matematica e della creatività.')
    setMeta('keywords', 'blog bambini, attività bambini matematica, creatività bambini, educazione bambini, ansia scuola bambini, schede didattiche blog')
    setMeta('og:title', 'Blog - Consigli, Attività e Idee per Bambini | Debora di Bellucci')
    setMeta('og:description', 'Leggi il blog di Debora di Bellucci: consigli pratici, attività creative e idee per bambini.', 'property')
    setMeta('og:type', 'website', 'property')
    setMeta('og:url', 'https://deborapp.vercel.app/blog', 'property')
    setMeta('og:image', 'https://deborapp.vercel.app/author_family.png', 'property')
    setMeta('twitter:card', 'summary_large_image')
    setMeta('twitter:title', 'Blog - Debora di Bellucci')
    setMeta('twitter:description', 'Consigli, attività e idee per accompagnare i tuoi bambini.')
    setMeta('twitter:image', 'https://deborapp.vercel.app/author_family.png')

    let canonical = document.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.setAttribute('rel', 'canonical')
      document.head.appendChild(canonical)
    }
    canonical.setAttribute('href', 'https://deborapp.vercel.app/blog')

    return () => {}
  }, [])

  async function fetchPosts() {
    setLoading(true)
    let query = supabase
      .from('blog_posts')
      .select('*')
      .eq('is_published', true)
      .order('published_at', { ascending: false })

    if (selectedCategory !== 'all') {
      query = query.eq('category', selectedCategory)
    }

    const { data } = await query
    setPosts(data || [])
    
    // Estrai categorie uniche
    const cats = [...new Set(data?.map(p => p.category).filter(Boolean))]
    setCategories(cats)
    
    setLoading(false)
  }

  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.excerpt?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <PageTransition>
      <div className="min-h-screen bg-pastel-cream">
        {/* Hero Section */}
        <div className="bg-gradient-to-b from-pastel-lavender/30 to-transparent py-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <h1 className="font-display text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                Blog di <span className="text-gradient">Debora di Bellucci</span>
              </h1>
              <p className="font-body text-lg text-gray-500 max-w-2xl mx-auto mb-8">
                Consigli, attività e idee per accompagnare i tuoi bambini nel mondo della matematica e della creatività
              </p>
              
              {/* Author Image */}
              <div className="flex justify-center mb-8">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full overflow-hidden ring-4 ring-pastel-pink/30 shadow-lg">
                    <img 
                      src="/author_family.png" 
                      alt="Debora di Bellucci"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Search & Filter */}
            <div className="max-w-xl mx-auto">
              <div className="relative mb-6">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Cerca articoli..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="input-field pl-12"
                />
              </div>
              
              <div className="flex flex-wrap justify-center gap-2">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === 'all'
                      ? 'bg-pastel-pink-dark text-white'
                      : 'bg-white text-gray-600 hover:bg-pastel-pink/20'
                  }`}
                >
                  Tutti
                </button>
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      selectedCategory === cat
                        ? 'bg-pastel-pink-dark text-white'
                        : 'bg-white text-gray-600 hover:bg-pastel-pink/20'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Posts Grid */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 pb-20">
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-pastel-pink-dark border-t-transparent" />
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="text-center py-20">
              <p className="font-body text-gray-500">Nessun articolo trovato</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="card overflow-hidden group hover:shadow-lg transition-all"
                >
                  <Link to={`/blog/${post.slug}`}>
                    <div className="aspect-video overflow-hidden bg-pastel-lavender/30">
                      {post.featured_image ? (
                        <img 
                          src={rp.featured_image} 
                          alt={rp.title}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-5xl">
                          📝
                        </div>
                      )}
                    </div>
                    <div className="p-5">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-xs font-medium px-2 py-1 bg-pastel-lavender/50 text-pastel-lavender-dark rounded-full">
                          {post.category}
                        </span>
                      </div>
                      <h2 className="font-display font-bold text-lg text-gray-800 mb-2 group-hover:text-pastel-pink-dark transition-colors line-clamp-2">
                        {post.title}
                      </h2>
                      <p className="font-body text-sm text-gray-500 line-clamp-2 mb-4">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-xs text-gray-400">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {post.published_at ? new Date(post.published_at).toLocaleDateString('it-IT') : ''}
                        </div>
                        <span className="flex items-center gap-1 text-pastel-pink-dark font-medium">
                          Leggi <ChevronRight className="w-4 h-4" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          )}
        </div>

        {/* SEO JSON-LD */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            "name": "Blog di Debora di Bellucci",
            "description": "Consigli e attività per bambini",
            "url": "https://deborapp.vercel.app/blog",
            "author": {
              "@type": "Person",
              "name": "Debora di Bellucci"
            }
          })}
        </script>
      </div>
    </PageTransition>
  )
}