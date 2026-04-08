-- Aggiungi il prodotto Kid Learning Hub (app digitale)
INSERT INTO products (title, description, slug, type, download_link, cover_image)
SELECT
  'Kid Learning Hub',
  'Hub educativo interattivo per bambini con attività di matematica e apprendimento attraverso il gioco.',
  'kid-learning-hub',
  'app',
  '#',
  '/kid-learning-hub/opengraph.jpg'
WHERE NOT EXISTS (
  SELECT 1 FROM products WHERE slug = 'kid-learning-hub'
);
