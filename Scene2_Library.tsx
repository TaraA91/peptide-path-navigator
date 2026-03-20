import React from 'react';
import { motion } from 'framer-motion';
import PhoneMockup from './PhoneMockup';
import { Activity, CheckCircle, TrendingUp } from 'lucide-react';

export default function Scene1_Tracker({ duration }: { duration: number }) {
  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-between px-[10vw] z-20"
      initial={{ x: '100vw', opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: '-100vw', opacity: 0 }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Left Content */}
      <div className="w-1/2 pr-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <div className="inline-block px-3 py-1 rounded-full bg-[#00C9A7]/10 text-[#00C9A7] font-semibold text-sm mb-6 border border-[#00C9A7]/30">
            TRACKER
          </div>
          <h2 className="text-5xl font-display font-bold text-white mb-6 leading-tight">
            Log your <span className="text-[#00C9A7]">research tracking</span> with precision
          </h2>
          <p className="text-xl text-gray-400 mb-8 max-w-md">
            Educational reference and personal organisation. Keep your user-defined data meticulously logged.
          </p>
          <p className="text-sm text-gray-600 italic mt-auto absolute bottom-10">
            * Zero medical claims. For research tracking and educational reference only.
          </p>
        </motion.div>
      </div>

      {/* Right Content - Phone */}
      <div className="w-[30vw] h-[80vh] flex justify-center">
        <PhoneMockup className="h-full w-full">
          <div className="p-6 h-full flex flex-col">
            <motion.div 
              className="flex justify-between items-center mb-8"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
            >
              <h3 className="text-2xl font-bold">Today</h3>
              <div className="flex items-center gap-2 bg-[#131C28] px-3 py-1.5 rounded-full border border-gray-800">
                <TrendingUp size={16} className="text-[#00C9A7]" />
                <span className="font-bold text-[#00C9A7]">7 Day Streak</span>
              </div>
            </motion.div>

            {/* Stats row */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <motion.div 
                className="bg-[#131C28] p-4 rounded-2xl border border-gray-800"
                initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 1.2, type: 'spring' }}
              >
                <div className="text-gray-400 text-sm mb-1">Weekly Logs</div>
                <div className="text-3xl font-bold text-white">12</div>
              </motion.div>
              <motion.div 
                className="bg-[#131C28] p-4 rounded-2xl border border-gray-800"
                initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 1.3, type: 'spring' }}
              >
                <div className="text-gray-400 text-sm mb-1">Active Subjects</div>
                <div className="text-3xl font-bold text-[#FF6B6B]">3</div>
              </motion.div>
            </div>

            <div className="text-lg font-semibold mb-4 text-gray-300">Recent Logs</div>

            {/* List */}
            <div className="space-y-4 flex-1">
              {[
                { name: 'BPC-157', dose: '250mcg', time: '08:00 AM', type: 'Healing' },
                { name: 'TB-500', dose: '2.5mg', time: '08:05 AM', type: 'Healing' },
                { name: 'CJC-1295', dose: '100mcg', time: 'Yesterday', type: 'Growth' },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="bg-[#131C28] p-4 rounded-2xl border border-gray-800 flex items-center justify-between"
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 1.5 + i * 0.15, type: 'spring', stiffness: 300, damping: 25 }}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#00C9A7]/20 flex items-center justify-center text-[#00C9A7]">
                      <CheckCircle size={20} />
                    </div>
                    <div>
                      <div className="font-bold text-white">{item.name}</div>
                      <div className="text-sm text-gray-400">{item.dose} • {item.time}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {/* Bottom Nav Mock */}
            <div className="mt-auto pt-4 border-t border-gray-800 flex justify-around opacity-50 pb-2">
               <div className="w-10 h-10 rounded-full bg-gray-800"></div>
               <div className="w-10 h-10 rounded-full bg-gray-800"></div>
               <div className="w-10 h-10 rounded-full bg-gray-800"></div>
               <div className="w-10 h-10 rounded-full bg-gray-800"></div>
            </div>
          </div>
        </PhoneMockup>
      </div>
    </motion.div>
  );
}