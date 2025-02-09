// lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASEURL ?? (() => { throw new Error('Missing SUPABASE_URL') })();
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASEKEY ?? (() => { throw new Error('Missing SUPABASE_KEY') })();

export const supabase = createClient(supabaseUrl, supabaseKey);

supabase.auth.onAuthStateChange((event, session) => {
  console.log('Auth state changed:', event, session);
});