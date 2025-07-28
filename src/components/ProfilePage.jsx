import React, { useState } from 'react';
import { User, MapPin, Heart, Bell, Settings, MessageCircle, LogOut, Edit3 } from 'lucide-react';

const ProfilePage = ({ user, setUser, favorites, orders, setCurrentPage }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const LoginForm = () => (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">تسجيل الدخول</h3>
      <div className="space-y-4">
        <input
          type="tel"
          placeholder="رقم الهاتف"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          placeholder="كلمة المرور"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button 
          onClick={() => {
            setIsLoggedIn(true);
            setUser({ name: 'أحمد محمد', phone: '01012345678' });
            setShowLogin(false);
          }}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700"
        >
          تسجيل الدخول
        </button>
        <div className="text-center">
          <button className="text-blue-600 text-sm hover:text-blue-800">
            إنشاء حساب جديد
          </button>
        </div>
      </div>
    </div>
  );

  const ProfileOptions = () => (
    <div className="space-y-4">
      {[
        { icon: User, title: 'البيانات الشخصية', subtitle: 'تعديل الاسم ورقم الهاتف' },
        { icon: MapPin, title: 'العناوين المحفوظة', subtitle: 'إدارة عناوين التوصيل' },
        { icon: Heart, title: 'المفضلة', subtitle: `${favorites.length} منتج` },
        { icon: Bell, title: 'الإشعارات', subtitle: 'إعدادات الإشعارات' },
        { icon: Settings, title: 'الإعدادات', subtitle: 'إعدادات التطبيق العامة' },
        { icon: MessageCircle, title: 'اتصل بنا', subtitle: 'خدمة العملاء والدعم الفني' },
      ].map((option, index) => (
        <div key={index} className="bg-white rounded-xl p-4 shadow-sm flex items-center gap-4 cursor-pointer hover:bg-gray-50">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <option.icon className="w-6 h-6 text-blue-600" />
          </div>
          <div className="flex-1">
            <h3 className="font-medium text-gray-800">{option.title}</h3>
            <p className="text-sm text-gray-500">{option.subtitle}</p>
          </div>
          <div className="text-gray-400">←</div>
        </div>
      ))}
      
      <button 
        onClick={() => {
          setIsLoggedIn(false);
          setUser(null);
        }}
        className="w-full bg-red-50 text-red-600 py-3 rounded-xl font-medium hover:bg-red-100 flex items-center justify-center gap-2"
      >
        <LogOut className="w-5 h-5" />
        تسجيل الخروج
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm p-4">
        <h2 className="text-xl font-bold text-gray-800 text-center">حسابي</h2>
      </div>

      <div className="p-4 pb-20">
        {!isLoggedIn ? (
          <div className="space-y-6">
            <div className="text-center py-10">
              <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-600 mb-2">مرحباً بك في ياسو</h3>
              <p className="text-gray-400 mb-6">سجل دخولك للاستفادة من جميع المميزات</p>
              <button 
                onClick={() => setShowLogin(true)}
                className="bg-blue-600 text-white px-8 py-3 rounded-xl hover:bg-blue-700 font-medium"
              >
                تسجيل الدخول
              </button>
            </div>
            
            {showLogin && <LoginForm />}
          </div>
        ) : (
          <div className="space-y-6">
            {/* معلومات المستخدم */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800">{user?.name}</h3>
                  <p className="text-gray-600">{user?.phone}</p>
                </div>
              </div>
              <button className="bg-blue-50 text-blue-600 px-4 py-2 rounded-lg text-sm hover:bg-blue-100">
                <Edit3 className="w-4 h-4 inline mr-1" />
                تعديل البيانات
              </button>
            </div>

            {/* إحصائيات سريعة */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white rounded-xl p-4 text-center shadow-sm">
                <div className="text-2xl font-bold text-blue-600">{orders.length}</div>
                <div className="text-sm text-gray-600">طلب</div>
              </div>
              <div className="bg-white rounded-xl p-4 text-center shadow-sm">
                <div className="text-2xl font-bold text-green-600">{favorites.length}</div>
                <div className="text-sm text-gray-600">مفضل</div>
              </div>
              <div className="bg-white rounded-xl p-4 text-center shadow-sm">
                <div className="text-2xl font-bold text-orange-600">0</div>
                <div className="text-sm text-gray-600">نقطة</div>
              </div>
            </div>

            {/* خيارات الحساب */}
            <ProfileOptions />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage; 