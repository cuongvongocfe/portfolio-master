'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { siteConfig } from '@/data';

/**
 * Optimized Draggable Floating Action Menu Component
 * 
 * Button nổi có thể kéo thả với menu tròn - optimized for performance.
 */
export default function FloatingActionMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // Auto-hide khi không tương tác
  const [isVisible, setIsVisible] = useState(true);
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Các link shortcuts trong dự án
  const menuItems = [
    {
      label: 'Top',
      icon: '⬆️',
      href: '#top',
      color: 'from-indigo-500 to-indigo-700'
    },
    {
      label: 'GitHub',
      icon: '🐙',
      href: siteConfig.links.github,
      color: 'from-gray-700 to-gray-900'
    },
    {
      label: 'LinkedIn',
      icon: '💼',
      href: siteConfig.links.linkedin,
      color: 'from-blue-600 to-blue-800'
    },
    {
      label: 'Email',
      icon: '📧',
      href: `mailto:${siteConfig.links.email}`,
      color: 'from-red-500 to-red-700'
    },
    {
      label: 'Phone',
      icon: '📱',
      href: `tel:${siteConfig.links.phone}`,
      color: 'from-green-500 to-green-700'
    },
    {
      label: 'CV',
      icon: '📄',
      href: siteConfig.links.cv,
      color: 'from-purple-500 to-purple-700'
    },
    {
      label: 'About',
      icon: '👨‍💻',
      href: '#about',
      color: 'from-orange-500 to-orange-700'
    }
  ];

  // Auto-hide logic - simplified
  useEffect(() => {
    const resetHideTimer = () => {
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }
      setIsVisible(true);
      
      if (!isOpen && !isDragging) {
        hideTimeoutRef.current = setTimeout(() => {
          setIsVisible(false);
        }, 5000);
      }
    };

    resetHideTimer();
    return () => {
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }
    };
  }, [isOpen, isDragging]);

  // Animation cho từng menu item theo hình tròn - FIXED positioning
  const getItemAnimation = (index: number, total: number) => {
    const baseAngle = -90; // Bắt đầu từ trên cùng
    const angleStep = 360 / total;
    const angle = baseAngle + (index * angleStep);
    const radius = 70; // Giảm radius để gọn hơn
    
    const radian = (angle * Math.PI) / 180;
    const x = Math.cos(radian) * radius;
    const y = Math.sin(radian) * radius;
    
    return {
      x: isOpen ? x : 0,
      y: isOpen ? y : 0,
      opacity: isOpen ? 1 : 0,
      scale: isOpen ? 1 : 0,
    };
  };

  const handleItemClick = (href: string) => {
    if (href === '#top') {
      // Scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (href.startsWith('#')) {
      // Scroll to section
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (href.startsWith('mailto:') || href.startsWith('tel:')) {
      // Open email/phone
      window.location.href = href;
    } else {
      // Open external link
      window.open(href, '_blank');
    }
    setIsOpen(false);
  };

  const handleDragStart = useCallback(() => {
    setIsDragging(true);
    setIsOpen(false); // Đóng menu khi bắt đầu kéo
  }, []);

  const handleDragEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  return (
    <motion.div
      data-fab-container
      className="fixed bottom-6 left-6 z-50 w-16 h-16" // Fixed size container
      drag
      dragMomentum={false}
      dragElastic={0}
      dragConstraints={{
        left: -24, // Allow moving to left edge (6 * 4 = 24px from left-6)
        right: typeof window !== 'undefined' ? window.innerWidth - 88 : 0, // Window width - left margin - button width
        top: typeof window !== 'undefined' ? -window.innerHeight + 88 : 0, // Allow moving to top edge
        bottom: -24 // Allow moving up from bottom-6
      }}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      animate={{
        opacity: isVisible ? 1 : 0.3,
        scale: isVisible ? 1 : 0.8,
      }}
      transition={{ 
        type: 'spring', 
        stiffness: 400, 
        damping: 40,
        opacity: { duration: 0.2 },
        scale: { duration: 0.2 }
      }}
      onMouseEnter={() => {
        setIsVisible(true);
        if (hideTimeoutRef.current) {
          clearTimeout(hideTimeoutRef.current);
        }
      }}
      onMouseLeave={() => {
        if (!isOpen && !isDragging) {
          hideTimeoutRef.current = setTimeout(() => setIsVisible(false), 3000);
        }
      }}
    >
        {/* Menu Items - FIXED positioning từ center */}
        <AnimatePresence mode="wait">
          {isOpen && menuItems.map((item, index) => (
            <motion.button
              key={item.label}
              initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
              animate={getItemAnimation(index, menuItems.length)}
              exit={{ x: 0, y: 0, opacity: 0, scale: 0 }}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 25,
                delay: index * 0.04
              }}
              onClick={() => handleItemClick(item.href)}
              className={`absolute w-12 h-12 bg-gradient-to-r ${item.color} rounded-full shadow-lg hover:shadow-xl flex items-center justify-center text-white text-lg transition-transform group will-change-transform`}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              style={{
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)', // Center từ button chính
              }}
            >
              <span className="group-hover:animate-bounce">{item.icon}</span>
              
              {/* Tooltip */}
              <div className="absolute left-full ml-3 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
                {item.label}
              </div>
            </motion.button>
          ))}
        </AnimatePresence>

        {/* Main FAB Button - centered in container */}
        <motion.button
          data-fab-button
          onClick={() => !isDragging && setIsOpen(!isOpen)}
          className={`absolute top-0 left-0 w-16 h-16 bg-gradient-to-r from-primary-600 to-purple-600 rounded-full shadow-xl flex items-center justify-center text-white text-2xl transition-shadow duration-200 cursor-move will-change-transform ${
            isDragging ? 'shadow-2xl' : 'hover:shadow-2xl'
          }`}
          whileHover={{ scale: isDragging ? 1 : 1.05 }}
          whileTap={{ scale: 0.95 }}
          animate={{ 
            rotate: isOpen ? 45 : 0,
            scale: isDragging ? 1.05 : 1
          }}
          transition={{ 
            type: 'spring', 
            stiffness: 400, 
            damping: 30,
            rotate: { duration: 0.2 },
            scale: { duration: 0.15 }
          }}
        >
          <motion.span
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          >
            {isDragging ? '🎯' : isOpen ? '✕' : '☰'}
          </motion.span>

          {/* Ripple effect - simplified */}
          <div className="absolute inset-0 rounded-full bg-white opacity-0 hover:opacity-10 transition-opacity duration-200" />
        </motion.button>

        {/* Background overlay when open */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm -z-10"
            />
          )}
        </AnimatePresence>
      </motion.div>
  );
}
