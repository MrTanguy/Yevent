import { createClient } from '@supabase/supabase-js';

class SupabaseService {
  constructor() {
    if (!SupabaseService.instance) {
      SupabaseService.instance = this;
      this.supabaseUrl = 'https://yvaucfmxcakuggbsfptb.supabase.co';
      this.supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl2YXVjZm14Y2FrdWdnYnNmcHRiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzczODA1MjMsImV4cCI6MjA1Mjk1NjUyM30.oxYFDJ4OTm3lgH_rXvpuLeqCCNOq3u0u42yYBGCU2CA"
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
