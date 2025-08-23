/**
 * Utility Functions and Helpers
 * 
 * This file contains commonly used utility functions throughout the portfolio application.
 * These functions handle class name merging, date formatting, content processing,
 * and other shared functionality.
 * 
 * @fileoverview Common utility functions and site configuration
 */

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Class Name Utility Function
 * 
 * Combines clsx and tailwind-merge for optimal Tailwind CSS class handling.
 * This function merges class names intelligently, removing conflicts and
 * ensuring proper Tailwind CSS class precedence.
 * 
 * @param inputs - Variable number of class values (strings, objects, arrays)
 * @returns Merged and deduplicated class string
 * 
 * @example
 * cn('px-4 py-2', 'px-6') // returns 'py-2 px-6'
 * cn('text-red-500', isActive && 'text-blue-500') // conditional classes
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Date Formatting Utility
 * 
 * Formats Date objects or ISO date strings into human-readable format.
 * Uses US locale with full month names for consistent presentation.
 * 
 * @param date - Date object or ISO date string
 * @returns Formatted date string (e.g., "January 15, 2024")
 * 
 * @example
 * formatDate(new Date()) // "January 15, 2024"
 * formatDate("2024-01-15") // "January 15, 2024"
 */
export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

/**
 * Reading Time Calculator
 * 
 * Estimates reading time for text content based on average reading speed.
 * Uses industry standard of 200 words per minute for calculations.
 * 
 * @param content - Text content to analyze
 * @returns Estimated reading time in minutes (rounded up)
 * 
 * @example
 * getReadingTime("Lorem ipsum...") // 3 (minutes)
 */
export function getReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

/**
 * Smooth Scroll Utility
 * 
 * Smoothly scrolls to a specific element by ID with native browser behavior.
 * Provides fallback for better browser compatibility.
 * 
 * @param id - Element ID to scroll to (without #)
 * 
 * @example
 * scrollToSection('about') // scrolls to element with id="about"
 */
export function scrollToSection(id: string) {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
}

/**
 * Legacy Site Configuration
 * 
 * @deprecated Use siteConfig from @/data/index.ts instead
 * This configuration is kept for backward compatibility but should be migrated.
 */
export const siteConfig = {
  name: "Võ Ngọc Cường",
  nameEn: "Vo Ngoc Cuong", 
  title: "Frontend Developer",
  description: "Chuyên gia Frontend Developer với 5+ năm kinh nghiệm",
  descriptionEn: "Expert Frontend Developer with 5+ years of experience",
  url: "https://YOUR_DOMAIN.com",
  ogImage: "https://YOUR_DOMAIN.com/og-image.jpg",
  links: {
    twitter: "https://twitter.com/YOUR_TWITTER",
    github: "https://github.com/YOUR_GITHUB",
    linkedin: "https://linkedin.com/in/YOUR_LINKEDIN",
    email: "your.email@example.com"
  }
};
