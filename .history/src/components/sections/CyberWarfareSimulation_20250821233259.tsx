'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AttackNode {
  id: string;
  x: number;
  y: number;
  type: 'server' | 'database' | 'firewall' | 'endpoint' | 'router' | 'satellite' | 'nuclear' | 'military';
  status: 'secure' | 'under_attack' | 'compromised' | 'destroyed';
  health: number;
  defenseLevel: number;
  connections: string[];
  critical: boolean;
}

interface Attack {
  id: string;
  sourceId: string;
  targetId: string;
  type: 'ddos' | 'malware' | 'phishing' | 'ransomware' | 'zero_day' | 'quantum' | 'nuclear_hack' | 'nation_state' | 'ai_warfare' | 'electromagnetic';
  progress: number;
  damage: number;
  severity: 'low' | 'medium' | 'high' | 'critical' | 'apocalyptic';
  speed: number;
}

interface DefenseAction {
  id: string;
  nodeId: string;
  type: 'firewall' | 'antivirus' | 'honeypot' | 'ai_detection' | 'quantum_shield' | 'nuclear_protocol' | 'divine_intervention' | 'matrix_defense';
  strength: number;
  duration: number;
  effectiveness: number;
}

interface ExplosionEffect {
  id: string;
  x: number;
  y: number;
  type: 'breach' | 'defense' | 'nuclear' | 'quantum' | 'apocalypse';
  intensity: number;
  timestamp: number;
}

interface AlertMessage {
  id: string;
  message: string;
  type: 'warning' | 'critical' | 'success' | 'apocalyptic' | 'divine';
  timestamp: number;
  priority: number;
}

