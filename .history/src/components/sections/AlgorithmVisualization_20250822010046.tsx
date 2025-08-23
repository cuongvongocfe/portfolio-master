'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface SortStep {
  array: number[];
  comparing: number[];
  swapping: number[];
  sorted: number[];
}

interface Algorithm {
  name: string;
  description: string;
  timeComplexity: string;
  spaceComplexity: string;
  color: string;
}

const algorithms: Algorithm[] = [
  {
    name: 'Bubble Sort',
    description: 'Simple comparison-based sorting algorithm',
    timeComplexity: 'O(n²)',
    spaceComplexity: 'O(1)',
    color: 'from-red-500 to-pink-500'
  },
  {
    name: 'Quick Sort',
    description: 'Efficient divide-and-conquer sorting algorithm',
    timeComplexity: 'O(n log n)',
    spaceComplexity: 'O(log n)',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    name: 'Merge Sort',
    description: 'Stable divide-and-conquer sorting algorithm',
    timeComplexity: 'O(n log n)',
    spaceComplexity: 'O(n)',
    color: 'from-green-500 to-emerald-500'
  },
  {
    name: 'Heap Sort',
    description: 'Comparison-based sorting using binary heap',
    timeComplexity: 'O(n log n)',
    spaceComplexity: 'O(1)',
    color: 'from-purple-500 to-indigo-500'
  }
];

