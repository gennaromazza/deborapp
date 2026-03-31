import { createClient } from '@supabase/supabase-js'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const supabaseUrl = 'https://gwndwpewlraagzrospub.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd3bmR3cGV3bHJhYWd6cm9zcHViIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ4OTUwODQsImV4cCI6MjA5MDQ3MTA4NH0.iBeoXAXf9x8OjgCTBW5Uq4vqrLU1jPM3-9na-t6Ihjg'

async function generateSitemap() {
  const supabase = createClient(supabaseUrl, supabaseKey)

  const { data: posts, error } = await supabase
    .from('blog_posts')
    .select('slug, updated_at')
    .eq('is_published', true)
    .order('published_at', { ascending: false })

  if (error) {
    console.error('Error fetching posts:', error)
    process.exit(1)
  }

  const baseUrl = 'https://deborapp.vercel.app'
  const now = new Date().toISOString().split('T')[0]

  const staticPages = [
    { url: '/', priority: '1.0', changefreq: 'weekly' },
    { url: '/chi-sono', priority: '0.8', changefreq: 'monthly' },
    { url: '/portfolio', priority: '0.8', changefreq: 'weekly' },
    { url: '/contatti', priority: '0.7', changefreq: 'monthly' },
    { url: '/blog', priority: '0.9', changefreq: 'daily' },
  ]

  const blogPosts = (posts || []).map(post => ({
    url: `/blog/${post.slug}`,
    priority: '0.7',
    changefreq: 'weekly',
    lastmod: post.updated_at ? new Date(post.updated_at).toISOString().split('T')[0] : now,
  }))

    const xmlUrls = [...staticPages, ...blogPosts].map(page => `
  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${page.lastmod || now}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('')

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${xmlUrls}
</urlset>`

  const distDir = path.resolve(__dirname, '..', 'public')
  if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true })
  }

  fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemap, 'utf8')
  console.log('✅ Sitemap generated successfully with', staticPages.length + blogPosts.length, 'URLs')
}

generateSitemap()
