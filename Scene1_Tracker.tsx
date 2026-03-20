import React from 'react';
import { motion } from 'framer-motion';

export default function Scene0_Open({ duration }: { duration: number }) {
  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, filter: 'blur(20px)', scale: 1.1 }}
      transition={{ duration: 1, ease: 'easeOut' }}
    >
      <div className="text-center flex flex-col items-center justify-center">
        {/* Logo Mark */}
        <motion.div
          className="w-24 h-24 mb-6 relative"
          initial={{ scale: 0.5, opacity: 0, rotate: -45 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="absolute inset-0 bg-[#00C9A7] opacity-20 blur-xl rounded-full" />
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-[#00C9A7]">
            <path d="M50 10L90 30V70L50 90L10 70V30L50 10Z" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="drop-shadow-lg"/>
            <path d="M50 35V65M35 50H65" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
            <circle cx="50" cy="50" r="15" stroke="currentColor" strokeWidth="4" />
          </svg>
        </motion.div>

        {/* Brand Name */}
        <div className="overflow-hidden">
          <motion.h1
            className="text-7xl font-display font-bold text-white tracking-tight"
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            Peptide<span className="text-[#00C9A7]">Path</span>
          </motion.h1>
        </div>

        {/* Tagline */}
        <div className="overflow-hidden mt-4">
          <motion.p
            className="text-2xl font-sans text-gray-400 font-medium"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            Your Protocol. Finally Organised.
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
}