import React, { useState, useCallback } from "react";
import { motion } from "framer-motion";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import type { Engine } from "tsparticles-engine";
import { ChevronDown } from "lucide-react";

// --- IMPORTS ---
import { KingdomMenu } from "../components/KingdomMenu";
import { ZeldaProfile } from "../components/ZeldaProfile"; // <--- IMPORT NOVO AQUI

export const Hero = () => {
  const [gameStarted, setGameStarted] = useState(false);

  // Inicializa Partículas
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  return (
    // MUDANÇA 1: Troquei 'h-screen overflow-hidden' por 'min-h-screen overflow-x-hidden'
    // Isso permite rolar a página para baixo para ver o perfil
    <div className="relative w-full min-h-screen bg-[#0a0f0d] text-[#e0e0d0] font-serif cursor-default selection:bg-[#00f7ff] selection:text-black overflow-x-hidden">

      {/* --- BACKGROUNDS FIXOS (Ficam parados enquanto você rola) --- */}
      <div className="fixed inset-0 z-0">
        {/* Imagem de Fundo */}
        <motion.div
          className="absolute inset-0 opacity-40 bg-[url('https://images.alphacoders.com/796/796062.jpg')] bg-cover bg-center"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 20, ease: "linear" }}
        />

        {/* Overlay Escuro */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/90" />

        {/* Partículas */}
        <Particles
          id="zelda-particles"
          init={particlesInit}
          options={{
            fullScreen: { enable: false },
            particles: {
              number: { value: 60, density: { enable: true, area: 800 } },
              color: { value: ["#00f7ff", "#bd9", "#fff"] },
              opacity: { value: { min: 0.1, max: 0.5 }, animation: { enable: true, speed: 1 } },
              size: { value: { min: 1, max: 3 } },
              move: { enable: true, speed: 0.6, direction: "top-right", random: true, outModes: "out" },
            },
          }}
          className="absolute inset-0"
        />
      </div>

      {/* --- SEÇÃO 1: A INTRO (Ocupa a tela toda inicial) --- */}
      <div className="relative z-20 h-screen flex flex-col items-center justify-center text-center px-4">

        {/* LOGO STYLE */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5 }}
          className="mb-8 relative"
        >
          {/* Triforce Decorativa */}
          <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-b-[35px] border-b-[#ffd700] opacity-80 drop-shadow-[0_0_15px_rgba(255,215,0,0.6)]" />

          <h1 className="text-5xl md:text-8xl font-black tracking-widest text-[#f5f5f0] drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)]" style={{ fontFamily: '"Cinzel", serif' }}>
            THE LEGEND OF
          </h1>

          <div className="flex items-center justify-center gap-4 my-2">
            <div className="h-[2px] w-12 bg-gradient-to-r from-transparent via-[#ffd700] to-transparent" />
            <h2 className="text-4xl md:text-7xl font-bold text-[#92d0ff] drop-shadow-[0_0_20px_rgba(0,200,255,0.8)]" style={{ fontFamily: '"Cinzel", serif' }}>
              JOÃO VICTOR
            </h2>
            <div className="h-[2px] w-12 bg-gradient-to-r from-transparent via-[#ffd700] to-transparent" />
          </div>

          <p className="text-sm md:text-lg text-[#b4c0b4] tracking-[0.4em] uppercase mt-6 font-sans opacity-90">
            Fullstack Developer • Hyrule Code
          </p>
        </motion.div>

        {/* BOTÃO INTERATIVO */}
        {!gameStarted ? (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            onClick={() => setGameStarted(true)}
            className="group relative mt-12 px-16 py-4 bg-black/50 backdrop-blur-md border border-[#00f7ff]/50 text-[#00f7ff] font-sans uppercase tracking-[0.3em] text-sm hover:bg-[#00f7ff]/20 transition-all duration-500 rounded-full cursor-pointer"
          >
            <span className="relative z-10 group-hover:drop-shadow-[0_0_8px_#00f7ff] transition-all">
              Wake Up
            </span>
            <div className="absolute inset-0 border border-[#00f7ff]/30 rounded-full animate-ping opacity-30 duration-1000" />
          </motion.button>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-12 flex flex-col items-center gap-4"
          >
            <p className="text-[#ffd700] text-xl font-serif italic tracking-wider animate-pulse drop-shadow-md">
              "It's dangerous to go alone! Scroll down."
            </p>
            <ChevronDown className="text-[#00f7ff] animate-bounce mt-2 drop-shadow-[0_0_10px_#00f7ff]" size={40} />
          </motion.div>
        )}
      </div>

      {/* --- SEÇÃO 2: O PERFIL (ADVENTURE LOG) --- */}
      {/* MUDANÇA 2: Adicionei o ZeldaProfile aqui embaixo */}
      <div className="relative z-20 pb-24 px-4 min-h-[50vh]">
        {gameStarted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <ZeldaProfile />
          </motion.div>
        )}
      </div>

      {/* --- UI FIXA (Bordas e Menu) --- */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00f7ff]/60 to-transparent z-40 opacity-60 pointer-events-none" />
      <div className="fixed bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00f7ff]/60 to-transparent z-40 opacity-60 pointer-events-none" />

      {/* Cantoneiras Fixas */}
      <div className="fixed top-8 left-8 w-16 h-16 border-t-2 border-l-2 border-[#00f7ff]/30 rounded-tl-lg pointer-events-none z-40" />
      <div className="fixed top-8 right-8 w-16 h-16 border-t-2 border-r-2 border-[#00f7ff]/30 rounded-tr-lg pointer-events-none z-40" />
      <div className="fixed bottom-8 left-8 w-16 h-16 border-b-2 border-l-2 border-[#00f7ff]/30 rounded-bl-lg pointer-events-none z-40" />
      <div className="fixed bottom-8 right-8 w-16 h-16 border-b-2 border-r-2 border-[#00f7ff]/30 rounded-br-lg pointer-events-none z-40" />

      {/* Menu Global */}
      <KingdomMenu align="left" />

    </div>
  );
};