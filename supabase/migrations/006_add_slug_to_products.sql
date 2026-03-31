-- Aggiungi colonna slug alla tabella products
ALTER TABLE products ADD COLUMN IF NOT EXISTS slug TEXT;

-- Aggiorna il prodotto esistente con lo slug corretto
UPDATE products 
SET slug = 'libro-matematica-volume-1' 
WHERE id = '5a2eca16-80a1-410b-8086-143e48cc99e0';

-- Crea index per ricerche veloci
CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);
