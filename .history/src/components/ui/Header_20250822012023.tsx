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
      transition={{ duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-white/90 dark:bg-neutral-900/90 backdrop-blur-xl shadow-xl border-b border-neutral-200/50 dark:border-neutral-700/50' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-18">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            className="flex items-center gap-3 z-50"
          >
            <div className="relative">
              <motion.div 
                className="w-9 h-9 bg-gradient-to-br from-blue-600 via-purple-600 to-violet-700 rounded-lg flex items-center justify-center shadow-lg"
                whileHover={{ 
                  boxShadow: "0 8px 32px rgba(99, 102, 241, 0.3)",
                  scale: 1.05
                }}
                transition={{ duration: 0.3 }}
              >
                <span className="text-white font-semibold text-base tracking-tight">C</span>
              </motion.div>
              <motion.div
                className="absolute -inset-1 bg-gradient-to-br from-blue-600/20 to-violet-700/20 rounded-lg blur opacity-0"
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <span className="font-semibold text-lg text-neutral-800 dark:text-neutral-200 tracking-tight">
              Cường
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center">
            <div className="flex items-center bg-neutral-50/50 dark:bg-neutral-800/50 backdrop-blur-sm rounded-full px-2 py-1.5 border border-neutral-200/50 dark:border-neutral-700/50">
              {navigationItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  whileHover={{ 
                    backgroundColor: "rgba(99, 102, 241, 0.15)",
                    scale: 1.1,
                    y: -3,
                    zIndex: 10
                  }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    delay: index * 0.05,
                    type: "spring",
                    stiffness: 500,
                    damping: 15
                  }}
                  className="relative px-4 py-2.5 text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-all duration-300 rounded-full whitespace-nowrap hover:shadow-lg hover:shadow-blue-500/25"
                >
                  <motion.span
                    whileHover={{ 
                      scale: 1.05,
                      fontWeight: 600 
                    }}
                    className="relative z-10"
                  >
                    {item.label}
                  </motion.span>
                  
                  {/* Glow effect */}
                  <motion.div
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/20 to-violet-500/20 opacity-0"
                    whileHover={{ 
                      opacity: 1,
                      scale: 1.2,
                      boxShadow: "0 8px 32px rgba(99, 102, 241, 0.3)"
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>
              ))}
            </div>
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <motion.button
              onClick={toggleTheme}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className="w-9 h-9 rounded-full bg-neutral-100/80 dark:bg-neutral-800/80 backdrop-blur-sm flex items-center justify-center hover:bg-neutral-200/80 dark:hover:bg-neutral-700/80 transition-all duration-300 border border-neutral-200/50 dark:border-neutral-700/50"
            >
              <motion.div
                initial={false}
                animate={{ rotate: isDark ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {isDark ? (
                  <SunIcon className="w-4 h-4 text-amber-500" />
                ) : (
                  <MoonIcon className="w-4 h-4 text-neutral-600 dark:text-neutral-400" />
                )}
              </motion.div>
            </motion.button>

            {/* CV Download Button */}
            <motion.a
              href={siteConfig.links.cv}
              download
              whileHover={{ 
                scale: 1.02,
                boxShadow: "0 8px 32px rgba(99, 102, 241, 0.25)"
              }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white text-sm font-medium rounded-full transition-all duration-300 shadow-lg border border-blue-600/20"
            >
              <span>Download CV</span>
              <motion.div
                initial={{ x: 0 }}
                whileHover={{ x: 2 }}
                transition={{ duration: 0.2 }}
              >
                📥
              </motion.div>
            </motion.a>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className="lg:hidden w-9 h-9 rounded-full bg-neutral-100/80 dark:bg-neutral-800/80 backdrop-blur-sm flex items-center justify-center relative z-50 border border-neutral-200/50 dark:border-neutral-700/50"
            >
              <div className="w-4 h-4 flex flex-col justify-center items-center">
                <motion.span
                  animate={isMobileMenuOpen ? { rotate: 45, y: 1.5 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className="w-4 h-0.5 bg-neutral-600 dark:bg-neutral-400 rounded-full"
                />
                <motion.span
                  animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                  transition={{ duration: 0.2 }}
                  className="w-4 h-0.5 bg-neutral-600 dark:bg-neutral-400 rounded-full mt-1"
                />
                <motion.span
                  animate={isMobileMenuOpen ? { rotate: -45, y: -1.5 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className="w-4 h-0.5 bg-neutral-600 dark:bg-neutral-400 rounded-full mt-1"
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
          transition={{ duration: 0.3, ease: [0.4, 0.0, 0.2, 1] }}
          className={`lg:hidden overflow-hidden bg-white/95 dark:bg-neutral-900/95 backdrop-blur-xl border-t border-neutral-200/50 dark:border-neutral-700/50 ${
            isMobileMenuOpen ? 'pointer-events-auto' : 'pointer-events-none'
          }`}
        >
          <div className="max-w-7xl mx-auto px-6">
            <nav className="py-6 space-y-1">
              {navigationItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  whileHover={{ 
                    x: 4,
                    backgroundColor: "rgba(99, 102, 241, 0.05)"
                  }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ 
                    opacity: isMobileMenuOpen ? 1 : 0, 
                    x: isMobileMenuOpen ? 0 : -20 
                  }}
                  transition={{ 
                    delay: index * 0.05,
                    duration: 0.3,
                    ease: [0.4, 0.0, 0.2, 1]
                  }}
                  className="block w-full text-left px-4 py-3 text-neutral-700 dark:text-neutral-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 font-medium rounded-lg"
                >
                  {item.label}
                </motion.button>
              ))}
              
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ 
                  opacity: isMobileMenuOpen ? 1 : 0, 
                  x: isMobileMenuOpen ? 0 : -20 
                }}
                transition={{ 
                  delay: navigationItems.length * 0.05,
                  duration: 0.3,
                  ease: [0.4, 0.0, 0.2, 1]
                }}
                className="pt-4 border-t border-neutral-200/50 dark:border-neutral-700/50 mt-4"
              >
                <motion.a
                  href={siteConfig.links.cv}
                  download
                  whileHover={{ 
                    scale: 1.02,
                    backgroundColor: "rgba(99, 102, 241, 0.1)"
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-violet-600 text-white font-medium rounded-lg transition-all duration-300"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span>Download CV</span>
                  <span>📥</span>
                </motion.a>
              </motion.div>
            </nav>
          </div>
        </motion.div>
      </div>
    </motion.header>
  );
}
