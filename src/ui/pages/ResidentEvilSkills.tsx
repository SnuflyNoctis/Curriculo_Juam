import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code2,
  Database,
  Layers,
  Shield,
  FileCode,
  Palette,
  ScanEye,
  Volume2,
  VolumeX,
  Filter,
} from "lucide-react";

import { Case3D } from "../components/Case3D";

import reactImg from "../../assets/skills/react.png";
import tsImg from "../../assets/skills/typescript.png";
import nodeImg from "../../assets/skills/nodejs.png";
import tailwindImg from "../../assets/skills/tailwind-css.png";
import htmlImg from "../../assets/skills/html.png";
import cssImg from "../../assets/skills/css.png";

import saveThemeMp3 from "../../assets/sound/save-theme.mp3";
import startVoiceMp3 from "../../assets/sound/start_game.mp3";

type CategoryType = "all" | "frontend" | "backend" | "tools";

interface Skill {
  id: string;
  name: string;
  category: CategoryType;
  icon: React.ElementType;
  image?: string;
  description: string;
  stats: {
    proficiency: string;
    experience: string;
    projects: string;
  };
}

const skills: Skill[] = [
  {
    id: "react",
    name: "React.js",
    category: "frontend",
    icon: Code2,
    image: reactImg,
    description:
      "Desenvolvimento de interfaces componentizadas, hooks avançados e gestão de estado complexa.",
    stats: { proficiency: "Sênior", experience: "4 Anos", projects: "30+" },
  },
  {
    id: "ts",
    name: "TypeScript",
    category: "tools",
    icon: Shield,
    image: tsImg,
    description:
      "Tipagem estática para garantir robustez e escalabilidade em aplicações grandes.",
    stats: { proficiency: "Avançado", experience: "3 Anos", projects: "All" },
  },
  {
    id: "node",
    name: "Node.js",
    category: "backend",
    icon: Database,
    image: nodeImg,
    description:
      "Construção de APIs RESTful, microsserviços e integração com bancos de dados.",
    stats: { proficiency: "Pleno", experience: "3 Anos", projects: "15+" },
  },
  {
    id: "tailwind",
    name: "Tailwind CSS",
    category: "frontend",
    icon: Layers,
    image: tailwindImg,
    description:
      "Estilização utility-first para prototipagem rápida e designs responsivos modernos.",
    stats: {
      proficiency: "Especialista",
      experience: "3 Anos",
      projects: "20+",
    },
  },
  {
    id: "html",
    name: "HTML5 Semântico",
    category: "frontend",
    icon: FileCode,
    image: htmlImg,
    description: "Estruturação acessível e otimizada para SEO.",
    stats: { proficiency: "Nativo", experience: "5 Anos", projects: "∞" },
  },
  {
    id: "css",
    name: "CSS3 / Sass",
    category: "frontend",
    icon: Palette,
    image: cssImg,
    description: "Animações, Grid Layout e Flexbox avançado.",
    stats: { proficiency: "Avançado", experience: "5 Anos", projects: "∞" },
  },
];

