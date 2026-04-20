import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

import { ZeldaProfile } from "../../components/ZeldaProfile";
import { ZeldaBackground } from "../../components/ZeldaBackground";

const AnimatedTriforceMobile = () => {
  const draw = {
    hidden: { pathLength: 0, fill: "rgba(255, 215, 0, 0)" },
    visible: {
      pathLength: 1,
      fill: "rgba(255, 215, 0, 0.4)",
      transition: { pathLength: { duration: 2, ease: "easeInOut" as const }, fill: { duration: 1, delay: 1.5 } }
    }
  } as const;

  return (
    <motion.svg
      width="45"
      height="40"
      viewBox="0 0 60 52"
      className="absolute -top-12 left-1/2 -translate-x-1/2 drop-shadow-[0_0_10px_rgba(255,215,0,0.8)]"
    >
      <motion.polygon points="30,0 45,26 15,26" fill="none" stroke="#ffd700" strokeWidth="2" variants={draw} initial="hidden" animate="visible" />
      <motion.polygon points="15,26 30,52 0,52" fill="none" stroke="#ffd700" strokeWidth="2" variants={draw} initial="hidden" animate="visible" />
      <motion.polygon points="45,26 60,52 30,52" fill="none" stroke="#ffd700" strokeWidth="2" variants={draw} initial="hidden" animate="visible" />
    </motion.svg>
  );
};

export const HeroMobile = () => {
  return (<motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.8 }}
    className="relative w-full min-h-[100dvh] bg-black text-[#e0e0d0] font-serif selection:bg-[#00f7ff] selection:text-black overflow-x-hidden flex flex-col"
  >
    <div className="absolute inset-0 z-0 pointer-events-none h-[100dvh]">
      <motion.div
        className="absolute inset-0 opacity-30 bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.alphacoders.com/796/796062.jpg')" }}
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 10, ease: "linear" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#020617]/90 via-black/70 to-black" />

      <ZeldaBackground />
    </div>

    <div className="relative z-20 flex flex-col items-center justify-center min-h-[100dvh] w-full px-4 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20, filter: "blur(5px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative mb-4 mt-10"
      >
        <AnimatedTriforceMobile />

        <h1 className="text-3xl font-black tracking-[0.15em] text-[#f5f5f0] drop-shadow-md font-serif mt-4">
          THE LEGEND OF
        </h1>

        <div className="flex flex-col items-center justify-center gap-2 my-4">
          <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-[#00f7ff] to-transparent" />
          <h2 className="text-4xl font-bold text-[#92d0ff] drop-shadow-[0_0_15px_rgba(0,200,255,0.5)] font-serif leading-tight">
            JOÃO VICTOR
          </h2>
          <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-[#00f7ff] to-transparent" />
        </div>

        <p className="text-[10px] text-[#b4c0b4] tracking-[0.3em] uppercase mt-4 font-sans opacity-80 leading-relaxed px-4">
          Level 45 <br /> Junior Front-End Developer
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ delay: 1.5, duration: 2, repeat: Infinity }}
        className="absolute bottom-12 text-[#00f7ff]/50"
      >
        <ChevronDown size={32} />
      </motion.div>
    </div>

    <div className="relative z-20 w-full bg-black pb-10">
      <ZeldaProfile />
    </div>

    <div className="fixed top-0 left-0 w-full h-[100dvh] pointer-events-none z-50">
      <div className="absolute top-4 left-4 w-8 h-8 border-t border-l border-[#00f7ff]/30 rounded-tl-lg" />
      <div className="absolute top-4 right-4 w-8 h-8 border-t border-r border-[#00f7ff]/30 rounded-tr-lg" />
      <div className="absolute bottom-4 left-4 w-8 h-8 border-b border-l border-[#00f7ff]/30 rounded-bl-lg" />
      <div className="absolute bottom-4 right-4 w-8 h-8 border-b border-r border-[#00f7ff]/30 rounded-br-lg" />
    </div>
  </motion.div>
  );
};