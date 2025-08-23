'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Project } from '@/types';
import { EyeIcon, CodeBracketIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className={`grid lg:grid-cols-2 gap-8 lg:gap-12 items-center ${
        isEven ? '' : 'lg:grid-flow-col-dense'
      }`}
    >
      {/* Project Images */}
      <motion.div
        className={`relative ${isEven ? '' : 'lg:col-start-2'}`}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        <div className="relative aspect-video rounded-xl overflow-hidden bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-900 shadow-2xl">
          <Image
            src={project.images[0]}
            alt={`${project.title} preview`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
            <div className="absolute bottom-4 left-4 right-4">
              <div className="flex gap-3">
                {project.demoLink && (
                  <a
                    href={project.demoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-lg hover:bg-white/30 transition-colors"
                  >
                    <EyeIcon className="w-4 h-4" />
                    Live Demo
                  </a>
                )}
                {project.repoLink && (
                  <a
                    href={project.repoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-lg hover:bg-white/30 transition-colors"
                  >
                    <CodeBracketIcon className="w-4 h-4" />
                    Code
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Floating Tech Stack */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="absolute -bottom-4 -right-4 bg-white dark:bg-neutral-800 rounded-lg shadow-lg p-4 max-w-xs"
        >
          <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400 mb-2">
            Tech Stack
          </p>
          <div className="flex flex-wrap gap-2">
            {project.techStack.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="px-2 py-1 text-xs font-medium bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-md"
              >
                {tech}
              </span>
            ))}
            {project.techStack.length > 4 && (
              <span className="px-2 py-1 text-xs font-medium bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-400 rounded-md">
                +{project.techStack.length - 4}
              </span>
            )}
          </div>
        </motion.div>
      </motion.div>

      {/* Project Content */}
      <motion.div
        className={`space-y-6 ${isEven ? '' : 'lg:col-start-1'}`}
        initial={{ opacity: 0, x: isEven ? -30 : 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
      >
        {/* Project Category */}
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-sm font-medium">
          <span className="w-2 h-2 bg-primary-500 rounded-full"></span>
          {project.category.toUpperCase()}
        </div>

        {/* Project Title & Role */}
        <div>
          <h3 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
            {project.title}
          </h3>
          <p className="text-lg font-medium text-primary-600 dark:text-primary-400">
            {project.role}
          </p>
        </div>

        {/* Problem, Solution, Outcome */}
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-neutral-800 dark:text-neutral-200 mb-2">
              🎯 Problem
            </h4>
            <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
              {project.problem}
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-neutral-800 dark:text-neutral-200 mb-2">
              💡 Solution
            </h4>
            <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
              {project.solution}
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-neutral-800 dark:text-neutral-200 mb-2">
              🚀 Outcome
            </h4>
            <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
              {project.outcome}
            </p>
          </div>
        </div>

        {/* Metrics */}
        {project.metrics && project.metrics.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {project.metrics.map((metric, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + idx * 0.1 }}
                className="text-center p-4 bg-neutral-50 dark:bg-neutral-800/50 rounded-lg"
              >
                <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                  {metric.value}
                </div>
                <div className="text-sm text-neutral-600 dark:text-neutral-400">
                  {metric.label}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-4 pt-4">
          {project.demoLink && (
            <a
              href={project.demoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition-colors group"
            >
              View Live Demo
              <ArrowTopRightOnSquareIcon className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          )}
          {project.repoLink && (
            <a
              href={project.repoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-neutral-300 dark:border-neutral-600 text-neutral-700 dark:text-neutral-300 font-semibold rounded-lg hover:border-primary-500 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              <CodeBracketIcon className="w-4 h-4" />
              View Code
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
