import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";
import { KingdomMenu } from "../components/KingdomMenu";
import { ProjectCard3D } from "../components/ProjectCard3D_XV";

import { LifestreamBackground } from "../components/LifestreamBackground";

import noctisImg from '../../assets/images/noctis.jpg';

import { projectData } from "../../data/ProjectData_XV";

export const FinalFantasyProjects = () => {
  const [activeId, setActiveId] = useState(projectData[0].id);
  const [isWarping, setIsWarping] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  const handleStart = () => {
    setHasStarted(true);
  };

  const handleWarp = (id: number) => {
    if (id === activeId) return;
    setIsWarping(true);
    setTimeout(() => {
      setActiveId(id);
      setIsWarping(false);
    }, 400);
  };

  const activeProject = projectData.find(p => p.id === activeId) || projectData[0];

  if (!hasStarted) {
    return (
      <div className="fixed inset-0 z-50 bg-[#000] flex flex-col items-center justify-center cursor-pointer overflow-hidden" onClick={handleStart}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_#1a233a_0%,_#02040a_60%,_#000000_100%)] opacity-80" />
        <div className="relative z-10 text-center animate-pulse">
          <h1 className="text-4xl md:text-6xl font-serif text-white tracking-widest drop-shadow-[0_0_15px_rgba(255,255,255,0.6)] mb-4">
            PROJETOS REALIZADOS
          </h1>
          <p className="text-blue-300 tracking-[0.5em] text-sm uppercase border border-blue-500/30 px-6 py-2 inline-block hover:bg-blue-500/10 transition-colors">
            Click to Start Engine
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
      {/* BACKGROUNDS */}
      <div className="absolute right-0 bottom-0 h-full w-full md:w-1/2 z-0 pointer-events-none opacity-[0.10] mix-blend-screen overflow-hidden flex items-end justify-end">
        <img src={noctisImg} alt="Noctis Sketch" className="h-[120%] object-contain translate-y-20 translate-x-20 grayscale contrast-125" />
      </div>

      <LifestreamBackground />

      <div className="absolute inset-0 z-0 pointer-events-none bg-gradient-to-r from-black via-transparent to-transparent opacity-80" />

      {/* Quest List  */}
      <div className="w-[40%] md:w-1/3 h-screen z-20 flex flex-col justify-center pt-12 pl-8 md:pl-16 border-r border-blue-900/20 bg-black/60 backdrop-blur-md relative">

        <div className="mb-12">
          <h2 className="text-blue-400/60 text-xs tracking-[0.3em] uppercase mb-2 font-bold">Quest Log</h2>
          <h1 className="text-4xl md:text-5xl font-serif text-white drop-shadow-[0_0_10px_rgba(0,150,255,0.5)]">PROJETOS</h1>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-transparent mt-2" />
        </div>

        <div className="space-y-6">
          {projectData.map((project) => (
            <motion.button
              key={project.id}
              onClick={() => handleWarp(project.id)}
              className="group relative w-full text-left pl-6 border-l-[3px] transition-all duration-300 py-2"
              style={{ borderColor: activeId === project.id ? '#00aaff' : 'transparent' }}
            >
              {/* Nome do Projeto */}
              <h3 className={`text-lg md:text-xl uppercase font-bold tracking-wider font-mono transition-colors
                  ${activeId === project.id ? 'text-white drop-shadow-[0_0_5px_rgba(0,150,255,0.8)]' : 'text-gray-500 group-hover:text-gray-300'}
              `}>
                {project.title}
              </h3>

              {/* Tech Badges na Sidebar */}
              <div className="flex items-center gap-2 mt-1 text-xs uppercase tracking-widest text-blue-300/60 group-hover:text-blue-300 transition-colors">
                {project.typeIcon}
                <span>{project.category}</span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* ÁREA DE DETALHES  */}
      <div className="flex-1 h-screen relative z-10 overflow-hidden flex items-center justify-center p-8 md:p-16">

        {/* Warp */}
        <AnimatePresence>
          {isWarping && (
            <motion.div
              initial={{ opacity: 0, x: -50 }} animate={{ opacity: [0, 1, 0], x: [50, 0, -50] }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
              className="absolute inset-0 z-50 bg-blue-500/10 backdrop-blur-sm pointer-events-none"
            />
          )}
        </AnimatePresence>

        <motion.div
          key={activeProject.id}
          initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full max-w-4xl"
        >
          {/* Cabeçalho do Projeto */}
          <div className="flex flex-col md:flex-row items-end gap-8 mb-8 border-b border-blue-500/30 pb-8">

            {/* CARD 3D  */}
            <div className="relative w-full md:w-72 h-48 z-10">
              <ProjectCard3D imageUrl={activeProject.image} />
            </div>

            <div className="flex-1">
              <h1 className="text-4xl md:text-5xl font-serif text-white mb-3 text-shadow-blue">{activeProject.title}</h1>
              <div className="flex flex-wrap gap-2">
                {activeProject.tech.map(t => (
                  <span key={t} className="bg-blue-900/40 border border-blue-500/40 px-2 py-1 text-xs text-blue-100 uppercase tracking-wider">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Descrição Business (Challenge vs Solution) */}
          <div className="grid md:grid-cols-2 gap-8 mb-10">
            <div className="bg-blue-950/20 p-4 border-l-2 border-red-500/50">
              <h4 className="text-red-300 text-xs uppercase tracking-[0.2em] mb-2 font-bold">The Challenge</h4>
              <p className="text-gray-300 text-sm leading-relaxed">{activeProject.description.challenge}</p>
            </div>
            <div className="bg-blue-950/20 p-4 border-l-2 border-green-500/50">
              <h4 className="text-green-300 text-xs uppercase tracking-[0.2em] mb-2 font-bold">The Solution</h4>
              <p className="text-gray-300 text-sm leading-relaxed">{activeProject.description.solution}</p>
            </div>
          </div>

          {/* Botões de Ação */}
          <div className="flex gap-4">
            <a href={activeProject.links.github} target="_blank" rel="noreferrer"
              className="flex-1 bg-black/50 border border-gray-500 hover:border-blue-400 hover:bg-blue-600/20 text-gray-300 hover:text-white py-4 px-6 flex items-center justify-center gap-3 transition-all duration-300 group cursor-pointer uppercase tracking-widest font-bold text-sm">
              <Github className="group-hover:scale-110 transition-transform" /> VIEW CODE
            </a>
            <a href={activeProject.links.live} target="_blank" rel="noreferrer"
              className="flex-1 bg-blue-600/20 border border-blue-500 hover:bg-blue-500 hover:text-black text-blue-100 py-4 px-6 flex items-center justify-center gap-3 transition-all duration-300 group cursor-pointer uppercase tracking-widest font-bold text-sm shadow-[0_0_15px_rgba(0,100,255,0.3)] hover:shadow-[0_0_25px_rgba(0,100,255,0.6)]">
              <ExternalLink className="group-hover:scale-110 transition-transform" /> LIVE DEMO
            </a>
          </div>

        </motion.div>
      </div>

      {/* FOOTER CENTRALIZADO */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-8 text-blue-300/40 font-mono text-xs uppercase tracking-widest pointer-events-none">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
          System Online
        </div>
        <div>Noctis_Engine_v15</div>
      </div>

      {/* MENU GLOBAL (DIREITA) */}
      <KingdomMenu align="right" />

    </motion.div>
  );
};