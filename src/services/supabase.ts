import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });
    if (error) throw error;
    return data;
}

export async function signUp(email: string, password: string) {
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
    });
    if (error) throw error;
    return data;
}

export async function signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
}

export async function validateAccessKey(key: string) {
    const { data, error } = await supabase
        .from('access_keys')
        .select('*')
        .eq('key', key)
        .eq('is_used', false)
        .single();

    if (error || !data) return false;
    return true;
}

export async function useAccessKey(key: string, userId: string) {
    const { error } = await supabase
        .from('access_keys')
        .update({ is_used: true, used_by: userId })
        .eq('key', key);

    if (error) throw error;
}

export async function analyzeQuadrants(input: string) {
    const { data, error } = await supabase.functions.invoke('analyze-quadrants', {
        body: { input }
    });

    if (error) throw new Error(error.message || 'Errore analisi Supabase');
    return data;
}

export async function generateMarketTitles(craftItems: any[]) {
    const { data, error } = await supabase.functions.invoke('generate-market-titles', {
        body: { craftItems }
    });

    if (error) throw new Error(error.message || 'Errore titoli Supabase');

    // L'Edge Function restituisce { titles: [...] }
    if (data && data.titles) return data.titles;
    if (Array.isArray(data)) return data;

    throw new Error('Formato titoli non valido');
}
