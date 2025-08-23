'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AttackNode {
  id: string;
  x: number;
  y: number;
  type: 'attacker' | 'target' | 'firewall' | 'honeypot' | 'server';
  status: 'secure' | 'under_attack' | 'compromised' | 'defended';
  health: number;
  connections: string[];
}

interface Attack {
  id: string;
  from: string;
  to: string;
  type: 'ddos' | 'malware' | 'phishing' | 'sql_injection' | 'zero_day';
  progress: number;
  blocked: boolean;
}

interface DefenseAction {
  id: string;
  type: 'firewall_block' | 'intrusion_detection' | 'honeypot_trap' | 'ai_analysis';
  target: string;
  effectiveness: number;
}

const ATTACK_TYPES = {
  ddos: { name: 'DDoS Attack', color: 'from-red-500 to-orange-500', damage: 30 },
  malware: { name: 'Malware Injection', color: 'from-purple-500 to-pink-500', damage: 50 },
  phishing: { name: 'Phishing Campaign', color: 'from-yellow-500 to-red-500', damage: 20 },
  sql_injection: { name: 'SQL Injection', color: 'from-blue-500 to-purple-500', damage: 40 },
  zero_day: { name: 'Zero-Day Exploit', color: 'from-black to-red-600', damage: 80 }
};

const DEFENSE_TYPES = {
  firewall_block: { name: 'Firewall Block', color: 'from-green-500 to-blue-500', strength: 70 },
  intrusion_detection: { name: 'IDS Alert', color: 'from-blue-500 to-cyan-500', strength: 60 },
  honeypot_trap: { name: 'Honeypot Trap', color: 'from-yellow-500 to-orange-500', strength: 90 },
  ai_analysis: { name: 'AI Threat Analysis', color: 'from-purple-500 to-pink-500', strength: 85 }
};

