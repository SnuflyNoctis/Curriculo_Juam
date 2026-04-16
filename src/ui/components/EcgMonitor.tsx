import { motion } from 'framer-motion';

export const EcgMonitor = () => {
  return (
    <div className="relative w-full h-16 bg-black/40 border border-cyan-900/50 rounded-sm overflow-hidden mb-4">
      <div className="absolute inset-0 bg-[linear-gradient(transparent_1px, #000_1px),linear-gradient(90deg, transparent_1px,#000_1px)] bg-[size:4px_4px] opacity-20"></div>

      {/* Linha de ECG */}
      <svg className="w-full h-full" viewBox="0 0 300 100" preserveAspectRatio="none">
        <motion.path
          d="M0,50 L20,50 L30,50 L40,20, L50,80, L60,50 L80,50 L300,50"
          fill="none"
          stroke="#00ff00"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0, x: -300 }}
          animate={{
            pathLength: [0, 1, 0],
            opacity: [0, 1, 0],
            x: [0, 300]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear",
            repeatDelay: 0.5
          }}
          style={{ filter: "drop-shadow(0 0 5px #00ff00)" }}
          />
      </svg>

      {/* Texto de integridade */}
      <div className="absolute bottom-1 right-2 text-[10px] font-mono text-green-400 tracking-widest animate-pulse">
        CONDITION: FINE
    </div>
    </div>
  );
};