import React from "react";
import { motion } from "framer-motion";

interface AvatarProps {
  src: string;
  alt: string;
}

export const KingdomHeartsAvatar: React.FC<AvatarProps> = ({ src, alt }) => {
  return (
    <div className="relative w-72 h-72 md:w-96 md:h-96 flex items-center justify-center">
      {/* SVG Container que desenha as barras de HP/MP */}
      <svg
        className="absolute w-full h-full rotate-[-90deg] drop-shadow-[0_0_10px_rgba(0,0,0,0.8)]"
        viewBox="0 0 200 200"
      >
        {/* Definição dos Degradês (Cores do KH) */}
        <defs>
          <linearGradient id="hpGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#facc15" /> {/* Amarelo */}
            <stop offset="50%" stopColor="#22c55e" /> {/* Verde */}
            <stop offset="100%" stopColor="#166534" /> {/* Verde Escuro */}
          </linearGradient>

          <linearGradient id="mpGradient" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3b82f6" /> {/* Azul Claro */}
            <stop offset="100%" stopColor="#1d4ed8" /> {/* Azul Escuro */}
          </linearGradient>
        </defs>

        {/* Círculo de Fundo (Cinza escuro/Base) */}
        <circle
          cx="100"
          cy="100"
          r="85"
          fill="black"
          stroke="#333"
          strokeWidth="8"
        />

        {/* --- BARRA DE MP (Azul - Arco Externo) --- */}
        {/* O 'pathLength' e 'strokeDash...' criam o efeito de arco incompleto */}
        <motion.circle
          cx="100"
          cy="100"
          r="92"
          fill="transparent"
          stroke="url(#mpGradient)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray="400" // Tamanho total
          strokeDashoffset="400" // Começa vazio
          initial={{ strokeDashoffset: 400 }}
          whileInView={{ strokeDashoffset: 280 }} // Enche até certo ponto (MP não é full circle)
          viewport={{ once: true }}
          transition={{ duration: 2, delay: 0.5, ease: "easeOut" }}
          className="opacity-90 blur-[1px]"
        />

        {/* --- BARRA DE HP (Verde - Arco Principal) --- */}
        <motion.circle
          cx="100"
          cy="100"
          r="85"
          fill="transparent"
          stroke="url(#hpGradient)"
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray="534" // Circunferência total (2 * pi * r)
          strokeDashoffset="534" // Começa vazio
          initial={{ strokeDashoffset: 534 }}
          whileInView={{ strokeDashoffset: 150 }} // Enche quase tudo (Vida cheia)
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "circOut" }}
          className="filter drop-shadow-[0_0_5px_rgba(34,197,94,0.8)]"
        />
      </svg>

      {/* A FOTO DO JOGADOR (Recortada em círculo) */}
      <div className="absolute w-[60%] h-[60%] rounded-full overflow-hidden border-4 border-black z-10 bg-gray-900 group cursor-pointer">
        <motion.img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
        />

        {/* Efeito de Dano (Flash Vermelho ao clicar) */}
        <motion.div
          className="absolute inset-0 bg-red-600 mix-blend-overlay"
          initial={{ opacity: 0 }}
          whileTap={{ opacity: 0.8 }}
        />
      </div>

      {/* LABEL "HP" (Estilo KH - Canto inferior direito) */}
      <div className="absolute bottom-6 right-6 z-20">
        <div className="font-black italic text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400 text-2xl drop-shadow-[0_2px_0_rgba(0,0,0,1)] tracking-tighter transform skew-x-[-10deg]">
          HP
        </div>
        <div className="w-16 h-1 bg-black/50 rounded-full mt-1 overflow-hidden">
          <motion.div
            className="h-full bg-green-500"
            initial={{ width: 0 }}
            whileInView={{ width: "100%" }}
            transition={{ duration: 1.5 }}
          />
        </div>
      </div>
    </div>
  );
};
