-- =====================================================
-- MIGRAZIONE 011: Sistema ordini e prodotti multipli
-- =====================================================
-- Crea le tabelle necessarie per:
-- 1. Ordini pendenti (ordini in attesa di PIN)
-- 2. Relazione many-to-many clienti-prodotti
-- =====================================================

-- 1. Tabella ORDERS (ordini pendenti)
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

-- Indici per la tabella orders
CREATE INDEX IF NOT EXISTS idx_orders_email ON orders(email);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_tier ON orders(tier_key);
CREATE INDEX IF NOT EXISTS idx_orders_created ON orders(created_at DESC);

-- RLS per orders
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Policy: orders leggibili da authenticated (admin)
CREATE POLICY "Orders leggibili da authenticated"
  ON orders FOR SELECT
  USING (auth.role() = 'authenticated');

-- Policy: orders inseribili da chiunque (il cliente crea l'ordine)
CREATE POLICY "Orders creabili da chiunque"
  ON orders FOR INSERT
  WITH CHECK (true);

-- Policy: orders modificabili da authenticated (admin)
CREATE POLICY "Orders modificabili da authenticated"
  ON orders FOR UPDATE
  USING (auth.role() = 'authenticated');

CREATE POLICY "Orders eliminabili da authenticated"
  ON orders FOR DELETE
  USING (auth.role() = 'authenticated');


-- 2. Tabella CUSTOMER_PRODUCTS (relazione many-to-many)
CREATE TABLE IF NOT EXISTS customer_products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(customer_id, product_id)
);

-- Indici per customer_products
CREATE INDEX IF NOT EXISTS idx_customer_products_customer ON customer_products(customer_id);
CREATE INDEX IF NOT EXISTS idx_customer_products_product ON customer_products(product_id);

-- RLS per customer_products
ALTER TABLE customer_products ENABLE ROW LEVEL SECURITY;

-- Policy: leggibili da authenticated (admin + edge function)
CREATE POLICY "Customer products leggibili da authenticated"
  ON customer_products FOR SELECT
  USING (auth.role() = 'authenticated');

-- Policy: inseribili da authenticated (admin)
CREATE POLICY "Customer products inseribili da authenticated"
  ON customer_products FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

-- Policy: eliminabili da authenticated (admin)
CREATE POLICY "Customer products eliminabili da authenticated"
  ON customer_products FOR DELETE
  USING (auth.role() = 'authenticated');


-- 3. Aggiungi colonne alla tabella users
ALTER TABLE users ADD COLUMN IF NOT EXISTS tier_key TEXT;
CREATE INDEX IF NOT EXISTS idx_users_tier_key ON users(tier_key);

ALTER TABLE users ADD COLUMN IF NOT EXISTS product_ids UUID[] DEFAULT '{}';
CREATE INDEX IF NOT EXISTS idx_users_product_ids ON users USING GIN(product_ids);
