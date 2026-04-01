-- =====================================================
-- MIGRAZIONE 013: Sistema unificato - prodotti gratuiti
-- =====================================================
-- Sostituisce le migrazioni 011 e 012
-- Aggiunge: is_free, free_until ai prodotti
-- Rimuove: stripe_payment_link dai prodotti
-- =====================================================

-- 1. Rimuovi colonna stripe_payment_link (se esiste)
ALTER TABLE products DROP COLUMN IF EXISTS stripe_payment_link;

-- 2. Aggiungi colonne per prodotti gratuiti
ALTER TABLE products ADD COLUMN IF NOT EXISTS is_free BOOLEAN DEFAULT false;
ALTER TABLE products ADD COLUMN IF NOT EXISTS free_until TIMESTAMPTZ;

CREATE INDEX IF NOT EXISTS idx_products_is_free ON products(is_free) WHERE is_free = true;
CREATE INDEX IF NOT EXISTS idx_products_free_until ON products(free_until) WHERE free_until IS NOT NULL;

-- 3. Tabella ORDERS (ordini pendenti)
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  tier_key TEXT NOT NULL,
  selected_product_ids UUID[] NOT NULL DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'pending',
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_orders_email ON orders(email);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_tier ON orders(tier_key);
CREATE INDEX IF NOT EXISTS idx_orders_created ON orders(created_at DESC);

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Orders leggibili da authenticated" ON orders;
DROP POLICY IF EXISTS "Orders creabili da chiunque" ON orders;
DROP POLICY IF EXISTS "Orders modificabili da authenticated" ON orders;
DROP POLICY IF EXISTS "Orders eliminabili da authenticated" ON orders;

CREATE POLICY "Orders leggibili da authenticated"
  ON orders FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Orders creabili da chiunque"
  ON orders FOR INSERT WITH CHECK (true);

CREATE POLICY "Orders modificabili da authenticated"
  ON orders FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Orders eliminabili da authenticated"
  ON orders FOR DELETE USING (auth.role() = 'authenticated');


-- 4. Tabella CUSTOMER_PRODUCTS (relazione many-to-many)
CREATE TABLE IF NOT EXISTS customer_products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(customer_id, product_id)
);

CREATE INDEX IF NOT EXISTS idx_customer_products_customer ON customer_products(customer_id);
CREATE INDEX IF NOT EXISTS idx_customer_products_product ON customer_products(product_id);

ALTER TABLE customer_products ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Customer products leggibili da authenticated" ON customer_products;
DROP POLICY IF EXISTS "Customer products inseribili da authenticated" ON customer_products;
DROP POLICY IF EXISTS "Customer products eliminabili da authenticated" ON customer_products;

CREATE POLICY "Customer products leggibili da authenticated"
  ON customer_products FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Customer products inseribili da authenticated"
  ON customer_products FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Customer products eliminabili da authenticated"
  ON customer_products FOR DELETE USING (auth.role() = 'authenticated');


-- 5. Colonne aggiuntive su users
ALTER TABLE users ADD COLUMN IF NOT EXISTS tier_key TEXT;
CREATE INDEX IF NOT EXISTS idx_users_tier_key ON users(tier_key);

ALTER TABLE users ADD COLUMN IF NOT EXISTS product_ids UUID[] DEFAULT '{}';
CREATE INDEX IF NOT EXISTS idx_users_product_ids ON users USING GIN(product_ids);
