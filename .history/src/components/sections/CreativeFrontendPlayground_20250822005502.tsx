'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PlaygroundDemo {
  id: string;
  title: string;
  description: string;
  category: 'CSS' | 'WebGL' | 'Animation' | 'Interaction';
  difficulty: number;
  component: React.ReactNode;
  code: string;
}

export default function CreativeFrontendPlayground() {
  const [activeDemo, setActiveDemo] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [particleCount, setParticleCount] = useState(50);

  // CSS Morphing Animation Demo
  const MorphingShapes = () => {
    const [currentShape, setCurrentShape] = useState(0);
    const shapes = [
      'circle(50% at 50% 50%)',
      'polygon(50% 0%, 0% 100%, 100% 100%)',
      'polygon(0% 0%, 100% 0%, 100% 75%, 75% 75%, 75% 100%, 50% 75%, 0% 75%)',
      'polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%)'
    ];

    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentShape(prev => (prev + 1) % shapes.length);
      }, 2000);
      return () => clearInterval(interval);
    }, [shapes.length]);

    return (
      <div className="relative w-full h-64 flex items-center justify-center">
        <motion.div
          className="w-32 h-32 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500"
          style={{
            clipPath: shapes[currentShape],
            transition: 'clip-path 0.8s ease-in-out'
          }}
          animate={{
            rotate: 360,
            scale: [1, 1.2, 1]
          }}
          transition={{
            rotate: { duration: 4, repeat: Infinity, ease: "linear" },
            scale: { duration: 2, repeat: Infinity }
          }}
        />
        <div className="absolute bottom-4 text-center">
          <span className="text-sm text-gray-400">CSS clip-path morphing</span>
        </div>
      </div>
    );
  };

  // 3D CSS Card Demo
  const CSS3DCard = () => {
    const [isFlipped, setIsFlipped] = useState(false);

    return (
      <div className="relative w-full h-64 flex items-center justify-center perspective-1000">
        <motion.div
          className="relative w-48 h-32 preserve-3d cursor-pointer"
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.8 }}
          onClick={() => setIsFlipped(!isFlipped)}
        >
          {/* Front */}
          <div className="absolute inset-0 backface-hidden bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg p-4 flex flex-col justify-center items-center text-white shadow-2xl">
            <h3 className="text-lg font-bold mb-2">Frontend</h3>
            <p className="text-sm">Click to flip</p>
          </div>
          
          {/* Back */}
          <div className="absolute inset-0 backface-hidden bg-gradient-to-br from-emerald-600 to-teal-600 rounded-lg p-4 flex flex-col justify-center items-center text-white shadow-2xl rotate-y-180">
            <h3 className="text-lg font-bold mb-2">Developer</h3>
            <p className="text-sm">Pure CSS 3D!</p>
          </div>
        </motion.div>
        
        <style jsx>{`
          .perspective-1000 { perspective: 1000px; }
          .preserve-3d { transform-style: preserve-3d; }
          .backface-hidden { backface-visibility: hidden; }
          .rotate-y-180 { transform: rotateY(180deg); }
        `}</style>
      </div>
    );
  };

  // Particle System Demo
  const ParticleSystem = () => {
    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      canvas.width = 400;
      canvas.height = 200;

      const particles: Array<{
        x: number;
        y: number;
        vx: number;
        vy: number;
        radius: number;
        color: string;
      }> = [];

      // Initialize particles
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2,
          radius: Math.random() * 3 + 1,
          color: `hsl(${Math.random() * 360}, 70%, 60%)`
        });
      }

      const animate = () => {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        particles.forEach(particle => {
          particle.x += particle.vx;
          particle.y += particle.vy;

          // Bounce off walls
          if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
          if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

          // Draw particle
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
          ctx.fillStyle = particle.color;
          ctx.fill();
        });

        requestAnimationFrame(animate);
      };

      animate();
    }, []);

    return (
      <div className="relative w-full h-64 flex flex-col items-center justify-center">
        <canvas
          ref={canvasRef}
          className="border border-gray-600 rounded-lg bg-black"
        />
        <div className="mt-4 flex items-center gap-4">
          <span className="text-sm text-gray-400">Particles:</span>
          <input
            type="range"
            min="10"
            max="100"
            value={particleCount}
            onChange={(e) => setParticleCount(Number(e.target.value))}
            className="w-32"
          />
          <span className="text-sm text-gray-400">{particleCount}</span>
        </div>
      </div>
    );
  };

  // Interactive Mouse Follower
  const MouseFollower = () => {
    useEffect(() => {
      const handleMouseMove = (e: MouseEvent) => {
        setMousePosition({ x: e.clientX, y: e.clientY });
      };

      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
      <div className="relative w-full h-64 overflow-hidden bg-gradient-to-br from-indigo-900 to-purple-900 rounded-lg">
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-white text-lg font-bold">Move your mouse!</span>
        </div>
        
        {/* Mouse follower circles */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-8 h-8 rounded-full pointer-events-none"
            style={{
              background: `hsl(${i * 60}, 70%, 60%)`,
              opacity: 0.7 - i * 0.1
            }}
            animate={{
              x: mousePosition.x - 200 - i * 20,
              y: mousePosition.y - 300 - i * 20
            }}
            transition={{
              type: "spring",
              stiffness: 100 - i * 20,
              damping: 20
            }}
          />
        ))}
      </div>
    );
  };

  // Text Animation Demo
  const TextAnimation = () => {
    const text = "CREATIVE FRONTEND";
    const [visibleChars, setVisibleChars] = useState(0);

    useEffect(() => {
      const interval = setInterval(() => {
        setVisibleChars(prev => prev >= text.length ? 0 : prev + 1);
      }, 200);
      return () => clearInterval(interval);
    }, []);

    return (
      <div className="relative w-full h-64 flex items-center justify-center">
        <div className="text-4xl font-bold">
          {text.split('').map((char, index) => (
            <motion.span
              key={index}
              className={`inline-block ${
                index < visibleChars 
                  ? 'text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600' 
                  : 'text-gray-700'
              }`}
              animate={index < visibleChars ? {
                y: [50, 0],
                opacity: [0, 1],
                rotateX: [90, 0]
              } : {}}
              transition={{
                duration: 0.5,
                delay: index * 0.1
              }}
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
        </div>
      </div>
    );
  };

  const demos: PlaygroundDemo[] = [
    {
      id: '1',
      title: 'CSS Morphing Shapes',
      description: 'Dynamic shape transformation using CSS clip-path',
      category: 'CSS',
      difficulty: 7,
      component: <MorphingShapes />,
      code: `// CSS clip-path morphing animation
const shapes = [
  'circle(50% at 50% 50%)',
  'polygon(50% 0%, 0% 100%, 100% 100%)',
  'polygon(0% 0%, 100% 0%, 100% 75%, 75% 75%...)'
];

<motion.div
  style={{ clipPath: shapes[currentShape] }}
  animate={{ rotate: 360, scale: [1, 1.2, 1] }}
/>`
    },
    {
      id: '2',
      title: '3D CSS Card Flip',
      description: 'Interactive 3D card flip with pure CSS transforms',
      category: 'CSS',
      difficulty: 8,
      component: <CSS3DCard />,
      code: `// Pure CSS 3D card flip
.preserve-3d { transform-style: preserve-3d; }
.backface-hidden { backface-visibility: hidden; }

<motion.div
  animate={{ rotateY: isFlipped ? 180 : 0 }}
  className="preserve-3d"
>
  <div className="backface-hidden">Front</div>
  <div className="backface-hidden rotate-y-180">Back</div>
</motion.div>`
    },
    {
      id: '3',
      title: 'Canvas Particle System',
      description: 'Real-time particle physics with HTML5 Canvas',
      category: 'WebGL',
      difficulty: 9,
      component: <ParticleSystem />,
      code: `// Canvas particle system
particles.forEach(particle => {
  particle.x += particle.vx;
  particle.y += particle.vy;
  
  // Bounce off walls
  if (particle.x < 0 || particle.x > canvas.width) 
    particle.vx *= -1;
    
  ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
});`
    },
    {
      id: '4',
      title: 'Mouse Follower Effect',
      description: 'Smooth mouse tracking with spring physics',
      category: 'Interaction',
      difficulty: 6,
      component: <MouseFollower />,
      code: `// Mouse follower with spring physics
<motion.div
  animate={{
    x: mousePosition.x - offset,
    y: mousePosition.y - offset
  }}
  transition={{
    type: "spring",
    stiffness: 100,
    damping: 20
  }}
/>`
    },
    {
      id: '5',
      title: 'Animated Typography',
      description: 'Character-by-character text reveal animation',
      category: 'Animation',
      difficulty: 7,
      component: <TextAnimation />,
      code: `// Character reveal animation
{text.split('').map((char, index) => (
  <motion.span
    animate={index < visibleChars ? {
      y: [50, 0],
      opacity: [0, 1],
      rotateX: [90, 0]
    } : {}}
    transition={{ delay: index * 0.1 }}
  >
    {char}
  </motion.span>
))}`
    }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'CSS': return 'from-blue-500 to-cyan-500';
      case 'WebGL': return 'from-purple-500 to-pink-500';
      case 'Animation': return 'from-green-500 to-emerald-500';
      case 'Interaction': return 'from-orange-500 to-red-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <section id="frontend-playground" className="py-16 sm:py-20 bg-gradient-to-br from-black via-gray-900 to-black text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <div className="flex items-center justify-center gap-2 sm:gap-4 mb-4 sm:mb-6">
            <span className="text-2xl sm:text-3xl lg:text-4xl">🎨</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold">
              <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                CREATIVE FRONTEND
              </span>
            </h2>
          </div>
          <div className="flex items-center justify-center gap-2 sm:gap-4 mb-4 sm:mb-6">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold">
              <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                PLAYGROUND
              </span>
            </h2>
            <span className="text-2xl sm:text-3xl lg:text-4xl">🚀</span>
          </div>
          <div className="flex items-center justify-center gap-1 sm:gap-2 text-lg sm:text-xl text-gray-400 max-w-4xl mx-auto px-4">
            <span className="text-base sm:text-lg">🌟</span>
            <p className="text-center">
              Interactive showcase of modern frontend techniques, animations, and creative coding
            </p>
            <span className="text-base sm:text-lg">🌟</span>
          </div>
        </motion.div>

        {/* Control Panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex justify-center mb-6 sm:mb-8 px-4"
        >
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4 bg-gray-900/50 rounded-lg p-2 border border-gray-700 w-full max-w-4xl">
            {demos.map((demo, index) => (
              <motion.button
                key={demo.id}
                onClick={() => setActiveDemo(index)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-3 sm:px-4 py-2 rounded-lg font-medium transition-all duration-300 text-xs sm:text-sm flex-shrink-0 ${
                  activeDemo === index
                    ? `bg-gradient-to-r ${getCategoryColor(demo.category)} text-white shadow-lg`
                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                }`}
              >
                <span className="hidden sm:inline">{demo.title.split(' ')[0]}</span>
                <span className="sm:hidden">{demo.title.split(' ')[0].slice(0, 3)}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 px-4">
          {/* Demo List */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="space-y-3 sm:space-y-4 order-2 lg:order-1"
          >
            {demos.map((demo, index) => (
              <motion.button
                key={demo.id}
                onClick={() => setActiveDemo(index)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full text-left p-6 rounded-lg border-2 transition-all duration-300 ${
                  activeDemo === index
                    ? `bg-gradient-to-r ${getCategoryColor(demo.category)}/20 border-purple-500 shadow-lg shadow-purple-500/20`
                    : 'bg-gray-900/50 border-gray-700 hover:border-gray-600'
                }`}
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-bold text-white text-lg">{demo.title}</h3>
                  <span className={`px-2 py-1 rounded text-xs font-bold bg-gradient-to-r ${getCategoryColor(demo.category)} text-black`}>
                    {demo.category}
                  </span>
                </div>
                
                <p className="text-sm text-gray-400 mb-3">{demo.description}</p>
                
                <div className="flex justify-between items-center">
                  <div className="flex">
                    {[...Array(10)].map((_, i) => (
                      <div
                        key={i}
                        className={`w-1 h-3 mr-0.5 rounded ${
                          i < demo.difficulty 
                            ? 'bg-gradient-to-t from-green-500 to-red-500'
                            : 'bg-gray-600'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-gray-500">Difficulty: {demo.difficulty}/10</span>
                </div>
              </motion.button>
            ))}
          </motion.div>

          {/* Demo Display */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <div className="bg-gradient-to-br from-gray-900/80 to-black/80 rounded-lg border border-gray-700 overflow-hidden">
              {/* Demo Header */}
              <div className="bg-gradient-to-r from-gray-800 to-gray-900 px-6 py-4 border-b border-gray-700">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-white">
                    {demos[activeDemo].title}
                  </h3>
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r ${getCategoryColor(demos[activeDemo].category)} text-black`}>
                      {demos[activeDemo].category}
                    </span>
                    <span className="text-sm text-gray-400">
                      {demos[activeDemo].difficulty}/10 ⭐
                    </span>
                  </div>
                </div>
              </div>

              {/* Demo Content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeDemo}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="p-6"
                >
                  {demos[activeDemo].component}
                </motion.div>
              </AnimatePresence>

              {/* Code Preview */}
              <div className="bg-gray-950 px-6 py-4 border-t border-gray-700">
                <h4 className="text-sm font-semibold text-gray-400 mb-2">Code Preview:</h4>
                <pre className="text-sm text-green-400 font-mono overflow-x-auto">
                  <code>{demos[activeDemo].code}</code>
                </pre>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 text-center"
        >
          <div className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-lg p-4 border border-cyan-500/30">
            <div className="text-2xl font-bold text-cyan-400">{demos.length}</div>
            <div className="text-sm text-gray-400">Creative Demos</div>
          </div>
          
          <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg p-4 border border-purple-500/30">
            <div className="text-2xl font-bold text-purple-400">
              {demos.filter(d => d.category === 'CSS').length + demos.filter(d => d.category === 'Animation').length}
            </div>
            <div className="text-sm text-gray-400">CSS Techniques</div>
          </div>
          
          <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-lg p-4 border border-green-500/30">
            <div className="text-2xl font-bold text-green-400">
              {demos.filter(d => d.category === 'WebGL' || d.category === 'Interaction').length}
            </div>
            <div className="text-sm text-gray-400">Interactive Effects</div>
          </div>
          
          <div className="bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-lg p-4 border border-orange-500/30">
            <div className="text-2xl font-bold text-orange-400">
              {Math.round(demos.reduce((acc, d) => acc + d.difficulty, 0) / demos.length)}
            </div>
            <div className="text-sm text-gray-400">Avg Complexity</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
