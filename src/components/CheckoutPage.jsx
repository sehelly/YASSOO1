import React, { useState } from 'react';
import { MapPin, Phone, Clock, CreditCard, ArrowLeft } from 'lucide-react';

const CheckoutPage = ({ cart, setCart, setCurrentPage, getTotalPrice, setOrders }) => {
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [deliveryTime, setDeliveryTime] = useState('now');
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [notes, setNotes] = useState('');

  const handleSubmitOrder = () => {
    const newOrder = {
      id: `ORD${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      status: 'pending',
      total: getTotalPrice(),
      items: cart.map(item => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price
      })),
      deliveryAddress: address,
      phone: phone,
      deliveryTime: deliveryTime,
      paymentMethod: paymentMethod,
      notes: notes
    };
    
    setOrders(prev => [newOrder, ...prev]);
    setCart([]);
    alert('تم إرسال طلبك بنجاح! سيتم التواصل معك خلال دقائق');
    setCurrentPage('orders');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm p-4 flex items-center gap-4">
        <button 
          onClick={() => setCurrentPage('cart')}
          className="text-blue-600"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h2 className="text-xl font-bold text-gray-800">تأكيد الطلب</h2>
      </div>

      <div className="p-4 pb-32">
        {/* ملخص المنتجات */}
        <div className="bg-white rounded-xl p-4 shadow-sm mb-4">
          <h3 className="font-bold text-gray-800 mb-3">منتجاتك ({cart.length})</h3>
          <div className="space-y-2">
            {cart.map(item => (
              <div key={item.id} className="flex justify-between items-center text-sm">
                <span>{item.name} × {item.quantity}</span>
                <span className="font-medium">{item.price * item.quantity} جنيه</span>
              </div>
            ))}
          </div>
          <div className="border-t mt-3 pt-3 flex justify-between font-bold">
            <span>الإجمالي:</span>
            <span className="text-blue-600">{getTotalPrice()} جنيه</span>
          </div>
        </div>

        {/* معلومات التوصيل */}
        <div className="bg-white rounded-xl p-4 shadow-sm mb-4">
          <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-blue-600" />
            عنوان التوصيل
          </h3>
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="أدخل عنوانك بالتفصيل مع رقم الشقة والدور..."
            className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="3"
          />
          <button className="mt-2 text-blue-600 text-sm flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            تحديد الموقع من الخريطة
          </button>
        </div>

        {/* رقم الهاتف */}
        <div className="bg-white rounded-xl p-4 shadow-sm mb-4">
          <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
            <Phone className="w-5 h-5 text-blue-600" />
            رقم الهاتف
          </h3>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="01xxxxxxxxx"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* وقت التوصيل */}
        <div className="bg-white rounded-xl p-4 shadow-sm mb-4">
          <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
            <Clock className="w-5 h-5 text-blue-600" />
            وقت التوصيل
          </h3>
          <div className="space-y-3">
            <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
              <input
                type="radio"
                name="delivery"
                value="now"
                checked={deliveryTime === 'now'}
                onChange={(e) => setDeliveryTime(e.target.value)}
                className="text-blue-600"
              />
              <div>
                <span className="font-medium">توصيل فوري</span>
                <p className="text-sm text-gray-500">خلال 30-60 دقيقة</p>
              </div>
            </label>
            <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
              <input
                type="radio"
                name="delivery"
                value="scheduled"
                checked={deliveryTime === 'scheduled'}
                onChange={(e) => setDeliveryTime(e.target.value)}
                className="text-blue-600"
              />
              <div>
                <span className="font-medium">حجز لوقت محدد</span>
                <p className="text-sm text-gray-500">اختر الوقت المناسب لك</p>
              </div>
            </label>
          </div>
        </div>

        {/* طريقة الدفع */}
        <div className="bg-white rounded-xl p-4 shadow-sm mb-4">
          <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-blue-600" />
            طريقة الدفع
          </h3>
          <div className="space-y-3">
            <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
              <input
                type="radio"
                name="payment"
                value="cash"
                checked={paymentMethod === 'cash'}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="text-blue-600"
              />
              <div>
                <span className="font-medium">الدفع عند الاستلام</span>
                <p className="text-sm text-gray-500">ادفع نقداً عند وصول الطلب</p>
              </div>
            </label>
            <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50 opacity-50 cursor-not-allowed">
              <input
                type="radio"
                name="payment"
                value="online"
                disabled
                className="text-blue-600"
              />
              <div>
                <span className="font-medium">الدفع الإلكتروني</span>
                <p className="text-sm text-gray-500">قريباً - فيزا وماستركارد</p>
              </div>
            </label>
          </div>
        </div>

        {/* ملاحظات إضافية */}
        <div className="bg-white rounded-xl p-4 shadow-sm mb-6">
          <h3 className="font-bold text-gray-800 mb-3">ملاحظات إضافية</h3>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="أي ملاحظات خاصة بالطلب أو التوصيل..."
            className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="3"
          />
        </div>

        {/* تأكيد الطلب */}
        <div className="fixed bottom-20 left-4 right-4">
          <button 
            className="w-full bg-green-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-green-700 transition-colors shadow-lg disabled:bg-gray-400"
            disabled={!address || !phone}
            onClick={handleSubmitOrder}
          >
            تأكيد الطلب ({getTotalPrice()} جنيه)
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage; 