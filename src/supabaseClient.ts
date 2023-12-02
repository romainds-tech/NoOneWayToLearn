import { createClient } from '@supabase/supabase-js';
import { DEFAULT_HEADERS } from '@supabase/supabase-js/dist/main/lib/constants';
import { supaStore } from '$lib/store/supaStore';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
	auth: {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		storage: supaStore.set('token'),
		autoRefreshToken: true,
		persistSession: true,
		detectSessionInUrl: true
	},
	global: {
		headers: DEFAULT_HEADERS
	}
});
