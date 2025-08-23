/**
 * Logo Component với GIF Animation
 * 
 * Component hiển thị logo với khả năng fallback nếu GIF không load được.
 * Features:
 * - Hiển thị GIF animated
 * - Fallback về logo chữ nếu GIF không tải
 * - Hover effects và animations
 * - Responsive và tối ưu performance
 * 
 * @component
 * @returns {JSX.Element} Logo với animation và fallback
 */

'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Logo() {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="relative">
      <motion.div 
        className="w-10 h-10 rounded-lg overflow-hidden shadow-lg bg-gradient-to-br from-blue-600 via-purple-600 to-violet-700"
        whileHover={{ 
          boxShadow: "0 8px 32px rgba(99, 102, 241, 0.3)",
          scale: 1.05
        }}
        transition={{ duration: 0.3 }}
      >
        {!imageError ? (
          <>
            {/* GIF Logo */}
            <Image 
              src="/images/logo.gif" 
              alt="Cường Logo" 
              width={40}
              height={40}
              className="w-full h-full object-cover rounded-lg"
              unoptimized={true} // Để giữ nguyên animation GIF
              onError={() => setImageError(true)}
              priority // Load ưu tiên cho logo
            />
            {/* Overlay gradient để tạo hiệu ứng đẹp */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-violet-700/10 rounded-lg pointer-events-none" />
          </>
        ) : (
          // Fallback logo chữ
          <div className="w-full h-full bg-gradient-to-br from-blue-600 via-purple-600 to-violet-700 rounded-lg flex items-center justify-center">
            <span className="text-white font-semibold text-base tracking-tight">C</span>
          </div>
        )}
      </motion.div>
      
      {/* Glow effect */}
      <motion.div
        className="absolute -inset-1 bg-gradient-to-br from-blue-600/20 to-violet-700/20 rounded-lg blur opacity-0"
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
    </div>
  );
}
