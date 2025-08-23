'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import type { PointerEvent } from 'react';
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

  // Đảm bảo vị trí luôn hợp lệ
  useEffect(() => {
    const validatePosition = () => {
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const buttonSize = 64;
      
      const maxX = viewportWidth - buttonSize - 24;
      const maxY = viewportHeight - buttonSize - 24;
      
      const newX = Math.max(24, Math.min(maxX, position.x));
      const newY = Math.max(24, Math.min(maxY, position.y));
      
      if (newX !== position.x || newY !== position.y) {
        setPosition({ x: newX, y: newY });
      }
      
      // Update side indicators
      setIsRightSide(newX > viewportWidth / 2);
      setIsBottomSide(newY > viewportHeight / 2);
    };

    // Validate on mount and resize
    validatePosition();
    window.addEventListener('resize', validatePosition);
    
    return () => {
      window.removeEventListener('resize', validatePosition);
    };
  }, [position.x, position.y]);

  // Xử lý kéo thả
  const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    setIsDragging(false);
    
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const buttonSize = 64; // Size of FAB
    
    // Tính toán vị trí mới dựa trên offset
    let newX = Math.max(24, Math.min(viewportWidth - buttonSize - 24, position.x + info.offset.x));
    let newY = Math.max(24, Math.min(viewportHeight - buttonSize - 24, position.y + info.offset.y));
    
    // Snap to edges cho UX tốt hơn
    const snapThreshold = 50;
    
    // Snap horizontal
    if (newX < snapThreshold) {
      newX = 24; // Left edge
      setIsRightSide(false);
    } else if (newX > viewportWidth - buttonSize - snapThreshold) {
      newX = viewportWidth - buttonSize - 24; // Right edge
      setIsRightSide(true);
    } else {
      // Determine side based on current position
      setIsRightSide(newX > viewportWidth / 2);
    }
    
    // Snap vertical
    if (newY < snapThreshold) {
      newY = 24; // Top edge
      setIsBottomSide(false);
    } else if (newY > viewportHeight - buttonSize - snapThreshold) {
      newY = viewportHeight - buttonSize - 24; // Bottom edge
      setIsBottomSide(true);
    } else {
      // Determine side based on current position
      setIsBottomSide(newY > viewportHeight / 2);
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

  // Animation cho từng menu item theo hình tròn với adaptive positioning
  const getItemAnimation = (index: number, total: number) => {
    const baseAngle = -90; // Bắt đầu từ trên cùng
    const angleStep = 360 / total;
    const angle = baseAngle + (index * angleStep);
    const radius = 80;
    
    // Điều chỉnh hướng menu dựa trên vị trí FAB
    let adjustedAngle = angle;
    if (isRightSide && isBottomSide) {
      // Bottom-right: Mở về phía trên-trái
      adjustedAngle = angle + 180;
    } else if (isRightSide && !isBottomSide) {
      // Top-right: Mở về phía dưới-trái  
      adjustedAngle = angle + 90;
    } else if (!isRightSide && !isBottomSide) {
      // Top-left: Mở về phía dưới-phải
      adjustedAngle = angle - 90;
    }
    // Bottom-left (default): Mở bình thường
    
    const radian = (adjustedAngle * Math.PI) / 180;
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
    <>
      {/* Drag Constraints Container */}
      <div ref={constraintsRef} className="fixed inset-0 pointer-events-none z-50" />
      
      <motion.div
        className="fixed z-50"
        style={{
          left: position.x,
          top: position.y,
        }}
        animate={{
          opacity: isVisible ? 1 : 0.3,
          scale: isVisible ? 1 : 0.8,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        onMouseEnter={() => {
          setIsVisible(true);
          if (hideTimeoutRef.current) {
            clearTimeout(hideTimeoutRef.current);
          }
        }}
        onMouseLeave={() => {
          if (!isOpen) {
            hideTimeoutRef.current = setTimeout(() => setIsVisible(false), 3000);
          }
        }}
      >
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
                pointerEvents: isOpen ? 'auto' : 'none',
              }}
            >
              <span className="group-hover:animate-bounce">{item.icon}</span>
              
              {/* Smart Tooltip Positioning */}
              <div className={`absolute ${
                isRightSide ? 'right-full mr-3' : 'left-full ml-3'
              } ${
                isBottomSide ? 'bottom-0' : 'top-0'
              } px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10`}>
                {item.label}
              </div>
            </motion.button>
          ))}
        </AnimatePresence>

        {/* Main Draggable FAB Button */}
        <motion.button
          drag
          dragConstraints={{
            left: -position.x + 24,
            right: window.innerWidth - position.x - 88, // 64px button + 24px margin
            top: -position.y + 24,
            bottom: window.innerHeight - position.y - 88
          }}
          dragElastic={0.1}
          dragMomentum={false}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onClick={() => !isDragging && setIsOpen(!isOpen)}
          className={`relative w-16 h-16 bg-gradient-to-r from-primary-600 to-purple-600 rounded-full shadow-xl flex items-center justify-center text-white text-2xl hover:shadow-2xl transition-all duration-300 cursor-move ${
            isOpen ? 'rotate-45' : 'rotate-0'
          } ${isDragging ? 'scale-110 shadow-2xl' : ''}`}
          whileHover={{ scale: isDragging ? 1.1 : 1.05 }}
          whileTap={{ scale: 0.95 }}
          animate={{ 
            rotate: isOpen ? 45 : 0,
            scale: isDragging ? 1.1 : 1
          }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        >
          <motion.span
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          >
            {isDragging ? '🎯' : isOpen ? '✕' : '☰'}
          </motion.span>

          {/* Ripple effect */}
          <div className="absolute inset-0 rounded-full bg-white opacity-0 hover:opacity-20 transition-opacity" />
          
          {/* Drag indicator */}
          {isDragging && (
            <div className="absolute -inset-2 border-2 border-primary-400 rounded-full animate-pulse" />
          )}
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

        {/* Minimize/Maximize Toggle */}
        {!isOpen && (
          <motion.button
            onClick={(e) => {
              e.stopPropagation();
              setIsMinimized(!isMinimized);
            }}
            className="absolute -top-2 -right-2 w-6 h-6 bg-gray-600 hover:bg-gray-700 text-white text-xs rounded-full flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isMinimized ? '○' : '●'}
          </motion.button>
        )}
      </motion.div>
    </>
  );
}
