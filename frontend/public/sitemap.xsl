<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9">
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
              <div class="stat">Pagine: <span><xsl:value-of select="count(sitemap:urlset/sitemap:url)"/></span></div>
            </div>
          </div>
          <table>
            <thead><tr><th>URL</th><th>Ultima modifica</th><th>Frequenza</th><th>Priorità</th></tr></thead>
            <tbody>
              <xsl:for-each select="sitemap:urlset/sitemap:url">
                <tr>
                  <td><a href="{sitemap:loc}" target="_blank"><xsl:value-of select="sitemap:loc"/></a></td>
                  <td><xsl:value-of select="sitemap:lastmod"/></td>
                  <td><span class="badge badge-{sitemap:changefreq}"><xsl:value-of select="sitemap:changefreq"/></span></td>
                  <td><xsl:value-of select="sitemap:priority"/> <span class="priority-bar" style="width:{sitemap:priority*60}px"/></td>
                </tr>
              </xsl:for-each>
            </tbody>
          </table>
          <div class="footer"><p>Generata dinamicamente al build • https://deborapp.vercel.app/sitemap.xml</p></div>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
