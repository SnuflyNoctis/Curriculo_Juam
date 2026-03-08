import React from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

// --- IMPORTS DOS COMPONENTES ---
import { ZeldaProfile } from "../components/ZeldaProfile";
import { ZeldaBackground } from "../components/ZeldaBackground";

// Componente da Triforce Animada
const AnimatedTriforce = () => {
  const draw = {
    hidden: { pathLength: 0, fill: "rgba(255, 215, 0, 0)" },
    visible: {
      pathLength: 1,
      fill: "rgba(255, 215, 0, 0.4)",
      transition: { pathLength: { duration: 2, ease: "easeInOut" }, fill: { duration: 1, delay: 1.5 } }
    }
  };

  return (
    <motion.svg
      width="60" height="52" viewBox="0 0 60 52"
      className="absolute -top-20 left-1/2 -translate-x-1/2 drop-shadow-[0_0_15px_rgba(255,215,0,0.8)]"
    >
      {/* Triângulo Topo */}
      <motion.polygon points="30,0 45,26 15,26" fill="none" stroke="#ffd700" strokeWidth="1.5" variants={draw} initial="hidden" animate="visible" />
      {/* Triângulo Esquerda */}
      <motion.polygon points="15,26 30,52 0,52" fill="none" stroke="#ffd700" strokeWidth="1.5" variants={draw} initial="hidden" animate="visible" />
      {/* Triângulo Direita */}
      <motion.polygon points="45,26 60,52 30,52" fill="none" stroke="#ffd700" strokeWidth="1.5" variants={draw} initial="hidden" animate="visible" />
    </motion.svg>
  );
};

export const Hero = () => {
  const scrollToProfile = () => {
    const profileSection = document.getElementById("profile-section");
    if (profileSection) {
      profileSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="relative w-full min-h-screen bg-black text-[#e0e0d0] font-serif selection:bg-[#00f7ff] selection:text-black overflow-x-hidden"
    >
      {/* --- BACKGROUNDS --- */}
      <div className="absolute inset-0 z-0 pointer-events-none h-screen">
        <motion.div
          className="absolute inset-0 opacity-40 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.alphacoders.com/796/796062.jpg')" }}
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, ease: "linear" }}
        />
        {/* Gradientes noturnos estilo Zelda */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#020617]/80 via-black/50 to-black" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000000_90%)]" />

        {/* Fundo 3D substituindo o antigo tsparticles */}
        <ZeldaBackground />
      </div>

      {/* --- CONTEÚDO HERO --- */}
      <div className="relative z-20 flex flex-col items-center justify-center min-h-screen w-full px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative mb-8"
        >
          {/* A Triforce que se desenha sozinha! */}
          <AnimatedTriforce />

          <h1 className="text-4xl md:text-7xl font-black tracking-widest text-[#f5f5f0] drop-shadow-lg font-serif mt-6">
            THE LEGEND OF
          </h1>

          <div className="flex items-center justify-center gap-4 my-4">
            <div className="h-[1px] w-8 md:w-20 bg-gradient-to-r from-transparent via-[#00f7ff] to-transparent shadow-[0_0_8px_#00f7ff]" />
            <h2 className="text-3xl md:text-6xl font-bold text-[#92d0ff] drop-shadow-[0_0_25px_rgba(0,200,255,0.6)] font-serif">
              JOÃO VICTOR
            </h2>
            <div className="h-[1px] w-8 md:w-20 bg-gradient-to-r from-transparent via-[#00f7ff] to-transparent shadow-[0_0_8px_#00f7ff]" />
          </div>

          <p className="text-xs md:text-sm text-[#b4c0b4] tracking-[0.4em] uppercase mt-4 font-sans opacity-70">
            Level 25 • Full Stack Developer
          </p>
        </motion.div>

        {/* SETA DE SCROLL ANIMADA */}
        <motion.button
          onClick={scrollToProfile}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ delay: 1.5, duration: 2, repeat: Infinity }}
          className="absolute bottom-10 text-[#00f7ff]/70 hover:text-[#00f7ff] transition-colors cursor-pointer"
        >
          <ChevronDown size={40} className="drop-shadow-[0_0_5px_currentColor]" />
        </motion.button>
      </div>

      {/* --- SEÇÃO DE PERFIL --- */}
      <div id="profile-section" className="relative z-20 w-full bg-black">
        <ZeldaProfile />
      </div>

      {/* --- BORDAS FIXAS DECORATIVAS (Sheikah Tech Style) --- */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-50">
        <div className="absolute top-6 left-6 w-16 h-16 border-t-2 border-l-2 border-[#00f7ff]/40 rounded-tl-xl shadow-[-5px_-5px_15px_rgba(0,247,255,0.1)]" />
        <div className="absolute top-6 right-6 w-16 h-16 border-t-2 border-r-2 border-[#00f7ff]/40 rounded-tr-xl shadow-[5px_-5px_15px_rgba(0,247,255,0.1)]" />
        <div className="absolute bottom-6 left-6 w-16 h-16 border-b-2 border-l-2 border-[#00f7ff]/40 rounded-bl-xl shadow-[-5px_5px_15px_rgba(0,247,255,0.1)]" />
        <div className="absolute bottom-6 right-6 w-16 h-16 border-b-2 border-r-2 border-[#00f7ff]/40 rounded-br-xl shadow-[5px_5px_15px_rgba(0,247,255,0.1)]" />
      </div>
    </motion.div>
  );
};