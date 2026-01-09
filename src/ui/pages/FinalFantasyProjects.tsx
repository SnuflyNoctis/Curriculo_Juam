import React, { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, ExternalLink, Volume2, VolumeX } from "lucide-react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import type { Engine } from "tsparticles-engine";
import { KingdomMenu } from "../components/KingdomMenu";

// --- IMPORTS DOS ASSETS ---
// Certifique-se que os arquivos estão com esses nomes exatos nas pastas!
import preludeMp3 from '../../assets/sound/main_menu_prelude.mp3';
import noctisImg from '../../assets/images/noctis.jpg';

// --- DADOS DOS PROJETOS ---
const projects = [
  {
    id: 1,
    title: "E-Commerce Magitek",
    category: "Fullstack App",
    tech: ["React", "Node.js", "Stripe"],
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1000",
    description: "Uma plataforma completa de vendas de peças robóticas. Painel administrativo incluso com gráficos em tempo real.",
    links: { github: "#", live: "#" }
  },
  {
    id: 2,
    title: "Chocobo Tracker",
    category: "Mobile / GPS",
    tech: ["React Native", "Google Maps", "Firebase"],
    image: "https://images.unsplash.com/photo-1546776310-5112af4e6624?auto=format&fit=crop&q=80&w=1000",
    description: "App para rastrear suas entregas em tempo real. Interface otimizada para entregadores em movimento.",
    links: { github: "#", live: "#" }
  },
  {
    id: 3,
    title: "Crystal Portfolio",
    category: "Frontend Design",
    tech: ["Three.js", "Framer Motion", "Vite"],
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1000",
    description: "Um portfólio imersivo com efeitos 3D e partículas. Inspirado na estética de cristais de Lucis.",
    links: { github: "#", live: "#" }
  },
];

