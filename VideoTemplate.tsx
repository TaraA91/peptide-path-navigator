import React from 'react';
import { motion } from 'framer-motion';

export default function Scene5_Close({ duration }: { duration: number }) {
  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 1.5, ease: 'easeOut' }}
    >
      <div className="text-center flex flex-col items-center justify-center relative z-10">
        
        {/* Glow behind final logo */}
        <motion.div
          className="absolute inset-0 bg-[#00C9A7] blur-[150px] rounded-full -z-10"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 0.15, scale: 1 }}
          transition={{ duration: 2, delay: 0.5, ease: 'easeOut' }}
        />

        {/* Brand Name */}
        <div className="overflow-hidden mb-8">
          <motion.h1
            className="text-8xl font-display font-bold text-white tracking-tight"
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            Peptide<span className="text-[#00C9A7]">Path</span>
          </motion.h1>
        </div>

        {/* CTA */}
        <motion.div
          className="inline-block px-8 py-4 rounded-full bg-white text-black font-bold text-xl"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
        >
          Beta opening soon
        </motion.div>

        {/* App Store / Play Store Mocks */}
        <motion.div 
          className="flex gap-4 mt-12 opacity-50"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 0.5 }}
          transition={{ duration: 0.8, delay: 1.2, ease: "easeOut" }}
        >
           <div className="w-32 h-10 rounded border border-gray-600 bg-black flex items-center justify-center text-xs text-gray-400 font-bold">App Store</div>
           <div className="w-32 h-10 rounded border border-gray-600 bg-black flex items-center justify-center text-xs text-gray-400 font-bold">Google Play</div>
        </motion.div>

      </div>
    </motion.div>
  );
}