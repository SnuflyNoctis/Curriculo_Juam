import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code2, Database, Layers,
  Shield, FileCode, Palette, ScanEye,
  Volume2, VolumeX, Filter
} from "lucide-react";

// --- IMPORT DO MENU GLOBAL ---
import { KingdomMenu } from "../components/KingdomMenu";

// --- IMPORTS DAS IMAGENS ---
// (Mantenha seus imports de imagem aqui)
import reactImg from '../../assets/skills/react.png';
import tsImg from '../../assets/skills/typescript.png';
import nodeImg from '../../assets/skills/nodejs.png';
import tailwindImg from '../../assets/skills/tailwind-css.png';
import htmlImg from '../../assets/skills/html.png';
import cssImg from '../../assets/skills/css.png';

// --- IMPORTS DOS SONS ---
import saveThemeMp3 from '../../assets/sound/save-theme.mp3';
import startVoiceMp3 from '../../assets/sound/start_game.mp3';

// --- TIPOS ---
type CategoryType = "all" | "frontend" | "backend" | "tools";

interface Skill {
  id: string;
  name: string;
  category: CategoryType; // Mudamos de 'type' (weapon) para algo mais dev
  icon: React.ElementType;
  image?: string;
  description: string;
  stats: {
    proficiency: string; // Era Firepower
    experience: string;  // Era Reload Speed
    projects: string;    // Era Capacity
  };
  gridArea: string;
}

const skills: Skill[] = [
  {
    id: "react",
    name: "React.js",
    category: "frontend",
    icon: Code2,
    image: reactImg,
    description: "Desenvolvimento de interfaces componentizadas, hooks avançados e gestão de estado complexa.",
    stats: { proficiency: "Sênior", experience: "4 Anos", projects: "30+" },
    gridArea: "col-span-2 row-span-2",
  },
  {
    id: "ts",
    name: "TypeScript",
    category: "tools",
    icon: Shield,
    image: tsImg,
    description: "Tipagem estática para garantir robustez e escalabilidade em aplicações grandes.",
    stats: { proficiency: "Avançado", experience: "3 Anos", projects: "All" },
    gridArea: "col-span-1 row-span-1",
  },
  {
    id: "node",
    name: "Node.js",
    category: "backend",
    icon: Database,
    image: nodeImg,
    description: "Construção de APIs RESTful, microsserviços e integração com bancos de dados.",
    stats: { proficiency: "Pleno", experience: "3 Anos", projects: "15+" },
    gridArea: "col-span-2 row-span-1",
  },
  {
    id: "tailwind",
    name: "Tailwind CSS",
    category: "frontend",
    icon: Layers,
    image: tailwindImg,
    description: "Estilização utility-first para prototipagem rápida e designs responsivos modernos.",
    stats: { proficiency: "Especialista", experience: "3 Anos", projects: "20+" },
    gridArea: "col-span-1 row-span-2",
  },
  {
    id: "html",
    name: "HTML5 Semântico",
    category: "frontend",
    icon: FileCode,
    image: htmlImg,
    description: "Estruturação acessível e otimizada para SEO.",
    stats: { proficiency: "Nativo", experience: "5 Anos", projects: "∞" },
    gridArea: "col-span-1 row-span-1",
  },
  {
    id: "css",
    name: "CSS3 / Sass",
    category: "frontend",
    icon: Palette,
    image: cssImg, 
    description: "Animações, Grid Layout e Flexbox avançado.",
    stats: { proficiency: "Avançado", experience: "5 Anos", projects: "∞" },
    gridArea: "col-span-1 row-span-1",
  },
];

