import { useTranslation } from 'react-i18next';

export default function TermsOfService() {
  const { t } = useTranslation();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold mb-6">{t('terms_title')}</h1>
      <p className="text-sm text-zinc-600 mb-6">{t('terms_last_updated')}: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">{t('terms_section1_title')}</h2>
        <p className="text-zinc-700">
          {t('terms_section1_desc')}
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">{t('terms_section2_title')}</h2>
        <p className="text-zinc-700">
          {t('terms_section2_desc')}
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">{t('terms_section3_title')}</h2>
        <p className="text-zinc-700">
          {t('terms_section3_desc')}
        </p>
        <ul className="list-disc list-inside space-y-2 ml-4 text-zinc-700">
          <li>{t('terms_section3_item1')}</li>
          <li>{t('terms_section3_item2')}</li>
          <li>{t('terms_section3_item4')}</li>
          <li>{t('terms_section3_item4')}</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">{t('terms_section4_title')}</h2>
        <p className="text-zinc-700">
          {t('terms_section4_desc')}
        </p>
        <ul className="list-disc list-inside space-y-2 ml-4 text-zinc-700">
          <li>{t('terms_section4_item1')}</li>
          <li>{t('terms_section4_item2')}</li>
          <li>{t('terms_section4_item3')}</li>
          <li>{t('terms_section4_item4')}</li>
          <li>{t('terms_section4_item5')}</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">{t('terms_section5_title')}</h2>
        <p className="text-zinc-700">
          {t('terms_section5_desc')}
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">{t('terms_section6_title')}</h2>
        <p className="text-zinc-700">
          {t('terms_section6_desc')}
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">{t('terms_section7_title')}</h2>
        <p className="text-zinc-700">
          {t('terms_section7_desc')}
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">{t('terms_section8_title')}</h2>
        <p className="text-zinc-700">
          {t('terms_section8_desc')}
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">{t('terms_section9_title')}</h2>
        <p className="text-zinc-700">
          {t('terms_section9_desc')}
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">{t('terms_section10_title')}</h2>
        <p className="text-zinc-700">
          {t('terms_section10_desc')}
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">{t('terms_section11_title')}</h2>
        <p className="text-zinc-700">
          {t('terms_section11_desc')}
        </p>
      </section>
    </div>
  );
}
