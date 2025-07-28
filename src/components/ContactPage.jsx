import React, { useState } from 'react';
import { Phone, MapPin, Clock, Star, Truck, MessageCircle, ExternalLink } from 'lucide-react';
import { useAdminStore } from '../store/adminStore';

const ContactPage = () => {
  const [activeTab, setActiveTab] = useState('branches');
  const { branches, socialLinks } = useAdminStore();

  const tabs = [
    { id: 'branches', label: 'الفروع', icon: MapPin },
    { id: 'social', label: 'التواصل الاجتماعي', icon: MessageCircle },
    { id: 'delivery', label: 'الدليفري', icon: Truck }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-800 text-center">اتصل بنا</h1>
          <p className="text-gray-600 text-center mt-1">نحن هنا لمساعدتك في أي وقت</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex space-x-8 space-x-reverse">
            {tabs.map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 py-4 px-2 border-b-2 font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {activeTab === 'branches' && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">فروعنا</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {branches.map(branch => (
                <div key={branch.id} className="bg-white rounded-lg shadow-sm border p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">{branch.name}</h3>
                      <div className="flex items-center gap-1 mb-2">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-gray-600">{branch.rating}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl">🏪</div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-gray-400" />
                      <span className="text-gray-700">{branch.address}</span>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-gray-400" />
                      <span className="text-gray-700">{branch.phone}</span>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-gray-400" />
                      <span className="text-gray-700">{branch.hours}</span>
                    </div>
                    
                    {branch.whatsapp && (
                      <div className="flex items-center gap-3">
                        <MessageCircle className="w-5 h-5 text-green-500" />
                        <span className="text-gray-700">{branch.whatsapp}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-4 pt-4 border-t">
                    <div className="flex flex-wrap gap-2">
                      {branch.features.map((feature, index) => (
                        <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mt-4 flex gap-2">
                    <a
                      href={`tel:${branch.phone}`}
                      className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg text-center hover:bg-blue-700 transition-colors"
                    >
                      اتصل الآن
                    </a>
                    {branch.whatsapp && (
                      <a
                        href={`https://wa.me/${branch.whatsapp}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg text-center hover:bg-green-700 transition-colors"
                      >
                        واتساب
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'social' && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">التواصل الاجتماعي</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {socialLinks.map(social => (
                <div key={social.id} className="bg-white rounded-lg shadow-sm border p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="text-3xl">{social.icon}</div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">{social.platform}</h3>
                        <p className="text-sm text-gray-600">تابعنا على {social.platform}</p>
                      </div>
                    </div>
                  </div>
                  
                  <a
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-blue-600 text-white py-3 px-4 rounded-lg text-center hover:bg-blue-700 transition-colors"
                  >
                    <div className="flex items-center justify-center gap-2">
                      <span>زيارة {social.platform}</span>
                      <ExternalLink className="w-4 h-4" />
                    </div>
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'delivery' && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">خدمة التوصيل</h2>
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="text-center mb-6">
                <div className="text-4xl mb-4">🚚</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">خدمة التوصيل السريع</h3>
                <p className="text-gray-600">نوصل طلباتك في أسرع وقت ممكن</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl mb-2">⚡</div>
                  <h4 className="font-semibold text-gray-800 mb-1">توصيل سريع</h4>
                  <p className="text-sm text-gray-600">خلال 30 دقيقة</p>
                </div>
                
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl mb-2">🛡️</div>
                  <h4 className="font-semibold text-gray-800 mb-1">توصيل آمن</h4>
                  <p className="text-sm text-gray-600">مع ضمان الجودة</p>
                </div>
                
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <div className="text-2xl mb-2">📱</div>
                  <h4 className="font-semibold text-gray-800 mb-1">تتبع الطلب</h4>
                  <p className="text-sm text-gray-600">معرفة مكان طلبك</p>
                </div>
                
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl mb-2">💳</div>
                  <h4 className="font-semibold text-gray-800 mb-1">دفع آمن</h4>
                  <p className="text-sm text-gray-600">كاش أو كارد</p>
                </div>
              </div>
              
              <div className="mt-6 text-center">
                <a
                  href="tel:01012345678"
                  className="inline-flex items-center gap-2 bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  طلب توصيل
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactPage; 