import { useTranslation } from 'react-i18next';

export default function TermsOfService() {
  const { t } = useTranslation();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
      <p className="text-sm text-zinc-600 mb-6">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">1. Acceptance of Terms</h2>
        <p className="text-zinc-700">
          By accessing and using this service, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">2. Description of Service</h2>
        <p className="text-zinc-700">
          This service provides various online tools and utilities. We reserve the right to modify, suspend, or discontinue any part of the service at any time without prior notice.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">3. User Accounts and Authentication</h2>
        <p className="text-zinc-700">
          To access certain features, you may be required to create an account using third-party authentication services (Google or Facebook). You agree to:
        </p>
        <ul className="list-disc list-inside space-y-2 ml-4 text-zinc-700">
          <li>Provide accurate and complete information</li>
          <li>Maintain the security of your account credentials</li>
          <li>Accept responsibility for all activities that occur under your account</li>
          <li>Notify us immediately of any unauthorized use of your account</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">4. User Conduct</h2>
        <p className="text-zinc-700">
          You agree not to use the service to:
        </p>
        <ul className="list-disc list-inside space-y-2 ml-4 text-zinc-700">
          <li>Violate any applicable laws or regulations</li>
          <li>Infringe upon the rights of others</li>
          <li>Transmit any harmful, offensive, or illegal content</li>
          <li>Attempt to gain unauthorized access to the service or its systems</li>
          <li>Interfere with or disrupt the service or servers</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">5. Intellectual Property</h2>
        <p className="text-zinc-700">
          All content, features, and functionality of the service are owned by us and are protected by international copyright, trademark, and other intellectual property laws.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">6. Disclaimer of Warranties</h2>
        <p className="text-zinc-700">
          THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">7. Limitation of Liability</h2>
        <p className="text-zinc-700">
          TO THE FULLEST EXTENT PERMITTED BY LAW, WE SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">8. Termination</h2>
        <p className="text-zinc-700">
          We reserve the right to terminate or suspend your account and access to the service immediately, without prior notice or liability, for any reason, including if you breach these Terms of Service.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">9. Changes to Terms</h2>
        <p className="text-zinc-700">
          We reserve the right to modify these terms at any time. We will notify users of any material changes by posting the new Terms of Service on this page and updating the "Last updated" date.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">10. Governing Law</h2>
        <p className="text-zinc-700">
          These Terms of Service shall be governed by and construed in accordance with applicable laws, without regard to its conflict of law provisions.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">11. Contact Information</h2>
        <p className="text-zinc-700">
          If you have any questions about these Terms of Service, please contact us through our support channels.
        </p>
      </section>
    </div>
  );
}

