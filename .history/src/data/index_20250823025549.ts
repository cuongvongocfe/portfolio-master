/**
 * Site Configuration and Data Store
 * 
 * This file contains all static data for the portfolio including:
 * - Site configuration and metadata
 * - Skills and technical proficiencies
 * - Project showcases with detailed information
 * - Professional experience timeline
 * - Blog posts and testimonials
 * 
 * @fileoverview Central data store for portfolio content
 */

import { Project, Experience, Skill, BlogPost, Testimonial, SiteConfig } from '@/types';

/**
 * Site Configuration Object
 * 
 * Contains global site settings, metadata, and social links.
 * Used throughout the application for consistent branding and SEO.
 */
export const siteConfig: SiteConfig = {
  name: 'Võ Ngọc Cường',
  title: 'Võ Ngọc Cường - Senior Frontend Developer & Digital Craftsman',
  description: 'Senior Frontend Developer với 5+ năm kinh nghiệm tạo ra những trải nghiệm web hiện đại và tối ưu. Chuyên về React, Next.js, TypeScript.',
  url: 'https://YOUR_DOMAIN.com',
  ogImage: '/og-image.jpg',
  links: {
    github: 'https://github.com/YOUR_GITHUB',
    linkedin: 'https://linkedin.com/in/YOUR_LINKEDIN',
    twitter: 'https://twitter.com/YOUR_TWITTER',
    email: 'gtsvongoccuong@gmail.com',
    phone: '+84 833.1414.99',
    cv: '/documents/CV_Vo_Ngoc_Cuong.pdf'
  }
};

/**
 * Technical Skills Array
 * 
 * Comprehensive list of technical skills with proficiency levels and categorization.
 * Used for skills visualization and filtering throughout the portfolio.
 * 
 * Categories:
 * - frontend: React, Next.js, TypeScript, CSS frameworks
 * - backend: Server-side technologies and databases
 * - design: UI/UX tools and design systems
 * - tool: Development tools and version control
 */
export const skills: Skill[] = [
  // Frontend Technologies
  { name: 'React', proficiency: 95, category: 'frontend', icon: '⚛️' },
  { name: 'Next.js', proficiency: 90, category: 'frontend', icon: '▲' },
  { name: 'TypeScript', proficiency: 88, category: 'frontend', icon: '📘' },
  { name: 'JavaScript', proficiency: 92, category: 'frontend', icon: '🟨' },
  { name: 'Tailwind CSS', proficiency: 85, category: 'frontend', icon: '🎨' },
  { name: 'CSS/SCSS', proficiency: 88, category: 'frontend', icon: '🎨' },
  { name: 'Three.js', proficiency: 75, category: 'frontend', icon: '🎮' },
  { name: 'Framer Motion', proficiency: 80, category: 'frontend', icon: '✨' },
  
  // Backend Technologies
  { name: 'Node.js', proficiency: 70, category: 'backend', icon: '🟢' },
  { name: 'MongoDB', proficiency: 65, category: 'backend', icon: '🍃' },
  
  // Design Tools
  { name: 'Figma', proficiency: 85, category: 'design', icon: '🎨' },
  
  // Development Tools
  { name: 'Git', proficiency: 90, category: 'tool', icon: '📚' },
];

/**
 * Project Portfolio Array
 * 
 * Detailed showcase of professional projects with comprehensive information including:
 * - Technical implementation details
 * - Problem-solution approach
 * - Measurable outcomes and metrics
 * - Live demos and source code links
 * - Visual assets and screenshots
 */
