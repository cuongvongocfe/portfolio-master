'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { siteConfig } from '@/data';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: 'GitHub', url: siteConfig.links.github, icon: '🐙' },
    { name: 'LinkedIn', url: siteConfig.links.linkedin, icon: '💼' },
    { name: 'Twitter', url: siteConfig.links.twitter, icon: '🐦' },
    { name: 'Email', url: `mailto:${siteConfig.links.email}`, icon: '📧' }
  ];

  const quickLinks = [
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Contact', href: '#contact' }
  ];

  return (
    <footer className="bg-neutral-900 dark:bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Brand & Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-r from-primary-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">C</span>
              </div>
              <div>
                <h3 className="font-bold text-xl">{siteConfig.name}</h3>
                <p className="text-neutral-400 text-sm">Frontend Developer</p>
              </div>
            </div>
            
            <p className="text-neutral-400 leading-relaxed">
              Creating exceptional digital experiences with modern web technologies. 
              Passionate about clean code, beautiful design, and user-centered development.
            </p>

            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 bg-neutral-800 hover:bg-neutral-700 rounded-lg flex items-center justify-center transition-colors group"
                >
                  <span className="text-lg group-hover:scale-110 transition-transform">
                    {social.icon}
                  </span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h4 className="font-semibold text-lg">Quick Links</h4>
            <nav className="space-y-3">
              {quickLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  whileHover={{ x: 5 }}
                  className="block text-neutral-400 hover:text-white transition-colors"
                >
                  {link.name}
                </motion.a>
              ))}
            </nav>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h4 className="font-semibold text-lg">Get In Touch</h4>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-primary-400">📍</span>
                <span className="text-neutral-400">Ho Chi Minh City, Vietnam</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-primary-400">📧</span>
                <a 
                  href={`mailto:${siteConfig.links.email}`}
                  className="text-neutral-400 hover:text-white transition-colors"
                >
                  {siteConfig.links.email}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-primary-400">💼</span>
                <span className="text-neutral-400">Available for opportunities</span>
              </div>
            </div>

            <motion.a
              href={siteConfig.links.cv}
              download
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors"
            >
              📄 Download CV
            </motion.a>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="border-t border-neutral-800 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4"
        >
          <p className="text-neutral-400 text-sm">
            © {currentYear} {siteConfig.name}. All rights reserved.
          </p>
          
          <div className="flex gap-6 text-sm text-neutral-400">
            <a href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </a>
          </div>
        </motion.div>

        {/* Back to Top */}
        <motion.button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="fixed bottom-8 right-8 w-12 h-12 bg-primary-600 hover:bg-primary-700 text-white rounded-full flex items-center justify-center shadow-lg transition-colors z-40"
        >
          ↑
        </motion.button>
      </div>
    </footer>
  );
}
