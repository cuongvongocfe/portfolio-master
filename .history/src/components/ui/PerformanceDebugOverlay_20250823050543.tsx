/**
 * Performance Debug Overlay
 * 
 * A development-only component that displays performance metrics and debugging info
 * 
 * @component
 */

'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface DebugInfo {
  fps: number;
  memoryUsed: number;
  performanceLevel: string;
  deviceInfo: {
    cores: number;
    isMobile: boolean;
    userAgent: string;
  };
  animations: {
    reduced: boolean;
    enabled: boolean;
  };
}

export default function PerformanceDebugOverlay() {
  const [isVisible, setIsVisible] = useState(false);
  const [debugInfo, setDebugInfo] = useState<DebugInfo>({
    fps: 0,
    memoryUsed: 0,
    performanceLevel: 'unknown',
    deviceInfo: {
      cores: 0,
      isMobile: false,
      userAgent: ''
    },
    animations: {
      reduced: false,
      enabled: true
    }
  });

  useEffect(() => {
    // Only show in development
    if (process.env.NODE_ENV !== 'development') return;

    // Initialize debug info
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const cores = navigator.hardwareConcurrency || 1;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    let performanceLevel = 'medium';
    if (isMobile || cores < 2) {
      performanceLevel = 'low';
    } else if (cores >= 4) {
      performanceLevel = 'high';
    }

    setDebugInfo(prev => ({
      ...prev,
      performanceLevel,
      deviceInfo: {
        cores,
        isMobile,
        userAgent: navigator.userAgent
      },
      animations: {
        reduced: prefersReducedMotion,
        enabled: !prefersReducedMotion
      }
    }));

    // FPS monitoring
    let frameCount = 0;
    let lastTime = performance.now();

    const measureFPS = () => {
      frameCount++;
      const currentTime = performance.now();
      
      if (currentTime >= lastTime + 1000) {
        const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
        setDebugInfo(prev => ({ ...prev, fps }));
        frameCount = 0;
        lastTime = currentTime;
      }
      
      requestAnimationFrame(measureFPS);
    };

    measureFPS();

    // Memory monitoring
    const memoryInterval = setInterval(() => {
      if ('memory' in performance) {
        const memInfo = (performance as NavigatorWithMemory).memory;
        const memoryUsed = Math.round(memInfo.usedJSHeapSize / (1024 * 1024));
        setDebugInfo(prev => ({ ...prev, memoryUsed }));
      }
    }, 2000);

    // Keyboard shortcut to toggle
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'D') {
        setIsVisible(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      clearInterval(memoryInterval);
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  if (process.env.NODE_ENV !== 'development') return null;

  const getPerformanceColor = (level: string) => {
    switch (level) {
      case 'high': return 'text-green-400';
      case 'medium': return 'text-yellow-400';
      case 'low': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getFPSColor = (fps: number) => {
    if (fps >= 55) return 'text-green-400';
    if (fps >= 30) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="fixed bottom-4 right-4 z-[9999] bg-black/80 text-white p-2 rounded-full text-xs hover:bg-black/90 transition-colors"
        title="Toggle Performance Debug (Ctrl+Shift+D)"
      >
        🔧
      </button>

      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            className="fixed top-4 right-4 z-[9999] bg-black/90 backdrop-blur-sm text-white p-4 rounded-lg text-xs font-mono min-w-[300px] max-w-[400px]"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-blue-400">Performance Debug</h3>
              <button
                onClick={() => setIsVisible(false)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2">
              {/* Performance Metrics */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-gray-400">FPS:</div>
                  <div className={`font-bold ${getFPSColor(debugInfo.fps)}`}>
                    {debugInfo.fps}
                  </div>
                </div>
                <div>
                  <div className="text-gray-400">Memory:</div>
                  <div className="text-blue-400 font-bold">
                    {debugInfo.memoryUsed}MB
                  </div>
                </div>
              </div>

              {/* Performance Level */}
              <div>
                <div className="text-gray-400">Performance Level:</div>
                <div className={`font-bold ${getPerformanceColor(debugInfo.performanceLevel)}`}>
                  {debugInfo.performanceLevel.toUpperCase()}
                </div>
              </div>

              {/* Device Info */}
              <div>
                <div className="text-gray-400">Device Info:</div>
                <div className="text-green-400">
                  {debugInfo.deviceInfo.cores} cores
                  {debugInfo.deviceInfo.isMobile && ' • Mobile'}
                </div>
              </div>

              {/* Animation Status */}
              <div>
                <div className="text-gray-400">Animations:</div>
                <div className="space-y-1">
                  <div className={debugInfo.animations.enabled ? 'text-green-400' : 'text-red-400'}>
                    Enabled: {debugInfo.animations.enabled ? 'Yes' : 'No'}
                  </div>
                  <div className={debugInfo.animations.reduced ? 'text-yellow-400' : 'text-green-400'}>
                    Reduced Motion: {debugInfo.animations.reduced ? 'Yes' : 'No'}
                  </div>
                </div>
              </div>

              {/* Performance Recommendations */}
              <div className="mt-3 pt-3 border-t border-gray-700">
                <div className="text-gray-400 mb-1">Recommendations:</div>
                <div className="space-y-1 text-xs">
                  {debugInfo.fps < 30 && (
                    <div className="text-red-400">• FPS low - consider reducing animations</div>
                  )}
                  {debugInfo.memoryUsed > 100 && (
                    <div className="text-yellow-400">• High memory usage detected</div>
                  )}
                  {debugInfo.deviceInfo.isMobile && (
                    <div className="text-blue-400">• Mobile device - optimized mode active</div>
                  )}
                  {debugInfo.performanceLevel === 'low' && (
                    <div className="text-red-400">• Low performance mode - 3D effects disabled</div>
                  )}
                </div>
              </div>

              {/* CSS Classes Applied */}
              <div className="mt-3 pt-3 border-t border-gray-700">
                <div className="text-gray-400 mb-1">CSS Classes Applied:</div>
                <div className="text-xs text-green-400">
                  • performance-{debugInfo.performanceLevel}<br />
                  {debugInfo.animations.reduced && '• reduced-animations'}
                  {!debugInfo.animations.enabled && '• no-animations'}
                </div>
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-gray-700 text-xs text-gray-500">
              Press Ctrl+Shift+D to toggle
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
