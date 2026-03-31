# Debora di Bellucci App - Deployment Guide

## Comandi per il Deploy

### Deploy automatico (da cartella root)
```bash
vercel --prod --yes
```

### Deploy dalla cartella frontend
```bash
cd frontend
vercel --prod --yes
```

## Note

- Il file `frontend/vercel.json` è necessario per il routing corretto delle route (SPA)
- Il build viene eseguito automaticamente da Vercel
- Alias: https://deborapp.vercel.app

## Configurazione progetto

- **Framework**: Vite + React
- **Build command**: `npm run build`
- **Output directory**: `frontend/dist`

## Per altri sviluppatori

1. Installare Vercel CLI: `npm i -g vercel`
2. Login: `vercel login`
3. Deploy: `vercel --prod --yes`