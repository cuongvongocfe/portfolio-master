'use client';

import { motion } from 'framer-motion';
import { projects } from '@/data';
import ProjectCard from '@/components/ui/ProjectCard';

export default function ProjectsSection() {
  const featuredProjects = projects.filter(project => project.featured);

  return (
    <section id="projects" className="py-20 lg:py-32 bg-neutral-50 dark:bg-neutral-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-sm font-medium mb-4"
          >
            <span className="w-2 h-2 bg-primary-500 rounded-full animate-pulse"></span>
            Featured Projects
          </motion.div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-neutral-900 dark:text-neutral-100 mb-6">
            Some of my{' '}
            <span className="bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
              most proud work
            </span>
          </h2>
          
          <p className="max-w-3xl mx-auto text-xl text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Here are some projects that showcase my skills in frontend development, 
            from e-commerce platforms to mobile applications and design systems.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="space-y-24 lg:space-y-32">
          {featuredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* View All Projects CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-neutral-600 dark:text-neutral-400 mb-6">
            Want to see more of my work?
          </p>
          <a
            href="/projects"
            className="inline-flex items-center gap-2 px-8 py-4 border-2 border-primary-500 text-primary-600 dark:text-primary-400 font-semibold rounded-xl hover:bg-primary-500 hover:text-white transition-all duration-300 group"
          >
            View All Projects
            <motion.span
              className="group-hover:translate-x-1 transition-transform"
              initial={false}
            >
              →
            </motion.span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
