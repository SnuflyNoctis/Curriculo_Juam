import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const codeSnippets = [
  "const [state, setState] = useState(null);",
  "<div className='flex items-center justify-center'>",
  "import { motion, AnimatePresence } from 'framer-motion';",
  "useEffect(() => { initSystem(); }, []);",
  "export const Case3D = ({ skills }) => {",
  "npm run dev --host",
  "if (!system.online) return <BootLoader />;",
  "console.log('ACCESS GRANTED');",
  "display: flex; flex-direction: column;",
  "await Promise.all([loadModels, loadTextures]);",
  "border-bottom: 1px solid rgba(0, 255, 255, 0.2);",
  "function hackTheMainframe() { return true; }"
];

// Componente que gera uma coluna de código caindo
const FallingCodeColumn = ({ left, delay, duration }: { left: string; delay: number; duration: number }) => {
  return (
    <motion.div
      initial={{ y: "-100%" }}
      animate={{ y: "150%" }}
      transition={{
        duration: duration,
        repeat: Infinity,
        ease: "linear",
        delay: delay
      }}
      className="absolute top-0 text-[8px] md:text-[10px] text-cyan-500/40 whitespace-nowrap font-mono flex flex-col gap-4 pointer-events-none select-none z-0"
      style={{ left }}
    >
      {Array.from({ length: 15 }).map((_, i) => (
        <span key={i}>{codeSnippets[Math.floor(Math.random() * codeSnippets.length)]}</span>
      ))}
    </motion.div>
  );
};

// --- 2. CONFIGURAÇÃO DOS LOGS ---
const bootLogs = [
  "> INITIATING SECURITY PROTOCOLS...",
  "> TRACKING IP ADDRESS... [HIDDEN]",
  "> ESTABLISHING ENCRYPTED VPN TUNNEL...",
  "> ACCESSING REMOTE SERVER: BIO_DATA_CENTER...",
  "> REQUESTING LEVEL 5 AUTHORIZATION...",
  "> LOADING TACTICAL INTERFACE MODULES...",
  "> SYNCHRONIZING DEVELOPER DATA...",
  "> MAPPING RENDERED MEMORY (WEBGL)...",
  "> CONFIGURING SOUND AND EFFECTS CORE...",
  "> EXECUTING FIREWALL BYPASS...",
  "> FILE DECRYPTION COMPLETED.",
  "> STATUS: ALL SYSTEMS ONLINE OPERATIONS.",
  "> AWAITING RESPONSE FROM TERMINAL..."
];

// --- 3. COMPONENTE PRINCIPAL ---
export const GlobalBootLoader = ({ onFinish }: { onFinish: () => void }) => {
  const [currentLogIndex, setCurrentLogIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  // Colunas da chuva de código geradas aleatoriamente
  const columns = Array.from({ length: 12 }).map((_, i) => ({
    left: `${(i * 100) / 12}%`,
    delay: Math.random() * 5,
    duration: Math.random() * 5 + 5, // Duração longa para cair devagar
  }));

  useEffect(() => {
    const logInterval = setInterval(() => {
      setCurrentLogIndex((prev) => {
        if (prev < bootLogs.length - 1) return prev + 1;
        clearInterval(logInterval);
        return prev;
      });
    }, 500);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.floor(Math.random() * 5) + 3;
        if (next >= 100) {
          clearInterval(progressInterval);
          setTimeout(onFinish, 1200);
          return 100;
        }
        return next;
      });
    }, 250);

    return () => {
      clearInterval(logInterval);
      clearInterval(progressInterval);
    };
  }, [onFinish]);

  return (
    <motion.div
      key="global-boot-loader"
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        filter: "brightness(2) blur(20px)",
        transition: { duration: 1.5 }
      }}
      className="fixed inset-0 z-[9999] bg-[#020205] text-cyan-500 font-mono flex flex-col justify-end p-8 md:p-16 overflow-hidden"
    >
      {/* BACKGROUND: MATRIX DE CÓDIGO FRONTEND */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-60">
        {columns.map((col, i) => (
          <FallingCodeColumn key={i} left={col.left} delay={col.delay} duration={col.duration} />
        ))}
      </div>

      {/* BACKGROUND: SCANLINES E VIGNETTE OVERLAY */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] pointer-events-none z-10" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.95)_100%)] pointer-events-none z-10" />

      <div className="relative z-20 max-w-3xl">
        {/* CABEÇALHO */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex items-end gap-3 mb-2">
            <h1 className="text-5xl md:text-7xl font-black text-cyan-400 tracking-tighter uppercase italic leading-none drop-shadow-[0_0_15px_rgba(0,255,255,0.3)]">
              SYSTEM BOOTING<span className="animate-pulse">_</span>
            </h1>
          </div>
          <div className="h-[1px] w-full bg-cyan-500/30" />
        </motion.div>

        {/* LOGS */}
        <div className="flex flex-col gap-3 min-h-[300px] mb-12 text-[10px] md:text-sm text-cyan-400/80 tracking-[0.2em] font-mono">
          {bootLogs.slice(0, currentLogIndex + 1).map((log, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className={`${index === currentLogIndex ? "text-cyan-100 shadow-[0_0_10px_rgba(0,255,255,0.5)]" : "opacity-60"}`}
            >
              <span className="text-cyan-600 mr-3">[{String(index).padStart(2, '0')}]</span>
              {log}
            </motion.div>
          ))}
          <motion.span
            animate={{ opacity: [0, 1, 0] }}
            transition={{ repeat: Infinity, duration: 0.6 }}
            className="w-3 h-5 bg-cyan-400 mt-2 block shadow-[0_0_10px_#00ffff]"
          />
        </div>

        {/* BARRA DE PROGRESSO */}
        <div className="w-full max-w-xl">
          <div className="flex justify-between text-[10px] text-cyan-700 mb-3 tracking-[0.5em] font-black italic">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-cyan-500 animate-ping rounded-full" />
              SYNCHRONIZING_DATA
            </span>
            <span>{progress}%</span>
          </div>

          <div className="w-full h-1 bg-cyan-950 border-b border-cyan-500/20 overflow-hidden relative">
            <motion.div
              className="absolute inset-y-0 left-0 bg-cyan-500 shadow-[0_0_10px_#00ffff]"
              animate={{ width: `${progress}%` }}
              transition={{ ease: "linear", duration: 0.5 }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};