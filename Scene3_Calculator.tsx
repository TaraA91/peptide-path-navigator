import React from 'react';
import { motion } from 'framer-motion';
import PhoneMockup from './PhoneMockup';
import { Search, BookOpen } from 'lucide-react';

export default function Scene2_Library({ duration }: { duration: number }) {
  const cards = [
    { name: 'BPC-157', tag: 'Healing', color: '#00C9A7' },
    { name: 'Ipamorelin', tag: 'Growth', color: '#8B5CF6' },
    { name: 'Selank', tag: 'Cognitive', color: '#3B82F6' },
    { name: 'MOTS-c', tag: 'Wellness', color: '#FF6B6B' },
  ];

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-between px-[10vw] z-30"
      initial={{ clipPath: 'circle(0% at 80% 50%)' }}
      animate={{ clipPath: 'circle(150% at 50% 50%)' }}
      exit={{ scale: 0.9, opacity: 0, filter: 'blur(10px)' }}
      transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1] }}
    >
      {/* Background to give wiping effect over previous scene */}
      <div className="absolute inset-0 bg-[#080C12] -z-10" />

      {/* Left Content - Phone */}
      <div className="w-[30vw] h-[80vh] flex justify-center order-2 md:order-1">
        <PhoneMockup className="h-full w-full">
          <div className="p-6 h-full flex flex-col relative overflow-hidden">
            <motion.div 
              className="flex justify-between items-center mb-6"
              initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }}
            >
              <h3 className="text-2xl font-bold flex items-center gap-2">
                <BookOpen className="text-[#00C9A7]" /> Library
              </h3>
            </motion.div>

            <motion.div 
              className="bg-[#131C28] rounded-xl p-3 flex items-center gap-3 mb-6 border border-gray-800 text-gray-400"
              initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.6 }}
            >
              <Search size={18} />
              <span className="text-sm">Search 27 reference cards...</span>
            </motion.div>

            <div className="flex gap-2 mb-6 overflow-hidden pb-2">
              {['All', 'Healing', 'Growth'].map((tab, i) => (
                <motion.div 
                  key={tab}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap ${i === 0 ? 'bg-white text-black' : 'bg-[#131C28] text-gray-400 border border-gray-800'}`}
                  initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.7 + i * 0.1 }}
                >
                  {tab}
                </motion.div>
              ))}
            </div>

            <div className="flex-1 relative space-y-4 pt-4">
              {cards.map((card, i) => (
                <motion.div
                  key={i}
                  className="bg-[#131C28] p-5 rounded-2xl border border-gray-800 relative overflow-hidden"
                  initial={{ y: 100, opacity: 0, rotateX: 45 }}
                  animate={{ y: 0, opacity: 1, rotateX: 0 }}
                  transition={{ 
                    delay: 0.8 + i * 0.15, 
                    type: 'spring', 
                    stiffness: 200, 
                    damping: 20 
                  }}
                  style={{ transformOrigin: 'top center' }}
                >
                  {/* Left color stripe */}
                  <div className="absolute left-0 top-0 bottom-0 w-1.5" style={{ backgroundColor: card.color }}></div>
                  
                  <div className="flex justify-between items-start mb-2 pl-2">
                    <div className="font-bold text-lg text-white">{card.name}</div>
                    <div className="text-xs px-2 py-1 rounded bg-black/50 border border-gray-700 font-medium" style={{ color: card.color }}>
                      {card.tag}
                    </div>
                  </div>
                  <div className="pl-2 flex gap-3 mt-4">
                     <div className="h-2 w-16 bg-gray-800 rounded-full"></div>
                     <div className="h-2 w-12 bg-gray-800 rounded-full"></div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {/* Gradient mask at bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#080C12] to-transparent z-10 pointer-events-none"></div>
          </div>
        </PhoneMockup>
      </div>

      {/* Right Content */}
      <div className="w-1/2 pl-12 order-1 md:order-2">
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <div className="inline-block px-3 py-1 rounded-full bg-[#00C9A7]/10 text-[#00C9A7] font-semibold text-sm mb-6 border border-[#00C9A7]/30">
            LIBRARY
          </div>
          <h2 className="text-5xl font-display font-bold text-white mb-6 leading-tight">
            Comprehensive <span className="text-white bg-clip-text text-transparent bg-gradient-to-r from-[#00C9A7] to-[#3B82F6]">reference</span>
          </h2>
          <p className="text-xl text-gray-400 mb-8 max-w-md">
            Organise 27+ detailed peptide profiles. Categorised securely for your personal research data.
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}