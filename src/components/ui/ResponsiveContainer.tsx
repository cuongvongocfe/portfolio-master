/**
 * Responsive Container Component
 * 
 * A reusable container component that provides consistent responsive layout
 * and spacing across all sections of the portfolio. Includes performance
 * optimizations and accessibility features.
 * 
 * @component
 */

'use client';

import { ReactNode, forwardRef } from 'react';
import { motion, MotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ResponsiveContainerProps {
  /** Child components to render inside the container */
  children: ReactNode;
  /** Custom CSS classes to apply */
  className?: string;
  /** Section ID for navigation and accessibility */
  id?: string;
  /** Container size variant */
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  /** Vertical padding variant */
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  /** Whether to enable GPU acceleration */
  optimized?: boolean;
  /** Whether this container should be a semantic section */
  asSection?: boolean;
  /** Animation props from Framer Motion */
  animation?: MotionProps;
}

/**
 * Base container size classes
 */
const sizeClasses = {
  sm: 'max-w-4xl',
  md: 'max-w-5xl',
  lg: 'max-w-6xl',
  xl: 'max-w-7xl',
  full: 'max-w-full'
};

/**
 * Responsive padding classes
 */
const paddingClasses = {
  none: '',
  sm: 'py-8 sm:py-12',
  md: 'py-12 sm:py-16 lg:py-20',
  lg: 'py-16 sm:py-20 lg:py-24',
  xl: 'py-20 sm:py-24 lg:py-32'
};

/**
 * Default animation settings for performance
 */
const defaultAnimation: MotionProps = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.6, ease: [0.4, 0.0, 0.2, 1] }
};

/**
 * Responsive Container Component
 * 
 * Provides consistent responsive layout with performance optimizations:
 * - Automatic GPU acceleration for smooth animations
 * - Responsive spacing and sizing
 * - Accessibility-friendly structure
 * - Optimized viewport detection for animations
 * 
 * @param props - Component props
 * @returns Responsive container with proper layout and animations
 */
export const ResponsiveContainer = forwardRef<HTMLDivElement, ResponsiveContainerProps>(({
  children,
  className,
  id,
  size = 'xl',
  padding = 'lg',
  optimized = true,
  asSection = false,
  animation,
  ...props
}, ref) => {
  const containerClasses = cn(
    // Base layout classes
    'w-full mx-auto px-4 sm:px-6 lg:px-8',
    
    // Size classes
    sizeClasses[size],
    
    // Padding classes
    paddingClasses[padding],
    
    // Performance optimizations
    optimized && 'gpu-accelerated',
    
    // Custom classes
    className
  );

  const Component = asSection ? motion.section : motion.div;
  const finalAnimation = animation || defaultAnimation;

  return (
    <Component
      ref={ref}
      id={id}
      className={containerClasses}
      {...finalAnimation}
      {...props}
    >
      {children}
    </Component>
  );
});

ResponsiveContainer.displayName = 'ResponsiveContainer';

/**
 * Grid Container Component
 * 
 * Specialized container for grid layouts with responsive columns
 */
interface GridContainerProps extends Omit<ResponsiveContainerProps, 'children'> {
  children: ReactNode;
  /** Number of columns on different breakpoints */
  cols?: {
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  /** Gap between grid items */
  gap?: 'sm' | 'md' | 'lg' | 'xl';
}

const gapClasses = {
  sm: 'gap-4',
  md: 'gap-6',
  lg: 'gap-8',
  xl: 'gap-12'
};

export const GridContainer = forwardRef<HTMLDivElement, GridContainerProps>(({
  children,
  cols = { sm: 1, md: 2, lg: 3 },
  gap = 'lg',
  className,
  ...props
}, ref) => {
  const gridClasses = cn(
    'grid',
    cols.sm && `grid-cols-${cols.sm}`,
    cols.md && `md:grid-cols-${cols.md}`,
    cols.lg && `lg:grid-cols-${cols.lg}`,
    cols.xl && `xl:grid-cols-${cols.xl}`,
    gapClasses[gap]
  );

  return (
    <ResponsiveContainer ref={ref} className={className} {...props}>
      <div className={gridClasses}>
        {children}
      </div>
    </ResponsiveContainer>
  );
});

GridContainer.displayName = 'GridContainer';

/**
 * Flex Container Component
 * 
 * Specialized container for flex layouts with responsive behavior
 */
interface FlexContainerProps extends Omit<ResponsiveContainerProps, 'children'> {
  children: ReactNode;
  /** Flex direction */
  direction?: 'row' | 'col';
  /** Responsive flex direction */
  responsiveDirection?: {
    sm?: 'row' | 'col';
    md?: 'row' | 'col';
    lg?: 'row' | 'col';
  };
  /** Flex alignment */
  align?: 'start' | 'center' | 'end' | 'stretch';
  /** Flex justification */
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  /** Gap between flex items */
  gap?: 'sm' | 'md' | 'lg' | 'xl';
  /** Whether items should wrap */
  wrap?: boolean;
}

export const FlexContainer = forwardRef<HTMLDivElement, FlexContainerProps>(({
  children,
  direction = 'col',
  responsiveDirection,
  align = 'center',
  justify = 'center',
  gap = 'lg',
  wrap = false,
  className,
  ...props
}, ref) => {
  const flexClasses = cn(
    'flex',
    direction === 'row' ? 'flex-row' : 'flex-col',
    responsiveDirection?.sm && (responsiveDirection.sm === 'row' ? 'sm:flex-row' : 'sm:flex-col'),
    responsiveDirection?.md && (responsiveDirection.md === 'row' ? 'md:flex-row' : 'md:flex-col'),
    responsiveDirection?.lg && (responsiveDirection.lg === 'row' ? 'lg:flex-row' : 'lg:flex-col'),
    `items-${align}`,
    `justify-${justify}`,
    gapClasses[gap],
    wrap && 'flex-wrap'
  );

  return (
    <ResponsiveContainer ref={ref} className={className} {...props}>
      <div className={flexClasses}>
        {children}
      </div>
    </ResponsiveContainer>
  );
});

FlexContainer.displayName = 'FlexContainer';

export default ResponsiveContainer;
