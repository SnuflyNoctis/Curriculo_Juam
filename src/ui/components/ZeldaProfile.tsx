import React from "react";
import { motion } from "framer-motion";
import { Sword, Zap, Map } from "lucide-react";

// Componente para um Coração de Zelda (SVG Customizado)
const Heart = ({ filled, delay }: { filled: boolean; delay: number }) => (
  <motion.svg
    initial={{ scale: 0 }}
    animate={{ scale: 1 }}
    transition={{ delay, type: "spring", stiffness: 200 }}
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill={filled ? "#ff3e3e" : "rgba(100,0,0,0.5)"}
    stroke={filled ? "#ff3e3e" : "#5a0000"}
    strokeWidth="2"
    className="drop-shadow-[0_0_5px_rgba(255,0,0,0.6)]"
  >
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </motion.svg>
);

export const ZeldaProfile = () => {
  // Configuração dos Status
  const totalHearts = 10;
  const currentHearts = 9; // Deixa um vazio pra dar charme

  return (
    <div className="relative w-full max-w-5xl mx-auto p-4 md:p-8 mt-12 mb-24">

      {/* Container Principal estilo "Sheikah Slate" */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative bg-[#101010]/90 backdrop-blur-md border border-[#968c67] rounded-lg p-8 overflow-hidden"
      >
        {/* Detalhes Decorativos nos Cantos (Cantoneiras Douradas) */}
        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#ffd700]" />
        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#ffd700]" />
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#ffd700]" />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#ffd700]" />

        {/* Linha Decorativa no Topo */}
        <div className="flex items-center gap-4 mb-8 border-b border-[#968c67]/30 pb-4">
          <Map className="text-[#00f7ff]" size={24} />
          <h2 className="text-2xl md:text-3xl font-serif text-[#ffd700] tracking-widest uppercase" style={{ fontFamily: '"Cinzel", serif' }}>
            Adventure Log
          </h2>
        </div>

        <div className="flex flex-col md:flex-row gap-12 items-center">

          {/* --- COLUNA DA ESQUERDA: AVATAR + STATUS --- */}
          <div className="flex flex-col items-center gap-6">

            {/* Avatar com Moldura Mística */}
            <div className="relative group">
              <div className="w-48 h-48 rounded-full border-4 border-[#968c67] overflow-hidden relative z-10 shadow-[0_0_30px_rgba(0,0,0,0.8)]">
                <img
                  src="https://github.com/shadcn.png" // Troque pela sua foto!
                  alt="Avatar"
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                />
              </div>
              {/* Brilho Sheikah atrás */}
              <div className="absolute inset-0 bg-[#00f7ff]/20 rounded-full blur-xl -z-0 animate-pulse" />
            </div>

            {/* Status: CORAÇÕES (HP) */}
            <div className="flex gap-2 flex-wrap justify-center max-w-[250px]">
              {[...Array(totalHearts)].map((_, i) => (
                <Heart key={i} filled={i < currentHearts} delay={i * 0.1} />
              ))}
            </div>

            {/* Status: STAMINA (VIGOR) */}
            <div className="relative w-16 h-16 flex items-center justify-center">
              {/* Círculo de Fundo */}
              <svg className="absolute inset-0 w-full h-full transform -rotate-90">
                <circle cx="32" cy="32" r="28" stroke="#1a472a" strokeWidth="6" fill="transparent" />
                <motion.circle
                  cx="32" cy="32" r="28"
                  stroke="#00ff00" strokeWidth="6" fill="transparent"
                  strokeDasharray="175"
                  strokeDashoffset="175"
                  whileInView={{ strokeDashoffset: 40 }} // Enche a barra
                  transition={{ duration: 1.5, delay: 0.5 }}
                  className="drop-shadow-[0_0_5px_#00ff00]"
                />
              </svg>
              <Zap size={20} className="text-[#00ff00] fill-[#00ff00]" />
            </div>
          </div>

          {/* --- COLUNA DA DIREITA: TEXTO --- */}
          <div className="flex-1 text-center md:text-left space-y-6">

            <div>
              <h3 className="text-4xl font-serif text-[#e0e0d0] mb-2" style={{ fontFamily: '"Cinzel", serif' }}>
                João Victor
              </h3>
              <p className="text-[#00f7ff] tracking-[0.2em] text-sm uppercase font-bold">
                Fullstack Developer • Hyrule Champion
              </p>
            </div>

            <div className="bg-black/40 p-6 rounded border border-white/10 relative">
              <p className="text-[#b4c0b4] text-lg leading-relaxed font-serif italic">
                "Em um mundo vasto de códigos e bugs, iniciei minha jornada para dominar as artes antigas do React e da Arquitetura de Software.
                Assim como o Herói do Tempo, estou sempre buscando novas ferramentas para resolver os quebra-cabeças mais complexos."
              </p>
              {/* Aspas decorativas */}
              <span className="absolute top-2 left-2 text-4xl text-[#968c67] opacity-30 font-serif">“</span>
              <span className="absolute bottom-[-10px] right-4 text-4xl text-[#968c67] opacity-30 font-serif">”</span>
            </div>

            {/* Grid de Atributos */}
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="flex items-center gap-3 bg-[#1a1a1a] p-3 rounded border border-[#968c67]/30">
                <Sword className="text-[#ffd700]" size={20} />
                <div>
                  <p className="text-[10px] text-gray-400 uppercase tracking-wider">Main Weapon</p>
                  <p className="text-[#e0e0d0] font-bold">React.js / Node</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-[#1a1a1a] p-3 rounded border border-[#968c67]/30">
                <div className="w-5 h-5 rounded-full bg-green-500 shadow-[0_0_10px_green]" />
                <div>
                  <p className="text-[10px] text-gray-400 uppercase tracking-wider">Special Skill</p>
                  <p className="text-[#e0e0d0] font-bold">Creative UI</p>
                </div>
              </div>
            </div>

          </div>
        </div>

      </motion.div>
    </div>
  );
};