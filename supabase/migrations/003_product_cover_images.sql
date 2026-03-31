-- Add cover_images JSONB column for multiple product images
ALTER TABLE products ADD COLUMN IF NOT EXISTS cover_images JSONB DEFAULT '[]'::jsonb;
