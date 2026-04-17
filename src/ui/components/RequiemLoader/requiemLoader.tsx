import React from "react";
import { motion } from "framer-motion";

export const ResidentEvilLoader = () => {
  return (
    // Adicionei min-h-screen e o fundo escuro para cobrir a tela inteira durante o loading!
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#0a0a0a] gap-4">
      <div className="relative w-16 h-16">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 border-4 border-t-red-600 border-r-transparent border-b-red-900 border-l-transparent rounded-full shadow-[0_0_15px_rgba(220,38,38,0.5)]"
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="absolute inset-4 bg-red-600 rounded-full blur-sm"
        />
      </div>

      {/* O texto agora está DENTRO da tag de abertura e fechamento, e com o inglês corrigido */}
      <motion.p
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="text-red-500 font-mono text-[10px] tracking-[0.5em] uppercase mt-2"
      >
        Accessing Bio-Data...
      </motion.p>
    </div>
  );
};
