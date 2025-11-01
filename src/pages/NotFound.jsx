import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-white px-4">
      <div className="text-center space-y-6 max-w-md">
        <div className="space-y-2">
          <h1 className="text-9xl font-bold text-indigo-600">404</h1>
          <h2 className="text-2xl font-semibold text-gray-800">
            {t('not_found_title', { defaultValue: 'Trang không tồn tại' })}
          </h2>
          <p className="text-gray-600">
            {t('not_found_desc', { 
              defaultValue: 'Xin lỗi, trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển.' 
            })}
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors duration-200 shadow-lg hover:shadow-xl"
          >
            <Home className="w-5 h-5" />
            {t('back_home', { defaultValue: 'Về trang chủ' })}
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-gray-700 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200"
          >
            <ArrowLeft className="w-5 h-5" />
            {t('go_back', { defaultValue: 'Quay lại' })}
          </button>
        </div>

        <div className="pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500 mb-3">
            {t('not_found_suggest', { defaultValue: 'Các công cụ phổ biến:' })}
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            <Link to="/qr" className="text-sm text-indigo-600 hover:text-indigo-700 hover:underline">
              QR Code
            </Link>
            <span className="text-gray-300">•</span>
            <Link to="/links" className="text-sm text-indigo-600 hover:text-indigo-700 hover:underline">
              Rút gọn Link
            </Link>
            <span className="text-gray-300">•</span>
            <Link to="/whois" className="text-sm text-indigo-600 hover:text-indigo-700 hover:underline">
              WHOIS
            </Link>
            <span className="text-gray-300">•</span>
            <Link to="/ip" className="text-sm text-indigo-600 hover:text-indigo-700 hover:underline">
              IP Lookup
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

