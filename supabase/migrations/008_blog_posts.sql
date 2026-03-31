-- Migration 008: Blog Posts (versione standalone)
-- Skippa se esiste già, altrimenti crea tutto

-- Tabella blog_posts (solo se non esiste)
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  featured_image TEXT,
  author_image TEXT DEFAULT '/author_family.png',
  author_name TEXT DEFAULT 'Debora di Bellucci',
  category TEXT DEFAULT 'Generale',
  tags TEXT[] DEFAULT '{}',
  meta_title TEXT,
  meta_description TEXT,
  is_published BOOLEAN DEFAULT false,
  is_featured BOOLEAN DEFAULT false,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indici per SEO e performance
CREATE INDEX IF NOT EXISTS idx_blog_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_published ON blog_posts(is_published, published_at DESC);
CREATE INDEX IF NOT EXISTS idx_blog_category ON blog_posts(category);
CREATE INDEX IF NOT EXISTS idx_blog_featured ON blog_posts(is_featured, is_published);

-- Trigger per updated_at automatico
CREATE OR REPLACE FUNCTION update_blog_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_blog_posts_updated_at ON blog_posts;
CREATE TRIGGER update_blog_posts_updated_at
  BEFORE UPDATE ON blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION update_blog_updated_at();

-- Row Level Security
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Policy: tutti possono leggere articoli pubblicati
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Blog pubblico leggibile' AND tablename = 'blog_posts') THEN
    CREATE POLICY "Blog pubblico leggibile"
      ON blog_posts FOR SELECT
      USING (is_published = true);
  END IF;
END $$;

-- Policy: articoli modificabili solo da authenticated
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Blog modificabile da admin' AND tablename = 'blog_posts') THEN
    CREATE POLICY "Blog modificabile da admin"
      ON blog_posts FOR ALL
      USING (auth.role() = 'authenticated');
  END IF;
END $$;

-- Crea bucket per immagini blog
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM storage.buckets WHERE id = 'blog-images') THEN
    INSERT INTO storage.buckets (id, name, public, created_at, updated_at)
    VALUES ('blog-images', 'blog-images', true, NOW(), NOW());
  END IF;
END $$;

-- Policy per blog-images
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Anyone can view blog images' AND tablename = 'objects') THEN
    CREATE POLICY "Anyone can view blog images"
      ON storage.objects FOR SELECT
      USING (bucket_id = 'blog-images');
  END IF;
END $$;