import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  console.log('=== GENERATE BLOG POST STARTED ===')
  
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    console.log('Parsing request body...')
    const body = await req.json()
    const { title, category, length, customPrompt } = body
    console.log('Body parsed:', { title, category, length, customPrompt })

    if (!title) {
      console.log('Missing title')
      return new Response(
        JSON.stringify({ error: 'Titolo obbligatorio' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    console.log('Getting GROQ_API_KEY...')
    const groqKey = Deno.env.get('GROQ_API_KEY')
    console.log('GROQ_API_KEY exists:', !!groqKey)
    console.log('GROQ_API_KEY starts with:', groqKey?.substring(0, 10) + '...')
    
    if (!groqKey) {
      return new Response(
        JSON.stringify({ error: 'Groq API key non configurata' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const lengthMap: Record<string, string> = {
      short: '400-600 parole',
      medium: '600-900 parole',
      long: '900-1200 parole',
    }

    const targetLength = lengthMap[length] || lengthMap.medium

    const systemPrompt = `Sei un esperto scrittore di blog e SEO per un sito italiano dedicato a contenuti educativi per bambini. Il tuo compito è scrivere articoli SEO-friendly, coinvolgenti e ben strutturati.

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
14. Usa un linguaggio semplice ma non infantile

Devi restituire un oggetto JSON con questa struttura ESATTA:
{
  "content": "il contenuto HTML dell'articolo",
  "excerpt": "un riassunto di 150-200 caratteri dell'articolo",
  "slug": "url-slug-del-titolo-in-italiano",
  "tags": ["tag1", "tag2", "tag3"],
  "meta_title": "titolo SEO ottimizzato (max 60 caratteri)",
  "meta_description": "meta description SEO (max 160 caratteri)",
  "category": "categoria più appropriata tra: Educazione, Giochi, Attività, Crescita, Scuola, Famiglia, Creatività, Generale"
}

IMPORTANTE: Restituisci SOLO il JSON valido, senza testo aggiuntivo, senza markdown code blocks.`

    const userPrompt = `Scrivi un articolo completo per il blog su: "${title}"

Categoria suggerita: ${category || 'Generale'}
Lunghezza target: ${targetLength}

${customPrompt ? `Istruzioni aggiuntive: ${customPrompt}` : ''}

Struttura consigliata:
- Introduzione accattivante (1-2 paragrafi)
- 3-5 sezioni principali con <h2>
- Ogni sezione con 2-3 paragrafi
- Conclusione con consiglio pratico

Genera TUTTI i campi richiesti nel JSON:
- content: contenuto HTML completo
- excerpt: riassunto breve (150-200 caratteri)
- slug: URL slug dal titolo (es: "giochi-educativi-bambini")
- tags: array di 5-8 tag pertinenti
- meta_title: titolo SEO ottimizzato (max 60 caratteri)
- meta_description: meta description SEO (max 160 caratteri)
- category: la categoria più appropriata

Importante: restituisci SOLO il JSON valido, senza testo aggiuntivo.`

    console.log('Calling Groq API...')
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

    console.log('Groq response status:', response.status)

    if (!response.ok) {
      const errorText = await response.text()
      console.log('Groq error:', errorText)
      return new Response(
        JSON.stringify({ 
          error: `Groq API error (${response.status}): ${errorText}` 
        }),
        { status: response.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const data = await response.json()
    const content = data.choices?.[0]?.message?.content || ''
    console.log('Content generated, length:', content.length)

    // Parse JSON response
    try {
      let cleanedContent = content.trim()
      // Remove markdown code blocks if present
      cleanedContent = cleanedContent.replace(/^```json\s*/i, '').replace(/^```\s*/i, '').replace(/\s*```$/i, '')
      
      const parsed = JSON.parse(cleanedContent)
      
      return new Response(
        JSON.stringify({
          content: parsed.content || '',
          excerpt: parsed.excerpt || '',
          slug: parsed.slug || '',
          tags: parsed.tags || [],
          meta_title: parsed.meta_title || '',
          meta_description: parsed.meta_description || '',
          category: parsed.category || category || 'Generale',
        }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    } catch (parseError) {
      console.log('Failed to parse JSON response, returning raw content')
      return new Response(
        JSON.stringify({ content }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Errore sconosciuto'
    console.log('Error:', errorMessage)
    return new Response(
      JSON.stringify({ error: `Errore interno: ${errorMessage}` }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
