import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Lock } from "lucide-react";
import { ProjectCard3D } from "../components/ProjectCard3D_XV";
import { LifestreamBackground } from "../components/LifestreamBackground";
import InsomniaCityA from '../../assets/images/InsomniaCityA.png';
import { projectData } from "../../data/ProjectData_XV";

const warpVariants = {
  initial: {
    opacity: 0,
    scaleX: 2,
    filter: "blur(20px) brightness(4) saturate(10)",
    x: 200
  },
  warpIn: {
    opacity: [0, 1, 0.7, 1],
    scaleX: [2, 0.4, 1.3, 1],
    filter: [
      "blur(20px) brightness(4) saturate(10)",
      "blur(0px) brightness(1) saturate(1)",
      "blur(3px) brightness(1.2) saturate(2)",
      "blur(0px) brightness(1) saturate(1)"
    ],
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.33, 1, 0.68, 1],
      times: [0, 0.3, 0.6, 1]
    }
  },
  exit: {
    opacity: 0,
    scaleX: 2,
    filter: "blur(20px) brightness(4) saturate(10)",
    x: -200,
    transition: { duration: 0.4, ease: "easeIn" }
  }
};

const ScrambleText = ({ text, duration = 800 }: { text: string; duration?: number }) => {
  const [displayText, setDisplayText] = React.useState(text);
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*()_+{}[]|<>?/~';

  React.useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percent = Math.min(progress / duration, 1);

      const lockCount = Math.floor(text.length * percent);

      let newText = '';
      for (let i = 0; i < text.length; i++) {
        if (i < lockCount) {
          // Revela a letra certa
          newText += text[i];
        } else if (text[i] === ' ') {
          newText += ' ';
        } else {
          newText += chars[Math.floor(Math.random() * chars.length)];
        }
      }

      setDisplayText(newText);

      if (percent < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [text, duration]);

  return <span>{displayText}</span>;
};

