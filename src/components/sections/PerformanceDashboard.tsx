'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface PerformanceMetric {
  id: string;
  name: string;
  value: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  color: string;
  description: string;
}

interface SystemMetric {
  name: string;
  value: number;
  max: number;
  color: string;
}

export default function PerformanceDashboard() {
  const [metrics, setMetrics] = useState<PerformanceMetric[]>([
    {
      id: 'fps',
      name: 'FPS',
      value: 60,
      unit: '',
      trend: 'stable',
      color: 'from-green-400 to-emerald-500',
      description: 'Frames per second'
    },
    {
      id: 'loadTime',
      name: 'Load Time',
      value: 1.2,
      unit: 's',
      trend: 'down',
      color: 'from-blue-400 to-cyan-500',
      description: 'Initial page load time'
    },
    {
      id: 'memoryUsage',
      name: 'Memory',
      value: 45,
      unit: 'MB',
      trend: 'up',
      color: 'from-purple-400 to-pink-500',
      description: 'JavaScript heap size'
    },
    {
      id: 'bundleSize',
      name: 'Bundle Size',
      value: 180,
      unit: 'KB',
      trend: 'down',
      color: 'from-orange-400 to-red-500',
      description: 'Optimized bundle size'
    }
  ]);

  const [systemMetrics, setSystemMetrics] = useState<SystemMetric[]>([
    { name: 'CPU Usage', value: 35, max: 100, color: 'bg-gradient-to-r from-blue-500 to-cyan-500' },
    { name: 'GPU Usage', value: 28, max: 100, color: 'bg-gradient-to-r from-purple-500 to-pink-500' },
    { name: 'Network', value: 42, max: 100, color: 'bg-gradient-to-r from-green-500 to-emerald-500' },
    { name: 'Disk I/O', value: 15, max: 100, color: 'bg-gradient-to-r from-orange-500 to-red-500' }
  ]);

  const [realtimeData, setRealtimeData] = useState<number[]>([]);

  useEffect(() => {
    // Simulate real-time performance monitoring
    const interval = setInterval(() => {
      setMetrics(prev => prev.map(metric => ({
        ...metric,
        value: Math.max(0, metric.value + (Math.random() - 0.5) * 10)
      })));

      setSystemMetrics(prev => prev.map(metric => ({
        ...metric,
        value: Math.max(0, Math.min(100, metric.value + (Math.random() - 0.5) * 20))
      })));

      setRealtimeData(prev => {
        const newData = [...prev, Math.random() * 100];
        return newData.slice(-20); // Keep last 20 data points
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return '↗️';
      case 'down':
        return '↘️';
      default:
        return '➡️';
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
              Performance Analytics
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Real-time monitoring and optimization insights powered by advanced algorithms
          </p>
        </motion.div>

        {/* Main Performance Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-400 text-sm font-medium">{metric.name}</h3>
                <span className="text-lg">{getTrendIcon(metric.trend)}</span>
              </div>
              
              <div className="mb-3">
                <span className={`text-3xl font-bold bg-gradient-to-r ${metric.color} bg-clip-text text-transparent`}>
                  {metric.value.toFixed(1)}
                </span>
                <span className="text-gray-400 ml-1">{metric.unit}</span>
              </div>
              
              <p className="text-xs text-gray-500">{metric.description}</p>
            </motion.div>
          ))}
        </div>

        {/* System Resource Monitor */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-8 mb-12"
        >
          <h3 className="text-2xl font-bold mb-8 text-center">System Resource Monitor</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {systemMetrics.map((metric, index) => (
              <div key={metric.name} className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300 font-medium">{metric.name}</span>
                  <span className="text-white font-bold">{metric.value.toFixed(0)}%</span>
                </div>
                
                <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(metric.value / metric.max) * 100}%` }}
                    transition={{ duration: 1, delay: index * 0.2 }}
                    className={`h-full ${metric.color} rounded-full relative`}
                  >
                    <motion.div
                      animate={{ x: ['0%', '100%', '0%'] }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                      className="absolute inset-0 bg-white/20 w-8 rounded-full"
                    />
                  </motion.div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Real-time Graph */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-8"
        >
          <h3 className="text-2xl font-bold mb-8 text-center">Real-time Performance Graph</h3>
          
          <div className="relative h-64 bg-gray-900/50 rounded-lg p-4 overflow-hidden">
            <div className="absolute inset-0 p-4">
              <svg className="w-full h-full">
                <defs>
                  <linearGradient id="performanceGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="rgba(34, 197, 94, 0.8)" />
                    <stop offset="100%" stopColor="rgba(34, 197, 94, 0.1)" />
                  </linearGradient>
                </defs>
                
                {realtimeData.length > 1 && (
                  <motion.path
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.5 }}
                    d={`M ${realtimeData.map((value, index) => 
                      `${(index / (realtimeData.length - 1)) * 100}% ${100 - value}%`
                    ).join(' L ')}`}
                    fill="url(#performanceGradient)"
                    stroke="rgb(34, 197, 94)"
                    strokeWidth="2"
                    vectorEffect="non-scaling-stroke"
                  />
                )}
              </svg>
            </div>
            
            {/* Grid lines */}
            <div className="absolute inset-0 grid grid-cols-10 grid-rows-5 opacity-20">
              {Array.from({ length: 50 }).map((_, i) => (
                <div key={i} className="border-r border-b border-gray-600" />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
