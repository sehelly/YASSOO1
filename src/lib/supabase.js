import { createClient } from '@supabase/supabase-js'

// القيم الحقيقية لـ Supabase
const SUPABASE_URL = 'https://brvpxmzoapcjrxmysljp.supabase.co'
const SUPABASE_ANON_KEY = 'sb_publishable_GR0iGQkSaD0yIkS5jop4eQ_uzFybXKQ'

// محاولة الحصول من المتغيرات البيئية، وإلا استخدام القيم الثابتة
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || SUPABASE_ANON_KEY

console.log('🔧 تهيئة Supabase...')
console.log('URL:', supabaseUrl ? '✅ موجود' : '❌ مفقود')
console.log('Key:', supabaseAnonKey ? '✅ موجود' : '❌ مفقود')

// التحقق من صحة القيم
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ خطأ: قيم Supabase غير صحيحة')
  throw new Error('Supabase configuration is invalid')
}

// إنشاء Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

console.log('✅ تم إنشاء Supabase client بنجاح') 