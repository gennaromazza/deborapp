-- Schema per multi-prodotto: 1 PIN = tutti i prodotti acquistati dal cliente
-- Questo aggiorna lo schema esistente mantenendo la compatibilità

-- 1. Creare tabella clienti (se non esiste - potrebbe già esistere come 'users')
-- La tabella users diventa 'customers' con relazione N:N ai prodotti

-- Aggiungere colonne per supportare multi-prodotto a users (rinominata customers)
ALTER TABLE users ADD COLUMN IF NOT EXISTS email TEXT UNIQUE;
ALTER TABLE users ADD COLUMN IF NOT EXISTS first_name TEXT;
ALTER TABLE users ADD COLUMN IF NOT EXISTS last_name TEXT;

-- 2. Creare tabella relazione clienti-prodotti (N:N)
CREATE TABLE IF NOT EXISTS customer_products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID REFERENCES users(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  purchased_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(customer_id, product_id)
);

-- Indici per performance
CREATE INDEX IF NOT EXISTS idx_customer_products_customer ON customer_products(customer_id);
CREATE INDEX IF NOT EXISTS idx_customer_products_product ON customer_products(product_id);

-- 3. La tabella pin_codes già esiste? Verificare e creare se necessaria
-- Se users ha già la colonna pin, usiamo quella direttamente

-- Nota: Il PIN è già nella tabella users (colonna pin)
-- Quindi il flusso sarà:
-- 1. Cliente inserisce PIN
-- 2. Sistema cerca utente con quel PIN
-- 3. Trova tutti i prodotti associati a quell'utente via customer_products
-- 4. Mostra lista prodotti

-- Policy RLS per customer_products
ALTER TABLE customer_products ENABLE ROW LEVEL SECURITY;

-- Tutti possono leggere i prodotti del cliente con quel PIN
CREATE POLICY "Clienti leggono i propri prodotti"
  ON customer_products FOR SELECT
  USING (true);

-- Solo admin possono modificare
CREATE POLICY "Admin gestiscono prodotti clienti"
  ON customer_products FOR ALL
  USING (auth.role() = 'authenticated');