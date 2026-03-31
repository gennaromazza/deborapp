# Debora di Bellucci App - Deployment Guide

## URL del Sito

- **Produzione**: https://deborapp.vercel.app
- **Alias Vercel**: https://debdigital.vercel.app

## Progetto Vercel

- **Nome**: `debdigital`
- **Scope**: `gennaromazzacane-gmailcoms-projects`
- **Framework Preset**: Vite
- **Root Directory**: `frontend`
- **Build Command**: `npm run build`
- **Node.js Version**: 24.x

## Comandi per il Deploy

### Deploy da cartella root (sempre da qui)
```bash
# Dalla root del progetto (C:\Users\targa\Documents\DeborApp\deborapp)
vercel --prod --yes
```

⚠️ **IMPORTANTE**: Il deploy va SEMPRE fatto dalla root del progetto, NON dalla cartella `frontend`. Il progetto Vercel è configurato con Root Directory = `frontend`, quindi Vercel builda automaticamente dalla sottocartella corretta.

## Struttura del Progetto

```
deborapp/
├── frontend/              ← Root directory del progetto Vercel
│   ├── public/            ← File statici (robots.txt, sitemap.xml, verifica Google)
│   ├── src/               ← Codice sorgente React
│   ├── vercel.json        ← Configurazione routing SPA
│   ├── package.json       ← Dipendenze e script
│   └── index.html         ← HTML entry point
├── supabase/              ← Migrazioni e funzioni Supabase
├── .vercel/               ← Configurazione link progetto Vercel
└── DEPLOY_GUIDE.md        ← Questo file
```

## File SEO Importanti

| File | Path | Scopo |
|------|------|-------|
| `robots.txt` | `frontend/public/robots.txt` | Regole crawling motori di ricerca |
| `sitemap.xml` | `frontend/public/sitemap.xml` | Mappa del sito per Google |
| Verifica Google | `frontend/public/googlebf58e6c1bbae420e.html` | Verifica Google Search Console |
| `vercel.json` | `frontend/vercel.json` | Routing SPA + eccezioni file statici |

## Configurazione vercel.json

Il file `frontend/vercel.json` gestisce:
- **Rewrites** per SPA routing (tutte le route → `index.html`)
- **Eccezioni** per file statici che NON devono essere rewrite-ati:
  - `/googlebf58e6c1bbae420e.html` (verifica Google)
  - `/sitemap.xml` (sitemap)
  - `/robots.txt` (robots)

## SEO - Cosa è stato implementato

### Meta tag dinamici (ogni pagina)
- `<title>` personalizzato
- `<meta description>` ottimizzato con keyword
- `<meta keywords>` dove rilevante
- Open Graph tags (`og:title`, `og:description`, `og:image`, `og:url`, `og:type`)
- Twitter Card tags (`twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`)
- `<link rel="canonical">` su ogni pagina

### JSON-LD Structured Data
| Pagina | Schema |
|--------|--------|
| Home | `WebSite` + `Organization` + `Person` + `FAQPage` |
| Chi sono | `ProfilePage` con `Person` |
| Portfolio | `CollectionPage` |
| Blog list | `Blog` |
| Blog post | `Article` (dinamico) |

### Ottimizzazioni tecniche
- `robots.txt` con regole per pagine pubbliche/private
- `sitemap.xml` statico servito correttamente
- `loading="lazy"` su tutte le immagini
- Pagina `/accesso-pin` con `noindex, nofollow`

## Per altri sviluppatori

1. Installare Vercel CLI: `npm i -g vercel`
2. Login: `vercel login`
3. Link progetto: `vercel link --scope gennaromazzacane-gmailcoms-projects --project debdigital --yes`
4. Deploy: `vercel --prod --yes` (dalla root)

## Troubleshooting

### "react-scripts build exited with 127"
Il Framework Preset nel dashboard Vercel deve essere **Vite**, non Create React App.
→ Impostazioni: https://vercel.com/gennaromazzacane-gmailcoms-projects/debdigital/settings

### File di verifica Google non trovato
Il `vercel.json` deve avere un rewrite esplicito per il file di verifica.
→ Controlla che `/googlebf58e6c1bbae420e.html` sia nelle eccezioni dei rewrite.

### Root Directory sbagliato
Il Root Directory nel dashboard Vercel deve essere **`frontend`**, non `.`.
→ Impostazioni: https://vercel.com/gennaromazzacane-gmailcoms-projects/debdigital/settings
