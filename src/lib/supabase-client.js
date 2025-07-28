import { createClient } from '@supabase/supabase-js'

// القيم الثابتة لـ Supabase
const SUPABASE_URL = 'https://brvpxmzoapcjrxmysljp.supabase.co'
const SUPABASE_ANON_KEY = 'sb_publishable_GR0iGQkSaD0yIkS5jop4eQ_uzFybXKQ'

// إنشاء Supabase client مباشرة بالقيم الثابتة
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

console.log('✅ تم إنشاء Supabase client بنجاح') 