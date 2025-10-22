import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://klxcthuulapifgnwtccu.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtseGN0aHV1bGFwaWZnbnd0Y2N1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA1ODAxNTgsImV4cCI6MjA3NjE1NjE1OH0.NGN59vjKwRVyybmybsQ3-QbJeGUedMFbsyrRI5C_q3U';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;
