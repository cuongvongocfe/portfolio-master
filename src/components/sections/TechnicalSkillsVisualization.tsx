'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface Skill {
  name: string;
  level: number;
  category: string;
  icon: string;
  projects: number;
  yearsExp: number;
  certifications: string[];
  color: string;
}

const skillsData: Skill[] = [
  {
    name: 'React',
    level: 85,
    category: 'Frontend',
    icon: '⚛️',
    projects: 8,
    yearsExp: 2,
    certifications: ['Self-taught through practice'],
    color: 'from-blue-400 to-cyan-500'
  },
  {
    name: 'TypeScript',
    level: 75,
    category: 'Language',
    icon: '🔷',
    projects: 6,
    yearsExp: 1.5,
    certifications: ['Practical experience'],
    color: 'from-blue-500 to-indigo-600'
  },
  {
    name: 'Next.js',
    level: 80,
    category: 'Framework',
    icon: '▲',
    projects: 5,
    yearsExp: 1.5,
    certifications: ['Portfolio projects'],
    color: 'from-gray-700 to-black'
  },
  {
    name: 'Three.js',
    level: 70,
    category: '3D Graphics',
    icon: '🎮',
    projects: 3,
    yearsExp: 1,
    certifications: ['Creative projects'],
    color: 'from-green-400 to-emerald-500'
  },
  {
    name: 'WebGL',
    level: 60,
    category: 'Graphics',
    icon: '🎨',
    projects: 2,
    yearsExp: 0.5,
    certifications: ['Learning in progress'],
    color: 'from-purple-400 to-pink-500'
  },
  {
    name: 'Node.js',
    level: 65,
    category: 'Backend',
    icon: '🟢',
    projects: 4,
    yearsExp: 1,
    certifications: ['Basic backend knowledge'],
    color: 'from-green-500 to-lime-500'
  },
  {
    name: 'AWS',
    level: 55,
    category: 'Cloud',
    icon: '☁️',
    projects: 2,
    yearsExp: 0.5,
    certifications: ['Basic deployment'],
    color: 'from-orange-400 to-yellow-500'
  },
  {
    name: 'Docker',
    level: 50,
    category: 'DevOps',
    icon: '🐳',
    projects: 2,
    yearsExp: 0.5,
    certifications: ['Learning fundamentals'],
    color: 'from-blue-600 to-cyan-600'
  }
];

const categories = ['All', 'Frontend', 'Backend', 'Language', 'Framework', '3D Graphics', 'Graphics', 'Cloud', 'DevOps'];

export default function TechnicalSkillsVisualization() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);

  const filteredSkills = selectedCategory === 'All' 
    ? skillsData 
    : skillsData.filter(skill => skill.category === selectedCategory);

  return (
    <section className="py-20 bg-gradient-to-br from-black via-gray-900 to-black text-white overflow-hidden">
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
              Technical Expertise
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Advanced skill visualization with real-time proficiency metrics and project analytics
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setSelectedCategory(category)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-purple-500 to-cyan-500 text-white'
                  : 'bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700'
              }`}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {filteredSkills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, rotateY: 5 }}
              onClick={() => setSelectedSkill(skill)}
              className="relative bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 cursor-pointer group hover:border-purple-500 transition-all duration-300"
            >
              {/* Skill Icon & Name */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{skill.icon}</span>
                  <div>
                    <h3 className="font-bold text-white">{skill.name}</h3>
                    <p className="text-xs text-gray-400">{skill.category}</p>
                  </div>
                </div>
                <span className={`text-2xl font-bold bg-gradient-to-r ${skill.color} bg-clip-text text-transparent`}>
                  {skill.level}%
                </span>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
                    viewport={{ once: true }}
                    className={`h-full bg-gradient-to-r ${skill.color} rounded-full relative`}
                  >
                    <motion.div
                      animate={{ x: ['-100%', '100%'] }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                      className="absolute inset-0 bg-white/30 w-8 rounded-full"
                    />
                  </motion.div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="bg-gray-900/50 rounded-lg p-2 text-center">
                  <div className="font-bold text-cyan-400">{skill.projects}</div>
                  <div className="text-gray-400">Projects</div>
                </div>
                <div className="bg-gray-900/50 rounded-lg p-2 text-center">
                  <div className="font-bold text-green-400">{skill.yearsExp}y</div>
                  <div className="text-gray-400">Experience</div>
                </div>
              </div>

              {/* Hover Glow Effect */}
              <div className={`absolute inset-0 bg-gradient-to-r ${skill.color} opacity-0 group-hover:opacity-20 rounded-xl transition-opacity duration-300`} />
            </motion.div>
          ))}
        </div>

        {/* Skill Detail Modal */}
        {selectedSkill && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedSkill(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-gray-800 border border-gray-700 rounded-2xl p-8 max-w-md w-full"
            >
              <div className="flex items-center gap-4 mb-6">
                <span className="text-4xl">{selectedSkill.icon}</span>
                <div>
                  <h3 className="text-2xl font-bold text-white">{selectedSkill.name}</h3>
                  <p className="text-gray-400">{selectedSkill.category}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-400">Proficiency Level</span>
                    <span className={`font-bold bg-gradient-to-r ${selectedSkill.color} bg-clip-text text-transparent`}>
                      {selectedSkill.level}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-3">
                    <div 
                      className={`h-full bg-gradient-to-r ${selectedSkill.color} rounded-full`}
                      style={{ width: `${selectedSkill.level}%` }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center bg-gray-900/50 rounded-lg p-3">
                    <div className="text-2xl font-bold text-cyan-400">{selectedSkill.projects}</div>
                    <div className="text-sm text-gray-400">Projects Completed</div>
                  </div>
                  <div className="text-center bg-gray-900/50 rounded-lg p-3">
                    <div className="text-2xl font-bold text-green-400">{selectedSkill.yearsExp}</div>
                    <div className="text-sm text-gray-400">Years Experience</div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-white mb-2">Certifications</h4>
                  <div className="space-y-2">
                    {selectedSkill.certifications.map((cert, index) => (
                      <div key={index} className="bg-gray-900/50 rounded-lg p-2 text-sm text-gray-300">
                        🏆 {cert}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <button
                onClick={() => setSelectedSkill(null)}
                className="w-full mt-6 bg-gradient-to-r from-purple-500 to-cyan-500 text-white py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
