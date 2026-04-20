import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScanEye, Filter } from "lucide-react";
import { Case3D } from "../components/Case3D";
import { ExamineModal } from "../components/ExamineModal";
import { TacticalCursor } from "../CursorTactical/TacticalCursor";

import { ResidentEvilLoader } from "../components/RequiemLoader/requiemLoader";

import {
  skillsData as skills,
  CategoryType,
  Skill,
} from "../../data/SkillData";

export const ResidentEvilSkills = () => {
  const [selectedSkill, setSelectedSkill] = useState<Skill>(skills[0]);
  const [activeFilter, setActiveFilter] = useState<CategoryType>("all");
  const [sortOrder, setSortOrder] = useState<"default" | "level">("default");
  const [isExamining, setIsExamining] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  const [isSimulatingBoot, setIsSimulatingBoot] = useState(false);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsExamining(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const filteredSkills = useMemo(() => {
    let result = skills;

    if (activeFilter !== "all") {
      result = result.filter((s) => s.category.includes(activeFilter));
    }

    if (sortOrder === "level") {
      result = [...result].sort((a, b) => b.stats.level - a.stats.level);
    }

    return result;
  }, [activeFilter, sortOrder]);

  useEffect(() => {
    if (!filteredSkills.find((s) => s.id === selectedSkill.id)) {
      if (filteredSkills.length > 0) {
        setSelectedSkill(filteredSkills[0]);
      }
    }
  }, [activeFilter, filteredSkills, selectedSkill]);

  const handleStart = () => {
    setHasStarted(true);
    setIsSimulatingBoot(true);

    setTimeout(() => {
      setIsSimulatingBoot(false);
    }, 2000);
  };

  const handleFilterLogs = () => {
    setSortOrder((prev) => (prev === "default" ? "level" : "default"));
  };

  const FilterButton = ({
    label,
    type,
  }: {
    label: string;
    type: CategoryType;
  }) => (
    <button
      onClick={() => setActiveFilter(type)}
      className={`
        px-4 py-2 text-[10px] md:text-xs uppercase tracking-widest font-mono transition-all border
        ${activeFilter === type
          ? "bg-cyan-950/50 border-cyan-400 text-cyan-300 shadow-[0_0_15px_rgba(0,255,255,0.2)]"
          : "bg-black/40 border-white/10 text-gray-500 hover:text-cyan-200 hover:border-cyan-500/30"
        }
      `}
    >
      {label}
    </button>
  );

  if (!hasStarted) {
    return (
      <div
        className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center cursor-pointer overflow-hidden"
        onClick={handleStart}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#0a0a15_0%,_#000000_90%)] z-0" />
        <div className="relative z-20 text-center scale-90 md:scale-100">
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

  if (isSimulatingBoot) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black"
      >
        <ResidentEvilLoader />
      </motion.div>
    );
  }

  // 3. TELA PRINCIPAL (A Maleta 3D)
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-[#020205] text-gray-200 font-sans overflow-y-auto p-4 md:p-8 pt-32 md:pt-40 flex flex-col items-center justify-start relative cursor-none"
    >
      <TacticalCursor />
      {/* EFEITOS DE TELA */}
      <div className="scanlines" />
      <div className="vignette" />
      <div className="fixed inset-0 bg-[linear-gradient(rgba(0,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.02)_1px,transparent_1px)] bg-[length:50px_50px] pointer-events-none z-0" />

      {/* HEADER + FILTROS */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="w-full max-w-7xl mb-6 flex flex-col md:flex-row justify-between items-end border-b border-cyan-500/20 pb-4 gap-4 relative z-10"
      >
        <div>
          <h1 className="text-3xl md:text-4xl font-mono tracking-[0.1em] text-cyan-50 uppercase drop-shadow-[0_0_10px_rgba(0,255,255,0.2)]">
            Inventário das minhas habilidades
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
        {/* Brief Case */}
        <motion.div
          className="flex-1 w-full min-h-[600px] flex items-center justify-center relative"
          initial={{ scale: 1.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        >
          <Case3D skills={filteredSkills} onSelectSkill={setSelectedSkill} />

          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-[#0a0a15]/80 border border-cyan-500/30 px-4 py-1 text-[10px] text-cyan-400/80 rounded pointer-events-none backdrop-blur-sm uppercase tracking-widest">
            Arraste para girar // Clique para inspecionar
          </div>
        </motion.div>

        {/* INFO PANEL */}
        <motion.div
          className="lg:w-[35%] flex flex-col gap-4"
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
        >
          {selectedSkill && (
            <motion.div
              key={selectedSkill.id}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-[#0a0a15]/80 backdrop-blur-md border border-cyan-500/30 p-6 relative overflow-hidden shadow-[0_0_30px_rgba(0,255,255,0.05)] rounded-sm min-h-[400px]"
            >
              <div className="absolute top-0 right-0 p-2">
                <div className="w-20 h-1 bg-cyan-500/20 mb-1" />
                <div className="w-10 h-1 bg-cyan-500/40 ml-auto" />
              </div>

              <div className="relative z-10 flex flex-col h-full">
                {/* HEADER */}
                <div className="flex items-center justify-between border-b border-cyan-500/20 pb-4 mb-4">
                  <div>
                    <h2 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 tracking-tighter uppercase">
                      {selectedSkill.name}
                    </h2>
                    <p className="text-[10px] text-cyan-600/60 font-mono tracking-[0.3em] mt-1">
                      SYSTEM_ID: {selectedSkill.id.toUpperCase()}_v.2.0
                    </p>
                  </div>

                  <div className="border border-cyan-500/30 p-2 rounded bg-cyan-950/30">
                    <selectedSkill.icon className="text-cyan-400" size={20} />
                  </div>
                </div>

                {/* ECG MONITOR */}
                <EcgMonitor />

                {/* DATILOGRAFADA */}
                <div className="mb-8 font-mono text-sm text-gray-300 leading-relaxed bg-black/40 p-4 border-l-2 border-cyan-500/50 min-h-[100px]">
                  <span className="text-cyan-500 mr-2">{">"}</span>
                  <motion.span
                    key={selectedSkill.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0 }}
                  >
                    {selectedSkill.description.split("").map((char, index) => (
                      <motion.span
                        key={index}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.05, delay: index * 0.02 }}
                      >
                        {char}
                      </motion.span>
                    ))}
                  </motion.span>
                  <span className="animate-pulse inline-block w-2 h-4 bg-cyan-500/50 align-middle ml-1" />
                </div>

                {/* STATS */}
                <div className="space-y-2 font-mono text-xs mt-auto">
                  <StatRow
                    label="NÍVEL DE PROFICIÊNCIA"
                    value={selectedSkill.stats.proficiency}
                  />
                  <StatRow
                    label="EXP_TIME"
                    value={selectedSkill.stats.experience}
                  />
                  <StatRow
                    label="CONTAGEM_DE_PROJETOS"
                    value={selectedSkill.stats.projects}
                  />
                </div>
              </div>

              <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.03)_1px,transparent_1px)] bg-[length:100%_4px] pointer-events-none z-0 opacity-50" />
            </motion.div>
          )}

          {/* BOTÕES DE AÇÃO  */}
          <div className="grid grid-cols-2 gap-3 mt-2 font-mono">
            <button
              onClick={handleFilterLogs}
              className="bg-cyan-950/30 border border-cyan-500/30 py-3 text-[10px] uppercase tracking-widest text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-400 transition-all flex items-center justify-center gap-2 group active:scale-95"
            >
              <Filter
                size={14}
                className={`transition-transform ${sortOrder === "level" ? "text-green-400" : ""}`}
              />
              {sortOrder === "default" ? "CLASSIFICAÇÃO_PADRÃO" : "ORDENAR POR NÍVEL"}
            </button>

            {/* DOCS */}
            <button
              onClick={() => setIsExamining(true)}
              className="bg-cyan-500/10 border border-cyan-500/50 py-3 text-[10px] uppercase tracking-widest text-cyan-300 hover:bg-cyan-500/20 hover:shadow-[0_0_15px_rgba(0,255,255,0.2)] transition-all flex items-center justify-center gap-2 active:scale-95"
            >
              INSPECIONAR <ScanEye size={14} />
            </button>
          </div>
        </motion.div>
      </div>

      {/* MODAL DE EXAMINE */}
      <AnimatePresence>
        {isExamining && (
          <ExamineModal
            skill={selectedSkill}
            onClose={() => setIsExamining(false)}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const EcgMonitor = () => {
  return (
    <div className="relative w-full h-16 bg-black/40 border border-cyan-900/50 rounded-sm overflow-hidden mb-4">
      <div className="absolute inset-0 bg-[linear-gradient(transparent_1px, #000_1px),linear-gradient(90deg, transparent_1px,#000_1px)] bg-[size:4px_4px] opacity-20"></div>
      <svg
        className="w-full h-full"
        viewBox="0 0 300 100"
        preserveAspectRatio="none"
      >
        <motion.path
          d="M0,50 L20,50 L30,50 L40,20 L50,80 L60,50 L80,50 L300,50"
          fill="none"
          stroke="#00ff00"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0, x: -300 }}
          animate={{
            pathLength: [0, 1, 0],
            opacity: [0, 1, 0],
            x: [0, 300],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear",
            repeatDelay: 0.5,
          }}
          style={{ filter: "drop-shadow(0 0 5px #00ff00)" }}
        />
      </svg>
      <div className="absolute bottom-1 right-2 text-[10px] font-mono text-green-400 tracking-widest animate-pulse">
        CONDITION: FINE
      </div>
    </div>
  );
};

const StatRow = (
  {
    label,
    value,
  }: { label: string; value: string },
) => (
  <div className="flex justify-between items-center border-b border-cyan-500/10 py-2 group hover:bg-cyan-500/5 transition-colors px-2">
    <span className="text-cyan-600/70 tracking-widest flex items-center gap-2">
      {label}
    </span>
    <span className="text-cyan-100 font-bold tracking-wider drop-shadow-[0_0_5px_rgba(0,255,255,0.5)]">
      {value}
    </span>
  </div>
);
