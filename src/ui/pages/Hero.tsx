import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
// REMOVIDO: import { useNavigate } ... (não estamos usando agora)
import { Sword, Scroll, Heart } from "lucide-react";
import { KingdomHeartsAvatar } from "../components/KingdomHeartsAvatar";

export const Hero = () => {
  // REMOVIDO: const navigate = ... (causava o erro de variável não usada)
  const containerRef = useRef<HTMLDivElement>(null);

  // Hook para detectar o scroll
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Efeitos de Parallax (Velocidades diferentes)
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacityFade = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <div
      ref={containerRef}
      style={{ position: "relative" }} // Corrige o aviso do Framer Motion
      className="bg-[#050505] min-h-[200vh] w-full overflow-x-hidden font-serif"
    >
      {/* --- PARTE 1: A CAPA (ZELDA INTRO) --- */}
      <section className="relative h-screen flex flex-col items-center justify-center z-20">
        <motion.div style={{ opacity: opacityFade }} className="text-center">
          <div className="w-0 h-0 border-l-[25px] border-l-transparent border-r-[25px] border-r-transparent border-b-[40px] border-b-zelda-gold mx-auto mb-8 drop-shadow-[0_0_15px_rgba(196,169,72,0.8)]" />
          <h1 className="text-6xl md:text-8xl tracking-widest text-transparent bg-clip-text bg-gradient-to-b from-zelda-gold to-[#7a5c18]">
            THE LEGEND OF
            <br />
            <span className="text-3xl md:text-5xl tracking-[0.3em] text-white/90 block mt-4 font-sans font-light">
              DEV EXPERIENCE
            </span>
          </h1>
          <p className="mt-8 text-emerald-100/60 tracking-[0.5em] animate-pulse text-xs md:text-sm">
            SCROLL DOWN TO BEGIN QUEST
          </p>
        </motion.div>

        {/* Seta indicativa */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 text-zelda-gold/50"
        >
          ▼
        </motion.div>
      </section>

      {/* --- PARTE 2: O PERFIL (HUD KINGDOM HEARTS) --- */}
      <section className="relative z-20 py-20 px-6 md:px-20 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
        {/* Lado Esquerdo: HUD Kingdom Hearts */}
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="relative group flex-shrink-0"
        >
          <KingdomHeartsAvatar
            src="https://github.com/juam.png"
            alt="Juam Avatar"
          />

          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-black border-x-2 border-b-2 border-gray-600 px-6 py-1 rounded-b-xl text-yellow-400 font-black italic text-sm tracking-widest z-30 shadow-lg">
            LVL 25
          </div>
        </motion.div>

        {/* Lado Direito: Texto Sobre Mim */}
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="flex-1 space-y-6"
        >
          <div className="flex items-center gap-4 text-zelda-gold mb-2 border-b border-zelda-gold/20 pb-4">
            <Scroll className="w-6 h-6" />
            <h2 className="text-3xl font-serif tracking-wider">
              ADVENTURE LOG
            </h2>
          </div>

          <h3 className="text-4xl md:text-5xl text-white font-serif">
            Hi, I'm <span className="text-zelda-gold">Juam</span>.
          </h3>

          <p className="text-gray-300 font-sans leading-relaxed text-lg text-justify border-l-2 border-zelda-green pl-6">
            In a world full of bugs and spaghetti code, I embarked on a journey
            to master the ancient arts of
            <strong className="text-zelda-glow"> React</strong> and{" "}
            <strong className="text-zelda-glow">Domain-Driven Design</strong>.
            <br />
            <br />
            Wait... let me break character for a second. I am a passionate
            Fullstack Developer focused on building immersive web experiences.
            Just like Link needs the Master Sword, I use TypeScript and Tailwind
            to slay complex problems.
          </p>

          <div className="grid grid-cols-2 gap-4 mt-8 font-mono text-sm text-zelda-gold/80">
            <div className="bg-zelda-green/10 p-3 border border-zelda-green/30 flex items-center gap-2">
              <Sword size={16} /> ATK (Coding):{" "}
              <span className="text-white">High</span>
            </div>
            <div className="bg-zelda-green/10 p-3 border border-zelda-green/30 flex items-center gap-2">
              <Heart size={16} /> HP (Caffeine):{" "}
              <span className="text-white">Infinite</span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* --- PARTE 3: DECORAÇÃO DE FUNDO --- */}
      <motion.div
        style={{ y: yBg }}
        className="absolute top-[40%] right-0 w-[500px] opacity-10 pointer-events-none z-0"
      >
        <div className="w-[600px] h-[600px] border-[50px] border-zelda-green rounded-full opacity-20 border-dashed animate-spin-slow" />
      </motion.div>

      <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-zelda-green/20 to-transparent pointer-events-none" />
    </div>
  );
};