export const projects: Project[] = [
  {
    id: '1',
    title: 'E-Commerce Platform',
    role: 'Lead Frontend Developer',
    techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Stripe', 'Sanity CMS'],
    problem: 'Client needed a modern, fast e-commerce platform with real-time inventory management and seamless checkout experience.',
    solution: 'Built a full-stack Next.js application with server-side rendering, optimistic UI updates, and integrated payment processing.',
    outcome: 'Increased conversion rate by 35% and reduced page load times by 60%. Platform now handles 10k+ daily transactions.',
    metrics: [
      { label: 'Conversion Rate', value: '+35%' },
      { label: 'Page Load Time', value: '-60%' },
      { label: 'Daily Transactions', value: '10k+' }
    ],
    demoLink: 'https://demo-ecommerce.example.com',
    repoLink: 'https://github.com/YOUR_GITHUB/ecommerce-platform',
    images: ['/projects/ecommerce-1.jpg', '/projects/ecommerce-2.jpg', '/projects/ecommerce-3.jpg'],
    featured: true,
    category: 'web'
  },
  {
    id: '2',
    title: 'Task Management Dashboard',
    role: 'Frontend Developer',
    techStack: ['React', 'TypeScript', 'Material-UI', 'Redux Toolkit', 'Socket.io'],
    problem: 'Team productivity was low due to scattered task management across multiple tools and lack of real-time collaboration.',
    solution: 'Created a unified dashboard with real-time updates, drag-and-drop functionality, and integrated team communication.',
    outcome: 'Improved team productivity by 45% and reduced time spent on task coordination by 3 hours per week per team member.',
    metrics: [
      { label: 'Team Productivity', value: '+45%' },
      { label: 'Time Saved', value: '3h/week/person' },
      { label: 'User Satisfaction', value: '4.8/5' }
    ],
    demoLink: 'https://task-dashboard.example.com',
    repoLink: 'https://github.com/YOUR_GITHUB/task-dashboard',
    images: ['/projects/dashboard-1.jpg', '/projects/dashboard-2.jpg', '/projects/dashboard-3.jpg'],
    featured: true,
    category: 'web'
  },
  {
    id: '3',
    title: 'Real Estate Mobile App',
    role: 'React Native Developer',
    techStack: ['React Native', 'TypeScript', 'Expo', 'Firebase', 'Google Maps API'],
    problem: 'Real estate agents needed a mobile solution to manage properties and client interactions on the go.',
    solution: 'Developed a cross-platform mobile app with offline capabilities, map integration, and CRM features.',
    outcome: 'App adopted by 500+ real estate agents, increased property listing efficiency by 50%.',
    metrics: [
      { label: 'Active Users', value: '500+' },
      { label: 'Listing Efficiency', value: '+50%' },
      { label: 'App Store Rating', value: '4.7/5' }
    ],
    demoLink: 'https://apps.apple.com/app/realestate-pro',
    images: ['/projects/mobile-1.jpg', '/projects/mobile-2.jpg', '/projects/mobile-3.jpg'],
    featured: true,
    category: 'mobile'
  },
  {
    id: '4',
    title: 'Portfolio Website',
    role: 'Full-Stack Developer',
    techStack: ['Next.js', 'Three.js', 'Framer Motion', 'Tailwind CSS', 'Vercel'],
    problem: 'Personal branding needed a unique, interactive portfolio to stand out in competitive market.',
    solution: 'Created an immersive 3D portfolio with smooth animations and optimized performance.',
    outcome: 'Portfolio received 50k+ views, led to 15+ job interview invitations and multiple freelance opportunities.',
    metrics: [
      { label: 'Page Views', value: '50k+' },
      { label: 'Interview Invitations', value: '15+' },
      { label: 'Performance Score', value: '98/100' }
    ],
    demoLink: 'https://portfolio.example.com',
    repoLink: 'https://github.com/YOUR_GITHUB/portfolio',
    images: ['/projects/portfolio-1.jpg', '/projects/portfolio-2.jpg', '/projects/portfolio-3.jpg'],
    featured: false,
    category: 'web'
  },
  {
    id: '5',
    title: 'Design System Library',
    role: 'Frontend Architect',
    techStack: ['React', 'TypeScript', 'Storybook', 'Styled Components', 'Rollup'],
    problem: 'Company needed consistent UI components across multiple products and teams.',
    solution: 'Built a comprehensive design system with reusable components, documentation, and automated testing.',
    outcome: 'Reduced development time by 40%, improved design consistency across 8 products.',
    metrics: [
      { label: 'Development Time', value: '-40%' },
      { label: 'Products Using System', value: '8' },
      { label: 'Component Coverage', value: '95%' }
    ],
    repoLink: 'https://github.com/YOUR_GITHUB/design-system',
    images: ['/projects/design-system-1.jpg', '/projects/design-system-2.jpg', '/projects/design-system-3.jpg'],
    featured: false,
    category: 'design'
  },
  {
    id: '6',
    title: 'AI-Powered Analytics Tool',
    role: 'Frontend Lead',
    techStack: ['Vue.js', 'D3.js', 'TypeScript', 'Python API', 'Docker'],
    problem: 'Marketing teams struggled to interpret complex data and generate actionable insights.',
    solution: 'Created an intuitive dashboard with AI-powered recommendations and interactive data visualizations.',
    outcome: 'Increased data-driven decision making by 60%, reduced time to insights from days to minutes.',
    metrics: [
      { label: 'Decision Making', value: '+60%' },
      { label: 'Time to Insights', value: 'Days → Minutes' },
      { label: 'User Adoption', value: '90%' }
    ],
    demoLink: 'https://analytics-tool.example.com',
    images: ['/projects/analytics-1.jpg', '/projects/analytics-2.jpg', '/projects/analytics-3.jpg'],
    featured: false,
    category: 'tool'
  }
];

