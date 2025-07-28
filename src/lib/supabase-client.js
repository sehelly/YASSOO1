import { createClient } from '@supabase/supabase-js'

// القيم الثابتة لـ Supabase
const SUPABASE_URL = 'https://brvpxmzoapcjrxmysljp.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJydnB4bXpvYXBjanJ4bXlzbGpwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI2NzI5NzAsImV4cCI6MjA0ODI0ODk3MH0.GR0iGQkSaD0yIkS5jop4eQ_uzFybXKQ'

// إنشاء Supabase client مباشرة بالقيم الثابتة
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

console.log('✅ تم إنشاء Supabase client بنجاح') 