export const ResidentEvilSkills = () => {
  const [selectedSkill, setSelectedSkill] = useState<Skill>(skills[0]);
  const [activeFilter, setActiveFilter] = useState<CategoryType>("all");
  const [hasStarted, setHasStarted] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const bgMusicRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    bgMusicRef.current = new Audio(saveThemeMp3);
    bgMusicRef.current.loop = true;
    bgMusicRef.current.volume = 0.4;
    return () => {
      if (bgMusicRef.current) {
        bgMusicRef.current.pause();
        bgMusicRef.current = null;
      }
    };
  }, []);

  const handleStart = () => {
    const voiceAudio = new Audio(startVoiceMp3);
    voiceAudio.volume = 1.0;
    voiceAudio.play().catch((e) => console.log("Erro play voz:", e));
    if (bgMusicRef.current) bgMusicRef.current.play().catch((e) => {});
    setHasStarted(true);
  };

  const toggleMute = () => {
    if (bgMusicRef.current) {
      bgMusicRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  // Botão de Filtro (Estilo Híbrido: Dark + Ciano)
  const FilterButton = ({
    label,
    type,
  }: {
    label: string;
    type: CategoryType;
  }) => (
    <button
      onClick={() => setActiveFilter(type)}
      // MUDANÇA: Volta o Ciano para o estado ativo
      className={`
        px-4 py-2 text-[10px] md:text-xs uppercase tracking-widest font-mono transition-all border
        ${
          activeFilter === type
            ? "bg-cyan-950/50 border-cyan-400 text-cyan-300 shadow-[0_0_15px_rgba(0,255,255,0.2)]"
            : "bg-black/40 border-white/10 text-gray-500 hover:text-cyan-200 hover:border-cyan-500/30"
        }
      `}
    >
      {label}
    </button>
  );

  // TELA DE START (Híbrida)
  if (!hasStarted) {
    return (
      <div
        className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center cursor-pointer overflow-hidden"
        onClick={handleStart}
      >
        {/* Fundo azul muito escuro */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#0a0a15_0%,_#000000_90%)] z-0" />
        <div className="relative z-20 text-center scale-90 md:scale-100">
          {/* MUDANÇA: Texto com leve tom azulado */}
          <h1
            className="text-6xl md:text-8xl font-serif text-cyan-50 tracking-widest drop-shadow-[0_0_25px_rgba(0,255,255,0.15)] uppercase opacity-90"
            style={{ fontFamily: "Cinzel, serif" }}
          >
            SYSTEM START
          </h1>
          <p className="text-cyan-700/60 text-sm md:text-base tracking-[0.8em] font-mono uppercase mb-16 mt-4">
            Initialize Digital Interface
          </p>
          <div className="animate-pulse duration-[2000ms]">
            <p className="text-xl md:text-2xl font-mono text-cyan-200 tracking-[0.2em] border-b border-transparent hover:border-cyan-400 transition-all inline-block pb-2">
              [ PRESS TO ACCESS ]
            </p>
          </div>
        </div>
      </div>
    );
  }

  // TELA PRINCIPAL (HÍBRIDA: DARK + DIGITAL BLUE)
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      // Fundo azul noturno profundo
      className="min-h-screen bg-[#020205] text-gray-200 font-sans overflow-y-auto p-4 md:p-8 pt-32 md:pt-40 flex flex-col items-center justify-start relative"
    >
      {/* Background Grid Digital (Ciano sutil) */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(0,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.02)_1px,transparent_1px)] bg-[length:50px_50px] pointer-events-none z-0" />

      <button
        onClick={toggleMute}
        className="absolute top-4 right-4 z-50 text-gray-500 hover:text-cyan-400 transition-colors"
      >
        {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
      </button>

      {/* HEADER + FILTROS */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        // MUDANÇA: Borda sutil ciano
        className="w-full max-w-7xl mb-6 flex flex-col md:flex-row justify-between items-end border-b border-cyan-500/20 pb-4 gap-4 relative z-10"
      >
        <div>
          <h1 className="text-3xl md:text-4xl font-mono tracking-[0.1em] text-cyan-50 uppercase drop-shadow-[0_0_10px_rgba(0,255,255,0.2)]">
            Digital Inventory
          </h1>
          <p className="text-[10px] text-cyan-600/70 tracking-[0.3em] font-bold mt-1 uppercase">
            Select Category // System.Ready
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <FilterButton label="All" type="all" />
          <FilterButton label="Frontend" type="frontend" />
          <FilterButton label="Backend" type="backend" />
          <FilterButton label="Tools" type="tools" />
        </div>
      </motion.div>

      <div className="flex flex-col lg:flex-row gap-10 w-full max-w-7xl h-full items-start relative z-10">
        {/* --- LADO ESQUERDO: MALETA 3D --- */}
        <motion.div
          className="flex-1 w-full min-h-[600px] flex items-center justify-center relative"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        >
          <Case3D skills={skills} onSelectSkill={setSelectedSkill} />
          {/* Dica de interação (Ciano sutil) */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-[#0a0a15]/80 border border-cyan-500/30 px-4 py-1 text-[10px] text-cyan-400/80 rounded pointer-events-none backdrop-blur-sm uppercase tracking-widest">
            Drag to Rotate // Click to Inspect
          </div>
        </motion.div>

        {/* --- LADO DIREITO: INFO PANEL (HÍBRIDO) --- */}
        <motion.div
          className="lg:w-[35%] flex flex-col gap-4"
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
        >
          <motion.div
            key={selectedSkill.id}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            // MUDANÇA: Fundo escuro azulado com borda ciano
            className="bg-[#0a0a15]/80 backdrop-blur-md border border-cyan-500/30 p-6 relative overflow-hidden shadow-[0_0_30px_rgba(0,255,255,0.05)] rounded-sm min-h-[400px]"
          >
            {/* Decoração de Canto (Ciano Tech) */}
            <div className="absolute top-0 right-0 p-2">
              <div className="w-20 h-1 bg-cyan-500/20 mb-1" />
              <div className="w-10 h-1 bg-cyan-500/40 ml-auto" />
            </div>

            <div className="relative z-10 flex flex-col h-full">
              {/* HEADER DA SKILL */}
              <div className="flex items-center justify-between border-b border-cyan-500/20 pb-4 mb-4">
                <div>
                  {/* MUDANÇA: Gradiente Ciano/Azul de volta */}
                  <h2 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 tracking-tighter uppercase">
                    {selectedSkill.name}
                  </h2>
                  <p className="text-[10px] text-cyan-600/60 font-mono tracking-[0.3em] mt-1">
                    SYSTEM_ID: {selectedSkill.id.toUpperCase()}_v.2.0
                  </p>
                </div>

                {/* Ícone da Categoria (Ciano) */}
                <div className="border border-cyan-500/30 p-2 rounded bg-cyan-950/30">
                  {selectedSkill.category === "frontend" && (
                    <Code2 className="text-cyan-400" size={20} />
                  )}
                  {selectedSkill.category === "backend" && (
                    <Database className="text-cyan-400" size={20} />
                  )}
                  {selectedSkill.category === "tools" && (
                    <Shield className="text-cyan-400" size={20} />
                  )}
                </div>
              </div>

              {/* DESCRIÇÃO "TERMINAL" */}
              {/* MUDANÇA: Acentos em Ciano */}
              <div className="mb-8 font-mono text-sm text-gray-300 leading-relaxed bg-black/40 p-4 border-l-2 border-cyan-500/50">
                <span className="text-cyan-500 mr-2">{">"}</span>
                {selectedSkill.description}
                <span className="animate-pulse inline-block w-2 h-4 bg-cyan-500/50 align-middle ml-1" />
              </div>

              {/* STATS DE DADOS */}
              <div className="space-y-2 font-mono text-xs mt-auto">
                <StatRow
                  label="PROFICIENCY_LEVEL"
                  value={selectedSkill.stats.proficiency}
                />
                <StatRow
                  label="EXP_TIME"
                  value={selectedSkill.stats.experience}
                />
                <StatRow
                  label="PROJECT_COUNT"
                  value={selectedSkill.stats.projects}
                />
              </div>
            </div>

            {/* SCANLINES DE FUNDO (Ciano sutil) */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.03)_1px,transparent_1px)] bg-[length:100%_4px] pointer-events-none z-0 opacity-50" />
          </motion.div>

          {/* BOTÕES DE AÇÃO (Híbridos) */}
          <div className="grid grid-cols-2 gap-3 mt-2 font-mono">
            <button className="bg-cyan-950/30 border border-cyan-500/30 py-3 text-[10px] uppercase tracking-widest text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-400 transition-all flex items-center justify-center gap-2 group">
              <Filter
                size={14}
                className="group-hover:rotate-180 transition-transform"
              />
              FILTER_LOGS
            </button>
            <button className="bg-cyan-500/10 border border-cyan-500/50 py-3 text-[10px] uppercase tracking-widest text-cyan-300 hover:bg-cyan-500/20 hover:shadow-[0_0_15px_rgba(0,255,255,0.2)] transition-all flex items-center justify-center gap-2">
              VIEW_DOCS <ScanEye size={14} />
            </button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

// Componente de Linha de Status (Visual Híbrido)
const StatRow = ({ label, value }: { label: string; value: string }) => (
  // MUDANÇA: Acentos ciano
  <div className="flex justify-between items-center border-b border-cyan-500/10 py-2 group hover:bg-cyan-500/5 transition-colors px-2">
    <span className="text-cyan-600/70 tracking-widest flex items-center gap-2">
      {label}
    </span>
    <span className="text-cyan-100 font-bold tracking-wider drop-shadow-[0_0_5px_rgba(0,255,255,0.5)]">
      {value}
    </span>
  </div>
);
