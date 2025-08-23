'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface HackingLine {
  id: string;
  text: string;
  type: 'info' | 'warning' | 'error' | 'success' | 'command' | 'breach' | 'critical';
  timestamp: string;
}

interface NetworkNode {
  id: string;
  name: string;
  x: number;
  y: number;
  status: 'secure' | 'scanning' | 'attacking' | 'compromised' | 'breached' | 'destroyed';
  connections: string[];
  health: number;
  ip: string;
}

interface AttackEffect {
  id: string;
  x: number;
  y: number;
  type: 'laser' | 'explosion' | 'breach' | 'scan';
  timestamp: number;
}

interface AttackPath {
  id: string;
  sourceId: string;
  targetId: string;
  progress: number;
  active: boolean;
}

const CyberWarfareSimulation = () => {
  const [hackingLines, setHackingLines] = useState<HackingLine[]>([]);
  const [nodes, setNodes] = useState<NetworkNode[]>([]);
  const [isAttacking, setIsAttacking] = useState(false);
  const [currentTarget, setCurrentTarget] = useState<string>('');
  const [attackEffects, setAttackEffects] = useState<AttackEffect[]>([]);
  const [attackPaths, setAttackPaths] = useState<AttackPath[]>([]);
  const [compromisedCount, setCompromisedCount] = useState(0);
  const terminalRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Initialize network nodes
  useEffect(() => {
    const initialNodes: NetworkNode[] = [
      { id: 'firewall', name: 'Firewall', x: 20, y: 50, status: 'secure', connections: ['server1', 'database'], health: 100, ip: '192.168.1.1' },
      { id: 'server1', name: 'Web Server', x: 50, y: 30, status: 'secure', connections: ['database', 'admin'], health: 100, ip: '192.168.1.10' },
      { id: 'database', name: 'Database', x: 80, y: 50, status: 'secure', connections: ['admin'], health: 100, ip: '192.168.1.20' },
      { id: 'admin', name: 'Admin Panel', x: 50, y: 70, status: 'secure', connections: [], health: 100, ip: '192.168.1.30' },
      { id: 'backup', name: 'Backup Server', x: 20, y: 80, status: 'secure', connections: ['database'], health: 100, ip: '192.168.1.40' },
      { id: 'router', name: 'Core Router', x: 80, y: 20, status: 'secure', connections: ['firewall', 'server1'], health: 100, ip: '192.168.1.254' }
    ];
    setNodes(initialNodes);
  }, []);

  const addHackingLine = (text: string, type: HackingLine['type'] = 'info') => {
    const newLine: HackingLine = {
      id: Date.now().toString(),
      text,
      type,
      timestamp: new Date().toLocaleTimeString()
    };
    
    setHackingLines(prev => {
      const updated = [...prev, newLine];
      return updated.slice(-50); // Keep only last 50 lines
    });
  };

  const addAttackEffect = (x: number, y: number, type: AttackEffect['type']) => {
    const effect: AttackEffect = {
      id: Date.now().toString(),
      x,
      y,
      type,
      timestamp: Date.now()
    };
    setAttackEffects(prev => [...prev, effect]);
    
    // Remove effect after animation
    setTimeout(() => {
      setAttackEffects(prev => prev.filter(e => e.id !== effect.id));
    }, 2000);
  };

  const createAttackPath = (sourceId: string, targetId: string) => {
    const path: AttackPath = {
      id: `${sourceId}-${targetId}`,
      sourceId,
      targetId,
      progress: 0,
      active: true
    };
    setAttackPaths(prev => [...prev, path]);
    return path;
  };

  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const updateNodeStatus = (nodeId: string, status: NetworkNode['status'], health?: number) => {
    setNodes(prev => prev.map(node => {
      if (node.id === nodeId) {
        const updatedNode = { ...node, status };
        if (health !== undefined) updatedNode.health = health;
        return updatedNode;
      }
      return node;
    }));

    // Add attack effect when node is compromised
    if (status === 'compromised' || status === 'breached' || status === 'destroyed') {
      const node = nodes.find(n => n.id === nodeId);
      if (node) {
        addAttackEffect(node.x, node.y, status === 'destroyed' ? 'explosion' : 'breach');
        
        // Console output when target is "hạ gục"
        if (status === 'breached' || status === 'destroyed') {
          setCompromisedCount(prev => prev + 1);
          addHackingLine(`[TARGET DOWN] ${node.name} (${node.ip}) has been ELIMINATED!`, 'breach');
          addHackingLine(`[SYSTEM BREACH] Access gained to ${node.name}`, 'critical');
          addHackingLine(`[DATA EXTRACTION] Downloading sensitive files...`, 'warning');
          addHackingLine(`[BACKDOOR INSTALLED] Persistent access established`, 'success');
        }
      }
    }
  };

  const startAttackSequence = async () => {
    if (isAttacking) return;
    
    setIsAttacking(true);
    setHackingLines([]);
    setCompromisedCount(0);
    
    // Phase 1: Initial Reconnaissance
    addHackingLine('╔══════════════════════════════════════╗', 'critical');
    addHackingLine('║     CYBER WARFARE PROTOCOL v3.0     ║', 'critical');
    addHackingLine('║        OPERATION: BLACK STORM       ║', 'critical');
    addHackingLine('╚══════════════════════════════════════╝', 'critical');
    await sleep(1000);
    
    addHackingLine('> Initializing advanced reconnaissance...', 'command');
    await sleep(500);
    addHackingLine('> nmap -sS -sV -O --script vuln 192.168.1.0/24', 'command');
    await sleep(1200);
    
    // Scanning phase with visual effects
    for (const node of nodes) {
      updateNodeStatus(node.id, 'scanning');
      addAttackEffect(node.x, node.y, 'scan');
      addHackingLine(`[SCAN] Probing ${node.ip} (${node.name})...`, 'info');
      await sleep(300);
    }
    
    await sleep(800);
    addHackingLine('║ VULNERABILITIES DETECTED ║', 'warning');
    addHackingLine('[!] CVE-2024-1337 - Critical RCE on 192.168.1.1', 'warning');
    addHackingLine('[!] CVE-2024-666 - Privilege Escalation on 192.168.1.10', 'warning');
    addHackingLine('[!] SQL Injection vulnerability detected on 192.168.1.20', 'warning');
    
    // Phase 2: Initial Breach - Firewall
    await sleep(1000);
    addHackingLine('> Launching EternalBlue exploit against firewall...', 'command');
    setCurrentTarget('firewall');
    updateNodeStatus('firewall', 'attacking');
    
    createAttackPath('external', 'firewall');
    
    await sleep(2000);
    addHackingLine('[*] Exploit successful! Shell obtained on 192.168.1.1', 'success');
    addHackingLine('[*] Firewall rules disabled', 'success');
    updateNodeStatus('firewall', 'compromised', 60);
    
    await sleep(800);
    
    // Phase 3: Lateral Movement - Web Server
    addHackingLine('> Pivoting to internal network...', 'command');
    setCurrentTarget('server1');
    updateNodeStatus('server1', 'attacking');
    
    await sleep(1500);
    addHackingLine('[*] Credential stuffing attack successful', 'success');
    addHackingLine('[*] Web shell uploaded: /var/www/html/backdoor.php', 'success');
    updateNodeStatus('server1', 'breached', 0);
    
    // Phase 4: Database Infiltration
    await sleep(1000);
    addHackingLine('> Attacking database server...', 'command');
    setCurrentTarget('database');
    updateNodeStatus('database', 'attacking');
    
    await sleep(2000);
    addHackingLine('[*] SQL injection successful!', 'success');
    addHackingLine('[*] Database root access obtained', 'success');
    addHackingLine('[*] Extracting 500,000 user records...', 'warning');
    updateNodeStatus('database', 'destroyed', 0);
    
    // Phase 5: Admin Panel Takeover
    await sleep(1200);
    addHackingLine('> Compromising admin panel...', 'command');
    setCurrentTarget('admin');
    updateNodeStatus('admin', 'attacking');
    
    await sleep(1800);
    addHackingLine('[*] Admin credentials cracked: admin:password123', 'success');
    addHackingLine('[*] Full administrative access granted', 'success');
    updateNodeStatus('admin', 'breached', 0);
    
    // Phase 6: Backup Server Destruction
    await sleep(1000);
    addHackingLine('> Targeting backup systems...', 'command');
    setCurrentTarget('backup');
    updateNodeStatus('backup', 'attacking');
    
    await sleep(1500);
    addHackingLine('[*] Backup encryption keys stolen', 'success');
    addHackingLine('[*] All backup files corrupted', 'critical');
    updateNodeStatus('backup', 'destroyed', 0);
    
    // Phase 7: Core Router Annihilation
    await sleep(1000);
    addHackingLine('> Final target: Core infrastructure...', 'command');
    setCurrentTarget('router');
    updateNodeStatus('router', 'attacking');
    
    await sleep(2000);
    addHackingLine('[*] Router firmware exploited', 'success');
    addHackingLine('[*] Network traffic redirected', 'critical');
    addHackingLine('[*] TOTAL NETWORK COLLAPSE INITIATED', 'critical');
    updateNodeStatus('router', 'destroyed', 0);
    
    // Final Phase: Mission Summary
    await sleep(2000);
    addHackingLine('', 'info');
    addHackingLine('╔═══════════════════════════════════════╗', 'breach');
    addHackingLine('║         MISSION ACCOMPLISHED         ║', 'breach');
    addHackingLine('║      ALL TARGETS ELIMINATED         ║', 'breach');
    addHackingLine('╚═══════════════════════════════════════╝', 'breach');
    addHackingLine('', 'info');
    addHackingLine('📊 DAMAGE REPORT:', 'critical');
    addHackingLine('├─ Systems Compromised: 6/6', 'critical');
    addHackingLine('├─ Data Stolen: 2.5TB', 'critical');
    addHackingLine('├─ Financial Loss: $75,000,000', 'critical');
    addHackingLine('├─ Recovery Time: 6+ months', 'critical');
    addHackingLine('└─ Reputation Damage: Irreversible', 'critical');
    
    setTimeout(() => setIsAttacking(false), 3000);
  };

  const resetSimulation = () => {
    setIsAttacking(false);
    setCurrentTarget('');
    setHackingLines([]);
    setCompromisedCount(0);
    setAttackEffects([]);
    setAttackPaths([]);
    setNodes(prev => prev.map(node => ({ ...node, status: 'secure', health: 100 })));
  };

  // Auto scroll terminal
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [hackingLines]);

  const getNodeColor = (status: NetworkNode['status']) => {
    switch (status) {
      case 'secure': return '#00ff00';
      case 'scanning': return '#00ffff';
      case 'attacking': return '#ffff00';
      case 'compromised': return '#ff8800';
      case 'breached': return '#ff4400';
      case 'destroyed': return '#ff0000';
      default: return '#00ff00';
    }
  };

  const getLineColor = (type: HackingLine['type']) => {
    switch (type) {
      case 'command': return 'text-cyan-400';
      case 'info': return 'text-green-400';
      case 'warning': return 'text-yellow-400';
      case 'error': return 'text-red-400';
      case 'success': return 'text-green-300';
      case 'breach': return 'text-red-500 font-bold';
      case 'critical': return 'text-red-600 font-bold';
      default: return 'text-gray-300';
    }
  };

  return (
    <section id="cyber-warfare" className="min-h-screen bg-black text-green-400 py-20 relative overflow-hidden">
      {/* Matrix Rain Background */}
      <div className="absolute inset-0 opacity-10">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-green-500 text-xs font-mono"
            style={{ left: `${i * 5}%` }}
            animate={{
              y: [-100, typeof window !== 'undefined' ? window.innerHeight + 100 : 1000],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {Array.from({ length: 50 }).map((_, j) => (
              <div key={j}>
                {String.fromCharCode(Math.random() * 94 + 33)}
              </div>
            ))}
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-red-500 via-yellow-500 to-red-500 bg-clip-text text-transparent">
              CYBER WARFARE SIMULATOR
            </span>
          </h2>
          <p className="text-gray-400 text-xl">Real-time Network Penetration Testing</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Network Visualization */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-gray-900 rounded-lg p-6 border border-green-500"
          >
            <h3 className="text-xl font-bold mb-4 text-center">Network Topology</h3>
            <div className="relative h-96 bg-black rounded border">
              <svg width="100%" height="100%" className="absolute inset-0">
                {/* Draw connections */}
                {nodes.map(node => 
                  node.connections.map(connId => {
                    const targetNode = nodes.find(n => n.id === connId);
                    if (!targetNode) return null;
                    
                    return (
                      <line
                        key={`${node.id}-${connId}`}
                        x1={`${node.x}%`}
                        y1={`${node.y}%`}
                        x2={`${targetNode.x}%`}
                        y2={`${targetNode.y}%`}
                        stroke={currentTarget === node.id || currentTarget === connId ? '#ff0000' : '#333'}
                        strokeWidth="2"
                        className="transition-all duration-500"
                      />
                    );
                  })
                )}
                
                {/* Draw nodes */}
                {nodes.map(node => (
                  <g key={node.id}>
                    <motion.circle
                      cx={`${node.x}%`}
                      cy={`${node.y}%`}
                      r="8"
                      fill={getNodeColor(node.status)}
                      stroke="#fff"
                      strokeWidth="2"
                      animate={{
                        r: currentTarget === node.id ? [8, 12, 8] : 8,
                        opacity: node.status === 'attacking' ? [1, 0.5, 1] : 1,
                        fill: getNodeColor(node.status),
                      }}
                      transition={{
                        duration: 1,
                        repeat: currentTarget === node.id ? Infinity : 0,
                      }}
                    />
                    {/* Health bar */}
                    {node.health < 100 && (
                      <g>
                        <rect
                          x={`${node.x - 3}%`}
                          y={`${node.y - 15}%`}
                          width="6%"
                          height="2%"
                          fill="#333"
                          rx="1"
                        />
                        <rect
                          x={`${node.x - 3}%`}
                          y={`${node.y - 15}%`}
                          width={`${(node.health / 100) * 6}%`}
                          height="2%"
                          fill={node.health > 50 ? '#00ff00' : node.health > 25 ? '#ffff00' : '#ff0000'}
                          rx="1"
                        />
                      </g>
                    )}
                    <text
                      x={`${node.x}%`}
                      y={`${node.y + 8}%`}
                      textAnchor="middle"
                      className="text-xs fill-white font-mono"
                    >
                      {node.name}
                    </text>
                    <text
                      x={`${node.x}%`}
                      y={`${node.y + 12}%`}
                      textAnchor="middle"
                      className="text-[10px] fill-gray-400 font-mono"
                    >
                      {node.ip}
                    </text>
                  </g>
                ))}
              </svg>
            </div>
            
            <div className="mt-4 flex justify-center space-x-4">
              <button
                onClick={startAttackSequence}
                disabled={isAttacking}
                className="bg-red-600 hover:bg-red-700 disabled:bg-gray-600 px-6 py-2 rounded font-bold transition-colors"
              >
                {isAttacking ? 'ATTACKING...' : 'LAUNCH ATTACK'}
              </button>
              <button
                onClick={resetSimulation}
                className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded font-bold transition-colors"
              >
                RESET
              </button>
            </div>
          </motion.div>

          {/* Terminal Output */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-black rounded-lg border border-green-500 p-4"
          >
            <div className="flex items-center mb-4">
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <span className="ml-4 text-gray-400 font-mono">root@blackhat-terminal</span>
            </div>
            
            <div
              ref={terminalRef}
              className="h-96 overflow-y-auto font-mono text-sm space-y-1 bg-black p-2 rounded"
            >
              <AnimatePresence>
                {hackingLines.map(line => (
                  <motion.div
                    key={line.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    className={`${getLineColor(line.type)} flex`}
                  >
                    <span className="text-gray-500 mr-2">{line.timestamp}</span>
                    <span className="flex-1">{line.text}</span>
                  </motion.div>
                ))}
              </AnimatePresence>
              
              {isAttacking && (
                <motion.div
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="text-green-400"
                >
                  ▊
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Attack Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 grid grid-cols-2 md:grid-cols-5 gap-4"
        >
          <div className="bg-gray-900 p-4 rounded border border-red-500 text-center">
            <div className="text-2xl font-bold text-red-400">
              {nodes.filter(n => n.status === 'destroyed').length}
            </div>
            <div className="text-sm text-gray-400">Destroyed</div>
          </div>
          <div className="bg-gray-900 p-4 rounded border border-orange-500 text-center">
            <div className="text-2xl font-bold text-orange-400">
              {nodes.filter(n => n.status === 'breached').length}
            </div>
            <div className="text-sm text-gray-400">Breached</div>
          </div>
          <div className="bg-gray-900 p-4 rounded border border-yellow-500 text-center">
            <div className="text-2xl font-bold text-yellow-400">
              {nodes.filter(n => n.status === 'compromised').length}
            </div>
            <div className="text-sm text-gray-400">Compromised</div>
          </div>
          <div className="bg-gray-900 p-4 rounded border border-green-500 text-center">
            <div className="text-2xl font-bold text-green-400">
              {hackingLines.length}
            </div>
            <div className="text-sm text-gray-400">Commands</div>
          </div>
          <div className="bg-gray-900 p-4 rounded border border-blue-500 text-center">
            <div className="text-2xl font-bold text-blue-400">
              {isAttacking ? 'ACTIVE' : 'STANDBY'}
            </div>
            <div className="text-sm text-gray-400">Status</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CyberWarfareSimulation;
