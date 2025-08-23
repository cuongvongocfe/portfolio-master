/**
 * Root Layout Component for Portfolio Application
 * 
 * This is the main layout component that wraps all pages in the Next.js application.
 * It handles global font loading, metadata, and provides the HTML structure
 * for the entire application.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to render
 * @returns {JSX.Element} Root HTML layout with fonts and global styles
 */

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
// import PerformanceProvider from "@/components/ui/PerformanceProvider";
// import PerformanceDebugOverlay from "@/components/ui/PerformanceDebugOverlay";

/**
 * Geist Sans Font Configuration
 * 
 * Modern, clean sans-serif font from Vercel for body text and UI elements.
 * Uses CSS variable for dynamic font switching and optimization.
 */
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

/**
 * Geist Mono Font Configuration
 * 
 * Monospace font for code blocks, technical content, and terminal displays.
 * Provides excellent readability for programming content.
 */
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/**
 * Application Metadata
 * 
 * SEO and meta information for the entire application.
 * This provides default metadata that can be overridden by individual pages.
 * 
 * @type {Metadata}
 */
export const metadata: Metadata = {
  title: "Cường - Frontend Developer Portfolio",
  description: "Interactive portfolio showcasing modern web development skills, React, Next.js, and creative frontend solutions",
  keywords: "frontend developer, React, Next.js, TypeScript, portfolio, web development",
  authors: [{ name: "Cường" }],
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
};

/**
 * Root Layout Component
 * 
 * Provides the foundational HTML structure for all pages including:
 * - Font variable injection for Geist Sans and Mono fonts
 * - Global CSS antialiasing for smooth text rendering
 * - Semantic HTML structure with proper lang attribute
 * - CSS custom properties for font family switching
 * 
 * @param {Object} props - Component properties
 * @param {React.ReactNode} props.children - Page content to render
 * @returns {JSX.Element} Complete HTML document structure
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 transition-colors duration-300`}
      >
        {/* <PerformanceProvider> */}
          {/* Application Content */}
          {children}
          
          {/* Development Performance Debug Overlay - Temporarily disabled */}
          {/* <PerformanceDebugOverlay /> */}
        {/* </PerformanceProvider> */}
        
        {/* 
          Font Variables Available Throughout App:
          - var(--font-geist-sans) - For UI text and headings
          - var(--font-geist-mono) - For code and technical content
        */}
      </body>
    </html>
  );
}
