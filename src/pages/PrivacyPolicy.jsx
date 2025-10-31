import { useTranslation } from 'react-i18next';

export default function PrivacyPolicy() {
  const { t } = useTranslation();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <p className="text-sm text-zinc-600 mb-6">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">1. Information We Collect</h2>
        <p className="text-zinc-700">
          When you use our service and authenticate via Google or Facebook, we collect the following information:
        </p>
        <ul className="list-disc list-inside space-y-2 ml-4 text-zinc-700">
          <li>Your name as provided by the authentication provider</li>
          <li>Your email address</li>
          <li>Your profile picture/avatar</li>
          <li>Authentication provider identifier (Google ID or Facebook ID)</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">2. How We Use Your Information</h2>
        <p className="text-zinc-700">
          We use the information we collect to:
        </p>
        <ul className="list-disc list-inside space-y-2 ml-4 text-zinc-700">
          <li>Authenticate and identify you when you use our services</li>
          <li>Provide you with personalized features and content</li>
          <li>Improve our services and user experience</li>
          <li>Communicate with you regarding your account or our services</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">3. Data Storage and Security</h2>
        <p className="text-zinc-700">
          We take reasonable measures to protect your personal information. Your data is stored securely and we use industry-standard security practices to safeguard your information. However, no method of transmission over the Internet or electronic storage is 100% secure.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">4. Third-Party Services</h2>
        <p className="text-zinc-700">
          We use Google and Facebook authentication services. When you authenticate through these providers, you are also subject to their privacy policies:
        </p>
        <ul className="list-disc list-inside space-y-2 ml-4 text-zinc-700">
          <li><a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Google Privacy Policy</a></li>
          <li><a href="https://www.facebook.com/privacy/explanation" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Facebook Privacy Policy</a></li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">5. Your Rights</h2>
        <p className="text-zinc-700">
          You have the right to:
        </p>
        <ul className="list-disc list-inside space-y-2 ml-4 text-zinc-700">
          <li>Access your personal information</li>
          <li>Request correction of inaccurate information</li>
          <li>Request deletion of your account and data</li>
          <li>Withdraw your consent at any time</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">6. Cookies and Tracking</h2>
        <p className="text-zinc-700">
          We use cookies and similar technologies to maintain your authentication session and improve your experience. You can control cookie settings through your browser preferences.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">7. Changes to This Policy</h2>
        <p className="text-zinc-700">
          We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">8. Contact Us</h2>
        <p className="text-zinc-700">
          If you have any questions about this Privacy Policy, please contact us through our support channels.
        </p>
      </section>
    </div>
  );
}

