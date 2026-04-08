import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.47.10'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { pin } = await req.json()

    if (!pin || pin.length !== 6) {
      return new Response(
        JSON.stringify({ error: 'PIN non valido' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Verifica utente con PIN e ottieni tutti i prodotti acquistati
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('pin', pin)
      .eq('is_active', true)
      .single()

    if (userError || !user) {
      return new Response(
        JSON.stringify({ error: 'PIN non trovato o non attivo' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Ottieni tutti i prodotti acquistati da questo cliente
    const { data: customerProducts, error: productsError } = await supabase
      .from('customer_products')
      .select(`
        products (
          id,
          title,
          description,
          download_link,
          type,
          cover_image,
          slug,
          category
        )
      `)
      .eq('customer_id', user.id)

    const products = customerProducts?.map(cp => cp.products).filter(Boolean) || []

    // Se non ci sono prodotti nella tabella customer_products, usa il vecchio metodo (product_id direttamente su users)
    let finalProducts = products
    if (finalProducts.length === 0 && user.product_id) {
      const { data: legacyProduct } = await supabase
        .from('products')
        .select('id, title, description, download_link, type, cover_image, slug, category')
        .eq('id', user.product_id)
        .single()
      
      if (legacyProduct) {
        finalProducts = [legacyProduct]
      }
    }

    // Determina tipo di risposta
    if (finalProducts.length === 1 && finalProducts[0].type === 'app') {
      // È un'app: naviga direttamente al prodotto
      return new Response(
        JSON.stringify({
          type: 'app',
          customer_name: user.first_name,
          products: finalProducts,
        }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // È un documento: mostra la lista dei prodotti
    return new Response(
      JSON.stringify({
        type: 'products',
        customer_name: user.first_name,
        products: finalProducts,
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (err) {
    return new Response(
      JSON.stringify({ error: 'Errore interno del server' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
