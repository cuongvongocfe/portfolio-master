'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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
    highlighted = highlighted.replace(/\/\/.*$/gm, '<span class="text-gray-500 italic">$&</span>');
    
    // Highlight function names
    highlighted = highlighted.replace(/(\w+)(?=\()/g, '<span class="text-yellow-400 glow-text">$1</span>');
    
    return highlighted;
  };
    
    // Highlight comments
    highlighted = highlighted.replace(/\/\/.*$/gm, '<span class="text-gray-500 italic">$&</span>');
    
    return highlighted;
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
            <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Live Code Showcase
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Interactive code examples showcasing advanced programming techniques and optimizations
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Code Snippet Selector */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            {codeSnippets.map((snippet, index) => (
              <motion.button
                key={snippet.id}
                onClick={() => setSelectedSnippet(index)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full text-left p-6 rounded-lg border transition-all duration-300 ${
                  selectedSnippet === index
                    ? 'bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border-purple-500'
                    : 'bg-gray-900/50 border-gray-700 hover:border-gray-600'
                }`}
              >
                <h3 className="font-semibold text-white mb-2">{snippet.title}</h3>
                <p className="text-sm text-gray-400 mb-3">{snippet.description}</p>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  snippet.language === 'typescript' 
                    ? 'bg-blue-500/20 text-blue-400'
                    : 'bg-green-500/20 text-green-400'
                }`}>
                  {snippet.language.toUpperCase()}
                </span>
              </motion.button>
            ))}
          </motion.div>

          {/* Code Display */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <div className="bg-gray-900 rounded-lg border border-gray-700 overflow-hidden">
              {/* Terminal Header */}
              <div className="flex items-center justify-between bg-gray-800 px-4 py-3 border-b border-gray-700">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <span className="text-sm text-gray-400 font-mono">
                  {codeSnippets[selectedSnippet].title.toLowerCase().replace(/\s+/g, '-')}.{codeSnippets[selectedSnippet].language}
                </span>
              </div>

              {/* Code Content */}
              <div className="p-6 font-mono text-sm leading-relaxed h-96 overflow-auto">
                <pre
                  className="text-gray-300"
                  dangerouslySetInnerHTML={{
                    __html: syntaxHighlight(displayedCode, codeSnippets[selectedSnippet].language)
                  }}
                />
                {isTyping && (
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
                    className="inline-block w-2 h-5 bg-cyan-400 ml-1"
                  />
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
