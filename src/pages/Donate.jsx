import { useTranslation } from 'react-i18next';
import qrImg from '../assets/qr.jpg';
import OptimizedImage from '../components/OptimizedImage';

export default function Donate() {
  const { t } = useTranslation();
  return (
    <div className="space-y-4 text-center">
      <div className="text-sm opacity-70">{t('donate_desc')}</div>
      <div className="rounded-xl inline-block bg-white text-center p-4">
        <OptimizedImage 
          src={qrImg} 
          alt="Donate QR Code" 
          width={300} 
          height={300}
          className="max-w-full h-auto mx-auto object-contain" 
        />
      </div>
    </div>
  );
}


