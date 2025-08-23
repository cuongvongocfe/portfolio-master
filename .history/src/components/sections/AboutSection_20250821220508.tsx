'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

export default function AboutSection() {
  const [showFullBio, setShowFullBio] = useState(false);

  const shortBio = "Frontend Developer with 5+ years of experience specializing in the React ecosystem. I'm passionate about creating intuitive user interfaces and high-performance applications, always staying current with the latest technology trends.";
  
  const fullBio = "Hello! I'm Võ Ngọc Cường, a passionate Frontend Developer with over 5 years of experience building modern web applications. My expertise focuses on React, Next.js, TypeScript, and cutting-edge frontend technologies.\n\nI believe that good code doesn't just work—it should be readable, maintainable, and scalable. Throughout my career, I've had the opportunity to work on diverse projects, from startups to large enterprises, which has helped me develop strong problem-solving skills and effective teamwork abilities.\n\nWhen I'm not coding, I enjoy exploring new technologies, reading about UX/UI design, and sharing knowledge through my personal blog.";

  const timeline = [
    {
      year: '2019',
      title: 'Started Frontend Journey',
      description: 'Began learning HTML, CSS, and JavaScript. Built my first portfolio website.'
    },
    {
      year: '2020',
      title: 'First Professional Role',
      description: 'Joined a local agency as Junior Frontend Developer, worked on WordPress sites.'
    },
    {
      year: '2021',
      title: 'Startup Experience',
      description: 'Moved to a startup, learned React and modern development practices.'
    },
    {
      year: '2022',
      title: 'Senior Developer',
      description: 'Promoted to Senior Frontend Developer, started mentoring junior developers.'
    },
    {
      year: '2024',
      title: 'Full-Stack Skills',
      description: 'Expanded to full-stack development with Node.js and database technologies.'
    }
  ];

  return (
    <section id="about" className="py-20 lg:py-32 bg-white dark:bg-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left Column - Bio */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-sm font-medium mb-6"
              >
                <span className="w-2 h-2 bg-primary-500 rounded-full"></span>
                About Me
              </motion.div>
              
              <h2 className="text-4xl lg:text-5xl font-bold text-neutral-900 dark:text-neutral-100 mb-6">
                Passionate about{' '}
                <span className="bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
                  crafting experiences
                </span>
              </h2>
            </div>

            <div className="prose prose-lg prose-neutral dark:prose-invert max-w-none">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-neutral-600 dark:text-neutral-400 leading-relaxed"
              >
                {showFullBio 
                  ? fullBio.split('\n').map((paragraph, index) => (
                      <span key={index}>
                        {paragraph}
                        {index < fullBio.split('\n').length - 1 && <><br /><br /></>}
                      </span>
                    ))
                  : shortBio
                }
              </motion.p>
              
              <motion.button
                onClick={() => setShowFullBio(!showFullBio)}
                className="mt-4 text-primary-600 dark:text-primary-400 font-medium hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {showFullBio ? 'Read Less' : 'Read More'} →
              </motion.button>
            </div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-3 gap-8 pt-8 border-t border-neutral-200 dark:border-neutral-700"
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">5+</div>
                <div className="text-sm text-neutral-600 dark:text-neutral-400">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">50+</div>
                <div className="text-sm text-neutral-600 dark:text-neutral-400">Projects Completed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">15+</div>
                <div className="text-sm text-neutral-600 dark:text-neutral-400">Happy Clients</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Timeline */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h3 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-8">
              My Journey
            </h3>
            
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-500 to-purple-500"></div>
              
              {timeline.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative flex gap-6 pb-8 last:pb-0"
                >
                  {/* Timeline Dot */}
                  <div className="relative">
                    <div className="w-12 h-12 bg-white dark:bg-neutral-800 border-4 border-primary-500 rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-xs font-bold text-primary-600 dark:text-primary-400">
                        {item.year.slice(-2)}
                      </span>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 pt-1">
                    <div className="bg-neutral-50 dark:bg-neutral-800/50 rounded-lg p-6 shadow-sm">
                      <div className="text-sm font-medium text-primary-600 dark:text-primary-400 mb-1">
                        {item.year}
                      </div>
                      <h4 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                        {item.title}
                      </h4>
                      <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