export default function AlgorithmVisualization() {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [steps, setSteps] = useState<SortStep[]>([]);
  const [array, setArray] = useState<number[]>([]);
  const [speed, setSpeed] = useState(100);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Generate random array
  const generateArray = () => {
    const newArray = Array.from({ length: 20 }, () => Math.floor(Math.random() * 100) + 5);
    setArray(newArray);
    setSteps([]);
    setCurrentStep(0);
    setIsRunning(false);
  };

  useEffect(() => {
    generateArray();
  }, []);

  // Bubble Sort Algorithm
  const bubbleSort = (arr: number[]): SortStep[] => {
    const steps: SortStep[] = [];
    const array = [...arr];
    const n = array.length;

    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        steps.push({
          array: [...array],
          comparing: [j, j + 1],
          swapping: [],
          sorted: Array.from({ length: i }, (_, k) => n - 1 - k)
        });

        if (array[j] > array[j + 1]) {
          steps.push({
            array: [...array],
            comparing: [],
            swapping: [j, j + 1],
            sorted: Array.from({ length: i }, (_, k) => n - 1 - k)
          });
          
          [array[j], array[j + 1]] = [array[j + 1], array[j]];
        }
      }
    }

    steps.push({
      array: [...array],
      comparing: [],
      swapping: [],
      sorted: Array.from({ length: n }, (_, i) => i)
    });

    return steps;
  };

  // Quick Sort Algorithm
  const quickSort = (arr: number[]): SortStep[] => {
    const steps: SortStep[] = [];
    const array = [...arr];

    const partition = (low: number, high: number): number => {
      const pivot = array[high];
      let i = low - 1;

      for (let j = low; j < high; j++) {
        steps.push({
          array: [...array],
          comparing: [j, high],
          swapping: [],
          sorted: []
        });

        if (array[j] < pivot) {
          i++;
          if (i !== j) {
            steps.push({
              array: [...array],
              comparing: [],
              swapping: [i, j],
              sorted: []
            });
            [array[i], array[j]] = [array[j], array[i]];
          }
        }
      }

      steps.push({
        array: [...array],
        comparing: [],
        swapping: [i + 1, high],
        sorted: []
      });
      [array[i + 1], array[high]] = [array[high], array[i + 1]];
      return i + 1;
    };

    const quickSortHelper = (low: number, high: number) => {
      if (low < high) {
        const pi = partition(low, high);
        quickSortHelper(low, pi - 1);
        quickSortHelper(pi + 1, high);
      }
    };

    quickSortHelper(0, array.length - 1);

    steps.push({
      array: [...array],
      comparing: [],
      swapping: [],
      sorted: Array.from({ length: array.length }, (_, i) => i)
    });

    return steps;
  };

  // Run algorithm
  const runAlgorithm = () => {
    if (isRunning) return;

    let algorithmSteps: SortStep[] = [];
    
    switch (selectedAlgorithm) {
      case 0:
        algorithmSteps = bubbleSort(array);
        break;
      case 1:
        algorithmSteps = quickSort(array);
        break;
      case 2:
        algorithmSteps = bubbleSort(array); // Simplified for demo
        break;
      case 3:
        algorithmSteps = bubbleSort(array); // Simplified for demo
        break;
    }

    setSteps(algorithmSteps);
    setCurrentStep(0);
    setIsRunning(true);

    intervalRef.current = setInterval(() => {
      setCurrentStep(prev => {
        if (prev >= algorithmSteps.length - 1) {
          setIsRunning(false);
          if (intervalRef.current) clearInterval(intervalRef.current);
          return prev;
        }
        return prev + 1;
      });
    }, 101 - speed);
  };

  const stopAlgorithm = () => {
    setIsRunning(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const getBarColor = (index: number) => {
    if (steps.length === 0) return 'bg-gray-600';
    
    const step = steps[currentStep];
    if (step.sorted.includes(index)) return 'bg-green-500';
    if (step.comparing.includes(index)) return 'bg-yellow-500';
    if (step.swapping.includes(index)) return 'bg-red-500';
    return 'bg-blue-500';
  };

  const currentArray = steps.length > 0 ? steps[currentStep]?.array || array : array;

  return (
    <section id="algorithm-visualization" className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16 px-4"
        >
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-500 bg-clip-text text-transparent">
              Algorithm Visualization
            </span>
          </h2>
          <p className="text-base sm:text-xl text-gray-400 max-w-3xl mx-auto break-words">
            Interactive demonstration of sorting algorithms with real-time complexity analysis
          </p>
        </motion.div>

        {/* Algorithm Selector */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8 px-2 sm:px-4">
          {algorithms.map((algorithm, index) => (
            <motion.button
              key={algorithm.name}
              onClick={() => setSelectedAlgorithm(index)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`p-3 sm:p-4 rounded-lg border transition-all duration-300 ${
                selectedAlgorithm === index
                  ? `bg-gradient-to-r ${algorithm.color} bg-opacity-20 border-current`
                  : 'bg-gray-800/50 border-gray-700 hover:border-gray-600'
              }`}
            >
              <h3 className="font-bold mb-1 sm:mb-2 text-sm sm:text-base break-words">{algorithm.name}</h3>
              <p className="text-xs sm:text-sm text-gray-400 mb-2 sm:mb-3 break-words">{algorithm.description}</p>
              <div className="flex flex-col sm:flex-row sm:justify-between text-xs gap-1 sm:gap-0">
                <span>Time: {algorithm.timeComplexity}</span>
                <span>Space: {algorithm.spaceComplexity}</span>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Visualization Area */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-8 mb-8"
        >
          <div className="flex justify-between items-center mb-6">
            <div className="flex gap-4">
              <button
                onClick={generateArray}
                disabled={isRunning}
                className="px-6 py-2 bg-gradient-to-r from-purple-500 to-cyan-500 text-white rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                Generate Array
              </button>
              <button
                onClick={isRunning ? stopAlgorithm : runAlgorithm}
                className={`px-6 py-2 rounded-lg font-medium transition-all ${
                  isRunning
                    ? 'bg-red-500 hover:bg-red-600'
                    : 'bg-green-500 hover:bg-green-600'
                } text-white`}
              >
                {isRunning ? 'Stop' : 'Start'}
              </button>
            </div>

            <div className="flex items-center gap-4">
              <label className="text-sm text-gray-400">Speed:</label>
              <input
                type="range"
                min="1"
                max="100"
                value={speed}
                onChange={(e) => setSpeed(Number(e.target.value))}
                disabled={isRunning}
                className="w-24 accent-purple-500"
              />
            </div>
          </div>

          {/* Array Visualization */}
          <div className="flex items-end justify-center gap-1 h-64 mb-6">
            {currentArray.map((value, index) => (
              <motion.div
                key={index}
                initial={{ height: 0 }}
                animate={{ height: `${(value / Math.max(...currentArray)) * 100}%` }}
                transition={{ duration: 0.3 }}
                className={`w-8 ${getBarColor(index)} rounded-t-sm relative group`}
              >
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs opacity-0 group-hover:opacity-100 transition-opacity bg-black px-2 py-1 rounded">
                  {value}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Legend */}
          <div className="flex justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-500 rounded"></div>
              <span>Unsorted</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-yellow-500 rounded"></div>
              <span>Comparing</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-500 rounded"></div>
              <span>Swapping</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500 rounded"></div>
              <span>Sorted</span>
            </div>
          </div>
        </motion.div>

        {/* Algorithm Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6 text-center">
            <h3 className="text-lg font-semibold mb-2">Current Step</h3>
            <div className="text-3xl font-bold text-cyan-400">
              {currentStep + 1} / {Math.max(steps.length, 1)}
            </div>
          </div>
          
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6 text-center">
            <h3 className="text-lg font-semibold mb-2">Array Size</h3>
            <div className="text-3xl font-bold text-purple-400">
              {currentArray.length}
            </div>
          </div>
          
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6 text-center">
            <h3 className="text-lg font-semibold mb-2">Time Complexity</h3>
            <div className="text-3xl font-bold text-green-400">
              {algorithms[selectedAlgorithm].timeComplexity}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