export const FinalFantasyProjects = () => {
  const [activeId, setActiveId] = useState(projects[0].id);
  const [isWarping, setIsWarping] = useState(false);

  // Estados de Áudio e Start
  const [hasStarted, setHasStarted] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Inicializa Áudio
  useEffect(() => {
    audioRef.current = new Audio(preludeMp3);
    audioRef.current.volume = 0.5;
    audioRef.current.loop = true;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const handleStart = () => {
    if (audioRef.current) {
      audioRef.current.play().catch(e => console.log("Erro play:", e));
    }
    setHasStarted(true);
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  // Inicializa Partículas
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  // Configuração dos Cristais (Simples e Bonito)
  const particlesOptions = {
    fullScreen: { enable: false },
    background: { color: { value: "transparent" } },
    particles: {
      shape: {
        type: "polygon",
        options: { polygon: { nb_sides: 3 } }
      },
      color: { value: ["#00aaff", "#ffffff", "#4488ff"] },
      number: { value: 60, density: { enable: true, area: 800 } },
      opacity: { value: { min: 0.1, max: 0.7 }, animation: { enable: true, speed: 1, sync: false } },
      size: { value: { min: 1, max: 4 } },
      move: { enable: true, speed: 0.8, direction: "none", random: true, straight: false, outModes: "out" },
      links: { enable: false }
    }
  };

  const handleWarp = (id: number) => {
    if (id === activeId) return;
    setIsWarping(true);
    setTimeout(() => {
      setActiveId(id);
      setIsWarping(false);
    }, 400);
  };

  const activeProject = projects.find(p => p.id === activeId) || projects[0];

  // --- TELA DE START ---
  if (!hasStarted) {
    return (
      <div className="fixed inset-0 z-50 bg-[#000] flex flex-col items-center justify-center cursor-pointer overflow-hidden" onClick={handleStart}>

        {/* Fundo com Gradiente Sutil (Amanhecer de Eos) */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_#1a233a_0%,_#02040a_60%,_#000000_100%)] opacity-80" />

        {/* Partículas de "Poeira" (Dust) flutuando no menu */}
        <div className="absolute inset-0 z-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 animate-pulse" />

        <div className="relative z-10 text-center transform scale-90 md:scale-100 transition-all duration-1000">

          {/* O LOGO (TIPOGRAFIA CLÁSSICA) */}
          <div className="relative mb-12">
            <h1 className="text-5xl md:text-7xl font-serif text-white tracking-widest drop-shadow-[0_0_15px_rgba(255,255,255,0.6)]">
              Projetos REALIZADOS
            </h1>

            {/* O "XV" estilizado ou o nome do seu sistema */}
            <div className="flex items-center justify-center gap-4 mt-[-10px] md:mt-[-15px]">
              <span className="py-2 text-3xl md:text-5xl font-serif text-blue-200/80 tracking-widest drop-shadow-lg">
                XV
              </span>
            </div>

            {/* Subtítulo "Royal Edition" style */}
            <div className="mt-4 border-t border-b border-white/20 py-2 w-full max-w-md mx-auto">
              <p className="text-[0.6rem] md:text-[0.7rem] text-gray-300 tracking-[0.4em] font-sans uppercase">
                Portfolio Edition
              </p>
            </div>
          </div>

          {/* MENU DE OPÇÕES (Simulado) */}
          <div className="space-y-4">
            {/* Botão Principal Piscando */}
            <div className="animate-pulse">
              <p className="text-xl md:text-2xl font-serif text-white tracking-[0.1em] drop-shadow-md border-b-2 border-transparent hover:border-blue-400 inline-block pb-1 transition-all">
                START GAME
              </p>
            </div>

            {/* Opções decorativas desabilitadas (cinza) */}
            <div className="opacity-50 text-sm md:text-base font-serif text-gray-500 tracking-widest space-y-2">
              <p>LOAD GAME</p>
              <p>OPTIONS</p>
              <p>BASED ON FINAL FANTASY XV System</p>
            </div>
          </div>
        </div>

        {/* RODAPÉ COPYRIGHT (Para dar aquele ar oficial) */}
        <div className="absolute bottom-8 text-[0.5rem] md:text-[0.6rem] text-gray-600 tracking-wider font-sans uppercase">
          © 2026 João Victor Systems. All Rights Reserved.
        </div>
      </div>
    );
  }

  // --- APLICAÇÃO PRINCIPAL ---
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="min-h-screen bg-[#02040a] text-white font-sans overflow-hidden relative flex"
    >

      {/* BACKGROUND 1: O SKETCH DO NOCTIS */}
      <div className="absolute right-0 bottom-0 h-full w-full md:w-1/2 z-0 pointer-events-none opacity-[0.15] mix-blend-screen overflow-hidden flex items-end justify-end">
        <img
          src={noctisImg}
          alt="Noctis Sketch"
          className="h-[120%] object-contain translate-y-20 translate-x-20 grayscale contrast-125"
        />
      </div>

      {/* BACKGROUND 2: CRISTAIS FLUTUANTES */}
      <div className="absolute inset-0 z-0">
        <Particles
          id="tsparticles"
          init={particlesInit}
          options={particlesOptions as any}
          className="w-full h-full absolute inset-0"
        />
      </div>

      {/* BACKGROUND 3: GRADIENTES */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-3/4 h-full bg-gradient-to-l from-[#0a1a3a]/80 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-[#000510] to-transparent" />
      </div>

      {/* BOTÃO DE MUTE */}
      <button
        onClick={toggleMute}
        className="absolute top-6 right-6 z-50 text-blue-300/50 hover:text-white transition-colors p-2 border border-blue-500/20 hover:border-blue-500 rounded-sm"
      >
        {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
      </button>

      {/* --- MENU LATERAL --- */}
      <div className="w-1/3 h-screen z-20 flex flex-col justify-start pt-20 pl-12 border-r border-blue-900/30 bg-black/40 backdrop-blur-sm relative">

        {/* === TÍTULO ÉPICO (ESTILO RESIDENT EVIL, MAS TEMA FFXV) === */}
        <div className="mb-12 relative group">
          {/* Linha decorativa superior */}
          <div className="w-8 h-1 bg-blue-500 mb-6 shadow-[0_0_15px_rgba(59,130,246,1)]" />

          {/* Título Principal Gigante */}
          <h1 className="text-6xl md:text-7xl font-serif text-transparent bg-clip-text bg-gradient-to-b from-white via-blue-100 to-blue-200 tracking-wide drop-shadow-[0_0_25px_rgba(0,100,255,0.6)]">
            PROJETOS FEITOS
          </h1>

          {/* Subtítulo estilo "System Interface" do RE4 */}
          <div className="flex items-center gap-4 mt-2">
            <div className="h-[1px] w-12 bg-blue-500/50" />
            <h2 className="text-blue-300/80 text-xs md:text-sm tracking-[0.5em] font-sans font-semibold uppercase whitespace-nowrap">
              ARQUIVO DE PROJETOS FEITOS:
            </h2>
          </div>

          {/* Detalhe de fundo (Glow) */}
          <div className="absolute -left-12 top-0 w-24 h-24 bg-blue-600/20 blur-[40px] pointer-events-none" />
        </div>
        {/* ========================================= */}

        <div className="space-y-8">
          {projects.map((project) => (
            <motion.button
              key={project.id}
              onClick={() => handleWarp(project.id)}
              className="group relative w-full text-left pl-6 border-l-2 border-transparent hover:border-blue-500/50 transition-all duration-300"
              whileHover={{ x: 10 }}
            >
              {activeId === project.id && (
                <motion.div
                  layoutId="crystal-marker"
                  className="absolute -left-[2px] top-0 h-full w-1 bg-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.8)]"
                />
              )}
              <div className={`transition-all duration-300 ${activeId === project.id ? 'opacity-100 translate-x-2' : 'opacity-40 group-hover:opacity-80'}`}>
                <h3 className={`text-xl md:text-2xl uppercase font-bold tracking-wider font-mono
                  ${activeId === project.id ? 'text-white text-shadow-blue' : 'text-gray-400'}
                `}>
                  {project.title}
                </h3>
                <div className={`overflow-hidden transition-all duration-300 ${activeId === project.id ? 'max-h-10 mt-2' : 'max-h-0'}`}>
                  <p className="text-xs text-blue-300/70 uppercase tracking-widest">
                    Lv. {project.id * 15} | {project.category}
                  </p>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* --- ÁREA DE DETALHES --- */}
      <div className="flex-1 h-screen relative z-10 overflow-hidden flex items-center justify-center p-12">

        {/* WARP EFFECT */}
        <AnimatePresence>
          {isWarping && (
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: [0, 1, 0], x: [100, 0, -100], scale: [1, 1.5, 1] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="absolute inset-0 z-50 bg-blue-500/20 backdrop-blur-md mix-blend-overlay pointer-events-none"
            >
              <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.8)_50%,transparent_100%)] w-full h-full opacity-30 skew-x-12" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* CARD DO PROJETO */}
        <motion.div
          key={activeProject.id}
          initial={{ opacity: 0, x: 50, filter: "blur(10px)" }}
          animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-5 gap-8 items-end"
        >
          <div className="md:col-span-3 relative group">
            <div className="absolute inset-0 border border-blue-400/30 transform translate-x-2 translate-y-2" />
            <div className="relative h-[300px] md:h-[450px] overflow-hidden border border-blue-500/50 bg-black shadow-[0_0_50px_rgba(0,0,255,0.1)]">
              <img
                src={activeProject.image}
                alt={activeProject.title}
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500 scale-100 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,100,255,0.1)_50%)] bg-[length:100%_4px] pointer-events-none" />
            </div>
          </div>

          <div className="md:col-span-2 space-y-8 flex flex-col justify-end pb-4">
            <div>
              <motion.h1
                className="text-4xl md:text-5xl font-serif text-white drop-shadow-[0_0_10px_rgba(0,100,255,0.8)] leading-tight"
                initial={{ y: 20 }} animate={{ y: 0 }}
              >
                {activeProject.title}
              </motion.h1>
              <div className="h-[2px] w-full bg-gradient-to-r from-blue-500 to-transparent mt-4 shadow-[0_0_15px_rgba(59,130,246,1)]" />
            </div>

            <div className="flex flex-wrap gap-2">
              {activeProject.tech.map(tech => (
                <span key={tech} className="px-3 py-1 bg-blue-900/40 border border-blue-500/40 text-xs text-blue-100 uppercase tracking-wider backdrop-blur-md">
                  {tech}
                </span>
              ))}
            </div>

            <p className="text-gray-300 text-sm md:text-base leading-relaxed pl-4 border-l border-blue-500/30 font-light">
              {activeProject.description}
            </p>

            <div className="flex gap-4 pt-2">
              <a href={activeProject.links.github} className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-white/5 hover:bg-blue-600/20 border border-white/10 hover:border-blue-400 transition-all group cursor-pointer">
                <Github size={18} /> <span className="uppercase tracking-widest text-xs font-bold">Source</span>
              </a>
              <a href={activeProject.links.live} className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-blue-600/20 hover:bg-blue-600/40 border border-blue-500/50 hover:border-blue-400 transition-all group cursor-pointer">
                <ExternalLink size={18} /> <span className="uppercase tracking-widest text-xs font-bold">Deploy</span>
              </a>
            </div>
          </div>

        </motion.div>
      </div>

      <div className="absolute bottom-8 right-8 flex gap-8 text-blue-300/40 font-mono text-xs uppercase tracking-widest pointer-events-none">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
          System Online
        </div>
        <div>
          Noctis_Engine_v15
        </div>
      </div>
    </motion.div>
  );
};