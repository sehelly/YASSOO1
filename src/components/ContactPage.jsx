import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  MessageCircle, 
  Share2, 
  ArrowLeft,
  Navigation,
  Truck,
  Star,
  Heart
} from 'lucide-react';

const ContactPage = ({ setCurrentPage }) => {
  const [activeTab, setActiveTab] = useState('branches');

  // بيانات الفروع
  const branches = [
    {
      id: 1,
      name: 'الفرع الرئيسي - القاهرة',
      address: 'شارع النيل، وسط البلد، القاهرة',
      phone: '01012345678',
      whatsapp: '01012345678',
      hours: 'السبت - الخميس: 8 ص - 10 م',
      delivery: true,
      rating: 4.8,
      reviews: 156,
      features: ['توصيل مجاني', 'دفع إلكتروني', 'جودة عالية']
    },
    {
      id: 2,
      name: 'فرع المعادي',
      address: 'شارع 9، المعادي الجديدة، القاهرة',
      phone: '01087654321',
      whatsapp: '01087654321',
      hours: 'السبت - الخميس: 9 ص - 9 م',
      delivery: true,
      rating: 4.6,
      reviews: 89,
      features: ['توصيل سريع', 'خصومات خاصة', 'خدمة 24/7']
    },
    {
      id: 3,
      name: 'فرع الإسكندرية',
      address: 'شارع البحر، المنتزه، الإسكندرية',
      phone: '01098765432',
      whatsapp: '01098765432',
      hours: 'السبت - الخميس: 8 ص - 11 م',
      delivery: true,
      rating: 4.9,
      reviews: 203,
      features: ['أسماك طازجة', 'أسعار منافسة', 'خدمة مميزة']
    }
  ];

  // بيانات الروابط الاجتماعية
  const socialLinks = [
    {
      id: 1,
      platform: 'WhatsApp',
      link: 'https://wa.me/201012345678',
      icon: '📱',
      color: 'bg-green-500',
      description: 'تواصل معنا مباشرة عبر واتساب'
    },
    {
      id: 2,
      platform: 'Facebook',
      link: 'https://facebook.com/yaso.fish',
      icon: '📘',
      color: 'bg-blue-600',
      description: 'تابعنا على فيسبوك للحصول على العروض'
    },
    {
      id: 3,
      platform: 'TikTok',
      link: 'https://tiktok.com/@yaso.fish',
      icon: '🎵',
      color: 'bg-black',
      description: 'شاهد فيديوهاتنا على تيك توك'
    },
    {
      id: 4,
      platform: 'Instagram',
      link: 'https://instagram.com/yaso.fish',
      icon: '📷',
      color: 'bg-pink-500',
      description: 'تابع صور منتجاتنا على انستجرام'
    }
  ];

  // بيانات أرقام الدليفري
  const deliveryNumbers = [
    { id: 1, name: 'أحمد', phone: '01012345678', area: 'القاهرة والجيزة' },
    { id: 2, name: 'محمد', phone: '01087654321', area: 'المعادي والمدن الجديدة' },
    { id: 3, name: 'علي', phone: '01098765432', area: 'الإسكندرية' },
    { id: 4, name: 'حسن', phone: '01011223344', area: 'الشرقية والغربية' }
  ];

  const renderBranches = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">فروعنا</h2>
        <p className="text-gray-600">اختر الفرع الأقرب لك</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {branches.map(branch => (
          <div key={branch.id} className="bg-white rounded-xl shadow-lg border p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <MapPin className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-800 text-lg">{branch.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="text-sm text-gray-600">{branch.rating}</span>
                  <span className="text-sm text-gray-500">({branch.reviews} تقييم)</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-700">{branch.address}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gray-500" />
                <a href={`tel:${branch.phone}`} className="text-sm text-blue-600 hover:underline">
                  {branch.phone}
                </a>
              </div>

              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-700">{branch.hours}</span>
              </div>

              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-green-500" />
                <span className="text-sm text-green-600 font-medium">يدعم التوصيل</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex flex-wrap gap-1">
                {branch.features.map((feature, index) => (
                  <span key={index} className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full">
                    {feature}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-4 flex gap-2">
              <a
                href={`tel:${branch.phone}`}
                className="flex-1 bg-blue-600 text-white py-2 rounded-lg text-center text-sm hover:bg-blue-700 transition-colors"
              >
                اتصل الآن
              </a>
              <a
                href={`https://wa.me/${branch.whatsapp}`}
                className="flex-1 bg-green-600 text-white py-2 rounded-lg text-center text-sm hover:bg-green-700 transition-colors"
              >
                واتساب
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSocial = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">تواصل معنا</h2>
        <p className="text-gray-600">تابعنا على منصات التواصل الاجتماعي</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {socialLinks.map(social => (
          <div key={social.id} className="bg-white rounded-xl shadow-lg border p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center gap-4 mb-4">
              <div className={`w-12 h-12 ${social.color} rounded-lg flex items-center justify-center text-2xl`}>
                {social.icon}
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-800 text-lg">{social.platform}</h3>
                <p className="text-sm text-gray-600">{social.description}</p>
              </div>
            </div>

            <a
              href={social.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full bg-gray-100 text-gray-700 py-3 rounded-lg text-center hover:bg-gray-200 transition-colors"
            >
              تابعنا على {social.platform}
            </a>
          </div>
        ))}
      </div>

      {/* معلومات الاتصال العامة */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
        <h3 className="text-xl font-bold mb-4">معلومات الاتصال العامة</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-3">
            <Phone className="w-5 h-5" />
            <div>
              <p className="text-sm opacity-90">الهاتف الرئيسي</p>
              <p className="font-semibold">01012345678</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Mail className="w-5 h-5" />
            <div>
              <p className="text-sm opacity-90">البريد الإلكتروني</p>
              <p className="font-semibold">info@yaso-fish.com</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5" />
            <div>
              <p className="text-sm opacity-90">ساعات العمل</p>
              <p className="font-semibold">السبت - الخميس: 8 ص - 10 م</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Truck className="w-5 h-5" />
            <div>
              <p className="text-sm opacity-90">التوصيل</p>
              <p className="font-semibold">متوفر في جميع المحافظات</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderDelivery = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">أرقام الدليفري</h2>
        <p className="text-gray-600">تواصل مع أقرب دليفري لك</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {deliveryNumbers.map(delivery => (
          <div key={delivery.id} className="bg-white rounded-xl shadow-lg border p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Truck className="w-6 h-6 text-green-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-800 text-lg">{delivery.name}</h3>
                <p className="text-sm text-gray-600">{delivery.area}</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gray-500" />
                <a href={`tel:${delivery.phone}`} className="text-blue-600 hover:underline">
                  {delivery.phone}
                </a>
              </div>

              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-700">منطقة التوصيل: {delivery.area}</span>
              </div>
            </div>

            <div className="mt-4 flex gap-2">
              <a
                href={`tel:${delivery.phone}`}
                className="flex-1 bg-green-600 text-white py-2 rounded-lg text-center text-sm hover:bg-green-700 transition-colors"
              >
                اتصل بالدليفري
              </a>
              <a
                href={`https://wa.me/${delivery.phone}`}
                className="flex-1 bg-blue-600 text-white py-2 rounded-lg text-center text-sm hover:bg-blue-700 transition-colors"
              >
                واتساب
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* معلومات إضافية */}
      <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
        <h3 className="text-xl font-bold mb-4">خدمة التوصيل</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center mx-auto mb-2">
              <Clock className="w-6 h-6" />
            </div>
            <p className="font-semibold">توصيل سريع</p>
            <p className="text-sm opacity-90">خلال 30 دقيقة</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center mx-auto mb-2">
              <Heart className="w-6 h-6" />
            </div>
            <p className="font-semibold">جودة مضمونة</p>
            <p className="text-sm opacity-90">أجود الأسماك</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center mx-auto mb-2">
              <Navigation className="w-6 h-6" />
            </div>
            <p className="font-semibold">توصيل مجاني</p>
            <p className="text-sm opacity-90">للطلبات الكبيرة</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      {/* Header */}
      <div className="bg-white shadow-lg">
        <div className="flex items-center justify-between p-4">
          <button
            onClick={() => setCurrentPage('home')}
            className="flex items-center gap-2 text-gray-600 hover:text-blue-600"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>العودة</span>
          </button>
          <div className="text-center">
            <h1 className="text-xl font-bold text-gray-800">اتصل بنا</h1>
            <p className="text-sm text-gray-600">نحن هنا لمساعدتك</p>
          </div>
          <div className="w-20"></div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b">
        <div className="flex justify-center">
          <div className="flex bg-gray-100 rounded-lg p-1 m-4">
            <button
              onClick={() => setActiveTab('branches')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'branches' 
                  ? 'bg-white text-blue-600 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              الفروع
            </button>
            <button
              onClick={() => setActiveTab('social')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'social' 
                  ? 'bg-white text-blue-600 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              التواصل الاجتماعي
            </button>
            <button
              onClick={() => setActiveTab('delivery')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'delivery' 
                  ? 'bg-white text-blue-600 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              الدليفري
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {activeTab === 'branches' && renderBranches()}
        {activeTab === 'social' && renderSocial()}
        {activeTab === 'delivery' && renderDelivery()}
      </div>
    </div>
  );
};

export default ContactPage; 