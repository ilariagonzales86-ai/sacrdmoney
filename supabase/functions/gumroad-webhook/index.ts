import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

serve(async (req) => {
    try {
        // 1. Check if it's a POST request
        if (req.method !== 'POST') {
            return new Response('Method not allowed', { status: 405 })
        }

        // 2. Parse the body from Gumroad (it's often URL-encoded, but Supabase can handle JSON too)
        // Gumroad usually sends application/x-www-form-urlencoded
        const contentType = req.headers.get('content-type') || ''
        let payload: any = {}

        if (contentType.includes('application/x-www-form-urlencoded')) {
            const formData = await req.formData()
            payload = Object.fromEntries(formData.entries())
        } else {
            payload = await req.json()
        }

        console.log('Gumroad Webhook received:', payload)

        const { email, license_key, sale_id, product_name } = payload

        if (!license_key) {
            return new Response('No license key found in payload', { status: 400 })
        }

        // 3. Initialize Supabase Client with Service Role Key (to bypass RLS)
        const supabaseClient = createClient(
            Deno.env.get('SUPABASE_URL') ?? '',
            Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
        )

        // 4. Insert the license key into our access_keys table
        const { error } = await supabaseClient
            .from('access_keys')
            .insert([
                {
                    key: license_key,
                    is_used: false,
                    // Optional: you can store more info in the table if you add columns
                    // meta: { email, sale_id, product_name } 
                }
            ])

        if (error) {
            console.error('Error inserting key:', error)
            // If it's a duplicate key error, we can ignore it (success) or handle it
            if (error.code === '23505') {
                return new Response('Key already exists', { status: 200 })
            }
            return new Response('Error processing webhook', { status: 500 })
        }

        return new Response('Webhook processed successfully', { status: 200 })

    } catch (error) {
        console.error('Webhook error:', error.message)
        return new Response('Internal Server Error', { status: 500 })
    }
})
