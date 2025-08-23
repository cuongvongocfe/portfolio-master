'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import { siteConfig } from '@/data';

export default function Header() {
  const [isDark, setIsDark] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    
    if (newTheme) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsMobileMenuOpen(false);
  };

  const navigationItems = [
    { label: 'About', id: 'about' },
    { label: 'Skills', id: 'skills' },
    { label: 'Experience', id: 'experience' },
    { label: 'Projects', id: 'projects' },
    { label: 'Blockchain', id: 'blockchain' },
    { label: 'Playground', id: 'frontend-playground' },
    { label: 'Code', id: 'interactive-code' },
    { label: 'Algorithms', id: 'algorithm-visualization' },
    { label: 'Contact', id: 'contact' }
  ];

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md shadow-lg' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="flex items-center gap-2 z-50"
          >
            <motion.div 
              className="relative w-10 h-10 bg-gradient-to-br from-primary-600 to-purple-600 rounded-lg flex items-center justify-center shadow-md"
              whileHover={{ 
                boxShadow: "0 0 15px rgba(139, 92, 246, 0.3)"
              }}
              transition={{ duration: 0.3 }}
            >
              <span className="text-white font-bold text-lg">C</span>
            </motion.div>
            <span className="font-bold text-xl text-neutral-900 dark:text-neutral-100">
              Cường
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-6 2xl:gap-8">
            {navigationItems.map((item, index) => (
              <motion.button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                whileHover={{ 
                  scale: 1.05,
                  y: -2
                }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="relative text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-all duration-300 text-sm xl:text-base whitespace-nowrap group px-2 py-1"
              >
                <span className="relative z-10">{item.label}</span>
                <motion.div
                  className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary-500 to-purple-500 group-hover:w-full transition-all duration-300"
                />
              </motion.button>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Theme Toggle */}
            <motion.button
              onClick={toggleTheme}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-10 h-10 rounded-lg bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
            >
              {isDark ? (
                <SunIcon className="w-5 h-5 text-yellow-500" />
              ) : (
                <MoonIcon className="w-5 h-5 text-neutral-600" />
              )}
            </motion.button>

            {/* CV Download Button */}
            <motion.a
              href={siteConfig.links.cv}
              download
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 5px 15px rgba(139, 92, 246, 0.2)"
              }}
              whileTap={{ scale: 0.95 }}
              className="hidden sm:inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 bg-gradient-to-r from-primary-600 to-purple-600 hover:from-primary-700 hover:to-purple-700 text-white font-semibold rounded-lg transition-all duration-300 text-sm xl:text-base shadow-md"
            >
              📥 Download CV
            </motion.a>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              whileTap={{ scale: 0.95 }}
              className="xl:hidden w-10 h-10 rounded-lg bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center relative z-50"
            >
              <div className="w-5 h-5 flex flex-col justify-center items-center">
                <motion.span
                  animate={isMobileMenuOpen ? { rotate: 45, y: 2 } : { rotate: 0, y: 0 }}
                  className="w-5 h-0.5 bg-neutral-600 dark:bg-neutral-400 block transition-all"
                />
                <motion.span
                  animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                  className="w-5 h-0.5 bg-neutral-600 dark:bg-neutral-400 block mt-1 transition-all"
                />
                <motion.span
                  animate={isMobileMenuOpen ? { rotate: -45, y: -2 } : { rotate: 0, y: 0 }}
                  className="w-5 h-0.5 bg-neutral-600 dark:bg-neutral-400 block mt-1 transition-all"
                />
              </div>
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ 
            opacity: isMobileMenuOpen ? 1 : 0, 
            height: isMobileMenuOpen ? 'auto' : 0 
          }}
          transition={{ duration: 0.3 }}
          className={`xl:hidden overflow-hidden bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md border-t border-neutral-200 dark:border-neutral-700 ${
            isMobileMenuOpen ? 'pointer-events-auto' : 'pointer-events-none'
          }`}
        >
          <nav className="py-6 space-y-2 max-h-96 overflow-y-auto">
            {navigationItems.map((item, index) => (
              <motion.button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                whileHover={{ 
                  x: 8,
                  backgroundColor: "rgba(139, 92, 246, 0.1)"
                }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, x: -30 }}
                animate={{ 
                  opacity: isMobileMenuOpen ? 1 : 0, 
                  x: isMobileMenuOpen ? 0 : -30 
                }}
                transition={{ delay: index * 0.08 }}
                className="block w-full text-left px-8 py-4 text-neutral-700 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-300 font-semibold text-lg rounded-lg mx-4 group relative overflow-hidden"
              >
                <motion.div
                  className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-primary-500 to-purple-500 transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top"
                />
                <span className="relative z-10">{item.label}</span>
              </motion.button>
            ))}
            <motion.a
              href={siteConfig.links.cv}
              download
              whileHover={{ 
                x: 8,
                backgroundColor: "rgba(139, 92, 246, 0.2)"
              }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, x: -30 }}
              animate={{ 
                opacity: isMobileMenuOpen ? 1 : 0, 
                x: isMobileMenuOpen ? 0 : -30 
              }}
              transition={{ delay: navigationItems.length * 0.08 }}
              className="block w-full text-left px-8 py-4 text-primary-600 dark:text-primary-400 transition-all duration-300 font-bold text-lg rounded-lg mx-4 border-t border-neutral-200 dark:border-neutral-700 mt-4 pt-6 group relative overflow-hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <motion.div
                className="absolute left-0 top-0 h-full w-2 bg-gradient-to-b from-primary-500 to-purple-500 transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top"
              />
              <span className="relative z-10">📥 Download CV</span>
            </motion.a>
          </nav>
        </motion.div>
      </div>
    </motion.header>
  );
}
