import { createClient } from '@supabase/supabase-js'

export const supabaseUrl = 'https://rhcieegpujvlcbaguuvh.supabase.co'

const supabaseKey = import.meta.env.VITE_SUPABASE_KEY
// console.log('supabaseKey:', supabaseKey)

const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase
