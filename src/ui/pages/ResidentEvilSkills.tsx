import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code2, Database, Layers,
  Shield, FileCode, Palette, ScanEye,
  Volume2, VolumeX
} from "lucide-react";

// --- IMPORTS DAS IMAGENS ---
import reactImg from '../../assets/skills/react.png';
import tsImg from '../../assets/skills/typescript.png';
import nodeImg from '../../assets/skills/nodejs.png';
import tailwindImg from '../../assets/skills/tailwind-css.png';
import htmlImg from '../../assets/skills/html.png';
// import cssImg from '../../assets/skills/css.png'; 

// --- IMPORT DO SOM (A CORREÇÃO ESTÁ AQUI) ---
// Certifique-se que o arquivo está em src/assets/sounds/
import saveThemeMp3 from '../../assets/sound/save-theme.mp3';

// --- TIPOS ---
interface Skill {
  id: string;
  name: string;
  type: "weapon" | "ammo" | "herb" | "treasure";
  icon: React.ElementType;
  image?: string;
  description: string;
  stats: {
    firepower: string;
    reloadSpeed: string;
    capacity: string;
  };
  gridArea: string;
}

const skills: Skill[] = [
  // ... LISTA DE SKILLS (MANTIDA IGUAL) ...
  {
    id: "react",
    name: "React.js Custom",
    type: "weapon",
    icon: Code2,
    image: reactImg,
    description: "Biblioteca de UI de alto calibre. Capaz de componentizar qualquer interface com precisão cirúrgica.",
    stats: { firepower: "Lv. 5 (Max)", reloadSpeed: "0.5s", capacity: "Infinite" },
    gridArea: "col-span-2 row-span-2",
  },
  {
    id: "ts",
    name: "TypeScript Rounds",
    type: "ammo",
    icon: Shield,
    image: tsImg,
    description: "Munição tipada. Previne bugs em tempo de execução e garante estabilidade no código.",
    stats: { firepower: "Lv. 4", reloadSpeed: "N/A", capacity: "100%" },
    gridArea: "col-span-1 row-span-1",
  },
  {
    id: "node",
    name: "Node.js Magnum",
    type: "weapon",
    icon: Database,
    image: nodeImg,
    description: "Runtime robusto para Backend. Processamento assíncrono de alto desempenho.",
    stats: { firepower: "Lv. 4", reloadSpeed: "1.2s", capacity: "Server" },
    gridArea: "col-span-2 row-span-1",
  },
  {
    id: "tailwind",
    name: "Tailwind Spray",
    type: "herb",
    icon: Layers,
    image: tailwindImg,
    description: "Utilitário de estilo rápido. Cura layouts quebrados e embeleza interfaces instantaneamente.",
    stats: { firepower: "N/A", reloadSpeed: "Instant", capacity: "1" },
    gridArea: "col-span-1 row-span-2",
  },
  {
    id: "html",
    name: "HTML Core",
    type: "ammo",
    icon: FileCode,
    image: htmlImg,
    description: "A estrutura óssea da web. Essencial para qualquer sobrevivente frontend.",
    stats: { firepower: "Lv. 5", reloadSpeed: "Fast", capacity: "DOM" },
    gridArea: "col-span-1 row-span-1",
  },
  {
    id: "css",
    name: "CSS Paint",
    type: "herb",
    icon: Palette,
    // image: cssImg, 
    description: "Pintura de estilos em cascata. Dá vida e cor ao esqueleto do HTML.",
    stats: { firepower: "Lv. 4", reloadSpeed: "Normal", capacity: "Style" },
    gridArea: "col-span-1 row-span-1",
  },
];

const iconSpin = {
  rest: { rotateY: 0, scale: 1 },
  hover: {
    rotateY: 360,
    scale: 1.1,
    transition: {
      rotateY: { duration: 2, repeat: Infinity, ease: "linear" },
      scale: { duration: 0.2 }
    }
  },
  tap: { scale: 0.95 }
};

