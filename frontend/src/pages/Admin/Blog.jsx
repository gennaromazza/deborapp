import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Plus, Edit, Trash2, Eye, Search, Calendar } from 'lucide-react'
import { supabase } from '../../utils/supabase'

export default function AdminBlog() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    fetchPosts()
  }, [])

  async function fetchPosts() {
    const { data } = await supabase
      .from('blog_posts')
      .select('*')
      .order('created_at', { ascending: false })
    
    setPosts(data || [])
    setLoading(false)
  }

  async function deletePost(id) {
    if (!confirm('Sei sicuro di voler eliminare questo articolo?')) return
    
    await supabase.from('blog_posts').delete().eq('id', id)
    fetchPosts()
  }

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const stats = {
    total: posts.length,
    published: posts.filter(p => p.is_published).length,
    drafts: posts.filter(p => !p.is_published).length
  }

  return (
    <div className="min-h-screen bg-pastel-cream">
      <header className="glass sticky top-0 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/admin" className="text-pastel-pink-dark hover:text-pink-600 transition-colors">
              ← Indietro
            </Link>
            <h1 className="font-display font-bold text-xl text-gray-800">
              Gestione Blog
            </h1>
          </div>
          <Link
            to="/admin/blog/new"
            className="btn-primary flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Nuovo Articolo
          </Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {/* Stats */}
        <div className="grid sm:grid-cols-3 gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card p-5"
          >
            <p className="font-body text-gray-500 text-sm">Totale Articoli</p>
            <p className="font-display text-3xl font-bold text-gray-800">{stats.total}</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="card p-5"
          >
            <p className="font-body text-gray-500 text-sm">Pubblicati</p>
            <p className="font-display text-3xl font-bold text-pastel-mint-dark">{stats.published}</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="card p-5"
          >
            <p className="font-body text-gray-500 text-sm">Bozze</p>
            <p className="font-display text-3xl font-bold text-pastel-yellow-dark">{stats.drafts}</p>
          </motion.div>
        </div>

        {/* Search */}
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

        {/* Posts List */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-pastel-pink-dark border-t-transparent" />
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="text-center py-20 card">
            <p className="font-body text-gray-500 mb-4">Nessun articolo ancora</p>
            <Link to="/admin/blog/new" className="btn-primary">
              Crea il primo articolo
            </Link>
          </div>
        ) : (
          <div className="card overflow-hidden">
            <table className="w-full">
              <thead className="bg-pastel-lavender/20">
                <tr>
                  <th className="text-left p-4 font-display font-semibold text-gray-800">Titolo</th>
                  <th className="text-left p-4 font-display font-semibold text-gray-800 hidden md:table-cell">Categoria</th>
                  <th className="text-left p-4 font-display font-semibold text-gray-800 hidden md:table-cell">Stato</th>
                  <th className="text-left p-4 font-display font-semibold text-gray-800 hidden lg:table-cell">Data</th>
                  <th className="text-right p-4 font-display font-semibold text-gray-800">Azioni</th>
                </tr>
              </thead>
              <tbody>
                {filteredPosts.map((post, i) => (
                  <motion.tr
                    key={post.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.05 }}
                    className="border-t border-pastel-lavender/20 hover:bg-pastel-lavender/10"
                  >
                    <td className="p-4">
                      <div className="font-display font-medium text-gray-800">{post.title}</div>
                      <div className="font-body text-xs text-gray-400 md:hidden">{post.category}</div>
                    </td>
                    <td className="p-4 hidden md:table-cell">
                      <span className="text-sm text-gray-600">{post.category}</span>
                    </td>
                    <td className="p-4 hidden md:table-cell">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        post.is_published
                          ? 'bg-pastel-mint/50 text-pastel-mint-dark'
                          : 'bg-pastel-yellow/50 text-pastel-yellow-dark'
                      }`}>
                        {post.is_published ? 'Pubblicato' : 'Bozza'}
                      </span>
                    </td>
                    <td className="p-4 hidden lg:table-cell">
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <Calendar className="w-3 h-3" />
                        {post.published_at ? new Date(post.published_at).toLocaleDateString('it-IT') : '-'}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-end gap-2">
                        {post.is_published && (
                          <a
                            href={`/blog/${post.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 text-gray-400 hover:text-pastel-mint-dark transition-colors"
                            title="Visualizza"
                          >
                            <Eye className="w-4 h-4" />
                          </a>
                        )}
                        <Link
                          to={`/admin/blog/${post.id}/edit`}
                          className="p-2 text-gray-400 hover:text-pastel-pink-dark transition-colors"
                          title="Modifica"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => deletePost(post.id)}
                          className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                          title="Elimina"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  )
}