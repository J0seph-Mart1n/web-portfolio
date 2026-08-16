import React from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface V2LoadingScreenProps {
  appState: 'loading' | 'ready' | 'entered';
  loadingProgress: number;
  setAppState: (state: 'loading' | 'ready' | 'entered') => void;
}

export function V2LoadingScreen({ appState, loadingProgress, setAppState }: V2LoadingScreenProps) {
  return (
    <AnimatePresence>
      {appState !== 'entered' && (
        <motion.div
          key="loading-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-cover bg-center"
          style={{ backgroundImage: "linear-gradient(to bottom, rgba(0,0,0,0.6), rgba(0,0,0,0.9)), url('/Videos/frames/frame_0001.jpg')" }}
        >
          {appState === 'loading' ? (
            <motion.div
              key="progress"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="w-64 max-w-[80%] flex flex-col items-center gap-6"
            >
              <div className="text-zinc-500 font-mono text-[10px] md:text-xs tracking-[0.3em] uppercase opacity-70 animate-pulse">
                Initializing Sequence
              </div>
              <div className="w-full h-[1px] bg-zinc-900 relative">
                <motion.div 
                  className="absolute top-0 left-0 h-[1px] bg-[#87BCDE] shadow-[0_0_10px_#87BCDE]"
                  animate={{ width: `${loadingProgress}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>
              <div className="text-zinc-600 font-mono text-xs tracking-widest">{loadingProgress}%</div>
            </motion.div>
          ) : (
            <motion.button
              key="enter-btn"
              initial={{ opacity: 0, scale: 0.9, filter: "blur(4px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.8 }}
              onClick={() => setAppState('entered')}
              className="px-8 py-3 text-[#87BCDE] font-mono text-sm tracking-[0.2em] uppercase border border-[#87BCDE]/30 bg-transparent hover:bg-[#87BCDE]/5 hover:border-[#87BCDE]/80 transition-all duration-500 shadow-[0_0_15px_rgba(135,188,222,0.1)] hover:shadow-[0_0_30px_rgba(135,188,222,0.4)] relative overflow-hidden group cursor-pointer"
            >
              <span className="relative z-10">Enter Simulation</span>
              <div className="absolute inset-0 bg-[#87BCDE]/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out"></div>
            </motion.button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
