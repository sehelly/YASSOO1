import { createClient } from '@supabase/supabase-js'

// استخدام القيم الحقيقية كقيم افتراضية في حالة عدم وجود متغيرات البيئة
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://brvpxmzoapcjrxmysljp.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_GR0iGQkSaD0yIkS5jop4eQ_uzFybXKQ'

// التحقق من صحة القيم
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase environment variables not found, using default values')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey) 