import { motion } from "framer-motion";
import { Code, Terminal, MapPin, Briefcase, ScrollText } from "lucide-react";

// IMPORTANDO A ÚNICA FONTE DA VERDADE
import { profileData } from "../../data/profileData";

// Componente de Coração
const Heart = ({ filled, delay }: { filled: boolean; delay: number }) => (
  <motion.svg
    initial={{ scale: 0 }}
    animate={{ scale: 1 }}
    transition={{ delay, type: "spring", stiffness: 200 }}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill={filled ? "#ff3e3e" : "rgba(100,0,0,0.3)"}
    stroke={filled ? "#ff3e3e" : "#5a0000"}
    strokeWidth="2"
    className="drop-shadow-[0_0_5px_rgba(255,0,0,0.6)]"
  >
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </motion.svg>
);

export const ZeldaProfile = () => {
  return (
    <div className="relative w-full max-w-6xl mx-auto p-4 md:p-8 mt-12 mb-24 font-sans">
      {/* Container Principal "Sheikah Slate" */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative bg-[#0a0a0a]/95 backdrop-blur-xl border border-[#968c67]/50 rounded-lg p-6 md:p-10 overflow-hidden shadow-2xl"
      >
        {/* Cantoneiras Douradas */}
        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#ffd700]" />
        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#ffd700]" />
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#ffd700]" />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#ffd700]" />

        <div className="flex flex-col md:flex-row gap-10 items-start">
          {/* --- COLUNA ESQUERDA: FOTO E STATUS --- */}
          <div className="w-full md:w-1/3 flex flex-col items-center gap-6 border-b md:border-b-0 md:border-r border-[#968c67]/30 pb-6 md:pb-0 md:pr-6">
            {/* Avatar */}
            <div className="relative group">
              <div className="w-40 h-40 md:w-56 md:h-56 rounded-full border-4 border-[#968c67] overflow-hidden relative z-10 shadow-[0_0_30px_rgba(0,0,0,0.8)]">
                <img
                  src={profileData.personal.avatarUrl}
                  alt={profileData.personal.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-[#00f7ff]/20 rounded-full blur-xl -z-0 animate-pulse" />
            </div>

            {/* Status Rápidos */}
            <div className="w-full space-y-4">
              {" "}
              <div className="flex justify-between items-start text-sm text-[#b4c0b4] gap-4">
                <span className="flex items-center gap-2 whitespace-nowrap pt-0.5">
                  <MapPin size={14} className="text-[#00f7ff]" /> Localização
                </span>
                <span className="font-bold text-[#e0e0d0] text-right leading-tight">
                  {profileData.personal.location}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm text-[#b4c0b4] gap-4">
                <span className="flex items-center gap-2 whitespace-nowrap">
                  <Briefcase size={14} className="text-[#ffd700]" /> Experiência
                </span>
                <span className="font-bold text-[#e0e0d0] text-right">
                  {profileData.personal.experience}
                </span>
              </div>
              {/* Botão de Download CV */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="mt-6 w-full relative group"
              >
                {/* Bordas decorativas estilo Sheikah */}
                <div className="absolute -inset-1 bg-gradient-to-r from-[#ffd700]/20 to-[#00f7ff]/10 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />

                <div className="relative w-full bg-[#111111]/80 border border-[#968c67]/40 rounded p-4 overflow-hidden">
                  {/* Linhas brilhantes no fundo */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#ffd700]/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />

                  <div className="flex items-center gap-2 mb-3 border-b border-[#968c67]/30 pb-2">
                    <ScrollText size={16} className="text-[#ffd700]" />
                    <span className="text-xs text-[#b4c0b4] font-serif uppercase tracking-widest">
                      Quest Atual: Formação
                    </span>
                  </div>

                  {/* Efeito cascata suave */}
                  <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={{
                      hidden: { opacity: 0 },
                      visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
                    }}
                    className="flex flex-col gap-2.5 font-sans text-xs"
                  >
                    <motion.div variants={{ hidden: { opacity: 0, y: 5 }, visible: { opacity: 1, y: 0 } }} className="flex justify-between items-end">
                      <span className="text-[#968c67] tracking-wider text-[10px] uppercase">Status</span>
                      <span className="text-[#00f7ff] font-bold text-right leading-tight max-w-[120px]">
                        {profileData.personal.education.status}
                      </span>
                    </motion.div>

                    <motion.div variants={{ hidden: { opacity: 0, y: 5 }, visible: { opacity: 1, y: 0 } }} className="flex  justify-between items-end">
                      <span className="text-[#968c67] tracking-wider text-[10px] uppercase">Universidade</span>
                      <span className="text-[#e0e0d0] text-right font-serif">
                        {profileData.personal.education.university}
                      </span>
                    </motion.div>

                    <motion.div variants={{ hidden: { opacity: 0, y: 5 }, visible: { opacity: 1, y: 0 } }} className="flex justify-between items-end">
                      <span className="text-[#968c67] tracking-wider text-[10px] uppercase">Domínio</span>
                      <span className="text-[#e0e0d0] text-right font-serif">
                        {profileData.personal.education.degree}
                      </span>
                    </motion.div>

                    <motion.div variants={{ hidden: { opacity: 0, y: 5 }, visible: { opacity: 1, y: 0 } }} className="flex justify-between items-end">
                      <span className="text-[#968c67] tracking-wider text-[10px] uppercase">Level</span>
                      <span className="text-[#ffd700] font-bold text-right">
                        {profileData.personal.education.semester}
                      </span>
                    </motion.div>

                    <motion.div variants={{ hidden: { opacity: 0, y: 5 }, visible: { opacity: 1, y: 0 } }} className="flex justify-between items-end mt-1 pt-2 border-t border-[#968c67]/20">
                      <span className="text-[#968c67] tracking-wider text-[10px] uppercase">Fim da Jornada</span>
                      <span className="text-[#00f7ff] tracking-widest font-bold drop-shadow-[0_0_5px_rgba(0,247,255,0.4)]">
                        {profileData.personal.education.graduationYear}
                      </span>
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* --- COLUNA DIREITA: QUEM SOU EU --- */}
          <div className="flex-1 text-left space-y-6">
            {/* Cabeçalho */}
            <div className="border-b border-[#968c67]/30 pb-4">
              <h2
                className="text-3xl md:text-5xl font-serif text-[#ffd700] mb-2"
                style={{ fontFamily: '"Cinzel", serif' }}
              >
                {profileData.personal.name} {/* <-- Dados Dinâmicos */}
              </h2>
              <p className="text-[#00f7ff] tracking-[0.3em] text-sm uppercase font-bold flex items-center gap-2">
                <Terminal size={14} /> {profileData.personal.role}{" "}
                {/* <-- Dados Dinâmicos */}
              </p>
            </div>

            {/* O TEXTO (BIO) */}
            <div className="space-y-4 text-[#e0e0d0] text-base md:text-lg leading-relaxed font-sans opacity-90">
              {/* Mapeando o array de bio e renderizando o HTML interno para manter as cores */}
              {profileData.personal.bio.map((paragraph, index) => (
                <p
                  key={index}
                  dangerouslySetInnerHTML={{ __html: paragraph }}
                />
              ))}
            </div>

            {/* GRID DE SKILLS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              {/* Stack Principal */}
              <div className="bg-[#151515] p-4 rounded border-l-4 border-[#00f7ff] relative overflow-hidden group">
                <div className="absolute right-2 top-2 opacity-10 group-hover:opacity-30 transition-opacity">
                  <Code size={40} />
                </div>
                <h3 className="text-[#00f7ff] text-xs uppercase tracking-widest mb-1 font-bold">
                  {profileData.skillsSummary.core.title}{" "}
                  {/* <-- Dados Dinâmicos */}
                </h3>
                <p className="text-[#e0e0d0] font-bold">
                  {profileData.skillsSummary.core.techs}{" "}
                  {/* <-- Dados Dinâmicos */}
                </p>
                <p className="text-gray-500 text-xs mt-1">
                  {profileData.skillsSummary.core.description}{" "}
                  {/* <-- Dados Dinâmicos */}
                </p>
              </div>

              {/* Stack Secundária / Back-end */}
              <div className="bg-[#151515] p-4 rounded border-l-4 border-[#ffd700] relative overflow-hidden group">
                <div className="absolute right-2 top-2 opacity-10 group-hover:opacity-30 transition-opacity">
                  <Terminal size={40} />
                </div>
                <h3 className="text-[#ffd700] text-xs uppercase tracking-widest mb-1 font-bold">
                  {profileData.skillsSummary.backend.title}{" "}
                  {/* <-- Dados Dinâmicos */}
                </h3>
                <p className="text-[#e0e0d0] font-bold">
                  {profileData.skillsSummary.backend.techs}{" "}
                  {/* <-- Dados Dinâmicos */}
                </p>
                <p className="text-gray-500 text-xs mt-1">
                  {profileData.skillsSummary.backend.description}{" "}
                  {/* <-- Dados Dinâmicos */}
                </p>
              </div>
            </div>

            {/* Barra de Vida Decorativa */}
            <div className="mt-6 flex items-center gap-4 opacity-80">
              <span className="text-xs text-[#b4c0b4] uppercase tracking-widest">
                Motivation
              </span>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Heart key={i} filled={true} delay={i * 0.1} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
