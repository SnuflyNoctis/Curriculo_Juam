import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScanEye, Filter } from "lucide-react";
import { ExamineModal } from "../../components/ExamineModal";
import { ResidentEvilLoader } from "../../components/RequiemLoader/requiemLoader";
import { Case3D } from "../../components/Cases3D/Case3D";
import {
  skillsData as skills,
  CategoryType,
  Skill,
} from "../../../data/SkillData";


export const ResidentEvilSkillsMobile = () => {
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

  const FilterButton = ({ label, type }: { label: string; type: CategoryType }) => (
    <button
      onClick={() => setActiveFilter(type)}
      className={`
        px-3 py-1.5 text-[9px] uppercase tracking-widest font-mono transition-all border flex-1 whitespace-nowrap
        ${activeFilter === type
          ? "bg-cyan-950/50 border-cyan-400 text-cyan-300 shadow-[0_0_10px_rgba(0,255,255,0.2)]"
          : "bg-black/40 border-white/10 text-gray-500 active:text-cyan-200 active:border-cyan-500/30"
        }
      `}
    >
      {label}
    </button>
  );

  if (!hasStarted) {
    return (
      <div
        className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center overflow-hidden"
        onClick={handleStart}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#0a0a15_0%,_#000000_90%)] z-0" />
        <div className="relative z-20 text-center px-4 w-full">
          <h1
            className="text-4xl md:text-5xl font-serif text-cyan-50 tracking-widest drop-shadow-[0_0_15px_rgba(0,255,255,0.15)] uppercase opacity-90"
            style={{ fontFamily: "Cinzel, serif" }}
          >
            SYSTEM START
          </h1>
          <p className="text-cyan-700/60 text-xs tracking-[0.4em] font-mono uppercase mb-12 mt-4">
            Initialize Digital Interface
          </p>
          <div className="animate-pulse duration-[2000ms]">
            <p className="text-sm font-mono text-cyan-200 tracking-[0.2em] border-b border-transparent active:border-cyan-400 transition-all inline-block pb-2">
              [ TAP TO ACCESS ]
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (isSimulatingBoot) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black">
        <ResidentEvilLoader />
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-[100dvh] bg-[#020205] text-gray-200 font-sans overflow-x-hidden p-4 pt-16 pb-10 flex flex-col items-center justify-start relative"
    >


      <div className="scanlines" />
      <div className="vignette" />
      <div className="fixed inset-0 bg-[linear-gradient(rgba(0,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.02)_1px,transparent_1px)] bg-[length:30px_30px] pointer-events-none z-0" />

      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="w-full max-w-md mb-6 flex flex-col gap-4 border-b border-cyan-500/20 pb-4 relative z-10"
      >
        <div>
          <h1 className="text-xl font-mono tracking-[0.1em] text-cyan-50 uppercase drop-shadow-[0_0_10px_rgba(0,255,255,0.2)]">
            Inventário
          </h1>
          <p className="text-[9px] text-cyan-600/70 tracking-[0.2em] font-bold mt-1 uppercase">
            Select Category // System.Ready
          </p>
        </div>

        <div className="flex flex-wrap w-full gap-2">
          <FilterButton label="All" type="all" />
          <FilterButton label="Front" type="frontend" />
          <FilterButton label="Back" type="backend" />
          <FilterButton label="Tools" type="tools" />
        </div>
      </motion.div>

      <div className="flex flex-col gap-6 w-full max-w-md relative z-10">
        <motion.div
          className="w-full h-[450px] flex items-center justify-center relative"
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        >
          <<Case3D skills={filteredSkills} selectedSkill={selectedSkill} onSelectSkill={setSelectedSkill} />
        </motion.div>

        <motion.div
          className="w-full flex flex-col gap-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          {selectedSkill && (
            <motion.div
              key={selectedSkill.id}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-[#0a0a15]/90 backdrop-blur-md border border-cyan-500/30 p-4 relative overflow-hidden shadow-[0_0_20px_rgba(0,255,255,0.05)] rounded-sm"
            >
              <div className="absolute top-0 right-0 p-2">
                <div className="w-16 h-0.5 bg-cyan-500/20 mb-1" />
                <div className="w-8 h-0.5 bg-cyan-500/40 ml-auto" />
              </div>

              <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-center justify-between border-b border-cyan-500/20 pb-3 mb-3">
                  <div>
                    <h2 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 tracking-tighter uppercase">
                      {selectedSkill.name}
                    </h2>
                    <p className="text-[8px] text-cyan-600/60 font-mono tracking-[0.2em] mt-1">
                      SYS_ID: {selectedSkill.id.toUpperCase()}_v.2
                    </p>
                  </div>

                  <div className="border border-cyan-500/30 p-1.5 rounded bg-cyan-950/30">
                    <selectedSkill.icon className="text-cyan-400" size={16} />
                  </div>
                </div>

                <EcgMonitor />

                <div className="mb-4 font-mono text-[11px] text-gray-300 leading-relaxed bg-black/40 p-3 border-l-2 border-cyan-500/50">
                  <span className="text-cyan-500 mr-2">{">"}</span>
                  <motion.span
                    key={selectedSkill.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0 }}
                  >
                    {selectedSkill.description}
                  </motion.span>
                  <span className="animate-pulse inline-block w-1.5 h-3 bg-cyan-500/50 align-middle ml-1" />
                </div>

                <div className="space-y-1.5 font-mono text-[10px]">
                  <StatRow label="PROFICIÊNCIA" value={selectedSkill.stats.proficiency} />
                  <StatRow label="EXP_TIME" value={selectedSkill.stats.experience} />
                  <StatRow label="PROJETOS" value={selectedSkill.stats.projects} />
                </div>
              </div>
            </motion.div>
          )}

          <div className="grid grid-cols-2 gap-2 mt-1 font-mono">
            <button
              onClick={handleFilterLogs}
              className="bg-cyan-950/30 border border-cyan-500/30 py-2.5 text-[9px] uppercase tracking-widest text-cyan-400 active:bg-cyan-500/10 active:border-cyan-400 transition-all flex items-center justify-center gap-1"
            >
              <Filter size={12} className={sortOrder === "level" ? "text-green-400" : ""} />
              {sortOrder === "default" ? "PADRÃO" : "POR NÍVEL"}
            </button>

            <button
              onClick={() => setIsExamining(true)}
              className="bg-cyan-500/10 border border-cyan-500/50 py-2.5 text-[9px] uppercase tracking-widest text-cyan-300 active:bg-cyan-500/20 active:shadow-[0_0_10px_rgba(0,255,255,0.2)] transition-all flex items-center justify-center gap-1"
            >
              INSPECIONAR <ScanEye size={12} />
            </button>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {isExamining && (
          <ExamineModal skill={selectedSkill} onClose={() => setIsExamining(false)} />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const EcgMonitor = () => {
  return (
    <div className="relative w-full h-12 bg-black/40 border border-cyan-900/50 rounded-sm overflow-hidden mb-3">
      <div className="absolute inset-0 bg-[linear-gradient(transparent_1px, #000_1px),linear-gradient(90deg, transparent_1px,#000_1px)] bg-[size:4px_4px] opacity-20"></div>
      <svg className="w-full h-full" viewBox="0 0 300 100" preserveAspectRatio="none">
        <motion.path
          d="M0,50 L20,50 L30,50 L40,20 L50,80 L60,50 L80,50 L300,50"
          fill="none" stroke="#00ff00" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0, x: -300 }}
          animate={{ pathLength: [0, 1, 0], opacity: [0, 1, 0], x: [0, 300] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear", repeatDelay: 0.5 }}
          style={{ filter: "drop-shadow(0 0 3px #00ff00)" }}
        />
      </svg>
      <div className="absolute bottom-0.5 right-1.5 text-[8px] font-mono text-green-400 tracking-widest animate-pulse">
        COND: FINE
      </div>
    </div>
  );
};

const StatRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex justify-between items-center border-b border-cyan-500/10 py-1.5 px-1">
    <span className="text-cyan-600/70 tracking-widest flex items-center gap-2">
      {label}
    </span>
    <span className="text-cyan-100 font-bold tracking-wider drop-shadow-[0_0_5px_rgba(0,255,255,0.5)]">
      {value}
    </span>
  </div>
);