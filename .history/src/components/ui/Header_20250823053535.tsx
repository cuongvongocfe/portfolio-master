/**
 * Header Navigation Component
 * 
 * A sophisticated, responsive navigation header with smooth animations and modern design.
 * Features include:
 * - Animated pill-style navigation with hover effects
 * - Dark/light theme toggle with smooth transitions
 * - Mobile-responsive hamburger menu
 * - Scroll-based background blur and transparency
 * - Smooth scrolling to page sections
 * - CV download functionality
 * 
 * @component
 * @returns {JSX.Element} Animated header with navigation and theme controls
 */

'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import { siteConfig } from '@/data';
import Logo from './Logo';
import CVViewer from './OptimizedCVViewer';

/**
 * Header Component with Advanced Navigation Features
 * 
 * This component manages:
 * - Theme switching (dark/light mode)
 * - Scroll detection for background effects
 * - Mobile menu state
 * - Smooth navigation between sections
 * 
 * @returns {JSX.Element} Complete header navigation system
 */
export default function Header() {
  // Theme state management
  const [isDark, setIsDark] = useState(false);
  
  // Scroll detection for header background effects
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Mobile menu toggle state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // CV Viewer state
  const [isCVViewerOpen, setIsCVViewerOpen] = useState(false);

  /**
   * Theme Initialization Effect
   * 
   * Checks localStorage for saved theme preference and system preference.
   * Applies dark mode class to document root if needed.
   */
  useEffect(() => {
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  /**
   * Scroll Detection Effect
   * 
   * Monitors scroll position to trigger header background changes.
   * Adds blur and background when user scrolls past threshold.
   */
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /**
   * Theme Toggle Function
   * 
   * Switches between light and dark themes with smooth transitions.
   * Persists theme preference to localStorage and updates DOM classes.
   */
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

  /**
   * Smooth Scroll Navigation Function
   * 
   * Handles navigation between page sections with smooth scrolling.
   * Accounts for fixed header height in scroll calculations.
   * 
   * @param {string} sectionId - ID of the target section element
   */
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
    // Close mobile menu after navigation
    setIsMobileMenuOpen(false);
  };

  /**
   * Navigation Items Configuration
   * 
   * Defines all navigation menu items with their display labels and target section IDs.
   * These correspond to section IDs throughout the application for smooth scrolling.
   */
  const navigationItems = [
    { label: 'Home', id: 'home' },
    { label: 'About', id: 'about' },
    { label: 'Skills', id: 'skills' },
    { label: 'Experience', id: 'experience' },
    { label: 'Projects', id: 'projects' },
    { label: 'Playground', id: 'frontend-playground' },
    { label: 'Matrix', id: 'matrix-terminal' },
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16 lg:h-18">
          {/* Logo với GIF Animation */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            className="flex items-center z-50"
          >
            <Logo />
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center">
            <div className="flex items-center bg-neutral-50/50 dark:bg-neutral-800/50 backdrop-blur-sm rounded-full px-1.5 py-1 border border-neutral-200/50 dark:border-neutral-700/50">
              {navigationItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  whileHover={{ 
                    backgroundColor: "rgba(99, 102, 241, 0.15)",
                    scale: 1.05,
                    y: -2
                  }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    delay: index * 0.05,
                    type: "spring",
                    stiffness: 300,
                    damping: 25
                  }}
                  className="relative px-3 py-2 text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-all duration-300 rounded-full whitespace-nowrap focus-ring"
                >
                  {item.label}
                </motion.button>
              ))}
            </div>
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Theme Toggle */}
            <motion.button
              onClick={toggleTheme}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-neutral-100/80 dark:bg-neutral-800/80 backdrop-blur-sm flex items-center justify-center hover:bg-neutral-200/80 dark:hover:bg-neutral-700/80 transition-all duration-300 border border-neutral-200/50 dark:border-neutral-700/50 focus-ring"
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
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

            {/* CV View Button */}
            <motion.button
              onClick={() => setIsCVViewerOpen(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className="hidden sm:flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full text-sm font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 focus-ring"
              aria-label="View CV"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span className="hidden md:inline">View CV</span>
            </motion.button>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className="lg:hidden w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-neutral-100/80 dark:bg-neutral-800/80 backdrop-blur-sm flex items-center justify-center relative z-50 border border-neutral-200/50 dark:border-neutral-700/50 focus-ring"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
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
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <nav className="py-4 sm:py-6 space-y-1">
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
                  className="block w-full text-left px-3 py-2.5 sm:px-4 sm:py-3 text-neutral-700 dark:text-neutral-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 font-medium rounded-lg text-responsive focus-ring"
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
                className="pt-3 border-t border-neutral-200/50 dark:border-neutral-700/50 mt-3"
              >
                {/* View CV Button for Mobile */}
                <motion.button
                  onClick={() => {
                    setIsCVViewerOpen(true);
                    setIsMobileMenuOpen(false);
                  }}
                  whileHover={{ 
                    scale: 1.02,
                    backgroundColor: "rgba(59, 130, 246, 0.1)"
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center justify-center gap-2 w-full px-3 py-2.5 sm:px-4 sm:py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg transition-all duration-300 text-responsive focus-ring"
                  aria-label="View CV"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span>View CV</span>
                </motion.button>
              </motion.div>
            </nav>
          </div>
        </motion.div>
      </div>

      {/* CV Viewer Modal */}
      <CVViewer 
        isOpen={isCVViewerOpen}
        onClose={() => setIsCVViewerOpen(false)}
        cvUrl={siteConfig.links.cv}
      />
    </motion.header>
  );
}
