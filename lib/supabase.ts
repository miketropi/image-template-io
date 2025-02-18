// lib/supabase.ts
import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";

export const supabase = createPagesBrowserClient();

supabase.auth.onAuthStateChange((event, session) => {
  console.log('Auth state changed:', event, session);
});