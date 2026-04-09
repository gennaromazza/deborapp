-- Aggiungi il prodotto "Imparando le Divisioni con un Dinosauro - Vol. 1"
INSERT INTO products (title, description, slug, type, download_link, cover_image)
SELECT
  'Imparando le Divisioni con un Dinosauro - Vol. 1',
  'Gioco educativo interattivo per bambini: impara le divisioni giocando con il tuo branco di dinosauri! 12 livelli avventura, 4 mondi tematici, voce narrante in italiano e 4 modalità di gioco diverse.',
  'imparando-le-divisioni-vol-1',
  'app',
  '#',
  NULL
WHERE NOT EXISTS (
  SELECT 1 FROM products WHERE slug = 'imparando-le-divisioni-vol-1'
);
