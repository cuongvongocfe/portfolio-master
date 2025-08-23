'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface HackingLine {
  id: string;
  text: string;
  type: 'info' | 'warning' | 'error' | 'success' | 'command';
  timestamp: string;
}

interface NetworkNode {
  id: string;
  name: string;
  x: number;
  y: number;
  status: 'secure' | 'compromised' | 'attacking' | 'breached';
  connections: string[];
}

const CyberWarfareSimulation = () => {
  const [hackingLines, setHackingLines] = useState<HackingLine[]>([]);
  const [nodes, setNodes] = useState<NetworkNode[]>([]);
  const [isAttacking, setIsAttacking] = useState(false);
  const [currentTarget, setCurrentTarget] = useState<string>('');
  const terminalRef = useRef<HTMLDivElement>(null);

  // Initialize network nodes
  useEffect(() => {
    const initialNodes: NetworkNode[] = [
      { id: 'firewall', name: 'Firewall', x: 20, y: 50, status: 'secure', connections: ['server1', 'database'] },
      { id: 'server1', name: 'Web Server', x: 50, y: 30, status: 'secure', connections: ['database', 'admin'] },
      { id: 'database', name: 'Database', x: 80, y: 50, status: 'secure', connections: ['admin'] },
      { id: 'admin', name: 'Admin Panel', x: 50, y: 70, status: 'secure', connections: [] },
      { id: 'backup', name: 'Backup Server', x: 20, y: 80, status: 'secure', connections: ['database'] },
      { id: 'router', name: 'Core Router', x: 80, y: 20, status: 'secure', connections: ['firewall', 'server1'] }
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

  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const updateNodeStatus = (nodeId: string, status: NetworkNode['status']) => {
    setNodes(prev => prev.map(node => 
      node.id === nodeId ? { ...node, status } : node
    ));
  };

  const startAttackSequence = async () => {
    if (isAttacking) return;
    
    setIsAttacking(true);
    setHackingLines([]);
    
    // Phase 1: Reconnaissance
    addHackingLine('INITIATING CYBER WARFARE PROTOCOL...', 'command');
    await sleep(1000);
    addHackingLine('> nmap -sS -O target_network', 'command');
    await sleep(800);
    addHackingLine('Starting Nmap 7.94 ( https://nmap.org )', 'info');
    await sleep(500);
    addHackingLine('Nmap scan report for 192.168.1.0/24', 'info');
    await sleep(300);
    addHackingLine('Host is up (0.00012s latency).', 'success');
    
    // Phase 2: Vulnerability Scanning
    await sleep(1000);
    addHackingLine('> python3 exploit_scanner.py --target firewall', 'command');
    await sleep(1200);
    addHackingLine('[!] CVE-2024-1337 detected on port 443', 'warning');
    addHackingLine('[!] Buffer overflow vulnerability found', 'warning');
    
    // Phase 3: Initial Breach
    await sleep(800);
    addHackingLine('> msfconsole', 'command');
    await sleep(500);
    addHackingLine('msf6 > use exploit/windows/smb/ms17_010_eternalblue', 'command');
    await sleep(600);
    addHackingLine('msf6 exploit(windows/smb/ms17_010_eternalblue) > set RHOSTS 192.168.1.10', 'command');
    await sleep(400);
    addHackingLine('RHOSTS => 192.168.1.10', 'info');
    await sleep(300);
    addHackingLine('msf6 exploit(windows/smb/ms17_010_eternalblue) > exploit', 'command');
    
    // Start attacking firewall
    setCurrentTarget('firewall');
    updateNodeStatus('firewall', 'attacking');
    
    await sleep(2000);
    addHackingLine('[*] Started reverse TCP handler on 0.0.0.0:4444', 'info');
    await sleep(1000);
    addHackingLine('[*] 192.168.1.10:445 - Connecting to target for exploitation.', 'info');
    await sleep(1500);
    addHackingLine('[+] 192.168.1.10:445 - Connection established for exploitation.', 'success');
    await sleep(800);
    addHackingLine('[*] Sending stage (175174 bytes) to 192.168.1.10', 'info');
    await sleep(1200);
    addHackingLine('[*] Meterpreter session 1 opened', 'success');
    
    updateNodeStatus('firewall', 'compromised');
    
    // Phase 4: Lateral Movement
    await sleep(1000);
    addHackingLine('meterpreter > sysinfo', 'command');
    await sleep(500);
    addHackingLine('Computer        : FIREWALL-01', 'info');
    addHackingLine('OS              : Windows Server 2019', 'info');
    addHackingLine('Architecture    : x64', 'info');
    
    await sleep(800);
    addHackingLine('meterpreter > run post/windows/gather/hashdump', 'command');
    await sleep(1500);
    addHackingLine('[*] Obtaining the boot key...', 'info');
    await sleep(800);
    addHackingLine('[*] Calculating the hboot key using SYSKEY...', 'info');
    await sleep(1000);
    addHackingLine('[*] Obtaining the user list and keys...', 'info');
    await sleep(1200);
    addHackingLine('[+] Administrator:500:aad3b435b51404eeaad3b435b51404ee:31d6cfe0d16ae931b73c59d7e0c089c0:::', 'success');
    
    // Phase 5: Escalate to Web Server
    await sleep(1000);
    setCurrentTarget('server1');
    updateNodeStatus('server1', 'attacking');
    
    addHackingLine('> python3 lateral_movement.py --target web_server', 'command');
    await sleep(1500);
    addHackingLine('[*] Attempting credential stuffing attack...', 'info');
    await sleep(1000);
    addHackingLine('[+] Valid credentials found: admin:password123', 'success');
    await sleep(800);
    addHackingLine('[*] Uploading web shell to /var/www/html/shell.php', 'info');
    await sleep(1200);
    addHackingLine('[+] Web shell uploaded successfully', 'success');
    
    updateNodeStatus('server1', 'compromised');
    
    // Phase 6: Database Breach
    await sleep(1000);
    setCurrentTarget('database');
    updateNodeStatus('database', 'attacking');
    
    addHackingLine('> sqlmap -u "http://target/search.php?id=1" --dbs', 'command');
    await sleep(2000);
    addHackingLine('[*] Testing connection to the target URL', 'info');
    await sleep(800);
    addHackingLine('[*] Testing if the target URL content is stable', 'info');
    await sleep(1000);
    addHackingLine('[+] Target URL content is stable', 'success');
    await sleep(600);
    addHackingLine('[*] Testing for SQL injection on GET parameter "id"', 'info');
    await sleep(1500);
    addHackingLine('[+] GET parameter "id" is vulnerable to SQL injection', 'success');
    await sleep(1000);
    addHackingLine('Available databases:', 'info');
    addHackingLine('[*] users_db', 'warning');
    addHackingLine('[*] financial_records', 'warning');
    addHackingLine('[*] customer_data', 'warning');
    
    updateNodeStatus('database', 'breached');
    
    // Phase 7: Data Exfiltration
    await sleep(1200);
    addHackingLine('> python3 data_exfil.py --database financial_records', 'command');
    await sleep(1000);
    addHackingLine('[*] Connecting to database...', 'info');
    await sleep(800);
    addHackingLine('[*] Extracting table: credit_cards', 'warning');
    await sleep(1500);
    addHackingLine('[+] 50,000 credit card records extracted', 'error');
    await sleep(600);
    addHackingLine('[*] Extracting table: bank_accounts', 'warning');
    await sleep(1200);
    addHackingLine('[+] 25,000 bank account records extracted', 'error');
    
    // Phase 8: Ransomware Deployment
    await sleep(1000);
    setCurrentTarget('admin');
    updateNodeStatus('admin', 'attacking');
    
    addHackingLine('> python3 ransomware_deploy.py --encrypt-all', 'command');
    await sleep(1000);
    addHackingLine('[*] Deploying Blackout Ransomware v3.0...', 'error');
    await sleep(1500);
    addHackingLine('[*] Encrypting files...', 'error');
    await sleep(2000);
    addHackingLine('[+] 1,250,000 files encrypted successfully', 'error');
    await sleep(800);
    addHackingLine('[+] Ransom note deployed to all systems', 'error');
    
    updateNodeStatus('admin', 'breached');
    updateNodeStatus('backup', 'breached');
    updateNodeStatus('router', 'breached');
    
    // Final Phase: Mission Complete
    await sleep(1500);
    addHackingLine('=== CYBER WARFARE MISSION COMPLETE ===', 'error');
    addHackingLine('> Total systems compromised: 6/6', 'error');
    addHackingLine('> Data exfiltrated: 2.5TB', 'error');
    addHackingLine('> Estimated damage: $50,000,000', 'error');
    addHackingLine('> Time to detection: 47 minutes', 'error');
    
    setTimeout(() => setIsAttacking(false), 3000);
  };

  const resetSimulation = () => {
    setIsAttacking(false);
    setCurrentTarget('');
    setHackingLines([]);
    setNodes(prev => prev.map(node => ({ ...node, status: 'secure' })));
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
      case 'attacking': return '#ffff00';
      case 'compromised': return '#ff8800';
      case 'breached': return '#ff0000';
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
                      }}
                      transition={{
                        duration: 1,
                        repeat: currentTarget === node.id ? Infinity : 0,
                      }}
                    />
                    <text
                      x={`${node.x}%`}
                      y={`${node.y + 8}%`}
                      textAnchor="middle"
                      className="text-xs fill-white font-mono"
                    >
                      {node.name}
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
          className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          <div className="bg-gray-900 p-4 rounded border border-red-500 text-center">
            <div className="text-2xl font-bold text-red-400">
              {nodes.filter(n => n.status === 'breached').length}
            </div>
            <div className="text-sm text-gray-400">Systems Breached</div>
          </div>
          <div className="bg-gray-900 p-4 rounded border border-yellow-500 text-center">
            <div className="text-2xl font-bold text-yellow-400">
              {nodes.filter(n => n.status === 'compromised').length}
            </div>
            <div className="text-sm text-gray-400">Systems Compromised</div>
          </div>
          <div className="bg-gray-900 p-4 rounded border border-green-500 text-center">
            <div className="text-2xl font-bold text-green-400">
              {hackingLines.length}
            </div>
            <div className="text-sm text-gray-400">Commands Executed</div>
          </div>
          <div className="bg-gray-900 p-4 rounded border border-blue-500 text-center">
            <div className="text-2xl font-bold text-blue-400">
              {isAttacking ? 'ACTIVE' : 'STANDBY'}
            </div>
            <div className="text-sm text-gray-400">Attack Status</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CyberWarfareSimulation;
