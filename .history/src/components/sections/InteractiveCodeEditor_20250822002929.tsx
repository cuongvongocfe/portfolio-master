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
    description: 'Custom hook for preventing unnecessary re-renders'
  },
  {
    id: '2',
    title: 'Advanced State Machine',
    language: 'typescript',
    code: `type State = 'idle' | 'loading' | 'success' | 'error';
type Action = 'FETCH' | 'SUCCESS' | 'ERROR' | 'RESET';

const stateMachine = {
  idle: { FETCH: 'loading' },
  loading: { SUCCESS: 'success', ERROR: 'error' },
  success: { RESET: 'idle', FETCH: 'loading' },
  error: { RESET: 'idle', FETCH: 'loading' }
} as const;

const useStateMachine = (initialState: State) => {
  const [state, setState] = useState<State>(initialState);
  
  const transition = (action: Action) => {
    const nextState = stateMachine[state]?.[action];
    if (nextState) setState(nextState);
  };
  
  return [state, transition] as const;
};`,
    description: 'Type-safe finite state machine implementation'
  },
  {
    id: '3',
    title: 'WebGL Shader Animation',
    language: 'glsl',
    code: `#version 300 es
precision mediump float;

uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;

out vec4 fragColor;

vec3 palette(float t) {
    vec3 a = vec3(0.5, 0.5, 0.5);
    vec3 b = vec3(0.5, 0.5, 0.5);
    vec3 c = vec3(1.0, 1.0, 1.0);
    vec3 d = vec3(0.263, 0.416, 0.557);
    
    return a + b * cos(6.28318 * (c * t + d));
}

void main() {
    vec2 uv = (gl_FragCoord.xy * 2.0 - u_resolution.xy) / u_resolution.y;
    vec2 uv0 = uv;
    vec3 finalColor = vec3(0.0);
    
    for (float i = 0.0; i < 4.0; i++) {
        uv = fract(uv * 1.5) - 0.5;
        
        float d = length(uv) * exp(-length(uv0));
        vec3 col = palette(length(uv0) + i * 0.4 + u_time * 0.4);
        
        d = sin(d * 8.0 + u_time) / 8.0;
        d = abs(d);
        d = pow(0.01 / d, 1.2);
        
        finalColor += col * d;
    }
    
    fragColor = vec4(finalColor, 1.0);
}`,
    description: 'Fragment shader for dynamic color palette animation'
  }
];

export default function InteractiveCodeEditor() {
  const [selectedSnippet, setSelectedSnippet] = useState(0);
  const [displayedCode, setDisplayedCode] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    setIsTyping(true);
    setDisplayedCode('');
    
    const code = codeSnippets[selectedSnippet].code;
    let index = 0;
    
    const typeCode = () => {
      if (index < code.length) {
        setDisplayedCode(code.slice(0, index + 1));
        index++;
        setTimeout(typeCode, 20);
      } else {
        setIsTyping(false);
      }
    };
    
    setTimeout(typeCode, 300);
  }, [selectedSnippet]);

  const syntaxHighlight = (code: string, language: string) => {
    const keywords = language === 'typescript' 
      ? ['const', 'let', 'var', 'function', 'return', 'if', 'else', 'for', 'while', 'class', 'interface', 'type', 'export', 'import', 'from', 'as', 'extends', 'implements']
      : ['precision', 'uniform', 'varying', 'attribute', 'vec2', 'vec3', 'vec4', 'float', 'int', 'bool', 'void', 'main', 'gl_FragCoord', 'gl_Position'];
    
    let highlighted = code;
    
    // Highlight keywords
    keywords.forEach(keyword => {
      const regex = new RegExp(`\\b${keyword}\\b`, 'g');
      highlighted = highlighted.replace(regex, `<span class="text-purple-400 font-semibold">${keyword}</span>`);
    });
    
    // Highlight strings
    highlighted = highlighted.replace(/'([^']*)'/g, '<span class="text-green-400">\'$1\'</span>');
    highlighted = highlighted.replace(/"([^"]*)"/g, '<span class="text-green-400">"$1"</span>');
    
    // Highlight numbers
    highlighted = highlighted.replace(/\b\d+\.?\d*\b/g, '<span class="text-blue-400">$&</span>');
    
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
