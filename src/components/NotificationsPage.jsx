import React from 'react';
import { Package, Bell, ArrowLeft } from 'lucide-react';

const NotificationsPage = ({ notifications, setNotifications, setCurrentPage }) => {
  const markAsRead = (notificationId) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === notificationId ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, read: true })));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm p-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setCurrentPage('home')}
            className="text-blue-600"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="text-xl font-bold text-gray-800">الإشعارات</h2>
        </div>
        {notifications.filter(n => !n.read).length > 0 && (
          <button 
            onClick={markAllAsRead}
            className="text-blue-600 text-sm hover:text-blue-800"
          >
            قراءة الكل
          </button>
        )}
      </div>

      {notifications.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">🔔</div>
          <h3 className="text-xl font-bold text-gray-600 mb-2">لا توجد إشعارات</h3>
          <p className="text-gray-400">ستظهر هنا جميع الإشعارات والتحديثات</p>
        </div>
      ) : (
        <div className="p-4 pb-20">
          <div className="space-y-3">
            {notifications.map(notification => (
              <div 
                key={notification.id} 
                className={`bg-white rounded-xl p-4 shadow-sm cursor-pointer hover:shadow-md transition-shadow ${
                  !notification.read ? 'border-l-4 border-blue-500' : ''
                }`}
                onClick={() => markAsRead(notification.id)}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    notification.type === 'order' ? 'bg-blue-100' : 'bg-orange-100'
                  }`}>
                    {notification.type === 'order' ? (
                      <Package className="w-5 h-5 text-blue-600" />
                    ) : (
                      <Bell className="w-5 h-5 text-orange-600" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className={`font-medium ${!notification.read ? 'text-gray-900' : 'text-gray-600'}`}>
                        {notification.title}
                      </h3>
                      <span className="text-xs text-gray-400">{notification.time}</span>
                    </div>
                    <p className="text-sm text-gray-600">{notification.message}</p>
                    {!notification.read && (
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    )}
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

export default NotificationsPage; 