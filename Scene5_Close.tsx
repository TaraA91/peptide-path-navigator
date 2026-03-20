import React from 'react';
import { motion } from 'framer-motion';
import PhoneMockup from './PhoneMockup';
import { Package, AlertTriangle } from 'lucide-react';

export default function Scene4_Inventory({ duration }: { duration: number }) {
  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-between px-[10vw] z-50"
      initial={{ y: '100vh', opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Left Content - Phone */}
      <div className="w-[30vw] h-[80vh] flex justify-center order-2 md:order-1 relative">
        <PhoneMockup className="h-full w-full">
          <div className="p-6 h-full flex flex-col bg-[#080C12]">
            <motion.div 
              className="flex justify-between items-center mb-8"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
            >
              <h3 className="text-2xl font-bold flex items-center gap-2">
                <Package className="text-[#00C9A7]" /> Inventory
              </h3>
            </motion.div>

            <div className="space-y-5">
              {/* Healthy Item */}
              <motion.div 
                className="bg-[#131C28] p-4 rounded-2xl border border-gray-800"
                initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.7, type: 'spring' }}
              >
                <div className="flex justify-between items-center mb-3">
                  <div className="font-bold text-white">BPC-157</div>
                  <div className="text-sm text-gray-400">18 / 20 doses</div>
                </div>
                <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-[#00C9A7]"
                    initial={{ width: 0 }} animate={{ width: '90%' }} transition={{ delay: 1.2, duration: 1, ease: "easeOut" }}
                  />
                </div>
              </motion.div>

              {/* Low Supply Item */}
              <motion.div 
                className="bg-[#131C28] p-4 rounded-2xl border border-[#F59E0B]/30 relative overflow-hidden"
                initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.9, type: 'spring' }}
              >
                <motion.div 
                  className="absolute inset-0 bg-[#F59E0B]/5"
                  animate={{ opacity: [0, 0.5, 0] }}
                  transition={{ delay: 1.5, duration: 1, repeat: Infinity, repeatType: "reverse" }}
                />
                
                <div className="flex justify-between items-start mb-3 relative z-10">
                  <div>
                    <div className="font-bold text-white">TB-500</div>
                    <motion.div 
                      className="flex items-center gap-1 text-[#F59E0B] text-xs font-bold mt-1 uppercase tracking-wider"
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6 }}
                    >
                      <AlertTriangle size={12} /> Low Supply
                    </motion.div>
                  </div>
                  <div className="text-sm text-[#F59E0B] font-bold">2 / 10 doses</div>
                </div>
                <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden relative z-10">
                  <motion.div 
                    className="h-full bg-[#F59E0B]"
                    initial={{ width: 0 }} animate={{ width: '20%' }} transition={{ delay: 1.4, duration: 1, ease: "easeOut" }}
                  />
                </div>
              </motion.div>

              {/* Healthy Item 2 */}
              <motion.div 
                className="bg-[#131C28] p-4 rounded-2xl border border-gray-800"
                initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 1.1, type: 'spring' }}
              >
                <div className="flex justify-between items-center mb-3">
                  <div className="font-bold text-white">Ipamorelin</div>
                  <div className="text-sm text-gray-400">12 / 15 doses</div>
                </div>
                <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-[#00C9A7]"
                    initial={{ width: 0 }} animate={{ width: '80%' }} transition={{ delay: 1.6, duration: 1, ease: "easeOut" }}
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </PhoneMockup>
      </div>

      {/* Right Content */}
      <div className="w-1/2 pl-12 order-1 md:order-2">
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <div className="inline-block px-3 py-1 rounded-full bg-[#F59E0B]/10 text-[#F59E0B] font-semibold text-sm mb-6 border border-[#F59E0B]/30">
            INVENTORY
          </div>
          <h2 className="text-5xl font-display font-bold text-white mb-6 leading-tight">
            Never miss a <span className="text-[#F59E0B]">restock</span>
          </h2>
          <p className="text-xl text-gray-400 mb-8 max-w-md">
            Visual dose tracking. Know exactly when your supply runs low.
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}