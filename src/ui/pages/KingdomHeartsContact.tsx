import React, { useState, useRef } from "react";
import { motion, Variants, AnimatePresence } from "framer-motion";
import { Key } from "lucide-react";

import { DiveToTheHeartBackground } from "../components/DiveToTheHeartBackground";
import { profileData } from "../../data/profileData";
import { contactData } from "../../data/KingdomData";

interface ContactItem {
  id: string;
  title: string;
  value: string;
  icon: React.ElementType;
  href: string;
  color: string;
  glow: string;
  border: string;
}

const ContactCard = ({ contact, itemVariants }: { contact: ContactItem, itemVariants: Variants }) => {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isUnlocking, setIsUnlocking] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setIsUnlocking(true);

    setTimeout(() => {
      window.open(contact.href, "_blank", "noopener,noreferrer");
      setIsUnlocking(false);
    }, 500);
  };

  return (
    <motion.a
      ref={cardRef}
      href={contact.href}
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      variants={itemVariants}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`group relative w-full bg-gradient-to-r ${contact.color} backdrop-blur-md border border-white/10 p-6 rounded-xl overflow-hidden transition-all duration-300 ${contact.border}`}
    >

      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.15), transparent 40%)`
        }}
      />

      <AnimatePresence>
        {isUnlocking && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: [0, 1, 1, 0], scale: [1, 1.05, 1] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 z-50 bg-white shadow-[0_0_50px_rgba(255,255,255,1)] pointer-events-none"
          />
        )}
      </AnimatePresence>

      <div className="relative z-10 flex items-center gap-6">
        <motion.div className="w-14 h-14 rounded-full bg-black/40 border border-white/20 flex items-center justify-center shrink-0 group-hover:border-white/50 transition-colors shadow-inner">
          <contact.icon className="text-white opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]" size={24} />
        </motion.div>

        <div className="flex-1">
          <h3 className="text-[10px] md:text-xs text-blue-200/70 font-bold tracking-[0.2em] uppercase mb-1">
            {contact.title}
          </h3>
          <p className="text-lg md:text-xl text-white font-medium tracking-wide">
            {contact.value}
          </p>
        </div>

        <div className={`opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-300 ${isUnlocking ? 'text-yellow-400 drop-shadow-[0_0_10px_yellow]' : 'text-white/50'}`}>
          <span className="text-2xl font-light">›</span>
        </div>
      </div>
    </motion.a>
  );
};


export const KingdomHeartsContact = () => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.3 } }
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100, damping: 15 } }
  };

  const keybladeAnimation = {
    y: ["-4px", "4px"],
    filter: ["drop-shadow(0 0 2px rgba(250,204,21,0.4))", "drop-shadow(0 0 8px rgba(250,204,21,0.8))"],
    transition: { duration: 2, repeat: Infinity, repeatType: "reverse" as const, ease: "easeInOut" }
  };

  return (
    <div className="relative min-h-screen bg-[#020205] text-white overflow-hidden flex flex-col items-center justify-center pt-20">

      <DiveToTheHeartBackground />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000000_85%)] z-0 pointer-events-none" />

      <div className="relative z-10 w-full max-w-4xl px-4 flex flex-col items-center">

        {/* Título Estilo KH */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-4 mb-3 mt-6 opacity-90 translate-y-2">
            <motion.div animate={keybladeAnimation}>
              <Key className="text-yellow-400" size={20} />
            </motion.div>

            <h2 className="text-yellow-400 text-xs md:text-sm tracking-[0.3em] uppercase font-black drop-shadow-[0_0_5px_rgba(250,204,21,0.5)]">
              Link Worlds
            </h2>

            <motion.div animate={keybladeAnimation}>
              <Key className="text-yellow-400" size={20} transform="scale(-1, 1)" />
            </motion.div>
          </div>

          <h1 className="text-5xl md:text-7xl font-serif text-transparent bg-clip-text bg-gradient-to-b from-white to-blue-200 drop-shadow-[0_0_20px_rgba(255,255,255,0.4)] tracking-wider">
            Vamos Conectar
          </h1>

          <div className="mt-5 flex items-center justify-center gap-4 opacity-70">
            <div className="h-px w-16 bg-gradient-to-r from-transparent via-yellow-500/50 to-yellow-400" />
            <p className="text-blue-100 font-mono text-[10px] tracking-[0.4em] uppercase">
              {profileData.personal.name} // {profileData.personal.role}
            </p>
            <div className="h-px w-16 bg-gradient-to-l from-transparent via-yellow-500/50 to-yellow-400" />
          </div>
        </motion.div>

        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="w-full max-w-xl flex flex-col gap-5">
          {contactData.map((contact: ContactItem) => (
            <ContactCard key={contact.id} contact={contact} itemVariants={itemVariants} />
          ))}
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} className="mt-20 flex flex-col items-center opacity-40 pointer-events-none">
          <div className="w-px h-16 bg-gradient-to-b from-white to-transparent" />
          <div className="w-1.5 h-1.5 rounded-full bg-white mt-2 shadow-[0_0_10px_white] animate-pulse" />
        </motion.div>

      </div>
    </div>
  );
};