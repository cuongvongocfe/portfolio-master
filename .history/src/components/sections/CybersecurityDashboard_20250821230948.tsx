'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface SecurityThreat {
  id: string;
  type: 'malware' | 'phishing' | 'ddos' | 'injection' | 'breach';
  severity: 'low' | 'medium' | 'high' | 'critical';
  source: string;
  target: string;
  timestamp: string;
  status: 'detected' | 'blocked' | 'mitigated' | 'investigating';
}

interface SecurityTool {
  name: string;
  description: string;
  status: 'active' | 'scanning' | 'updating';
  threats_blocked: number;
  icon: string;
  color: string;
}

const securityTools: SecurityTool[] = [
  {
    name: 'Firewall Guardian',
    description: 'Advanced network protection',
    status: 'active',
    threats_blocked: 1247,
    icon: '🛡️',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    name: 'Malware Hunter',
    description: 'Real-time threat detection',
    status: 'scanning',
    threats_blocked: 892,
    icon: '🔍',
    color: 'from-green-500 to-emerald-500'
  },
  {
    name: 'Vulnerability Scanner',
    description: 'System weakness analysis',
    status: 'updating',
    threats_blocked: 567,
    icon: '⚠️',
    color: 'from-orange-500 to-red-500'
  },
  {
    name: 'Encryption Shield',
    description: 'Data protection algorithms',
    status: 'active',
    threats_blocked: 2143,
    icon: '🔐',
    color: 'from-purple-500 to-pink-500'
  }
];

const hackingSkills = [
  { name: 'Penetration Testing', level: 95, category: 'Offensive Security' },
  { name: 'Network Security', level: 90, category: 'Infrastructure' },
  { name: 'Web Application Security', level: 88, category: 'Application Security' },
  { name: 'Cryptography', level: 85, category: 'Data Protection' },
  { name: 'Social Engineering Defense', level: 82, category: 'Human Factor' },
  { name: 'Incident Response', level: 87, category: 'Crisis Management' }
];

const threatTypes = [
  { type: 'SQL Injection', count: 45, color: 'text-red-400' },
  { type: 'XSS Attacks', count: 32, color: 'text-orange-400' },
  { type: 'CSRF', count: 18, color: 'text-yellow-400' },
  { type: 'DDoS', count: 12, color: 'text-purple-400' },
  { type: 'Phishing', count: 28, color: 'text-pink-400' },
  { type: 'Malware', count: 67, color: 'text-red-500' }
];

