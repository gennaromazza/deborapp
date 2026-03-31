-- FIX 1: Aggiungi colonna cover_images
ALTER TABLE products ADD COLUMN IF NOT EXISTS cover_images JSONB DEFAULT '[]'::jsonb;

-- FIX 2: Crea bucket DigitalProduct se non esiste
INSERT INTO storage.buckets (id, name, public)
VALUES ('DigitalProduct', 'DigitalProduct', true)
ON CONFLICT (id) DO NOTHING;

-- FIX 3: Policy per utenti anon (il tuo admin non ha login, usa chiave anonima)
DROP POLICY IF EXISTS "Authenticated users can upload product covers" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update product covers" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete product covers" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can view product covers" ON storage.objects;

CREATE POLICY "Anon can upload product covers"
  ON storage.objects FOR INSERT
  TO anon, authenticated
  WITH CHECK (bucket_id = 'DigitalProduct');

CREATE POLICY "Anon can update product covers"
  ON storage.objects FOR UPDATE
  TO anon, authenticated
  USING (bucket_id = 'DigitalProduct');

CREATE POLICY "Anon can delete product covers"
  ON storage.objects FOR DELETE
  TO anon, authenticated
  USING (bucket_id = 'DigitalProduct');

CREATE POLICY "Anyone can view product covers"
  ON storage.objects FOR SELECT
  TO public
  USING (bucket_id = 'DigitalProduct');
