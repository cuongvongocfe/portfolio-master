/**
 * Contact Section Component
 * 
 * Interactive contact section featuring a form and contact information.
 * Key features include:
 * - Responsive contact form with validation and submission handling
 * - Contact information display with icons and styling
 * - Animated elements with smooth entrance effects
 * - Form state management and error/success messaging
 * - Dark/light theme support with consistent design
 * - Integration with contact API endpoint
 * 
 * @component
 * @returns {JSX.Element} Complete contact section with form and contact info
 */

'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { ContactForm } from '@/types';
import { PaperAirplaneIcon, MapPinIcon, EnvelopeIcon, PhoneIcon } from '@heroicons/react/24/outline';
import { siteConfig } from '@/data';
import emailjs from '@emailjs/browser';
import { EMAILJS_CONFIG } from '@/lib/emailjs';

/**
 * Main Contact Section Component
 * 
 * Provides a comprehensive contact interface with form submission
 * and contact information display. Handles form validation,
 * submission states, and user feedback.
 * 
 * @returns {JSX.Element} Contact section with interactive form and contact details
 */
export default function ContactSection() {
  // Form data state management
  const [formData, setFormData] = useState<ContactForm>({
    name: '',
    email: '',
    message: ''
  });
  
  // Form submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // User feedback message state
  const [submitMessage, setSubmitMessage] = useState('');

  /**
   * Form Input Change Handler
   * 
   * Updates form data state when user types in form fields.
   * Handles both input and textarea elements.
   * 
   * @param {React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>} e - Input change event
   */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  /**
   * Form Submission Handler với EmailJS
   * 
   * Gửi email trực tiếp đến Gmail bằng EmailJS service.
   * Hiện tại dùng fallback mailto cho đến khi setup EmailJS xong.
   * 
   * @param {React.FormEvent} e - Form submission event
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Kiểm tra xem đã setup EmailJS chưa
      const isEmailJSConfigured = EMAILJS_CONFIG.SERVICE_ID !== 'demo_service_id';
      
      if (isEmailJSConfigured) {
        // Tạo template params cho EmailJS
        const templateParams = {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_email: 'gtsvongoccuong@gmail.com',
          reply_to: formData.email
        };

        // Gửi email bằng EmailJS
        const result = await emailjs.send(
          EMAILJS_CONFIG.SERVICE_ID,
          EMAILJS_CONFIG.TEMPLATE_ID,
          templateParams,
          EMAILJS_CONFIG.PUBLIC_KEY
        );

        if (result.status === 200) {
          setSubmitMessage('✅ Cảm ơn bạn! Tin nhắn đã được gửi thành công đến Gmail của tôi.');
          setFormData({ name: '', email: '', message: '' }); // Reset form
        } else {
          throw new Error('EmailJS failed');
        }
      } else {
        // Demo mode: Sử dụng mailto fallback
        throw new Error('EmailJS not configured - using fallback');
      }
    } catch (error) {
      console.log('Using mailto fallback...', error);
      
      // Fallback: Mở Gmail với mailto
      const subject = `Portfolio Contact from ${formData.name}`;
      const body = `Tên: ${formData.name}\nEmail: ${formData.email}\n\nTin nhắn:\n${formData.message}\n\n---\nGửi từ Portfolio Contact Form`;
      const mailtoUrl = `mailto:gtsvongoccuong@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      
      window.open(mailtoUrl, '_blank');
      setSubmitMessage('📧 Đã mở Gmail cho bạn! Tin nhắn sẽ được tự động điền sẵn - chỉ cần nhấn Send.');
      setFormData({ name: '', email: '', message: '' }); // Reset form
    }
    
    setIsSubmitting(false);
    
    // Clear message after 10 seconds
    setTimeout(() => setSubmitMessage(''), 10000);
  };

  return (
    <section id="contact" className="py-20 lg:py-32 bg-neutral-50 dark:bg-neutral-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-sm font-medium mb-6"
          >
            <span className="w-2 h-2 bg-primary-500 rounded-full animate-pulse"></span>
            Get In Touch
          </motion.div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-neutral-900 dark:text-neutral-100 mb-6">
            Ready for your{' '}
            <span className="bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
              next project?
            </span>
          </h2>
          
          <p className="max-w-3xl mx-auto text-xl text-neutral-600 dark:text-neutral-400 leading-relaxed">
            I&apos;m always open to discussing new opportunities, interesting projects, 
            or just having a friendly chat about technology and development.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                Send me a message
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400">
                Fill out the form below and I&apos;ll get back to you as soon as possible.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 transition-colors"
                    placeholder="Your name"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 transition-colors"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 transition-colors resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>
              
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary-600 hover:bg-primary-700 disabled:bg-primary-400 text-white font-semibold rounded-lg transition-colors group"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <PaperAirplaneIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                )}
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </motion.button>
              
              {submitMessage && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`text-center p-4 rounded-lg ${
                    submitMessage.includes('Thank you') 
                      ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                      : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
                  }`}
                >
                  {submitMessage}
                </motion.p>
              )}
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-4">
                Let&apos;s connect
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400">
                Prefer to reach out directly? You can find me on these platforms or contact me using the information below.
              </p>
            </div>

            {/* Contact Methods */}
            <div className="space-y-6">
              <motion.a
                href={`mailto:${siteConfig.links.email}`}
                whileHover={{ scale: 1.02 }}
                className="flex items-center gap-4 p-6 bg-white dark:bg-neutral-800 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 group"
              >
                <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center group-hover:bg-primary-200 dark:group-hover:bg-primary-900/50 transition-colors">
                  <EnvelopeIcon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                </div>
                <div>
                  <div className="font-semibold text-neutral-900 dark:text-neutral-100">Email</div>
                  <div className="text-neutral-600 dark:text-neutral-400">{siteConfig.links.email}</div>
                </div>
              </motion.a>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="flex items-center gap-4 p-6 bg-white dark:bg-neutral-800 rounded-lg shadow-sm"
              >
                <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center">
                  <MapPinIcon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                </div>
                <div>
                  <div className="font-semibold text-neutral-900 dark:text-neutral-100">Location</div>
                  <div className="text-neutral-600 dark:text-neutral-400">Ho Chi Minh City, Vietnam</div>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="flex items-center gap-4 p-6 bg-white dark:bg-neutral-800 rounded-lg shadow-sm"
              >
                <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center">
                  <PhoneIcon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                </div>
                <div>
                  <div className="font-semibold text-neutral-900 dark:text-neutral-100">Phone</div>
                  <div className="text-neutral-600 dark:text-neutral-400">{siteConfig.links.phone}</div>
                </div>
              </motion.div>
            </div>

            {/* Social Links */}
            <div>
              <h4 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
                Follow me online
              </h4>
              <div className="flex gap-4">
                {[
                  { name: 'GitHub', url: siteConfig.links.github, icon: '🐙' },
                  { name: 'LinkedIn', url: siteConfig.links.linkedin, icon: '💼' },
                  { name: 'Twitter', url: siteConfig.links.twitter, icon: '🐦' }
                ].map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-12 h-12 bg-white dark:bg-neutral-800 rounded-lg flex items-center justify-center shadow-sm hover:shadow-md transition-all duration-300 group"
                  >
                    <span className="text-xl group-hover:scale-110 transition-transform">
                      {social.icon}
                    </span>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
