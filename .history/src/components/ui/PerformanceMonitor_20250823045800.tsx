/**
 * Performance Monitor Component
 * 
 * A lightweight performance monitoring utility that tracks key metrics
 * and provides optimization suggestions for the portfolio.
 * 
 * @component
 */

'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PerformanceMetrics {
  /** First Contentful Paint time in milliseconds */
  fcp?: number;
  /** Largest Contentful Paint time in milliseconds */
  lcp?: number;
  /** First Input Delay in milliseconds */
  fid?: number;
  /** Cumulative Layout Shift score */
  cls?: number;
  /** Time to Interactive in milliseconds */
  tti?: number;
  /** Current FPS for animations */
  fps?: number;
  /** Memory usage in MB */
  memory?: number;
}

interface PerformanceMonitorProps {
  /** Whether to show the performance overlay */
  showOverlay?: boolean;
  /** Whether to enable development mode logging */
  enableLogging?: boolean;
  /** Callback for performance data */
  onMetricsUpdate?: (metrics: PerformanceMetrics) => void;
}

/**
 * Performance Monitor Hook
 * 
 * Monitors various performance metrics and provides real-time feedback
 */
export function usePerformanceMonitor() {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({});
  const [isMonitoring, setIsMonitoring] = useState(false);

  /**
   * Measure Core Web Vitals
   */
  const measureWebVitals = useCallback(() => {
    // FCP - First Contentful Paint
    const fcpEntry = performance.getEntriesByName('first-contentful-paint')[0];
    if (fcpEntry) {
      setMetrics(prev => ({ ...prev, fcp: fcpEntry.startTime }));
    }

    // LCP - Largest Contentful Paint
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      setMetrics(prev => ({ ...prev, lcp: lastEntry.startTime }));
    });

    try {
      observer.observe({ entryTypes: ['largest-contentful-paint'] });
    } catch {
      // LCP not supported
    }

    // FID - First Input Delay
    const fidObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const fidEntry = entry as FIDEntry;
        setMetrics(prev => ({ ...prev, fid: fidEntry.processingStart - fidEntry.startTime }));
      }
    });

    try {
      fidObserver.observe({ entryTypes: ['first-input'] });
    } catch {
      // FID not supported
    }

    // CLS - Cumulative Layout Shift
    let clsValue = 0;
    const clsObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const clsEntry = entry as CLSEntry;
        if (!clsEntry.hadRecentInput) {
          clsValue += clsEntry.value;
          setMetrics(prev => ({ ...prev, cls: clsValue }));
        }
      }
    });

    try {
      clsObserver.observe({ entryTypes: ['layout-shift'] });
    } catch {
      // CLS not supported
    }

    return () => {
      observer.disconnect();
      fidObserver.disconnect();
      clsObserver.disconnect();
    };
  }, []);

  /**
   * Measure FPS
   */
  const measureFPS = useCallback(() => {
    let lastTime = performance.now();
    let frames = 0;

    const measureFrame = () => {
      frames++;
      const currentTime = performance.now();
      if (currentTime >= lastTime + 1000) {
        const fps = Math.round((frames * 1000) / (currentTime - lastTime));
        setMetrics(prev => ({ ...prev, fps }));
        frames = 0;
        lastTime = currentTime;
      }
      if (isMonitoring) {
        requestAnimationFrame(measureFrame);
      }
    };

    requestAnimationFrame(measureFrame);
  }, [isMonitoring]);

  /**
   * Measure Memory Usage
   */
  const measureMemory = useCallback(() => {
    if ('memory' in performance) {
      const memInfo = (performance as PerformanceWithMemory).memory;
      const memoryUsage = memInfo.usedJSHeapSize / (1024 * 1024); // Convert to MB
      setMetrics(prev => ({ ...prev, memory: Math.round(memoryUsage) }));
    }
  }, []);

// Type definitions for performance entries
interface FIDEntry extends PerformanceEntry {
  processingStart: number;
}

interface CLSEntry extends PerformanceEntry {
  hadRecentInput: boolean;
  value: number;
}

interface PerformanceWithMemory extends Performance {
  memory: {
    usedJSHeapSize: number;
    totalJSHeapSize: number;
    jsHeapSizeLimit: number;
  };
}

  /**
   * Start monitoring
   */
  const startMonitoring = useCallback(() => {
    setIsMonitoring(true);
    const cleanup = measureWebVitals();
    measureFPS();
    
    const memoryInterval = setInterval(measureMemory, 2000);
    
    return () => {
      cleanup?.();
      clearInterval(memoryInterval);
      setIsMonitoring(false);
    };
  }, [measureWebVitals, measureFPS, measureMemory]);

  return {
    metrics,
    isMonitoring,
    startMonitoring
  };
}

