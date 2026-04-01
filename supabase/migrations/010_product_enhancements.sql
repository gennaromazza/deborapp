-- ============================================
-- Migration 010: Product Enhancements
-- ============================================
-- Adds: category, tags, price_tier, usage_context columns to products
-- Creates: pricing_tiers table for the "coffee" level system
-- ============================================

-- 1. Nuove colonne alla tabella products
ALTER TABLE products ADD COLUMN IF NOT EXISTS category TEXT DEFAULT 'attivita-stampabili';
ALTER TABLE products ADD COLUMN IF NOT EXISTS tags TEXT[] DEFAULT '{}';
ALTER TABLE products ADD COLUMN IF NOT EXISTS price_tier TEXT DEFAULT 'single';
ALTER TABLE products ADD COLUMN IF NOT EXISTS usage_context TEXT DEFAULT 'da-stampare';

-- 2. Tabella pricing_tiers (livelli caffe)
CREATE TABLE IF NOT EXISTS pricing_tiers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tier_key TEXT NOT NULL UNIQUE,
  display_name TEXT NOT NULL,
  subtitle TEXT,
  description TEXT NOT NULL,
  price_cents INTEGER NOT NULL,
  price_display TEXT NOT NULL,
  stripe_payment_link TEXT,
  product_count INTEGER NOT NULL,
  features TEXT[] NOT NULL DEFAULT '{}',
  is_recommended BOOLEAN DEFAULT false,
  icon TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS per pricing_tiers
ALTER TABLE pricing_tiers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Pricing tiers leggibili da tutti"
  ON pricing_tiers FOR SELECT
  USING (is_active = true);

-- 3. Inserimento livelli caffe predefiniti
INSERT INTO pricing_tiers (tier_key, display_name, subtitle, description, price_cents, price_display, product_count, features, is_recommended, icon, sort_order)
VALUES
  (
    'un-caffe',
    'Un Caffè',
    'Per iniziare',
    'Scegli un''attività e portala a casa. Un momento speciale, tutto vostro.',
    390,
    '3,90',
    1,
    ARRAY['1 attività a scelta', 'Accesso immediato', 'Stampa o usa online', 'Perfetto per provare'],
    false,
    'coffee',
    1
  ),
  (
    'caffe-cornetto',
    'Caffè & Cornetto',
    'Il più scelto',
    'Due attività da vivere insieme. Più scelta, più sorrisi, più tempo di qualità.',
    690,
    '6,90',
    2,
    ARRAY['2 attività a scelta', 'Accesso immediato', 'Stampa o usa online', 'Risparmi rispetto al singolo', 'Il preferito dai genitori'],
    true,
    'coffee-croissant',
    2
  ),
  (
    'colazione-completa',
    'Colazione Completa',
    'Per famiglie curiose',
    'Quattro attività per una settimana di scoperte. Il kit perfetto per il tempo insieme.',
    1290,
    '12,90',
    4,
    ARRAY['4 attività a scelta', 'Accesso immediato', 'Stampa o usa online', 'Mix interattivo + stampabile', 'Ideale per il weekend'],
    false,
    'full-breakfast',
    3
  ),
  (
    'la-merenda',
    'La Merenda',
    'Il pacchetto completo',
    'Tutto il catalogo a disposizione. Per chi vuole il massimo della creatività.',
    2490,
    '24,90',
    999,
    ARRAY['Tutte le attività', 'Accesso immediato', 'Stampa o usa online', 'Anteprime esclusive', 'Aggiornamenti futuri inclusi'],
    false,
    'snack',
    4
  )
ON CONFLICT (tier_key) DO NOTHING;

-- 4. Index per performance
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_price_tier ON products(price_tier);
CREATE INDEX IF NOT EXISTS idx_products_usage_context ON products(usage_context);
