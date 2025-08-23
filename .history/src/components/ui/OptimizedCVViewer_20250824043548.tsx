'use client';

import { useState, useEffect, useCallback, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, ZoomIn, ZoomOut, RotateCw, Maximize2, Minimize2, ExternalLink, LucideIcon } from 'lucide-react';

/**
 * Optimized CV Viewer Component
 * 
 * High-performance CV viewer with modern UI and smooth animations
 */

interface OptimizedCVViewerProps {
  isOpen: boolean;
  onClose: () => void;
  cvUrl?: string;
}

// Memoized control button for performance
const ControlButton = memo(function ControlButton({ 
  onClick, 
  icon: Icon, 
  tooltip, 
  disabled = false 
}: {
  onClick: () => void;
  icon: LucideIcon;
  tooltip: string;
  disabled?: boolean;
}) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      disabled={disabled}
      className={`p-3 rounded-lg transition-all duration-200 ${
        disabled 
          ? 'bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-gray-800' 
          : 'bg-white text-gray-700 hover:bg-gray-50 hover:text-primary-600 shadow-sm dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
      }`}
      title={tooltip}
    >
      <Icon size={18} />
    </motion.button>
  );
});

export default function OptimizedCVViewer({ isOpen, onClose, cvUrl }: OptimizedCVViewerProps) {
  const [zoom, setZoom] = useState(100);
  const [rotation, setRotation] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Performance optimized controls
  const handleZoomIn = useCallback(() => setZoom(prev => Math.min(prev + 25, 200)), []);
  const handleZoomOut = useCallback(() => setZoom(prev => Math.max(prev - 25, 50)), []);
  const handleRotate = useCallback(() => setRotation(prev => (prev + 90) % 360), []);
  const handleFullscreen = useCallback(() => setIsFullscreen(prev => !prev), []);
  const handleReset = useCallback(() => {
    setZoom(100);
    setRotation(0);
  }, []);

  // Handle PDF loading
  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      // Simulate loading time for demo
      const timer = setTimeout(() => setIsLoading(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Keyboard shortcuts
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case '=':
          case '+':
            e.preventDefault();
            handleZoomIn();
            break;
          case '-':
            e.preventDefault();
            handleZoomOut();
            break;
          case '0':
            e.preventDefault();
            handleReset();
            break;
        }
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, handleZoomIn, handleZoomOut, handleReset]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4"
        onClick={onClose} // Click outside to close
      >
        <motion.div
          initial={{ scale: 0.85, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.85, opacity: 0, y: 20 }}
          transition={{ type: "spring", duration: 0.4, bounce: 0.1 }}
          className={`bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden flex flex-col ${
            isFullscreen 
              ? 'w-full h-full m-0 rounded-none' 
              : 'w-full max-w-5xl h-[90vh]'
          }`}
          onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
        >
          {/* Enhanced Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 dark:from-gray-800 dark:via-gray-800 dark:to-gray-800">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <ExternalLink size={20} className="text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  CV - Võ Ngọc Cường
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Frontend Developer Portfolio
                </p>
              </div>
            </div>

            {/* Control Panel */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800 rounded-xl p-1">
                <ControlButton
                  onClick={handleZoomOut}
                  icon={ZoomOut}
                  tooltip="Zoom Out (Ctrl + -)"
                  disabled={zoom <= 50}
                />
                <div className="px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 min-w-[60px] text-center">
                  {zoom}%
                </div>
                <ControlButton
                  onClick={handleZoomIn}
                  icon={ZoomIn}
                  tooltip="Zoom In (Ctrl + +)"
                  disabled={zoom >= 200}
                />
              </div>

              <ControlButton
                onClick={handleRotate}
                icon={RotateCw}
                tooltip="Rotate 90°"
              />

              <ControlButton
                onClick={handleFullscreen}
                icon={isFullscreen ? Minimize2 : Maximize2}
                tooltip={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
              />

              {cvUrl && (
                <ControlButton
                  onClick={() => window.open(cvUrl, '_blank')}
                  icon={Download}
                  tooltip="Download PDF"
                />
              )}

              <ControlButton
                onClick={onClose}
                icon={X}
                tooltip="Close (Esc)"
              />
            </div>
          </div>

          {/* Content Area - Scrollable */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden bg-gray-50 dark:bg-gray-900">
            <div className="p-2 sm:p-6 flex justify-center items-center w-full h-full">
              {isLoading ? (
                <div className="flex flex-col items-center gap-4 py-20">
                  <div className="w-16 h-16 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
                  <p className="text-gray-600 dark:text-gray-400">Loading CV...</p>
                </div>
              ) : (
                <div 
                  className="bg-white dark:bg-gray-800 shadow-xl rounded-lg overflow-hidden transition-all duration-300"
                  style={{
                    transform: `scale(${zoom / 100}) rotate(${rotation}deg)`,
                    transformOrigin: 'center top',
                    marginBottom: '2rem' // Add space at bottom
                  }}
                >
                  {cvUrl && cvUrl.endsWith('.pdf') ? (
                    <div className="w-full h-[70vh] sm:w-[794px] sm:h-[1123px] max-w-full overflow-auto rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 flex items-center justify-center">
                      <iframe
                        src={`https://docs.google.com/gview?url=${encodeURIComponent(cvUrl)}&embedded=true`}
                        className="w-full h-full border-0"
                        title="CV Preview"
                        style={{ width: '100%', height: '100%', minHeight: '300px' }}
                        allowFullScreen
                      />
                    </div>
                  ) : (
                    <div className="w-full max-w-[794px] bg-white text-gray-900">
                      {/* Scrollable CV Preview */}
                      <div className="p-8 space-y-6" style={{ minHeight: '1123px' }}>
                        {/* Header */}
                        <div className="text-center border-b border-gray-300 pb-6">
                          <h1 className="text-3xl font-bold text-gray-900 mb-2">Võ Ngọc Cường</h1>
                          <p className="text-lg text-gray-600 mb-4">Front-End Web Developer</p>
                          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
                            <span>� 0833114199</span>
                            <span>�📧 vongoccuongfedev@gmail.com</span>
                            <span>� Portfolio Link</span>
                            <span>📍 RACH GIA, Vietnam</span>
                          </div>
                        </div>

                        {/* Career Objective */}
                        <div>
                          <h2 className="text-lg font-bold text-gray-900 mb-3 border-b border-gray-200 pb-1">
                            CAREER OBJECTIVE
                          </h2>
                          <p className="text-gray-700 leading-relaxed text-sm">
                            Aiming to build a stable career in the IT industry, striving to become an outstanding developer by continuously improving skills and gaining 
                            experience. My long-term goal is to become a Full Stack Developer.
                          </p>
                        </div>

                        {/* Work Experience */}
                        <div>
                          <h2 className="text-lg font-bold text-gray-900 mb-3 border-b border-gray-200 pb-1">
                            WORK EXPERIENCE
                          </h2>
                          <div className="space-y-4">
                            <div>
                              <div className="flex justify-between items-start mb-2">
                                <div>
                                  <h3 className="font-bold text-gray-800">TRAN THANH LONG</h3>
                                  <p className="text-gray-600 text-sm italic">Marketing Leader</p>
                                </div>
                                <span className="text-gray-500 text-sm">Aug 2023 - Oct 2023</span>
                              </div>
                              <ul className="text-gray-700 text-sm space-y-1 ml-4">
                                <li>• Designed branding and promotional materials.</li>
                                <li>• Created marketing content and visual designs.</li>
                                <li>• Captured product photography for promotional use.</li>
                              </ul>
                            </div>

                            <div>
                              <div className="flex justify-between items-start mb-2">
                                <div>
                                  <h3 className="font-bold text-gray-800">Baolongcamp</h3>
                                  <p className="text-gray-600 text-sm italic">Front-end Developer</p>
                                </div>
                                <span className="text-gray-500 text-sm">Nov 2021 - Present</span>
                              </div>
                              <ul className="text-gray-700 text-sm space-y-1 ml-4">
                                <li>• Executed front-end development tasks.</li>
                                <li>• Translated UI/UX designs into responsive interfaces.</li>
                                <li>• Collaborated on internal tools and business web platforms.</li>
                              </ul>
                            </div>
                          </div>
                        </div>

                        {/* Projects */}
                        <div>
                          <h2 className="text-lg font-bold text-gray-900 mb-3 border-b border-gray-200 pb-1">
                            PROJECTS
                          </h2>
                          <div>
                            <div className="flex justify-between items-start mb-2">
                              <h3 className="font-bold text-gray-800">DREAMCAR</h3>
                              <span className="text-gray-500 text-sm">Apr 2023 - Apr 2023</span>
                            </div>
                            <p className="text-gray-700 text-sm leading-relaxed">
                              A responsive car showcase website built with <strong>ReactJS</strong>, allowing users to browse, filter, and view details of different car models. Designed with 
                              clean UI and optimized for performance and smooth user experience.
                            </p>
                          </div>
                        </div>

                        {/* Skills */}
                        <div>
                          <h2 className="text-lg font-bold text-gray-900 mb-3 border-b border-gray-200 pb-1">
                            SKILLS
                          </h2>
                          <div className="space-y-3">
                            <div>
                              <h3 className="font-bold text-gray-800 mb-1">Programming Skills</h3>
                              <p className="text-gray-700 text-sm">JavaScript, HTML, CSS, ReactJS, Next.js, TypeScript, Tailwind CSS</p>
                            </div>
                            <div>
                              <h3 className="font-bold text-gray-800 mb-1">Languages</h3>
                              <p className="text-gray-700 text-sm">Vietnamese (Native), English (Intermediate)</p>
                            </div>
                            <div>
                              <h3 className="font-bold text-gray-800 mb-1">Tools & Technologies</h3>
                              <p className="text-gray-700 text-sm">Git, VS Code, Figma, Vercel, Performance Optimization</p>
                            </div>
                          </div>
                        </div>

                        {/* Education (if any) */}
                        <div>
                          <h2 className="text-lg font-bold text-gray-900 mb-3 border-b border-gray-200 pb-1">
                            EDUCATION
                          </h2>
                          <div>
                            <h3 className="font-bold text-gray-800">Self-taught Developer</h3>
                            <p className="text-gray-600 text-sm">2021 - Present</p>
                            <p className="text-gray-700 text-sm">Continuously learning modern web development technologies through online courses, documentation, and hands-on projects.</p>
                          </div>
                        </div>

                        {/* Footer */}
                        <div className="pt-6 border-t border-gray-300 text-center">
                          <p className="text-gray-500 text-xs">
                            LinkedIn: linkedin.com/in/cuong-vo-ngoc-b6b742226 | GitHub: github.com/cuongvongocfe
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Footer with shortcuts */}
          <div className="px-6 py-3 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
              <div className="flex gap-4">
                <span>ESC: Close</span>
                <span>Ctrl + / -: Zoom</span>
                <span>Ctrl + 0: Reset</span>
              </div>
              <span>High-performance CV viewer</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
