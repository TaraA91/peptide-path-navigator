import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import PhoneMockup from './PhoneMockup';
import { Calculator } from 'lucide-react';

export default function Scene3_Calculator({ duration }: { duration: number }) {
  const [doses, setDoses] = useState(0);

  useEffect(() => {
    // Simulate calculation count up
    const timer = setTimeout(() => {
      let current = 0;
      const interval = setInterval(() => {
        current += 1;
        setDoses(current);
        if (current >= 20) clearInterval(interval);
      }, 50);
      return () => clearInterval(interval);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-between px-[10vw] z-40"
      initial={{ opacity: 0, scale: 1.1 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ y: '-100vh', opacity: 0 }}
      transition={{ duration: 1, ease: 'easeInOut' }}
    >
      {/* Left Content */}
      <div className="w-1/2 pr-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <div className="inline-block px-3 py-1 rounded-full bg-[#00C9A7]/10 text-[#00C9A7] font-semibold text-sm mb-6 border border-[#00C9A7]/30">
            VIAL CALCULATOR
          </div>
          <h2 className="text-5xl font-display font-bold text-white mb-6 leading-tight">
            Math, <span className="text-gray-500 line-through mr-2">complicated.</span><br/>
            Math, <span className="text-[#00C9A7]">automated.</span>
          </h2>
          <p className="text-xl text-gray-400 mb-8 max-w-md">
            Input vial size, water volume, and syringe units. Get instant dose clarity.
          </p>
        </motion.div>
      </div>

      {/* Right Content - Phone */}
      <div className="w-[30vw] h-[80vh] flex justify-center relative">
        <PhoneMockup className="h-full w-full">
          <div className="p-6 h-full flex flex-col relative bg-[#080C12]">
            <motion.div 
              className="flex items-center gap-3 mb-8"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
            >
              <div className="w-10 h-10 rounded-xl bg-[#00C9A7]/20 flex items-center justify-center text-[#00C9A7]">
                <Calculator size={20} />
              </div>
              <h3 className="text-2xl font-bold">Calculator</h3>
            </motion.div>

            {/* Inputs */}
            <div className="space-y-4 mb-8">
              {[
                { label: 'Vial Size (mg)', val: '5', unit: 'mg', delay: 1.0 },
                { label: 'Bact. Water (mL)', val: '2', unit: 'mL', delay: 1.2 },
                { label: 'Syringe Pull (Units)', val: '10', unit: 'IU', delay: 1.4 },
              ].map((input, i) => (
                <motion.div 
                  key={i}
                  className="bg-[#131C28] p-4 rounded-2xl border border-gray-800 relative overflow-hidden group"
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: input.delay, type: 'spring' }}
                >
                  <motion.div 
                    className="absolute inset-0 bg-[#00C9A7]/5 opacity-0"
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ delay: input.delay + 0.5, duration: 0.8 }}
                  />
                  <div className="text-sm text-gray-400 mb-1">{input.label}</div>
                  <div className="flex justify-between items-baseline">
                    <div className="text-2xl font-bold text-white font-mono">{input.val}</div>
                    <div className="text-gray-500 font-medium">{input.unit}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Results Card */}
            <motion.div
              className="mt-auto bg-gradient-to-br from-[#00C9A7]/20 to-[#131C28] p-6 rounded-3xl border border-[#00C9A7]/30 shadow-[0_0_30px_rgba(0,201,167,0.15)] relative overflow-hidden"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.8, type: 'spring' }}
            >
              {/* Glow effect */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#00C9A7]/30 blur-3xl rounded-full"></div>
              
              <div className="text-sm text-[#00C9A7] font-semibold mb-2 uppercase tracking-wider">Result</div>
              <div className="flex items-end gap-2 mb-4">
                <div className="text-5xl font-display font-bold text-white">250</div>
                <div className="text-xl text-gray-400 font-medium pb-1">mcg / pull</div>
              </div>
              
              <div className="w-full h-[1px] bg-white/10 my-4"></div>
              
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-400">Total Doses per Vial</div>
                <motion.div className="text-xl font-bold text-white">
                  {doses}
                </motion.div>
              </div>
            </motion.div>
          </div>
        </PhoneMockup>
        
        {/* Floating elements behind phone */}
        <motion.div 
          className="absolute -right-8 top-1/4 w-24 h-24 rounded-full border border-[#00C9A7]/30 -z-10"
          animate={{ rotate: 360, scale: [1, 1.1, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
        />
      </div>
    </motion.div>
  );
}