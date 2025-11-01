import { useTranslation } from 'react-i18next';
import qrImg from '../assets/qr.jpg';

export default function Donate() {
  const { t } = useTranslation();
  return (
    <div className="space-y-4 text-center">
      <div className="text-sm opacity-70">{t('donate_desc')}</div>
      <div className="rounded-xl inline-block bg-white text-center">
        <img src={qrImg} alt="Donate QR" className="w-1/2 object-cover inline-block" />
      </div>
    </div>
  );
}


