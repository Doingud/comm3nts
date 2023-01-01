import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://wxkbtrlfprmjoatvlxva.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind4a2J0cmxmcHJtam9hdHZseHZhIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzEzNzE0NjEsImV4cCI6MTk4Njk0NzQ2MX0.ABZgYgYYEGcctkUA9gjHmrHinCW2vv0tHFNjJh6yL7o';
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;