export const ResidentEvilSkills = () => {
  const [selectedSkill, setSelectedSkill] = useState<Skill>(skills[0]);
  const [activeFilter, setActiveFilter] = useState<CategoryType>("all"); // Novo Estado de Filtro
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
    voiceAudio.play().catch(e => console.log("Erro play voz:", e));
    if (bgMusicRef.current) bgMusicRef.current.play().catch(e => {});
    setHasStarted(true);
  };

  const toggleMute = () => {
    if (bgMusicRef.current) {
      bgMusicRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  // --- COMPONENTE DE BOTÃO DE FILTRO ---
  const FilterButton = ({ label, type }: { label: string, type: CategoryType }) => (
    <button
      onClick={() => setActiveFilter(type)}
      className={`
        px-4 py-2 text-xs md:text-sm uppercase tracking-widest font-bold transition-all border
        ${activeFilter === type 
          ? "bg-yellow-600/20 border-yellow-500 text-yellow-500 shadow-[0_0_15px_rgba(234,179,8,0.3)]" 
          : "bg-black/40 border-white/10 text-gray-500 hover:text-gray-300 hover:border-white/30"}
      `}
    >
      {label}
    </button>
  );

  if (!hasStarted) {
    return (
      <div className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center cursor-pointer overflow-hidden" onClick={handleStart}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#000000_90%)] z-10 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#3a0000_0%,_#000000_70%)] opacity-40 z-0 animate-pulse" />
        <div className="relative z-20 text-center scale-90 md:scale-100">
          <h1 className="text-6xl md:text-8xl font-serif text-[#b30000] tracking-widest drop-shadow-[0_0_25px_rgba(180,0,0,0.6)] uppercase" style={{ textShadow: "0px 0px 10px rgba(255, 0, 0, 0.4)" }}>
            Tech Inventory
          </h1>
          <p className="text-gray-400 text-sm md:text-base tracking-[0.8em] font-sans uppercase opacity-70 mb-16 mt-4">
            Inspect Skills & Tools
          </p>
          <div className="animate-pulse duration-[2000ms]">
            <p className="text-xl md:text-2xl font-serif text-[#e6e6e6] tracking-[0.2em] border-b border-transparent hover:border-red-900 transition-all inline-block pb-2">
              OPEN CASE
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-[#050505] text-gray-200 font-sans overflow-y-auto p-4 md:p-8 pt-32 md:pt-40 flex flex-col items-center justify-start bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-900 via-[#0a0a0a] to-[#050505] relative"
    >
      <button onClick={toggleMute} className="absolute top-4 right-4 z-50 text-gray-500 hover:text-white transition-colors">
        {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
      </button>

      {/* HEADER + FILTROS */}
      <motion.div 
        initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }}
        className="w-full max-w-6xl mb-6 flex flex-col md:flex-row justify-between items-end border-b border-white/10 pb-4 gap-4"
      >
        <div>
          <h1 className="text-3xl md:text-4xl font-serif tracking-[0.1em] text-gray-100 uppercase">
            Maleta Técnica
          </h1>
          <p className="text-xs text-yellow-600/80 tracking-[0.3em] font-bold mt-1">SELECT CATEGORY:</p>
        </div>
        
        {/* BARRA DE FILTROS (MÁGICA DO RECRUTADOR) */}
        <div className="flex flex-wrap gap-2">
            <FilterButton label="All" type="all" />
            <FilterButton label="Front-end" type="frontend" />
            <FilterButton label="Back-end" type="backend" />
            <FilterButton label="Tools" type="tools" />
        </div>
      </motion.div>

      <div className="flex flex-col lg:flex-row gap-10 w-full max-w-7xl h-full items-start">
        
        {/* MALETA (GRID) */}
        <motion.div className="flex-1 w-full" initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
          <div className="bg-[#0d0d0d] p-3 rounded-md shadow-2xl border border-white/10 relative ring-1 ring-black/50">
            {/* Parafusos */}
            <div className="absolute top-1 left-1 w-2 h-2 bg-[#2a2a2a] rounded-full shadow-sm" />
            <div className="absolute top-1 right-1 w-2 h-2 bg-[#2a2a2a] rounded-full shadow-sm" />
            <div className="absolute bottom-1 left-1 w-2 h-2 bg-[#2a2a2a] rounded-full shadow-sm" />
            <div className="absolute bottom-1 right-1 w-2 h-2 bg-[#2a2a2a] rounded-full shadow-sm" />
            
            <div className="relative grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 auto-rows-[75px] md:auto-rows-[90px] gap-[2px] z-10 bg-[#050505] p-[2px] border-2 border-[#1a1a1a] shadow-[inset_0_0_30px_rgba(0,0,0,1)]">
              {/* Background Grid */}
              {[...Array(48)].map((_, i) => (<div key={`grid-bg-${i}`} className="absolute inset-0 border border-white/5 pointer-events-none bg-[#0a0a0a]" />))}
              
              {skills.map((skill) => {
                // Lógica de destaque do filtro
                const isDimmed = activeFilter !== "all" && skill.category !== activeFilter;

                return (
                  <motion.div
                    key={skill.id}
                    layoutId={skill.id}
                    className={`
                        relative group cursor-pointer border border-[#2a2a2a] overflow-hidden rounded-[2px] 
                        ${skill.gridArea} 
                        ${selectedSkill.id === skill.id ? 'z-20 ring-1 ring-yellow-500' : 'z-10'}
                        ${isDimmed ? 'opacity-20 grayscale' : 'opacity-100 grayscale-0'}
                    `}
                    onClick={() => setSelectedSkill(skill)}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Fundo colorido sutil baseado na categoria */}
                    <div className={`absolute inset-0 opacity-40 group-hover:opacity-60 transition-opacity
                        ${skill.category === 'frontend' ? 'bg-blue-900/40' : skill.category === 'backend' ? 'bg-red-900/40' : 'bg-green-900/40'}
                    `} />

                    <div className="absolute inset-0 flex items-center justify-center p-3">
                      {skill.image ? (
                          <img src={skill.image} alt={skill.name} className="w-full h-full object-contain drop-shadow-lg filter contrast-125" />
                      ) : (
                          <skill.icon size={48} className="text-white/40" />
                      )}
                    </div>

                    {/* Efeito de Scanlines */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0)_50%,rgba(0,0,0,0.3)_50%)] bg-[length:100%_4px] pointer-events-none opacity-30" />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* INFO PANEL (LADO DIREITO - AGORA MAIS PROFISSIONAL) */}
        <motion.div className="lg:w-[35%] flex flex-col gap-4" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
          <motion.div 
            key={selectedSkill.id} 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="bg-[#0d0d0d] border border-white/10 p-6 relative overflow-hidden shadow-2xl rounded-sm min-h-[400px]"
          >
            <div className="relative z-10 flex flex-col h-full">
              <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
                <h2 className="text-3xl font-serif text-white tracking-wide">{selectedSkill.name}</h2>
                {/* Badge de Categoria */}
                <span className={`px-2 py-1 text-[10px] uppercase font-bold tracking-widest border rounded
                    ${selectedSkill.category === 'frontend' ? 'text-blue-400 border-blue-900 bg-blue-900/20' : 
                      selectedSkill.category === 'backend' ? 'text-red-400 border-red-900 bg-red-900/20' : 
                      'text-green-400 border-green-900 bg-green-900/20'}
                `}>
                    {selectedSkill.category}
                </span>
              </div>

              <p className="text-gray-300 text-base leading-relaxed mb-8 font-sans border-l-2 border-yellow-700 pl-4 italic">
                "{selectedSkill.description}"
              </p>

              {/* STATS TRADUZIDOS PARA "RECRUITER LANGUAGE" */}
              <div className="space-y-3 font-mono text-sm mt-auto">
                <StatRow label="Proficiência" value={selectedSkill.stats.proficiency} />
                <StatRow label="Experiência" value={selectedSkill.stats.experience} />
                <StatRow label="Projetos" value={selectedSkill.stats.projects} />
              </div>
            </div>
            
            {/* Scanlines Decorativas */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(255,255,255,0.02)_50%)] bg-[length:100%_4px] pointer-events-none z-0" />
          </motion.div>

          <div className="grid grid-cols-2 gap-3 mt-2 font-mono">
            <button className="bg-[#1a1a1a] border border-white/10 py-3 text-xs uppercase tracking-[0.2em] text-gray-400 hover:text-yellow-500 hover:border-yellow-600 transition-colors">
              Filter By Type
            </button>
            <button className="bg-[#1a1a1a] border border-white/10 py-3 text-xs uppercase tracking-[0.2em] text-gray-400 hover:text-yellow-500 hover:border-yellow-600 transition-colors flex items-center justify-center gap-2">
              View Docs <ScanEye size={14} />
            </button>
          </div>
        </motion.div>
      </div>

      <KingdomMenu />
    </motion.div>
  );
};

// Componente de Linha de Status (Visual Tech)
const StatRow = ({ label, value }: { label: string, value: string }) => (
  <div className="flex justify-between items-center bg-[#0a0a0a] p-3 border border-white/5 rounded-[1px] group hover:border-yellow-900/50 transition-colors">
    <span className="text-gray-500 uppercase tracking-widest text-[0.7rem] flex items-center gap-2">
        <div className="w-1 h-1 bg-yellow-600 rounded-full" /> {label}
    </span>
    <span className="text-yellow-500 font-bold tracking-wider">{value}</span>
  </div>
);