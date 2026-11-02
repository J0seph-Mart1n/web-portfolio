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
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#FAF7E8]"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(0, 0, 0, 0.06) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(0, 0, 0, 0.06) 1px, transparent 1px)
            `,
            backgroundSize: '32px 32px'
          }}
        >
          {/* Persona Neo-Brutalist Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-md mx-4 bg-[#FFFFF8] border-2 border-black shadow-[6px_6px_0px_#000000] relative overflow-hidden flex flex-col"
          >
            {/* Top Yellow Status Bar */}
            <div className="w-full h-2.5 bg-[#FFEE00] border-b-2 border-black" />

            <div className="p-8 flex flex-col items-center text-center">
              {/* Protocol Identifier */}
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2.5 h-2.5 bg-black rounded-none" />
                <span className="font-mono text-xs font-bold tracking-widest uppercase text-black">
                  VECTOR.OS // PORTFOLIO ARCHITECTURE
                </span>
              </div>

              <h2 className="text-2xl md:text-3xl font-extrabold uppercase tracking-tight text-black mb-2">
                JOSEPH MARTIN
              </h2>

              <p className="font-mono text-xs uppercase tracking-wider text-neutral-600 mb-8">
                3D SCROLL GRAPH &bull; ARCHITECTURAL SPEC
              </p>

              {appState === 'loading' ? (
                <div className="w-full flex flex-col gap-3">
                  <div className="flex justify-between items-center font-mono text-xs font-bold text-black">
                    <span className="animate-pulse">LOADING VECTORS...</span>
                    <span>{loadingProgress}%</span>
                  </div>

                  {/* High contrast progress bar */}
                  <div className="w-full h-4 border-2 border-black bg-neutral-200/50 p-0.5 relative">
                    <motion.div
                      className="h-full bg-[#FFEE00]"
                      animate={{ width: `${loadingProgress}%` }}
                      transition={{ duration: 0.15 }}
                    />
                  </div>

                  <div className="font-mono text-[10px] uppercase tracking-widest text-neutral-500 mt-2">
                    NODE 01 / 03 &bull; PARSING GEOMETRY CACHE
                  </div>
                </div>
              ) : (
                <motion.button
                  key="enter-btn"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    sessionStorage.setItem('hasVisitedV2', 'true');
                    setAppState('entered');
                  }}
                  className="w-full py-4 px-6 bg-[#FFEE00] hover:bg-[#FAFF00] text-black font-mono font-black text-sm tracking-widest uppercase border-2 border-black shadow-[4px_4px_0px_#000] hover:shadow-[6px_6px_0px_#000] transition-all flex items-center justify-center gap-3 cursor-pointer"
                >
                  <span>INITIALIZE PROTOCOL</span>
                  <span className="text-base">&rarr;</span>
                </motion.button>
              )}
            </div>

            {/* Bottom Technical Status Bar */}
            <div className="w-full py-2 px-4 bg-neutral-100 border-t-2 border-black flex justify-between items-center font-mono text-[10px] text-neutral-700">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 bg-[#FFEE00] border border-black inline-block"></span>
                SYSTEM ACTIVE
              </span>
              <span>VER 2.5 // PRODUCTION</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
