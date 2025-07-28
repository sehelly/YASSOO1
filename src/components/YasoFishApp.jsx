import React, { useState, useEffect } from 'react';
import { ShoppingCart, MapPin, Phone, User, Home, Plus, Minus, Star, Clock, Truck, Search, Heart, Filter, Bell, Settings, CreditCard, Package, CheckCircle, XCircle, AlertCircle, MessageCircle, LogOut, Shield } from 'lucide-react';
import CartPage from './CartPage';
import OrdersPage from './OrdersPage';
import ProfilePage from './ProfilePage';
import CheckoutPage from './CheckoutPage';
import NotificationsPage from './NotificationsPage';
import AdminLogin from './AdminLogin';
import ContactPage from './ContactPage';
import { useAdminStore } from '../store/adminStore';

const YasoFishApp = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [orders, setOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications, setNotifications] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [adminUser, setAdminUser] = useState(null);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('الكل');
  const [AdminDashboardComponent, setAdminDashboardComponent] = useState(null);

  // استخدام المتجر المركزي
  const { products, branches, socialLinks, siteSettings } = useAdminStore();

  // تطبيق الألوان الديناميكية
  const dynamicStyles = {
    '--primary-color': siteSettings.theme.primaryColor,
    '--secondary-color': siteSettings.theme.secondaryColor,
    '--accent-color': siteSettings.theme.accentColor,
    '--background-color': siteSettings.theme.backgroundColor,
    '--text-color': siteSettings.theme.textColor,
    '--header-bg': siteSettings.theme.headerBg,
    '--footer-bg': siteSettings.theme.footerBg
  };

  // تطبيق الألوان على العناصر
  const headerStyle = {
    backgroundColor: siteSettings.theme.headerBg,
    boxShadow: siteSettings.header.shadow ? '0 2px 4px rgba(0,0,0,0.1)' : 'none',
    height: siteSettings.header.height
  };

  const footerStyle = {
    backgroundColor: siteSettings.footer.backgroundColor,
    color: siteSettings.footer.textColor
  };

  // دوال إدارة لوحة التحكم
  const handleAdminLogin = (adminData) => {
    setAdminUser(adminData);
    setShowAdminLogin(false);
  };

  const handleAdminLogout = () => {
    setAdminUser(null);
    setCurrentPage('home');
  };

  const handleShowAdminLogin = () => {
    setShowAdminLogin(true);
  };

  const handleBackToSite = () => {
    setShowAdminLogin(false);
    setCurrentPage('home');
  };

  // تحميل AdminDashboard فقط عند الحاجة
  useEffect(() => {
    if (adminUser && !AdminDashboardComponent) {
      import('./AdminDashboard').then(module => {
        setAdminDashboardComponent(() => module.default);
      }).catch(error => {
        console.error('خطأ في تحميل لوحة التحكم:', error);
      });
    }
  }, [adminUser, AdminDashboardComponent]);

  // بيانات أساسية
  const categories = ['الكل', 'فسيخ', 'سردين', 'رنجة', 'ملوحة', 'أنشوجة', 'سلمون'];

  // دوال السلة والطلبات
  const addToCart = (product, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
  };

  const updateCartQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      setCart(prev => prev.filter(item => item.id !== productId));
    } else {
      setCart(prev =>
        prev.map(item =>
          item.id === productId ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const toggleFavorite = (productId) => {
    setFavorites(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getFilteredProducts = () => {
    let filtered = selectedCategory === 'الكل' 
      ? products 
      : products.filter(product => product.category === selectedCategory);

    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  };

  // واجهة البداية المحدثة
  const HomePage = () => (
    <div className="min-h-screen" style={{ backgroundColor: siteSettings.theme.backgroundColor }}>
      {/* Header */}
      <div className="bg-white shadow-lg" style={headerStyle}>
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            {user && (
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-blue-600" />
              </div>
            )}
            <div className="flex items-center gap-3">
              {siteSettings.header.showLogo && (
                <div className="text-3xl">{siteSettings.logo}</div>
              )}
              <div>
                <h1 className="text-2xl font-bold" style={{ color: siteSettings.theme.primaryColor }}>
                  {siteSettings.storeName}
                </h1>
                <p className="text-xs text-gray-600">{siteSettings.storeDescription}</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            {siteSettings.header.showNotifications && (
              <div className="relative">
                <Bell 
                  className="w-7 h-7 text-gray-600 cursor-pointer" 
                  onClick={() => setCurrentPage('notifications')}
                />
                {siteSettings.notifications.filter(n => !n.read).length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    {siteSettings.notifications.filter(n => !n.read).length}
                  </span>
                )}
              </div>
            )}
            {siteSettings.header.showCart && (
              <div className="relative">
                <ShoppingCart 
                  className="w-7 h-7 cursor-pointer" 
                  style={{ color: siteSettings.theme.primaryColor }}
                  onClick={() => setCurrentPage('cart')}
                />
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cart.reduce((sum, item) => sum + item.quantity, 0)}
                  </span>
                )}
              </div>
            )}
            {siteSettings.header.showAdminButton && (
              <div className="relative">
                <Shield 
                  className="w-7 h-7 text-green-600 cursor-pointer" 
                  onClick={handleShowAdminLogin}
                  title="لوحة التحكم"
                />
              </div>
            )}
          </div>
        </div>

        {/* شريط البحث */}
        {siteSettings.header.showSearch && (
          <div className="px-4 pb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="ابحث عن المنتجات..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                style={{ '--tw-ring-color': siteSettings.theme.primaryColor }}
              />
            </div>
          </div>
        )}
      </div>

      {/* العروض الخاصة */}
      {siteSettings.homepage.showOffers && (
        <div className="p-4">
          <div className="bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 rounded-xl p-4 text-white mb-4 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-white opacity-10 rounded-full -mr-10 -mt-10"></div>
            <div className="flex items-center justify-between relative z-10">
              <div>
                <h3 className="font-bold text-lg">{siteSettings.homepage.offerTitle}</h3>
                <p className="text-sm opacity-90">{siteSettings.homepage.offerDescription}</p>
                <p className="text-xs opacity-75 mt-1">كود الخصم: {siteSettings.homepage.offerCode}</p>
              </div>
              <div className="text-right">
                <Clock className="w-6 h-6 mb-1 mx-auto" />
                <p className="text-xs">متبقي 4 ساعات</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* قسم Hero */}
      {siteSettings.homepage.showHero && (
        <div className="p-4">
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-6 text-white text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-16 -mt-16"></div>
            <div className="relative z-10">
              <div className="text-6xl mb-4">{siteSettings.homepage.heroImage}</div>
              <h2 className="text-2xl font-bold mb-2">{siteSettings.homepage.heroTitle}</h2>
              <p className="text-lg opacity-90">{siteSettings.homepage.heroSubtitle}</p>
            </div>
          </div>
        </div>
      )}

      {/* فئات المنتجات */}
      <div className="px-4 mb-4">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-all ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                  : 'bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* المنتجات */}
      <div className="px-4 pb-20">
        {getFilteredProducts().length === 0 ? (
          <div className="text-center py-10">
            <div className="text-4xl mb-4">🔍</div>
            <h3 className="text-lg font-medium text-gray-600 mb-2">لا توجد نتائج</h3>
            <p className="text-gray-400">جرب البحث عن منتج آخر</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {getFilteredProducts().map(product => (
              <div key={product.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="relative p-4">
                  {/* علامة التخفيض */}
                  {product.discount > 0 && (
                    <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                      -{product.discount}%
                    </div>
                  )}
                  
                  {/* زر المفضلة */}
                  <button 
                    onClick={() => toggleFavorite(product.id)}
                    className="absolute top-2 right-2 p-1"
                  >
                    <Heart className={`w-5 h-5 ${favorites.includes(product.id) ? 'text-red-500 fill-current' : 'text-gray-400'}`} />
                  </button>

                  {/* صورة المنتج */}
                  <div 
                    className="text-center cursor-pointer"
                    onClick={() => {
                      setSelectedProduct(product);
                      setCurrentPage('product-details');
                    }}
                  >
                    <div className="w-20 h-20 mx-auto mb-2 rounded-xl bg-blue-100 flex items-center justify-center text-4xl border">
                      {product.image}
                    </div>
                    
                    {/* عدم التوفر */}
                    {!product.inStock && (
                      <div className="absolute inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center rounded-xl">
                        <span className="text-white font-bold">غير متوفر</span>
                      </div>
                    )}
                  </div>

                  <div className="text-center">
                    <h3 className="font-bold text-gray-800 mb-1 text-sm">{product.name}</h3>
                    
                    {/* التقييم */}
                    <div className="flex items-center justify-center gap-1 mb-2">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600">{product.rating}</span>
                      <span className="text-xs text-gray-400">({product.reviews})</span>
                    </div>

                    {/* السعر */}
                    <div className="mb-3">
                      <div className="flex items-center justify-center gap-2">
                        <span className="text-lg font-bold text-blue-600">{product.price} جنيه</span>
                        {product.originalPrice > product.price && (
                          <span className="text-sm text-gray-400 line-through">{product.originalPrice}</span>
                        )}
                      </div>
                      <span className="text-xs text-gray-500">/{product.unit}</span>
                    </div>

                    {/* زر الإضافة */}
                    <button
                      onClick={() => addToCart(product)}
                      disabled={!product.inStock}
                      className={`w-full py-2 rounded-lg font-medium text-sm transition-colors ${
                        product.inStock
                          ? 'bg-blue-600 text-white hover:bg-blue-700'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      {product.inStock ? (
                        <div className="flex items-center justify-center gap-2">
                          <Plus className="w-4 h-4" />
                          أضف للسلة
                        </div>
                      ) : (
                        'غير متوفر'
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );

  // شريط التنقل السفلي
  const BottomNavigation = () => (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
      <div className="flex justify-around py-3">
        <button 
          onClick={() => setCurrentPage('home')}
          className={`flex flex-col items-center ${currentPage === 'home' ? 'text-blue-600' : 'text-gray-500'}`}
        >
          <Home className="w-6 h-6" />
          <span className="text-xs mt-1">الرئيسية</span>
        </button>
        <button 
          onClick={() => setCurrentPage('cart')}
          className={`flex flex-col items-center relative ${currentPage === 'cart' ? 'text-blue-600' : 'text-gray-500'}`}
        >
          <ShoppingCart className="w-6 h-6" />
          <span className="text-xs mt-1">السلة</span>
          {cart.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              {cart.reduce((sum, item) => sum + item.quantity, 0)}
            </span>
          )}
        </button>
        <button 
          onClick={() => setCurrentPage('orders')}
          className={`flex flex-col items-center ${currentPage === 'orders' ? 'text-blue-600' : 'text-gray-500'}`}
        >
          <Truck className="w-6 h-6" />
          <span className="text-xs mt-1">طلباتي</span>
        </button>
        <button 
          onClick={() => setCurrentPage('profile')}
          className={`flex flex-col items-center ${currentPage === 'profile' ? 'text-blue-600' : 'text-gray-500'}`}
        >
          <User className="w-6 h-6" />
          <span className="text-xs mt-1">حسابي</span>
        </button>
        <button 
          onClick={() => setCurrentPage('contact')}
          className={`flex flex-col items-center ${currentPage === 'contact' ? 'text-blue-600' : 'text-gray-500'}`}
        >
          <MessageCircle className="w-6 h-6" />
          <span className="text-xs mt-1">اتصل بنا</span>
        </button>
      </div>
    </div>
  );

  // عرض الصفحة المناسبة
  const renderCurrentPage = () => {
    // عرض لوحة التحكم إذا كان المدير مسجل دخول
    if (adminUser) {
      if (!AdminDashboardComponent) {
        return (
          <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">جاري تحميل لوحة التحكم...</p>
            </div>
          </div>
        );
      }
      return <AdminDashboardComponent onLogout={handleAdminLogout} />;
    }

    // عرض صفحة تسجيل دخول المدير
    if (showAdminLogin) {
      return <AdminLogin onLogin={handleAdminLogin} onBack={handleBackToSite} />;
    }

    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'cart':
        return (
          <CartPage
            cart={cart}
            setCart={setCart}
            setCurrentPage={setCurrentPage}
            getTotalPrice={getTotalPrice}
            updateCartQuantity={updateCartQuantity}
          />
        );
      case 'checkout':
        return (
          <CheckoutPage
            cart={cart}
            setCart={setCart}
            setCurrentPage={setCurrentPage}
            getTotalPrice={getTotalPrice}
            setOrders={setOrders}
          />
        );
      case 'orders':
        return (
          <OrdersPage
            orders={orders}
            setCurrentPage={setCurrentPage}
          />
        );
      case 'notifications':
        return (
          <NotificationsPage
            notifications={notifications}
            setNotifications={setNotifications}
            setCurrentPage={setCurrentPage}
          />
        );
      case 'profile':
        return (
          <ProfilePage
            user={user}
            setUser={setUser}
            favorites={favorites}
            orders={orders}
            setCurrentPage={setCurrentPage}
          />
        );
      case 'contact':
        return (
          <ContactPage
            setCurrentPage={setCurrentPage}
          />
        );
      case 'product-details':
        return <ProductDetailsPage />;
      default:
        return <HomePage />;
    }
  };

  return renderCurrentPage();
};

export default YasoFishApp; 