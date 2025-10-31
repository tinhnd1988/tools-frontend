import { useTranslation } from 'react-i18next';

export default function PrivacyPolicy() {
  const { t } = useTranslation();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold mb-6">{t('privacy_title')}</h1>
      <p className="text-sm text-zinc-600 mb-6">{t('privacy_last_updated')}: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">{t('privacy_section1_title')}</h2>
        <p className="text-zinc-700">
          {t('privacy_section1_desc')}
        </p>
        <ul className="list-disc list-inside space-y-2 ml-4 text-zinc-700">
          <li>{t('privacy_section1_item1')}</li>
          <li>{t('privacy_section1_item2')}</li>
          <li>{t('privacy_section1_item3')}</li>
          <li>{t('privacy_section1_item4')}</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">{t('privacy_section2_title')}</h2>
        <p className="text-zinc-700">
          {t('privacy_section2_desc')}
        </p>
        <ul className="list-disc list-inside space-y-2 ml-4 text-zinc-700">
          <li>{t('privacy_section2_item1')}</li>
          <li>{t('privacy_section2_item2')}</li>
          <li>{t('privacy_section2_item3')}</li>
          <li>{t('privacy_section2_item4')}</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">{t('privacy_section3_title')}</h2>
        <p className="text-zinc-700">
          {t('privacy_section3_desc')}
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">{t('privacy_section4_title')}</h2>
        <p className="text-zinc-700">
          {t('privacy_section4_desc')}
        </p>
        <ul className="list-disc list-inside space-y-2 ml-4 text-zinc-700">
          <li><a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Google Privacy Policy</a></li>
          <li><a href="https://www.facebook.com/privacy/explanation" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Facebook Privacy Policy</a></li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">{t('privacy_section5_title')}</h2>
        <p className="text-zinc-700">
          {t('privacy_section5_desc')}
        </p>
        <ul className="list-disc list-inside space-y-2 ml-4 text-zinc-700">
          <li>{t('privacy_section5_item1')}</li>
          <li>{t('privacy_section5_item2')}</li>
          <li>{t('privacy_section5_item3')}</li>
          <li>{t('privacy_section5_item4')}</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">{t('privacy_section6_title')}</h2>
        <p className="text-zinc-700">
          {t('privacy_section6_desc')}
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">{t('privacy_section7_title')}</h2>
        <p className="text-zinc-700">
          {t('privacy_section7_desc')}
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">{t('privacy_section8_title')}</h2>
        <p className="text-zinc-700">
          {t('privacy_section8_desc')}
        </p>
      </section>
    </div>
  );
}
