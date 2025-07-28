import { create } from 'zustand'

// متجر إدارة البيانات المركزي
export const useAdminStore = create((set, get) => ({
  // بيانات المنتجات
  products: [
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
      origin: 'الإسكندرية',
      stock: 50
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
      origin: 'دمياط',
      stock: 30
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
      origin: 'بورسعيد',
      stock: 40
    }
  ],

  // بيانات الفروع
  branches: [
    {
      id: 1,
      name: 'الفرع الرئيسي',
      address: 'شارع النيل، القاهرة',
      phone: '01012345678',
      whatsapp: '201012345678',
      hours: '9:00 ص - 10:00 م',
      rating: 4.8,
      features: ['توصيل مجاني', 'دفع إلكتروني', 'خدمة 24/7'],
      delivery: true
    },
    {
      id: 2,
      name: 'فرع المعادي',
      address: 'شارع 9، المعادي',
      phone: '01087654321',
      whatsapp: '201087654321',
      hours: '8:00 ص - 11:00 م',
      rating: 4.6,
      features: ['توصيل سريع', 'خصومات خاصة'],
      delivery: true
    }
  ],

  // الروابط الاجتماعية
  socialLinks: [
    { id: 1, platform: 'WhatsApp', link: 'https://wa.me/201012345678', icon: '📱' },
    { id: 2, platform: 'Facebook', link: 'https://facebook.com/yaso.fish', icon: '📘' },
    { id: 3, platform: 'TikTok', link: 'https://tiktok.com/@yaso.fish', icon: '🎵' },
    { id: 4, platform: 'Instagram', link: 'https://instagram.com/yaso.fish', icon: '📷' }
  ],

  // إعدادات الموقع
  siteSettings: {
    storeName: 'فسخاني ياسو',
    storeDescription: 'أجود الأسماك المملحة في مصر',
    mainPhone: '01012345678',
    mainEmail: 'info@yaso-fish.com',
    logo: '🐟',
    coverImage: '🌊',
    theme: 'blue'
  },

  // إجراءات المنتجات
  addProduct: (product) => {
    const newProduct = {
      ...product,
      id: Date.now(),
      rating: 4.5,
      reviews: 0,
      inStock: true,
      discount: 0,
      images: [product.image],
      nutrition: { protein: '15g', fat: '8g', calories: '150' },
      origin: 'مصر'
    }
    set((state) => ({
      products: [...state.products, newProduct]
    }))
  },

  updateProduct: (id, updates) => {
    set((state) => ({
      products: state.products.map(product =>
        product.id === id ? { ...product, ...updates } : product
      )
    }))
  },

  deleteProduct: (id) => {
    set((state) => ({
      products: state.products.filter(product => product.id !== id)
    }))
  },

  // إجراءات الفروع
  addBranch: (branch) => {
    const newBranch = {
      ...branch,
      id: Date.now(),
      rating: 4.5,
      features: ['توصيل مجاني']
    }
    set((state) => ({
      branches: [...state.branches, newBranch]
    }))
  },

  updateBranch: (id, updates) => {
    set((state) => ({
      branches: state.branches.map(branch =>
        branch.id === id ? { ...branch, ...updates } : branch
      )
    }))
  },

  deleteBranch: (id) => {
    set((state) => ({
      branches: state.branches.filter(branch => branch.id !== id)
    }))
  },

  // إجراءات الروابط الاجتماعية
  addSocialLink: (social) => {
    const newSocial = {
      ...social,
      id: Date.now()
    }
    set((state) => ({
      socialLinks: [...state.socialLinks, newSocial]
    }))
  },

  updateSocialLink: (id, updates) => {
    set((state) => ({
      socialLinks: state.socialLinks.map(social =>
        social.id === id ? { ...social, ...updates } : social
      )
    }))
  },

  deleteSocialLink: (id) => {
    set((state) => ({
      socialLinks: state.socialLinks.filter(social => social.id !== id)
    }))
  },

  // إجراءات إعدادات الموقع
  updateSiteSettings: (settings) => {
    set((state) => ({
      siteSettings: { ...state.siteSettings, ...settings }
    }))
  }
})) 