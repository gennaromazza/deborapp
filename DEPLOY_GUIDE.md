# Debora di Bellucci App - Deployment Guide

## URL del Sito

- **Produzione**: https://deborapp.vercel.app
- **Alias Vercel**: https://debdigital.vercel.app

## Progetto Vercel

- **Nome**: `deborapp`
- **URL produzione**: https://deborapp.vercel.app
- **Scope**: `gennaromazzacane-gmailcoms-projects`
- **Framework Preset**: Vite
- **Root Directory**: `frontend`
- **Build Command**: `npm run build`
- **Node.js Version**: 24.x

⚠️ **ATTENZIONE — UNICO PROGETTO**: Esiste un solo progetto Vercel chiamato `deborapp`. Non creare progetti separati come `frontend`. Il progetto `frontend` è stato eliminato da Vercel — se vedi un progetto con quel nome, cancellalo.

## Comandi per il Deploy

### Deploy da cartella root (SEMPRE da qui)
```bash
# Dalla root del progetto (H:\Debora di Bellucci)
vercel --prod --yes
```

🔴 **REGOLA FONDAMENTALE**: Il deploy va SEMPRE fatto dalla **root** del progetto (`H:\Debora di Bellucci`), MAI dalla cartella `frontend`. Il progetto Vercel è configurato con Root Directory = `frontend`, quindi Vercel builda automaticamente dalla sottocartella corretta.

Se lanci `vercel --prod` da dentro `frontend/`, Vercel crea un progetto separato e sbagliato. Per evitarlo, controlla sempre che la directory di lavoro sia la root prima di deployare.

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
3. Link progetto: `vercel link --scope gennaromazzacane-gmailcoms-projects --project deborapp --yes` (dalla root, NON da frontend/)
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

## Verifica sitemap e stato di indicizzazione

- Google legge la sitemap XML in modo nativo. L'XSL inclusa nel file sitemap.xml è solo una questione di visualizzazione nel browser e non influisce sull'indicizzazione da parte dei motori di ricerca.
- Verifica manuale della sitemap:
  - URL pubblica: https://deborapp.vercel.app/sitemap.xml
  - Controlla che risponda con status 200 e Content-Type: application/xml
  - Controlla che contenga le voci principali: root, chi sono, portfolio, contatti, blog e i post principali
- Verifica sul dominio di staging/produzione:
  - Puoi utilizzare curl per controllare la presenza di header e il contenuto:
    - curl -I https://deborapp.vercel.app/sitemap.xml
    - curl -s https://deborapp.vercel.app/sitemap.xml | grep "<loc>"`
- Se Google riporta ancora “Impossibile leggere la Sitemap”:
  - Attendi alcune ore per la propagazione o esegui nuovamente la submission in Google Search Console
- Aggiornamenti futuri:
  - Manteniamo la sitemap come XML puro per l'indicizzazione
  - Se vuoi, posso esportare un JSON-LD o utilizzare una route dinamica per rigenerare automaticamente la sitemap al deploy (già impostato nel build script)
