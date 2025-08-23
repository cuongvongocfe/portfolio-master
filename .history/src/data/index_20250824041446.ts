export const timeline = [
  {
    year: 'Late 2021',
    title: 'Started Coding Journey',
    description: [
      'Self-taught basic HTML, CSS, and JavaScript.',
      'Built my first websites and discovered a passion for frontend development.'
    ]
  },
  {
    year: '2022',
    title: 'React & First Projects',
    description: [
      'Learned React and TypeScript.',
      'Built my first portfolio and several personal projects to practice my skills.'
    ]
  },
  {
    year: '2023',
    title: 'Professional Experience',
    description: [
      'Started working with real clients.',
      'Used Next.js, Tailwind CSS, and modern development tools.'
    ]
  },
  {
    year: '2024',
    title: 'Skill Enhancement',
    description: [
      'Advanced TypeScript skills, performance optimization, and best practices in the React ecosystem.'
    ]
  }
];
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
  title: 'Võ Ngọc Cường - Frontend Developer & Digital Craftsman',
  description: "Hello! I'm Vo Ngoc Cuong, a Frontend Developer passionate about building modern web applications with over 2+ years of experience. My expertise focuses on React, Next.js, TypeScript, and advanced frontend technologies.\n\nI believe that good code should not only work but also be readable, maintainable, and scalable. Throughout my development journey, I've had the opportunity to work on a variety of projects, from personal websites to complex business web applications. This has helped me develop strong problem-solving skills and the ability to work efficiently in teams.\n\nWhen I'm not coding, I enjoy exploring new technologies, reading about UX/UI design, and sharing knowledge through my personal blog.",
  url: 'https://YOUR_DOMAIN.com',
  ogImage: '/og-image.jpg',
  links: {
    linkedin: "https://www.linkedin.com/in/cuong-vo-ngoc-b6b742226/",
    github: "https://github.com/cuongvongocfe",
    cv: "/pdf/Vo-Ngoc-Cuong-TopCV.vn-230825.24842.pdf",
  email: "gtsvongoccuong@gmail.com",
    phone: "+84 833.1414.99",
    twitter: "https://twitter.com/YOUR_TWITTER"
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
    company: 'TRAN THANH LONG',
    role: 'Marketing Leader',
    startDate: '2023-08',
    endDate: '2023-10',
    description: [
      'Designed branding and promotional materials.',
      'Created marketing content and visual designs.',
      'Captured product photography for promotional use.'
    ],
    technologies: ['Office', 'Adobe', 'Figma'],
    logo: '/logos/fpt.png'
  },
  {
    id: '2',
    company: 'Baolongscrap',
    role: 'Front-end Developer',
    startDate: '2023-11',
    endDate: null,
    description: [
      'Executed front-end development tasks.',
      'Translated UI/UX designs into responsive interfaces.',
      'Collaborated on internal tools and business web platforms.'
    ],
    technologies: ['React', 'Next.js', 'Tailwind CSS', 'JavaScript', 'HTML', 'CSS'],
    logo: '/logos/topcv.png'
  },
  
  {
    id: '4',
    company: 'Freelance Projects',
    role: 'Full-Stack Developer',
    startDate: '2018-06',
    endDate: '2019-12',
    description: [
      'Took on freelance projects from individual clients and small businesses.',
      'Developed online sales websites with WooCommerce and custom features.',
      'Created landing pages and portfolio websites for freelancers and creative agencies.',
      'Learned and applied modern web technologies to enhance skills.',
      'Managed projects end-to-end: requirements, development, testing, deployment.'
    ],
    technologies: ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL', 'WordPress', 'Photoshop'],
    logo: '/logos/freelance.png'
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
    {
      year: 'Late 2021',
      title: 'Started Coding Journey',
      description: [
        'Self-taught basic HTML, CSS, and JavaScript. Built my first websites and discovered a passion for frontend development.'
      ]
    },
    {
      year: '2022',
      title: 'React & First Projects',
      description: [
        'Learned React and TypeScript. Built my first portfolio and several personal projects to practice my skills.'
      ]
    },
    {
      year: '2023',
      title: 'Professional Experience',
      description: [
        'Started working with real clients. Used Next.js, Tailwind CSS, and modern development tools.'
      ]
    },
    {
      year: '2024',
      title: 'Skill Enhancement',
      description: [
        'Advanced TypeScript skills, performance optimization, and best practices in the React ecosystem.'
      ]
    }
