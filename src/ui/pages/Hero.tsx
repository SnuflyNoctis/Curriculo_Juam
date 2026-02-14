import React, { useCallback } from "react";
import { motion } from "framer-motion";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import type { Engine } from "tsparticles-engine";
import { ChevronDown } from "lucide-react";

// --- IMPORTS ---
import { ZeldaProfile } from "../components/ZeldaProfile";

export const Hero = () => {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  const scrollToProfile = () => {
    const profileSection = document.getElementById("profile-section");
    if (profileSection) {
      profileSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.div
      // 1. CONFIGURAÇÃO DE TRANSIÇÃO
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="relative w-full min-h-screen bg-black text-[#e0e0d0] font-serif selection:bg-[#00f7ff] selection:text-black overflow-x-hidden"
    >
      {/* --- BACKGROUNDS (Parallax e Estilo) --- */}
      <div className="absolute inset-0 z-0 pointer-events-none h-screen">
        <motion.div
          className="absolute inset-0 opacity-40 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.alphacoders.com/796/796062.jpg')",
          }}
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, ease: "linear" }}
        />
        {/* Gradientes para legibilidade */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000000_90%)]" />

        <Particles
          id="zelda-particles"
          init={particlesInit}
          options={{
            fullScreen: { enable: false },
            particles: {
              number: { value: 40, density: { enable: true, area: 800 } },
              color: { value: ["#00f7ff", "#bd9", "#fff"] },
              opacity: {
                value: { min: 0.1, max: 0.3 },
                animation: { enable: true, speed: 0.5 },
              },
              size: { value: { min: 1, max: 3 } },
              move: {
                enable: true,
                speed: 0.4,
                direction: "top",
                random: true,
                outModes: "out",
              },
            },
          }}
          className="absolute inset-0"
        />
      </div>

      {/* --- CONTEÚDO HERO (Centralizado) --- */}
      {/* pt-20 para compensar menu fixo se necessário, mas aqui centralizamos com flex */}
      <div className="relative z-20 flex flex-col items-center justify-center min-h-screen w-full px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative mb-8 will-change-transform"
        >
          {/* Triforce Decorativa */}
          <div className="absolute -top-16 left-1/2 -translate-x-1/2 opacity-60 drop-shadow-[0_0_15px_rgba(255,215,0,0.4)]">
            {/* Triângulo CSS Simples */}
            <div className="w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-b-[35px] border-b-[#ffd700]" />
          </div>

          <h1 className="text-4xl md:text-7xl font-black tracking-widest text-[#f5f5f0] drop-shadow-lg font-serif mt-6">
            THE LEGEND OF
          </h1>

          <div className="flex items-center justify-center gap-4 my-4">
            <div className="h-[1px] w-8 md:w-20 bg-gradient-to-r from-transparent via-[#ffd700] to-transparent shadow-[0_0_8px_#ffd700]" />
            <h2 className="text-3xl md:text-6xl font-bold text-[#92d0ff] drop-shadow-[0_0_25px_rgba(0,200,255,0.6)] font-serif">
              JOÃO VICTOR
            </h2>
            <div className="h-[1px] w-8 md:w-20 bg-gradient-to-r from-transparent via-[#ffd700] to-transparent shadow-[0_0_8px_#ffd700]" />
          </div>

          <p className="text-xs md:text-sm text-[#b4c0b4] tracking-[0.4em] uppercase mt-4 font-sans opacity-70">
            Level 25 • Front End Developer
          </p>
        </motion.div>

        {/* SETA DE SCROLL */}
        <motion.button
          onClick={scrollToProfile}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ delay: 1.5, duration: 2, repeat: Infinity }}
          className="absolute bottom-10 text-[#00f7ff]/70 hover:text-[#00f7ff] transition-colors cursor-pointer"
        >
          <ChevronDown
            size={40}
            className="drop-shadow-[0_0_5px_currentColor]"
          />
        </motion.button>
      </div>

      {/* --- SEÇÃO DE PERFIL (Abaixo da dobra) --- */}
      <div id="profile-section" className="relative z-20 w-full bg-black">
        {/* O container bg-black garante que não fique transparente ao rolar */}
        <ZeldaProfile />
      </div>

      {/* --- BORDAS FIXAS DECORATIVAS --- */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-50">
        <div className="absolute top-6 left-6 w-16 h-16 border-t-2 border-l-2 border-[#00f7ff]/30 rounded-tl-xl" />
        <div className="absolute top-6 right-6 w-16 h-16 border-t-2 border-r-2 border-[#00f7ff]/30 rounded-tr-xl" />
        <div className="absolute bottom-6 left-6 w-16 h-16 border-b-2 border-l-2 border-[#00f7ff]/30 rounded-bl-xl" />
        <div className="absolute bottom-6 right-6 w-16 h-16 border-b-2 border-r-2 border-[#00f7ff]/30 rounded-br-xl" />
      </div>
    </motion.div>
  );
};
