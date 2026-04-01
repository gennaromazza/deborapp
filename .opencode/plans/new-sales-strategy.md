# Piano di Implementazione — Nuova Strategia di Vendita e Comunicazione

## Panoramica

Trasformare la piattaforma da un semplice catalogo di "prodotti digitali" a un'esperienza di acquisto giocosa, memorabile e orientata alla famiglia, con un sistema di livelli ispirato al caffè e una nuova tassonomia prodotti.

---

## Analisi Stato Attuale

### Stack Tecnologico
- **Frontend:** React 18 + Vite + Tailwind CSS + Framer Motion + Lucide Icons
- **Backend:** Supabase (PostgreSQL + Edge Functions + Storage)
- **Email:** Resend API
- **Deploy:** Vercel (automatico da GitHub, root = `frontend`)
- **Pagamento attuale:** Piattaforme esterne (Gumroad/Etsy) + sistema PIN

### Schema Database Attuale (`products`)
| Colonna | Tipo | Note |
|---------|------|------|
| `id` | UUID | PK |
| `title` | TEXT | |
| `description` | TEXT | |
| `cover_image` | TEXT | URL singola |
| `cover_images` | JSONB | Array di URL |
| `download_link` | TEXT | Link esterno |
| `type` | TEXT | `'link'` o `'app'` |
| `chapters_data` | JSONB | Per app interattive |
| `slug` | TEXT | Per routing |
| `created_at` | TIMESTAMPTZ | |

### Problemi Identificati
1. Tassonomia troppo povera: solo `type: 'link' | 'app'`
2. Nessun sistema di pricing nel DB
3. ProductCard minimale: solo titolo + descrizione
4. Copy tecnico: "Portfolio", "contenuti digitali"
5. Nessun sistema di livelli
6. Nessun checkout diretto

---

## Strategia

### Livelli "Caffè" — Pricing Tiers

| Livello | Nome | Prezzo | Prodotti |
|---------|------|--------|----------|
| 1 | **Un Caffè** | €3,90 | 1 attività |
| 2 | **Caffè & Cornetto** ⭐ consigliato | €6,90 | 2 attività |
| 3 | **Colazione Completa** | €12,90 | 4 attività |
| 4 | **La Merenda** | €24,90 | Tutte le attività |

### Pagamento: Stripe Payment Links
- Link creati dalla dashboard Stripe
- Redirect al sito dopo il pagamento
- Sistema PIN esistente per l'accesso
- Costi: ~1.4% + €0.25 per transazione

### Nuova Tassonomia Prodotti

**Categorie principali:**
1. `mini-app-interattive` — Mini App Interattive
2. `attivita-stampabili` — Attività Stampabili
3. `percorsi-educativi` — Percorsi Educativi
4. `storie-avventure` — Storie & Avventure
5. `kit-famiglia` — Kit Famiglia

**Contesti d'uso (usage_context):**
- `da-stampare` — Pronto da stampare
- `interattivo` — Interattivo
- `in-famiglia` — Da fare insieme
- `educativo` — Educativo
- `creativo` — Creativo

**Price tier:**
- `single` — Livello 1
- `double` — Livello 2
- `family` — Livello 3
- `premium` — Livello 4

---

## File da Creare

### 1. `supabase/migrations/010_product_enhancements.sql`
Nuove colonne su `products` + tabella `pricing_tiers` + seed dati

### 2. `frontend/src/components/PricingTiers.jsx`
Componente livelli caffè con:
- 4 card livelli
- Livello consigliato evidenziato
- Icone contestuali (coffee, croissant, ecc.)
- Lista feature per livello
- CTA "Sblocca" → redirect Stripe Payment Link
- Design coerente con il sistema pastel esistente

### 3. `frontend/src/components/ActivityCard.jsx`
Evoluzione di ProductCard con:
- Badge categoria colorata
- Badge contesto d'uso (da-stampare, interattivo, ecc.)
- Microcopy orientato al beneficio
- Design coerente con card esistenti

### 4. `frontend/src/components/CategoryFilter.jsx`
Filtro categorie con:
- Pill/button per ogni categoria
- Stato attivo/inattivo
- Conteggio prodotti per categoria
- Design coerente

### 5. `frontend/src/pages/Activities.jsx`
Nuova pagina `/attivita` con:
- Hero con copy esperienziale ("Attività creative per bambini e famiglie")
- Sezione livelli caffè (PricingTiers)
- Griglia attività filtrabili (ActivityCard + CategoryFilter)
- Meta tag SEO ottimizzati
- JSON-LD structured data

---

## File da Modificare

### 6. `frontend/src/pages/Admin/Products.jsx`
Aggiungere campi nel form:
- Select per `category`
- Input tags
- Select per `price_tier`
- Select per `usage_context`

### 7. `frontend/src/App.jsx`
Aggiungere route:
```jsx
<Route path="attivita" element={<Activities />} />
```

### 8. `frontend/src/components/Layout.jsx`
Aggiornare navLinks:
- Cambiare "Portfolio" → "Attività" (path: `/attivita`)
- Aggiornare footer di conseguenza

### 9. `frontend/src/pages/Home.jsx`
Aggiornare copy:
- "Contenuti digitali" → "Attività creative per famiglie"
- Sezione "Come funziona" con riferimento ai livelli caffè
- CTA verso `/attivita` invece di `/portfolio`

### 10. `frontend/src/pages/Portfolio.jsx`
Aggiornare meta tag e copy (opzionale, manteniamo per retrocompatibilità)

### 11. `frontend/src/components/Breadcrumb.jsx`
Aggiungere breadcrumb per `/attivita`

### 12. `frontend/src/components/PageNavigation.jsx`
Aggiornare navigazione: `/chi-sono` → `/attivita` → `/contatti`

### 13. `frontend/scripts/generate-sitemap.js`
Aggiungere `/attivita` alla sitemap

---

## Ordine di Implementazione

1. Migration SQL (010_product_enhancements.sql)
2. PricingTiers.jsx
3. ActivityCard.jsx
4. CategoryFilter.jsx
5. Activities.jsx
6. Admin/Products.jsx
7. App.jsx
8. Layout.jsx
9. Home.jsx
10. Breadcrumb.jsx + PageNavigation.jsx
11. sitemap generator
12. Build + validazione

---

## Comandi CLI da Eseguire

```bash
# 1. Eseguire migration su Supabase (manuale dal dashboard o CLI)
npx supabase db push

# 2. Install dipendenze (nessuna nuova necessaria)
cd frontend && npm install

# 3. Build
cd frontend && npm run build

# 4. Deploy
vercel --prod --yes
```

---

## Note Importanti

- **Retrocompatibilità:** La pagina `/portfolio` continua a funzionare
- **Nessuna dipendenza nuova:** Tutti i componenti usano librerie esistenti
- **Stripe Payment Links:** Da configurare nel dashboard Stripe e inserire nella tabella `pricing_tiers`
- **Migration:** Va eseguita manualmente su Supabase Dashboard o con `npx supabase db push`
- **Design:** Tutti i nuovi componenti seguono il design system esistente (colori pastel, font, animazioni)
