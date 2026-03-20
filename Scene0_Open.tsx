import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

export default function PhoneMockup({ children, className = '' }: { children: ReactNode, className?: string }) {
  return (
    <motion.div 
      className={`relative rounded-[3rem] border-[8px] border-[#222B36] bg-[#080C12] overflow-hidden shadow-2xl shadow-black/50 ${className}`}
      style={{ aspectRatio: '9/19.5' }}
    >
      {/* Dynamic Island / Notch */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-[4%] bg-[#222B36] rounded-b-[1.5rem] z-50"></div>
      
      {/* Screen Content */}
      <div className="absolute inset-0 z-10 pt-[10%]">
        {children}
      </div>
    </motion.div>
  );
}