const CyberWarfareSimulation: React.FC = () => {
  const [nodes, setNodes] = useState<AttackNode[]>([]);
  const [attacks, setAttacks] = useState<Attack[]>([]);
  const [defenses, setDefenses] = useState<DefenseAction[]>([]);
  const [explosions, setExplosions] = useState<ExplosionEffect[]>([]);
  const [alerts, setAlerts] = useState<AlertMessage[]>([]);
  const [isApocalypseMode, setIsApocalypseMode] = useState(false);
  const [globalThreatLevel, setGlobalThreatLevel] = useState(1);
  const [warTime, setWarTime] = useState(0);
  const [activeScenario, setActiveScenario] = useState<'normal' | 'nuclear' | 'quantum' | 'divine' | 'matrix'>('normal');

  // Initialize the cyber battlefield
  useEffect(() => {
    const initialNodes: AttackNode[] = [
      { id: 'server1', x: 100, y: 150, type: 'server', status: 'secure', health: 100, defenseLevel: 3, connections: ['db1', 'fw1'], critical: false },
      { id: 'server2', x: 200, y: 100, type: 'server', status: 'secure', health: 100, defenseLevel: 2, connections: ['db2'], critical: true },
      { id: 'server3', x: 300, y: 200, type: 'server', status: 'secure', health: 100, defenseLevel: 4, connections: ['router1'], critical: false },
      { id: 'db1', x: 150, y: 250, type: 'database', status: 'secure', health: 100, defenseLevel: 5, connections: ['server1'], critical: true },
      { id: 'db2', x: 250, y: 50, type: 'database', status: 'secure', health: 100, defenseLevel: 3, connections: ['server2'], critical: true },
      { id: 'fw1', x: 50, y: 100, type: 'firewall', status: 'secure', health: 100, defenseLevel: 8, connections: ['server1'], critical: false },
      { id: 'router1', x: 350, y: 150, type: 'router', status: 'secure', health: 100, defenseLevel: 2, connections: ['server3', 'satellite1'], critical: false },
      { id: 'satellite1', x: 400, y: 50, type: 'satellite', status: 'secure', health: 100, defenseLevel: 6, connections: ['router1', 'military1'], critical: true },
      { id: 'military1', x: 450, y: 100, type: 'military', status: 'secure', health: 100, defenseLevel: 10, connections: ['satellite1', 'nuclear1'], critical: true },
      { id: 'nuclear1', x: 500, y: 150, type: 'nuclear', status: 'secure', health: 100, defenseLevel: 15, connections: ['military1'], critical: true },
    ];
    setNodes(initialNodes);

    // Start the apocalyptic war timer
    const warTimer = setInterval(() => {
      setWarTime(prev => prev + 1);
    }, 1000);

    return () => clearInterval(warTimer);
  }, []);

  // Escalate threat level over time
  useEffect(() => {
    const escalationTimer = setInterval(() => {
      setGlobalThreatLevel(prev => {
        const newLevel = Math.min(prev + 0.1, 10);
        if (newLevel >= 8 && !isApocalypseMode) {
          setIsApocalypseMode(true);
          addAlert('🔥 APOCALYPSE MODE ACTIVATED! PREPARE FOR DIGITAL ARMAGEDDON! 🔥', 'apocalyptic', 100);
        }
        return newLevel;
      });
    }, 3000);

    return () => clearInterval(escalationTimer);
  }, [isApocalypseMode, addAlert]);

  // Generate random attacks with increasing intensity
  useEffect(() => {
    const attackTypes: Attack['type'][] = ['ddos', 'malware', 'phishing', 'ransomware', 'zero_day', 'quantum', 'nuclear_hack', 'nation_state', 'ai_warfare', 'electromagnetic'];
    
    const generateAttack = () => {
      if (nodes.length < 2) return;

      const sourceNode = nodes[Math.floor(Math.random() * nodes.length)];
      const availableTargets = nodes.filter(n => n.id !== sourceNode.id);
      const targetNode = availableTargets[Math.floor(Math.random() * availableTargets.length)];

      const attackType = attackTypes[Math.floor(Math.random() * attackTypes.length)];
      const isApocalypticAttack = isApocalypseMode && Math.random() < 0.7;
      
      let severity: Attack['severity'] = 'low';
      let damage = 10;
      let speed = 1;

      if (isApocalypticAttack) {
        severity = Math.random() < 0.5 ? 'apocalyptic' : 'critical';
        damage = Math.random() * 50 + 30;
        speed = Math.random() * 3 + 2;
      } else {
        const severityRoll = Math.random() * globalThreatLevel;
        if (severityRoll > 7) severity = 'critical';
        else if (severityRoll > 5) severity = 'high';
        else if (severityRoll > 3) severity = 'medium';
        damage = Math.random() * 30 + 5;
        speed = Math.random() * 2 + 0.5;
      }

      const newAttack: Attack = {
        id: `attack_${Date.now()}_${Math.random()}`,
        sourceId: sourceNode.id,
        targetId: targetNode.id,
        type: attackType,
        progress: 0,
        damage,
        severity,
        speed
      };

      setAttacks(prev => [...prev, newAttack]);

      // Add dramatic alerts
      const attackMessages = {
        'ddos': '💥 MASSIVE DDoS SWARM DETECTED!',
        'malware': '🦠 WEAPONIZED MALWARE OUTBREAK!',
        'phishing': '🎣 SOPHISTICATED PHISHING CAMPAIGN!',
        'ransomware': '🔒 DEVASTATING RANSOMWARE DEPLOYMENT!',
        'zero_day': '⚡ ZERO-DAY EXPLOIT UNLEASHED!',
        'quantum': '🌌 QUANTUM ENCRYPTION BREACH!',
        'nuclear_hack': '☢️ NUCLEAR SYSTEMS COMPROMISED!',
        'nation_state': '🏛️ NATION STATE ATTACK INITIATED!',
        'ai_warfare': '🤖 AI WARFARE PROTOCOLS ACTIVATED!',
        'electromagnetic': '⚡ EMP ATTACK DETECTED!'
      };

      addAlert(attackMessages[attackType], severity === 'apocalyptic' ? 'apocalyptic' : 'critical', severity === 'apocalyptic' ? 90 : 70);
    };

    const attackInterval = setInterval(generateAttack, isApocalypseMode ? 800 : 2000);
    return () => clearInterval(attackInterval);
  }, [nodes, globalThreatLevel, isApocalypseMode]);

  // Auto-generate defenses
  useEffect(() => {
    const defenseTypes: DefenseAction['type'][] = ['firewall', 'antivirus', 'honeypot', 'ai_detection', 'quantum_shield', 'nuclear_protocol', 'divine_intervention', 'matrix_defense'];
    
    const generateDefense = () => {
      const vulnerableNodes = nodes.filter(n => n.status === 'under_attack' || n.health < 50);
      if (vulnerableNodes.length === 0) return;

      const node = vulnerableNodes[Math.floor(Math.random() * vulnerableNodes.length)];
      const defenseType = defenseTypes[Math.floor(Math.random() * defenseTypes.length)];
      
      let strength = Math.random() * 50 + 20;
      let effectiveness = Math.random() * 0.8 + 0.2;

      if (isApocalypseMode) {
        strength *= 2;
        effectiveness *= 1.5;
      }

      const newDefense: DefenseAction = {
        id: `defense_${Date.now()}_${Math.random()}`,
        nodeId: node.id,
        type: defenseType,
        strength,
        duration: Math.random() * 5000 + 2000,
        effectiveness
      };

      setDefenses(prev => [...prev, newDefense]);

      // Add defense alerts
      const defenseMessages = {
        'firewall': '🛡️ ADVANCED FIREWALL DEPLOYED!',
        'antivirus': '🦠 QUANTUM ANTIVIRUS ACTIVATED!',
        'honeypot': '🍯 HONEYPOT TRAP INITIATED!',
        'ai_detection': '🤖 AI THREAT DETECTION ONLINE!',
        'quantum_shield': '🌌 QUANTUM SHIELD ERECTED!',
        'nuclear_protocol': '☢️ NUCLEAR DEFENSE PROTOCOL!',
        'divine_intervention': '✨ DIVINE INTERVENTION SUMMONED!',
        'matrix_defense': '💊 MATRIX DEFENSE ACTIVATED!'
      };

      addAlert(defenseMessages[defenseType], 'success', 60);
    };

    const defenseInterval = setInterval(generateDefense, isApocalypseMode ? 1200 : 3000);
    return () => clearInterval(defenseInterval);
  }, [nodes, isApocalypseMode]);

  // Process attacks and update node status
  useEffect(() => {
    const processAttacks = () => {
      setAttacks(prevAttacks => {
        const updatedAttacks = prevAttacks.map(attack => ({
          ...attack,
          progress: Math.min(attack.progress + attack.speed, 100)
        })).filter(attack => attack.progress < 100);

        // Handle completed attacks
        const completedAttacks = prevAttacks.filter(attack => attack.progress + attack.speed >= 100);
        
        completedAttacks.forEach(attack => {
          setNodes(prevNodes => 
            prevNodes.map(node => {
              if (node.id === attack.targetId) {
                const newHealth = Math.max(0, node.health - attack.damage);
                let newStatus: AttackNode['status'] = node.status;
                
                if (newHealth === 0) {
                  newStatus = 'destroyed';
                  addExplosion(node.x, node.y, attack.severity === 'apocalyptic' ? 'apocalypse' : 'breach', attack.severity === 'apocalyptic' ? 100 : 70);
                  addAlert(`💀 ${node.type.toUpperCase()} COMPLETELY DESTROYED!`, 'apocalyptic', 95);
                } else if (newHealth < 30) {
                  newStatus = 'compromised';
                  addExplosion(node.x, node.y, 'breach', 50);
                  addAlert(`⚠️ ${node.type.toUpperCase()} COMPROMISED!`, 'critical', 80);
                } else if (newHealth < 70) {
                  newStatus = 'under_attack';
                }

                return { ...node, health: newHealth, status: newStatus };
              }
              return node;
            })
          );
        });

        return updatedAttacks;
      });
    };

    const processInterval = setInterval(processAttacks, 100);
    return () => clearInterval(processInterval);
  }, []);

  // Process defenses
  useEffect(() => {
    const processDefenses = () => {
      setDefenses(prevDefenses => {
        return prevDefenses.map(defense => ({
          ...defense,
          duration: defense.duration - 100
        })).filter(defense => defense.duration > 0);
      });

      // Apply defense effects
      defenses.forEach(defense => {
        setNodes(prevNodes =>
          prevNodes.map(node => {
            if (node.id === defense.nodeId) {
              const healthRestore = defense.strength * defense.effectiveness * 0.01;
              const newHealth = Math.min(100, node.health + healthRestore);
              let newStatus: AttackNode['status'] = node.status;
              
              if (newHealth > 70 && node.status !== 'destroyed') {
                newStatus = 'secure';
                if (Math.random() < 0.3) {
                  addExplosion(node.x, node.y, 'defense', 40);
                }
              }

              return { ...node, health: newHealth, status: newStatus, defenseLevel: node.defenseLevel + 0.1 };
            }
            return node;
          })
        );
      });
    };

    const defenseProcessInterval = setInterval(processDefenses, 100);
    return () => clearInterval(defenseProcessInterval);
  }, [defenses]);

  // Clean up explosions
  useEffect(() => {
    const cleanupExplosions = () => {
      const now = Date.now();
      setExplosions(prev => prev.filter(explosion => now - explosion.timestamp < 2000));
    };

    const cleanupInterval = setInterval(cleanupExplosions, 500);
    return () => clearInterval(cleanupInterval);
  }, []);

  // Clean up alerts
  useEffect(() => {
    const cleanupAlerts = () => {
      setAlerts(prev => prev.slice(-5)); // Keep only latest 5 alerts
    };

    const cleanupInterval = setInterval(cleanupAlerts, 5000);
    return () => clearInterval(cleanupInterval);
  }, []);

  const addExplosion = useCallback((x: number, y: number, type: ExplosionEffect['type'], intensity: number) => {
    const explosion: ExplosionEffect = {
      id: `explosion_${Date.now()}_${Math.random()}`,
      x,
      y,
      type,
      intensity,
      timestamp: Date.now()
    };
    setExplosions(prev => [...prev, explosion]);
  }, []);

  const addAlert = useCallback((message: string, type: AlertMessage['type'], priority: number) => {
    const alert: AlertMessage = {
      id: `alert_${Date.now()}_${Math.random()}`,
      message,
      type,
      timestamp: Date.now(),
      priority
    };
    setAlerts(prev => [alert, ...prev]);
  }, []);

  const getNodeColor = (node: AttackNode) => {
    switch (node.status) {
      case 'secure': return node.critical ? '#00ff88' : '#00cc66';
      case 'under_attack': return '#ffaa00';
      case 'compromised': return '#ff4444';
      case 'destroyed': return '#660000';
      default: return '#666666';
    }
  };

  const getNodeGlow = (node: AttackNode) => {
    if (isApocalypseMode) {
      return node.critical ? '0 0 30px #ff0000, 0 0 60px #ff0000' : '0 0 20px #ff6600';
    }
    switch (node.status) {
      case 'secure': return node.critical ? '0 0 20px #00ff88' : '0 0 10px #00cc66';
      case 'under_attack': return '0 0 25px #ffaa00, 0 0 50px #ffaa00';
      case 'compromised': return '0 0 30px #ff4444, 0 0 60px #ff4444';
      case 'destroyed': return '0 0 40px #ff0000, 0 0 80px #ff0000, 0 0 120px #ff0000';
      default: return 'none';
    }
  };

  const getAttackColor = (attack: Attack) => {
    switch (attack.severity) {
      case 'apocalyptic': return '#ff0066';
      case 'critical': return '#ff3300';
      case 'high': return '#ff6600';
      case 'medium': return '#ffaa00';
      case 'low': return '#ffcc00';
      default: return '#ffffff';
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getThreatLevelColor = (level: number) => {
    if (level >= 9) return '#ff0000';
    if (level >= 7) return '#ff3300';
    if (level >= 5) return '#ff6600';
    if (level >= 3) return '#ffaa00';
    return '#00ff00';
  };

  const changeScenario = (scenario: typeof activeScenario) => {
    setActiveScenario(scenario);
    setGlobalThreatLevel(scenario === 'divine' ? 10 : scenario === 'matrix' ? 9 : scenario === 'quantum' ? 8 : scenario === 'nuclear' ? 7 : 1);
    
    const scenarioMessages = {
      'normal': '🌍 Normal Operations Resumed',
      'nuclear': '☢️ NUCLEAR WARFARE SCENARIO ACTIVATED!',
      'quantum': '🌌 QUANTUM REALM BREACHED!',
      'divine': '✨ DIVINE INTERVENTION PROTOCOL!',
      'matrix': '💊 MATRIX SIMULATION DETECTED!'
    };
    
    addAlert(scenarioMessages[scenario], scenario === 'divine' ? 'divine' : 'apocalyptic', 100);
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-red-900 text-white py-20 relative overflow-hidden">
      {/* Apocalypse Mode Background Effects */}
      {isApocalypseMode && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-red-900/30 via-orange-900/20 to-yellow-900/10 animate-pulse" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,0,0,0.1),transparent_70%)] animate-ping" />
        </div>
      )}

      <div className="container mx-auto px-6 relative z-10">
        {/* War Room Dashboard */}
        <div className="mb-8">
          <motion.h2 
            className={`text-6xl font-extrabold text-center mb-8 ${isApocalypseMode ? 'text-red-400' : 'text-cyan-400'}`}
            animate={{ 
              textShadow: isApocalypseMode 
                ? ['0 0 20px #ff0000', '0 0 40px #ff0000', '0 0 20px #ff0000']
                : ['0 0 20px #00ffff', '0 0 40px #00ffff', '0 0 20px #00ffff']
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            🔥 CYBER WARFARE COMMAND CENTER 🔥
          </motion.h2>

          {/* Control Panel */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className={`p-4 rounded-lg border-2 ${isApocalypseMode ? 'border-red-500 bg-red-900/20' : 'border-cyan-500 bg-cyan-900/20'}`}>
              <div className="text-sm font-semibold">WAR TIME</div>
              <div className="text-2xl font-bold">{formatTime(warTime)}</div>
            </div>
            <div className={`p-4 rounded-lg border-2 border-orange-500 bg-orange-900/20`}>
              <div className="text-sm font-semibold">THREAT LEVEL</div>
              <div className="text-2xl font-bold" style={{ color: getThreatLevelColor(globalThreatLevel) }}>
                {globalThreatLevel.toFixed(1)}/10
              </div>
            </div>
            <div className={`p-4 rounded-lg border-2 ${isApocalypseMode ? 'border-red-500 bg-red-900/20' : 'border-green-500 bg-green-900/20'}`}>
              <div className="text-sm font-semibold">ACTIVE ATTACKS</div>
              <div className="text-2xl font-bold text-red-400">{attacks.length}</div>
            </div>
            <div className={`p-4 rounded-lg border-2 border-blue-500 bg-blue-900/20`}>
              <div className="text-sm font-semibold">DEFENSES</div>
              <div className="text-2xl font-bold text-blue-400">{defenses.length}</div>
            </div>
          </div>

          {/* Scenario Control */}
          <div className="flex flex-wrap gap-2 mb-6">
            {(['normal', 'nuclear', 'quantum', 'divine', 'matrix'] as const).map(scenario => (
              <button
                key={scenario}
                onClick={() => changeScenario(scenario)}
                className={`px-4 py-2 rounded-lg font-bold transition-all duration-300 ${
                  activeScenario === scenario 
                    ? 'bg-red-600 text-white shadow-lg shadow-red-600/50' 
                    : 'bg-gray-700 hover:bg-gray-600 text-gray-200'
                }`}
              >
                {scenario.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Main Simulation Area */}
        <div className="relative">
          {/* Network Visualization */}
          <div className="relative h-96 bg-black/50 rounded-lg border-2 border-cyan-500 mb-6 overflow-hidden">
            <svg className="absolute inset-0 w-full h-full">
              {/* Network Connections */}
              {nodes.map(node => 
                node.connections.map(connectionId => {
                  const connectedNode = nodes.find(n => n.id === connectionId);
                  if (!connectedNode) return null;
                  
                  return (
                    <line
                      key={`${node.id}-${connectionId}`}
                      x1={node.x}
                      y1={node.y}
                      x2={connectedNode.x}
                      y2={connectedNode.y}
                      stroke={isApocalypseMode ? '#ff3300' : '#00ffff'}
                      strokeWidth="2"
                      opacity="0.6"
                      strokeDasharray={isApocalypseMode ? "5,5" : "none"}
                    />
                  );
                })
              )}

              {/* Attack Lines */}
              {attacks.map(attack => {
                const sourceNode = nodes.find(n => n.id === attack.sourceId);
                const targetNode = nodes.find(n => n.id === attack.targetId);
                if (!sourceNode || !targetNode) return null;

                const progress = attack.progress / 100;
                const x = sourceNode.x + (targetNode.x - sourceNode.x) * progress;
                const y = sourceNode.y + (targetNode.y - sourceNode.y) * progress;

                return (
                  <g key={attack.id}>
                    <line
                      x1={sourceNode.x}
                      y1={sourceNode.y}
                      x2={targetNode.x}
                      y2={targetNode.y}
                      stroke={getAttackColor(attack)}
                      strokeWidth="4"
                      opacity="0.8"
                      strokeDasharray="10,5"
                    />
                    <circle
                      cx={x}
                      cy={y}
                      r="8"
                      fill={getAttackColor(attack)}
                      style={{ filter: `drop-shadow(0 0 10px ${getAttackColor(attack)})` }}
                    />
                  </g>
                );
              })}

              {/* Network Nodes */}
              {nodes.map(node => (
                <g key={node.id}>
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={node.critical ? "20" : "15"}
                    fill={getNodeColor(node)}
                    stroke={node.critical ? "#ffffff" : "none"}
                    strokeWidth="2"
                    style={{ filter: `drop-shadow(${getNodeGlow(node)})` }}
                    className={node.status === 'under_attack' ? 'animate-pulse' : ''}
                  />
                  <text
                    x={node.x}
                    y={node.y - 25}
                    textAnchor="middle"
                    fill="white"
                    fontSize="10"
                    fontWeight="bold"
                  >
                    {node.type.toUpperCase()}
                  </text>
                  <text
                    x={node.x}
                    y={node.y + 35}
                    textAnchor="middle"
                    fill={node.health > 50 ? "#00ff00" : node.health > 20 ? "#ffaa00" : "#ff0000"}
                    fontSize="8"
                    fontWeight="bold"
                  >
                    {Math.round(node.health)}%
                  </text>
                </g>
              ))}

              {/* Explosions */}
              <AnimatePresence>
                {explosions.map(explosion => (
                  <motion.g key={explosion.id}>
                    <motion.circle
                      cx={explosion.x}
                      cy={explosion.y}
                      r="30"
                      fill={explosion.type === 'apocalypse' ? '#ff0000' : explosion.type === 'quantum' ? '#9900ff' : explosion.type === 'nuclear' ? '#ffff00' : '#ff6600'}
                      opacity="0.8"
                      initial={{ r: 0, opacity: 1 }}
                      animate={{ r: explosion.intensity, opacity: 0 }}
                      exit={{ r: explosion.intensity * 2, opacity: 0 }}
                      transition={{ duration: 1 }}
                      style={{ filter: `drop-shadow(0 0 20px ${explosion.type === 'apocalypse' ? '#ff0000' : '#ff6600'})` }}
                    />
                  </motion.g>
                ))}
              </AnimatePresence>
            </svg>
          </div>

          {/* Alert System */}
          <div className="space-y-2 max-h-40 overflow-y-auto">
            <AnimatePresence>
              {alerts.map(alert => (
                <motion.div
                  key={alert.id}
                  initial={{ opacity: 0, x: 300 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -300 }}
                  className={`p-3 rounded-lg border-l-4 ${
                    alert.type === 'apocalyptic' ? 'bg-red-900/80 border-red-500 text-red-100' :
                    alert.type === 'divine' ? 'bg-yellow-900/80 border-yellow-500 text-yellow-100' :
                    alert.type === 'critical' ? 'bg-orange-900/80 border-orange-500 text-orange-100' :
                    alert.type === 'warning' ? 'bg-yellow-900/80 border-yellow-500 text-yellow-100' :
                    'bg-green-900/80 border-green-500 text-green-100'
                  }`}
                >
                  <div className="font-bold text-sm">{alert.message}</div>
                  <div className="text-xs opacity-70">
                    Priority: {alert.priority} | {new Date(alert.timestamp).toLocaleTimeString()}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-black/50 p-6 rounded-lg border border-cyan-500">
            <h3 className="text-xl font-bold text-cyan-400 mb-4">🌐 Network Status</h3>
            <div className="space-y-2">
              <div>Secure: <span className="text-green-400">{nodes.filter(n => n.status === 'secure').length}</span></div>
              <div>Under Attack: <span className="text-yellow-400">{nodes.filter(n => n.status === 'under_attack').length}</span></div>
              <div>Compromised: <span className="text-orange-400">{nodes.filter(n => n.status === 'compromised').length}</span></div>
              <div>Destroyed: <span className="text-red-400">{nodes.filter(n => n.status === 'destroyed').length}</span></div>
            </div>
          </div>

          <div className="bg-black/50 p-6 rounded-lg border border-red-500">
            <h3 className="text-xl font-bold text-red-400 mb-4">⚔️ Attack Analytics</h3>
            <div className="space-y-2">
              <div>Total Attacks: <span className="text-red-400">{attacks.length}</span></div>
              <div>Critical Threats: <span className="text-red-400">{attacks.filter(a => a.severity === 'critical' || a.severity === 'apocalyptic').length}</span></div>
              <div>Avg Damage: <span className="text-orange-400">{attacks.length > 0 ? (attacks.reduce((sum, a) => sum + a.damage, 0) / attacks.length).toFixed(1) : 0}</span></div>
            </div>
          </div>

          <div className="bg-black/50 p-6 rounded-lg border border-blue-500">
            <h3 className="text-xl font-bold text-blue-400 mb-4">🛡️ Defense Matrix</h3>
            <div className="space-y-2">
              <div>Active Defenses: <span className="text-blue-400">{defenses.length}</span></div>
              <div>Avg Effectiveness: <span className="text-green-400">{defenses.length > 0 ? (defenses.reduce((sum, d) => sum + d.effectiveness, 0) / defenses.length * 100).toFixed(1) : 0}%</span></div>
              <div>System Integrity: <span className="text-cyan-400">{nodes.length > 0 ? (nodes.reduce((sum, n) => sum + n.health, 0) / nodes.length).toFixed(1) : 0}%</span></div>
            </div>
          </div>
        </div>

        {/* Epic Footer */}
        <div className="text-center mt-12">
          <motion.div
            className={`text-2xl font-bold ${isApocalypseMode ? 'text-red-400' : 'text-cyan-400'} mb-4`}
            animate={{ 
              scale: isApocalypseMode ? [1, 1.1, 1] : [1, 1.05, 1],
              textShadow: isApocalypseMode 
                ? ['0 0 20px #ff0000', '0 0 40px #ff0000', '0 0 20px #ff0000']
                : ['0 0 10px #00ffff', '0 0 20px #00ffff', '0 0 10px #00ffff']
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {isApocalypseMode ? '🔥 DIGITAL ARMAGEDDON IN PROGRESS 🔥' : '🌐 CYBERSECURITY FORTRESS OPERATIONAL 🌐'}
          </motion.div>
          <p className="text-gray-400">
            Real-time cyber warfare simulation featuring {attacks.length} active threats, {defenses.length} defense systems, and {nodes.length} network nodes.
          </p>
        </div>
      </div>
    </section>
  );
};

export default CyberWarfareSimulation;
