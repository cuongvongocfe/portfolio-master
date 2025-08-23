'use client';

import { motion } from 'framer-motion';
import { ArrowDownIcon, DocumentArrowDownIcon } from '@heroicons/react/24/outline';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei';
import { siteConfig } from '@/data';

function AnimatedSphere() {
  return (
    <Sphere visible args={[1, 100, 200]} scale={2}>
      <MeshDistortMaterial
        color="#3b82f6"
        attach="material"
        distort={0.3}
        speed={1.5}
        roughness={0}
      />
    </Sphere>
  );
}

export default function HeroSection() {
  const scrollToProjects = () => {
    const projectsSection = document.getElementById('projects');
    projectsSection?.scrollIntoView({ behavior: 'smooth' });
  };

  const downloadCV = () => {
    // Create a download link for the CV
    const link = document.createElement('a');
    link.href = siteConfig.links.cv;
    link.download = 'CV-Vo-Ngoc-Cuong.pdf';
    link.click();
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-neutral-50 via-blue-50 to-purple-50 dark:from-neutral-900 dark:via-blue-900/20 dark:to-purple-900/20">
      {/* Background Animation */}
      <div className="absolute inset-0 z-0 opacity-30">
        <Canvas camera={{ position: [0, 0, 5] }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <AnimatedSphere />
          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={1} />
        </Canvas>
      </div>

      {/* Overlay for better text readability */}
      <div className="absolute inset-0 z-5 bg-white/20 dark:bg-black/20 backdrop-blur-[1px]"></div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-8"
        >
          {/* Greeting */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-lg font-medium text-primary-600 dark:text-primary-400"
          >
            Hi, I&apos;m Cường 👋
          </motion.p>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-bold text-neutral-900 dark:text-neutral-100 leading-tight drop-shadow-lg"
            style={{ textShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
          >
            Frontend Developer &{' '}
            <span className="bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent drop-shadow-lg">
              Digital Craftsman
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="max-w-3xl mx-auto text-xl text-neutral-700 dark:text-neutral-300 leading-relaxed drop-shadow-sm bg-white/30 dark:bg-black/30 backdrop-blur-sm rounded-2xl p-6 border border-white/20 dark:border-gray-700/30"
            style={{ textShadow: '0 1px 2px rgba(0,0,0,0.1)' }}
          >
            Passionate about crafting beautiful and performant web experiences. 
            With 5+ years of experience, I turn ideas into reality using modern technologies.
          </motion.p>

          {/* Tech Stack */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex flex-wrap justify-center gap-4 text-sm text-neutral-500 dark:text-neutral-400"
          >
            {['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Three.js'].map((tech) => (
              <span key={tech} className="px-3 py-1 bg-white/50 dark:bg-neutral-800/50 rounded-full backdrop-blur-sm">
                {tech}
              </span>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <button
              onClick={downloadCV}
              className="group relative inline-flex items-center gap-2 px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <DocumentArrowDownIcon className="w-5 h-5" />
              Download My CV
              <motion.span
                className="absolute inset-0 rounded-xl bg-white/20"
                initial={{ scale: 0, opacity: 0 }}
                whileHover={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            </button>

            <button
              onClick={scrollToProjects}
              className="group inline-flex items-center gap-2 px-8 py-4 border-2 border-neutral-300 dark:border-neutral-600 text-neutral-700 dark:text-neutral-300 font-semibold rounded-xl transition-all duration-300 hover:border-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
            >
              View My Work
              <ArrowDownIcon className="w-5 h-5 group-hover:animate-bounce" />
            </button>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-6 h-10 border-2 border-neutral-400 dark:border-neutral-600 rounded-full flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-1 h-3 bg-neutral-400 dark:bg-neutral-600 rounded-full mt-2"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