export const experience: Experience[] = [
  {
    id: '1',
    company: 'TECH_COMPANY_NAME',
    role: 'Senior Frontend Developer',
    startDate: '2022-01',
    endDate: null,
    description: [
      'Lead development of customer-facing web applications serving 100k+ daily active users',
      'Architected and implemented micro-frontend solutions reducing bundle size by 40%',
      'Mentored 3 junior developers and established best practices for code quality',
      'Collaborated with design team to create pixel-perfect, accessible user interfaces'
    ],
    technologies: ['React', 'Next.js', 'TypeScript', 'GraphQL', 'AWS'],
    logo: '/logos/company-1.png'
  },
  {
    id: '2',
    company: 'STARTUP_COMPANY_NAME',
    role: 'Frontend Developer',
    startDate: '2020-06',
    endDate: '2021-12',
    description: [
      'Built MVP from scratch using React and Node.js, helping secure $2M Series A funding',
      'Implemented responsive design system supporting web and mobile platforms',
      'Optimized application performance resulting in 50% faster load times',
      'Integrated third-party APIs including payment processing and analytics'
    ],
    technologies: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Heroku'],
    logo: '/logos/company-2.png'
  },
  {
    id: '3',
    company: 'AGENCY_COMPANY_NAME',
    role: 'Junior Frontend Developer',
    startDate: '2019-03',
    endDate: '2020-05',
    description: [
      'Developed custom WordPress themes and plugins for 20+ client websites',
      'Created interactive animations and transitions using CSS and JavaScript',
      'Worked closely with designers to implement pixel-perfect designs',
      'Maintained and updated existing client websites with new features'
    ],
    technologies: ['HTML', 'CSS', 'JavaScript', 'WordPress', 'PHP'],
    logo: '/logos/company-3.png'
  }
];

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Building Performant React Applications in 2024',
    excerpt: 'Learn the latest techniques for optimizing React apps, from code splitting to server-side rendering. Discover how to achieve 90+ Lighthouse scores consistently.',
    content: 'Full blog content here...',
    publishedAt: '2024-01-15',
    readTime: 8,
    tags: ['React', 'Performance', 'Optimization'],
    slug: 'building-performant-react-applications-2024'
  },
  {
    id: '2',
    title: 'The Future of Frontend Development: Trends to Watch',
    excerpt: 'Explore emerging trends in frontend development including AI-assisted coding, edge computing, and the evolution of JavaScript frameworks.',
    content: 'Full blog content here...',
    publishedAt: '2024-01-08',
    readTime: 6,
    tags: ['Frontend', 'Trends', 'JavaScript'],
    slug: 'future-of-frontend-development-trends'
  },
  {
    id: '3',
    title: 'Mastering TypeScript: Advanced Patterns and Techniques',
    excerpt: 'Deep dive into advanced TypeScript patterns that will make your code more robust and maintainable. Learn about utility types, conditional types, and more.',
    content: 'Full blog content here...',
    publishedAt: '2024-01-01',
    readTime: 12,
    tags: ['TypeScript', 'Advanced', 'Patterns'],
    slug: 'mastering-typescript-advanced-patterns'
  }
];

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    role: 'Product Manager',
    company: 'TechCorp',
    content: 'Cường delivered exceptional work on our e-commerce platform. His attention to detail and technical expertise helped us increase our conversion rate by 35%. Highly recommended!',
    avatar: '/testimonials/sarah.jpg',
    rating: 5
  },
  {
    id: '2',
    name: 'Mike Chen',
    role: 'CTO',
    company: 'StartupXYZ',
    content: 'Working with Cường was a game-changer for our team. He not only delivered high-quality code but also mentored our junior developers. His React expertise is outstanding.',
    avatar: '/testimonials/mike.jpg',
    rating: 5
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    role: 'Design Director',
    company: 'Creative Studio',
    content: 'Cường has an excellent eye for design implementation. He brought our Figma designs to life with pixel-perfect precision and added thoughtful micro-interactions.',
    avatar: '/testimonials/emily.jpg',
    rating: 5
  }
];
