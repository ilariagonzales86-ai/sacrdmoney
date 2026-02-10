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
        const { craftItems } = await req.json()
        const OPENROUTER_API_KEY = Deno.env.get("OPENROUTER_API_KEY")

        if (!OPENROUTER_API_KEY) {
            return new Response(JSON.stringify({ error: "Chiave API mancante nei Secrets" }), {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                status: 500
            })
        }

        const systemPrompt = `Sei un Esperto di Posizionamento di Mercato. Genera 3 titoli di mercato premium e autoritari in ITALIANO.
Rispondi SOLO con JSON nel formato: {"titles":["Titolo1","Titolo2","Titolo3"]}`;

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
                    { role: 'user', content: `Competenze: ${craftItems.join(', ')}` }
                ],
                temperature: 0.7
            })
        })

        const data = await response.json()

        if (data.error) {
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
                        { role: 'user', content: `Competenze: ${craftItems.join(', ')}` }
                    ],
                    temperature: 0.7
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
