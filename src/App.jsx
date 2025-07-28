import React, { useEffect } from 'react';
import YasoFishApp from './components/YasoFishApp';
import { debugEnvironmentVariables, testSupabaseConnection } from './utils/debug';

function App() {
  useEffect(() => {
    // تشخيص شامل للمتغيرات البيئية
    const envVarsOk = debugEnvironmentVariables();
    
    // اختبار الاتصال بـ Supabase
    if (envVarsOk) {
      setTimeout(() => {
        testSupabaseConnection();
      }, 1000);
    }
  }, []);

  return <YasoFishApp />;
}

export default App; 