import React from "react";
import { motion } from "framer-motion";
import { Mail, Linkedin, Github, Key, MessageCircle } from "lucide-react";

import { DiveToTheHeartBackground } from "../components/DiveToTheHeartBackground";
import { profileData } from "../../data/profileData";

export const KingdomHeartsContact = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 10 }
    }
  };

  const floatingAnimation = {
    y: ["-5px", "5px"],
    transition: {
      duration: 3,
      repeat: Infinity,
      repeatType: "reverse" as const,
      ease: "easeInOut"
    }
  };

  const contacts = [
    {
      id: "email",
      title: "EMAIL ADDRESS",
      value: profileData.contact.email,
      icon: Mail,
      href: `mailto:${profileData.contact.email}`,
      color: "from-blue-600/20 to-cyan-500/10",
      glow: "group-hover:shadow-[0_0_30px_rgba(0,255,255,0.4)]",
      border: "group-hover:border-cyan-400"
    },
    {
      id: "whatsapp",
      title: "INSTANT MESSAGING",
      value: "WhatsApp",
      icon: MessageCircle,
      href: profileData.contact.Whatsapp,
      color: "from-green-600/20 to-emerald-500/10",
      glow: "group-hover:shadow-[0_0_30px_rgba(34,197,94,0.4)]",
      border: "group-hover:border-green-400"
    },
    {
      id: "linkedin",
      title: "PROFESSIONAL NETWORK",
      value: "LinkedIn Profile",
      icon: Linkedin,
      href: profileData.contact.linkedin,
      color: "from-blue-800/20 to-blue-500/10",
      glow: "group-hover:shadow-[0_0_30px_rgba(0,100,255,0.4)]",
      border: "group-hover:border-blue-400"
    },
    {
      id: "github",
      title: "CODE REPOSITORY",
      value: "GitHub Profile",
      icon: Github,
      href: profileData.contact.github,
      color: "from-purple-900/20 to-purple-500/10",
      glow: "group-hover:shadow-[0_0_30px_rgba(150,0,255,0.4)]",
      border: "group-hover:border-purple-400"
    }
  ];

  return (
    <div className="relative min-h-screen bg-[#020205] text-white overflow-hidden flex flex-col items-center justify-center pt-20">

      {/* O Fundo 3D de Kingdom Hearts */}
      <DiveToTheHeartBackground />

      {/* Gradiente de fundo para dar profundidade */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000000_80%)] z-0 pointer-events-none" />

      <div className="relative z-10 w-full max-w-4xl px-4 flex flex-col items-center">

        {/* Título Estilo KH */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-2 opacity-80">
            <Key className="text-yellow-400" size={18} />
            <h2 className="text-yellow-400 text-xs md:text-sm tracking-[0.4em] uppercase font-bold">
              Link Worlds
            </h2>
            <Key className="text-yellow-400" size={18} transform="scale(-1, 1)" />
          </div>

          <h1 className="text-5xl md:text-7xl font-serif text-transparent bg-clip-text bg-gradient-to-b from-white to-blue-300 drop-shadow-[0_0_15px_rgba(255,255,255,0.5)] tracking-wider">
            Vamos Conectar
          </h1>
          <div className="mt-4 flex items-center justify-center gap-4">
            <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-yellow-500" />
            <p className="text-blue-200/60 font-mono text-xs tracking-[0.3em] uppercase">
              {profileData.personal.name} // {profileData.personal.role}
            </p>
            <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-yellow-500" />
          </div>
        </motion.div>

        {/* Os Cards de Conexão */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full max-w-xl flex flex-col gap-6"
        >
          {contacts.map((contact) => (
            <motion.a
              key={contact.id}
              href={contact.href}
              target="_blank"
              rel="noopener noreferrer"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`group relative w-full bg-gradient-to-r ${contact.color} backdrop-blur-md border border-white/10 p-6 rounded-xl overflow-hidden transition-all duration-300 ${contact.glow} ${contact.border}`}
            >
              {/* Brilho interno animado no hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0%,transparent_100%)] transition-opacity duration-500" />

              <div className="relative z-10 flex items-center gap-6">
                {/* Ícone com animação de flutuar */}
                <motion.div
                  animate={floatingAnimation}
                  className="w-14 h-14 rounded-full bg-black/40 border border-white/20 flex items-center justify-center shrink-0 group-hover:border-white/50 transition-colors"
                >
                  <contact.icon className="text-white opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all" size={24} />
                </motion.div>

                <div className="flex-1">
                  <h3 className="text-[10px] md:text-xs text-blue-200/70 font-bold tracking-[0.2em] uppercase mb-1">
                    {contact.title}
                  </h3>
                  <p className="text-lg md:text-xl text-white font-medium tracking-wide">
                    {contact.value}
                  </p>
                </div>

                {/* Seta indicativa que aparece no hover */}
                <div className="opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-300">
                  <span className="text-2xl text-white/50 font-light">›</span>
                </div>
              </div>
            </motion.a>
          ))}
        </motion.div>

        {/* Detalhe de UI na base */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
          className="mt-20 flex flex-col items-center opacity-40 pointer-events-none"
        >
          <div className="w-[1px] h-16 bg-gradient-to-b from-white to-transparent" />
          <div className="w-2 h-2 rounded-full bg-white mt-2 shadow-[0_0_10px_white]" />
        </motion.div>

      </div>
    </div>
  );
};