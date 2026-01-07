import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, Zap, Code, ChevronRight } from "lucide-react";

// Dados dos projetos (Mock)
const projects = [
  {
    id: 1,
    title: "ECOMMERCE PLATFORM",
    category: "Fullstack Quest",
    image:
      "https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=1000", // Imagem placeholder futurista
    techs: ["React", "Node.js", "Stripe"],
    description:
      "A legendary shop capable of handling thousands of potions per second.",
  },
  {
    id: 2,
    title: "DASHBOARD DASH",
    category: "Analytics Quest",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000",
    techs: ["Next.js", "Tailwind", "Recharts"],
    description: "Real-time data visualization for strategic battle planning.",
  },
  {
    id: 3,
    title: "SOCIAL CONNECT",
    category: "Community Quest",
    image:
      "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1000",
    techs: ["Vue", "Firebase", "WebRTC"],
    description: "Connect with allies across different servers instantly.",
  },
];

export const FinalFantasyProjects = () => {
  const [selectedId, setSelectedId] = useState<number>(projects[0].id);

  // Encontra o projeto ativo
  const activeProject =
    projects.find((p) => p.id === selectedId) || projects[0];

  return (
    <div className="min-h-screen bg-ffxv-dark text-ffxv-text font-sans overflow-hidden flex flex-col relative">
      {/* --- BACKGROUND DE CRISTAIS --- */}
      <div className="absolute inset-0 z-0">
        {/* Gradiente estilo Menu FFXV */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-black to-black" />

        {/* Partículas (Crystal Dust) */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-ffxv-accent/30 rounded-full w-1 h-1 blur-[1px]"
            initial={{
              x: Math.random() * window.innerWidth,
              y: window.innerHeight,
            }}
            animate={{
              y: -100,
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      {/* --- CABEÇALHO --- */}
      <div className="relative z-10 p-8 border-b border-white/10 flex justify-between items-end">
        <div>
          <h2 className="text-4xl font-light tracking-[0.2em] text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
            ARCHIVES
          </h2>
          <p className="text-sm text-ffxv-accent tracking-widest mt-2 uppercase">
            Prompto's Records // Selected Works
          </p>
        </div>
        <div className="text-right hidden md:block">
          <p className="text-xs text-gray-500">GIL</p>
          <p className="text-xl font-mono">99,999,999</p>
        </div>
      </div>

      {/* --- CONTEÚDO PRINCIPAL (LAYOUT DUPLO) --- */}
      <div className="relative z-10 flex-1 flex flex-col md:flex-row p-8 gap-8">
        {/* LISTA DE PROJETOS (ESQUERDA) */}
        <div className="w-full md:w-1/3 space-y-2">
          {projects.map((project) => (
            <motion.button
              key={project.id}
              onClick={() => setSelectedId(project.id)}
              className={`w-full text-left p-4 border-l-4 transition-all duration-300 relative overflow-hidden group
                ${
                  selectedId === project.id
                    ? "border-ffxv-primary bg-gradient-to-r from-blue-900/40 to-transparent"
                    : "border-white/10 hover:bg-white/5"
                }
              `}
              whileHover={{ x: 10 }}
            >
              <h3
                className={`text-xl font-light uppercase tracking-wider ${
                  selectedId === project.id ? "text-white" : "text-gray-400"
                }`}
              >
                {project.title}
              </h3>
              <p className="text-xs text-gray-500 mt-1 uppercase tracking-widest">
                {project.category}
              </p>

              {/* Ícone de seleção estilo FF */}
              {selectedId === project.id && (
                <motion.div
                  layoutId="activeGlow"
                  className="absolute inset-0 bg-blue-500/5 mix-blend-overlay"
                />
              )}
              {selectedId === project.id && (
                <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 text-ffxv-accent animate-pulse" />
              )}
            </motion.button>
          ))}
        </div>

        {/* DETALHES DO PROJETO (DIREITA - A "FOTO") */}
        <div className="flex-1 relative perspective-1000">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeProject.id}
              initial={{ opacity: 0, x: 50, rotateY: 10 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              exit={{ opacity: 0, x: -50, rotateY: -10 }}
              transition={{ duration: 0.5, ease: "circOut" }}
              className="h-full bg-black/40 border border-white/10 p-6 relative overflow-hidden"
            >
              {/* Linhas de Grid da Câmera */}
              <div className="absolute inset-0 pointer-events-none opacity-20 border border-white/20 m-4" />
              <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-white" />
              <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-white" />
              <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-white" />
              <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-white" />

              {/* Imagem do Projeto */}
              <div className="w-full h-64 md:h-80 overflow-hidden mb-6 relative group">
                <img
                  src={activeProject.image}
                  alt={activeProject.title}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 transform group-hover:scale-105"
                />
                {/* Scanline overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0)_50%,rgba(0,0,0,0.2)_50%)] bg-[length:100%_4px]" />
              </div>

              {/* Informações Técnicas */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-ffxv-accent">
                  <Camera size={18} />
                  <span className="text-xs tracking-[0.2em] uppercase">
                    Project Details
                  </span>
                </div>

                <p className="text-lg text-gray-300 font-light leading-relaxed">
                  {activeProject.description}
                </p>

                {/* Tech Stack como "Elemental Magic" */}
                <div className="mt-8">
                  <div className="flex items-center gap-2 text-ffxv-accent mb-3">
                    <Zap size={18} />
                    <span className="text-xs tracking-[0.2em] uppercase">
                      Elemancy (Stack)
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {activeProject.techs.map((tech) => (
                      <span
                        key={tech}
                        className="px-4 py-1 border border-white/20 bg-white/5 text-sm tracking-wider hover:bg-ffxv-primary/30 hover:border-ffxv-primary transition-colors cursor-default"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Botão de Ação */}
                <div className="absolute bottom-6 right-6">
                  <button className="flex items-center gap-2 px-6 py-2 bg-white text-black font-bold uppercase tracking-widest hover:bg-ffxv-accent transition-colors">
                    <Code size={16} /> View Code
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