/**
 * Performance Score Calculator
 */
function calculatePerformanceScore(metrics: PerformanceMetrics): number {
  let score = 100;
  
  // LCP scoring (0-2.5s = good, 2.5-4s = needs improvement, >4s = poor)
  if (metrics.lcp) {
    if (metrics.lcp > 4000) score -= 30;
    else if (metrics.lcp > 2500) score -= 15;
  }
  
  // FID scoring (0-100ms = good, 100-300ms = needs improvement, >300ms = poor)
  if (metrics.fid) {
    if (metrics.fid > 300) score -= 20;
    else if (metrics.fid > 100) score -= 10;
  }
  
  // CLS scoring (0-0.1 = good, 0.1-0.25 = needs improvement, >0.25 = poor)
  if (metrics.cls) {
    if (metrics.cls > 0.25) score -= 25;
    else if (metrics.cls > 0.1) score -= 15;
  }
  
  // FPS scoring (60fps = perfect, 30fps = acceptable, <30fps = poor)
  if (metrics.fps) {
    if (metrics.fps < 30) score -= 20;
    else if (metrics.fps < 50) score -= 10;
  }
  
  return Math.max(0, score);
}

/**
 * Performance Monitor Component
 */
export default function PerformanceMonitor({
  showOverlay = false,
  enableLogging = false,
  onMetricsUpdate
}: PerformanceMonitorProps) {
  const { metrics, isMonitoring, startMonitoring } = usePerformanceMonitor();
  const [score, setScore] = useState(100);

  useEffect(() => {
    const cleanup = startMonitoring();
    return cleanup;
  }, [startMonitoring]);

  useEffect(() => {
    const newScore = calculatePerformanceScore(metrics);
    setScore(newScore);
    onMetricsUpdate?.(metrics);
    
    if (enableLogging && Object.keys(metrics).length > 0) {
      console.group('🚀 Performance Metrics');
      console.log('Score:', newScore);
      console.table(metrics);
      console.groupEnd();
    }
  }, [metrics, enableLogging, onMetricsUpdate]);

  if (!showOverlay) return null;

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-500';
    if (score >= 70) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getMetricStatus = (value: number | undefined, thresholds: [number, number]) => {
    if (!value) return 'text-gray-400';
    if (value <= thresholds[0]) return 'text-green-500';
    if (value <= thresholds[1]) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 20 }}
        className="fixed top-20 right-4 z-50 bg-black/90 backdrop-blur-sm text-white p-4 rounded-lg text-xs font-mono max-w-xs"
      >
        <div className="flex items-center gap-2 mb-3">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="font-semibold">Performance Monitor</span>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span>Score:</span>
            <span className={`font-bold ${getScoreColor(score)}`}>{score}/100</span>
          </div>
          
          {metrics.lcp && (
            <div className="flex justify-between items-center">
              <span>LCP:</span>
              <span className={getMetricStatus(metrics.lcp, [2500, 4000])}>
                {(metrics.lcp / 1000).toFixed(2)}s
              </span>
            </div>
          )}
          
          {metrics.fid && (
            <div className="flex justify-between items-center">
              <span>FID:</span>
              <span className={getMetricStatus(metrics.fid, [100, 300])}>
                {metrics.fid.toFixed(0)}ms
              </span>
            </div>
          )}
          
          {metrics.cls && (
            <div className="flex justify-between items-center">
              <span>CLS:</span>
              <span className={getMetricStatus(metrics.cls, [0.1, 0.25])}>
                {metrics.cls.toFixed(3)}
              </span>
            </div>
          )}
          
          {metrics.fps && (
            <div className="flex justify-between items-center">
              <span>FPS:</span>
              <span className={getMetricStatus(60 - metrics.fps, [10, 30])}>
                {metrics.fps}
              </span>
            </div>
          )}
          
          {metrics.memory && (
            <div className="flex justify-between items-center">
              <span>Memory:</span>
              <span className="text-blue-400">{metrics.memory}MB</span>
            </div>
          )}
        </div>
        
        <div className="mt-3 pt-2 border-t border-gray-600 text-gray-400">
          {isMonitoring ? 'Monitoring...' : 'Stopped'}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