export default function CybersecurityDashboard() {
  const [threats, setThreats] = useState<SecurityThreat[]>([]);
  const [activeScans, setActiveScans] = useState(3);
  const [systemStatus, setSystemStatus] = useState<'secure' | 'warning' | 'danger'>('secure');
  const [mounted, setMounted] = useState(false);
  const [realTimeData, setRealTimeData] = useState({
    attacks_blocked: 15420,
    vulnerabilities_patched: 892,
    systems_protected: 47,
    uptime: '99.97%'
  });

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Simulate real-time threat detection
  useEffect(() => {
    if (!mounted) return;
    
    const generateThreat = (): SecurityThreat => {
      const types: SecurityThreat['type'][] = ['malware', 'phishing', 'ddos', 'injection', 'breach'];
      const severities: SecurityThreat['severity'][] = ['low', 'medium', 'high', 'critical'];
      const sources = ['192.168.1.', '10.0.0.', '172.16.0.', '203.0.113.'];
      const statuses: SecurityThreat['status'][] = ['detected', 'blocked', 'mitigated', 'investigating'];

      return {
        id: Math.random().toString(36).substr(2, 9),
        type: types[Math.floor(Math.random() * types.length)],
        severity: severities[Math.floor(Math.random() * severities.length)],
        source: sources[Math.floor(Math.random() * sources.length)] + Math.floor(Math.random() * 255),
        target: 'portfolio.server.com',
        timestamp: new Date().toLocaleTimeString(),
        status: statuses[Math.floor(Math.random() * statuses.length)]
      };
    };

    const interval = setInterval(() => {
      const newThreat = generateThreat();
      setThreats(prev => [newThreat, ...prev.slice(0, 9)]);
      
      // Update real-time data
      setRealTimeData(prev => ({
        ...prev,
        attacks_blocked: prev.attacks_blocked + Math.floor(Math.random() * 5),
        systems_protected: 47 + Math.floor(Math.random() * 3)
      }));

      // Update system status based on threat severity
      if (newThreat.severity === 'critical') {
        setSystemStatus('danger');
        setTimeout(() => setSystemStatus('secure'), 3000);
      } else if (newThreat.severity === 'high') {
        setSystemStatus('warning');
        setTimeout(() => setSystemStatus('secure'), 2000);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-500 bg-red-500/20';
      case 'high': return 'text-orange-500 bg-orange-500/20';
      case 'medium': return 'text-yellow-500 bg-yellow-500/20';
      case 'low': return 'text-green-500 bg-green-500/20';
      default: return 'text-gray-500 bg-gray-500/20';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'blocked': return 'text-green-400';
      case 'mitigated': return 'text-blue-400';
      case 'detected': return 'text-yellow-400';
      case 'investigating': return 'text-red-400';
      default: return 'text-gray-400';
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
            <span className="bg-gradient-to-r from-red-400 via-orange-500 to-yellow-500 bg-clip-text text-transparent">
              Cybersecurity
            </span>
            <span className="text-white ml-4">Command Center</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            White Hat Hacker • Ethical Security Research • Digital Defense Specialist
          </p>
        </motion.div>

        {/* System Status Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className={`mb-8 p-4 rounded-lg border-2 ${
            systemStatus === 'secure' ? 'border-green-500 bg-green-500/10' :
            systemStatus === 'warning' ? 'border-yellow-500 bg-yellow-500/10' :
            'border-red-500 bg-red-500/10'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-4 h-4 rounded-full ${
                systemStatus === 'secure' ? 'bg-green-500' :
                systemStatus === 'warning' ? 'bg-yellow-500' :
                'bg-red-500'
              } animate-pulse`} />
              <span className="font-bold text-lg">
                SYSTEM STATUS: {systemStatus.toUpperCase()}
              </span>
            </div>
            <div className="text-sm text-gray-400">
              Last updated: {new Date().toLocaleTimeString()}
            </div>
          </div>
        </motion.div>

        {/* Real-time Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {Object.entries(realTimeData).map(([key, value], index) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6 hover:border-red-500 transition-all duration-300"
            >
              <h3 className="text-gray-400 text-sm font-medium mb-2 uppercase">
                {key.replace(/_/g, ' ')}
              </h3>
              <div className="text-3xl font-bold text-red-400 mb-2">
                {typeof value === 'number' ? value.toLocaleString() : value}
              </div>
              <div className="text-xs text-green-400">
                ↗ Real-time monitoring
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Security Tools */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6"
          >
            <h3 className="text-2xl font-bold mb-6 text-red-400">Security Arsenal</h3>
            <div className="space-y-4">
              {securityTools.map((tool, index) => (
                <div key={tool.name} className="flex items-center justify-between p-4 bg-gray-900/50 rounded-lg border border-gray-700">
                  <div className="flex items-center gap-4">
                    <span className="text-2xl">{tool.icon}</span>
                    <div>
                      <h4 className="font-semibold text-white">{tool.name}</h4>
                      <p className="text-sm text-gray-400">{tool.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                      tool.status === 'active' ? 'bg-green-500/20 text-green-400' :
                      tool.status === 'scanning' ? 'bg-blue-500/20 text-blue-400' :
                      'bg-orange-500/20 text-orange-400'
                    }`}>
                      {tool.status.toUpperCase()}
                    </div>
                    <div className="text-sm text-red-400 mt-1">
                      {tool.threats_blocked} blocked
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Live Threat Feed */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6"
          >
            <h3 className="text-2xl font-bold mb-6 text-red-400">Live Threat Feed</h3>
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {threats.map((threat) => (
                <motion.div
                  key={threat.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="p-3 bg-gray-900/50 rounded border border-gray-700 hover:border-red-500 transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getSeverityColor(threat.severity)}`}>
                      {threat.severity.toUpperCase()}
                    </span>
                    <span className="text-xs text-gray-400">{threat.timestamp}</span>
                  </div>
                  <div className="text-sm">
                    <div className="text-white font-medium">{threat.type.replace('_', ' ').toUpperCase()}</div>
                    <div className="text-gray-400">From: {threat.source}</div>
                    <div className={`text-sm ${getStatusColor(threat.status)}`}>
                      Status: {threat.status.toUpperCase()}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Security Skills */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-8 mb-12"
        >
          <h3 className="text-2xl font-bold mb-8 text-center text-red-400">White Hat Skills Matrix</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {hackingSkills.map((skill, index) => (
              <div key={skill.name} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-white font-medium">{skill.name}</span>
                  <span className="text-red-400 font-bold">{skill.level}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="h-full bg-gradient-to-r from-red-500 to-orange-500 rounded-full relative"
                  >
                    <motion.div
                      animate={{ x: ['-100%', '100%'] }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                      className="absolute inset-0 bg-white/30 w-8 rounded-full"
                    />
                  </motion.div>
                </div>
                <div className="text-xs text-gray-400">{skill.category}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Threat Analysis */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-8"
        >
          <h3 className="text-2xl font-bold mb-8 text-center text-red-400">Threat Intelligence</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {threatTypes.map((threat, index) => (
              <motion.div
                key={threat.type}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-4 bg-gray-900/50 rounded-lg border border-gray-700 hover:border-red-500 transition-colors"
              >
                <div className={`text-2xl font-bold mb-2 ${threat.color}`}>
                  {threat.count}
                </div>
                <div className="text-xs text-gray-400 uppercase">
                  {threat.type}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
