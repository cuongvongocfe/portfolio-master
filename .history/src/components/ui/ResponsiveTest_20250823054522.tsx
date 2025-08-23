/**
 * Responsive Design Test Component
 * 
 * A development component to test and showcase responsive design
 * and performance optimizations. Only visible in development mode.
 * 
 * @component
 */

'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import ResponsiveContainer, { GridContainer, FlexContainer } from './ResponsiveContainer';
import PerformanceMonitor from './PerformanceMonitor';

interface ResponsiveTestProps {
  /** Whether to show the test overlay */
  showTestOverlay?: boolean;
}

/**
 * Screen Size Indicator Component
 */
function ScreenSizeIndicator() {
  return (
    <div className="fixed bottom-4 left-4 z-50 bg-blue-600 text-white px-3 py-2 rounded-lg text-sm font-mono">
      <div className="block sm:hidden">XS (&lt; 640px)</div>
      <div className="hidden sm:block md:hidden">SM (640px+)</div>
      <div className="hidden md:block lg:hidden">MD (768px+)</div>
      <div className="hidden lg:block xl:hidden">LG (1024px+)</div>
      <div className="hidden xl:block 2xl:hidden">XL (1280px+)</div>
      <div className="hidden 2xl:block">2XL (1536px+)</div>
    </div>
  );
}

/**
 * Typography Test Section
 */
function TypographyTest() {
  return (
    <ResponsiveContainer size="xl" padding="lg" className="bg-gray-50 dark:bg-gray-900">
      <h2 className="text-responsive-3xl gradient-text mb-6">Typography Test</h2>
      
      <div className="space-y-4">
        <div className="text-responsive-2xl">Responsive 2XL Text</div>
        <div className="text-responsive-xl">Responsive XL Text</div>
        <div className="text-responsive-lg">Responsive LG Text</div>
        <div className="text-responsive">Responsive Base Text</div>
        
        <p className="text-responsive line-clamp-2">
          This is a long paragraph that demonstrates the line-clamp-2 utility. 
          It should only show two lines of text and then truncate with an ellipsis. 
          This helps maintain consistent layouts across different screen sizes.
        </p>
      </div>
    </ResponsiveContainer>
  );
}

/**
 * Grid Test Section
 */
function GridTest() {
  const items = Array.from({ length: 12 }, (_, i) => i + 1);

  return (
    <GridContainer
      cols={{ sm: 1, md: 2, lg: 3, xl: 4 }}
      gap="lg"
      size="xl"
      padding="lg"
      className="bg-white dark:bg-gray-800"
    >
      {items.map((item) => (
        <motion.div
          key={item}
          whileHover={{ scale: 1.05 }}
          className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-lg text-center font-bold gpu-accelerated"
        >
          Item {item}
        </motion.div>
      ))}
    </GridContainer>
  );
}

/**
 * Flex Test Section
 */
function FlexTest() {
  return (
    <FlexContainer
      direction="col"
      responsiveDirection={{ md: "row" }}
      align="center"
      justify="between"
      gap="lg"
      size="xl"
      padding="lg"
      className="bg-gray-100 dark:bg-gray-700"
    >
      <motion.div 
        className="bg-green-500 text-white p-8 rounded-lg min-h-[200px] flex items-center justify-center font-bold gpu-accelerated"
        whileHover={{ rotate: 5 }}
      >
        Flex Item 1
      </motion.div>
      
      <motion.div 
        className="bg-red-500 text-white p-8 rounded-lg min-h-[200px] flex items-center justify-center font-bold gpu-accelerated"
        whileHover={{ rotate: -5 }}
      >
        Flex Item 2
      </motion.div>
      
      <motion.div 
        className="bg-yellow-500 text-white p-8 rounded-lg min-h-[200px] flex items-center justify-center font-bold gpu-accelerated"
        whileHover={{ scale: 1.1 }}
      >
        Flex Item 3
      </motion.div>
    </FlexContainer>
  );
}

/**
 * Animation Test Section
 */
function AnimationTest() {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <ResponsiveContainer size="xl" padding="lg" className="bg-gradient-to-r from-purple-500 to-pink-500">
      <div className="text-center text-white">
        <h2 className="text-responsive-2xl mb-8">Animation Performance Test</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <motion.div
            className="bg-white/20 backdrop-blur-sm p-6 rounded-lg animate-float gpu-accelerated"
            whileHover={{ scale: 1.1 }}
          >
            <div className="text-lg font-bold mb-2">Float Animation</div>
            <div className="text-sm opacity-90">Continuous floating motion</div>
          </motion.div>
          
          <motion.div
            className="bg-white/20 backdrop-blur-sm p-6 rounded-lg animate-pulse-glow gpu-accelerated"
            whileHover={{ scale: 1.1 }}
          >
            <div className="text-lg font-bold mb-2">Pulse Glow</div>
            <div className="text-sm opacity-90">Glowing pulse effect</div>
          </motion.div>
          
          <motion.div
            className="bg-white/20 backdrop-blur-sm p-6 rounded-lg animate-fade-in-scale gpu-accelerated"
            whileHover={{ scale: 1.1 }}
          >
            <div className="text-lg font-bold mb-2">Fade In Scale</div>
            <div className="text-sm opacity-90">Scale and fade animation</div>
          </motion.div>
        </div>
        
        <button
          onClick={() => setIsVisible(!isVisible)}
          className="bg-white text-purple-600 px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition-all duration-300 focus-ring"
        >
          Toggle Visibility Test
        </button>
        
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="mt-6 bg-white/20 backdrop-blur-sm p-6 rounded-lg gpu-accelerated"
          >
            <div className="text-lg font-bold">Dynamic Content</div>
            <div className="text-sm opacity-90">This content appears and disappears smoothly</div>
          </motion.div>
        )}
      </div>
    </ResponsiveContainer>
  );
}

/**
 * Main Responsive Test Component
 */
export default function ResponsiveTest({ showTestOverlay = false }: ResponsiveTestProps) {
  if (process.env.NODE_ENV !== 'development' || !showTestOverlay) {
    return null;
  }

  return (
    <>
      {/* Screen Size Indicator */}
      <ScreenSizeIndicator />
      
      {/* Performance Monitor */}
      <PerformanceMonitor 
        showOverlay={true}
        enableLogging={true}
      />
      
      {/* Test Sections */}
      <div className="space-y-0">
        <TypographyTest />
        <GridTest />
        <FlexTest />
        <AnimationTest />
      </div>
      
      {/* Floating Test Controls */}
      <motion.div
        initial={{ x: 20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="fixed top-1/2 right-4 -translate-y-1/2 z-50 bg-black/90 backdrop-blur-sm text-white p-4 rounded-lg text-sm"
      >
        <div className="font-bold mb-2">🧪 Dev Mode</div>
        <div className="space-y-1 text-xs">
          <div>✅ Responsive Containers</div>
          <div>✅ Typography Scaling</div>
          <div>✅ Grid & Flex Layouts</div>
          <div>✅ Performance Monitoring</div>
          <div>✅ GPU Acceleration</div>
        </div>
      </motion.div>
    </>
  );
}
