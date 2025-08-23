/**
 * About Section Component
 * 
 * Personal information section featuring biography, career timeline, and professional journey.
 * Key features include:
 * - Expandable biography with show more/less toggle
 * - Animated timeline showcasing career progression
 * - Professional avatar with hover effects
 * - Responsive two-column layout (stacked on mobile)
 * - Dark/light theme support with smooth animations
 * - Interactive elements with motion effects
 * 
 * @component
 * @returns {JSX.Element} Complete about section with bio and timeline
 */

'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

/**
 * Main About Section Component
 * 
 * Displays personal biography and career timeline in an engaging format.
 * Features expandable content and animated timeline with career milestones.
 * 
 * @returns {JSX.Element} About section with biography and career timeline
 */
export default function AboutSection() {
  // State for controlling biography expansion
  const [showFullBio, setShowFullBio] = useState(false);

  // Short version of biography for initial display
  const shortBio = "Frontend Developer với 2+ năm kinh nghiệm chuyên về React ecosystem. Tôi đam mê tạo ra những giao diện người dùng trực quan và ứng dụng hiệu suất cao, luôn cập nhật xu hướng công nghệ mới nhất.";
  
  // Full biography text displayed when expanded
  const fullBio = "Xin chào! Tôi là Võ Ngọc Cường, một Frontend Developer đam mê với hơn 2+ năm kinh nghiệm xây dựng các ứng dụng web hiện đại. Chuyên môn của tôi tập trung vào React, Next.js, TypeScript và các công nghệ frontend tiên tiến.\n\nTôi tin rằng code tốt không chỉ hoạt động được mà còn phải dễ đọc, dễ bảo trì và có thể mở rộng. Trong suốt quá trình phát triển, tôi đã có cơ hội làm việc trên nhiều dự án đa dạng, từ website cá nhân đến các ứng dụng web phức tạp, điều này giúp tôi phát triển kỹ năng giải quyết vấn đề mạnh mẽ và khả năng làm việc nhóm hiệu quả.\n\nKhi không code, tôi thích khám phá các công nghệ mới, đọc về UX/UI design, và chia sẻ kiến thức thông qua blog cá nhân.";

  /**
   * Career Timeline Data
   * 
   * Array of career milestones with chronological progression.
   * Each entry contains year, title, and description of achievements.
   */
  const timeline = [
    {
      year: 'Late 2021',
      title: 'Started Coding Journey',
      description: 'Tự học HTML, CSS, JavaScript cơ bản. Tạo các website đầu tiên và phát hiện đam mê với frontend development.'
    },
    {
      year: '2022',
      title: 'React & First Projects',
      description: 'Học React, TypeScript. Xây dựng portfolio đầu tiên và một số dự án cá nhân để thực hành kỹ năng.'
    },
    {
      year: '2023',
      title: 'Professional Experience',
      description: 'Bắt đầu làm việc với khách hàng thực tế. Sử dụng Next.js, Tailwind CSS, và các công cụ development hiện đại.'
    },
    {
      year: '2024',
      title: 'Skill Enhancement',
      description: 'Nâng cao kỹ năng với TypeScript nâng cao, performance optimization, và best practices trong React ecosystem.'
    }
  ];

  return (
    <section id="about" className="py-20 lg:py-32 bg-white dark:bg-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left Column - Personal Biography */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Section Header */}
            <div>
              {/* Animated Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-sm font-medium mb-6"
              >
                <span className="w-2 h-2 bg-primary-500 rounded-full"></span>
                About Me
              </motion.div>
              
              {/* Main Section Title */}
              <h2 className="text-4xl lg:text-5xl font-bold text-neutral-900 dark:text-neutral-100 mb-6">
                Passionate about{' '}
                <span className="bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
                  crafting experiences
                </span>
              </h2>
            </div>

            {/* Biography Content with Expand/Collapse */}
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
              
              {/* Toggle Button for Biography */}
              <motion.button
                onClick={() => setShowFullBio(!showFullBio)}
                className="mt-4 text-primary-600 dark:text-primary-400 font-medium hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {showFullBio ? 'Read Less' : 'Read More'} →
              </motion.button>
            </div>

            {/* Professional Statistics */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-3 gap-8 pt-8 border-t border-neutral-200 dark:border-neutral-700"
            >
              {/* Years of Experience */}
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">2+</div>
                <div className="text-sm text-neutral-600 dark:text-neutral-400">Years Experience</div>
              </div>
              
              {/* Projects Completed */}
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">20+</div>
                <div className="text-sm text-neutral-600 dark:text-neutral-400">Projects Completed</div>
              </div>
              
              {/* Client Satisfaction */}
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">10+</div>
                <div className="text-sm text-neutral-600 dark:text-neutral-400">Happy Clients</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Career Timeline */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Timeline Section Header */}
            <h3 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-8">
              My Journey
            </h3>
            
            {/* Timeline Container */}
            <div className="relative">
              {/* Vertical Timeline Line */}
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-500 to-purple-500"></div>
              
              {/* Timeline Items */}
              {timeline.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative flex gap-6 pb-8 last:pb-0"
                >
                  {/* Timeline Dot/Node */}
                  <div className="relative">
                    <div className="w-12 h-12 bg-white dark:bg-neutral-800 border-4 border-primary-500 rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-xs font-bold text-primary-600 dark:text-primary-400">
                        {item.year.slice(-2)}
                      </span>
                    </div>
                  </div>
                  
                  {/* Timeline Content Card */}
                  <div className="flex-1 pt-1">
                    <div className="bg-neutral-50 dark:bg-neutral-800/50 rounded-lg p-6 shadow-sm">
                      {/* Year Badge */}
                      <div className="text-sm font-medium text-primary-600 dark:text-primary-400 mb-1">
                        {item.year}
                      </div>
                      
                      {/* Milestone Title */}
                      <h4 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                        {item.title}
                      </h4>
                      
                      {/* Milestone Description */}
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
