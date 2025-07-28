// إعدادات التطبيق المركزية
export const config = {
  // معلومات التطبيق
  app: {
    name: import.meta.env.VITE_APP_NAME || 'ياسو - الأسماك المملحة',
    description: import.meta.env.VITE_APP_DESCRIPTION || 'أجود الأسماك المملحة في مصر',
    version: import.meta.env.VITE_APP_VERSION || '1.0.0',
  },

  // إعدادات Supabase
  supabase: {
    url: import.meta.env.VITE_SUPABASE_URL || 'https://brvpxmzoapcjrxmysljp.supabase.co',
    anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJydnB4bXpvYXBjanJ4bXlzbGpwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI2NzI5NzAsImV4cCI6MjA0ODI0ODk3MH0.GR0iGQkSaD0yIkS5jop4eQ_uzFybXKQ',
    storageBucket: import.meta.env.VITE_STORAGE_BUCKET || 'images',
  },

  // معلومات الاتصال
  contact: {
    mainPhone: import.meta.env.VITE_MAIN_PHONE || '01012345678',
    mainEmail: import.meta.env.VITE_MAIN_EMAIL || 'info@yaso-fish.com',
    whatsappNumber: import.meta.env.VITE_WHATSAPP_NUMBER || '201012345678',
  },

  // الروابط الاجتماعية
  social: {
    facebook: import.meta.env.VITE_FACEBOOK_URL || 'https://facebook.com/yaso.fish',
    instagram: import.meta.env.VITE_INSTAGRAM_URL || 'https://instagram.com/yaso.fish',
    tiktok: import.meta.env.VITE_TIKTOK_URL || 'https://tiktok.com/@yaso.fish',
  },

  // إعدادات المدير
  admin: {
    username: import.meta.env.VITE_ADMIN_USERNAME || 'admin',
    password: import.meta.env.VITE_ADMIN_PASSWORD || 'yaso123',
  },

  // إعدادات التخزين
  storage: {
    maxFileSize: parseInt(import.meta.env.VITE_MAX_FILE_SIZE) || 5242880, // 5MB
    allowedTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  },

  // إعدادات التطوير
  development: {
    devMode: import.meta.env.VITE_DEV_MODE === 'true',
    apiTimeout: parseInt(import.meta.env.VITE_API_TIMEOUT) || 30000,
  },
}

// التحقق من المتغيرات المطلوبة
export const validateConfig = () => {
  const required = [
    'VITE_SUPABASE_URL',
    'VITE_SUPABASE_ANON_KEY'
  ]

  const missing = required.filter(key => !import.meta.env[key])
  
  if (missing.length > 0) {
    console.warn('Missing environment variables:', missing)
    return false
  }
  
  return true
}

// الحصول على معلومات التطبيق
export const getAppInfo = () => ({
  name: config.app.name,
  description: config.app.description,
  version: config.app.version,
  contact: config.contact,
  social: config.social,
})

// الحصول على إعدادات Supabase
export const getSupabaseConfig = () => ({
  url: config.supabase.url,
  anonKey: config.supabase.anonKey,
  storageBucket: config.supabase.storageBucket,
})

// الحصول على إعدادات التخزين
export const getStorageConfig = () => ({
  maxFileSize: config.storage.maxFileSize,
  allowedTypes: config.storage.allowedTypes,
  bucket: config.supabase.storageBucket,
}) 