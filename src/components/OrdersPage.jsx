import React from 'react';
import { Clock, CheckCircle, Package, XCircle, AlertCircle, Eye, Truck } from 'lucide-react';

const OrdersPage = ({ orders, setCurrentPage }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      case 'in_progress': return 'bg-orange-100 text-orange-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'pending': return 'في الانتظار';
      case 'confirmed': return 'تم التأكيد';
      case 'in_progress': return 'قيد التحضير';
      case 'delivered': return 'تم التوصيل';
      case 'cancelled': return 'ملغي';
      default: return status;
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'confirmed': return <CheckCircle className="w-4 h-4" />;
      case 'in_progress': return <Package className="w-4 h-4" />;
      case 'delivered': return <CheckCircle className="w-4 h-4" />;
      case 'cancelled': return <XCircle className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm p-4">
        <h2 className="text-xl font-bold text-gray-800 text-center">طلباتي</h2>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">📦</div>
          <h3 className="text-xl font-bold text-gray-600 mb-2">لا توجد طلبات</h3>
          <p className="text-gray-400 mb-8">ابدأ التسوق واطلب أول منتجاتك</p>
          <button 
            onClick={() => setCurrentPage('home')}
            className="bg-blue-600 text-white px-8 py-3 rounded-xl hover:bg-blue-700 font-medium"
          >
            تصفح المنتجات
          </button>
        </div>
      ) : (
        <div className="p-4 pb-20">
          <div className="space-y-4">
            {orders.map(order => (
              <div key={order.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-bold text-gray-800">طلب رقم #{order.id}</h3>
                      <p className="text-sm text-gray-500">{order.date}</p>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 ${getStatusColor(order.status)}`}>
                      {getStatusIcon(order.status)}
                      {getStatusText(order.status)}
                    </div>
                  </div>

                  <div className="mb-3">
                    <p className="text-sm text-gray-600 mb-1">العنوان: {order.deliveryAddress}</p>
                    {order.estimatedDelivery && (
                      <p className="text-sm text-gray-600">التوصيل المتوقع: {order.estimatedDelivery}</p>
                    )}
                  </div>

                  <div className="mb-3">
                    <h4 className="font-medium text-gray-800 mb-2">المنتجات:</h4>
                    <div className="space-y-1">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex justify-between text-sm">
                          <span>{item.name} × {item.quantity}</span>
                          <span>{item.price * item.quantity} جنيه</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                    <div className="flex gap-2">
                      <button className="bg-blue-100 text-blue-600 px-3 py-1 rounded-lg text-sm hover:bg-blue-200">
                        <Eye className="w-4 h-4 inline mr-1" />
                        تفاصيل
                      </button>
                      {order.status === 'delivered' && (
                        <button className="bg-green-100 text-green-600 px-3 py-1 rounded-lg text-sm hover:bg-green-200">
                          إعادة طلب
                        </button>
                      )}
                    </div>
                    <span className="font-bold text-lg text-gray-800">{order.total} جنيه</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdersPage; 