import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders })
    }

    try {
        const { input } = await req.json()
        const OPENROUTER_API_KEY = Deno.env.get("OPENROUTER_API_KEY")

        if (!OPENROUTER_API_KEY) {
            return new Response(JSON.stringify({ error: "Chiave API mancante nei Secrets" }), {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                status: 500
            })
        }

        const systemPrompt = `Sei l'Architetto del Sistema Sovrano. Il tuo compito è analizzare l'elenco fornito dall'utente e categorizzare ogni elemento in uno dei 4 quadranti del potenziale umano. 
Rispondi ESCLUSIVAMENTE con un oggetto JSON valido in lingua ITALIANA.
Formato: {"ritual":[],"sandbox":[],"mischief":[],"craft":[]}`;

        // Usiamo un modello super-stabile e testato 
        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
            },
            body: JSON.stringify({
                model: "google/gemini-2.0-flash-001",
                messages: [
                    { role: 'system', content: systemPrompt },
                    { role: 'user', content: input }
                ],
                temperature: 0.5
            })
        })

        const data = await response.json()

        if (data.error) {
            // Se fallisce, usiamo un fallback affidabile (Liquid o Mistral v3) 
            const retryResponse = await fetch('https://openrouter.ai/api/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
                },
                body: JSON.stringify({
                    model: "liquid/lfm-32b",
                    messages: [
                        { role: 'system', content: systemPrompt },
                        { role: 'user', content: input }
                    ],
                    temperature: 0.5
                })
            })
            const retryData = await retryResponse.json()
            if (retryData.error) {
                return new Response(JSON.stringify({ error: `AI Error: ${retryData.error.message || "Errore sconosciuto"}` }), {
                    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                    status: 400
                })
            }
            const content = retryData.choices[0].message.content
            const jsonMatch = content.match(/\{[\s\S]*\}/)
            if (!jsonMatch) throw new Error("Risposta AI non valida")
            return new Response(jsonMatch[0], {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                status: 200,
            })
        }

        const content = data.choices[0].message.content
        const jsonMatch = content.match(/\{[\s\S]*\}/)

        if (!jsonMatch) throw new Error("Risposta AI non valida")

        return new Response(jsonMatch[0], {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 200,
        })

    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 400,
        })
    }
})
