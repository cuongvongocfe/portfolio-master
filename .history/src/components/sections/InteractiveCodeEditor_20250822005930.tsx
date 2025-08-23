'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface CodeSnippet {
  id: string;
  title: string;
  language: string;
  code: string;
  description: string;
  complexity: number;
  category: string;
  linesOfCode: number;
}

const codeSnippets: CodeSnippet[] = [
  {
    id: '1',
    title: 'React Performance Hook',
    language: 'typescript',
    complexity: 8,
    category: 'Performance',
    linesOfCode: 12,
    code: `const useOptimizedCallback = <T extends (...args: any[]) => any>(
  callback: T,
  deps: React.DependencyList
): T => {
  const memoizedCallback = useCallback(callback, deps);
  const ref = useRef(memoizedCallback);
  
  useEffect(() => {
    ref.current = memoizedCallback;
  }, [memoizedCallback]);
  
  return useCallback((...args: Parameters<T>) => 
    ref.current(...args), []) as T;
};`,
    description: 'Advanced React hook preventing unnecessary re-renders with smart memoization'
  },
  {
    id: '2',
    title: 'AI Neural Network',
    language: 'typescript',
    complexity: 9,
    category: 'AI/ML',
    linesOfCode: 28,
    code: `class NeuralNetwork {
  private weights: number[][];
  private biases: number[];
  
  constructor(layers: number[]) {
    this.weights = this.initializeWeights(layers);
    this.biases = this.initializeBiases(layers);
  }
  
  private sigmoid(x: number): number {
    return 1 / (1 + Math.exp(-x));
  }
  
  private feedForward(inputs: number[]): number[] {
    let activations = inputs;
    
    for (let i = 0; i < this.weights.length; i++) {
      const weighted = this.matrixMultiply(activations, this.weights[i]);
      activations = weighted.map((w, j) => 
        this.sigmoid(w + this.biases[i * activations.length + j])
      );
    }
    
    return activations;
  }
  
  predict(inputs: number[]): number[] {
    return this.feedForward(inputs);
  }
}`,
    description: 'Neural network implementation with forward propagation and sigmoid activation'
  },
  {
    id: '3',
    title: 'Quantum Shader Effect',
    language: 'glsl',
    complexity: 10,
    category: 'Graphics',
    linesOfCode: 35,
    code: `#version 300 es
precision highp float;

uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;

out vec4 fragColor;

vec3 quantumPalette(float t) {
    vec3 a = vec3(0.2, 0.5, 0.8);
    vec3 b = vec3(0.8, 0.2, 0.5);
    vec3 c = vec3(2.0, 1.0, 0.0);
    vec3 d = vec3(0.5, 0.2, 0.25);
    
    return a + b * cos(6.28318 * (c * t + d));
}

float quantumField(vec2 uv, float time) {
    float field = 0.0;
    
    for (int i = 0; i < 5; i++) {
        float fi = float(i);
        vec2 p = uv + vec2(cos(time * 0.1 + fi), sin(time * 0.2 + fi)) * 0.5;
        field += 1.0 / length(p);
    }
    
    return field;
}

void main() {
    vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / u_resolution.y;
    
    float field = quantumField(uv, u_time);
    vec3 color = quantumPalette(field * 0.1 + u_time * 0.1);
    
    // Quantum interference pattern
    float interference = sin(field * 10.0 + u_time * 2.0) * 0.5 + 0.5;
    color *= interference;
    
    fragColor = vec4(color, 1.0);
}`,
    description: 'Advanced quantum field visualization with interference patterns'
  },
  {
    id: '4',
    title: 'Blockchain Validator',
    language: 'typescript',
    complexity: 9,
    category: 'Blockchain',
    linesOfCode: 22,
    code: `class BlockchainValidator {
  private difficulty: number = 4;
  
  calculateHash(block: Block): string {
    const data = block.index + block.timestamp + 
                JSON.stringify(block.data) + block.previousHash + block.nonce;
    return require('crypto').createHash('sha256').update(data).digest('hex');
  }
  
  mineBlock(block: Block): Block {
    const target = Array(this.difficulty + 1).join('0');
    
    while (block.hash.substring(0, this.difficulty) !== target) {
      block.nonce++;
      block.hash = this.calculateHash(block);
    }
    
    console.log(\`Block mined: \${block.hash}\`);
    return block;
  }
  
  validateChain(blockchain: Block[]): boolean {
    for (let i = 1; i < blockchain.length; i++) {
      const currentBlock = blockchain[i];
      const previousBlock = blockchain[i - 1];
      
      if (currentBlock.hash !== this.calculateHash(currentBlock)) return false;
      if (currentBlock.previousHash !== previousBlock.hash) return false;
    }
    return true;
  }
}`,
    description: 'Proof-of-work blockchain validation with mining algorithm'
  }
];

