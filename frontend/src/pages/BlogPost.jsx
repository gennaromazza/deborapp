import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Calendar, Tag, ChevronLeft, ChevronRight, Share2 } from 'lucide-react'
import { supabase } from '../utils/supabase'
import PageTransition from '../components/PageTransition'

export default function BlogPost() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [relatedPosts, setRelatedPosts] = useState([])

  useEffect(() => {
    fetchPost()
  }, [slug])

  async function fetchPost() {
    setLoading(true)
    const { data } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .eq('is_published', true)
      .single()

    if (data) {
      setPost(data)
      
      // Fetch related posts (same category, excluding current)
      const { data: related } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('is_published', true)
        .eq('category', data.category)
        .neq('id', data.id)
        .limit(3)
      
      setRelatedPosts(related || [])
    }
    setLoading(false)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-pastel-cream flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-pastel-pink-dark border-t-transparent" />
      </div>
    )
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-pastel-cream flex items-center justify-center">
        <div className="text-center">
          <h2 className="font-display text-2xl font-bold text-gray-800 mb-4">Articolo non trovato</h2>
          <Link to="/blog" className="btn-primary">Torna al Blog</Link>
        </div>
      </div>
    )
  }

  // SEO Meta Tags
  const metaTitle = post.meta_title || post.title
  const metaDescription = post.meta_description || post.excerpt

  return (
    <PageTransition>
      <div className="min-h-screen bg-pastel-cream">
        {/* Header */}
        <div className="bg-gradient-to-b from-pastel-lavender/20 to-transparent py-8">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <Link 
              to="/blog" 
              className="inline-flex items-center gap-2 text-gray-500 hover:text-pastel-pink-dark transition-colors mb-6"
            >
              <ChevronLeft className="w-4 h-4" />
              Torna al Blog
            </Link>
            
            <div className="flex items-center gap-3 text-sm text-gray-500 mb-4">
              <span className="px-3 py-1 bg-pastel-lavender/50 text-pastel-lavender-dark rounded-full">
                {post.category}
              </span>
              {post.tags?.map(tag => (
                <span key={tag} className="flex items-center gap-1">
                  <Tag className="w-3 h-3" /> {tag}
                </span>
              ))}
            </div>
            
            <h1 className="font-display text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              {post.title}
            </h1>
            
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full overflow-hidden">
                  <img 
                    src={post.author_image || '/author_family.png'} 
                    alt={post.author_name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span>{post.author_name}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {post.published_at ? new Date(post.published_at).toLocaleDateString('it-IT', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                }) : ''}
              </div>
            </div>
          </div>
        </div>

        {/* Featured Image */}
        {post.featured_image && (
          <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl overflow-hidden shadow-lg"
            >
              <img 
                src={post.featured_image} 
                alt={post.title}
                className="w-full aspect-video object-cover"
              />
            </motion.div>
          </div>
        )}

        {/* Content */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 pb-20">
          <article className="prose prose-lg max-w-none">
            <div 
              className="font-body text-gray-700 leading-relaxed space-y-6"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </article>

          {/* Author Box */}
          <div className="mt-12 p-6 bg-white rounded-2xl shadow-sm border border-pastel-lavender/30">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                <img 
                  src={post.author_image || '/author_family.png'} 
                  alt={post.author_name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-display font-bold text-gray-800 mb-1">
                  {post.author_name}
                </h3>
                <p className="font-body text-sm text-gray-500">
                  Mamma di Antonio e Gabriel, creo contenuti digitali per bambini con l'obiettivo di ispirare fantasia e creatività.
                </p>
              </div>
            </div>
          </div>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <div className="mt-12">
              <h3 className="font-display text-xl font-bold text-gray-800 mb-6">
                Articoli correlati
              </h3>
              <div className="grid sm:grid-cols-3 gap-4">
                {relatedPosts.map(rp => (
                  <Link 
                    key={rp.id}
                    to={`/blog/${rp.slug}`}
                    className="card p-4 hover:shadow-md transition-all"
                  >
                    <div className="aspect-video bg-pastel-lavender/30 rounded-lg mb-3 overflow-hidden">
                      {rp.featured_image ? (
                        <img 
                          src={rp.featured_image} 
                          alt={rp.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-2xl">📝</div>
                      )}
                    </div>
                    <h4 className="font-display font-bold text-sm text-gray-800 line-clamp-2">
                      {rp.title}
                    </h4>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* SEO */}
        <title>{metaTitle} | Debora di Bellucci</title>
        <meta name="description" content={metaDescription} />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://deborapp.vercel.app/blog/${slug}`} />
        {post.featured_image && <meta property="og:image" content={post.featured_image} />}
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": post.title,
            "description": post.excerpt,
            "image": post.featured_image,
            "datePublished": post.published_at,
            "author": {
              "@type": "Person",
              "name": post.author_name,
              "image": post.author_image
            },
            "publisher": {
              "@type": "Organization",
              "name": "Debora di Bellucci",
              "logo": {
                "@type": "ImageObject",
                "url": "https://deborapp.vercel.app/official_logo.png"
              }
            }
          })}
        </script>
      </div>
    </PageTransition>
  )
}