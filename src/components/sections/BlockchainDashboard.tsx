'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface Block {
  index: number;
  timestamp: number;
  data: string;
  previousHash: string;
  hash: string;
  nonce: number;
  difficulty: number;
}

interface Transaction {
  id: string;
  from: string;
  to: string;
  amount: number;
  timestamp: number;
  status: 'pending' | 'confirmed' | 'mining';
}

interface MiningStats {
  hashRate: number;
  difficulty: number;
  blocksPerSecond: number;
  totalBlocks: number;
  networkNodes: number;
}

export default function BlockchainDashboard() {
  const [blockchain, setBlockchain] = useState<Block[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [miningStats, setMiningStats] = useState<MiningStats>({
    hashRate: 0,
    difficulty: 4,
    blocksPerSecond: 0.2,
    totalBlocks: 0,
    networkNodes: 1247
  });
  const [isMining, setIsMining] = useState(false);
  const [minedBlocks, setMinedBlocks] = useState(0);

  // Initialize blockchain with genesis block
  useEffect(() => {
    const genesisBlock: Block = {
      index: 0,
      timestamp: Date.now(),
      data: 'Genesis Block',
      previousHash: '0',
      hash: '000ac7e7ea5e...',
      nonce: 0,
      difficulty: 4
    };
    setBlockchain([genesisBlock]);
    setMiningStats(prev => ({ ...prev, totalBlocks: 1 }));
  }, []);

  // Generate sample transactions
  useEffect(() => {
    const generateTransaction = () => {
      const wallets = ['0x1a2b', '0x3c4d', '0x5e6f', '0x7g8h', '0x9i0j'];
      const from = wallets[Math.floor(Math.random() * wallets.length)];
      let to = wallets[Math.floor(Math.random() * wallets.length)];
      while (to === from) {
        to = wallets[Math.floor(Math.random() * wallets.length)];
      }

      return {
        id: Math.random().toString(36).substr(2, 9),
        from,
        to,
        amount: parseFloat((Math.random() * 10).toFixed(2)),
        timestamp: Date.now(),
        status: 'pending' as const
      };
    };

    const interval = setInterval(() => {
      setTransactions(prev => {
        const newTx = generateTransaction();
        return [...prev.slice(-4), newTx];
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Mining simulation
  useEffect(() => {
    if (!isMining) return;

    const miningInterval = setInterval(() => {
      // Simulate hash rate
      setMiningStats(prev => ({
        ...prev,
        hashRate: Math.floor(Math.random() * 1000000) + 500000
      }));

      // Create new block
      const newBlock: Block = {
        index: blockchain.length,
        timestamp: Date.now(),
        data: `Block ${blockchain.length} - Transactions: ${transactions.filter(tx => tx.status === 'pending').length}`,
        previousHash: blockchain[blockchain.length - 1]?.hash || '0',
        hash: generateHash(),
        nonce: Math.floor(Math.random() * 1000000),
        difficulty: miningStats.difficulty
      };

      setBlockchain(prev => [...prev.slice(-5), newBlock]);
      setMinedBlocks(prev => prev + 1);
      setMiningStats(prev => ({ ...prev, totalBlocks: prev.totalBlocks + 1 }));

      // Confirm pending transactions
      setTransactions(prev => 
        prev.map(tx => 
          tx.status === 'pending' ? { ...tx, status: 'confirmed' } : tx
        )
      );
    }, 5000);

    return () => clearInterval(miningInterval);
  }, [isMining, blockchain, transactions, miningStats.difficulty]);

  const generateHash = () => {
    const chars = '0123456789abcdef';
    let hash = '000'; // Start with difficulty zeros
    for (let i = 0; i < 61; i++) {
      hash += chars[Math.floor(Math.random() * chars.length)];
    }
    return hash;
  };

  const startMining = () => {
    setIsMining(true);
  };

  const stopMining = () => {
    setIsMining(false);
  };

  return (
    <section id="blockchain" className="py-20 bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
              ⛓️ BLOCKCHAIN NETWORK ⛓️
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            🚀 Real-time blockchain simulation with mining, transactions, and network statistics 🚀
          </p>
        </motion.div>

        {/* Control Panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex justify-center mb-8"
        >
          <div className="flex gap-4">
            <motion.button
              onClick={startMining}
              disabled={isMining}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-3 rounded-lg font-bold ${
                isMining 
                  ? 'bg-gray-600 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600'
              } transition-all duration-300`}
            >
              {isMining ? '⛏️ MINING...' : '🚀 START MINING'}
            </motion.button>
            
            <motion.button
              onClick={stopMining}
              disabled={!isMining}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-3 rounded-lg font-bold ${
                !isMining 
                  ? 'bg-gray-600 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600'
              } transition-all duration-300`}
            >
              ⏹️ STOP MINING
            </motion.button>
          </div>
        </motion.div>

        {/* Mining Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8"
        >
          <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-lg p-4 border border-yellow-500/30">
            <div className="text-2xl font-bold text-yellow-400">
              {miningStats.hashRate.toLocaleString()}
            </div>
            <div className="text-sm text-gray-400">Hash Rate (H/s)</div>
          </div>
          
          <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg p-4 border border-purple-500/30">
            <div className="text-2xl font-bold text-purple-400">{miningStats.difficulty}</div>
            <div className="text-sm text-gray-400">Difficulty</div>
          </div>
          
          <div className="bg-gradient-to-br from-green-500/20 to-blue-500/20 rounded-lg p-4 border border-green-500/30">
            <div className="text-2xl font-bold text-green-400">{miningStats.totalBlocks}</div>
            <div className="text-sm text-gray-400">Total Blocks</div>
          </div>
          
          <div className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-lg p-4 border border-cyan-500/30">
            <div className="text-2xl font-bold text-cyan-400">{minedBlocks}</div>
            <div className="text-sm text-gray-400">Blocks Mined</div>
          </div>
          
          <div className="bg-gradient-to-br from-red-500/20 to-pink-500/20 rounded-lg p-4 border border-red-500/30">
            <div className="text-2xl font-bold text-red-400">{miningStats.networkNodes}</div>
            <div className="text-sm text-gray-400">Network Nodes</div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Blockchain Visualizer */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-gray-900/80 to-black/80 rounded-lg border border-gray-700 p-6"
          >
            <h3 className="text-2xl font-bold mb-4 text-center">
              <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                📦 Blockchain
              </span>
            </h3>
            
            <div className="space-y-4 max-h-96 overflow-y-auto custom-scrollbar">
              {blockchain.slice(-6).map((block, index) => (
                <motion.div
                  key={block.index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg p-4 border border-gray-600"
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-yellow-400 font-bold">Block #{block.index}</span>
                    <span className="text-xs text-gray-400">
                      {new Date(block.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-gray-400">Hash:</span>
                      <div className="text-green-400 font-mono text-xs break-all">
                        {block.hash.substring(0, 16)}...
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-400">Nonce:</span>
                      <div className="text-blue-400 font-mono">{block.nonce}</div>
                    </div>
                  </div>
                  
                  <div className="mt-2">
                    <span className="text-gray-400 text-sm">Data:</span>
                    <div className="text-purple-400 text-sm">{block.data}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Transaction Pool */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-gray-900/80 to-black/80 rounded-lg border border-gray-700 p-6"
          >
            <h3 className="text-2xl font-bold mb-4 text-center">
              <span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                💳 Transaction Pool
              </span>
            </h3>
            
            <div className="space-y-3 max-h-96 overflow-y-auto custom-scrollbar">
              {transactions.slice(-8).map((tx, index) => (
                <motion.div
                  key={tx.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className={`rounded-lg p-3 border ${
                    tx.status === 'confirmed' 
                      ? 'bg-green-500/20 border-green-500/30' 
                      : tx.status === 'mining'
                      ? 'bg-yellow-500/20 border-yellow-500/30'
                      : 'bg-gray-800 border-gray-600'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${
                        tx.status === 'confirmed' ? 'bg-green-400' : 
                        tx.status === 'mining' ? 'bg-yellow-400' : 'bg-gray-400'
                      }`}></span>
                      <span className="text-sm font-mono text-blue-400">{tx.id}</span>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded ${
                      tx.status === 'confirmed' ? 'bg-green-500/30 text-green-400' :
                      tx.status === 'mining' ? 'bg-yellow-500/30 text-yellow-400' :
                      'bg-gray-500/30 text-gray-400'
                    }`}>
                      {tx.status.toUpperCase()}
                    </span>
                  </div>
                  
                  <div className="mt-2 grid grid-cols-3 gap-2 text-sm">
                    <div>
                      <span className="text-gray-400">From:</span>
                      <div className="text-red-400 font-mono text-xs">{tx.from}</div>
                    </div>
                    <div>
                      <span className="text-gray-400">To:</span>
                      <div className="text-green-400 font-mono text-xs">{tx.to}</div>
                    </div>
                    <div>
                      <span className="text-gray-400">Amount:</span>
                      <div className="text-yellow-400 font-bold">{tx.amount} ETH</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Mining Status */}
        {isMining && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 text-center"
          >
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-lg px-6 py-3 border border-green-500/30">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-6 h-6 border-2 border-green-400 border-t-transparent rounded-full"
              />
              <span className="text-green-400 font-bold">Mining in progress... Finding next block with difficulty {miningStats.difficulty}</span>
            </div>
          </motion.div>
        )}
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(31, 41, 55, 0.5);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(45deg, #f59e0b, #ef4444);
          border-radius: 3px;
        }
      `}</style>
    </section>
  );
}
