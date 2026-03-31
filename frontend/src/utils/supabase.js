import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://gwndwpewlraagzrospub.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd3bmR3cGV3bHJhYWd6cm9zcHViIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ4OTUwODQsImV4cCI6MjA5MDQ3MTA4NH0.iBeoXAXf9x8OjgCTBW5Uq4vqrLU1jPM3-9na-t6Ihjg'

console.log('Supabase key prefix:', supabaseKey.substring(0, 15) + '...')

export const supabase = createClient(supabaseUrl, supabaseKey)
export { supabaseUrl }
