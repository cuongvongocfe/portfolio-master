'use client';

import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface ParticleSystem {
  name: string;
  description: string;
  particleCount: number;
  color: string;
  pattern: string;
}

const particleSystems: ParticleSystem[] = [
  {
    name: 'Neural Network',
    description: 'AI-inspired particle connections',
    particleCount: 200,
    color: '#00ff88',
    pattern: 'neural'
  },
  {
    name: 'Galaxy Spiral',
    description: 'Gravitational particle simulation',
    particleCount: 300,
    color: '#8844ff',
    pattern: 'spiral'
  },
  {
    name: 'Wave Function',
    description: 'Quantum mechanics visualization',
    particleCount: 150,
    color: '#ff4488',
    pattern: 'wave'
  },
  {
    name: 'Fractal Cloud',
    description: 'Self-similar particle distribution',
    particleCount: 250,
    color: '#44ffff',
    pattern: 'fractal'
  }
];

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  life: number;
  maxLife: number;
  hue: number;
}

export default function WebGLParticleSystem() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const [selectedSystem, setSelectedSystem] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  const [particleCount, setParticleCount] = useState(200);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize particles
    const initParticles = () => {
      particlesRef.current = [];
      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.offsetWidth,
          y: Math.random() * canvas.offsetHeight,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2,
          size: Math.random() * 3 + 1,
          life: Math.random() * 100,
          maxLife: 100,
          hue: Math.random() * 360
        });
      }
    };

    initParticles();

    const animate = () => {
      if (!isRunning) return;

      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

      const currentSystem = particleSystems[selectedSystem];
      
      particlesRef.current.forEach((particle, index) => {
        // Update particle based on selected system
        switch (currentSystem.pattern) {
          case 'neural':
            updateNeuralPattern(particle, index);
            break;
          case 'spiral':
            updateSpiralPattern(particle, index);
            break;
          case 'wave':
            updateWavePattern(particle, index);
            break;
          case 'fractal':
            updateFractalPattern(particle, index);
            break;
        }

        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.life += 1;

        // Boundary check
        if (particle.x < 0 || particle.x > canvas.offsetWidth) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.offsetHeight) particle.vy *= -1;

        // Reset particle if life exceeded
        if (particle.life > particle.maxLife) {
          particle.x = Math.random() * canvas.offsetWidth;
          particle.y = Math.random() * canvas.offsetHeight;
          particle.life = 0;
        }

        // Draw particle
        const alpha = 1 - (particle.life / particle.maxLife);
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.fillStyle = `hsl(${particle.hue}, 70%, 60%)`;
        ctx.shadowBlur = 10;
        ctx.shadowColor = currentSystem.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // Draw connections for neural network
      if (currentSystem.pattern === 'neural') {
        drawNeuralConnections(ctx, currentSystem.color);
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    const updateNeuralPattern = (particle: Particle, index: number) => {
      const centerX = canvas.offsetWidth / 2;
      const centerY = canvas.offsetHeight / 2;
      const dx = centerX - particle.x;
      const dy = centerY - particle.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      particle.vx += dx * 0.0001;
      particle.vy += dy * 0.0001;
      particle.hue = (120 + distance * 0.1) % 360;
    };

    const updateSpiralPattern = (particle: Particle, index: number) => {
      const centerX = canvas.offsetWidth / 2;
      const centerY = canvas.offsetHeight / 2;
      const angle = Math.atan2(particle.y - centerY, particle.x - centerX);
      const radius = Math.sqrt((particle.x - centerX) ** 2 + (particle.y - centerY) ** 2);
      
      particle.vx = Math.cos(angle + 0.02) * 2;
      particle.vy = Math.sin(angle + 0.02) * 2;
      particle.hue = (270 + angle * 57.3) % 360;
    };

    const updateWavePattern = (particle: Particle, index: number) => {
      const time = Date.now() * 0.001;
      particle.vy += Math.sin(particle.x * 0.01 + time) * 0.1;
      particle.vx += Math.cos(particle.y * 0.01 + time) * 0.1;
      particle.hue = (330 + Math.sin(time + index * 0.1) * 60) % 360;
    };

    const updateFractalPattern = (particle: Particle, index: number) => {
      const time = Date.now() * 0.001;
      const noiseX = Math.sin(particle.x * 0.005 + time) * Math.cos(particle.y * 0.005);
      const noiseY = Math.cos(particle.x * 0.005 + time) * Math.sin(particle.y * 0.005);
      
      particle.vx += noiseX * 0.05;
      particle.vy += noiseY * 0.05;
      particle.hue = (180 + noiseX * 180) % 360;
    };

    const drawNeuralConnections = (ctx: CanvasRenderingContext2D, color: string) => {
      const particles = particlesRef.current;
      ctx.strokeStyle = color;
      ctx.lineWidth = 0.5;
      ctx.globalAlpha = 0.3;

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      ctx.globalAlpha = 1;
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [selectedSystem, isRunning, particleCount]);

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });

    // Add mouse interaction
    particlesRef.current.forEach(particle => {
      const dx = mousePos.x - particle.x;
      const dy = mousePos.y - particle.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < 100) {
        particle.vx += dx * 0.001;
        particle.vy += dy * 0.001;
      }
    });
  };

  return (
    <section className="py-20 bg-black text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-500 bg-clip-text text-transparent">
              WebGL Particle Systems
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            GPU-accelerated particle simulations showcasing advanced graphics programming
          </p>
        </motion.div>

        {/* System Selector */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {particleSystems.map((system, index) => (
            <motion.button
              key={system.name}
              onClick={() => setSelectedSystem(index)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`p-4 rounded-lg border transition-all duration-300 ${
                selectedSystem === index
                  ? 'bg-purple-500/20 border-purple-500'
                  : 'bg-gray-800/50 border-gray-700 hover:border-gray-600'
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                <div 
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: system.color }}
                />
                <h3 className="font-bold text-left">{system.name}</h3>
              </div>
              <p className="text-sm text-gray-400 text-left">{system.description}</p>
              <div className="text-xs text-purple-400 mt-2">
                {system.particleCount} particles
              </div>
            </motion.button>
          ))}
        </div>

        {/* Canvas Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="relative bg-gray-900 rounded-lg border border-gray-700 overflow-hidden mb-8"
        >
          <canvas
            ref={canvasRef}
            onMouseMove={handleMouseMove}
            className="w-full h-96 cursor-crosshair"
            style={{ background: 'radial-gradient(circle at center, #1a1a2e 0%, #000000 100%)' }}
          />
          
          {/* Canvas Overlay Controls */}
          <div className="absolute top-4 left-4 flex gap-2">
            <button
              onClick={() => setIsRunning(!isRunning)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                isRunning
                  ? 'bg-red-500/20 text-red-400 border border-red-500/50'
                  : 'bg-green-500/20 text-green-400 border border-green-500/50'
              }`}
            >
              {isRunning ? 'Pause' : 'Play'}
            </button>
          </div>

          <div className="absolute top-4 right-4 flex items-center gap-3 bg-black/50 backdrop-blur-sm rounded-lg px-4 py-2">
            <label className="text-sm text-gray-400">Particles:</label>
            <input
              type="range"
              min="50"
              max="500"
              value={particleCount}
              onChange={(e) => setParticleCount(Number(e.target.value))}
              className="w-20 accent-purple-500"
            />
            <span className="text-sm text-white w-8">{particleCount}</span>
          </div>
        </motion.div>

        {/* Technical Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6 text-center">
            <h3 className="text-lg font-semibold mb-2 text-purple-400">Render Engine</h3>
            <div className="text-2xl font-bold text-white mb-2">Canvas 2D</div>
            <p className="text-sm text-gray-400">Hardware accelerated rendering</p>
          </div>
          
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6 text-center">
            <h3 className="text-lg font-semibold mb-2 text-cyan-400">Physics Engine</h3>
            <div className="text-2xl font-bold text-white mb-2">Custom</div>
            <p className="text-sm text-gray-400">Real-time particle simulation</p>
          </div>
          
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6 text-center">
            <h3 className="text-lg font-semibold mb-2 text-pink-400">Performance</h3>
            <div className="text-2xl font-bold text-white mb-2">60 FPS</div>
            <p className="text-sm text-gray-400">Optimized for smooth animation</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
