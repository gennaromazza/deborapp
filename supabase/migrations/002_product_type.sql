-- Add type column to products (app or link)
ALTER TABLE products ADD COLUMN IF NOT EXISTS type TEXT DEFAULT 'link';

-- Add chapters JSONB column for app-type products
ALTER TABLE products ADD COLUMN IF NOT EXISTS chapters_data JSONB;

-- Update existing products to be 'link' type
UPDATE products SET type = 'link' WHERE type IS NULL;
