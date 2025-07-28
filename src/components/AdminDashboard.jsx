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
  FileText
} from 'lucide-react';
import { useAdminStore } from '../store/adminStore';

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
    updateSiteSettings
  } = useAdminStore();

  // حالات التعديل
  const [editingProduct, setEditingProduct] = useState(null);
  const [editingBranch, setEditingBranch] = useState(null);
  const [editingSocial, setEditingSocial] = useState(null);

  // إيموجي للاختيار
  const emojis = ['🐟', '🐠', '🐡', '🦐', '🦀', '🐙', '🦑', '🐋', '🐳', '🐬'];

  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    category: 'فسيخ',
    stock: '',
    image: '🐟',
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
    if (newProduct.name && newProduct.price) {
      const product = {
        id: Date.now(),
        ...newProduct,
        price: parseFloat(newProduct.price),
        stock: parseInt(newProduct.stock)
      };
      addProduct(product);
      setNewProduct({ name: '', price: '', category: 'فسيخ', stock: '', image: '🐟', description: '', unit: 'كيلو' });
      setShowAddProduct(false);
    }
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setNewProduct({
      name: product.name,
      price: product.price.toString(),
      category: product.category,
      stock: product.stock.toString(),
      image: product.image,
      description: product.description,
      unit: product.unit
    });
    setShowAddProduct(true);
  };

  const handleUpdateProduct = () => {
    if (editingProduct && newProduct.name && newProduct.price) {
      const updatedProduct = {
        ...editingProduct,
        name: newProduct.name,
        price: parseFloat(newProduct.price),
        category: newProduct.category,
        stock: parseInt(newProduct.stock),
        image: newProduct.image,
        description: newProduct.description,
        unit: newProduct.unit
      };
      
      updateProduct(updatedProduct);
      setEditingProduct(null);
      setNewProduct({ name: '', price: '', category: 'فسيخ', stock: '', image: '🐟', description: '', unit: 'كيلو' });
      setShowAddProduct(false);
    }
  };

  const handleCancelEdit = () => {
    setEditingProduct(null);
    setNewProduct({ name: '', price: '', category: 'فسيخ', stock: '', image: '🐟', description: '', unit: 'كيلو' });
    setShowAddProduct(false);
  };

  const handleSelectEmoji = (emoji) => {
    setNewProduct({ ...newProduct, image: emoji });
  };

  const handleAddBranch = () => {
    if (newBranch.name && newBranch.address && newBranch.phone) {
      const branch = {
        id: Date.now(),
        ...newBranch
      };
      addBranch(branch);
      setNewBranch({ name: '', address: '', phone: '', whatsapp: '', hours: '', delivery: true });
      setShowAddBranch(false);
    }
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

  const renderProducts = () => (
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

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map(product => (
          <div key={product.id} className="bg-white rounded-lg shadow-sm border p-4">
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
                <span className="font-semibold">{product.stock} قطعة</span>
              </div>
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
              <input
                type="text"
                placeholder="وصف المنتج"
                value={newProduct.description}
                onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                className="w-full p-3 border rounded-lg"
              />
              <input
                type="text"
                placeholder="وحدة القياس"
                value={newProduct.unit}
                onChange={(e) => setNewProduct({...newProduct, unit: e.target.value})}
                className="w-full p-3 border rounded-lg"
              />
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">الصورة الحالية:</label>
                <div className="text-4xl text-center p-4 bg-gray-50 rounded-lg">
                  {newProduct.image}
                </div>
                <label className="block text-sm font-medium text-gray-700">اختر إيموجي جديد:</label>
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
              </div>
              <div className="flex gap-1">
                <button className="p-1 text-blue-600 hover:bg-blue-50 rounded">
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
              <div className="flex items-center gap-2">
                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                  {branch.delivery ? 'يدعم التوصيل' : 'لا يدعم التوصيل'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Branch Modal */}
      {showAddBranch && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-bold mb-4">إضافة فرع جديد</h3>
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
            </div>
            <div className="flex gap-2 mt-6">
              <button
                onClick={handleAddBranch}
                className="flex-1 bg-blue-600 text-white py-2 rounded-lg"
              >
                إضافة
              </button>
              <button
                onClick={() => setShowAddBranch(false)}
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
              </div>
              <div className="flex gap-1">
                <button className="p-1 text-blue-600 hover:bg-blue-50 rounded">
                  <Edit3 className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => handleDeleteSocial(social.id)}
                  className="p-1 text-red-600 hover:bg-red-50 rounded"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Social Modal */}
      {showAddSocial && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-bold mb-4">إضافة رابط اجتماعي</h3>
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
                onClick={handleAddSocial}
                className="flex-1 bg-blue-600 text-white py-2 rounded-lg"
              >
                إضافة
              </button>
              <button
                onClick={() => setShowAddSocial(false)}
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
      <h2 className="text-xl font-bold text-gray-800">إعدادات المتجر</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Store Info */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Settings className="w-5 h-5 text-blue-600" />
            معلومات المتجر
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">اسم المتجر</label>
              <input
                type="text"
                defaultValue={siteSettings.name}
                onChange={(e) => updateSiteSettings({ name: e.target.value })}
                className="w-full p-3 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">وصف المتجر</label>
              <textarea
                defaultValue={siteSettings.description}
                onChange={(e) => updateSiteSettings({ description: e.target.value })}
                className="w-full p-3 border rounded-lg"
                rows="3"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">رقم الهاتف الرئيسي</label>
              <input
                type="text"
                defaultValue={siteSettings.phone}
                onChange={(e) => updateSiteSettings({ phone: e.target.value })}
                className="w-full p-3 border rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* Logo & Images */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-blue-600" />
            اللوجو والصور
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">لوجو المتجر</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                <ImageIcon className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">اضغط لرفع اللوجو</p>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">صورة الغلاف</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                <ImageIcon className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">اضغط لرفع صورة الغلاف</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStats = () => (
    <div className="space-y-6">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <Settings className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">لوحة التحكم</h1>
              <p className="text-sm text-gray-600">إدارة متجر ياسو</p>
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