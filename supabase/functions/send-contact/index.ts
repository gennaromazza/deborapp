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

function isTestModeEmail(email: string): boolean {
  const allowedEmail = Deno.env.get('ADMIN_EMAIL') || 'deboradibelluccidigital@gmail.com'
  return email.toLowerCase() !== allowedEmail.toLowerCase()
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { name, email, subject, message } = await req.json()

    if (!name || !email || !subject || !message) {
      return new Response(
        JSON.stringify({ error: 'Campi obbligatori mancanti' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const { error: insertError } = await supabase
      .from('contact_messages')
      .insert([{ name, email, subject, message }])

    if (insertError) {
      console.error('Errore salvataggio messaggio:', insertError.message)
    }

    const emailHtml = `
      <div style="font-family: 'Nunito', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; background: #FFF8F0; border-radius: 24px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <span style="font-size: 48px;">💌</span>
        </div>
        <h1 style="color: #E8B4C8; font-size: 24px; text-align: center; margin-bottom: 10px;">
          Nuovo messaggio dal sito
        </h1>
        <div style="background: white; border-radius: 16px; padding: 24px; margin: 20px 0;">
          <p style="color: #6B6B6B; font-size: 14px; margin: 0 0 12px 0;">
            <strong>Da:</strong> ${name}
          </p>
          <p style="color: #6B6B6B; font-size: 14px; margin: 0 0 12px 0;">
            <strong>Email:</strong> ${email}
          </p>
          <p style="color: #6B6B6B; font-size: 14px; margin: 0 0 12px 0;">
            <strong>Oggetto:</strong> ${subject}
          </p>
          <hr style="border: none; border-top: 1px solid #F8E8EE; margin: 16px 0;" />
          <p style="color: #4B4B4B; font-size: 15px; line-height: 1.7; margin: 0;">
            ${message.replace(/\n/g, '<br>')}
          </p>
        </div>
        <div style="text-align: center; margin-top: 20px; padding-top: 20px; border-top: 1px solid #F8E8EE;">
          <p style="color: #A0A0A0; font-size: 12px;">
            Messaggio inviato dal sito Debora di Bellucci
          </p>
        </div>
      </div>
    `

    const adminEmail = Deno.env.get('ADMIN_EMAIL') || 'deboradibelluccidigital@gmail.com'
    const emailWarnings: string[] = []

    try {
      await sendEmail(adminEmail, `[Sito] ${subject}`, emailHtml)
    } catch (emailErr) {
      console.error('Errore invio email admin:', emailErr)
      emailWarnings.push('admin')
    }

    const confirmationHtml = `
      <div style="font-family: 'Nunito', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; background: #FFF8F0; border-radius: 24px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <span style="font-size: 48px;">✨</span>
        </div>
        <h1 style="color: #E8B4C8; font-size: 24px; text-align: center; margin-bottom: 10px;">
          Ciao ${name}!
        </h1>
        <p style="color: #6B6B6B; font-size: 16px; text-align: center; line-height: 1.6;">
          Grazie per avermi scritto! Ho ricevuto il tuo messaggio riguardo "<strong>${subject}</strong>".
        </p>
        <p style="color: #6B6B6B; font-size: 16px; text-align: center; line-height: 1.6;">
          Ti risponderò il prima possibile, entro 24-48 ore.
        </p>
        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #F8E8EE;">
          <p style="color: #A0A0A0; font-size: 12px;">
            Con affetto,<br>
            <strong style="color: #E8B4C8;">Debora di Bellucci</strong>
          </p>
        </div>
      </div>
    `

    try {
      if (isTestModeEmail(email)) {
        console.warn(`Modalità testing Resend: email di conferma non inviata a ${email}`)
      } else {
        await sendEmail(email, 'Messaggio ricevuto! ✨', confirmationHtml)
      }
    } catch (emailErr) {
      console.error('Errore invio email conferma:', emailErr)
      emailWarnings.push('conferma')
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Messaggio inviato con successo',
        emailWarnings: emailWarnings.length > 0 ? emailWarnings : undefined
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (err) {
    console.error('Errore send-contact:', err)
    return new Response(
      JSON.stringify({ error: err.message || 'Errore interno del server' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
