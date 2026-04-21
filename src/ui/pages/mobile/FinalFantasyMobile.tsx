import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, ExternalLink, Lock } from "lucide-react";
import { ProjectCard3D } from "../../components/ProjectCard3D_XV";
import { LifestreamBackground } from "../../components/LifestreamBackground";
import InsomniaCityA from '../../../assets/images/InsomniaCityA.png'; // Ajuste o path
import { projectData } from "../../../data/ProjectData_XV"; // Ajuste o path

// Variantes de Warp adaptadas para tela vertical
const warpVariantsMobile = {
  initial: { opacity: 0, scale: 0.8, filter: "blur(10px) brightness(2)", y: 50 },
  warpIn: {
    opacity: 1, scale: 1, filter: "blur(0px) brightness(1)", y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  },
  exit: { opacity: 0, scale: 0.9, filter: "blur(10px) brightness(2)", y: -30, transition: { duration: 0.3 } }
};

// O seu componente de Scramble text original
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
        if (i < lockCount) newText += text[i];
        else if (text[i] === ' ') newText += ' ';
        else newText += chars[Math.floor(Math.random() * chars.length)];
      }

      setDisplayText(newText);
      if (percent < 1) animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [text, duration]);

  return <span>{displayText}</span>;
};

export const FinalFantasyProjectsMobile = () => {
  const [activeId, setActiveId] = useState(projectData[0].id);
  const [isWarping, setIsWarping] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  const handleWarp = (id: number) => {
    if (id === activeId) return;
    setIsWarping(true);
    setTimeout(() => {
      setActiveId(id);
      setIsWarping(false);
    }, 400); // Mais rápido no celular para ser snapy
  };

  const activeProject = projectData.find(p => p.id === activeId) || projectData[0];

  // 1. TELA DE INICIALIZAÇÃO
  if (!hasStarted) {
    return (
      <div className="fixed inset-0 z-50 bg-[#000] flex flex-col items-center justify-center overflow-hidden" onClick={() => setHasStarted(true)}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#1a233a_0%,_#02040a_80%,_#000000_100%)] opacity-80" />
        <div className="relative z-10 text-center animate-pulse px-4 w-full">
          <h1 className="text-3xl font-serif text-white tracking-widest drop-shadow-[0_0_15px_rgba(255,255,255,0.6)] mb-4 uppercase">
            Quest Log_
          </h1>
          <p className="text-blue-300 tracking-[0.3em] text-[10px] uppercase border border-blue-500/30 px-4 py-3 bg-blue-500/10 active:bg-blue-500/30 transition-colors rounded-sm w-full">
            Tap to Initialize Noctis Engine
          </p>
        </div>
      </div>
    );
  }

  // 2. TELA PRINCIPAL
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative w-full bg-[#02040a] text-white font-sans flex flex-col pt-12 pb-20"
    >

      {/* ⚡ MUDANÇA AQUI: Backgrounds agora são absolutos (ficam contidos nesta seção) e não fixed (que invadiam a tela toda) */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-30 mix-blend-screen overflow-hidden">
        <img src={InsomniaCityA} alt="Insomnia" className="w-full h-full object-cover object-center grayscale contrast-125 scale-110" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.9)_0%,rgba(0,0,0,0.4)_50%,rgba(0,0,0,0.95)_100%)]" />
      </div>
      <LifestreamBackground />
      <div className="absolute inset-0 z-0 pointer-events-none bg-[linear-gradient(rgba(0,150,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,150,255,0.03)_1px,transparent_1px)] bg-[size:30px_30px]" />

      <div className="relative z-20 px-4 w-full flex flex-col gap-6">

        {/* HEADER / TITULO */}
        <div className="text-center">
          <h2 className="text-blue-400/60 text-[9px] tracking-[0.3em] uppercase mb-1 font-bold">Main Quests</h2>
          <h1 className="text-3xl font-serif text-white drop-shadow-[0_0_10px_rgba(0,150,255,0.5)]">PROJECTS_</h1>
          <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-transparent mx-auto mt-2" />
        </div>

        {/* CARROSSEL DE NAVEGAÇÃO DE PROJETOS (Substitui a Sidebar) */}
        <div className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-3 pb-4 px-2 -mx-4">
          {projectData.map((project) => (
            <button
              key={project.id}
              onClick={() => handleWarp(project.id)}
              className={`snap-center shrink-0 w-[240px] p-3 border-l-2 text-left relative overflow-hidden transition-all duration-300
                ${activeId === project.id
                  ? 'border-blue-400 bg-blue-900/40 shadow-[inset_0_0_20px_rgba(0,150,255,0.2)]'
                  : 'border-blue-900/50 bg-black/50 opacity-60'}
              `}
            >
              {activeId === project.id && (
                <div className="absolute top-0 right-0 w-8 h-full bg-gradient-to-l from-blue-400/20 to-transparent" />
              )}
              <h3 className={`text-sm uppercase font-bold tracking-wider font-mono truncate ${activeId === project.id ? 'text-white drop-shadow-[0_0_5px_rgba(0,150,255,0.8)]' : 'text-gray-400'}`}>
                {project.id === 999 && <Lock className="inline w-3 h-3 mr-1 text-red-500" />}
                {project.title}
              </h3>
              <p className="text-[9px] text-blue-300/80 mt-1 uppercase tracking-widest truncate">[{String(project.id).padStart(3, '0')}] // {project.category}</p>
            </button>
          ))}
          {/* Espaçador final para o carrossel rolar até o fim */}
          <div className="shrink-0 w-4" />
        </div>

        {/* WARP OVERLAY */}
        <AnimatePresence>
          {isWarping && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 0] }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} className="absolute inset-0 z-50 bg-blue-500/20 backdrop-blur-[10px] pointer-events-none" />
          )}
        </AnimatePresence>

        {/* ÁREA DO PROJETO SELECIONADO */}
        <AnimatePresence mode="wait">
          <motion.div key={activeProject.id} variants={warpVariantsMobile} initial="initial" animate="warpIn" exit="exit" className="flex flex-col gap-6">

            {/* CARD 3D */}
            <div className="w-full h-[220px] relative z-10 flex justify-center items-center">
              {/* ⚠️ Nota: Se ProjectCard3D tiver OrbitControls, precisaremos desligar igual fizemos no RE! */}
              <ProjectCard3D imageUrl={activeProject.image} />
            </div>

            {/* TITULO E TECHS */}
            <div className="text-center">
              <h2 className="text-2xl font-serif text-white mb-4 drop-shadow-[0_0_10px_rgba(0,150,255,0.5)] uppercase">
                <ScrambleText text={activeProject.title} duration={500} />
              </h2>
              <div className="flex flex-wrap justify-center gap-2">
                {activeProject.tech.map((t) => (
                  <div key={t} className="flex items-center gap-1.5 bg-[#02040a]/80 border border-blue-800/50 px-2 py-1">
                    <div className="w-1 h-1 bg-cyan-400 rounded-full shadow-[0_0_5px_#00ffff]" />
                    <span className="text-[8px] text-blue-100 uppercase tracking-[0.2em] font-mono">{t}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* DESCRICÕES */}
            <div className="flex flex-col gap-4 font-mono">
              <div className="bg-blue-950/30 p-4 border-l-2 border-red-500/50">
                <h4 className="text-red-300 text-[10px] uppercase tracking-[0.2em] mb-2 font-black flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-red-500 animate-pulse" /> The Challenge //
                </h4>
                <p className="text-gray-300 text-[11px] leading-relaxed text-justify">
                  <ScrambleText text={activeProject.description.challenge} duration={800} />
                </p>
              </div>
              <div className="bg-blue-950/30 p-4 border-l-2 border-green-500/50">
                <h4 className="text-green-300 text-[10px] uppercase tracking-[0.2em] mb-2 font-black flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-green-500 animate-pulse" /> The Solution //
                </h4>
                <p className="text-gray-300 text-[11px] leading-relaxed text-justify">
                  <ScrambleText text={activeProject.description.solution} duration={1000} />
                </p>
              </div>
            </div>

            {/* BOTÕES */}
            {activeProject.id === 999 ? (
              <div className="border border-red-900/50 bg-red-950/30 p-4 text-center rounded-sm">
                <span className="text-red-500 font-mono text-[9px] tracking-[0.2em] uppercase font-black animate-pulse">
                  SYSTEM LOCKED // NDA RESTRICTION
                </span>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                <a href={activeProject.links.live} target="_blank" rel="noreferrer" className="w-full bg-blue-600/20 border border-blue-500 active:bg-blue-500 active:text-black text-blue-100 py-3.5 flex items-center justify-center gap-2 uppercase tracking-widest font-bold text-xs shadow-[0_0_15px_rgba(0,100,255,0.3)]">
                  <ExternalLink size={14} /> LIVE DEMO
                </a>
                <a href={activeProject.links.github} target="_blank" rel="noreferrer" className="w-full bg-black/50 border border-gray-600 active:border-blue-400 text-gray-300 py-3.5 flex items-center justify-center gap-2 uppercase tracking-widest font-bold text-xs">
                  <Github size={14} /> VIEW CODE
                </a>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

      </div>
    </motion.div>
  );
};