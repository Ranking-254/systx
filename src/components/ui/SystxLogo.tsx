"use client";
import { motion } from "framer-motion";

export const SystxLogo = () => {
  return (
    <div className="relative inline-block font-mono font-black italic text-xl md:text-2xl tracking-tighter cursor-pointer group">
      {/* 1. The Shadow/Glitch Base (Cyan) - Always visible but shifting */}
      <motion.span
        className="absolute top-0 left-[2px] z-0 text-cyan-500 opacity-60 whitespace-nowrap"
        animate={{ 
          x: [-1, 1, -1],
          y: [0.5, -0.5, 0.5],
        }}
        transition={{ 
          repeat: Infinity, 
          duration: 0.1, 
          ease: "linear" 
        }}
      >
        SYSTX // <span className="text-[10px] md:text-sm not-italic font-light tracking-widest">DIGITAL_INFRA</span>
      </motion.span>

      {/* 2. The Shadow/Glitch Base (Red) - Always visible but shifting opposite */}
      <motion.span
        className="absolute top-0 left-[-2px] z-0 text-red-500 opacity-60 whitespace-nowrap"
        animate={{ 
          x: [1, -1, 1],
          y: [-0.5, 0.5, -0.5],
        }}
        transition={{ 
          repeat: Infinity, 
          duration: 0.1, 
          ease: "linear" 
        }}
      >
        SYSTX // <span className="text-[10px] md:text-sm not-italic font-light tracking-widest">DIGITAL_INFRA</span>
      </motion.span>

      {/* 3. The Main Content (White) - Static center */}
      <span className="relative z-10 text-white group-hover:text-emerald-400 transition-colors duration-300">
        SYSTX // <span className="text-emerald-500 text-[10px] md:text-sm not-italic font-light tracking-widest">DIGITAL_INFRA</span>
      </span>

      {/* 4. Rare "Big Glitch" Overlay - Occurs occasionally for flavor */}
      <motion.span
        className="absolute inset-0 z-20 text-white opacity-0 whitespace-nowrap"
        animate={{ 
          opacity: [0, 0.8, 0],
          x: [0, -5, 5, 0],
          clipPath: [
            "inset(0 0 0 0)",
            "inset(20% 0 50% 0)",
            "inset(80% 0 10% 0)",
            "inset(0 0 0 0)"
          ]
        }}
        transition={{ 
          repeat: Infinity, 
          duration: 0.4, 
          repeatDelay: 2,
          ease: "easeInOut" 
        }}
      >
        SYSTX // DIGITAL_INFRA
      </motion.span>
    </div>
  );
};