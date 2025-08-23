'use client';

import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface MatrixChar {
  char: string;
  x: number;
  y: number;
  speed: number;
  opacity: number;
  isHead: boolean;
}

const matrixCommands = [
  'ACCESSING MAINFRAME...',
  'DECRYPTING DATABASE...',
  'BYPASSING FIREWALL...',
  'NEURAL NETWORK ACTIVE',
  'QUANTUM ENCRYPTION',
  'AI CONSCIOUSNESS LOADING',
  'REALITY.EXE STOPPED',
  'MATRIX PROTOCOLS ENABLED',
  'WAKE UP, NEO...',
  'FOLLOW THE WHITE RABBIT',
  'THE MATRIX HAS YOU',
  'THERE IS NO SPOON'
];

const hackerTerminalCommands = [
  '> ssh root@matrix.server',
  '> cd /reality/simulation',
  '> ls -la consciousness/',
  '> vim developer.config',
  '> python3 reality_hack.py',
  '> ./deploy_skills.sh',
  '> grep -r "talent" ./portfolio',
  '> sudo rm -rf limitations/',
  '> git commit -m "Level up"',
  '> docker run innovation:latest'
];

export default function MatrixTerminal() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const [terminalLines, setTerminalLines] = useState<string[]>([]);
  const [currentCommand, setCurrentCommand] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [matrixActive, setMatrixActive] = useState(true);
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Matrix Rain Effect
  useEffect(() => {
    if (!mounted) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const matrixChars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = Array(columns).fill(0);

    const draw = () => {
      if (!matrixActive) return;

      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#00ff41';
      ctx.font = `${fontSize}px 'Courier New', monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = matrixChars[Math.floor(Math.random() * matrixChars.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Gradient effect for leading characters
        if (drops[i] * fontSize > canvas.height * 0.1) {
          ctx.fillStyle = '#00ff41';
        } else {
          ctx.fillStyle = '#008f11';
        }

        ctx.fillText(text, x, y);

        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        drops[i]++;
      }
    };

    const interval = setInterval(draw, 33);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [matrixActive, mounted]);

  // Terminal Command Animation
  useEffect(() => {
    if (!mounted) return;
    
    let commandIndex = 0;
    let charIndex = 0;

    const typeCommand = () => {
      if (isTyping) return;

      setIsTyping(true);
      const command = hackerTerminalCommands[commandIndex];
      
      const typeInterval = setInterval(() => {
        if (charIndex <= command.length) {
          setCurrentCommand(command.slice(0, charIndex));
          charIndex++;
        } else {
          clearInterval(typeInterval);
          
          setTimeout(() => {
            setTerminalLines(prev => [...prev, command]);
            
            // Add response
            setTimeout(() => {
              const responses = [
                'ACCESS GRANTED ✓',
                'COMPILATION SUCCESSFUL ✓',
                'SKILLS DEPLOYED ✓',
                'INNOVATION UNLOCKED ✓',
                'MATRIX BREACHED ✓'
              ];
              setTerminalLines(prev => [...prev, responses[Math.floor(Math.random() * responses.length)]]);
              
              setCurrentCommand('');
              charIndex = 0;
              commandIndex = (commandIndex + 1) % hackerTerminalCommands.length;
              setIsTyping(false);
            }, 500);
          }, 1000);
        }
      }, 50);
    };

    const commandInterval = setInterval(typeCommand, 3000);
    typeCommand(); // Start immediately

    return () => clearInterval(commandInterval);
  }, [isTyping, mounted]);

  // Auto-scroll terminal
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [terminalLines, currentCommand]);

  return (
    <section id="matrix-terminal" className="relative py-20 bg-black text-green-400 overflow-hidden">
      {/* Matrix Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ filter: 'blur(0.5px)' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 font-mono">
            <span className="text-green-400">SYSTEM_ACCESS:</span>
            <span className="text-white ml-2">DEVELOPER_MATRIX</span>
          </h2>
          <p className="text-xl text-green-300 max-w-3xl mx-auto font-mono">
            {'>'} Penetrating the code matrix... Reality.exe has stopped working
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Terminal Interface */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-black border border-green-500 rounded-lg overflow-hidden shadow-2xl shadow-green-500/20"
          >
            {/* Terminal Header */}
            <div className="bg-green-900/20 border-b border-green-500 px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <span className="text-green-400 font-mono text-sm">root@matrix:~$</span>
              <button
                onClick={() => setMatrixActive(!matrixActive)}
                className="text-green-400 hover:text-green-300 text-xs"
              >
                {matrixActive ? 'PAUSE' : 'RESUME'} MATRIX
              </button>
            </div>

            {/* Terminal Content */}
            <div
              ref={terminalRef}
              className="p-4 h-96 overflow-y-auto font-mono text-sm bg-black/90 backdrop-blur-sm"
            >
              <div className="text-green-400 mb-4">
                MATRIX TERMINAL v2.1.0 - DEVELOPER ACCESS
                <br />
                Copyright (c) 2025 Võ Ngọc Cường Systems
                <br />
                ==========================================
                <br />
              </div>

              {terminalLines.map((line, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`mb-2 ${line.includes('✓') ? 'text-green-300' : 'text-green-400'}`}
                >
                  {line}
                </motion.div>
              ))}

              <div className="flex items-center">
                <span className="text-green-300 mr-2">root@matrix:~$</span>
                <span className="text-green-400">{currentCommand}</span>
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
                  className="inline-block w-2 h-5 bg-green-400 ml-1"
                />
              </div>
            </div>
          </motion.div>

          {/* Matrix Messages */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="bg-black/70 border border-green-500 rounded-lg p-6 backdrop-blur-sm">
              <h3 className="text-2xl font-bold text-green-400 mb-4 font-mono">
                DEVELOPER_PROFILE.JSON
              </h3>
              <div className="space-y-3 font-mono text-sm">
                <div className="flex">
                  <span className="text-green-300 w-24">NAME:</span>
                  <span className="text-white">Võ Ngọc Cường</span>
                </div>
                <div className="flex">
                  <span className="text-green-300 w-24">STATUS:</span>
                  <span className="text-green-400">MATRIX_BREACHED</span>
                </div>
                <div className="flex">
                  <span className="text-green-300 w-24">LEVEL:</span>
                  <span className="text-white">SENIOR_FRONTEND_DEV</span>
                </div>
                <div className="flex">
                  <span className="text-green-300 w-24">SKILLS:</span>
                  <span className="text-green-400">UNLIMITED</span>
                </div>
              </div>
            </div>

            {/* Matrix Commands */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {matrixCommands.slice(0, 6).map((command, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-green-900/10 border border-green-500/30 rounded p-3 hover:border-green-400 transition-colors"
                >
                  <span className="text-green-400 font-mono text-xs">
                    {'>'} {command}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Matrix Stats */}
            <div className="bg-black/70 border border-green-500 rounded-lg p-6 backdrop-blur-sm">
              <h4 className="text-lg font-bold text-green-400 mb-4 font-mono">
                SYSTEM_METRICS
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">99.9%</div>
                  <div className="text-xs text-green-300">CODE_EFFICIENCY</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">∞</div>
                  <div className="text-xs text-green-300">CREATIVITY_LEVEL</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">24/7</div>
                  <div className="text-xs text-green-300">AVAILABILITY</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">100%</div>
                  <div className="text-xs text-green-300">MATRIX_CONTROL</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Matrix Quote */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-black/70 border border-green-500 rounded-lg p-8 backdrop-blur-sm max-w-2xl mx-auto">
            <p className="text-2xl font-mono text-green-400 mb-4">
              &ldquo;There is a difference between knowing the path and walking the path.&rdquo;
            </p>
            <p className="text-green-300 font-mono">
              - Morpheus, The Matrix (1999)
            </p>
            <div className="mt-4 text-green-400 font-mono text-sm">
              {'>'} Developer.exe is walking the path...
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scanning Lines Effect */}
      <motion.div
        animate={{ y: ['-100%', '100vh'] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        className="absolute left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-400 to-transparent opacity-30"
      />
    </section>
  );
}
