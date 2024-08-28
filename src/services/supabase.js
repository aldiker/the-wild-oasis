import { createClient } from '@supabase/supabase-js'

export const supabaseUrl = 'https://rhcieegpujvlcbaguuvh.supabase.co'
// const supabaseKey = import.meta.env.VITE_SUPABASE_KEY
const supabaseKey =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJoY2llZWdwdWp2bGNiYWd1dXZoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjE5MDk3NzksImV4cCI6MjAzNzQ4NTc3OX0.nRoLgDK96BPOxgOl2oCDMrFUqKQnnSk9ztSkVVK_DIA'
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase
