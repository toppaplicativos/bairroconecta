import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabasePublishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

export function createSupabaseServerClient() {
  if (!supabaseUrl) {
    throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL environment variable.');
  }

  if (!supabasePublishableKey) {
    throw new Error('Missing NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY environment variable.');
  }

  return createClient(supabaseUrl, supabasePublishableKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

