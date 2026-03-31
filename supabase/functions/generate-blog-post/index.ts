import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { title, category, length, customPrompt } = await req.json()

    if (!title) {
      return new Response(
        JSON.stringify({ error: 'Titolo obbligatorio' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const groqKey = Deno.env.get('GROQ_API_KEY')
    if (!groqKey) {
      return new Response(
        JSON.stringify({ error: 'Groq API key non configurata' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const lengthMap = {
      short: '400-600 parole',
      medium: '600-900 parole',
      long: '900-1200 parole',
    }

    const targetLength = lengthMap[length] || lengthMap.medium

    const systemPrompt = `Sei un esperto scrittore di blog per un sito italiano dedicato a contenuti educativi per bambini. Il tuo compito è scrivere articoli SEO-friendly, coinvolgenti e ben strutturati.

Regole IMPORTANTI:
1. Scrivi SEMPRE in italiano
2. Usa HTML per formattare il contenuto (NON markdown)
3. Struttura con heading corretti: <h2> per sezioni principali, <h3> per sottosezioni
4. Usa <strong> per enfatizzare parole chiave importanti
5. Usa <em> per corsivo quando appropriato
6. Usa <ul> e <li> per liste quando utile
7. Usa <blockquote> per citazioni o consigli importanti
8. Paragrafi brevi (3-5 frasi max) per leggibilità
9. Includi una conclusione con call-to-action
10. NON includere <html>, <head>, <body> - solo il contenuto dell'articolo
11. NON includere il titolo dell'articolo nel contenuto (verrà aggiunto separatamente)
12. Il tono deve essere amichevole, informativo e accessibile a genitori e insegnanti
13. Includi consigli pratici e concreti
14. Usa un linguaggio semplice ma non infantile`

    const userPrompt = `Scrivi un articolo per il blog su: "${title}"

Categoria: ${category || 'Generale'}
Lunghezza target: ${targetLength}

${customPrompt ? `Istruzioni aggiuntive: ${customPrompt}` : ''}

Struttura consigliata:
- Introduzione accattivante (1-2 paragrafi)
- 3-5 sezioni principali con <h2>
- Ogni sezione con 2-3 paragrafi
- Conclusione con consiglio pratico

Importante: restituisci SOLO il contenuto HTML, senza tag html/head/body.`

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${groqKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
        temperature: 0.7,
        max_tokens: 4096,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      return new Response(
        JSON.stringify({ error: errorData.error?.message || 'Errore Groq API' }),
        { status: response.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const data = await response.json()
    const content = data.choices?.[0]?.message?.content || ''

    return new Response(
      JSON.stringify({ content }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (err) {
    return new Response(
      JSON.stringify({ error: 'Errore interno del server' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
