# Supabase Edge Functions - Debora di Bellucci Portfolio

## Configurazione Gmail API

### 1. Crea un progetto Google Cloud
1. Vai su https://console.cloud.google.com
2. Crea un nuovo progetto (es. "debora-portfolio-emails")

### 2. Abilita Gmail API
1. Nel progetto, vai su "API e servizi" > "Libreria"
2. Cerca "Gmail API" e abilitala

### 3. Crea un Service Account
1. Vai su "API e servizi" > "Credenziali"
2. Clicca "Crea credenziali" > "Account di servizio"
3. Dai un nome (es. "debora-email-sender")
4. Clicca "Crea e continua", poi "Fine"

### 4. Crea una chiave privata
1. Clicca sull'account di servizio appena creato
2. Vai su "Chiavi" > "Aggiungi chiave" > "Crea nuova chiave"
3. Scegli formato **JSON**
4. Scarica il file JSON

### 5. Configura l'accesso Gmail
1. Apri il file JSON scaricato
2. Copia `client_email` e `private_key`
3. Vai sul tuo account Gmail > Impostazioni > Inoltro e POP/IMAP
4. Abilita IMAP

### 6. Aggiungi le variabili d'ambiente a Supabase

Vai su Supabase Dashboard > Project Settings > Edge Functions e aggiungi:

```
GMAIL_CLIENT_EMAIL=il-tuo-service-account@project.iam.gserviceaccount.com
GMAIL_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----\nMIIEv... (tutta la chiave)\n-----END PRIVATE KEY-----
GMAIL_FROM=la-tua-email@gmail.com
```

> **Nota:** La `GMAIL_PRIVATE_KEY` deve includere i `\n` letterali per le nuove righe.

### 7. Configura le variabili del progetto Supabase

Aggiungi anche queste variabili in Supabase Dashboard > Settings > API:

```
SUPABASE_URL=https://gwndwpewlraagzrospub.supabase.co
SUPABASE_SERVICE_ROLE_KEY=la-tua-service-role-key
```

## Deploy delle Edge Functions

```bash
# Installa Supabase CLI
npm install -g supabase

# Login
supabase login

# Link al progetto
supabase link --project-ref gwndwpewlraagzrospub

# Deploy delle funzioni
supabase functions deploy verify-pin
supabase functions deploy send-pin
```

## Configurazione Admin Auth

Crea l'utente admin da Supabase Dashboard > Authentication > Users > Add User
