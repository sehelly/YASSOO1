import React, { useState, useEffect } from 'react';
import { ShoppingCart, MapPin, Phone, User, Home, Plus, Minus, Star, Clock, Truck, Search, Heart, Filter, Edit3, Bell, Settings, CreditCard, Package, CheckCircle, XCircle, AlertCircle, Eye, MessageCircle, LogOut, Camera } from 'lucide-react';

const YasoFishApp = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [orders, setOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications, setNotifications] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // بيانات المنتجات المحدثة
  const products = [
    {
      id: 1,
      name: 'فسيخ بلدي درجة أولى',
      price: 45,
      originalPrice: 50,
      unit: 'كيلو',
      image: '🐟',
      category: 'فسيخ',
      description: 'فسيخ بلدي طازج ومملح بعناية فائقة، تم اصطياده من البحر الأبيض المتوسط',
      rating: 4.8,
      reviews: 156,
      inStock: true,
      discount: 10,
      images: ['🐟', '🐠', '🐡'],
      nutrition: { protein: '18g', fat: '12g', calories: '180' },
      origin: 'الإسكندرية'
    },
    {
      id: 2,
      name: 'سردين مملح فاخر',
      price: 35,
      originalPrice: 40,
      unit: 'كيلو',
      image: '🐠',
      category: 'سردين',
      description: 'سردين مملح عالي الجودة ومعبأ في زيت الزيتون الطبيعي',
      rating: 4.6,
      reviews: 89,
      inStock: true,
      discount: 12,
      images: ['🐠', '🐟', '🐡'],
      nutrition: { protein: '20g', fat: '10g', calories: '165' },
      origin: 'دمياط'
    },
    {
      id: 3,
      name: 'رنجة مدخنة مميزة',
      price: 55,
      originalPrice: 65,
      unit: 'كيلو',
      image: '🐡',
      category: 'رنجة',
      description: 'رنجة مدخنة بالطريقة التقليدية مع التوابل الطبيعية',
      rating: 4.9,
      reviews: 203,
      inStock: true,
      discount: 15,
      images: ['🐡', '🐠', '🐟'],
      nutrition: { protein: '22g', fat: '15g', calories: '210' },
      origin: 'بورسعيد'
    },
    {
      id: 4,
      name: 'ملوحة بحرية طازجة',
      price: 40,
      originalPrice: 45,
      unit: 'كيلو',
      image: '🦐',
      category: 'ملوحة',
      description: 'مجموعة متنوعة من الملوحة البحرية الطازجة',
      rating: 4.7,
      reviews: 124,
      inStock: true,
      discount: 11,
      images: ['🦐', '🦀', '🐙'],
      nutrition: { protein: '16g', fat: '8g', calories: '140' },
      origin: 'البحر الأحمر'
    },
    {
      id: 5,
      name: 'أنشوجة مملحة',
      price: 60,
      originalPrice: 70,
      unit: 'كيلو',
      image: '🐟',
      category: 'أنشوجة',
      description: 'أنشوجة مملحة فاخرة بالطريقة الإيطالية',
      rating: 4.5,
      reviews: 67,
      inStock: false,
      discount: 14,
      images: ['🐟', '🐠'],
      nutrition: { protein: '19g', fat: '11g', calories: '175' },
      origin: 'البحر المتوسط'
    },
    {
      id: 6,
      name: 'سلمون مدخن',
      price: 120,
      originalPrice: 140,
      unit: 'كيلو',
      image: '🍣',
      category: 'سلمون',
      description: 'سلمون مدخن فاخر مستورد من النرويج',
      rating: 4.9,
      reviews: 89,
      inStock: true,
      discount: 14,
      images: ['🍣', '🐟'],
      nutrition: { protein: '25g', fat: '18g', calories: '250' },
      origin: 'النرويج'
    }
  ];

  const categories = ['الكل', 'فسيخ', 'سردين', 'رنجة', 'ملوحة', 'أنشوجة', 'سلمون'];
  const [selectedCategory, setSelectedCategory] = useState('الكل');

  // بيانات الطلبات التجريبية
  const sampleOrders = [
    {
      id: 'ORD001',
      date: '2024-12-15',
      status: 'delivered',
      total: 135,
      items: [
        { name: 'فسيخ بلدي', quantity: 2, price: 45 },
        { name: 'رنجة مدخنة', quantity: 1, price: 55 }
      ],
      deliveryAddress: 'شارع الجلاء، المحلة الكبرى',
      estimatedDelivery: '15:30'
    },
    {
      id: 'ORD002',
      date: '2024-12-14',
      status: 'in_progress',
      total: 75,
      items: [
        { name: 'سردين مملح', quantity: 2, price: 35 }
      ],
      deliveryAddress: 'شارع البحر، المحلة الكبرى',
      estimatedDelivery: '16:00'
    }
  ];

  useEffect(() => {
    setOrders(sampleOrders);
  }, []);

  // إضافة الإشعارات
  const sampleNotifications = [
    {
      id: 1,
      title: 'تم تأكيد طلبك',
      message: 'طلبك رقم ORD002 تم تأكيده وجاري التحضير',
      time: '10 دقائق',
      read: false,
      type: 'order'
    },
    {
      id: 2,
      title: 'عرض خاص',
      message: 'خصم 20% على جميع منتجات الرنجة لفترة محدودة',
      time: 'ساعة',
      read: false,
      type: 'offer'
    }
  ];

  useEffect(() => {
    setNotifications(sampleNotifications);
  }, []);

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      {/* Header */}
      <div className="bg-white shadow-lg">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            {user && (
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-blue-600" />
              </div>
            )}
            <div>
              <h1 className="text-2xl font-bold text-blue-800">🐟 ياسو</h1>
              <p className="text-xs text-gray-600">أجود الأسماك المملحة</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative">
              <Bell 
                className="w-7 h-7 text-gray-600 cursor-pointer" 
                onClick={() => setCurrentPage('notifications')}
              />
              {notifications.filter(n => !n.read).length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {notifications.filter(n => !n.read).length}
                </span>
              )}
            </div>
            <div className="relative">
              <ShoppingCart 
                className="w-7 h-7 text-blue-600 cursor-pointer" 
                onClick={() => setCurrentPage('cart')}
              />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cart.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* شريط البحث */}
        <div className="px-4 pb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="ابحث عن المنتجات..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* العروض الخاصة */}
      <div className="p-4">
        <div className="bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 rounded-xl p-4 text-white mb-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-white opacity-10 rounded-full -mr-10 -mt-10"></div>
          <div className="flex items-center justify-between relative z-10">
            <div>
              <h3 className="font-bold text-lg">🔥 عرض اليوم</h3>
              <p className="text-sm opacity-90">خصم يصل إلى 20% على منتجات مختارة</p>
              <p className="text-xs opacity-75 mt-1">كود الخصم: YASO20</p>
            </div>
            <div className="text-right">
              <Clock className="w-6 h-6 mb-1 mx-auto" />
              <p className="text-xs">متبقي 4 ساعات</p>
            </div>
          </div>
        </div>
      </div>

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
                    <div className="text-4xl mb-2">{product.image}</div>
                    
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

  // صفحة تفاصيل المنتج
  const ProductDetailsPage = () => {
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [quantity, setQuantity] = useState(1);

    if (!selectedProduct) return null;

    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm p-4 flex items-center justify-between">
          <button 
            onClick={() => setCurrentPage('home')}
            className="text-blue-600 flex items-center gap-2"
          >
            ← رجوع
          </button>
          <h2 className="text-lg font-bold text-gray-800">تفاصيل المنتج</h2>
          <button 
            onClick={() => toggleFavorite(selectedProduct.id)}
            className="p-1"
          >
            <Heart className={`w-6 h-6 ${favorites.includes(selectedProduct.id) ? 'text-red-500 fill-current' : 'text-gray-400'}`} />
          </button>
        </div>

        <div className="pb-20">
          {/* صور المنتج */}
          <div className="bg-white p-6">
            <div className="text-center mb-4">
              <div className="text-8xl mb-4">{selectedProduct.images[selectedImageIndex]}</div>
              <div className="flex justify-center gap-2">
                {selectedProduct.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`text-2xl p-2 rounded-lg ${
                      selectedImageIndex === index ? 'bg-blue-100' : 'bg-gray-100'
                    }`}
                  >
                    {img}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* معلومات المنتج */}
          <div className="bg-white p-4 mb-4">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h1 className="text-xl font-bold text-gray-800 mb-2">{selectedProduct.name}</h1>
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="font-medium">{selectedProduct.rating}</span>
                    <span className="text-gray-500">({selectedProduct.reviews} تقييم)</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-2">المنشأ: {selectedProduct.origin}</p>
              </div>
              
              {selectedProduct.discount > 0 && (
                <div className="bg-red-500 text-white text-sm px-3 py-1 rounded-full font-bold">
                  -{selectedProduct.discount}%
                </div>
              )}
            </div>

            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl font-bold text-blue-600">{selectedProduct.price} جنيه</span>
              {selectedProduct.originalPrice > selectedProduct.price && (
                <span className="text-lg text-gray-400 line-through">{selectedProduct.originalPrice} جنيه</span>
              )}
              <span className="text-gray-500">/{selectedProduct.unit}</span>
            </div>

            <p className="text-gray-700 mb-4">{selectedProduct.description}</p>

            {/* المعلومات الغذائية */}
            <div className="bg-gray-50 rounded-lg p-3 mb-4">
              <h3 className="font-bold text-gray-800 mb-2">المعلومات الغذائية (لكل 100 جرام):</h3>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div className="text-center">
                  <div className="font-bold text-blue-600">{selectedProduct.nutrition.protein}</div>
                  <div className="text-gray-600">بروتين</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-blue-600">{selectedProduct.nutrition.fat}</div>
                  <div className="text-gray-600">دهون</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-blue-600">{selectedProduct.nutrition.calories}</div>
                  <div className="text-gray-600">سعرة</div>
                </div>
              </div>
            </div>

            {/* اختيار الكمية */}
            <div className="flex items-center justify-between mb-4">
              <span className="font-medium text-gray-800">الكمية:</span>
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="text-lg font-bold w-8 text-center">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="text-right mb-4">
              <span className="text-lg font-bold text-gray-800">
                الإجمالي: {selectedProduct.price * quantity} جنيه
              </span>
            </div>
          </div>

          {/* أزرار العمل */}
          <div className="fixed bottom-20 left-4 right-4 flex gap-3">
            <button 
              onClick={() => {
                addToCart(selectedProduct, quantity);
                setCurrentPage('cart');
              }}
              disabled={!selectedProduct.inStock}
              className={`flex-1 py-4 rounded-lg font-bold text-lg transition-colors ${
                selectedProduct.inStock
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {selectedProduct.inStock ? 'أضف للسلة' : 'غير متوفر'}
            </button>
            <button 
              onClick={() => {
                addToCart(selectedProduct, quantity);
                setCurrentPage('checkout');
              }}
              disabled={!selectedProduct.inStock}
              className={`flex-1 py-4 rounded-lg font-bold text-lg transition-colors ${
                selectedProduct.inStock
                  ? 'bg-green-600 text-white hover:bg-green-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {selectedProduct.inStock ? 'اشتري الآن' : 'غير متوفر'}
            </button>
          </div>
        </div>
      </div>
    );
  };

  // واجهة السلة
  const CartPage = () => (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm p-4 flex items-center gap-4">
        <button 
          onClick={() => setCurrentPage('home')}
          className="text-blue-600"
        >
          ← رجوع
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

  // واجهة تأكيد الطلب
  const CheckoutPage = () => {
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [deliveryTime, setDeliveryTime] = useState('now');
    const [paymentMethod, setPaymentMethod] = useState('cash');
    const [notes, setNotes] = useState('');

    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm p-4 flex items-center gap-4">
          <button 
            onClick={() => setCurrentPage('cart')}
            className="text-blue-600"
          >
            ← رجوع
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
              onClick={() => {
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
              }}
            >
              تأكيد الطلب ({getTotalPrice()} جنيه)
            </button>
          </div>
        </div>
      </div>
    );
  };

  // صفحة الطلبات
  const OrdersPage = () => {
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
        <BottomNavigation />
      </div>
    );
  };

  // صفحة الإشعارات
  const NotificationsPage = () => {
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
              ← رجوع
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

  // صفحة الحساب الشخصي
  const ProfilePage = () => {
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
        <BottomNavigation />
      </div>
    );
  };

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
      </div>
    </div>
  );

  // عرض الصفحة المناسبة
  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home': return <HomePage />;
      case 'cart': return <CartPage />;
      case 'checkout': return <CheckoutPage />;
      case 'orders': return <OrdersPage />;
      case 'notifications': return <NotificationsPage />;
      case 'profile': return <ProfilePage />;
      case 'product-details': return <ProductDetailsPage />;
      default: return <HomePage />;
    }
  };

  return renderCurrentPage();
};

export default YasoFishApp;