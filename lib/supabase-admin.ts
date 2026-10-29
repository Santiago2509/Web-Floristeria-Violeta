import { createClient } from '@supabase/supabase-js'
import { supabase } from './supabase'

// Cliente para ESCRITURAS (solo servidor). Usa la service role key si existe,
// lo que permite bloquear con RLS cualquier escritura con la clave pública.
// Sin la variable, cae al cliente público (comportamiento anterior).
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

export const supabaseAdmin = serviceRoleKey
  ? createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, serviceRoleKey, {
      auth: { persistSession: false },
    })
  : supabase
