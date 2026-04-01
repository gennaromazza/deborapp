-- =====================================================
-- MIGRAZIONE 012: Stripe payment link per prodotto
-- =====================================================

ALTER TABLE products ADD COLUMN IF NOT EXISTS stripe_payment_link TEXT;
CREATE INDEX IF NOT EXISTS idx_products_stripe_link ON products(stripe_payment_link) WHERE stripe_payment_link IS NOT NULL;
