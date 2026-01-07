import React from "react";
import { motion } from "framer-motion";
import { Sword, Scroll, Heart, ChevronDown } from "lucide-react";
import { KingdomHeartsAvatar } from "../components/KingdomHeartsAvatar";

// Importe sua foto aqui se estiver na pasta assets
// import myPhoto from '../../assets/perfil.png';

export const Hero = () => {
  return (
    <div className="bg-[#050505] w-full overflow-x-hidden font-serif">
      {/* --- PARTE 1: A CAPA (100% da Tela) --- */}
      <section className="relative h-screen w-full flex flex-col items-center justify-center z-10">
        {/* Fundo Decorativo Estático (Evita o tremor do Parallax) */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[20%] right-[10%] w-[300px] h-[300px] md:w-[600px] md:h-[600px] border-[40px] border-zelda-green/10 rounded-full border-dashed animate-spin-slow pointer-events-none" />
          <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-[#050505] to-transparent" />
        </div>

        {/* Conteúdo Central */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center z-10 px-4"
        >
          {/* Triângulo Triforce Decorativo */}
          <div className="w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-b-[35px] border-b-zelda-gold mx-auto mb-6 drop-shadow-[0_0_15px_rgba(196,169,72,0.6)]" />

          <h1 className="text-5xl md:text-7xl lg:text-8xl tracking-widest text-transparent bg-clip-text bg-gradient-to-b from-zelda-gold to-[#7a5c18] font-bold">
            A LENDA DO
            <br />
            <span className="text-3xl md:text-5xl lg:text-6xl tracking-[0.2em] text-white/90 block mt-4 font-sans font-light">
              DEV FULLSTACK
            </span>
          </h1>

          <p className="mt-8 text-emerald-100/60 tracking-[0.4em] animate-pulse text-xs md:text-sm uppercase">
            ROLE PARA INICIAR A JORNADA
          </p>
        </motion.div>

        {/* Seta Indicativa */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 text-zelda-gold/50 cursor-pointer z-20"
          onClick={() =>
            window.scrollTo({ top: window.innerHeight, behavior: "smooth" })
          }
        >
          <ChevronDown size={32} />
        </motion.div>
      </section>

      {/* --- PARTE 2: PERFIL (KINGDOM HEARTS HUD) --- */}
      <section className="relative z-20 py-24 px-6 md:px-20 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 min-h-[80vh]">
        {/* AVATAR + LEVEL (Lado Esquerdo) */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="relative group flex-shrink-0"
        >
          {/* TROQUE PELO SEU USUÁRIO GITHUB OU LINK DA FOTO */}
          <KingdomHeartsAvatar
            src="https://github.com/juam.png"
            alt="Foto do Juam"
          />

          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-black border-x-2 border-b-2 border-gray-600 px-6 py-1 rounded-b-xl text-yellow-400 font-black italic text-sm tracking-widest z-30 shadow-lg whitespace-nowrap">
            LVL 25
          </div>
        </motion.div>

        {/* TEXTO SOBRE MIM (Lado Direito) */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="flex-1 space-y-8 text-center lg:text-left"
        >
          <div className="flex items-center justify-center lg:justify-start gap-4 text-zelda-gold mb-2 border-b border-zelda-gold/20 pb-4">
            <Scroll className="w-6 h-6" />
            <h2 className="text-2xl md:text-3xl font-serif tracking-wider">
              DIÁRIO DE BORDO
            </h2>
          </div>

          <h3 className="text-3xl md:text-5xl text-white font-serif leading-tight">
            Sou o <span className="text-zelda-gold">João Victor</span>.
          </h3>

          <div className="text-gray-300 font-sans leading-relaxed text-base md:text-lg text-justify border-l-2 border-zelda-green/50 pl-6">
            <p className="mb-4">
              Em um mundo cheio de bugs e código espaguete, iniciei uma jornada
              para dominar as artes antigas do
              <strong className="text-zelda-glow text-white">
                {" "}
                React
              </strong> e{" "}
              <strong className="text-zelda-glow text-white">
                Arquitetura de Software
              </strong>
              .
            </p>
            <p>
              Sou um Desenvolvedor Fullstack apaixonado por criar experiências
              web imersivas. Assim como o Sora conecta mundos, eu conecto o
              Back-end ao Front-end para criar soluções robustas e mágicas.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 font-mono text-sm text-zelda-gold/80">
            <div className="bg-zelda-green/10 p-4 border border-zelda-green/30 flex items-center justify-center lg:justify-start gap-3 rounded-sm hover:bg-zelda-green/20 transition-colors">
              <Sword size={18} />
              <span>
                ATK (Código): <span className="text-white font-bold">Alto</span>
              </span>
            </div>
            <div className="bg-zelda-green/10 p-4 border border-zelda-green/30 flex items-center justify-center lg:justify-start gap-3 rounded-sm hover:bg-zelda-green/20 transition-colors">
              <Heart size={18} />
              <span>
                HP (Café):{" "}
                <span className="text-white font-bold">Infinito</span>
              </span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Rodapé suave para transição */}
      <div className="w-full h-24 bg-gradient-to-b from-[#050505] to-black" />
    </div>
  );
};
