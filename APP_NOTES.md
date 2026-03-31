# Note Permanenti - Debora di Bellucci App

## Workflow per nuove modifiche

### 1. Sviluppo locale
```bash
cd frontend
npm run dev
```

### 2. Commit e Push
```bash
git add -A
git commit -m "descrizione modifiche"
git push
```

### 3. Deploy su Vercel
```bash
vercel --prod --yes
```

## Configurazione

- **Repo Git**: https://github.com/gennaromazza/deborapp
- **Vercel**: https://vercel.com/gennaromazzacane-gmailcoms-projects/deborapp
- **Sito**: https://deborapp.vercel.app

## Stack

- Frontend: React + Vite + Tailwind
- Backend: Supabase (functions + database)
- Deploy: Vercel (automatico da Git)

## Note Importanti

- Vercel deploya automaticamente dal branch main
- NON usare vercel.json (configurazione automatica)
- Per funzioni Supabase: deploy manuale con `npx supabase functions deploy`

## Supabase

- Project ID: gwndwpewlraagzrospub
- Funzioni da aggiornare: `supabase/functions/verify-pin/`
- Database migrations in: `supabase/migrations/`