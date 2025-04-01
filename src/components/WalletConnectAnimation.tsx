
import React from 'react';
import { motion } from 'framer-motion';
import { Wallet } from 'lucide-react';

interface WalletConnectAnimationProps {
  isOpen: boolean;
}

const WalletConnectAnimation: React.FC<WalletConnectAnimationProps> = ({ isOpen }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-xl max-w-md w-full text-center"
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="flex justify-center mb-6"
        >
          <Wallet className="h-16 w-16 text-guardian-primary" />
        </motion.div>
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
          Connecting to Wallet
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Please check your wallet to authorize the connection request...
        </p>
        <div className="flex justify-center">
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              backgroundColor: ['#6366f1', '#818cf8', '#6366f1']
            }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="h-3 w-3 rounded-full bg-indigo-500 mx-1"
          />
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              backgroundColor: ['#6366f1', '#818cf8', '#6366f1']
            }}
            transition={{ repeat: Infinity, duration: 1.5, delay: 0.2 }}
            className="h-3 w-3 rounded-full bg-indigo-500 mx-1"
          />
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              backgroundColor: ['#6366f1', '#818cf8', '#6366f1']
            }}
            transition={{ repeat: Infinity, duration: 1.5, delay: 0.4 }}
            className="h-3 w-3 rounded-full bg-indigo-500 mx-1"
          />
        </div>
      </motion.div>
    </div>
  );
};

export default WalletConnectAnimation;
