import React from 'react';
import { Plus, Minus, ArrowLeft } from 'lucide-react';

const CartPage = ({ cart, setCart, setCurrentPage, getTotalPrice, updateCartQuantity }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm p-4 flex items-center gap-4">
        <button 
          onClick={() => setCurrentPage('home')}
          className="text-blue-600"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h2 className="text-xl font-bold text-gray-800">سلة التسوق</h2>
        {cart.length > 0 && (
          <span className="bg-blue-100 text-blue-600 text-sm px-2 py-1 rounded-full">
            {cart.reduce((sum, item) => sum + item.quantity, 0)} منتج
          </span>
        )}
      </div>

      {cart.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">🛒</div>
          <h3 className="text-xl font-bold text-gray-600 mb-2">السلة فارغة</h3>
          <p className="text-gray-400 mb-8">أضف بعض المنتجات الشهية لتبدأ التسوق</p>
          <button 
            onClick={() => setCurrentPage('home')}
            className="bg-blue-600 text-white px-8 py-3 rounded-xl hover:bg-blue-700 font-medium"
          >
            تصفح المنتجات
          </button>
        </div>
      ) : (
        <div className="p-4 pb-32">
          {/* كود الخصم */}
          <div className="bg-gradient-to-r from-green-400 to-blue-500 rounded-xl p-4 text-white mb-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold">🎉 لديك كود خصم!</h3>
                <p className="text-sm opacity-90">استخدم YASO20 للحصول على خصم 20%</p>
              </div>
              <button className="bg-white text-blue-600 px-4 py-2 rounded-lg font-bold text-sm">
                تطبيق
              </button>
            </div>
          </div>

          {/* عناصر السلة */}
          <div className="space-y-4 mb-6">
            {cart.map(item => (
              <div key={item.id} className="bg-white rounded-xl p-4 shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="text-3xl">{item.image}</div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-800">{item.name}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <span>{item.price} جنيه/{item.unit}</span>
                      {item.discount > 0 && (
                        <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-xs">
                          -{item.discount}%
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                      className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center font-medium">{item.quantity}</span>
                    <button 
                      onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-100">
                  <button 
                    onClick={() => updateCartQuantity(item.id, 0)}
                    className="text-red-500 text-sm hover:text-red-700"
                  >
                    حذف
                  </button>
                  <span className="text-lg font-bold text-gray-800">
                    {item.price * item.quantity} جنيه
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* ملخص الطلب */}
          <div className="bg-white rounded-xl p-4 shadow-sm mb-6">
            <h3 className="font-bold text-gray-800 mb-4">ملخص الطلب</h3>
            <div className="space-y-3">
              <div className="flex justify-between text-gray-600">
                <span>المجموع الفرعي:</span>
                <span>{getTotalPrice()} جنيه</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>رسوم التوصيل:</span>
                <span className="text-green-600 font-medium">مجاناً</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>الخصم:</span>
                <span className="text-green-600">-0 جنيه</span>
              </div>
              <div className="border-t pt-3 flex justify-between font-bold text-xl">
                <span>الإجمالي:</span>
                <span className="text-blue-600">{getTotalPrice()} جنيه</span>
              </div>
            </div>
          </div>

          {/* أزرار العمل */}
          <div className="fixed bottom-20 left-4 right-4 space-y-3">
            <button 
              onClick={() => setCurrentPage('checkout')}
              className="w-full bg-green-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-green-700 transition-colors shadow-lg"
            >
              متابعة الطلب ({getTotalPrice()} جنيه)
            </button>
            <button 
              onClick={() => setCurrentPage('home')}
              className="w-full bg-gray-200 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-300 transition-colors"
            >
              متابعة التسوق
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage; 