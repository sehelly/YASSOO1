import React, { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon, CheckCircle, AlertCircle, Camera } from 'lucide-react';

const ImageUploader = ({ 
  onImageUpload, 
  currentImage = null, 
  placeholder = "اضغط لرفع صورة",
  maxSize = 5, // MB
  acceptedTypes = ['image/jpeg', 'image/png', 'image/webp'],
  className = ""
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState('');
  const [preview, setPreview] = useState(currentImage);
  const fileInputRef = useRef(null);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // التحقق من نوع الملف
    if (!acceptedTypes.includes(file.type)) {
      setError('نوع الملف غير مدعوم. يرجى رفع صورة بصيغة JPG, PNG أو WebP');
      return;
    }

    // التحقق من حجم الملف
    if (file.size > maxSize * 1024 * 1024) {
      setError(`حجم الملف كبير جداً. الحد الأقصى ${maxSize}MB`);
      return;
    }

    setError('');
    setIsUploading(true);
    setUploadProgress(0);

    // محاكاة رفع الصورة
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target.result);
      
      // محاكاة التقدم
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        setUploadProgress(progress);
        if (progress >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          onImageUpload(e.target.result, file);
        }
      }, 100);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setPreview(null);
    setError('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    onImageUpload(null);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={`image-uploader ${className}`}>
      <input
        ref={fileInputRef}
        type="file"
        accept={acceptedTypes.join(',')}
        onChange={handleFileSelect}
        className="hidden"
      />
      
      {preview ? (
        <div className="relative group">
          <div className="relative w-full h-48 bg-gray-100 rounded-lg overflow-hidden">
            <img
              src={preview}
              alt="Preview"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200 flex items-center justify-center">
              <button
                onClick={handleClick}
                className="opacity-0 group-hover:opacity-100 bg-white bg-opacity-90 p-2 rounded-full transition-all duration-200 hover:bg-opacity-100"
              >
                <Camera className="w-5 h-5 text-gray-700" />
              </button>
            </div>
            <button
              onClick={handleRemoveImage}
              className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          {isUploading && (
            <div className="mt-2">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-600 mt-1">جاري الرفع... {uploadProgress}%</p>
            </div>
          )}
        </div>
      ) : (
        <div
          onClick={handleClick}
          className="w-full h-48 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all duration-200"
        >
          {isUploading ? (
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
              <p className="text-sm text-gray-600">جاري الرفع...</p>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
            </div>
          ) : (
            <>
              <ImageIcon className="w-12 h-12 text-gray-400 mb-2" />
              <p className="text-gray-600 font-medium">{placeholder}</p>
              <p className="text-xs text-gray-500 mt-1">
                JPG, PNG, WebP - الحد الأقصى {maxSize}MB
              </p>
            </>
          )}
        </div>
      )}

      {error && (
        <div className="mt-2 flex items-center gap-2 text-red-600 text-sm">
          <AlertCircle className="w-4 h-4" />
          {error}
        </div>
      )}

      {!isUploading && !error && preview && (
        <div className="mt-2 flex items-center gap-2 text-green-600 text-sm">
          <CheckCircle className="w-4 h-4" />
          تم رفع الصورة بنجاح
        </div>
      )}
    </div>
  );
};

export default ImageUploader; 