import { createClient } from '@supabase/supabase-js';
export const supabaseUrl = 'https://dynshrpbybaldunbaqjc.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR5bnNocnBieWJhbGR1bmJhcWpjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE0NDU0OTYsImV4cCI6MjA0NzAyMTQ5Nn0.nmje0TxIwUyCGjULyTfCM0CsnmtNg7LvxeM6Y2QjQE0';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
