import { createClient } from '@supabase/supabase-js';

class SupabaseService {
  constructor() {
    if (!SupabaseService.instance) {
      SupabaseService.instance = this;
      this.supabaseUrl = 'https://yvaucfmxcakuggbsfptb.supabase.co';
      this.supabaseKey = process.env.SUPABASE_KEY;
      this.client = createClient(this.supabaseUrl, this.supabaseKey);
    }

    return SupabaseService.instance;
  }

  getClient() {
    return this.client;
  }
}

const supabaseInstance = new SupabaseService();
Object.freeze(supabaseInstance);

export default supabaseInstance;
