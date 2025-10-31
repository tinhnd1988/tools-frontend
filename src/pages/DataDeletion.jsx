import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/AuthContext';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Trash2, CheckCircle, AlertCircle } from 'lucide-react';

export default function DataDeletion() {
  const { t } = useTranslation();
  const { user, isAuthenticated } = useAuth();
  const [searchParams] = useSearchParams();
  const confirmationCode = searchParams.get('code');
  const [email, setEmail] = useState(isAuthenticated ? user?.email || '' : '');
  const [submitted, setSubmitted] = useState(!!confirmationCode);
  const [error, setError] = useState('');
  
  useEffect(() => {
    if (confirmationCode) {
      setSubmitted(true);
    }
  }, [confirmationCode]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitted(false);

    if (!email) {
      setError(t('deletion_error_required'));
      return;
    }

    // In a real implementation, you would send a request to your backend
    // to initiate the data deletion process
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSubmitted(true);
      setEmail('');
    } catch (err) {
      setError(t('deletion_error_generic'));
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
          <Trash2 className="w-8 h-8 text-blue-600" />
          {t('deletion_title')}
        </h1>
        <p className="text-zinc-700">
          {t('deletion_subtitle')}
        </p>
      </div>

      <section className="space-y-4 bg-white border rounded-lg p-6">
        <h2 className="text-2xl font-semibold">{t('deletion_howto_title')}</h2>
        <p className="text-zinc-700">
          {t('deletion_howto_desc')}
        </p>
        
        <div className="space-y-3">
          <div className="flex gap-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-semibold">
              1
            </div>
            <div className="flex-1">
              <p className="font-semibold text-zinc-900">{t('deletion_step1_title')}</p>
              <p className="text-zinc-600 text-sm">
                {t('deletion_step1_desc')}
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-semibold">
              2
            </div>
            <div className="flex-1">
              <p className="font-semibold text-zinc-900">{t('deletion_step2_title')}</p>
              <p className="text-zinc-600 text-sm">
                {t('deletion_step2_desc')}
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-semibold">
              3
            </div>
            <div className="flex-1">
              <p className="font-semibold text-zinc-900">{t('deletion_step3_title')}</p>
              <p className="text-zinc-600 text-sm">
                {t('deletion_step3_desc')}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-4 bg-white border rounded-lg p-6">
        <h2 className="text-2xl font-semibold">{t('deletion_form_title')}</h2>
        
        {submitted ? (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start gap-3">
            <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-green-900">{t('deletion_success_title')}</p>
              <p className="text-green-700 text-sm mt-1">
                {t('deletion_success_desc')}
              </p>
              {confirmationCode && (
                <p className="text-green-600 text-sm mt-2">
                  {t('deletion_confirmation_code')}: <strong>{confirmationCode}</strong>
                </p>
              )}
              <button
                onClick={() => {
                  setSubmitted(false);
                  setEmail('');
                }}
                className="mt-3 text-sm text-green-700 hover:text-green-900 underline"
              >
                {t('deletion_send_another')}
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-zinc-700 mb-2">
                {t('deletion_email_label')} <span className="text-red-500">{t('deletion_email_required')}</span>
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="your.email@example.com"
                required
                disabled={isAuthenticated}
              />
              {isAuthenticated && (
                <p className="text-sm text-zinc-500 mt-1">
                  {t('deletion_email_auto')}
                </p>
              )}
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-start gap-2">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}

            <div className="bg-zinc-50 border border-zinc-200 rounded-lg p-4">
              <p className="text-sm text-zinc-700 mb-2">
                <strong>{t('deletion_note_title')}:</strong> {t('deletion_note_desc')}
              </p>
              <ul className="list-disc list-inside space-y-1 text-sm text-zinc-600 ml-2">
                <li>{t('deletion_note_item1')}</li>
                <li>{t('deletion_note_item2')}</li>
                <li>{t('deletion_note_item3')}</li>
                <li>{t('deletion_note_item4')}</li>
              </ul>
            </div>

            <button
              type="submit"
              className="w-full bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
            >
              <Trash2 className="w-5 h-5" />
              {t('deletion_submit')}
            </button>
          </form>
        )}
      </section>

      <section className="space-y-4 bg-white border rounded-lg p-6">
        <h2 className="text-2xl font-semibold">{t('deletion_facebook_title')}</h2>
        <p className="text-zinc-700">
          {t('deletion_facebook_desc')}
        </p>
        <ol className="list-decimal list-inside space-y-2 ml-2 text-zinc-700">
          <li>{t('deletion_facebook_step1')}</li>
          <li>{t('deletion_facebook_step2')}</li>
          <li>{t('deletion_facebook_step3')}</li>
          <li>{t('deletion_facebook_step4')}</li>
        </ol>
      </section>

      <section className="space-y-4 bg-white border rounded-lg p-6">
        <h2 className="text-2xl font-semibold">{t('deletion_what_title')}</h2>
        <p className="text-zinc-700 mb-3">
          {t('deletion_what_desc')}
        </p>
        <ul className="list-disc list-inside space-y-2 ml-4 text-zinc-700">
          <li>{t('deletion_what_item1')}</li>
          <li>{t('deletion_what_item2')}</li>
          <li>{t('deletion_what_item3')}</li>
          <li>{t('deletion_what_item4')}</li>
        </ul>
      </section>

      <section className="space-y-4 bg-white border rounded-lg p-6">
        <h2 className="text-2xl font-semibold">{t('deletion_time_title')}</h2>
        <p className="text-zinc-700">
          {t('deletion_time_desc')} <strong>{t('deletion_time_days')}</strong> {t('deletion_time_suffix')}
        </p>
      </section>

      <section className="space-y-4 bg-white border rounded-lg p-6">
        <h2 className="text-2xl font-semibold">{t('deletion_contact_title')}</h2>
        <p className="text-zinc-700">
          {t('deletion_contact_desc')}
        </p>
        <p className="text-zinc-600 text-sm">
          Tham khảo thêm tại: <a href="https://developers.facebook.com/docs/development/create-an-app/app-dashboard/data-deletion-callback" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Facebook Data Deletion Documentation</a>
        </p>
      </section>
    </div>
  );
}
