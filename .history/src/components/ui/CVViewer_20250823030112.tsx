'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, ExternalLink, FileText, ZoomIn, ZoomOut, RotateCw, Maximize2, Minimize2 } from 'lucide-react';

/**
 * CV Viewer Component
 * 
 * Component hiển thị CV trực tiếp trong portfolio mà không cần tải về
 */

interface CVViewerProps {
  isOpen: boolean;
  onClose: () => void;
  cvUrl?: string;
}

export default function CVViewer({ isOpen, onClose, cvUrl }: CVViewerProps) {
  // PDF Viewer States
  const [isLoading, setIsLoading] = useState(true);
  const [zoom, setZoom] = useState(100);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [rotation, setRotation] = useState(0);

  // Check if we have a real PDF file
  const hasRealPDF = cvUrl && cvUrl.endsWith('.pdf');

  // PDF Control Functions
  const handleZoomIn = useCallback(() => setZoom(prev => Math.min(prev + 25, 200)), []);
  const handleZoomOut = useCallback(() => setZoom(prev => Math.max(prev - 25, 50)), []);
  const handleRotate = useCallback(() => setRotation(prev => (prev + 90) % 360), []);
  const handleFullscreen = useCallback(() => setIsFullscreen(!isFullscreen), [isFullscreen]);
  const resetView = useCallback(() => {
    setZoom(100);
    setRotation(0);
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case '=':
        case '+':
          if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            handleZoomIn();
          }
          break;
        case '-':
          if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            handleZoomOut();
          }
          break;
        case 'r':
          if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            handleRotate();
          }
          break;
        case 'f':
          if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            handleFullscreen();
          }
          break;
        case '0':
          if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            resetView();
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, handleZoomIn, handleZoomOut, handleRotate, handleFullscreen, resetView]);

  // Mock CV data - sẽ thay thế bằng CV thực tế
  const mockCVContent = {
    personalInfo: {
      name: "Nguyễn Văn Cường",
      title: "Full Stack Developer",
      email: "cuong.dev@example.com",
      phone: "+84 833.1414.99",
      location: "Hồ Chí Minh, Việt Nam",
      linkedin: "linkedin.com/in/cuong-dev",
      github: "github.com/cuong-dev"
    },
    summary: "Passionate Full Stack Developer with 3+ years of experience in building modern web applications using React, Next.js, Node.js, and TypeScript. Strong background in both frontend and backend development with a focus on user experience and performance optimization.",
    experience: [
      {
        title: "Senior Frontend Developer",
        company: "Tech Solutions Ltd.",
        period: "2023 - Present",
        location: "Hồ Chí Minh",
        responsibilities: [
          "Developed and maintained React-based web applications serving 50K+ users",
          "Implemented responsive designs using Tailwind CSS and modern CSS frameworks",
          "Collaborated with backend teams to integrate RESTful APIs and GraphQL",
          "Optimized application performance resulting in 40% faster load times"
        ]
      },
      {
        title: "Full Stack Developer",
        company: "Digital Innovation Co.",
        period: "2021 - 2023",
        location: "Remote",
        responsibilities: [
          "Built end-to-end web applications using MERN stack",
          "Designed and implemented database schemas with MongoDB and PostgreSQL",
          "Created automated testing suites with Jest and Cypress",
          "Mentored junior developers and conducted code reviews"
        ]
      }
    ],
    education: [
      {
        degree: "Bachelor of Computer Science",
        school: "University of Technology",
        period: "2017 - 2021",
        location: "Hồ Chí Minh",
        gpa: "3.8/4.0"
      }
    ],
    skills: {
      "Frontend": ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
      "Backend": ["Node.js", "Express", "Python", "Django", "PostgreSQL", "MongoDB"],
      "Tools": ["Git", "Docker", "AWS", "Vercel", "Figma", "VS Code"],
      "Languages": ["JavaScript", "TypeScript", "Python", "SQL", "HTML", "CSS"]
    },
    projects: [
      {
        name: "E-commerce Platform",
        description: "Full-stack e-commerce solution with payment integration",
        tech: ["Next.js", "Stripe", "PostgreSQL", "Tailwind CSS"],
        link: "github.com/cuong-dev/ecommerce"
      },
      {
        name: "Task Management App",
        description: "Collaborative project management tool with real-time updates",
        tech: ["React", "Socket.io", "Node.js", "MongoDB"],
        link: "github.com/cuong-dev/taskmanager"
      }
    ]
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", duration: 0.5 }}
            className={`bg-white dark:bg-gray-900 w-full ${
              isFullscreen 
                ? 'max-w-full h-full max-h-full' 
                : 'max-w-6xl h-full max-h-[95vh]'
            } rounded-xl shadow-2xl overflow-hidden flex flex-col`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-primary-50 to-purple-50 dark:from-gray-800 dark:to-gray-700">
              <div className="flex items-center gap-3">
                <FileText className="w-6 h-6 text-primary-600" />
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">Curriculum Vitae</h2>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Võ Ngọc Cường</p>
                </div>
              </div>

              {/* PDF Controls */}
              {hasRealPDF && (
                <div className="flex items-center gap-2">
                  {/* Zoom Controls */}
                  <div className="flex items-center gap-1 bg-white dark:bg-gray-800 rounded-lg p-1 border border-gray-300 dark:border-gray-600">
                    <button
                      onClick={handleZoomOut}
                      className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded text-gray-600 dark:text-gray-300 transition-colors"
                      title="Zoom Out"
                    >
                      <ZoomOut className="w-4 h-4" />
                    </button>
                    <span className="text-sm font-medium px-2 text-gray-700 dark:text-gray-300 min-w-[3rem] text-center">
                      {zoom}%
                    </span>
                    <button
                      onClick={handleZoomIn}
                      className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded text-gray-600 dark:text-gray-300 transition-colors"
                      title="Zoom In"
                    >
                      <ZoomIn className="w-4 h-4" />
                    </button>
                  </div>

                  {/* View Controls */}
                  <div className="flex items-center gap-1">
                    <button
                      onClick={handleRotate}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-gray-600 dark:text-gray-300 transition-colors"
                      title="Rotate"
                    >
                      <RotateCw className="w-4 h-4" />
                    </button>
                    <button
                      onClick={handleFullscreen}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-gray-600 dark:text-gray-300 transition-colors"
                      title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
                    >
                      {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={resetView}
                      className="px-3 py-1.5 text-xs font-medium bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg text-gray-700 dark:text-gray-300 transition-colors"
                      title="Reset View"
                    >
                      Reset
                    </button>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                {cvUrl && (
                  <>
                    <button
                      onClick={() => window.open(cvUrl, '_blank')}
                      className="flex items-center gap-2 px-3 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span className="hidden sm:inline">Open PDF</span>
                    </button>
                    <button
                      onClick={() => {
                        const link = document.createElement('a');
                        link.href = cvUrl;
                        link.download = 'CV_Vo_Ngoc_Cuong.pdf';
                        link.click();
                      }}
                      className="flex items-center gap-2 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                    >
                      <Download className="w-4 h-4" />
                      <span className="hidden sm:inline">Download</span>
                    </button>
                  </>
                )}
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                </button>
              </div>
            </div>

            {/* CV Content */}
            <div className="flex-1 overflow-hidden bg-gray-50 dark:bg-gray-800 relative">
              {hasRealPDF ? (
                /* Enhanced PDF Viewer */
                <div className="w-full h-full flex flex-col">
                  {/* Loading Overlay */}
                  {isLoading && (
                    <div className="absolute inset-0 bg-white dark:bg-gray-900 flex items-center justify-center z-10">
                      <div className="text-center">
                        <div className="w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-gray-600 dark:text-gray-300">Loading PDF...</p>
                      </div>
                    </div>
                  )}
                  
                  {/* PDF Container */}
                  <div className="flex-1 overflow-auto bg-gray-100 dark:bg-gray-700 p-4">
                    <div className="max-w-full mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
                      <iframe
                        src={`${cvUrl}#zoom=${zoom}&rotate=${rotation}`}
                        className="w-full h-[80vh] border-0"
                        title="CV - Võ Ngọc Cường"
                        onLoad={() => setIsLoading(false)}
                        style={{
                          transform: `scale(${zoom / 100}) rotate(${rotation}deg)`,
                          transformOrigin: 'center center',
                          minHeight: isFullscreen ? '90vh' : '70vh'
                        }}
                      />
                    </div>
                  </div>

                  {/* Bottom Info Bar */}
                  <div className="flex items-center justify-between px-4 py-2 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 text-sm text-gray-600 dark:text-gray-300">
                    <div className="flex items-center gap-4">
                      <span>📄 PDF Document</span>
                      <span>🔍 {zoom}% zoom</span>
                      {rotation > 0 && <span>🔄 {rotation}° rotated</span>}
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="hidden lg:inline">Ctrl + / - : Zoom</span>
                      <span className="hidden lg:inline">•</span>
                      <span className="hidden md:inline">Ctrl+R: Rotate</span>
                      <span className="hidden md:inline">•</span>
                      <span>ESC: Close</span>
                    </div>
                  </div>
                </div>
              ) : (
                /* Mock CV Content */
                <div className="max-w-3xl mx-auto space-y-8">
                
                {/* Personal Info */}
                <div className="text-center pb-6 border-b border-gray-200 dark:border-gray-700">
                  <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                    {mockCVContent.personalInfo.name}
                  </h1>
                  <p className="text-xl text-primary-600 dark:text-primary-400 mb-4">
                    {mockCVContent.personalInfo.title}
                  </p>
                  <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600 dark:text-gray-300">
                    <span>📧 {mockCVContent.personalInfo.email}</span>
                    <span>📱 {mockCVContent.personalInfo.phone}</span>
                    <span>📍 {mockCVContent.personalInfo.location}</span>
                  </div>
                  <div className="flex justify-center gap-4 mt-3">
                    <a href={`https://${mockCVContent.personalInfo.linkedin}`} 
                       className="text-blue-600 hover:underline text-sm">
                      LinkedIn
                    </a>
                    <a href={`https://${mockCVContent.personalInfo.github}`} 
                       className="text-gray-800 dark:text-gray-200 hover:underline text-sm">
                      GitHub
                    </a>
                  </div>
                </div>

                {/* Summary */}
                <section>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 border-l-4 border-primary-600 pl-4">
                    Professional Summary
                  </h2>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {mockCVContent.summary}
                  </p>
                </section>

                {/* Experience */}
                <section>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 border-l-4 border-primary-600 pl-4">
                    Work Experience
                  </h2>
                  <div className="space-y-6">
                    {mockCVContent.experience.map((exp, index) => (
                      <div key={index} className="bg-gray-50 dark:bg-gray-800 p-5 rounded-lg">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                              {exp.title}
                            </h3>
                            <p className="text-primary-600 dark:text-primary-400 font-medium">
                              {exp.company}
                            </p>
                          </div>
                          <div className="text-right text-sm text-gray-600 dark:text-gray-300">
                            <p>{exp.period}</p>
                            <p>{exp.location}</p>
                          </div>
                        </div>
                        <ul className="space-y-2">
                          {exp.responsibilities.map((resp, idx) => (
                            <li key={idx} className="text-gray-700 dark:text-gray-300 flex items-start">
                              <span className="text-primary-600 mr-2">•</span>
                              {resp}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Skills */}
                <section>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 border-l-4 border-primary-600 pl-4">
                    Technical Skills
                  </h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    {Object.entries(mockCVContent.skills).map(([category, skills]) => (
                      <div key={category} className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                          {category}
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {skills.map((skill, idx) => (
                            <span key={idx} 
                                  className="px-2 py-1 bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 text-xs rounded">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Education */}
                <section>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 border-l-4 border-primary-600 pl-4">
                    Education
                  </h2>
                  {mockCVContent.education.map((edu, index) => (
                    <div key={index} className="bg-gray-50 dark:bg-gray-800 p-5 rounded-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            {edu.degree}
                          </h3>
                          <p className="text-primary-600 dark:text-primary-400">
                            {edu.school}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            GPA: {edu.gpa}
                          </p>
                        </div>
                        <div className="text-right text-sm text-gray-600 dark:text-gray-300">
                          <p>{edu.period}</p>
                          <p>{edu.location}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </section>

                {/* Projects */}
                <section>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 border-l-4 border-primary-600 pl-4">
                    Key Projects
                  </h2>
                  <div className="grid gap-4">
                    {mockCVContent.projects.map((project, index) => (
                      <div key={index} className="bg-gray-50 dark:bg-gray-800 p-5 rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            {project.name}
                          </h3>
                          <a href={`https://${project.link}`} 
                             className="text-primary-600 hover:underline text-sm">
                            View Project
                          </a>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300 mb-3">
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {project.tech.map((tech, idx) => (
                            <span key={idx} 
                                  className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

              </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
