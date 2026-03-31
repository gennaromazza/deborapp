import { useEffect, useState } from 'react'
import { supabase } from '../utils/supabase'

export default function Sitemap() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    async function fetchPosts() {
      const { data } = await supabase
        .from('blog_posts')
        .select('slug, updated_at')
        .eq('is_published', true)
      
      setPosts(data || [])
    }
    fetchPosts()
  }, [])

  const baseUrl = 'https://deborapp.vercel.app'
  const now = new Date().toISOString()

  const staticPages = [
    { url: '/', priority: '1.0', changefreq: 'weekly' },
    { url: '/chi-sono', priority: '0.8', changefreq: 'monthly' },
    { url: '/portfolio', priority: '0.8', changefreq: 'weekly' },
    { url: '/contatti', priority: '0.8', changefreq: 'monthly' },
    { url: '/blog', priority: '0.9', changefreq: 'daily' },
    { url: '/accesso-pin', priority: '0.5', changefreq: 'yearly' },
  ]

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticPages.map(page => `
  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('')}
  ${posts.map(post => `
  <url>
    <loc>${baseUrl}/blog/${post.slug}</loc>
    <lastmod>${post.updated_at || now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`).join('')}
</urlset>`

  return (
    <div className="min-h-screen bg-pastel-cream flex items-center justify-center">
      <div className="text-center">
        <h1 className="font-display text-2xl font-bold text-gray-800 mb-4">Sitemap</h1>
        <pre className="text-left bg-white p-4 rounded-lg overflow-auto max-w-2xl text-sm">
          {sitemap}
        </pre>
      </div>
    </div>
  )
}