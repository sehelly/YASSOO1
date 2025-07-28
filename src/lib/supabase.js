import { createClient } from '@supabase/supabase-js'

// القيم الحقيقية لـ Supabase
const SUPABASE_URL = 'https://brvpxmzoapcjrxmysljp.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJydnB4bXpvYXBjanJ4bXlzbGpwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI2NzI5NzAsImV4cCI6MjA0ODI0ODk3MH0.GR0iGQkSaD0yIkS5jop4eQ_uzFybXKQ'

// محاولة الحصول من المتغيرات البيئية، وإلا استخدام القيم الثابتة
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || SUPABASE_ANON_KEY

// التحقق من صحة القيم
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabase configuration is invalid')
}

// إنشاء Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey) 