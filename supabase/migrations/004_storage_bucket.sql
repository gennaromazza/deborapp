-- Create storage bucket for product cover images
INSERT INTO storage.buckets (id, name, public)
VALUES ('DigitalProduct', 'DigitalProduct', true)
ON CONFLICT (id) DO NOTHING;

-- Allow authenticated users to upload product covers
CREATE POLICY "Authenticated users can upload product covers"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'DigitalProduct');

-- Allow authenticated users to update product covers
CREATE POLICY "Authenticated users can update product covers"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'DigitalProduct');

-- Allow authenticated users to delete product covers
CREATE POLICY "Authenticated users can delete product covers"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'DigitalProduct');

-- Allow public read access to product covers
CREATE POLICY "Anyone can view product covers"
  ON storage.objects FOR SELECT
  TO public
  USING (bucket_id = 'DigitalProduct');
