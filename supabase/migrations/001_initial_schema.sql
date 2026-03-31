-- Tabella prodotti
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  cover_image TEXT,
  download_link TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabella utenti
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  pin TEXT NOT NULL UNIQUE,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indici per performance
CREATE INDEX IF NOT EXISTS idx_users_pin ON users(pin);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_product_id ON users(product_id);

-- Row Level Security
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Policy: tutti possono leggere i prodotti (per il frontend pubblico)
CREATE POLICY "Prodotti leggibili da tutti"
  ON products FOR SELECT
  USING (true);

-- Policy: prodotti modificabili solo da authenticated
CREATE POLICY "Prodotti modificabili da authenticated"
  ON products FOR ALL
  USING (auth.role() = 'authenticated');

-- Policy: utenti leggibili da authenticated
CREATE POLICY "Utenti leggibili da authenticated"
  ON users FOR SELECT
  USING (auth.role() = 'authenticated');

-- Policy: utenti modificabili da authenticated
CREATE POLICY "Utenti modificabili da authenticated"
  ON users FOR ALL
  USING (auth.role() = 'authenticated');
