/**
 * TypeScript Type Definitions for Portfolio Application
 * 
 * This file contains all TypeScript interfaces and type definitions used throughout
 * the portfolio application. These types ensure type safety and provide better
 * development experience with IntelliSense and compile-time error checking.
 * 
 * @fileoverview Central type definitions for portfolio data structures
 */

/**
 * Project Interface
 * 
 * Defines the structure for project showcase items with comprehensive details
 * including technical implementation, business impact, and visual assets.
 * 
 * @interface Project
 */
export interface Project {
  /** Unique identifier for the project */
  id: string;
  
  /** Project title/name */
  title: string;
  
  /** Role played in the project (e.g., "Lead Frontend Developer") */
  role: string;
  
  /** Array of technologies used in the project */
  techStack: string[];
  
  /** Description of the problem the project solved */
  problem: string;
  
  /** Detailed solution approach and implementation */
  solution: string;
  
  /** Measurable outcomes and business impact */
  outcome: string;
  
  /** Optional performance metrics with labels and values */
  metrics?: {
    label: string;
    value: string;
  }[];
  
  /** Optional live demo URL */
  demoLink?: string;
  
  /** Optional source code repository URL */
  repoLink?: string;
  
  /** Array of project screenshot/image URLs */
  images: string[];
  
  /** Whether this project should be featured prominently */
  featured: boolean;
  
  /** Project category for filtering and organization */
  category: 'web' | 'mobile' | 'design' | 'tool';
}

/**
 * Professional Experience Interface
 * 
 * Represents work experience entries with company details,
 * role information, and technical responsibilities.
 * 
 * @interface Experience
 */
export interface Experience {
  /** Unique identifier for the experience entry */
  id: string;
  
  /** Company/organization name */
  company: string;
  
  /** Job title/role */
  role: string;
  
  /** Start date (ISO string format) */
  startDate: string;
  
  /** End date (ISO string format) or null for current position */
  endDate: string | null;
  
  /** Array of key responsibilities and achievements */
  description: string[];
  
  /** Technologies used in this role */
  technologies: string[];
  
  /** Optional company logo URL */
  logo?: string;
}

/**
 * Technical Skill Interface
 * 
 * Represents individual technical skills with proficiency levels
 * and categorization for visualization and filtering.
 * 
 * @interface Skill
 */
export interface Skill {
  /** Skill name (e.g., "React", "TypeScript") */
  name: string;
  
  /** Proficiency level from 0-100 */
  proficiency: number;
  
  /** Skill category for organization and filtering */
  category: 'frontend' | 'backend' | 'design' | 'tool';
  
  /** Optional emoji or icon representation */
  icon?: string;
}

/**
 * Blog Post Interface
 * 
 * Structure for blog articles and technical writing content.
 * 
 * @interface BlogPost
 */
export interface BlogPost {
  /** Unique identifier for the blog post */
  id: string;
  
  /** Article title */
  title: string;
  
  /** Brief excerpt/summary */
  excerpt: string;
  
  /** Full article content (Markdown or HTML) */
  content: string;
  
  /** Publication date (ISO string format) */
  publishedAt: string;
  
  /** Estimated reading time in minutes */
  readTime: number;
  
  /** Array of topic tags */
  tags: string[];
  
  /** URL-friendly slug for routing */
  slug: string;
}

/**
 * Client Testimonial Interface
 * 
 * Structure for client reviews and recommendations.
 * 
 * @interface Testimonial
 */
export interface Testimonial {
  /** Unique identifier for the testimonial */
  id: string;
  
  /** Client/reviewer name */
  name: string;
  
  /** Client's role/position */
  role: string;
  
  /** Client's company/organization */
  company: string;
  
  /** Testimonial content/review text */
  content: string;
  
  /** Optional client avatar/photo URL */
  avatar?: string;
  
  /** Rating score (typically 1-5) */
  rating: number;
}

/**
 * Contact Form Interface
 * 
 * Structure for contact form submissions with validation requirements.
 * 
 * @interface ContactForm
 */
export interface ContactForm {
  /** Sender's full name */
  name: string;
  
  /** Sender's email address */
  email: string;
  
  /** Message content */
  message: string;
}

/**
 * SEO Metadata Interface
 * 
 * Structure for page-level SEO and social media metadata.
 * 
 * @interface SeoMeta
 */
export interface SeoMeta {
  /** Page title for <title> tag */
  title: string;
  
  /** Meta description for search engines */
  description: string;
  
  /** Array of relevant keywords */
  keywords: string[];
  
  /** Optional Open Graph image URL */
  ogImage?: string;
  
  /** Optional canonical URL */
  canonical?: string;
}

/**
 * Site Configuration Interface
 * 
 * Structure for global site settings and contact information.
 * 
 * @interface SiteConfig
 */
export interface SiteConfig {
  /** Site metadata */
  name: string;
  description: string;
  url: string;
  
  /** Contact and social links */
  links: {
    /** Email address for contact */
    email: string;
    
    /** Phone number with country code */
    phone: string;
    
    /** GitHub profile URL */
    github: string;
    
    /** LinkedIn profile URL */
    linkedin: string;
  };
}
