import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.47.10'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

async function sendEmail(to: string, subject: string, html: string) {
  const resendKey = Deno.env.get('RESEND_API_KEY')
  const fromEmail = Deno.env.get('EMAIL_FROM') || 'onboarding@resend.dev'

  if (!resendKey) {
    throw new Error('RESEND_API_KEY non configurata')
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${resendKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: `Debora di Bellucci <${fromEmail}>`,
      to,
      subject,
      html,
    }),
  })

  if (!res.ok) {
    const err = await res.json()
    throw new Error(`Errore invio email: ${err.message || JSON.stringify(err)}`)
  }

  return await res.json()
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const body = await req.json()
    const { first_name, last_name, email, pin, resend } = body

    // Supporta sia product_ids (array) che product_id (singolo, legacy)
    let productIds: string[] = body.product_ids || []
    if (!productIds.length && body.product_id) {
      productIds = [body.product_id]
    }

    if (!first_name || !last_name || !email || !pin || productIds.length === 0) {
      return new Response(
        JSON.stringify({ error: 'Campi obbligatori mancanti' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Recupera tutti i prodotti
    const { data: products, error: productsError } = await supabase
      .from('products')
      .select('id, title, download_link')
      .in('id', productIds)

    if (productsError || !products || products.length === 0) {
      return new Response(
        JSON.stringify({ error: 'Prodotti non trovati' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    let userId: string

    if (!resend) {
      // Inserisci utente con product_ids come array (per riferimento rapido)
      const { data: insertedUser, error: insertError } = await supabase
        .from('users')
        .insert([{
          first_name,
          last_name,
          email,
          pin,
          product_ids: productIds,
          product_id: productIds[0], // legacy: primo prodotto
        }])
        .select('id')
        .single()

      if (insertError || !insertedUser) {
        return new Response(
          JSON.stringify({ error: 'Errore salvataggio utente: ' + insertError?.message }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }

      userId = insertedUser.id

      // Inserisci relazioni in customer_products
      const customerProductsRows = productIds.map((productId: string) => ({
        customer_id: userId,
        product_id: productId,
      }))

      const { error: cpError } = await supabase
        .from('customer_products')
        .insert(customerProductsRows)

      if (cpError) {
        return new Response(
          JSON.stringify({ error: 'Errore salvataggio relazioni prodotti: ' + cpError.message }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }
    } else {
      // Reinvio: trova utente esistente
      const { data: existingUser } = await supabase
        .from('users')
        .select('id')
        .eq('pin', pin)
        .single()

      if (!existingUser) {
        return new Response(
          JSON.stringify({ error: 'Utente non trovato per il PIN fornito' }),
          { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }

      userId = existingUser.id
    }

    // Costruisci la lista prodotti per l'email
    const productListHtml = products.map((p) => `
      <tr>
        <td style="padding: 8px 0; border-bottom: 1px dashed #F8E8EE; color: #6B6B6B; font-size: 14px;">
          ${p.title}
        </td>
      </tr>
    `).join('')

    const emailSubject = products.length === 1
      ? `Il tuo codice di accesso per "${products[0].title}"`
      : `I tuoi codici di accesso - ${products.length} attività`

    const emailHtml = `
      <div style="font-family: 'Nunito', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; background: #FFF8F0; border-radius: 24px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <span style="font-size: 48px;">🌟</span>
        </div>
        <h1 style="color: #E8B4C8; font-size: 28px; text-align: center; margin-bottom: 10px;">
          Ciao ${first_name}!
        </h1>
        <p style="color: #6B6B6B; font-size: 16px; text-align: center; line-height: 1.6;">
          Grazie per il tuo acquisto! Ecco il tuo codice di accesso personale:
        </p>
        <div style="text-align: center; margin: 30px 0;">
          <span style="display: inline-block; background: linear-gradient(135deg, #F8E8EE, #E8E0F0); padding: 16px 40px; border-radius: 16px; font-size: 32px; font-weight: bold; letter-spacing: 8px; color: #C4B0D8; font-family: monospace;">
            ${pin}
          </span>
        </div>
        <p style="color: #6B6B6B; font-size: 16px; text-align: center; line-height: 1.6;">
          Questo PIN sblocca le seguenti <strong style="color: #C4B0D8;">${products.length} attività</strong>:
        </p>
        <div style="text-align: center; margin: 20px 0;">
          <table style="margin: 0 auto; width: 100%; max-width: 400px;">
            ${productListHtml}
          </table>
        </div>
        <p style="color: #6B6B6B; font-size: 14px; text-align: center; line-height: 1.6;">
          Visita il sito e inserisci questo PIN nella pagina "Accedi con PIN" per sbloccare tutte le tue attività.
        </p>
        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #F8E8EE;">
          <p style="color: #A0A0A0; font-size: 12px;">
            Con affetto,<br>
            <strong style="color: #E8B4C8;">Debora di Bellucci</strong><br>
            <em>Creatrice di contenuti digitali per bambini</em>
          </p>
        </div>
      </div>
    `

    await sendEmail(email, emailSubject, emailHtml)

    return new Response(
      JSON.stringify({ success: true, message: 'PIN generato e email inviata' }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message || 'Errore interno del server' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
