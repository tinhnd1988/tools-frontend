import { useTranslation } from 'react-i18next';
import qrImg from '../assets/qr.jpg';

export default function Donate() {
  const { t } = useTranslation();
  return (
    <div className="space-y-4 text-center">
      <div className="text-sm opacity-70">{t('donate_desc')}</div>
      <div className="rounded-xl border p-4 inline-block bg-white dark:bg-zinc-900">
        <img src={qrImg} alt="Donate QR" className="w-96 h-96 object-contain" />
      </div>
    </div>
  );
}