export const ResidentEvilSkills = () => {
  const [selectedSkill, setSelectedSkill] = useState<Skill>(skills[0]);
  const [hasStarted, setHasStarted] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Inicializa o áudio
  useEffect(() => {
    // AQUI MUDOU: Usamos a variável importada saveThemeMp3
    audioRef.current = new Audio(saveThemeMp3);
    audioRef.current.volume = 0.4;
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
      audioRef.current.play().then(() => {
        setHasStarted(true);
      }).catch(e => {
        console.error("Erro no play:", e);
        // Se ainda der erro, pelo menos libera a tela
        setHasStarted(true);
      });
    } else {
      setHasStarted(true);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const playSound = (type: 'move' | 'select') => {
    // Placeholder SFX
  };

  // --- TELA DE START ---
  if (!hasStarted) {
    return (
      <div className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center cursor-pointer" onClick={handleStart}>
        <div className="text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <h1 className="text-6xl md:text-8xl font-serif text-red-700 tracking-widest font-bold drop-shadow-[0_0_25px_rgba(220,38,38,0.8)]">
              RESIDENT EVIL 4
            </h1>
            <p className="text-gray-500 text-sm tracking-[1em] mt-2 uppercase">System Interface</p>
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="text-2xl md:text-3xl font-mono text-white tracking-widest border-b-2 border-transparent hover:border-red-600 transition-colors pb-1"
            onClick={(e) => {
              e.stopPropagation();
              handleStart();
            }}
          >
            LOAD GAME DATA
          </motion.button>

          <p className="text-gray-600 text-xs uppercase tracking-widest mt-12">
            Click anywhere to start
          </p>
        </div>
      </div>
    );
  }

  // --- CONTEÚDO PRINCIPAL ---
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="min-h-screen bg-[#050505] text-gray-200 font-sans overflow-y-auto p-4 md:p-8 flex flex-col items-center justify-center bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-900 via-[#0a0a0a] to-[#050505] relative"
    >
      <button
        onClick={toggleMute}
        className="absolute top-4 right-4 z-50 text-gray-500 hover:text-white transition-colors"
      >
        {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
      </button>

      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="w-full max-w-6xl mb-8 flex justify-between items-end border-b border-white/10 pb-2 relative"
      >
        <h1 className="text-4xl md:text-5xl font-serif tracking-[0.1em] text-gray-100 uppercase drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
          Attache Case <span className="text-xs md:text-sm text-yellow-600/80 block tracking-[0.5em] font-sans mt-1 font-bold">Skills & Inventory</span>
        </h1>
        <div className="text-right hidden md:block font-mono">
          <p className="text-yellow-600/80 text-sm tracking-widest mb-1">PTAS</p>
          <p className="text-3xl text-white tracking-wider drop-shadow-md">2,500,000</p>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-yellow-500/50 to-transparent" />
      </motion.div>

      <div className="flex flex-col lg:flex-row gap-10 w-full max-w-7xl h-full items-start">
        {/* MALETA */}
        <motion.div className="flex-1 w-full" initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} transition={{ type: "spring", stiffness: 150, damping: 25 }}>
          <div className="bg-[#0d0d0d] p-3 rounded-md shadow-[0_0_50px_rgba(0,0,0,0.9),inset_0_0_20px_rgba(255,255,255,0.05)] border border-white/10 relative ring-1 ring-black/50">
            <div className="absolute top-1 left-1 w-2 h-2 bg-[#2a2a2a] rounded-full border border-black/50 box-content shadow-sm" />
            <div className="absolute top-1 right-1 w-2 h-2 bg-[#2a2a2a] rounded-full border border-black/50 box-content shadow-sm" />
            <div className="absolute bottom-1 left-1 w-2 h-2 bg-[#2a2a2a] rounded-full border border-black/50 box-content shadow-sm" />
            <div className="absolute bottom-1 right-1 w-2 h-2 bg-[#2a2a2a] rounded-full border border-black/50 box-content shadow-sm" />
            <div className="relative grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 auto-rows-[75px] md:auto-rows-[90px] gap-[2px] z-10 bg-[#050505] p-[2px] border-2 border-[#1a1a1a] shadow-[inset_0_0_30px_rgba(0,0,0,1)] rounded-sm">
              {[...Array(48)].map((_, i) => (<div key={`grid-bg-${i}`} className="absolute inset-0 border border-white/5 pointer-events-none bg-[#0a0a0a] shadow-[inset_0_0_10px_rgba(0,0,0,0.5)]" />))}
              {skills.map((skill) => (
                <motion.div
                  key={skill.id}
                  layoutId={skill.id}
                  className={`relative group cursor-pointer border border-[#2a2a2a] overflow-hidden rounded-[2px] ${skill.gridArea} ${selectedSkill.id === skill.id ? 'z-20' : 'z-10'}`}
                  onClick={() => { setSelectedSkill(skill); playSound('select'); }}
                  onHoverStart={() => playSound('move')}
                  initial="rest" whileHover="hover" whileTap="tap"
                >
                  <div className={`absolute inset-0 transition-opacity opacity-60 group-hover:opacity-80 shadow-[inset_0_0_20px_rgba(0,0,0,0.8)] ${skill.type === 'weapon' ? 'bg-[#1a1f2e]' : skill.type === 'ammo' ? 'bg-[#2e1a1a]' : skill.type === 'herb' ? 'bg-[#1a2e1a]' : 'bg-[#2e2e1a]'}`} />
                  <motion.div className="absolute inset-0 flex items-center justify-center p-3 perspective-1000" variants={iconSpin}>
                    {skill.image ? (<img src={skill.image} alt={skill.name} className="w-full h-full object-contain drop-shadow-[0_10px_10px_rgba(0,0,0,0.9)] filter contrast-125 brightness-110" />) : (<skill.icon size={48} strokeWidth={1.5} className="text-white/40 drop-shadow-lg" />)}
                  </motion.div>
                  <AnimatePresence>
                    {selectedSkill.id === skill.id && (<motion.div layoutId="select-glow" initial={{ opacity: 0 }} animate={{ opacity: 1, boxShadow: ["inset 0 0 10px rgba(250,204,21,0.2)", "inset 0 0 30px rgba(250,204,21,0.6)", "inset 0 0 10px rgba(250,204,21,0.2)"] }} exit={{ opacity: 0 }} transition={{ boxShadow: { duration: 1.5, repeat: Infinity } }} className="absolute inset-0 border-2 border-yellow-500/80 z-30 rounded-[2px] mix-blend-overlay" />)}
                  </AnimatePresence>
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0)_50%,rgba(0,0,0,0.3)_50%)] bg-[length:100%_4px] pointer-events-none opacity-30" />
                </motion.div>
              ))}
              {[...Array(6)].map((_, i) => (<div key={`empty-${i}`} className="col-span-1 row-span-1 bg-[#080808] border border-[#1a1a1a] shadow-[inset_0_0_15px_rgba(0,0,0,0.8)]" />))}
            </div>
          </div>
        </motion.div>

        {/* INFO PANEL */}
        <motion.div className="lg:w-[35%] flex flex-col gap-4" initial={{ x: 30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.3 }}>
          <motion.div key={selectedSkill.id} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="bg-[#0d0d0d] border border-white/10 p-6 relative overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.5)] rounded-sm" style={{ minHeight: '380px' }}>
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.15)_50%)] bg-[length:100%_3px] pointer-events-none z-0" />
            <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_50px_rgba(0,0,0,0.8)] z-0" />
            <div className="relative z-10 flex flex-col h-full">
              <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-4">
                <h2 className="text-2xl md:text-3xl font-serif text-gray-100 tracking-wide drop-shadow-sm">{selectedSkill.name}</h2>
                <ScanEye size={20} className="text-yellow-600/70 animate-pulse" />
              </div>
              <p className="text-xs text-yellow-600/80 uppercase tracking-[0.3em] mb-6 font-bold">{skillTypeLabel(selectedSkill.type)}</p>
              <p className="text-gray-400 text-base leading-relaxed mb-8 font-sans border-l-[3px] border-yellow-900/50 pl-4 italic">"{selectedSkill.description}"</p>
              <div className="space-y-2 font-mono text-xs md:text-sm mt-auto">
                <StatRow label="Firepower (Lv.)" value={selectedSkill.stats.firepower} />
                <StatRow label="Reload Spd" value={selectedSkill.stats.reloadSpeed} />
                <StatRow label="Capacity" value={selectedSkill.stats.capacity} />
              </div>
            </div>
          </motion.div>
          <div className="grid grid-cols-2 gap-3 mt-2 font-mono">
            <button className="relative group bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] border border-white/10 py-3 text-xs uppercase tracking-[0.2em] text-gray-400 transition-all hover:text-yellow-500 hover:border-yellow-600/50 overflow-hidden rounded-[1px]">
              <span className="relative z-10">Equip</span>
              <div className="absolute inset-0 bg-yellow-600/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </button>
            <button className="relative group bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] border border-white/10 py-3 text-xs uppercase tracking-[0.2em] text-gray-400 transition-all hover:text-yellow-500 hover:border-yellow-600/50 overflow-hidden rounded-[1px]">
              <span className="relative z-10 flex items-center justify-center gap-2">Examine <ScanEye size={14} /></span>
              <div className="absolute inset-0 bg-yellow-600/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

const StatRow = ({ label, value }: { label: string, value: string }) => (
  <div className="flex justify-between items-center bg-[#0a0a0a] p-2 px-3 border border-white/5 rounded-[1px] relative overflow-hidden group">
    <span className="text-gray-500 uppercase tracking-wider text-[0.7rem]">{label}</span>
    <span className="text-yellow-500/90 font-bold">{value}</span>
    <div className="absolute bottom-0 left-0 h-[2px] bg-yellow-800/30 w-full">
      <div className="h-full bg-yellow-600/80 w-[80%] group-hover:w-full transition-all duration-500" />
    </div>
  </div>
);

function skillTypeLabel(type: string) {
  switch (type) {
    case 'weapon': return "Main Tech Stack";
    case 'ammo': return "Support / Utility";
    case 'herb': return "Styling / UI";
    default: return "Item";
  }
}