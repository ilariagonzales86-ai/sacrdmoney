import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function analyzeQuadrants(input) {
    const { data, error } = await supabase.functions.invoke('analyze-quadrants', {
        body: { input }
    });

    if (error) throw new Error(error.message || 'Errore analisi Supabase');
    return data;
}

export async function generateMarketTitles(craftItems) {
    const { data, error } = await supabase.functions.invoke('generate-market-titles', {
        body: { craftItems }
    });

    if (error) throw new Error(error.message || 'Errore titoli Supabase');

    // L'Edge Function restituisce { titles: [...] }
    if (data && data.titles) return data.titles;
    if (Array.isArray(data)) return data;

    throw new Error('Formato titoli non valido');
}
