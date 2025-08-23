'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { siteConfig } from '@/data';

/**
 * Draggable Floating Action Menu Component
 * 
 * Button nổi có thể kéo thả tự do với menu tròn chứa các quick links.
 * Tối ưu hóa trải nghiệm người dùng với smart positioning và adaptive UI.
 */
export default function FloatingActionMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 24, y: 24 }); // Bottom-left default
  const [isMinimized, setIsMinimized] = useState(false);
  const constraintsRef = useRef<HTMLDivElement>(null);

  // Auto-hide khi không tương tác
  const [isVisible, setIsVisible] = useState(true);
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Phát hiện vị trí tối ưu dựa trên viewport
  const [isRightSide, setIsRightSide] = useState(false);
  const [isBottomSide, setIsBottomSide] = useState(true);

  // Auto-hide logic
  useEffect(() => {
    const resetHideTimer = () => {
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }
      setIsVisible(true);
      
      // Auto-hide sau 5 giây nếu không tương tác và menu đóng
      if (!isOpen) {
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
  }, [isOpen]);

  // Xử lý kéo thả
  const handleDragEnd = (event: any, info: PanInfo) => {
    setIsDragging(false);
    
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    // Tính toán vị trí mới
    let newX = position.x + info.offset.x;
    let newY = position.y + info.offset.y;
    
    // Snap to edges cho UX tốt hơn
    const snapThreshold = 50;
    const buttonSize = 64; // Size of FAB
    
    // Snap horizontal
    if (newX < snapThreshold) {
      newX = 24; // Left edge
      setIsRightSide(false);
    } else if (newX > viewportWidth - buttonSize - snapThreshold) {
      newX = viewportWidth - buttonSize - 24; // Right edge
      setIsRightSide(true);
    }
    
    // Snap vertical
    if (newY < snapThreshold) {
      newY = 24; // Top edge
      setIsBottomSide(false);
    } else if (newY > viewportHeight - buttonSize - snapThreshold) {
      newY = viewportHeight - buttonSize - 24; // Bottom edge
      setIsBottomSide(true);
    }
    
    setPosition({ x: newX, y: newY });
  };

  const handleDragStart = () => {
    setIsDragging(true);
    setIsOpen(false); // Đóng menu khi bắt đầu kéo
  };

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

  // Animation cho từng menu item theo hình tròn
  const getItemAnimation = (index: number, total: number) => {
    const angle = (index * 360) / total - 90; // Bắt đầu từ trên cùng
    const radius = 80; // Bán kính của circle
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

  return (
    <div className="fixed bottom-6 left-6 z-50">
      {/* Menu Items */}
      <AnimatePresence>
        {menuItems.map((item, index) => (
          <motion.button
            key={item.label}
            initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
            animate={getItemAnimation(index, menuItems.length)}
            exit={{ x: 0, y: 0, opacity: 0, scale: 0 }}
            transition={{
              type: 'spring',
              stiffness: 260,
              damping: 20,
              delay: isOpen ? index * 0.05 : 0
            }}
            onClick={() => handleItemClick(item.href)}
            className={`absolute w-12 h-12 bg-gradient-to-r ${item.color} rounded-full shadow-lg hover:shadow-xl flex items-center justify-center text-white text-lg hover:scale-110 transition-transform group`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            style={{
              bottom: 0,
              left: 0,
            }}
          >
            <span className="group-hover:animate-bounce">{item.icon}</span>
            
            {/* Tooltip */}
            <div className="absolute left-full ml-3 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              {item.label}
            </div>
          </motion.button>
        ))}
      </AnimatePresence>

      {/* Main FAB Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={`relative w-16 h-16 bg-gradient-to-r from-primary-600 to-purple-600 rounded-full shadow-xl flex items-center justify-center text-white text-2xl hover:shadow-2xl transition-all duration-300 ${
          isOpen ? 'rotate-45' : 'rotate-0'
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        animate={{ rotate: isOpen ? 45 : 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      >
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        >
          {isOpen ? '✕' : '☰'}
        </motion.span>

        {/* Ripple effect */}
        <div className="absolute inset-0 rounded-full bg-white opacity-0 hover:opacity-20 transition-opacity" />
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
    </div>
  );
}