export const FinalFantasyProjects = () => {
  const [activeId, setActiveId] = useState(projectData[0].id);
  const [isWarping, setIsWarping] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  const handleStart = () => {
    setHasStarted(true);
  };

  const handleWarp = React.useCallback((id: number) => {
    if (id === activeId) return;
    setIsWarping(true);

    setTimeout(() => {
      setActiveId(id);
      setIsWarping(false);
    }, 500);
  }, [activeId]);

  const activeProject = projectData.find(p => p.id === activeId) || projectData[0];

  React.useEffect(() => {
    if (!hasStarted) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const currentIndex = projectData.findIndex(p => p.id === activeId);

      if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        e.preventDefault();
      }

      if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') {
        const nextIndex = (currentIndex + 1) % projectData.length;
        handleWarp(projectData[nextIndex].id);
      } else if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') {
        const prevIndex = (currentIndex - 1 + projectData.length) % projectData.length;
        handleWarp(projectData[prevIndex].id);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeId, hasStarted, handleWarp]);

  if (!hasStarted) {
    return (
      <div className="fixed inset-0 z-50 bg-[#000] flex flex-col items-center justify-center cursor-pointer overflow-hidden" onClick={handleStart}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_#1a233a_0%,_#02040a_60%,_#000000_100%)] opacity-80" />
        <div className="relative z-10 text-center animate-pulse">
          <h1 className="text-4xl md:text-6xl font-serif text-white tracking-widest drop-shadow-[0_0_15px_rgba(255,255,255,0.6)] mb-4 uppercase">
            Projects Logs_
          </h1>
          <p className="text-blue-300 tracking-[0.5em] text-sm uppercase border border-blue-500/30 px-6 py-2 inline-block hover:bg-blue-500/10 transition-colors">
            Tap to Initialize Projects
          </p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-[#02040a] text-white font-sans overflow-hidden relative flex pt-20 md:pt-0"
    >
      {/* Background */}
      <div className="absolute inset-0 z-0 h-full w-full pointer-events-none opacity-40 mix-blend-screen overflow-hidden">
        <img
          src={InsomniaCityA}
          alt="Insomnia Citadel Vista"
          className="w-full h-full object-cover object-center grayscale contrast-125 scale-105"
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.95)_0%,rgba(0,0,0,0.6)_60%,transparent_100%)]" />
      </div>

      <LifestreamBackground />

      <div className="absolute inset-0 z-0 pointer-events-none bg-gradient-to-r from-black via-transparent to-transparent opacity-80" />

      {/* Quest List (Sidebar) */}
      <div className="w-[45%] md:w-1/3 h-screen z-20 flex flex-col justify-center pt-12 pl-8 md:pl-16 border-r border-blue-900/20 bg-black/70 backdrop-blur-md relative">

        {/* Efeito de Scanline de fundo na sidebar */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,150,255,0.02)_1px,transparent_1px)] bg-[length:100%_4px] pointer-events-none" />

        <div className="relative z-10 mb-12">
          <h2 className="text-blue-400/60 text-xs tracking-[0.3em] uppercase mb-2 font-bold">Main Quests</h2>
          <h1 className="text-4xl md:text-5xl font-serif text-white drop-shadow-[0_0_10px_rgba(0,150,255,0.5)]">PROJETOS_</h1>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-transparent mt-2" />
        </div>

        {/* Container da Lista com a "Track Line" no fundo */}
        <div className="space-y-4 relative z-10 before:absolute before:inset-y-0 before:left-[1px] before:w-[1px] before:bg-gradient-to-b before:from-blue-900/50 before:via-blue-500/20 before:to-transparent">
          {projectData.map((project) => (
            <motion.button
              key={project.id}
              onClick={() => handleWarp(project.id)}
              className="group relative w-full text-left pl-6 border-l-[3px] transition-all duration-300 py-3 overflow-hidden"
              style={{ borderColor: activeId === project.id ? '#00aaff' : 'transparent' }}
            >
              {/* O "Cursor" Tático (Aparece só no item ativo) */}
              <AnimatePresence>
                {activeId === project.id && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-0 h-0 
                               border-t-[4px] border-t-transparent 
                               border-l-[6px] border-l-white 
                               border-b-[4px] border-b-transparent 
                               shadow-[0_0_10px_#fff]"
                  />
                )}
              </AnimatePresence>

              {/* Fundo Hover Sutil */}
              <div className={`absolute inset-0 bg-gradient-to-r from-blue-500/10 to-transparent transition-opacity duration-300 ${activeId === project.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'}`} />

              <div className="relative z-10">
                <h3 className={`text-lg md:text-xl uppercase font-bold tracking-wider font-mono transition-all duration-300
                    ${activeId === project.id
                    ? 'text-white drop-shadow-[0_0_8px_rgba(0,150,255,0.8)] translate-x-1'
                    : 'text-gray-500 group-hover:text-blue-200 group-hover:translate-x-1'}
                `}>
                  {project.id === 999 && <Lock className="inline w-4 h-4 mr-2 text-red-500 mb-1" />}
                  {project.title}
                </h3>

                <div className={`flex items-center gap-3 mt-1 text-[10px] md:text-xs uppercase tracking-widest transition-colors duration-300
                    ${activeId === project.id ? 'text-blue-300' : 'text-gray-600 group-hover:text-blue-400/60'}
                `}>
                  <span className="font-bold opacity-70">[{String(project.id).padStart(3, '0')}]</span>
                  <span className="opacity-40">//</span>
                  <span>{project.category}</span>

                  {/* Detalhe de RPG (Rank) escondido no hover ou ativo */}
                  <span className={`ml-auto mr-4 text-[8px] border px-1 opacity-0 transition-opacity duration-500 ${activeId === project.id ? 'opacity-100 border-blue-500/50 text-blue-400' : 'group-hover:opacity-50 border-gray-600'}`}>
                    RANK_S
                  </span>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/*  Warp acontece aqui */}
      <div className="flex-1 h-screen relative z-10 overflow-hidden flex items-center justify-center p-8 md:p-16">

        <div className="absolute top-10 right-10 md:top-16 md:right-16 pointer-events-none opacity-40 mix-blend-screen hidden md:flex flex-col items-end gap-2 z-0">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border border-blue-500/30 rounded-full border-t-blue-400 border-b-transparent flex items-center justify-center relative"
          >
            <div className="w-8 h-8 border border-blue-400/20 rounded-full border-l-blue-300 border-r-transparent animate-reverse-spin" />
            <div className="absolute inset-0 flex items-center justify-center text-[6px] text-blue-400 font-mono">+</div>
          </motion.div>
          <div className="font-mono text-[8px] text-blue-300 tracking-widest text-right">
            <p>SYNC_RATE: <span className="text-cyan-400 animate-pulse">98.4%</span></p>
            <p>MEM_ALLOC: OPTIMAL</p>
          </div>
        </div>

        {/* Grade Tática de Fundo */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,150,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,150,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0" />

        {/* Coordenadas Inferior Esquerda */}
        <div className="absolute bottom-32 left-10 md:bottom-16 md:left-16 pointer-events-none opacity-30 font-mono text-[8px] md:text-[10px] text-blue-400 tracking-[0.3em] hidden md:block z-0">
          <p>X: 45.892.11</p>
          <p>Y: -12.004.88</p>
          <div className="w-12 h-px bg-blue-500 mt-2" />
        </div>

        {/* Warp Overlay */}
        <AnimatePresence>
          {isWarping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 z-50 bg-blue-500/10 backdrop-blur-[20px] pointer-events-none"
            />
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeProject.id}
            variants={warpVariants}
            initial="initial"
            animate="warpIn"
            exit="exit"
            className="w-full max-w-5xl"
          >
            {/* header do Projeto */}
            <div className="flex flex-col xl:flex-row items-center gap-12 mb-10 border-b border-blue-500/30 pb-12">
              {/* CARD 3D */}
              <div className="relative w-full md:w-[480px] h-[300px] md:h-[340px] z-10 shrink-0 group">
                <div className="absolute inset-0 bg-blue-600/10 blur-2xl group-hover:bg-blue-500/20 transition-all duration-500 pointer-events-none z-0" />
                {/* O Card em si */}
                <ProjectCard3D imageUrl={activeProject.image} />
              </div>

              {/* Titles and Techs */}
              <div className="flex-1 text-center xl:text-left">
                <h1 className="text-4xl md:text-5xl font-serif text-white mb-6 drop-shadow-[0_0_15px_rgba(0,150,255,0.5)] leading-tight uppercase">
                  <ScrambleText text={activeProject.title} duration={600} />
                </h1>
                <div className="flex flex-wrap justify-center xl:justify-start gap-3 mt-2">
                  {activeProject.tech.map((t, index) => (
                    <motion.div
                      key={t}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 + 0.3 }} // Entram um por um
                      className="group relative flex items-center gap-2 bg-[#02040a]/80 border border-blue-800/50 hover:border-blue-400 px-3 py-1.5 shadow-[inset_0_0_10px_rgba(0,150,255,0.1)] transition-colors"
                    >
                      {/* O "Núcleo" (Materia/Energia) */}
                      <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full shadow-[0_0_8px_#00ffff] group-hover:animate-ping" />

                      <span className="text-[9px] md:text-[11px] text-blue-100/80 group-hover:text-white uppercase tracking-[0.2em] font-mono font-bold">
                        {t}
                      </span>

                      {/* Detalhe visual de HUD no cantinho do botão */}
                      <div className="absolute top-0 right-0 w-1 h-1 border-t border-r border-cyan-400/50" />
                      <div className="absolute bottom-0 left-0 w-1 h-1 border-b border-l border-cyan-400/50" />
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Descrição Business */}
            <div className="grid md:grid-cols-2 gap-8 mb-10 font-mono">
              <div className="bg-blue-950/20 p-5 border-l-2 border-red-500/50 rounded-r-sm">
                <h4 className="text-red-300 text-xs uppercase tracking-[0.2em] mb-3 font-black flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-red-500 animate-pulse" /> Desafio: //
                </h4>
                <p className="text-gray-300 text-sm leading-relaxed text-justify min-h-[80px]">
                  <ScrambleText text={activeProject.description.challenge} duration={1000} />
                </p>
              </div>
              <div className="bg-blue-950/20 p-5 border-l-2 border-green-500/50 rounded-r-sm">
                <h4 className="text-green-300 text-xs uppercase tracking-[0.2em] mb-3 font-black flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-green-500 animate-pulse" /> Melhorias //
                </h4>
                <p className="text-gray-300 text-sm leading-relaxed text-justify min-h-[80px]">
                  <ScrambleText text={activeProject.description.solution} duration={1200} />
                </p>
              </div>
            </div>

            {/* Botões de Ação Dinâmicos */}
            {activeProject.id === 999 ? (
              <div className="flex gap-4 border-2 border-red-900/50 bg-red-950/20 p-5 justify-center items-center rounded-sm">
                <span className="text-red-500 font-mono text-xs md:text-sm tracking-[0.3em] uppercase font-black flex items-center gap-3 animate-pulse">
                  <span className="w-2.5 h-2.5 bg-red-500 rounded-full animate-ping" />
                  ACCESS DENIED // NDA RESTRICTION ACTIVE // SYSTEM LOCKED
                </span>
              </div>
            ) : (
              <div className="flex gap-4">
                <a href={activeProject.links.github} target="_blank" rel="noreferrer"
                  className="flex-1 bg-black/50 border border-gray-600 hover:border-blue-400 hover:bg-blue-600/20 text-gray-300 hover:text-white py-4 px-6 flex items-center justify-center gap-3 transition-all duration-300 group cursor-pointer uppercase tracking-widest font-bold text-sm rounded-sm">
                  <Github className="group-hover:scale-110 transition-transform" /> VIEW CODE
                </a>
                {/* <a href={activeProject.links.live} target="_blank" rel="noreferrer"
                  className="flex-1 bg-blue-600/20 border border-blue-500 hover:bg-blue-500 hover:text-black text-blue-100 py-4 px-6 flex items-center justify-center gap-3 transition-all duration-300 group cursor-pointer uppercase tracking-widest font-bold text-sm shadow-[0_0_15px_rgba(0,100,255,0.3)] hover:shadow-[0_0_25px_rgba(0,100,255,0.6)] rounded-sm">
                  <ExternalLink className="group-hover:scale-110 transition-transform" /> LIVE DEMO
                </a> */}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer HUD */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none select-none">
        {/* Nova Dica de Controle */}
        <div className="text-gray-500/60 font-mono text-[10px] tracking-[0.4em] uppercase bg-black/40 px-4 py-1 border border-gray-800/50 rounded-full flex items-center gap-3">
          <span className="flex gap-1">
            <span className="border border-gray-600 px-1 rounded-sm">W</span>
            <span className="border border-gray-600 px-1 rounded-sm">S</span>
          </span>
          OR
          <span className="flex gap-1">
            <span className="border border-gray-600 px-1 rounded-sm">↑</span>
            <span className="border border-gray-600 px-1 rounded-sm">↓</span>
          </span>
          TO NAVIGATE
        </div>

        {/* Status do Sistema Original */}
        <div className="flex gap-12 text-blue-300/40 font-mono text-xs uppercase tracking-[0.3em]">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
            SYSTEM_OS: STABLE
          </div>
          <div>NOCTIS_ENGINE_v4.1</div>
          <div>REGION: INSOMNIA_CITADEL</div>
        </div>
      </div>
    </motion.div>
  );
};