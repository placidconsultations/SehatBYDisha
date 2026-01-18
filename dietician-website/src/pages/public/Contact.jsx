import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { FaEnvelope, FaPhone, FaPaperPlane } from 'react-icons/fa';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Background from '../../components/Background';

const Contact = () => {
  const location = useLocation();
  const isStandalonePage = location.pathname === '/contact';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const whatsappText = `
Name: ${formData.name}
Email: ${formData.email}
Subject: ${formData.subject}

Message:
${formData.message}
    `;

    const encodedText = encodeURIComponent(whatsappText);
    const phoneNumber = "917898654510";
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedText}`;

    setTimeout(() => {
      window.open(whatsappURL, "_blank");
      setIsSubmitting(false);
      setSubmitStatus('success');

      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });

      setTimeout(() => setSubmitStatus(null), 5000);
    }, 800);
  };

  const contactInfo = [
    {
      icon: <FaEnvelope className="text-xl sm:text-2xl text-[var(--color-green)]" />,
      title: 'Email Us',
      content: 'placid.consultations@gmail.com',
      link: 'mailto:placid.consultations@gmail.com'
    },
    {
      icon: <FaPhone className="text-xl sm:text-2xl text-[var(--color-green)]" />,
      title: 'Call Us',
      content: '+91 7898654510',
      link: 'tel:+917898654510'
    }
  ];

  const content = (
    <main className={`flex-grow ${isStandalonePage ? 'pt-24 pb-12 md:pt-32 md:pb-20' : 'pt-0'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 md:mb-4">
            Get in <span className="text-[var(--color-green)]">Touch</span>
          </h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-2">
            Have questions or want to schedule a consultation? We'd love to hear from you!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">

          {/* Contact Form */}
          <div className="bg-white rounded-xl shadow-md p-5 sm:p-8 order-2 lg:order-1">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>

            {submitStatus === 'success' && (
              <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-lg text-sm sm:text-base">
                Thank you for your message! We'll get back to you soon.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-green)] focus:border-transparent outline-none transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-green)] focus:border-transparent outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-green)] focus:border-transparent outline-none transition-all"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Your Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--color-green)] focus:border-transparent outline-none transition-all resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center px-6 py-3.5 bg-[var(--color-green)] text-white font-semibold rounded-lg hover:bg-[var(--color-darkGreen)] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--color-green)] disabled:opacity-70 disabled:cursor-not-allowed text-base"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>
                    <span>Send Message</span>
                    <FaPaperPlane className="ml-2" />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Right Side – Contact Info */}
          <div className="space-y-6 md:space-y-8 order-1 lg:order-2">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 md:mb-6">Contact Information</h2>
              <p className="text-sm sm:text-base text-gray-600 mb-6">
                Feel free to reach out to us using any of the following methods. Our team is here to help you with your health and wellness journey.
              </p>
            </div>

            <div className="space-y-4">
              {contactInfo.map((item, index) => (
                <a
                  key={index}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-50"
                >
                  <div className="flex-shrink-0 mr-4">{item.icon}</div>
                  <div className="min-w-0"> {/* min-w-0 prevents text overflow in flex */}
                    <h3 className="text-base sm:text-lg font-medium text-gray-900">{item.title}</h3>
                    <p className="text-sm sm:text-base text-gray-600 truncate">{item.content}</p>
                  </div>
                </a>
              ))}
            </div>

            <div className="pt-4 md:pt-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Business Hours</h3>
              <ul className="space-y-3 text-sm sm:text-base text-gray-600 bg-white p-4 rounded-lg shadow-sm border border-gray-50">
                <li className="flex justify-between items-center">
                  <span className="font-medium">Monday - Friday</span>
                  <span>9:00 AM - 6:00 PM</span>
                </li>
                <li className="flex justify-between items-center">
                  <span className="font-medium">Saturday</span>
                  <span>10:00 AM - 4:00 PM</span>
                </li>
                <li className="flex justify-between items-center text-red-500">
                  <span className="font-medium">Sunday</span>
                  <span>Closed</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );

  if (isStandalonePage) {
    return (
      <div className="min-h-screen flex flex-col">
        <Background>
          <Navbar />
          {content}
          <Footer />
        </Background>
      </div>
    );
  }

  return content;
};

export default Contact;