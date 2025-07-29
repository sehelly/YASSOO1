import React, { useState } from 'react';
import { 
  Package, 
  MapPin, 
  Share2, 
  Settings, 
  LogOut, 
  Plus, 
  Edit3, 
  Trash2, 
  Image as ImageIcon,
  Phone,
  Globe,
  MessageCircle,
  Home,
  Users,
  BarChart3,
  FileText,
  AlertCircle,
  Clock,
  CheckCircle
} from 'lucide-react';
import { useAdminStore } from '../store/adminStore';
import ImageUploader from './ImageUploader';

const AdminDashboard = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('stats');
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showAddBranch, setShowAddBranch] = useState(false);
  const [showAddSocial, setShowAddSocial] = useState(false);

  // استخدام المتجر المركزي
  const {
    products,
    branches,
    socialLinks,
    siteSettings,
    addProduct,
    updateProduct,
    deleteProduct,
    addBranch,
    updateBranch,
    deleteBranch,
    addSocialLink,
    updateSocialLink,
    deleteSocialLink,
    updateSiteSettings,
    updateTheme,
    updateHeader,
    updateFooter,
    updateHomepage,
    addNotification,
    markNotificationAsRead,
    deleteNotification
  } = useAdminStore();

  // حالات التعديل
  const [editingProduct, setEditingProduct] = useState(null);
  const [editingBranch, setEditingBranch] = useState(null);
  const [editingSocial, setEditingSocial] = useState(null);
  const [editingSettings, setEditingSettings] = useState(false);

  // إيموجي للاختيار
  const emojis = ['🐟', '🐠', '🐡', '🦐', '🦀', '🐙', '🦑', '🐋', '🐳', '🐬', '🌊', '🌅', '🏖️', '⚓', '🎣'];

  // ألوان للاختيار
  const colorOptions = [
    { name: 'أزرق', value: '#2563eb' },
    { name: 'أحمر', value: '#dc2626' },
    { name: 'أخضر', value: '#16a34a' },
    { name: 'أصفر', value: '#f59e0b' },
    { name: 'بنفسجي', value: '#9333ea' },
    { name: 'برتقالي', value: '#ea580c' }
  ];

  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    category: 'فسيخ',
    stock: '',
    image: '🐟',
    imageUrl: null,
    description: '',
    unit: 'كيلو'
  });

  const [newBranch, setNewBranch] = useState({
    name: '',
    address: '',
    phone: '',
    whatsapp: '',
    hours: '',
    delivery: true
  });

  const [newSocial, setNewSocial] = useState({
    platform: '',
    link: '',
    icon: ''
  });

  const handleAddProduct = () => {
    if (!newProduct.name.trim()) {
      alert('يرجى إدخال اسم المنتج');
      return;
    }
    if (!newProduct.price || parseFloat(newProduct.price) <= 0) {
      alert('يرجى إدخال سعر صحيح');
      return;
    }
    if (!newProduct.stock || parseInt(newProduct.stock) < 0) {
      alert('يرجى إدخال مخزون صحيح');
      return;
    }

    const product = {
      id: Date.now(),
      ...newProduct,
      name: newProduct.name.trim(),
      price: parseFloat(newProduct.price),
      stock: parseInt(newProduct.stock)
    };
    addProduct(product);
    setNewProduct({ name: '', price: '', category: 'فسيخ', stock: '', image: '🐟', imageUrl: null, description: '', unit: 'kilo' });
    setShowAddProduct(false);
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setNewProduct({
      name: product.name,
      price: product.price.toString(),
      category: product.category,
      stock: product.stock.toString(),
      image: product.image,
      imageUrl: product.imageUrl,
      description: product.description,
      unit: product.unit
    });
    setShowAddProduct(true);
  };

  const handleUpdateProduct = () => {
    if (!editingProduct) return;
    
    if (!newProduct.name.trim()) {
      alert('يرجى إدخال اسم المنتج');
      return;
    }
    if (!newProduct.price || parseFloat(newProduct.price) <= 0) {
      alert('يرجى إدخال سعر صحيح');
      return;
    }
    if (!newProduct.stock || parseInt(newProduct.stock) < 0) {
      alert('يرجى إدخال مخزون صحيح');
      return;
    }

    const updates = {
      name: newProduct.name.trim(),
      price: parseFloat(newProduct.price),
      category: newProduct.category,
      stock: parseInt(newProduct.stock),
      image: newProduct.image,
      imageUrl: newProduct.imageUrl,
      description: newProduct.description,
      unit: newProduct.unit
    };
    
    updateProduct(editingProduct.id, updates);
    setEditingProduct(null);
    setNewProduct({ name: '', price: '', category: 'فسيخ', stock: '', image: '🐟', imageUrl: null, description: '', unit: 'كيلو' });
    setShowAddProduct(false);
  };

  const handleCancelEdit = () => {
    setEditingProduct(null);
    setNewProduct({ name: '', price: '', category: 'فسيخ', stock: '', image: '🐟', imageUrl: null, description: '', unit: 'كيلو' });
    setShowAddProduct(false);
  };

  const handleSelectEmoji = (emoji) => {
    setNewProduct({ ...newProduct, image: emoji });
  };

  const handleProductImageUpload = (imageUrl) => {
    setNewProduct({ ...newProduct, imageUrl });
  };

  const handleAddBranch = () => {
    if (!newBranch.name.trim()) {
      alert('يرجى إدخال اسم الفرع');
      return;
    }
    if (!newBranch.address.trim()) {
      alert('يرجى إدخال عنوان الفرع');
      return;
    }
    if (!newBranch.phone.trim()) {
      alert('يرجى إدخال رقم الهاتف');
      return;
    }

    const branch = {
      id: Date.now(),
      ...newBranch,
      name: newBranch.name.trim(),
      address: newBranch.address.trim(),
      phone: newBranch.phone.trim()
    };
    addBranch(branch);
    setNewBranch({ name: '', address: '', phone: '', whatsapp: '', hours: '', delivery: true });
    setShowAddBranch(false);
  };

  const handleAddSocial = () => {
    if (newSocial.platform && newSocial.link) {
      const social = {
        id: Date.now(),
        ...newSocial
      };
      addSocialLink(social);
      setNewSocial({ platform: '', link: '', icon: '' });
      setShowAddSocial(false);
    }
  };

  const handleDeleteProduct = (id) => {
    deleteProduct(id);
  };

  const handleDeleteBranch = (id) => {
    deleteBranch(id);
  };

  const handleDeleteSocial = (id) => {
    deleteSocialLink(id);
  };

  // وظائف التعديل للفروع
  const handleEditBranch = (branch) => {
    setEditingBranch(branch);
    setNewBranch({
      name: branch.name,
      address: branch.address,
      phone: branch.phone,
      whatsapp: branch.whatsapp || '',
      hours: branch.hours,
      delivery: branch.delivery
    });
    setShowAddBranch(true);
  };

  const handleUpdateBranch = () => {
    if (!editingBranch) return;
    
    if (!newBranch.name.trim()) {
      alert('يرجى إدخال اسم الفرع');
      return;
    }
    if (!newBranch.address.trim()) {
      alert('يرجى إدخال عنوان الفرع');
      return;
    }
    if (!newBranch.phone.trim()) {
      alert('يرجى إدخال رقم الهاتف');
      return;
    }

    const updates = {
      name: newBranch.name.trim(),
      address: newBranch.address.trim(),
      phone: newBranch.phone.trim(),
      whatsapp: newBranch.whatsapp,
      hours: newBranch.hours,
      delivery: newBranch.delivery
    };
    
    updateBranch(editingBranch.id, updates);
    setEditingBranch(null);
    setNewBranch({ name: '', address: '', phone: '', whatsapp: '', hours: '', delivery: true });
    setShowAddBranch(false);
  };

  // وظائف التعديل للروابط الاجتماعية
  const handleEditSocial = (social) => {
    setEditingSocial(social);
    setNewSocial({
      platform: social.platform,
      link: social.link,
      icon: social.icon
    });
    setShowAddSocial(true);
  };

  const handleUpdateSocial = () => {
    if (editingSocial && newSocial.platform && newSocial.link) {
      const updates = {
        platform: newSocial.platform,
        link: newSocial.link,
        icon: newSocial.icon
      };
      
      updateSocialLink(editingSocial.id, updates);
      setEditingSocial(null);
      setNewSocial({ platform: '', link: '', icon: '' });
      setShowAddSocial(false);
    }
  };

  const handleLogoUpload = (imageUrl) => {
    updateSiteSettings({ logoImage: imageUrl });
  };

  const handleRemoveLogo = () => {
    updateSiteSettings({ logoImage: null });
  };

  const renderProducts = () => {
    const [selectedCategory, setSelectedCategory] = useState('الكل');
    const categories = ['الكل', ...new Set(products.map(product => product.category))];
    const filteredProducts = selectedCategory === 'الكل' 
      ? products 
      : products.filter(product => product.category === selectedCategory);

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800">إدارة المنتجات</h2>
          <button
            onClick={() => setShowAddProduct(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700"
          >
            <Plus className="w-4 h-4" />
            إضافة منتج
          </button>
        </div>

        {/* فلتر الفئات */}
        <div className="bg-white rounded-lg shadow-sm border p-4">
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-gray-700">فلتر حسب الفئة:</span>
            <div className="flex gap-2">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

              {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProducts.map(product => (
          <div key={product.id} className="bg-white rounded-lg shadow-sm border p-4">
            {/* صورة المنتج */}
            <div className="mb-4">
              {product.imageUrl ? (
                <div className="w-full h-32 bg-gray-100 rounded-lg overflow-hidden">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="w-full h-32 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span className="text-4xl">{product.image}</span>
                </div>
              )}
            </div>
            
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Package className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800">{product.name}</h3>
                <p className="text-sm text-gray-600">{product.category}</p>
              </div>
              <div className="flex gap-1">
                <button 
                  onClick={() => handleEditProduct(product)}
                  className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => handleDeleteProduct(product.id)}
                  className="p-1 text-red-600 hover:bg-red-50 rounded"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">السعر:</span>
                <span className="font-semibold text-green-600">{product.price} ج.م</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">المخزون:</span>
                <span className={`font-semibold ${
                  product.stock === 0 ? 'text-red-600' :
                  product.stock < 10 ? 'text-orange-600' :
                  'text-green-600'
                }`}>
                  {product.stock} قطعة
                  {product.stock === 0 && ' (نفذ المخزون)'}
                  {product.stock < 10 && product.stock > 0 && ' (منخفض)'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">الفئة:</span>
                <span className="font-semibold text-blue-600">{product.category}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">وحدة القياس:</span>
                <span className="font-semibold">{product.unit}</span>
              </div>
              {product.description && (
                <div className="text-sm text-gray-600 line-clamp-2 mt-2 p-2 bg-gray-50 rounded">
                  {product.description}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Product Modal */}
      {showAddProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-bold mb-4">
              {editingProduct ? 'تعديل المنتج' : 'إضافة منتج جديد'}
            </h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="اسم المنتج"
                value={newProduct.name}
                onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                className="w-full p-3 border rounded-lg"
              />
              <input
                type="number"
                placeholder="السعر"
                value={newProduct.price}
                onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                className="w-full p-3 border rounded-lg"
              />
              <input
                type="number"
                placeholder="المخزون"
                value={newProduct.stock}
                onChange={(e) => setNewProduct({...newProduct, stock: e.target.value})}
                className="w-full p-3 border rounded-lg"
              />
              <select
                value={newProduct.category}
                onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                className="w-full p-3 border rounded-lg"
              >
                <option value="فسيخ">فسيخ</option>
                <option value="سردين">سردين</option>
                <option value="رنجة">رنجة</option>
                <option value="مملحات">مملحات</option>
                <option value="أسماك طازجة">أسماك طازجة</option>
                <option value="مأكولات بحرية">مأكولات بحرية</option>
              </select>
              <input
                type="text"
                placeholder="وصف المنتج"
                value={newProduct.description}
                onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                className="w-full p-3 border rounded-lg"
              />
              <select
                value={newProduct.unit}
                onChange={(e) => setNewProduct({...newProduct, unit: e.target.value})}
                className="w-full p-3 border rounded-lg"
              >
                <option value="كيلو">كيلو</option>
                <option value="قطعة">قطعة</option>
                <option value="علبة">علبة</option>
                <option value="كيس">كيس</option>
                <option value="جرام">جرام</option>
              </select>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">صورة المنتج الحقيقية:</label>
                  <ImageUploader
                    onImageUpload={handleProductImageUpload}
                    currentImage={newProduct.imageUrl}
                    placeholder="اضغط لرفع صورة المنتج"
                    maxSize={3}
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">أو اختر إيموجي:</label>
                  <div className="text-4xl text-center p-4 bg-gray-50 rounded-lg mb-2">
                    {newProduct.image}
                  </div>
                  <div className="grid grid-cols-5 gap-2">
                    {emojis.map((emoji, index) => (
                      <button
                        key={index}
                        onClick={() => handleSelectEmoji(emoji)}
                        className={`p-2 text-2xl rounded-lg hover:bg-blue-50 ${
                          newProduct.image === emoji ? 'bg-blue-100 border-2 border-blue-300' : ''
                        }`}
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-2 mt-6">
              <button
                onClick={editingProduct ? handleUpdateProduct : handleAddProduct}
                className="flex-1 bg-blue-600 text-white py-2 rounded-lg"
              >
                {editingProduct ? 'تحديث' : 'إضافة'}
              </button>
              <button
                onClick={editingProduct ? handleCancelEdit : () => setShowAddProduct(false)}
                className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg"
              >
                إلغاء
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    );
  };

  const renderBranches = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-800">إدارة الفروع</h2>
        <button
          onClick={() => setShowAddBranch(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700"
        >
          <Plus className="w-4 h-4" />
          إضافة فرع
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {branches.map(branch => (
          <div key={branch.id} className="bg-white rounded-lg shadow-sm border p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <MapPin className="w-6 h-6 text-green-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800">{branch.name}</h3>
                <p className="text-sm text-gray-600">{branch.address}</p>
                {branch.rating && (
                  <div className="flex items-center gap-1 mt-1">
                    <span className="text-yellow-500">★</span>
                    <span className="text-sm text-gray-600">{branch.rating}</span>
                  </div>
                )}
              </div>
              <div className="flex gap-1">
                <button 
                  onClick={() => handleEditBranch(branch)}
                  className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => handleDeleteBranch(branch.id)}
                  className="p-1 text-red-600 hover:bg-red-50 rounded"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gray-500" />
                <span className="text-sm">{branch.phone}</span>
              </div>
              {branch.whatsapp && (
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-green-600">{branch.whatsapp}</span>
                </div>
              )}
              {branch.hours && (
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span className="text-sm">{branch.hours}</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <span className={`text-xs px-2 py-1 rounded ${
                  branch.delivery 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-red-100 text-red-700'
                }`}>
                  {branch.delivery ? 'يدعم التوصيل' : 'لا يدعم التوصيل'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Branch Modal */}
      {showAddBranch && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-bold mb-4">
              {editingBranch ? 'تعديل الفرع' : 'إضافة فرع جديد'}
            </h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="اسم الفرع"
                value={newBranch.name}
                onChange={(e) => setNewBranch({...newBranch, name: e.target.value})}
                className="w-full p-3 border rounded-lg"
              />
              <input
                type="text"
                placeholder="العنوان"
                value={newBranch.address}
                onChange={(e) => setNewBranch({...newBranch, address: e.target.value})}
                className="w-full p-3 border rounded-lg"
              />
              <input
                type="text"
                placeholder="رقم الهاتف"
                value={newBranch.phone}
                onChange={(e) => setNewBranch({...newBranch, phone: e.target.value})}
                className="w-full p-3 border rounded-lg"
              />
              <input
                type="text"
                placeholder="رقم واتساب"
                value={newBranch.whatsapp}
                onChange={(e) => setNewBranch({...newBranch, whatsapp: e.target.value})}
                className="w-full p-3 border rounded-lg"
              />
              <input
                type="text"
                placeholder="ساعات العمل"
                value={newBranch.hours}
                onChange={(e) => setNewBranch({...newBranch, hours: e.target.value})}
                className="w-full p-3 border rounded-lg"
              />
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <span className="text-sm font-medium text-gray-700">يدعم التوصيل</span>
                <input
                  type="checkbox"
                  checked={newBranch.delivery}
                  onChange={(e) => setNewBranch({...newBranch, delivery: e.target.checked})}
                  className="w-4 h-4 text-blue-600"
                />
              </div>
            </div>
            <div className="flex gap-2 mt-6">
              <button
                onClick={editingBranch ? handleUpdateBranch : handleAddBranch}
                className="flex-1 bg-blue-600 text-white py-2 rounded-lg"
              >
                {editingBranch ? 'تحديث' : 'إضافة'}
              </button>
              <button
                onClick={() => {
                  setEditingBranch(null);
                  setNewBranch({ name: '', address: '', phone: '', whatsapp: '', hours: '', delivery: true });
                  setShowAddBranch(false);
                }}
                className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg"
              >
                إلغاء
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderSocial = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-800">الروابط الاجتماعية</h2>
        <button
          onClick={() => setShowAddSocial(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700"
        >
          <Plus className="w-4 h-4" />
          إضافة رابط
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {socialLinks.map(social => (
          <div key={social.id} className="bg-white rounded-lg shadow-sm border p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center text-2xl">
                {social.icon}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800">{social.platform}</h3>
                <p className="text-sm text-gray-600 truncate">{social.link}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-gray-500">النقرات: {Math.floor(Math.random() * 100) + 10}</span>
                </div>
              </div>
              <div className="flex gap-1">
                <button 
                  onClick={() => window.open(social.link, '_blank')}
                  className="p-1 text-green-600 hover:bg-green-50 rounded"
                  title="فتح الرابط"
                >
                  <Globe className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => handleEditSocial(social)}
                  className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                  title="تعديل"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => handleDeleteSocial(social.id)}
                  className="p-1 text-red-600 hover:bg-red-50 rounded"
                  title="حذف"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Social Modal */}
      {showAddSocial && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-bold mb-4">
              {editingSocial ? 'تعديل الرابط الاجتماعي' : 'إضافة رابط اجتماعي'}
            </h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="اسم المنصة (مثل: WhatsApp)"
                value={newSocial.platform}
                onChange={(e) => setNewSocial({...newSocial, platform: e.target.value})}
                className="w-full p-3 border rounded-lg"
              />
              <input
                type="text"
                placeholder="الرابط"
                value={newSocial.link}
                onChange={(e) => setNewSocial({...newSocial, link: e.target.value})}
                className="w-full p-3 border rounded-lg"
              />
              <input
                type="text"
                placeholder="الأيقونة (مثل: 📱)"
                value={newSocial.icon}
                onChange={(e) => setNewSocial({...newSocial, icon: e.target.value})}
                className="w-full p-3 border rounded-lg"
              />
            </div>
            <div className="flex gap-2 mt-6">
              <button
                onClick={editingSocial ? handleUpdateSocial : handleAddSocial}
                className="flex-1 bg-blue-600 text-white py-2 rounded-lg"
              >
                {editingSocial ? 'تحديث' : 'إضافة'}
              </button>
              <button
                onClick={() => {
                  setEditingSocial(null);
                  setNewSocial({ platform: '', link: '', icon: '' });
                  setShowAddSocial(false);
                }}
                className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg"
              >
                إلغاء
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-800">إعدادات الموقع الشاملة</h2>
        <button
          onClick={() => setEditingSettings(!editingSettings)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          {editingSettings ? 'إلغاء التعديل' : 'تعديل الإعدادات'}
        </button>
      </div>

      {editingSettings ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* المعلومات الأساسية */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-semibold mb-4">المعلومات الأساسية</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">اسم المتجر</label>
                <input
                  type="text"
                  value={siteSettings.storeName}
                  onChange={(e) => updateSiteSettings({ storeName: e.target.value })}
                  className="w-full p-3 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">وصف المتجر</label>
                <textarea
                  value={siteSettings.storeDescription}
                  onChange={(e) => updateSiteSettings({ storeDescription: e.target.value })}
                  className="w-full p-3 border rounded-lg"
                  rows="3"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">رقم الهاتف الرئيسي</label>
                <input
                  type="text"
                  value={siteSettings.mainPhone}
                  onChange={(e) => updateSiteSettings({ mainPhone: e.target.value })}
                  className="w-full p-3 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">البريد الإلكتروني</label>
                <input
                  type="email"
                  value={siteSettings.mainEmail}
                  onChange={(e) => updateSiteSettings({ mainEmail: e.target.value })}
                  className="w-full p-3 border rounded-lg"
                />
              </div>
            </div>
          </div>

          {/* الشعار والصور */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-semibold mb-4">الشعار والصور</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">شعار المتجر الحقيقي</label>
                <ImageUploader
                  onImageUpload={handleLogoUpload}
                  currentImage={siteSettings.logoImage}
                  placeholder="اضغط لرفع شعار المتجر"
                  maxSize={2}
                />
                {siteSettings.logoImage && (
                  <div className="mt-2">
                    <button
                      onClick={handleRemoveLogo}
                      className="text-red-600 text-sm hover:text-red-800 flex items-center gap-1"
                    >
                      <Trash2 className="w-4 h-4" />
                      حذف الشعار
                    </button>
                  </div>
                )}
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">أو اختر إيموجي كشعار:</label>
                  <div className="text-4xl text-center p-4 bg-gray-50 rounded-lg mb-2">
                    {siteSettings.logo}
                  </div>
                  <div className="grid grid-cols-5 gap-2">
                    {emojis.slice(0, 10).map((emoji, index) => (
                      <button
                        key={index}
                        onClick={() => updateSiteSettings({ logo: emoji })}
                        className={`p-2 text-2xl rounded-lg hover:bg-blue-50 ${
                          siteSettings.logo === emoji ? 'bg-blue-100 border-2 border-blue-300' : ''
                        }`}
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">صورة الغلاف</label>
                <div className="text-4xl text-center p-4 bg-gray-50 rounded-lg mb-2">
                  {siteSettings.coverImage}
                </div>
                <div className="grid grid-cols-5 gap-2">
                  {emojis.slice(10).map((emoji, index) => (
                    <button
                      key={index}
                      onClick={() => updateSiteSettings({ coverImage: emoji })}
                      className={`p-2 text-2xl rounded-lg hover:bg-blue-50 ${
                        siteSettings.coverImage === emoji ? 'bg-blue-100 border-2 border-blue-300' : ''
                      }`}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* الألوان والتصميم */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-semibold mb-4">الألوان والتصميم</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">اللون الأساسي</label>
                <div className="grid grid-cols-3 gap-2">
                  {colorOptions.map((color, index) => (
                    <button
                      key={index}
                      onClick={() => updateTheme({ primaryColor: color.value })}
                      className={`p-3 rounded-lg border-2 ${
                        siteSettings.theme.primaryColor === color.value ? 'border-blue-500' : 'border-gray-200'
                      }`}
                      style={{ backgroundColor: color.value }}
                    >
                      <span className="text-white font-medium">{color.name}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">لون الخلفية</label>
                <input
                  type="color"
                  value={siteSettings.theme.backgroundColor}
                  onChange={(e) => updateTheme({ backgroundColor: e.target.value })}
                  className="w-full h-12 rounded-lg"
                />
              </div>
            </div>
          </div>

          {/* إعدادات الهيدر */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-semibold mb-4">إعدادات الهيدر</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">إظهار الشعار</span>
                <input
                  type="checkbox"
                  checked={siteSettings.header.showLogo}
                  onChange={(e) => updateHeader({ showLogo: e.target.checked })}
                  className="w-4 h-4 text-blue-600"
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">إظهار البحث</span>
                <input
                  type="checkbox"
                  checked={siteSettings.header.showSearch}
                  onChange={(e) => updateHeader({ showSearch: e.target.checked })}
                  className="w-4 h-4 text-blue-600"
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">إظهار الإشعارات</span>
                <input
                  type="checkbox"
                  checked={siteSettings.header.showNotifications}
                  onChange={(e) => updateHeader({ showNotifications: e.target.checked })}
                  className="w-4 h-4 text-blue-600"
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">إظهار السلة</span>
                <input
                  type="checkbox"
                  checked={siteSettings.header.showCart}
                  onChange={(e) => updateHeader({ showCart: e.target.checked })}
                  className="w-4 h-4 text-blue-600"
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">إظهار زر لوحة التحكم</span>
                <input
                  type="checkbox"
                  checked={siteSettings.header.showAdminButton}
                  onChange={(e) => updateHeader({ showAdminButton: e.target.checked })}
                  className="w-4 h-4 text-blue-600"
                />
              </div>
            </div>
          </div>

          {/* إعدادات الصفحة الرئيسية */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-semibold mb-4">إعدادات الصفحة الرئيسية</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">إظهار القسم الرئيسي</span>
                <input
                  type="checkbox"
                  checked={siteSettings.homepage.showHero}
                  onChange={(e) => updateHomepage({ showHero: e.target.checked })}
                  className="w-4 h-4 text-blue-600"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">عنوان القسم الرئيسي</label>
                <input
                  type="text"
                  value={siteSettings.homepage.heroTitle}
                  onChange={(e) => updateHomepage({ heroTitle: e.target.value })}
                  className="w-full p-3 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">وصف القسم الرئيسي</label>
                <input
                  type="text"
                  value={siteSettings.homepage.heroSubtitle}
                  onChange={(e) => updateHomepage({ heroSubtitle: e.target.value })}
                  className="w-full p-3 border rounded-lg"
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">إظهار العروض</span>
                <input
                  type="checkbox"
                  checked={siteSettings.homepage.showOffers}
                  onChange={(e) => updateHomepage({ showOffers: e.target.checked })}
                  className="w-4 h-4 text-blue-600"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">عنوان العرض</label>
                <input
                  type="text"
                  value={siteSettings.homepage.offerTitle}
                  onChange={(e) => updateHomepage({ offerTitle: e.target.value })}
                  className="w-full p-3 border rounded-lg"
                />
              </div>
            </div>
          </div>

          {/* إدارة الإشعارات */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-semibold mb-4">إدارة الإشعارات</h3>
            <div className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg mb-4">
                <h4 className="font-semibold text-blue-800 mb-2">💡 وظيفة الإشعارات:</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• إشعارات للعملاء عن تأكيد الطلبات</li>
                  <li>• عروض خاصة وخصومات جديدة</li>
                  <li>• إشعارات عن المنتجات الجديدة</li>
                  <li>• تنبيهات عن حالة التوصيل</li>
                  <li>• رسائل ترحيبية للعملاء الجدد</li>
                </ul>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  onClick={() => addNotification({
                    title: 'عرض خاص جديد',
                    message: 'خصم 25% على جميع منتجات الرنجة هذا الأسبوع',
                    type: 'offer'
                  })}
                  className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700"
                >
                  إضافة عرض خاص
                </button>
                
                <button
                  onClick={() => addNotification({
                    title: 'منتج جديد',
                    message: 'تم إضافة فسيخ بلدي درجة أولى جديد',
                    type: 'product'
                  })}
                  className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
                >
                  إضافة منتج جديد
                </button>
                
                <button
                  onClick={() => addNotification({
                    title: 'تأكيد طلب',
                    message: 'طلبك رقم ORD003 تم تأكيده وجاري التحضير',
                    type: 'order'
                  })}
                  className="bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700"
                >
                  إضافة تأكيد طلب
                </button>
                
                <button
                  onClick={() => addNotification({
                    title: 'توصيل مجاني',
                    message: 'توصيل مجاني للطلبات أكثر من 200 جنيه',
                    type: 'delivery'
                  })}
                  className="bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-orange-700"
                >
                  إضافة عرض توصيل
                </button>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium text-gray-800">الإشعارات الحالية:</h4>
                {siteSettings.notifications.map(notification => (
                  <div key={notification.id} className={`flex items-center justify-between p-3 rounded-lg ${
                    notification.read ? 'bg-gray-50' : 'bg-blue-50 border-l-4 border-blue-500'
                  }`}>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className={`font-medium ${notification.read ? 'text-gray-800' : 'text-blue-800'}`}>
                          {notification.title}
                        </h4>
                        {!notification.read && (
                          <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600">{notification.message}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          notification.type === 'offer' ? 'bg-green-100 text-green-800' :
                          notification.type === 'product' ? 'bg-blue-100 text-blue-800' :
                          notification.type === 'order' ? 'bg-purple-100 text-purple-800' :
                          'bg-orange-100 text-orange-800'
                        }`}>
                          {notification.type === 'offer' ? 'عرض' :
                           notification.type === 'product' ? 'منتج' :
                           notification.type === 'order' ? 'طلب' : 'توصيل'}
                        </span>
                        <span className="text-xs text-gray-500">{notification.time}</span>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      {!notification.read && (
                        <button
                          onClick={() => markNotificationAsRead(notification.id)}
                          className="text-blue-600 hover:text-blue-800 p-1"
                          title="تحديد كمقروء"
                        >
                          <CheckCircle className="w-4 h-4" />
                        </button>
                      )}
                      <button
                        onClick={() => deleteNotification(notification.id)}
                        className="text-red-600 hover:text-red-800 p-1"
                        title="حذف"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="font-semibold text-gray-800 mb-2">اسم المتجر</h3>
            <p className="text-gray-600">{siteSettings.storeName}</p>
            <p className="text-sm text-gray-500 mt-1">{siteSettings.storeDescription}</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="font-semibold text-gray-800 mb-2">اللون الأساسي</h3>
            <div className="flex items-center gap-2">
              <div 
                className="w-6 h-6 rounded-full border"
                style={{ backgroundColor: siteSettings.theme.primaryColor }}
              ></div>
              <span className="text-gray-600">{siteSettings.theme.primaryColor}</span>
            </div>
            <p className="text-sm text-gray-500 mt-1">لون التصميم الرئيسي</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="font-semibold text-gray-800 mb-2">الشعار</h3>
            {siteSettings.logoImage ? (
              <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={siteSettings.logoImage}
                  alt="شعار المتجر"
                  className="w-full h-full object-contain"
                />
              </div>
            ) : (
              <div className="text-3xl">{siteSettings.logo}</div>
            )}
            <p className="text-sm text-gray-500 mt-1">شعار المتجر الحالي</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="font-semibold text-gray-800 mb-2">معلومات الاتصال</h3>
            <p className="text-gray-600">{siteSettings.mainPhone}</p>
            <p className="text-gray-600">{siteSettings.mainEmail}</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="font-semibold text-gray-800 mb-2">إعدادات الهيدر</h3>
            <div className="space-y-1">
              <p className="text-sm text-gray-600">الشعار: {siteSettings.header.showLogo ? 'مفعل' : 'معطل'}</p>
              <p className="text-sm text-gray-600">البحث: {siteSettings.header.showSearch ? 'مفعل' : 'معطل'}</p>
              <p className="text-sm text-gray-600">السلة: {siteSettings.header.showCart ? 'مفعل' : 'معطل'}</p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="font-semibold text-gray-800 mb-2">الإشعارات</h3>
            <p className="text-gray-600">{siteSettings.notifications.length} إشعار</p>
            <p className="text-sm text-gray-500 mt-1">
              {siteSettings.notifications.filter(n => !n.read).length} غير مقروء
            </p>
          </div>
        </div>
      )}
    </div>
  );

  const renderStats = () => {
    // حساب إحصائيات إضافية
    const totalValue = products.reduce((sum, product) => sum + (product.price * product.stock), 0);
    const productsWithImages = products.filter(product => product.imageUrl).length;
    const lowStockProducts = products.filter(product => product.stock < 10).length;
    const categories = [...new Set(products.map(product => product.category))];

    return (
      <div className="space-y-6">
        {/* رسالة ترحيب */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <span className="text-3xl">{siteSettings.logo}</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold mb-2">مرحباً بك في لوحة التحكم</h1>
              <p className="text-blue-100">إدارة متجر {siteSettings.storeName} - كل شيء تحت السيطرة</p>
            </div>
          </div>
        </div>

        <h2 className="text-xl font-bold text-gray-800">إحصائيات المتجر</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Package className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">المنتجات</p>
                <p className="text-2xl font-bold text-gray-800">{products.length}</p>
                <p className="text-xs text-green-600">+{productsWithImages} مع صور</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <MapPin className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">الفروع</p>
                <p className="text-2xl font-bold text-gray-800">{branches.length}</p>
                <p className="text-xs text-blue-600">{branches.filter(b => b.delivery).length} يدعم التوصيل</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">العملاء</p>
                <p className="text-2xl font-bold text-gray-800">156</p>
                <p className="text-xs text-green-600">+12 هذا الشهر</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">الطلبات</p>
                <p className="text-2xl font-bold text-gray-800">89</p>
                <p className="text-xs text-blue-600">+5 اليوم</p>
              </div>
            </div>
          </div>
        </div>

        {/* إحصائيات إضافية */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">القيمة الإجمالية</p>
                <p className="text-xl font-bold text-gray-800">{totalValue.toLocaleString()} ج.م</p>
                <p className="text-xs text-green-600">متوسط السعر: {(totalValue / products.length).toFixed(0)} ج.م</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">المنتجات منخفضة المخزون</p>
                <p className="text-xl font-bold text-red-600">{lowStockProducts}</p>
                <p className="text-xs text-red-600">تحتاج إعادة طلب</p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">الفئات</p>
                <p className="text-xl font-bold text-gray-800">{categories.length}</p>
                <p className="text-xs text-blue-600">أكثر فئة: {categories[0] || 'لا توجد'}</p>
              </div>
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                <Globe className="w-6 h-6 text-indigo-600" />
              </div>
            </div>
          </div>
        </div>

        {/* قائمة الفئات */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold mb-4">توزيع المنتجات حسب الفئات</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {categories.map(category => {
              const categoryProducts = products.filter(product => product.category === category);
              const categoryValue = categoryProducts.reduce((sum, product) => sum + (product.price * product.stock), 0);
              return (
                <div key={category} className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-800 mb-2">{category}</h4>
                  <p className="text-sm text-gray-600">{categoryProducts.length} منتج</p>
                  <p className="text-sm text-green-600 font-medium">{categoryValue.toLocaleString()} ج.م</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            {siteSettings.logoImage ? (
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center overflow-hidden">
                <img
                  src={siteSettings.logoImage}
                  alt="شعار المتجر"
                  className="w-full h-full object-contain"
                />
              </div>
            ) : (
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-xl">{siteSettings.logo}</span>
              </div>
            )}
            <div>
              <h1 className="text-xl font-bold text-gray-800">لوحة التحكم</h1>
              <p className="text-sm text-gray-600">إدارة متجر {siteSettings.storeName}</p>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="flex items-center gap-2 text-gray-600 hover:text-red-600"
          >
            <LogOut className="w-5 h-5" />
            <span>تسجيل الخروج</span>
          </button>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-sm border-r min-h-screen">
          <nav className="p-4">
            <div className="space-y-2">
              <button
                onClick={() => setActiveTab('stats')}
                className={`w-full flex items-center gap-3 p-3 rounded-lg text-right ${
                  activeTab === 'stats' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <BarChart3 className="w-5 h-5" />
                <span>الإحصائيات</span>
              </button>
              <button
                onClick={() => setActiveTab('products')}
                className={`w-full flex items-center gap-3 p-3 rounded-lg text-right ${
                  activeTab === 'products' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Package className="w-5 h-5" />
                <span>المنتجات</span>
              </button>
              <button
                onClick={() => setActiveTab('branches')}
                className={`w-full flex items-center gap-3 p-3 rounded-lg text-right ${
                  activeTab === 'branches' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <MapPin className="w-5 h-5" />
                <span>الفروع</span>
              </button>
              <button
                onClick={() => setActiveTab('social')}
                className={`w-full flex items-center gap-3 p-3 rounded-lg text-right ${
                  activeTab === 'social' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Share2 className="w-5 h-5" />
                <span>الروابط الاجتماعية</span>
              </button>
              <button
                onClick={() => setActiveTab('settings')}
                className={`w-full flex items-center gap-3 p-3 rounded-lg text-right ${
                  activeTab === 'settings' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Settings className="w-5 h-5" />
                <span>الإعدادات</span>
              </button>
            </div>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          {activeTab === 'stats' && renderStats()}
          {activeTab === 'products' && renderProducts()}
          {activeTab === 'branches' && renderBranches()}
          {activeTab === 'social' && renderSocial()}
          {activeTab === 'settings' && renderSettings()}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 