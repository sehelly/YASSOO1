-- إنشاء جداول قاعدة البيانات لموقع ياسو للأسماك المملحة

-- جدول المنتجات
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  original_price DECIMAL(10,2),
  unit VARCHAR(50) DEFAULT 'كيلو',
  image_url TEXT,
  category VARCHAR(100) NOT NULL,
  stock_quantity INTEGER DEFAULT 0,
  rating DECIMAL(3,2) DEFAULT 0,
  reviews_count INTEGER DEFAULT 0,
  discount_percentage INTEGER DEFAULT 0,
  in_stock BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- جدول الفروع
CREATE TABLE branches (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  address TEXT NOT NULL,
  phone VARCHAR(20) NOT NULL,
  whatsapp VARCHAR(20),
  hours VARCHAR(100),
  delivery_available BOOLEAN DEFAULT true,
  rating DECIMAL(3,2) DEFAULT 0,
  reviews_count INTEGER DEFAULT 0,
  features TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- جدول الروابط الاجتماعية
CREATE TABLE social_links (
  id SERIAL PRIMARY KEY,
  platform VARCHAR(100) NOT NULL,
  link TEXT NOT NULL,
  icon VARCHAR(10),
  description TEXT,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- جدول أرقام الدليفري
CREATE TABLE delivery_numbers (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  area VARCHAR(255) NOT NULL,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- جدول الطلبات
CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  order_number VARCHAR(50) UNIQUE NOT NULL,
  customer_name VARCHAR(255) NOT NULL,
  customer_phone VARCHAR(20) NOT NULL,
  customer_address TEXT,
  total_amount DECIMAL(10,2) NOT NULL,
  status VARCHAR(50) DEFAULT 'pending',
  delivery_fee DECIMAL(10,2) DEFAULT 0,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- جدول تفاصيل الطلبات
CREATE TABLE order_items (
  id SERIAL PRIMARY KEY,
  order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
  product_id INTEGER REFERENCES products(id),
  product_name VARCHAR(255) NOT NULL,
  quantity INTEGER NOT NULL,
  unit_price DECIMAL(10,2) NOT NULL,
  total_price DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- جدول المستخدمين (للوحة التحكم)
CREATE TABLE admin_users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(100) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'admin',
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- جدول إعدادات الموقع
CREATE TABLE site_settings (
  id SERIAL PRIMARY KEY,
  setting_key VARCHAR(100) UNIQUE NOT NULL,
  setting_value TEXT,
  setting_type VARCHAR(50) DEFAULT 'text',
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- إدراج بيانات تجريبية للمنتجات
INSERT INTO products (name, description, price, original_price, image_url, category, stock_quantity, rating, reviews_count, discount_percentage) VALUES
('فسيخ بلدي درجة أولى', 'فسيخ بلدي طازج ومملح بعناية فائقة، تم اصطياده من البحر الأبيض المتوسط', 45.00, 50.00, '/فسيخ.jpg', 'فسيخ', 50, 4.8, 156, 10),
('سردين مملح فاخر', 'سردين مملح عالي الجودة ومعبأ في زيت الزيتون الطبيعي', 35.00, 40.00, '/sardine.jpg', 'سردين', 30, 4.6, 89, 12),
('رنجة مدخنة مميزة', 'رنجة مدخنة بالطريقة التقليدية مع التوابل الطبيعية', 55.00, 65.00, '/renga.jpg', 'رنجة', 40, 4.9, 203, 15),
('ملوحة بحرية طازجة', 'مجموعة متنوعة من الملوحة البحرية الطازجة', 40.00, 45.00, '/maloha.jpg', 'ملوحة', 60, 4.7, 124, 11),
('بطارخ رنجة', 'بطارخ رنجة طازجة ومملحة بعناية', 80.00, 90.00, '/بطارخ رنجه.jpg', 'بطارخ', 25, 4.5, 78, 11);

-- إدراج بيانات تجريبية للفروع
INSERT INTO branches (name, address, phone, whatsapp, hours, delivery_available, rating, reviews_count, features) VALUES
('الفرع الرئيسي - القاهرة', 'شارع النيل، وسط البلد، القاهرة', '01012345678', '01012345678', 'السبت - الخميس: 8 ص - 10 م', true, 4.8, 156, ARRAY['توصيل مجاني', 'دفع إلكتروني', 'جودة عالية']),
('فرع المعادي', 'شارع 9، المعادي الجديدة، القاهرة', '01087654321', '01087654321', 'السبت - الخميس: 9 ص - 9 م', true, 4.6, 89, ARRAY['توصيل سريع', 'خصومات خاصة', 'خدمة 24/7']),
('فرع الإسكندرية', 'شارع البحر، المنتزه، الإسكندرية', '01098765432', '01098765432', 'السبت - الخميس: 8 ص - 11 م', true, 4.9, 203, ARRAY['أسماك طازجة', 'أسعار منافسة', 'خدمة مميزة']);

-- إدراج بيانات تجريبية للروابط الاجتماعية
INSERT INTO social_links (platform, link, icon, description) VALUES
('WhatsApp', 'https://wa.me/201012345678', '📱', 'تواصل معنا مباشرة عبر واتساب'),
('Facebook', 'https://facebook.com/yaso.fish', '📘', 'تابعنا على فيسبوك للحصول على العروض'),
('TikTok', 'https://tiktok.com/@yaso.fish', '🎵', 'شاهد فيديوهاتنا على تيك توك'),
('Instagram', 'https://instagram.com/yaso.fish', '📷', 'تابع صور منتجاتنا على انستجرام');

-- إدراج بيانات تجريبية لأرقام الدليفري
INSERT INTO delivery_numbers (name, phone, area) VALUES
('أحمد', '01012345678', 'القاهرة والجيزة'),
('محمد', '01087654321', 'المعادي والمدن الجديدة'),
('علي', '01098765432', 'الإسكندرية'),
('حسن', '01011223344', 'الشرقية والغربية');

-- إدراج بيانات تجريبية للمدير
INSERT INTO admin_users (username, email, password_hash, role) VALUES
('admin', 'admin@yaso-fish.com', '$2a$10$your_hashed_password_here', 'admin');

-- إدراج إعدادات الموقع
INSERT INTO site_settings (setting_key, setting_value, setting_type, description) VALUES
('site_name', 'ياسو - الأسماك المملحة', 'text', 'اسم الموقع'),
('site_description', 'أجود الأسماك المملحة في مصر', 'text', 'وصف الموقع'),
('main_phone', '01012345678', 'text', 'رقم الهاتف الرئيسي'),
('main_email', 'info@yaso-fish.com', 'text', 'البريد الإلكتروني الرئيسي'),
('working_hours', 'السبت - الخميس: 8 ص - 10 م', 'text', 'ساعات العمل'),
('delivery_available', 'true', 'boolean', 'إمكانية التوصيل'),
('logo_url', '/logo.jpg', 'text', 'رابط اللوجو'),
('cover_image_url', '/cover.jpg', 'text', 'رابط صورة الغلاف');

-- إنشاء فهارس لتحسين الأداء
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_in_stock ON products(in_stock);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_created_at ON orders(created_at);
CREATE INDEX idx_branches_delivery ON branches(delivery_available);
CREATE INDEX idx_social_links_active ON social_links(active);
CREATE INDEX idx_delivery_numbers_active ON delivery_numbers(active);

-- تفعيل Row Level Security (RLS)
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE branches ENABLE ROW LEVEL SECURITY;
ALTER TABLE social_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE delivery_numbers ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- إنشاء سياسات الأمان للقراءة العامة
CREATE POLICY "Allow public read access to products" ON products FOR SELECT USING (true);
CREATE POLICY "Allow public read access to branches" ON branches FOR SELECT USING (true);
CREATE POLICY "Allow public read access to social_links" ON social_links FOR SELECT USING (active = true);
CREATE POLICY "Allow public read access to delivery_numbers" ON delivery_numbers FOR SELECT USING (active = true);
CREATE POLICY "Allow public read access to site_settings" ON site_settings FOR SELECT USING (true);

-- سياسات الكتابة للمديرين فقط (ستحتاج إلى إعدادات إضافية للمصادقة)
CREATE POLICY "Allow admin write access to products" ON products FOR ALL USING (true);
CREATE POLICY "Allow admin write access to branches" ON branches FOR ALL USING (true);
CREATE POLICY "Allow admin write access to social_links" ON social_links FOR ALL USING (true);
CREATE POLICY "Allow admin write access to delivery_numbers" ON delivery_numbers FOR ALL USING (true);
CREATE POLICY "Allow admin write access to site_settings" ON site_settings FOR ALL USING (true); 