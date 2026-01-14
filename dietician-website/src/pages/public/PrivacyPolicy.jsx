import React from 'react';
import Background from '../../components/Background';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const PrivacyPolicy = () => {
  return (
    <Background>
      <Navbar />
      <div className="min-h-screen bg-transparent pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-[var(--color-darkGray)] mb-4">
              Privacy Policy
            </h1>
            <div className="w-24 h-1 bg-[var(--color-green)] mx-auto mb-4"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Your privacy is important to us. This policy outlines how we collect, use, and protect your information.
            </p>
          </div>

          {/* Content */}
          <div className="bg-white rounded-xl shadow-lg p-8 space-y-8">
            {/* Information We Collect */}
            <section>
              <h2 className="text-2xl font-bold text-[var(--color-darkGray)] mb-4">
                Information We Collect
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  We collect information you provide directly to us when you use our services, including:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Name and contact information</li>
                  <li>Health and dietary preferences</li>
                  <li>Payment information (processed securely)</li>
                  <li>Usage data and analytics</li>
                  <li>Communication preferences</li>
                </ul>
              </div>
            </section>

            {/* How We Use Your Information */}
            <section>
              <h2 className="text-2xl font-bold text-[var(--color-darkGray)] mb-4">
                How We Use Your Information
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  We use the information we collect to provide and improve our services:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Create personalized diet plans</li>
                  <li>Communicate with you about your progress</li>
                  <li>Process payments and manage subscriptions</li>
                  <li>Analyze usage to improve our services</li>
                  <li>Send important updates and notifications</li>
                </ul>
              </div>
            </section>

            {/* Data Protection */}
            <section>
              <h2 className="text-2xl font-bold text-[var(--color-darkGray)] mb-4">
                Data Protection
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  We implement appropriate security measures to protect your personal information:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>SSL encryption for data transmission</li>
                  <li>Secure payment processing</li>
                  <li>Regular security audits</li>
                  <li>Limited employee access to data</li>
                  <li>Compliance with health data regulations</li>
                </ul>
              </div>
            </section>

            {/* Sharing Your Information */}
            <section>
              <h2 className="text-2xl font-bold text-[var(--color-darkGray)] mb-4">
                Sharing Your Information
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  We do not sell, trade, or otherwise transfer your personal information to third parties, except:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>With your explicit consent</li>
                  <li>To service providers necessary for our operations</li>
                  <li>When required by law or to protect our rights</li>
                  <li>In connection with business transfers (with notice)</li>
                </ul>
              </div>
            </section>

            {/* Your Rights */}
            <section>
              <h2 className="text-2xl font-bold text-[var(--color-darkGray)] mb-4">
                Your Rights
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  You have the following rights regarding your personal information:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Access to your personal data</li>
                  <li>Correction of inaccurate information</li>
                  <li>Deletion of your account and data</li>
                  <li>Opt-out of marketing communications</li>
                  <li>Data portability upon request</li>
                </ul>
              </div>
            </section>

            {/* Cookies and Tracking */}
            <section>
              <h2 className="text-2xl font-bold text-[var(--color-darkGray)] mb-4">
                Cookies and Tracking
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  We use cookies and similar technologies to enhance your experience:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Essential cookies for site functionality</li>
                  <li>Analytics cookies to understand usage</li>
                  <li>Personalization cookies for better experience</li>
                  <li>You can control cookie settings in your browser</li>
                </ul>
              </div>
            </section>

            {/* Policy Updates */}
            <section>
              <h2 className="text-2xl font-bold text-[var(--color-darkGray)] mb-4">
                Policy Updates
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  We may update this privacy policy from time to time. We will:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Post changes on our website</li>
                  <li>Notify active users of significant changes</li>
                  <li>Update the "Last Modified" date</li>
                </ul>
                <p className="text-sm text-gray-600 mt-4">
                  Last Modified: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
              </div>
            </section>

            {/* Contact */}
            <section>
              <h2 className="text-2xl font-bold text-[var(--color-darkGray)] mb-4">
                Contact Us
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  If you have questions about this Privacy Policy, please contact us:
                </p>
                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                  <p><strong>Email:</strong> placid.consultations@gmail.com</p>
                  <p><strong>Phone:</strong> +91 7898654510</p>
                  <p><strong>Address:</strong> 123 Health Street, Wellness City, WC 12345</p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </Background>
  );
};

export default PrivacyPolicy;
