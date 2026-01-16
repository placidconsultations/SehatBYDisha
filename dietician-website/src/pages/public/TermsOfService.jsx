import React from 'react';
import Background from '../../components/Background';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const TermsOfService = () => {
  return (
    <Background>
      <Navbar />
      <div className="min-h-screen bg-transparent pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-[var(--color-darkGray)] mb-4">
              Terms of Service
            </h1>
            <div className="w-24 h-1 bg-[var(--color-green)] mx-auto mb-4"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              By using our dietician services, you agree to these terms and conditions.
            </p>
          </div>

          {/* Content */}
          <div className="bg-white rounded-xl shadow-lg p-8 space-y-8">
            {/* Acceptance of Terms */}
            <section>
              <h2 className="text-2xl font-bold text-[var(--color-darkGray)] mb-4">
                Acceptance of Terms
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  By accessing and using our dietician services, you accept and agree to be bound by these Terms of Service. 
                  If you do not agree to these terms, please do not use our services.
                </p>
              </div>
            </section>

            {/* Services Description */}
            <section>
              <h2 className="text-2xl font-bold text-[var(--color-darkGray)] mb-4">
                Services Description
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  We provide personalized nutrition and diet planning services including:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Personalized diet plans based on health goals</li>
                  <li>Nutritional guidance and meal planning</li>
                  <li>Progress tracking and analytics</li>
                  <li>One-on-one consultation services</li>
                  <li>Educational resources and recipes</li>
                  <li>Community support and motivation</li>
                </ul>
              </div>
            </section>

            {/* User Responsibilities */}
            <section>
              <h2 className="text-2xl font-bold text-[var(--color-darkGray)] mb-4">
                User Responsibilities
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  As a user of our services, you agree to:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Provide accurate and complete health information</li>
                  <li>Follow dietary plans responsibly and safely</li>
                  <li>Consult healthcare professionals before major dietary changes</li>
                  <li>Maintain the security of your account credentials</li>
                  <li>Use services for personal, non-commercial purposes</li>
                  <li>Respect other users and community guidelines</li>
                  <li>Report any issues or concerns promptly</li>
                </ul>
              </div>
            </section>

            {/* Payment and Subscription */}
            <section>
              <h2 className="text-2xl font-bold text-[var(--color-darkGray)] mb-4">
                Payment and Subscription
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  Payment terms for our services:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Subscription fees are charged in advance on a monthly/annual basis</li>
                  <li>All payments are processed securely through third-party payment providers</li>
                  <li>No refunds for partial months of service</li>
                  <li>Prices may change with 30-day notice</li>
                  <li>Failed payments may result in service suspension</li>
                </ul>
              </div>
            </section>

            {/* Intellectual Property */}
            <section>
              <h2 className="text-2xl font-bold text-[var(--color-darkGray)] mb-4">
                Intellectual Property
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  All content, materials, and intellectual property on our platform belong to us or our licensors:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Diet plans, meal plans, and nutritional guidance</li>
                  <li>Educational content and resources</li>
                  <li>Website design, graphics, and user interface</li>
                  <li>Trademarks, service marks, and logos</li>
                </ul>
                <p className="mt-4">
                  You may use our content for personal use only. Commercial use, reproduction, or distribution 
                  without explicit permission is prohibited.
                </p>
              </div>
            </section>

            {/* User Content */}
            <section>
              <h2 className="text-2xl font-bold text-[var(--color-darkGray)] mb-4">
                User Content
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  You may submit content to our platform, including:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Progress updates and feedback</li>
                  <li>Reviews and testimonials</li>
                  <li>Questions and discussions</li>
                  <li>Personal health data (with your consent)</li>
                </ul>
                <p className="mt-4">
                  By submitting content, you grant us a non-exclusive, worldwide license to use, modify, 
                  and display your content for the purpose of providing our services.
                </p>
              </div>
            </section>

            {/* Prohibited Activities */}
            <section>
              <h2 className="text-2xl font-bold text-[var(--color-darkGray)] mb-4">
                Prohibited Activities
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  You agree not to engage in any of the following prohibited activities:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Sharing account credentials with others</li>
                  <li>Attempting to gain unauthorized access to our systems</li>
                  <li>Using automated tools to scrape or harvest data</li>
                  <li>Interfering with or disrupting service operations</li>
                  <li>Posting harmful, illegal, or inappropriate content</li>
                  <li>Spamming or harassing other users</li>
                  <li>Violating applicable laws or regulations</li>
                </ul>
              </div>
            </section>

            {/* Limitation of Liability */}
            <section>
              <h2 className="text-2xl font-bold text-[var(--color-darkGray)] mb-4">
                Limitation of Liability
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  To the fullest extent permitted by law, our liability is limited as follows:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Services are provided "as is" without warranties of any kind</li>
                  <li>We are not liable for indirect, incidental, or consequential damages</li>
                  <li>Our total liability shall not exceed the amount paid for services</li>
                  <li>We are not responsible for third-party services or content</li>
                  <li>Some jurisdictions may not allow limitation of liability</li>
                </ul>
              </div>
            </section>

            {/* Termination */}
            <section>
              <h2 className="text-2xl font-bold text-[var(--color-darkGray)] mb-4">
                Termination
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  Either party may terminate these terms:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>You may terminate your account at any time through account settings</li>
                  <li>We may terminate accounts for violations of these terms</li>
                  <li>We may suspend or terminate services with or without notice</li>
                  <li>Upon termination, your right to use services ceases immediately</li>
                  <li>We are not obligated to retain user content after termination</li>
                </ul>
              </div>
            </section>

            {/* Changes to Terms */}
            <section>
              <h2 className="text-2xl font-bold text-[var(--color-darkGray)] mb-4">
                Changes to Terms
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting.
                </p>
                <p>
                  Your continued use of our services after changes constitutes acceptance of the modified terms.
                </p>
              </div>
            </section>

            {/* Contact Information */}
            <section>
              <h2 className="text-2xl font-bold text-[var(--color-darkGray)] mb-4">
                Contact Information
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  If you have questions about these Terms of Service, please contact us:
                </p>
                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                  <p><strong>Email:</strong> placid.consultations@gmail.com</p>
                  <p><strong>Phone:</strong> +91 7898654510</p>
                  {/* <p><strong>Address:</strong> 123 Health Street, Wellness City, WC 12345</p> */}
                </div>
                <p className="text-sm text-gray-600 mt-4">
                  Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </Background>
  );
};

export default TermsOfService;
