export interface Project {
  id: string;
  title: string;
  role: string;
  techStack: string[];
  problem: string;
  solution: string;
  outcome: string;
  metrics?: {
    label: string;
    value: string;
  }[];
  demoLink?: string;
  repoLink?: string;
  images: string[];
  featured: boolean;
  category: 'web' | 'mobile' | 'design' | 'tool';
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string | null;
  description: string[];
  technologies: string[];
  logo?: string;
}

export interface Skill {
  name: string;
  proficiency: number;
  category: 'frontend' | 'backend' | 'design' | 'tool';
  icon?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  publishedAt: string;
  readTime: number;
  tags: string[];
  slug: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar?: string;
  rating: number;
}

export interface ContactForm {
  name: string;
  email: string;
  message: string;
}

export interface SeoMeta {
  title: string;
  description: string;
  keywords: string[];
  ogImage?: string;
  canonical?: string;
}
