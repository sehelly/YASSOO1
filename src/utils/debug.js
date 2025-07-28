// ملف تشخيص مساعد
export const debugEnvironmentVariables = () => {
  console.log('🔍 === تشخيص شامل للمتغيرات البيئية ===');
  
  const requiredVars = [
    'VITE_SUPABASE_URL',
    'VITE_SUPABASE_ANON_KEY',
    'VITE_APP_NAME',
    'VITE_STORAGE_BUCKET',
    'VITE_ADMIN_USERNAME',
    'VITE_ADMIN_PASSWORD'
  ];
  
  let allPresent = true;
  
  requiredVars.forEach(varName => {
    const value = import.meta.env[varName];
    const exists = !!value;
    const status = exists ? '✅' : '❌';
    
    console.log(`${status} ${varName}:`, exists ? 'موجود' : 'مفقود');
    
    if (!exists) {
      allPresent = false;
    }
  });
  
  console.log('📊 النتيجة النهائية:', allPresent ? '✅ جميع المتغيرات موجودة' : '❌ بعض المتغيرات مفقودة');
  console.log('🔍 === نهاية التشخيص ===');
  
  return allPresent;
};

export const testSupabaseConnection = async () => {
  try {
    const { supabase } = await import('../lib/supabase.js');
    
    console.log('🔗 اختبار الاتصال بـ Supabase...');
    
    // اختبار بسيط للاتصال
    const { data, error } = await supabase
      .from('products')
      .select('count')
      .limit(1);
    
    if (error) {
      console.error('❌ خطأ في الاتصال بـ Supabase:', error);
      return false;
    } else {
      console.log('✅ الاتصال بـ Supabase ناجح');
      return true;
    }
  } catch (error) {
    console.error('❌ خطأ في اختبار Supabase:', error);
    return false;
  }
}; 