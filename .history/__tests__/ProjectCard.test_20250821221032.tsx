import { render, screen } from '@testing-library/react';
import { Project } from '@/types';
import ProjectCard from '@/components/ui/ProjectCard';

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    a: ({ children, ...props }: any) => <a {...props}>{children}</a>,
    button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
  },
}));

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, ...props }: any) => <img src={src} alt={alt} {...props} />,
}));

const mockProject: Project = {
  id: '1',
  title: 'Test E-Commerce Platform',
  role: 'Lead Frontend Developer',
  techStack: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
  problem: 'Client needed a modern e-commerce platform.',
  solution: 'Built a full-stack Next.js application.',
  outcome: 'Increased conversion rate by 35%.',
  metrics: [
    { label: 'Conversion Rate', value: '+35%' },
    { label: 'Page Load Time', value: '-60%' },
  ],
  demoLink: 'https://demo.example.com',
  repoLink: 'https://github.com/test/repo',
  images: ['/test-image-1.jpg', '/test-image-2.jpg'],
  featured: true,
  category: 'web',
};

describe('ProjectCard', () => {
  it('renders project title and role', () => {
    render(<ProjectCard project={mockProject} index={0} />);
    
    expect(screen.getByText('Test E-Commerce Platform')).toBeInTheDocument();
    expect(screen.getByText('Lead Frontend Developer')).toBeInTheDocument();
  });

  it('displays tech stack', () => {
    render(<ProjectCard project={mockProject} index={0} />);
    
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('Next.js')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('Tailwind CSS')).toBeInTheDocument();
  });

  it('shows problem, solution, and outcome', () => {
    render(<ProjectCard project={mockProject} index={0} />);
    
    expect(screen.getByText('Client needed a modern e-commerce platform.')).toBeInTheDocument();
    expect(screen.getByText('Built a full-stack Next.js application.')).toBeInTheDocument();
    expect(screen.getByText('Increased conversion rate by 35%.')).toBeInTheDocument();
  });

  it('displays metrics when provided', () => {
    render(<ProjectCard project={mockProject} index={0} />);
    
    expect(screen.getByText('+35%')).toBeInTheDocument();
    expect(screen.getByText('Conversion Rate')).toBeInTheDocument();
    expect(screen.getByText('-60%')).toBeInTheDocument();
    expect(screen.getByText('Page Load Time')).toBeInTheDocument();
  });

  it('renders demo and repo links when provided', () => {
    render(<ProjectCard project={mockProject} index={0} />);
    
    const demoLinks = screen.getAllByText('Live Demo');
    const repoLinks = screen.getAllByText(/View Code|Code/);
    
    expect(demoLinks.length).toBeGreaterThan(0);
    expect(repoLinks.length).toBeGreaterThan(0);
  });

  it('displays project image with correct alt text', () => {
    render(<ProjectCard project={mockProject} index={0} />);
    
    const image = screen.getByAltText('Test E-Commerce Platform preview');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/test-image-1.jpg');
  });

  it('shows category badge', () => {
    render(<ProjectCard project={mockProject} index={0} />);
    
    expect(screen.getByText('WEB')).toBeInTheDocument();
  });

  it('handles projects without metrics', () => {
    const projectWithoutMetrics = { ...mockProject, metrics: undefined };
    render(<ProjectCard project={projectWithoutMetrics} index={0} />);
    
    // Should not crash and still render other content
    expect(screen.getByText('Test E-Commerce Platform')).toBeInTheDocument();
  });

  it('handles projects without demo or repo links', () => {
    const projectWithoutLinks = { 
      ...mockProject, 
      demoLink: undefined, 
      repoLink: undefined 
    };
    render(<ProjectCard project={projectWithoutLinks} index={0} />);
    
    // Should not crash and still render other content
    expect(screen.getByText('Test E-Commerce Platform')).toBeInTheDocument();
  });

  it('displays correct tech stack limit in floating box', () => {
    const projectWithManyTechs = {
      ...mockProject,
      techStack: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Node.js', 'MongoDB', 'GraphQL']
    };
    render(<ProjectCard project={projectWithManyTechs} index={0} />);
    
    // Should show "+3" for additional technologies beyond the first 4
    expect(screen.getByText('+3')).toBeInTheDocument();
  });
});
