import React, { useEffect } from 'react';
import YasoFishApp from './components/YasoFishApp';

function App() {
  useEffect(() => {
    console.log('🚀 بدء تشغيل تطبيق ياسو...');
    console.log('📊 معلومات البيئة:', {
      NODE_ENV: import.meta.env.NODE_ENV,
      VITE_APP_NAME: import.meta.env.VITE_APP_NAME,
      VITE_SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL ? 'موجود' : 'مفقود',
      VITE_SUPABASE_ANON_KEY: import.meta.env.VITE_SUPABASE_ANON_KEY ? 'موجود' : 'مفقود'
    });
  }, []);

  return <YasoFishApp />;
}

export default App; 