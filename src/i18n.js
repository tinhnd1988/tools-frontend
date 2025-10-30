import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  vi: {
    translation: {
      title: 'Utility Tools',
      home: 'Trang chủ',
      qr: 'QR Code',
      vietqr: 'VietQR',
      links: 'Rút gọn Link',
      notes: 'Notepad',
      whois: 'WHOIS',
      ip: 'Kiểm tra IP',
      encode: 'URL/Base64',
      twofa: 'Mã 2FA',
      ua: 'Fake UA',
      proxy: 'Proxy Checker',
      donate: 'Donate',
      welcome: 'Chào mừng bạn đến với Utility Tools!',
      tools_available: 'Các công cụ có sẵn',
      home_desc: 'Tổng hợp tiện ích thường dùng hằng ngày cho công việc và học tập.',
      qr_desc: 'Tạo ảnh QR từ văn bản/URL.',
      vietqr_desc: 'Sinh ảnh QR chuyển khoản ngân hàng nhanh chóng.',
      links_desc: 'Rút gọn liên kết, quản lý mã và lượt click.',
      notes_desc: 'Ghi chú trực tuyến đơn giản, chia sẻ bằng public key.',
      whois_desc: 'Tra cứu thông tin tên miền (WHOIS).',
      ip_desc: 'Xem thông tin vị trí, ISP của IP.',
      encode_desc: 'Công cụ URL encode/decode, Base64.',
      twofa_desc: 'Tạo secret, QR và verify mã 2FA.',
      ua_desc: 'Sinh User-Agent ngẫu nhiên.',
      proxy_desc: 'Kiểm tra proxy sống và độ trễ.',
      donate_desc: 'Ủng hộ tác giả qua mã QR.',
    },
  },
  en: {
    translation: {
      title: 'Utility Tools',
      home: 'Home',
      qr: 'QR Code',
      vietqr: 'VietQR',
      links: 'Short Links',
      notes: 'Notepad',
      whois: 'WHOIS',
      ip: 'IP Lookup',
      encode: 'URL/Base64',
      twofa: '2FA',
      ua: 'Fake UA',
      proxy: 'Proxy Checker',
      donate: 'Donate',
      welcome: 'Welcome to Utility Tools!',
      tools_available: 'Available tools',
      home_desc: 'A collection of handy utilities for daily tasks.',
      qr_desc: 'Generate QR images from text/URLs.',
      vietqr_desc: 'Create bank transfer QR images for Vietnam.',
      links_desc: 'Shorten links and track codes/clicks.',
      notes_desc: 'Simple online notes, share via public key.',
      whois_desc: 'Lookup domain WHOIS information.',
      ip_desc: 'Check IP geolocation and ISP.',
      encode_desc: 'URL/Base64 encode and decode.',
      twofa_desc: 'Generate secrets, QR and verify 2FA codes.',
      ua_desc: 'Randomize User-Agent strings.',
      proxy_desc: 'Check proxy health and latency.',
      donate_desc: 'Support the author via QR.',
    },
  },
};

const defaultLng = import.meta.env.VITE_DEFAULT_LANG || 'vi';

i18n.use(initReactI18next).init({
  resources,
  lng: defaultLng,
  fallbackLng: defaultLng,
  interpolation: { escapeValue: false },
});

export default i18n;


