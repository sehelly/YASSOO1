# 🐟 ياسو - تطبيق الأسماك المملحة

تطبيق متكامل لبيع الأسماك المملحة مع لوحة تحكم احترافية وإدارة شاملة للمتجر.

## ✨ المميزات

### 🛍️ للمستخدمين
- **تسوق سهل**: تصفح المنتجات وإضافة للسلة
- **إدارة الطلبات**: تتبع طلباتك وحالتها
- **صفحة اتصل بنا**: معلومات الفروع وأرقام الدليفري
- **روابط اجتماعية**: واتساب، فيسبوك، تيك توك، انستجرام
- **واجهة عربية**: تصميم متجاوب مع الموبايل

### 🎛️ لوحة التحكم (Admin Dashboard)
- **إدارة المنتجات**: إضافة/تعديل/حذف المنتجات
- **رفع الصور**: رفع صور المنتجات عبر Supabase Storage
- **إدارة الفروع**: إضافة فروع جديدة مع العناوين
- **الروابط الاجتماعية**: إدارة روابط التواصل الاجتماعي
- **أرقام الدليفري**: إدارة أرقام التوصيل
- **الإحصائيات**: عرض إحصائيات المتجر
- **الإعدادات**: تخصيص معلومات المتجر

## 🚀 التقنيات المستخدمة

- **Frontend**: React.js, Vite, Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Storage, Auth)
- **Icons**: Lucide React
- **Mobile**: Capacitor (Android/iOS)
- **Deployment**: Vercel, Netlify

## 📋 متطلبات النظام

- Node.js 16+
- npm أو yarn
- حساب Supabase (مجاني)

## 🛠️ التثبيت والإعداد

### 1. استنساخ المشروع
```bash
git clone <repository-url>
cd yaso-fish-app
npm install
```

### 2. إعداد Supabase

#### أ. إنشاء مشروع Supabase
1. اذهب إلى [supabase.com](https://supabase.com)
2. أنشئ حساب جديد أو سجل دخول
3. أنشئ مشروع جديد
4. احفظ Project URL و API Key

#### ب. إعداد قاعدة البيانات
1. اذهب إلى SQL Editor في لوحة تحكم Supabase
2. انسخ محتوى ملف `database-setup.sql`
3. نفذ الأوامر لإنشاء الجداول والبيانات التجريبية

#### ج. إعداد Storage
1. اذهب إلى Storage في لوحة تحكم Supabase
2. أنشئ bucket جديد باسم `images`
3. اضبط السياسات للوصول العام

### 3. إعداد متغيرات البيئة
```bash
# انسخ ملف البيئة
cp .env.example .env

# أضف بيانات Supabase
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

### 4. تشغيل المشروع
```bash
# التطوير
npm run dev

# البناء للإنتاج
npm run build

# معاينة البناء
npm run preview
```

## 📱 تحويل إلى تطبيق موبايل

### Android
```bash
# إضافة Android
npm run android

# بناء تطبيق Android
npm run build:android
```

### iOS
```bash
# إضافة iOS
npm run ios

# بناء تطبيق iOS
npm run build:ios
```

## 🌐 النشر

### Vercel (موصى به)
```bash
# تثبيت Vercel CLI
npm i -g vercel

# النشر
vercel
```

### Netlify
```bash
# بناء المشروع
npm run build

# رفع مجلد dist إلى Netlify
```

### GitHub Pages
```bash
# إضافة إلى package.json
"homepage": "https://username.github.io/repo-name"

# النشر
npm run deploy
```

## 🔐 لوحة التحكم

### تسجيل الدخول
- **URL**: `your-domain.com` + اضغط على أيقونة الدرع 🛡️
- **اسم المستخدم**: `admin`
- **كلمة المرور**: `yaso123`

### الميزات المتاحة
- 📊 **الإحصائيات**: عرض إحصائيات المتجر
- 📦 **المنتجات**: إدارة المنتجات والصور
- 🏪 **الفروع**: إدارة فروع المتجر
- 🔗 **الروابط الاجتماعية**: إدارة التواصل الاجتماعي
- ⚙️ **الإعدادات**: تخصيص معلومات المتجر

## 📊 قاعدة البيانات

### الجداول الرئيسية
- `products`: المنتجات
- `branches`: الفروع
- `social_links`: الروابط الاجتماعية
- `delivery_numbers`: أرقام الدليفري
- `orders`: الطلبات
- `admin_users`: مستخدمي لوحة التحكم
- `site_settings`: إعدادات الموقع

### البيانات التجريبية
المشروع يأتي مع بيانات تجريبية جاهزة:
- 5 منتجات مختلفة
- 3 فروع
- 4 روابط اجتماعية
- 4 أرقام دليفري

## 🎨 التخصيص

### الألوان
```css
/* في tailwind.config.js */
colors: {
  primary: {
    50: '#eff6ff',
    100: '#dbeafe',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
  }
}
```

### الخطوط
```css
/* في index.css */
font-family: 'Cairo', sans-serif;
```

## 📱 الميزات المتقدمة

### رفع الصور
- دعم JPG, PNG, GIF
- حد أقصى 5MB
- معاينة فورية
- رفع إلى Supabase Storage

### إدارة المحتوى
- إضافة/تعديل/حذف المنتجات
- إدارة الفروع والعناوين
- تحديث الروابط الاجتماعية
- إدارة أرقام الدليفري

### الأمان
- Row Level Security (RLS)
- سياسات وصول آمنة
- حماية لوحة التحكم

## 🐛 استكشاف الأخطاء

### مشاكل شائعة

#### 1. خطأ في ربط Supabase
```bash
# تأكد من صحة المتغيرات البيئية
echo $VITE_SUPABASE_URL
echo $VITE_SUPABASE_ANON_KEY
```

#### 2. خطأ في رفع الصور
- تأكد من إنشاء bucket `images` في Supabase Storage
- تأكد من سياسات الوصول العام

#### 3. خطأ في البناء
```bash
# تنظيف وإعادة تثبيت
rm -rf node_modules
npm install
npm run build
```

## 📞 الدعم

- **البريد الإلكتروني**: support@yaso-fish.com
- **واتساب**: +201012345678
- **GitHub Issues**: للإبلاغ عن الأخطاء

## 📄 الرخصة

MIT License - راجع ملف `LICENSE` للتفاصيل.

## 🤝 المساهمة

نرحب بالمساهمات! يرجى:
1. Fork المشروع
2. إنشاء branch جديد
3. إجراء التغييرات
4. إرسال Pull Request

---

**تم تطوير هذا المشروع بـ ❤️ لفريق ياسو** 