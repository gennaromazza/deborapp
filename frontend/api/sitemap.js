import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://gwndwpewlraagzrospub.supabase.co'
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd3bmR3cGV3bHJhYWd6cm9zcHViIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ4OTUwODQsImV4cCI6MjA5MDQ3MTA4NH0.iBeoXAXf9x8OjgCTBW5Uq4vqrLU1jPM3-9na-t6Ihjg'

const supabase = createClient(supabaseUrl, supabaseKey)

export default async function handler(req, res) {
  try {
    const { data: posts } = await supabase
      .from('blog_posts')
      .select('slug, updated_at')
      .eq('is_published', true)
      .order('published_at', { ascending: false })

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

    const xslStylesheet = `<?xml-stylesheet type="text/xsl" href="#stylesheet"?>`

    const xmlUrls = [...staticPages, ...blogPosts].map(page => `
  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${page.lastmod || now}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('')

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
${xslStylesheet}
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${xmlUrls}
  <xsl:stylesheet id="stylesheet" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
    <xsl:output method="html" indent="yes" encoding="UTF-8"/>
    <xsl:template match="/">
      <html lang="it">
        <head>
          <title>Sitemap - Debora di Bellucci</title>
          <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
          <style>
            *{margin:0;padding:0;box-sizing:border-box}
            body{font-family:'Segoe UI',system-ui,-apple-system,sans-serif;background:linear-gradient(135deg,#fdf2f8 0%,#f5f3ff 50%,#ecfdf5 100%);color:#374151;min-height:100vh;padding:2rem 1rem}
            .container{max-width:900px;margin:0 auto}
            .header{text-align:center;margin-bottom:2rem;padding:2rem;background:white;border-radius:1rem;box-shadow:0 4px 24px rgba(0,0,0,.06)}
            .header h1{font-size:1.75rem;font-weight:800;background:linear-gradient(135deg,#ec4899,#8b5cf6);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:.5rem}
            .header p{color:#6b7280;font-size:.95rem}
            .stats{display:flex;justify-content:center;gap:2rem;margin-top:1rem;flex-wrap:wrap}
            .stat{background:linear-gradient(135deg,#fdf2f8,#f5f3ff);padding:.5rem 1.25rem;border-radius:.75rem;font-size:.85rem;font-weight:600}
            .stat span{color:#ec4899}
            table{width:100%;background:white;border-radius:1rem;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,.06);border-collapse:collapse}
            thead{background:linear-gradient(135deg,#ec4899,#8b5cf6)}
            th{color:white;font-weight:600;font-size:.85rem;text-transform:uppercase;letter-spacing:.05em;padding:1rem 1.25rem;text-align:left}
            td{padding:.85rem 1.25rem;font-size:.9rem;border-bottom:1px solid #f3f4f6}
            tr:last-child td{border-bottom:none}
            tr:nth-child(even){background:#fafafa}
            tr:hover{background:#fdf2f8}
            a{color:#7c3aed;text-decoration:none;font-weight:500;word-break:break-all}
            a:hover{color:#ec4899;text-decoration:underline}
            .badge{display:inline-block;padding:.2rem .6rem;border-radius:9999px;font-size:.75rem;font-weight:600}
            .badge-daily{background:#dcfce7;color:#16a34a}
            .badge-weekly{background:#dbeafe;color:#2563eb}
            .badge-monthly{background:#fef3c7;color:#d97706}
            .badge-yearly{background:#f3f4f6;color:#6b7280}
            .priority-bar{display:inline-block;height:6px;border-radius:3px;background:linear-gradient(90deg,#ec4899,#8b5cf6)}
            .footer{text-align:center;margin-top:2rem;color:#9ca3af;font-size:.8rem}
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Sitemap</h1>
              <p>Debora di Bellucci — Contenuti Digitali per Bambini</p>
              <div class="stats">
                <div class="stat">Pagine: <span><xsl:value-of select="count(urlset/url)"/></span></div>
                <div class="stat">Ultimo aggiornamento: <span><xsl:value-of select="substring(now(),1,10)"/></span></div>
              </div>
            </div>
            <table>
              <thead><tr><th>URL</th><th>Ultima modifica</th><th>Frequenza</th><th>Priorità</th></tr></thead>
              <tbody>
                <xsl:for-each select="urlset/url">
                  <tr>
                    <td><a href="{loc}" target="_blank"><xsl:value-of select="loc"/></a></td>
                    <td><xsl:value-of select="lastmod"/></td>
                    <td><span class="badge badge-{changefreq}"><xsl:value-of select="changefreq"/></span></td>
                    <td><xsl:value-of select="priority"/> <span class="priority-bar" style="width:{priority*60}px"/></td>
                  </tr>
                </xsl:for-each>
              </tbody>
            </table>
            <div class="footer"><p>Generata dinamicamente • https://deborapp.vercel.app/sitemap.xml</p></div>
          </div>
        </body>
      </html>
    </xsl:template>
  </xsl:stylesheet>
</urlset>`

    res.setHeader('Content-Type', 'application/xml')
    res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400')
    res.status(200).send(sitemap)
  } catch (error) {
    console.error('Sitemap generation error:', error)
    res.status(500).send('Error generating sitemap')
  }
}
