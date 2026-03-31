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
    const { first_name, last_name, email, product_id, pin, resend } = await req.json()

    if (!first_name || !last_name || !email || !product_id || !pin) {
      return new Response(
        JSON.stringify({ error: 'Campi obbligatori mancanti' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const { data: product, error: productError } = await supabase
      .from('products')
      .select('title, download_link')
      .eq('id', product_id)
      .single()

    if (productError || !product) {
      return new Response(
        JSON.stringify({ error: 'Prodotto non trovato' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    if (!resend) {
      const { error: insertError } = await supabase
        .from('users')
        .insert([{ first_name, last_name, email, pin, product_id }])

      if (insertError) {
        return new Response(
          JSON.stringify({ error: 'Errore salvataggio utente: ' + insertError.message }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }
    }

    const emailHtml = `
      <div style="font-family: 'Nunito', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; background: #FFF8F0; border-radius: 24px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <span style="font-size: 48px;">🌟</span>
        </div>
        <h1 style="color: #E8B4C8; font-size: 28px; text-align: center; margin-bottom: 10px;">
          Ciao ${first_name}!
        </h1>
        <p style="color: #6B6B6B; font-size: 16px; text-align: center; line-height: 1.6;">
          Grazie per aver acquistato <strong style="color: #C4B0D8;">${product.title}</strong>.<br>
          Ecco il tuo codice di accesso personale:
        </p>
        <div style="text-align: center; margin: 30px 0;">
          <span style="display: inline-block; background: linear-gradient(135deg, #F8E8EE, #E8E0F0); padding: 16px 40px; border-radius: 16px; font-size: 32px; font-weight: bold; letter-spacing: 8px; color: #C4B0D8; font-family: monospace;">
            ${pin}
          </span>
        </div>
        <p style="color: #6B6B6B; font-size: 14px; text-align: center; line-height: 1.6;">
          Visita il sito e inserisci questo PIN nella pagina "Accedi con PIN" per sbloccare il tuo prodotto.
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

    await sendEmail(
      email,
      `Il tuo codice di accesso per "${product.title}"`,
      emailHtml
    )

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
