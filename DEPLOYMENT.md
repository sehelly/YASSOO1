# 🚀 دليل النشر - تطبيق ياسو

## 📋 المتطلبات المسبقة

### 1. إعداد Supabase
- ✅ إنشاء مشروع Supabase
- ✅ تنفيذ ملف `database-setup.sql`
- ✅ إنشاء bucket `images` في Storage
- ✅ رفع صورة `logo.jpg` للاختبار

### 2. المتغيرات البيئية المطلوبة

```bash
# Supabase Configuration
VITE_SUPABASE_URL=https://brvpxmzoapcjrxmysljp.supabase.co
VITE_SUPABASE_ANON_KEY=sb_publishable_GR0iGQkSaD0yIkS5jop4eQ_uzFybXKQ

# Application Configuration
VITE_APP_NAME=ياسو - الأسماك المملحة
VITE_APP_DESCRIPTION=أجود الأسماك المملحة في مصر
VITE_APP_VERSION=1.0.0

# Contact Information
VITE_MAIN_PHONE=01012345678
VITE_MAIN_EMAIL=info@yaso-fish.com
VITE_WHATSAPP_NUMBER=201012345678

# Social Media Links
VITE_FACEBOOK_URL=https://facebook.com/yaso.fish
VITE_INSTAGRAM_URL=https://instagram.com/yaso.fish
VITE_TIKTOK_URL=https://tiktok.com/@yaso.fish

# Admin Configuration
VITE_ADMIN_USERNAME=admin
VITE_ADMIN_PASSWORD=yaso123

# Storage Configuration
VITE_STORAGE_BUCKET=images
VITE_MAX_FILE_SIZE=5242880

# Development Configuration
VITE_DEV_MODE=true
VITE_API_TIMEOUT=30000
```

## 🌐 النشر على Vercel (موصى به)

### 1. رفع المشروع على GitHub
```bash
git add .
git commit -m "إضافة لوحة تحكم متكاملة ومتغيرات بيئية"
git push origin main
```

### 2. ربط المشروع بـ Vercel
1. اذهب إلى [vercel.com](https://vercel.com)
2. سجل دخول بحساب GitHub
3. اضغط "New Project"
4. اختر repository المشروع
5. اضغط "Deploy"

### 3. إضافة المتغيرات البيئية في Vercel
1. اذهب إلى إعدادات المشروع في Vercel
2. اذهب إلى "Environment Variables"
3. أضف جميع المتغيرات المذكورة أعلاه
4. اضغط "Save"

### 4. إعادة النشر
```bash
vercel --prod
```

## 🌐 النشر على Netlify

### 1. ربط المشروع بـ Netlify
1. اذهب إلى [netlify.com](https://netlify.com)
2. اضغط "New site from Git"
3. اختر GitHub واختر repository المشروع
4. اضبط إعدادات البناء:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`

### 2. إضافة المتغيرات البيئية
1. اذهب إلى "Site settings"
2. اذهب إلى "Environment variables"
3. أضف جميع المتغيرات المذكورة أعلاه

### 3. إعادة النشر
سيتم النشر تلقائياً عند push للـ GitHub

## 🌐 النشر على GitHub Pages

### 1. إعداد المشروع
```bash
# إضافة homepage في package.json
"homepage": "https://username.github.io/repo-name"

# تثبيت gh-pages
npm install --save-dev gh-pages

# إضافة scripts
"predeploy": "npm run build",
"deploy": "gh-pages -d dist"
```

### 2. إضافة المتغيرات البيئية
```bash
# إنشاء ملف .env في root المشروع
cp env.example .env
```

### 3. النشر
```bash
npm run deploy
```

## 🔧 اختبار النشر

### 1. اختبار الموقع الرئيسي
- ✅ تحميل الصفحة الرئيسية
- ✅ عرض المنتجات
- ✅ إضافة للسلة
- ✅ التنقل بين الصفحات

### 2. اختبار لوحة التحكم
- ✅ الدخول بـ `admin` / `yaso123`
- ✅ عرض الإحصائيات
- ✅ إدارة المنتجات
- ✅ رفع الصور

### 3. اختبار صفحة "اتصل بنا"
- ✅ عرض الفروع
- ✅ الروابط الاجتماعية
- ✅ أرقام الدليفري

## 🐛 استكشاف الأخطاء

### مشكلة: الموقع لا يعمل
```bash
# تحقق من المتغيرات البيئية
echo $VITE_SUPABASE_URL
echo $VITE_SUPABASE_ANON_KEY
```

### مشكلة: رفع الصور لا يعمل
1. تحقق من إنشاء bucket `images` في Supabase
2. تحقق من سياسات الوصول العام
3. تحقق من متغير `VITE_STORAGE_BUCKET`

### مشكلة: لوحة التحكم لا تعمل
1. تحقق من تنفيذ `database-setup.sql`
2. تحقق من إدراج بيانات المدير
3. تحقق من متغيرات المدير

## 📞 الدعم

- **البريد الإلكتروني**: support@yaso-fish.com
- **واتساب**: +201012345678
- **GitHub Issues**: للإبلاغ عن الأخطاء

---

**تم تطوير هذا الدليل بـ ❤️ لفريق ياسو** 