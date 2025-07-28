import { createClient } from '@supabase/supabase-js'

// الحصول على المتغيرات البيئية مع قيم افتراضية
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://brvpxmzoapcjrxmysljp.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_GR0iGQkSaD0yIkS5jop4eQ_uzFybXKQ'

// التحقق من وجود المتغيرات
if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
  console.error('❌ خطأ: متغيرات Supabase مفقودة!')
  console.error('VITE_SUPABASE_URL موجود:', !!import.meta.env.VITE_SUPABASE_URL)
  console.error('VITE_SUPABASE_ANON_KEY موجود:', !!import.meta.env.VITE_SUPABASE_ANON_KEY)
  console.warn('⚠️ استخدام القيم الافتراضية للاختبار')
} else {
  console.log('✅ متغيرات Supabase موجودة وصحيحة')
}

// إنشاء Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey) 