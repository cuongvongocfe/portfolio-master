'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
  size: number;
}

interface SwordSlash {
  id: number;
  x: number;
  y: number;
  angle: number;
  type: 'fire' | 'water' | 'thunder' | 'wind' | 'stone';
}

export default function KimetsuEffects() {
  const [currentBreathing, setCurrentBreathing] = useState<'fire' | 'water' | 'thunder' | 'wind' | 'stone'>('fire');
  const [particles, setParticles] = useState<Particle[]>([]);
  const [swordSlashes, setSwordSlashes] = useState<SwordSlash[]>([]);
  const [isActivated, setIsActivated] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | null>(null);

  const breathingStyles = {
    fire: {
      name: '🔥 Hinokami Kagura',
      description: 'Dance of the Fire God',
      color: 'from-red-500 via-orange-500 to-yellow-500',
      particles: 'flame',
      emoji: '🔥'
    },
    water: {
      name: '🌊 Mizu no Kokyu',
      description: 'Water Breathing',
      color: 'from-blue-500 via-cyan-500 to-teal-500',
      particles: 'water',
      emoji: '🌊'
    },
    thunder: {
      name: '⚡ Kaminari no Kokyu',
      description: 'Thunder Breathing',
      color: 'from-yellow-400 via-purple-500 to-blue-600',
      particles: 'lightning',
      emoji: '⚡'
    },
    wind: {
      name: '💨 Kaze no Kokyu',
      description: 'Wind Breathing',
      color: 'from-green-400 via-emerald-500 to-cyan-400',
      particles: 'wind',
      emoji: '💨'
    },
    stone: {
      name: '🗿 Iwa no Kokyu',
      description: 'Stone Breathing',
      color: 'from-gray-600 via-stone-500 to-amber-600',
      particles: 'stone',
      emoji: '🗿'
    }
  };

  // Particle system
  useEffect(() => {
    if (!isActivated) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const createParticle = (): Particle => {
      const colors = {
        fire: ['#ff4500', '#ff6347', '#ffa500', '#ffff00'],
        water: ['#00bfff', '#1e90ff', '#87ceeb', '#b0e0e6'],
        thunder: ['#ffff00', '#9370db', '#4169e1', '#ffffff'],
        wind: ['#98fb98', '#00ff7f', '#40e0d0', '#afeeee'],
        stone: ['#696969', '#a0522d', '#daa520', '#cd853f']
      };

      return {
        id: Math.random(),
        x: Math.random() * canvas.width,
        y: canvas.height + 10,
        vx: (Math.random() - 0.5) * 4,
        vy: -Math.random() * 8 - 2,
        life: 0,
        maxLife: Math.random() * 100 + 50,
        color: colors[currentBreathing][Math.floor(Math.random() * colors[currentBreathing].length)],
        size: Math.random() * 6 + 2
      };
    };

    const updateParticles = () => {
      setParticles(prevParticles => {
        const updated = prevParticles.map(particle => ({
          ...particle,
          x: particle.x + particle.vx,
          y: particle.y + particle.vy,
          life: particle.life + 1,
          vy: particle.vy + 0.1, // gravity
          size: particle.size * 0.995 // shrink over time
        })).filter(particle => particle.life < particle.maxLife && particle.y > -50);

        // Add new particles
        if (updated.length < 100) {
          for (let i = 0; i < 3; i++) {
            updated.push(createParticle());
          }
        }

        return updated;
      });
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw particles
      particles.forEach(particle => {
        const alpha = 1 - (particle.life / particle.maxLife);
        ctx.globalAlpha = alpha;
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();

        // Add glow effect
        ctx.shadowColor = particle.color;
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      ctx.globalAlpha = 1;
      updateParticles();
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isActivated, currentBreathing, particles]);

  const createSwordSlash = () => {
    const newSlash: SwordSlash = {
      id: Date.now(),
      x: Math.random() * 800,
      y: Math.random() * 400,
      angle: Math.random() * 360,
      type: currentBreathing
    };

    setSwordSlashes(prev => [...prev, newSlash]);
    
    // Remove slash after animation
    setTimeout(() => {
      setSwordSlashes(prev => prev.filter(slash => slash.id !== newSlash.id));
    }, 1000);
  };

  const activateBreathingStyle = () => {
    setIsActivated(true);
    createSwordSlash();
    
    // Create multiple slashes for dramatic effect
    setTimeout(() => createSwordSlash(), 200);
    setTimeout(() => createSwordSlash(), 400);
    setTimeout(() => createSwordSlash(), 600);

    setTimeout(() => setIsActivated(false), 3000);
  };

  return (
    <section id="kimetsu-effects" className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-black via-gray-900 to-black text-white overflow-hidden relative">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-repeat" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <motion.h2 
            className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-6"
            animate={isActivated ? { 
              scale: [1, 1.1, 1],
              rotateZ: [0, 2, -2, 0]
            } : {}}
            transition={{ duration: 0.5 }}
          >
            <span className={`bg-gradient-to-r ${breathingStyles[currentBreathing].color} bg-clip-text text-transparent relative`}>
              ⚔️ KIMETSU NO YAIBA EFFECTS ⚔️
            </span>
          </motion.h2>
          <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto">
            🌸 Experience the power of Demon Slayer breathing techniques 🌸
          </p>
        </motion.div>

        {/* Breathing Style Selector */}
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-8 sm:mb-12">
          {Object.entries(breathingStyles).map(([key, style]) => (
            <motion.button
              key={key}
              onClick={() => setCurrentBreathing(key as any)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 sm:px-6 py-3 rounded-xl font-bold text-sm sm:text-base transition-all duration-300 border-2 ${
                currentBreathing === key
                  ? `bg-gradient-to-r ${style.color} text-black border-white shadow-lg`
                  : 'bg-gray-800/50 border-gray-600 text-white hover:border-gray-400'
              }`}
            >
              {style.emoji} {style.name.split(' ')[1]}
            </motion.button>
          ))}
        </div>

        {/* Main Display Area */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Breathing Style Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className={`bg-gradient-to-r ${breathingStyles[currentBreathing].color} bg-opacity-20 rounded-xl p-6 sm:p-8 border border-gray-700`}>
              <div className="flex items-center gap-4 mb-4">
                <span className="text-4xl sm:text-5xl">{breathingStyles[currentBreathing].emoji}</span>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">
                    {breathingStyles[currentBreathing].name}
                  </h3>
                  <p className="text-gray-300">{breathingStyles[currentBreathing].description}</p>
                </div>
              </div>

              <motion.button
                onClick={activateBreathingStyle}
                disabled={isActivated}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`w-full py-4 px-6 rounded-lg font-bold text-lg transition-all duration-300 ${
                  isActivated 
                    ? 'bg-gray-600 cursor-not-allowed' 
                    : `bg-gradient-to-r ${breathingStyles[currentBreathing].color} text-black hover:shadow-xl`
                }`}
              >
                {isActivated ? '⚔️ TECHNIQUE ACTIVE...' : `⚔️ ACTIVATE ${breathingStyles[currentBreathing].name.split(' ')[1]}`}
              </motion.button>
            </div>

            {/* Technique Description */}
            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
              <h4 className="text-lg font-bold mb-4 text-white">🎌 Technique Details</h4>
              <div className="space-y-3 text-gray-300">
                <div className="flex justify-between">
                  <span>Style:</span>
                  <span className="font-bold">{breathingStyles[currentBreathing].name}</span>
                </div>
                <div className="flex justify-between">
                  <span>Element:</span>
                  <span className="font-bold">{breathingStyles[currentBreathing].description}</span>
                </div>
                <div className="flex justify-between">
                  <span>Power Level:</span>
                  <span className="font-bold">⭐⭐⭐⭐⭐</span>
                </div>
                <div className="flex justify-between">
                  <span>Breathing Forms:</span>
                  <span className="font-bold">13 Forms</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Effects Canvas */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className={`bg-gradient-to-br ${breathingStyles[currentBreathing].color} bg-opacity-10 rounded-xl border border-gray-700 overflow-hidden relative`}>
              <canvas
                ref={canvasRef}
                className="w-full h-80 sm:h-96"
                style={{ background: 'transparent' }}
              />
              
              {/* Sword Slashes */}
              <AnimatePresence>
                {swordSlashes.map(slash => (
                  <motion.div
                    key={slash.id}
                    initial={{ 
                      opacity: 0, 
                      scale: 0,
                      rotate: slash.angle,
                      x: slash.x,
                      y: slash.y
                    }}
                    animate={{ 
                      opacity: [0, 1, 0], 
                      scale: [0, 2, 0],
                      rotate: slash.angle + 180
                    }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="absolute pointer-events-none"
                  >
                    <div className={`w-32 h-2 bg-gradient-to-r ${breathingStyles[slash.type].color} rounded-full shadow-lg`}
                         style={{ 
                           boxShadow: `0 0 20px ${breathingStyles[slash.type].color.split(' ')[1].replace('from-', '').replace('-500', '')}`
                         }}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Center Kanji */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <motion.div
                  animate={isActivated ? {
                    scale: [1, 1.5, 1],
                    rotate: [0, 360, 0],
                    opacity: [0.3, 1, 0.3]
                  } : {}}
                  transition={{ duration: 2 }}
                  className="text-6xl sm:text-8xl opacity-30"
                >
                  {currentBreathing === 'fire' && '炎'}
                  {currentBreathing === 'water' && '水'}
                  {currentBreathing === 'thunder' && '雷'}
                  {currentBreathing === 'wind' && '風'}
                  {currentBreathing === 'stone' && '岩'}
                </motion.div>
              </div>
            </div>

            {/* Status Indicator */}
            <div className="mt-4 text-center">
              <motion.div
                animate={isActivated ? { scale: [1, 1.1, 1] } : {}}
                transition={{ duration: 0.5, repeat: isActivated ? Infinity : 0 }}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${
                  isActivated 
                    ? `bg-gradient-to-r ${breathingStyles[currentBreathing].color} text-black`
                    : 'bg-gray-800 text-gray-400'
                }`}
              >
                <div className={`w-2 h-2 rounded-full ${isActivated ? 'bg-white animate-pulse' : 'bg-gray-600'}`} />
                {isActivated ? 'BREATHING TECHNIQUE ACTIVE' : 'READY TO ACTIVATE'}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
