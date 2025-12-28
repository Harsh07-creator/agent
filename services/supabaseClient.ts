
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://zuhzjjptoeukxqpojcxn.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp1aHpqanB0b2V1a3hxcG9qY3huIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY4NDYwMDQsImV4cCI6MjA4MjQyMjAwNH0.TyAIYXDyffEZmdu6eCFNyi8-hkexXyr_ybbDF9Wxyck';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
