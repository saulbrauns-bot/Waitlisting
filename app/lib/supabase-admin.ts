import { createClient } from '@supabase/supabase-js';
import { getEnv } from './requireEnv';

/**
 * Supabase admin client using service role key.
 * This client bypasses RLS and should ONLY be used in server-side code.
 * Never expose this client or the service role key to the browser.
 */

// Validate and get required environment variables
const supabaseUrl = getEnv('SUPABASE_URL');
const supabaseServiceRoleKey = getEnv('SUPABASE_SERVICE_ROLE_KEY');

// Create singleton admin client
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});
