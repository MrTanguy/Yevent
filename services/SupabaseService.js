import { createClient } from '@supabase/supabase-js';
import Constants from "expo-constants";

class SupabaseService {
  constructor() {
    if (!SupabaseService.instance) {
      SupabaseService.instance = this;
      this.supabaseUrl = Constants.expoConfig?.extra?.SUPABASE_URL;
      this.supabaseKey = Constants.expoConfig?.extra?.SUPABASE_KEY;
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