export default function InteractiveCodeEditor() {
  const [selectedSnippet, setSelectedSnippet] = useState(0);
  const [displayedCode, setDisplayedCode] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [currentLine, setCurrentLine] = useState(0);
  const [particleCount, setParticleCount] = useState(0);
  const [glitchEffect, setGlitchEffect] = useState(false);
  const codeRef = useRef<HTMLPreElement>(null);

  // Particle animation for background
  useEffect(() => {
    const interval = setInterval(() => {
      setParticleCount(prev => (prev + 1) % 50);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  // Glitch effect trigger
  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setGlitchEffect(true);
      setTimeout(() => setGlitchEffect(false), 200);
    }, 5000);
    return () => clearInterval(glitchInterval);
  }, []);

  useEffect(() => {
    setIsTyping(true);
    setDisplayedCode('');
    setCurrentLine(0);
    
    const code = codeSnippets[selectedSnippet].code;
    const lines = code.split('\n');
    let lineIndex = 0;
    let charIndex = 0;
    
    const typeCode = () => {
      if (lineIndex < lines.length) {
        const currentLineText = lines[lineIndex];
        
        if (charIndex < currentLineText.length) {
          setDisplayedCode(prev => prev + currentLineText[charIndex]);
          charIndex++;
          setTimeout(typeCode, Math.random() * 30 + 10);
        } else {
          setDisplayedCode(prev => prev + '\n');
          lineIndex++;
          charIndex = 0;
          setCurrentLine(lineIndex);
          setTimeout(typeCode, 100);
        }
      } else {
        setIsTyping(false);
      }
    };
    
    setTimeout(typeCode, 500);
  }, [selectedSnippet]);

  const getComplexityColor = (complexity: number) => {
    if (complexity >= 9) return 'from-red-500 to-pink-500';
    if (complexity >= 7) return 'from-orange-500 to-yellow-500';
    return 'from-green-500 to-blue-500';
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Performance': return '⚡';
      case 'AI/ML': return '🧠';
      case 'Graphics': return '🎨';
      case 'Blockchain': return '⛓️';
      default: return '💻';
    }
  };

  const syntaxHighlight = (code: string, language: string) => {
    const keywords = language === 'typescript' 
      ? ['const', 'let', 'var', 'function', 'return', 'if', 'else', 'for', 'while', 'class', 'interface', 'type', 'export', 'import', 'from', 'as', 'extends', 'implements', 'private', 'public', 'constructor', 'this']
      : ['precision', 'uniform', 'varying', 'attribute', 'vec2', 'vec3', 'vec4', 'float', 'int', 'bool', 'void', 'main', 'gl_FragCoord', 'gl_Position', 'highp', 'mediump', 'lowp'];
    
    let highlighted = code;
    
    // Highlight keywords
    keywords.forEach(keyword => {
      const regex = new RegExp(`\\b${keyword}\\b`, 'g');
      highlighted = highlighted.replace(regex, `<span class="text-purple-400 font-semibold glow-text">${keyword}</span>`);
    });
    
    // Highlight strings
    highlighted = highlighted.replace(/'([^']*)'/g, '<span class="text-green-400 glow-text">\'$1\'</span>');
    highlighted = highlighted.replace(/"([^"]*)"/g, '<span class="text-green-400 glow-text">"$1"</span>');
    
    // Highlight numbers
    highlighted = highlighted.replace(/\b\d+\.?\d*\b/g, '<span class="text-cyan-400 glow-text">$&</span>');
    
    // Highlight comments
    
    // Highlight comments
    highlighted = highlighted.replace(/\/\/.*$/gm, '<span class="text-gray-500 italic">$&</span>');
    
    // Highlight function names
    highlighted = highlighted.replace(/(\w+)(?=\()/g, '<span class="text-yellow-400 glow-text">$1</span>');
    
    return highlighted;
  };

  return (
    <section id="interactive-code" className="py-16 sm:py-20 lg:py-24 bg-black text-white overflow-hidden relative">
      {/* Animated Background Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(Math.min(particleCount, 30))].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full"
            initial={{ 
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000), 
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
              opacity: 0 
            }}
            animate={{ 
              y: -100,
              opacity: [0, 1, 0]
            }}
            transition={{ 
              duration: 3,
              delay: i * 0.1,
              repeat: Infinity
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16 px-4"
        >
          <motion.h2 
            className={`text-2xl sm:text-4xl lg:text-6xl font-bold mb-4 sm:mb-6 ${glitchEffect ? 'animate-pulse' : ''}`}
            animate={glitchEffect ? { x: [0, -2, 2, 0] } : {}}
            transition={{ duration: 0.2 }}
          >
            <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent relative">
              💻 LIVE CODE SHOWCASE 💻
              {glitchEffect && (
                <span className="absolute inset-0 bg-gradient-to-r from-red-500 to-yellow-500 bg-clip-text text-transparent opacity-50">
                  💻 LIVE CODE SHOWCASE 💻
                </span>
              )}
            </span>
          </motion.h2>
          <p className="text-base sm:text-xl text-gray-400 max-w-3xl mx-auto break-words">
            🚀 Interactive code examples showcasing cutting-edge programming techniques 🚀
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 px-2 sm:px-4">
          {/* Enhanced Code Snippet Selector */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-3 sm:space-y-4 order-2 lg:order-1 max-h-96 lg:max-h-none overflow-y-auto lg:overflow-visible"
          >
            {codeSnippets.map((snippet, index) => (
              <motion.button
                key={snippet.id}
                onClick={() => setSelectedSnippet(index)}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 0 30px rgba(139, 92, 246, 0.3)"
                }}
                whileTap={{ scale: 0.95 }}
                className={`w-full text-left p-6 rounded-lg border-2 transition-all duration-300 relative overflow-hidden ${
                  selectedSnippet === index
                    ? `bg-gradient-to-r ${getComplexityColor(snippet.complexity)}/20 border-purple-500 shadow-lg shadow-purple-500/20`
                    : 'bg-gray-900/50 border-gray-700 hover:border-gray-600'
                }`}
              >
                {/* Complexity indicator */}
                <div className="absolute top-2 right-2 flex items-center gap-1">
                  <span className="text-xs">{getCategoryIcon(snippet.category)}</span>
                  <div className="flex">
                    {[...Array(10)].map((_, i) => (
                      <div
                        key={i}
                        className={`w-1 h-3 mr-0.5 rounded ${
                          i < snippet.complexity 
                            ? 'bg-gradient-to-t from-green-500 to-red-500'
                            : 'bg-gray-600'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-bold text-white text-lg">{snippet.title}</h3>
                </div>
                <p className="text-sm text-gray-400 mb-3">{snippet.description}</p>
                
                <div className="flex justify-between items-center">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    snippet.language === 'typescript' 
                      ? 'bg-blue-500/20 text-blue-400'
                      : 'bg-green-500/20 text-green-400'
                  }`}>
                    {snippet.language.toUpperCase()}
                  </span>
                  <span className="text-xs text-gray-500">{snippet.linesOfCode} lines</span>
                </div>

                {/* Animated border for selected */}
                {selectedSnippet === index && (
                  <motion.div
                    className="absolute inset-0 border-2 border-purple-500 rounded-lg"
                    animate={{
                      boxShadow: [
                        "0 0 0 0 rgba(139, 92, 246, 0.7)",
                        "0 0 0 10px rgba(139, 92, 246, 0)",
                        "0 0 0 0 rgba(139, 92, 246, 0)"
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}
              </motion.button>
            ))}
          </motion.div>

          {/* Enhanced Code Display */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <div className="bg-gradient-to-br from-gray-900 to-black rounded-lg border border-gray-700 overflow-hidden shadow-2xl shadow-purple-500/10">
              {/* Enhanced Terminal Header */}
              <div className="flex items-center justify-between bg-gradient-to-r from-gray-800 to-gray-900 px-4 py-3 border-b border-gray-700">
                <div className="flex items-center gap-2">
                  <motion.div 
                    className="w-3 h-3 rounded-full bg-red-500"
                    animate={{ opacity: [1, 0.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <motion.div 
                    className="w-3 h-3 rounded-full bg-yellow-500"
                    animate={{ opacity: [1, 0.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                  />
                  <motion.div 
                    className="w-3 h-3 rounded-full bg-green-500"
                    animate={{ opacity: [1, 0.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                  />
                </div>
                
                {/* File info with stats */}
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-400 font-mono">
                    {codeSnippets[selectedSnippet].title.toLowerCase().replace(/\s+/g, '-')}.{codeSnippets[selectedSnippet].language}
                  </span>
                  <div className="text-xs text-purple-400">
                    Line: {currentLine + 1}
                  </div>
                </div>
              </div>

              {/* Enhanced Code Content */}
              <div className="relative">
                <div className="p-6 font-mono text-sm leading-relaxed h-96 overflow-auto custom-scrollbar">
                  <style jsx>{`
                    .glow-text {
                      text-shadow: 0 0 5px currentColor;
                    }
                    .custom-scrollbar::-webkit-scrollbar {
                      width: 8px;
                    }
                    .custom-scrollbar::-webkit-scrollbar-track {
                      background: rgba(31, 41, 55, 0.5);
                    }
                    .custom-scrollbar::-webkit-scrollbar-thumb {
                      background: linear-gradient(45deg, #8b5cf6, #06b6d4);
                      border-radius: 4px;
                    }
                  `}</style>
                  
                  <pre
                    ref={codeRef}
                    className="text-gray-300 relative"
                    dangerouslySetInnerHTML={{
                      __html: syntaxHighlight(displayedCode, codeSnippets[selectedSnippet].language)
                    }}
                  />
                  
                  {/* Enhanced typing cursor */}
                  {isTyping && (
                    <motion.span
                      animate={{ 
                        opacity: [1, 0],
                        scaleY: [1, 1.2, 1]
                      }}
                      transition={{ 
                        duration: 0.5, 
                        repeat: Infinity, 
                        repeatType: 'reverse' 
                      }}
                      className="inline-block w-2 h-5 bg-gradient-to-t from-cyan-400 to-purple-500 ml-1 shadow-lg shadow-cyan-400/50"
                    />
                  )}
                </div>

                {/* Typing progress indicator */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-800">
                  <motion.div
                    className="h-full bg-gradient-to-r from-cyan-400 to-purple-500"
                    initial={{ width: "0%" }}
                    animate={{ 
                      width: isTyping 
                        ? `${(displayedCode.length / codeSnippets[selectedSnippet].code.length) * 100}%`
                        : "100%"
                    }}
                    transition={{ duration: 0.2 }}
                  />
                </div>
              </div>
            </div>

            {/* Code Statistics */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-4 grid grid-cols-3 gap-4 text-center"
            >
              <div className="bg-gray-900/50 rounded-lg p-3 border border-gray-700">
                <div className="text-lg font-bold text-cyan-400">{codeSnippets[selectedSnippet].complexity}/10</div>
                <div className="text-xs text-gray-400">Complexity</div>
              </div>
              <div className="bg-gray-900/50 rounded-lg p-3 border border-gray-700">
                <div className="text-lg font-bold text-purple-400">{codeSnippets[selectedSnippet].linesOfCode}</div>
                <div className="text-xs text-gray-400">Lines</div>
              </div>
              <div className="bg-gray-900/50 rounded-lg p-3 border border-gray-700">
                <div className="text-lg font-bold text-green-400">{codeSnippets[selectedSnippet].category}</div>
                <div className="text-xs text-gray-400">Category</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
