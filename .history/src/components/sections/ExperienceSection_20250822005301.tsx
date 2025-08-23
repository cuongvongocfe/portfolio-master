'use client';

import { motion } from 'framer-motion';
import { experience } from '@/data';

export default function ExperienceSection() {
  return (
    <section id="experience" className="py-20 lg:py-32 bg-white dark:bg-neutral-900">
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
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-sm font-medium mb-6"
          >
            <span className="w-2 h-2 bg-primary-500 rounded-full"></span>
            Professional Experience
          </motion.div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-neutral-900 dark:text-neutral-100 mb-6">
            My career{' '}
            <span className="bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
              journey
            </span>
          </h2>
          
          <p className="max-w-3xl mx-auto text-xl text-neutral-600 dark:text-neutral-400 leading-relaxed">
            A timeline of my professional growth and the amazing teams I&apos;ve had the privilege to work with.
          </p>
        </motion.div>

        {/* Experience Timeline */}
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
          {/* Timeline Line */}
          <div className="absolute left-4 sm:left-8 md:left-1/2 md:transform md:-translate-x-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-500 to-purple-500"></div>
          
          {experience.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`relative flex items-start mb-12 sm:mb-16 last:mb-0 ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              {/* Timeline Dot */}
              <div className="absolute left-4 sm:left-8 md:left-1/2 md:transform md:-translate-x-1/2 w-3 h-3 sm:w-4 sm:h-4 bg-primary-500 rounded-full border-2 sm:border-4 border-white dark:border-neutral-900 z-10"></div>
              
              {/* Content Card */}
              <div className={`w-full md:w-5/12 ml-12 sm:ml-16 md:ml-0 pr-4 sm:pr-6 md:pr-0 ${
                index % 2 === 0 ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'
              }`}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-white dark:bg-neutral-800 rounded-xl p-4 sm:p-6 lg:p-8 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  {/* Company & Role */}
                  <div className="flex items-start gap-3 sm:gap-4 mb-4 sm:mb-6">
                    {exp.logo && (
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-neutral-100 dark:bg-neutral-700 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-lg sm:text-xl">🏢</span>
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-neutral-100 break-words">
                        {exp.role}
                      </h3>
                      <p className="text-primary-600 dark:text-primary-400 font-medium text-sm sm:text-base break-words">
                        {exp.company}
                      </p>
                      <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">
                        {exp.startDate} - {exp.endDate || 'Present'}
                      </p>
                    </div>
                  </div>

                  {/* Description */}
                  <ul className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                    {exp.description.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 sm:gap-3 text-sm sm:text-base text-neutral-600 dark:text-neutral-400">
                        <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></span>
                        <span className="break-words">{item}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 sm:px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-xs sm:text-sm font-medium break-keep"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
