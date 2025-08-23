/**
 * Animation Performance Controller
 * 
 * A utility to automatically adjust animation performance based on device capabilities
 * and user preferences. Helps reduce lag and improve user experience.
 * 
 * @component
 */

'use client';

import { useEffect, useState, createContext, useContext, ReactNode } from 'react';

interface PerformanceSettings {
  /** Whether animations should be enabled */
  enableAnimations: boolean;
  /** Animation duration multiplier (1 = normal, 2 = slower, 0.5 = faster) */
  durationMultiplier: number;
  /** Whether to use reduced animations */
  useReducedAnimations: boolean;
  /** Device performance level */
  performanceLevel: 'high' | 'medium' | 'low';
}

interface PerformanceContextType extends PerformanceSettings {
  /** Update performance settings */
  updateSettings: (settings: Partial<PerformanceSettings>) => void;
}

const PerformanceContext = createContext<PerformanceContextType | null>(null);

/**
 * Hook to use performance settings
 */
export function usePerformance() {
  const context = useContext(PerformanceContext);
  if (!context) {
    throw new Error('usePerformance must be used within a PerformanceProvider');
  }
  return context;
}

/**
 * Detect device performance level
 */
function detectPerformanceLevel(): 'high' | 'medium' | 'low' {
  // Check for various performance indicators
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  const isLowEndMobile = /Android.*Mobile|webOS|iPhone|iPod|BlackBerry|IEMobile/i.test(navigator.userAgent);
  
  // Check hardware concurrency (CPU cores)
  const cores = navigator.hardwareConcurrency || 1;
  
  // Check memory (if available)
  const memory = (navigator as any).deviceMemory || 4;
  
  // Check connection (if available)
  const connection = (navigator as any).connection;
  const isSlowConnection = connection && (
    connection.effectiveType === 'slow-2g' || 
    connection.effectiveType === '2g' ||
    connection.saveData
  );
  
  // Performance scoring
  let score = 0;
  
  // CPU cores bonus
  if (cores >= 8) score += 3;
  else if (cores >= 4) score += 2;
  else if (cores >= 2) score += 1;
  
  // Memory bonus
  if (memory >= 8) score += 2;
  else if (memory >= 4) score += 1;
  
  // Device type penalty
  if (isLowEndMobile) score -= 2;
  else if (isMobile) score -= 1;
  
  // Connection penalty
  if (isSlowConnection) score -= 2;
  
  // Determine performance level
  if (score >= 4) return 'high';
  if (score >= 1) return 'medium';
  return 'low';
}

/**
 * Check user motion preferences
 */
function checkMotionPreferences(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Check if user prefers reduced data
 */
function checkDataPreferences(): boolean {
  return window.matchMedia('(prefers-reduced-data: reduce)').matches;
}

interface PerformanceProviderProps {
  children: ReactNode;
}

/**
 * Performance Provider Component
 * 
 * Provides performance settings context throughout the app
 */
export function PerformanceProvider({ children }: PerformanceProviderProps) {
  const [settings, setSettings] = useState<PerformanceSettings>({
    enableAnimations: true,
    durationMultiplier: 1,
    useReducedAnimations: false,
    performanceLevel: 'medium'
  });

  useEffect(() => {
    // Detect initial performance settings
    const performanceLevel = detectPerformanceLevel();
    const prefersReducedMotion = checkMotionPreferences();
    const prefersReducedData = checkDataPreferences();
    
    let newSettings: PerformanceSettings = {
      performanceLevel,
      enableAnimations: !prefersReducedMotion && !prefersReducedData,
      useReducedAnimations: prefersReducedMotion || prefersReducedData,
      durationMultiplier: 1
    };
    
    // Adjust based on performance level
    switch (performanceLevel) {
      case 'low':
        newSettings.durationMultiplier = 1.5;
        newSettings.useReducedAnimations = true;
        break;
      case 'medium':
        newSettings.durationMultiplier = 1.2;
        break;
      case 'high':
        newSettings.durationMultiplier = 1;
        break;
    }
    
    // Disable animations for very low performance
    if (performanceLevel === 'low' && (prefersReducedMotion || prefersReducedData)) {
      newSettings.enableAnimations = false;
    }
    
    setSettings(newSettings);
    
    // Apply CSS custom properties for animation control
    const root = document.documentElement;
    root.style.setProperty('--animation-duration-multiplier', newSettings.durationMultiplier.toString());
    root.style.setProperty('--animations-enabled', newSettings.enableAnimations ? '1' : '0');
    
    // Add performance class to body
    document.body.classList.add(`performance-${performanceLevel}`);
    if (newSettings.useReducedAnimations) {
      document.body.classList.add('reduced-animations');
    }
    
    console.log('🎯 Performance Settings Applied:', newSettings);
  }, []);

  const updateSettings = (newSettings: Partial<PerformanceSettings>) => {
    setSettings(prev => {
      const updated = { ...prev, ...newSettings };
      
      // Update CSS custom properties
      const root = document.documentElement;
      root.style.setProperty('--animation-duration-multiplier', updated.durationMultiplier.toString());
      root.style.setProperty('--animations-enabled', updated.enableAnimations ? '1' : '0');
      
      return updated;
    });
  };

  const contextValue: PerformanceContextType = {
    ...settings,
    updateSettings
  };

  return (
    <PerformanceContext.Provider value={contextValue}>
      {children}
    </PerformanceContext.Provider>
  );
}

/**
 * Performance Aware Animation Component
 * 
 * Wraps Framer Motion components with performance-aware settings
 */
interface PerformanceAnimationProps {
  children: ReactNode;
  /** Override animation settings */
  forceEnable?: boolean;
}

export function PerformanceAnimation({ children, forceEnable = false }: PerformanceAnimationProps) {
  const { enableAnimations, useReducedAnimations } = usePerformance();
  
  if (!enableAnimations && !forceEnable) {
    return <>{children}</>;
  }
  
  // Apply reduced animations class if needed
  return (
    <div className={useReducedAnimations ? 'reduced-animations' : ''}>
      {children}
    </div>
  );
}

/**
 * Performance Aware CSS Hook
 * 
 * Returns CSS classes based on performance settings
 */
export function usePerformanceCSS() {
  const { enableAnimations, useReducedAnimations, performanceLevel } = usePerformance();
  
  return {
    animationClass: enableAnimations ? '' : 'no-animations',
    reducedClass: useReducedAnimations ? 'reduced-animations' : '',
    performanceClass: `performance-${performanceLevel}`,
    shouldAnimate: enableAnimations
  };
}

export default PerformanceProvider;