export default function CyberWarfareSimulation() {
  const [mounted, setMounted] = useState(false);
  const [nodes, setNodes] = useState<AttackNode[]>([]);
  const [attacks, setAttacks] = useState<Attack[]>([]);
  const [defenses, setDefenses] = useState<DefenseAction[]>([]);
  const [isActive, setIsActive] = useState(false);
  const [securityScore, setSecurityScore] = useState(100);
  const [threatLevel, setThreatLevel] = useState('LOW');
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    setMounted(true);
    initializeNetwork();
  }, []);

  useEffect(() => {
    if (!mounted || !isActive) return;

    const startSimulation = () => {
      const interval = setInterval(() => {
        // Generate random attacks
        if (Math.random() < 0.3) {
          generateAttack();
        }
        
        // Generate defenses
        if (Math.random() < 0.4) {
          generateDefense();
        }
        
        // Update attack progress
        setAttacks(prev => prev.map(attack => ({
          ...attack,
          progress: Math.min(attack.progress + (attack.blocked ? 5 : 15), 100)
        })).filter(attack => attack.progress < 100));
        
        // Update defense actions
        setDefenses(prev => prev.filter(defense => defense.effectiveness > 0).map(defense => ({
          ...defense,
          effectiveness: defense.effectiveness - 10
        })));
        
        // Update security score
        updateSecurityMetrics();
        
      }, 1000);

      return () => clearInterval(interval);
    };

    const cleanup = startSimulation();
    return cleanup;
  }, [isActive, mounted]);

  const initializeNetwork = () => {
    const networkNodes: AttackNode[] = [
      // Attackers
      { id: 'hacker1', x: 50, y: 100, type: 'attacker', status: 'secure', health: 100, connections: ['firewall1'] },
      { id: 'hacker2', x: 50, y: 300, type: 'attacker', status: 'secure', health: 100, connections: ['firewall2'] },
      { id: 'botnet', x: 50, y: 500, type: 'attacker', status: 'secure', health: 100, connections: ['honeypot1'] },
      
      // Firewalls
      { id: 'firewall1', x: 250, y: 100, type: 'firewall', status: 'secure', health: 100, connections: ['server1'] },
      { id: 'firewall2', x: 250, y: 300, type: 'firewall', status: 'secure', health: 100, connections: ['server2'] },
      
      // Honeypots
      { id: 'honeypot1', x: 250, y: 500, type: 'honeypot', status: 'secure', health: 100, connections: ['server3'] },
      
      // Servers
      { id: 'server1', x: 450, y: 100, type: 'server', status: 'secure', health: 100, connections: ['target1'] },
      { id: 'server2', x: 450, y: 300, type: 'server', status: 'secure', health: 100, connections: ['target2'] },
      { id: 'server3', x: 450, y: 500, type: 'server', status: 'secure', health: 100, connections: ['target3'] },
      
      // Targets
      { id: 'target1', x: 650, y: 100, type: 'target', status: 'secure', health: 100, connections: [] },
      { id: 'target2', x: 650, y: 300, type: 'target', status: 'secure', health: 100, connections: [] },
      { id: 'target3', x: 650, y: 500, type: 'target', status: 'secure', health: 100, connections: [] }
    ];
    setNodes(networkNodes);
  };

  const startSimulation = () => {
    const interval = setInterval(() => {
      // Generate random attacks
      if (Math.random() < 0.3) {
        generateAttack();
      }
      
      // Generate defenses
      if (Math.random() < 0.4) {
        generateDefense();
      }
      
      // Update attack progress
      setAttacks(prev => prev.map(attack => ({
        ...attack,
        progress: Math.min(attack.progress + (attack.blocked ? 5 : 15), 100)
      })).filter(attack => attack.progress < 100));
      
      // Update defense actions
      setDefenses(prev => prev.filter(defense => defense.effectiveness > 0).map(defense => ({
        ...defense,
        effectiveness: defense.effectiveness - 10
      })));
      
      // Update security score
      updateSecurityMetrics();
      
    }, 1000);

    return () => clearInterval(interval);
  };

  const generateAttack = () => {
    const attackers = nodes.filter(n => n.type === 'attacker');
    const targets = nodes.filter(n => n.type !== 'attacker');
    
    if (attackers.length > 0 && targets.length > 0) {
      const attacker = attackers[Math.floor(Math.random() * attackers.length)];
      const target = targets[Math.floor(Math.random() * targets.length)];
      const attackTypes = Object.keys(ATTACK_TYPES) as Array<keyof typeof ATTACK_TYPES>;
      const attackType = attackTypes[Math.floor(Math.random() * attackTypes.length)];
      
      const newAttack: Attack = {
        id: `attack_${Date.now()}_${Math.random()}`,
        from: attacker.id,
        to: target.id,
        type: attackType,
        progress: 0,
        blocked: false
      };
      
      setAttacks(prev => [...prev, newAttack]);
    }
  };

  const generateDefense = () => {
    const defenseTypes = Object.keys(DEFENSE_TYPES) as Array<keyof typeof DEFENSE_TYPES>;
    const defenseType = defenseTypes[Math.floor(Math.random() * defenseTypes.length)];
    const protectedNodes = nodes.filter(n => n.type === 'firewall' || n.type === 'honeypot');
    
    if (protectedNodes.length > 0) {
      const target = protectedNodes[Math.floor(Math.random() * protectedNodes.length)];
      
      const newDefense: DefenseAction = {
        id: `defense_${Date.now()}_${Math.random()}`,
        type: defenseType,
        target: target.id,
        effectiveness: 100
      };
      
      setDefenses(prev => [...prev, newDefense]);
      
      // Block some attacks
      setAttacks(prev => prev.map(attack => {
        if (attack.to === target.id && Math.random() < 0.6) {
          return { ...attack, blocked: true };
        }
        return attack;
      }));
    }
  };

  const updateSecurityMetrics = () => {
    const activeAttacks = attacks.filter(a => !a.blocked).length;
    const compromisedNodes = nodes.filter(n => n.status === 'compromised').length;
    
    const newScore = Math.max(0, 100 - (activeAttacks * 10) - (compromisedNodes * 20));
    setSecurityScore(newScore);
    
    if (newScore > 80) setThreatLevel('LOW');
    else if (newScore > 50) setThreatLevel('MEDIUM');
    else if (newScore > 20) setThreatLevel('HIGH');
    else setThreatLevel('CRITICAL');
  };

  const getNodeIcon = (type: string) => {
    switch (type) {
      case 'attacker': return '💀';
      case 'firewall': return '🛡️';
      case 'honeypot': return '🍯';
      case 'server': return '🖥️';
      case 'target': return '🎯';
      default: return '⚪';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'secure': return 'border-green-500 bg-green-500/20';
      case 'under_attack': return 'border-yellow-500 bg-yellow-500/20 animate-pulse';
      case 'compromised': return 'border-red-500 bg-red-500/20';
      case 'defended': return 'border-blue-500 bg-blue-500/20';
      default: return 'border-gray-500 bg-gray-500/20';
    }
  };

  if (!mounted) {
    return <div className="py-20 lg:py-32 bg-black">Loading...</div>;
  }

  return (
    <section id="projects" className="py-20 lg:py-32 bg-black relative overflow-hidden">
      {/* Matrix Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,255,0,0.1),transparent)]"></div>
        <div className="h-full w-full bg-[linear-gradient(90deg,transparent_98%,rgba(0,255,0,0.1)_100%)] bg-[length:20px_20px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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
            className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/20 border border-red-500/30 text-red-400 rounded-full text-sm font-medium mb-4"
          >
            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
            CYBER WARFARE SIMULATION
          </motion.div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Network Attack &{' '}
            <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
              Defense Simulation
            </span>
          </h2>
          
          <p className="max-w-3xl mx-auto text-xl text-gray-400 leading-relaxed mb-8">
            Real-time cybersecurity simulation showcasing advanced threat detection, 
            network defense mechanisms, and AI-powered security responses.
          </p>

          {/* Control Panel */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <motion.button
              onClick={() => setIsActive(!isActive)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                isActive 
                  ? 'bg-red-600 hover:bg-red-700 text-white' 
                  : 'bg-green-600 hover:bg-green-700 text-white'
              }`}
            >
              {isActive ? '🛑 Stop Simulation' : '▶️ Start Simulation'}
            </motion.button>
            
            <div className="flex items-center gap-4 text-sm">
              <div className="px-3 py-1 bg-gray-800 rounded-full">
                Security Score: <span className="text-green-400 font-bold">{securityScore}%</span>
              </div>
              <div className={`px-3 py-1 rounded-full font-bold ${
                threatLevel === 'LOW' ? 'bg-green-500/20 text-green-400' :
                threatLevel === 'MEDIUM' ? 'bg-yellow-500/20 text-yellow-400' :
                threatLevel === 'HIGH' ? 'bg-orange-500/20 text-orange-400' :
                'bg-red-500/20 text-red-400'
              }`}>
                Threat: {threatLevel}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Network Visualization */}
        <div className="relative bg-gray-900/50 border border-gray-700 rounded-2xl p-8 min-h-[600px]">
          <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
            {/* Connection Lines */}
            {nodes.map(node => 
              node.connections.map(connectionId => {
                const targetNode = nodes.find(n => n.id === connectionId);
                if (!targetNode) return null;
                
                return (
                  <motion.line
                    key={`${node.id}-${connectionId}`}
                    x1={node.x}
                    y1={node.y}
                    x2={targetNode.x}
                    y2={targetNode.y}
                    stroke="rgba(34, 197, 94, 0.3)"
                    strokeWidth="2"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2 }}
                  />
                );
              })
            )}
            
            {/* Attack Lines */}
            {attacks.map(attack => {
              const fromNode = nodes.find(n => n.id === attack.from);
              const toNode = nodes.find(n => n.id === attack.to);
              if (!fromNode || !toNode) return null;
              
              return (
                <motion.line
                  key={attack.id}
                  x1={fromNode.x}
                  y1={fromNode.y}
                  x2={toNode.x}
                  y2={toNode.y}
                  stroke={attack.blocked ? "rgba(59, 130, 246, 0.8)" : "rgba(239, 68, 68, 0.8)"}
                  strokeWidth="3"
                  strokeDasharray={attack.blocked ? "5,5" : "none"}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
              );
            })}
          </svg>

          {/* Network Nodes */}
          <div className="relative z-10">
            {nodes.map(node => (
              <motion.div
                key={node.id}
                className={`absolute w-16 h-16 rounded-full border-2 flex items-center justify-center text-2xl cursor-pointer ${getStatusColor(node.status)}`}
                style={{ left: node.x - 32, top: node.y - 32 }}
                whileHover={{ scale: 1.2 }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1 }}
              >
                {getNodeIcon(node.type)}
                
                {/* Health Bar */}
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-gray-600 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-green-500"
                    initial={{ width: '100%' }}
                    animate={{ width: `${node.health}%` }}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Attack Indicators */}
          <AnimatePresence>
            {attacks.map(attack => {
              const fromNode = nodes.find(n => n.id === attack.from);
              const toNode = nodes.find(n => n.id === attack.to);
              if (!fromNode || !toNode) return null;
              
              const attackInfo = ATTACK_TYPES[attack.type];
              const midX = (fromNode.x + toNode.x) / 2;
              const midY = (fromNode.y + toNode.y) / 2;
              
              return (
                <motion.div
                  key={attack.id}
                  className="absolute z-20 pointer-events-none"
                  style={{ left: midX - 50, top: midY - 20 }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                >
                  <div className={`px-2 py-1 rounded text-xs font-bold bg-gradient-to-r ${attackInfo.color} text-white`}>
                    {attack.blocked ? '🛡️ BLOCKED' : attackInfo.name}
                  </div>
                  <div className="w-20 h-1 bg-gray-600 rounded-full mt-1 overflow-hidden">
                    <motion.div
                      className={`h-full bg-gradient-to-r ${attackInfo.color}`}
                      initial={{ width: '0%' }}
                      animate={{ width: `${attack.progress}%` }}
                    />
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {/* Defense Indicators */}
          <AnimatePresence>
            {defenses.map(defense => {
              const targetNode = nodes.find(n => n.id === defense.target);
              if (!targetNode) return null;
              
              const defenseInfo = DEFENSE_TYPES[defense.type];
              
              return (
                <motion.div
                  key={defense.id}
                  className="absolute z-20 pointer-events-none"
                  style={{ left: targetNode.x - 40, top: targetNode.y - 50 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <div className={`px-2 py-1 rounded text-xs font-bold bg-gradient-to-r ${defenseInfo.color} text-white whitespace-nowrap`}>
                    {defenseInfo.name}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Statistics Panel */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
          <motion.div 
            className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 text-center"
            whileHover={{ scale: 1.05 }}
          >
            <div className="text-2xl font-bold text-red-400">{attacks.length}</div>
            <div className="text-sm text-gray-400">Active Attacks</div>
          </motion.div>
          
          <motion.div 
            className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 text-center"
            whileHover={{ scale: 1.05 }}
          >
            <div className="text-2xl font-bold text-blue-400">{defenses.length}</div>
            <div className="text-sm text-gray-400">Active Defenses</div>
          </motion.div>
          
          <motion.div 
            className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 text-center"
            whileHover={{ scale: 1.05 }}
          >
            <div className="text-2xl font-bold text-green-400">{attacks.filter(a => a.blocked).length}</div>
            <div className="text-sm text-gray-400">Blocked Attacks</div>
          </motion.div>
          
          <motion.div 
            className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 text-center"
            whileHover={{ scale: 1.05 }}
          >
            <div className="text-2xl font-bold text-purple-400">{nodes.filter(n => n.status === 'secure').length}</div>
            <div className="text-sm text-gray-400">Secure Nodes</div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
