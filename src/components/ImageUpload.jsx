import React, { useState } from 'react';
import { Upload, X, Image as ImageIcon, CheckCircle, AlertCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { getStorageConfig } from '../config/app';

const ImageUpload = ({ onUpload, onCancel, folder = 'products' }) => {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState('');

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      const storageConfig = getStorageConfig();
      
      // التحقق من نوع الملف
      if (!storageConfig.allowedTypes.includes(file.type)) {
        setError('يرجى اختيار ملف صورة صحيح (JPG, PNG, GIF, WebP)');
        return;
      }

      // التحقق من حجم الملف
      if (file.size > storageConfig.maxFileSize) {
        setError(`حجم الملف يجب أن يكون أقل من ${storageConfig.maxFileSize / 1024 / 1024} ميجابايت`);
        return;
      }

      setSelectedFile(file);
      setError('');

      // إنشاء معاينة للصورة
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = async () => {
    if (!selectedFile) {
      setError('يرجى اختيار صورة أولاً');
      return;
    }

    setUploading(true);
    setUploadProgress(0);
    setError('');

    try {
      // إنشاء اسم فريد للملف
      const fileExt = selectedFile.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `${folder}/${fileName}`;

      const storageConfig = getStorageConfig();
      
      // رفع الصورة إلى Supabase Storage
      const { data, error } = await supabase.storage
        .from(storageConfig.bucket)
        .upload(filePath, selectedFile, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) {
        throw error;
      }

      // الحصول على رابط الصورة العامة
      const { data: { publicUrl } } = supabase.storage
        .from(storageConfig.bucket)
        .getPublicUrl(filePath);

      setUploadProgress(100);
      
      // إرجاع رابط الصورة للمكون الأب
      onUpload(publicUrl);
      
    } catch (error) {
      console.error('خطأ في رفع الصورة:', error);
      setError('حدث خطأ أثناء رفع الصورة. يرجى المحاولة مرة أخرى.');
    } finally {
      setUploading(false);
    }
  };

  const removeSelectedFile = () => {
    setSelectedFile(null);
    setPreview('');
    setError('');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-bold text-gray-800">رفع صورة</h3>
          <button
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* منطقة رفع الملف */}
        {!selectedFile ? (
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
              id="file-upload"
            />
            <label htmlFor="file-upload" className="cursor-pointer">
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-2">اضغط لاختيار صورة</p>
              <p className="text-sm text-gray-500">JPG, PNG, GIF حتى 5MB</p>
            </label>
          </div>
        ) : (
          <div className="space-y-4">
            {/* معاينة الصورة */}
            <div className="relative">
              <img
                src={preview}
                alt="معاينة"
                className="w-full h-48 object-cover rounded-lg"
              />
              <button
                onClick={removeSelectedFile}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* معلومات الملف */}
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-700">{selectedFile.name}</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                الحجم: {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          </div>
        )}

        {/* رسالة الخطأ */}
        {error && (
          <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
            <AlertCircle className="w-5 h-5 text-red-500" />
            <span className="text-red-700 text-sm">{error}</span>
          </div>
        )}

        {/* شريط التقدم */}
        {uploading && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>جاري رفع الصورة...</span>
              <span>{uploadProgress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* أزرار التحكم */}
        <div className="flex gap-3 mt-6">
          <button
            onClick={onCancel}
            className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 transition-colors"
            disabled={uploading}
          >
            إلغاء
          </button>
          {selectedFile && (
            <button
              onClick={uploadImage}
              disabled={uploading}
              className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {uploading ? 'جاري الرفع...' : 'رفع الصورة'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageUpload; 