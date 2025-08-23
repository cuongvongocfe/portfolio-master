'use client';

import { useState, useEffect, useCallback, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, ZoomIn, ZoomOut, RotateCw, Maximize2, Minimize2, ExternalLink } from 'lucide-react';

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
const ControlButton = memo(({ 
  onClick, 
  icon: Icon, 
  tooltip, 
  disabled = false 
}: {
  onClick: () => void;
  icon: any;
  tooltip: string;
  disabled?: boolean;
}) => (
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
));

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
        className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.85, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.85, opacity: 0, y: 20 }}
          transition={{ type: "spring", duration: 0.4, bounce: 0.1 }}
          className={`bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden ${
            isFullscreen 
              ? 'w-full h-full m-0 rounded-none' 
              : 'w-full max-w-5xl h-[90vh] m-4'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Enhanced Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 dark:from-gray-800 dark:via-gray-800 dark:to-gray-800">
            <div className="flex items-center gap-4">
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

          {/* Content Area */}
          <div className="flex-1 flex items-center justify-center p-6 bg-gray-50 dark:bg-gray-900">
            {isLoading ? (
              <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
                <p className="text-gray-600 dark:text-gray-400">Loading CV...</p>
              </div>
            ) : (
              <div 
                className="bg-white dark:bg-gray-800 shadow-xl rounded-lg overflow-hidden transition-all duration-300"
                style={{
                  transform: `scale(${zoom / 100}) rotate(${rotation}deg)`,
                  transformOrigin: 'center'
                }}
              >
                {cvUrl && cvUrl.endsWith('.pdf') ? (
                  <iframe
                    src={`${cvUrl}#toolbar=0&navpanes=0&scrollbar=0`}
                    className="w-[794px] h-[1123px]" // A4 aspect ratio
                    title="CV Preview"
                  />
                ) : (
                  <div className="w-[794px] h-[1123px] p-12 bg-white text-gray-900 overflow-auto">
                    {/* Simplified CV Preview */}
                    <div className="space-y-8">
                      <div className="text-center border-b pb-6">
                        <h1 className="text-4xl font-bold text-gray-900 mb-2">Võ Ngọc Cường</h1>
                        <p className="text-xl text-gray-600 mb-4">Frontend Developer</p>
                        <div className="flex justify-center gap-6 text-sm text-gray-600">
                          <span>📧 contact@cuongdev.com</span>
                          <span>📱 +84 833.1414.99</span>
                          <span>📍 Hồ Chí Minh, Việt Nam</span>
                        </div>
                      </div>

                      <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-3 border-l-4 border-blue-500 pl-3">
                          Professional Summary
                        </h2>
                        <p className="text-gray-700 leading-relaxed">
                          Passionate Frontend Developer with 2+ years of experience building modern web applications. 
                          Specialized in React, Next.js, TypeScript, and modern frontend technologies. 
                          Strong focus on user experience and performance optimization.
                        </p>
                      </div>

                      <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-3 border-l-4 border-blue-500 pl-3">
                          Technical Skills
                        </h2>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <h3 className="font-semibold text-gray-800 mb-2">Frontend</h3>
                            <p className="text-gray-600 text-sm">React, Next.js, TypeScript, Tailwind CSS, Framer Motion</p>
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-800 mb-2">Tools & Others</h3>
                            <p className="text-gray-600 text-sm">Git, VS Code, Figma, Vercel, Performance Optimization</p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-3 border-l-4 border-blue-500 pl-3">
                          Experience
                        </h2>
                        <div className="space-y-4">
                          <div>
                            <h3 className="font-semibold text-gray-800">Frontend Developer</h3>
                            <p className="text-gray-600 text-sm">2022 - Present</p>
                            <p className="text-gray-700 text-sm mt-1">
                              Developed responsive web applications using React and Next.js, 
                              focusing on performance optimization and user experience.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
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
