import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, Menu as MenuIcon } from "lucide-react";

interface KingdomMenuProps {
  align?: "left" | "right";
}

export const KingdomMenu = ({ align = "left" }: KingdomMenuProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Estado do Menu (Aberto/Fechado)
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { label: "INÍCIO", path: "/", theme: "zelda" },
    { label: "HABILIDADES", path: "/skills", theme: "re4" },
    { label: "PROJETOS", path: "/projects", theme: "rl" },
    { label: "CONTATO", path: "/contact", theme: "kh" },
  ];

  const isRight = align === "right";

  return (
    <div
      // Container principal fixo no canto da tela
      className={`fixed bottom-12 z-50 font-sans flex items-end gap-3
      ${isRight ? "right-12 flex-row-reverse" : "left-12 flex-row"}
    `}>

      {/* === 1. BOTÃO DE TOGGLE (Redondo) === */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="relative z-50 w-14 h-14 flex items-center justify-center 
          bg-black/80 backdrop-blur-md border border-white/20 text-white rounded-full
          hover:bg-blue-600 hover:border-blue-400 transition-all shadow-[0_0_20px_rgba(0,0,0,0.8)]"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {isOpen ? (
          isRight ? <ChevronRight size={28} /> : <ChevronLeft size={28} />
        ) : (
          <MenuIcon size={24} className="animate-pulse" />
        )}

        {/* Anel de loading decorativo girando */}
        <div className="absolute inset-0 border-2 border-blue-500/30 rounded-full border-t-transparent animate-spin-slow" />
      </motion.button>

      {/* === 2. O MENU DESLIZANTE (Com fundo fosco) === */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "auto", opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="overflow-hidden" // Importante para o efeito de deslize
          >
            <div className={`
               relative flex flex-col gap-1 py-6 px-8 rounded-2xl
               bg-black/60 backdrop-blur-xl border border-white/10 shadow-2xl
               ${isRight ? "items-end text-right" : "items-start text-left"}
            `}>

              {/* === CÍRCULO DO KH (Agora perfeitamente centralizado no fundo) === */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden rounded-2xl">
                <div className="w-64 h-64 border-2 border-gray-500/20 rounded-full animate-spin-slow" />
              </div>

              {/* Lista de Itens */}
              {menuItems.map((item) => {
                const isActive =
                  location.pathname === item.path ||
                  (item.path === "/" && location.pathname === "");

                return (
                  <motion.button
                    key={item.path}
                    onClick={() => { navigate(item.path); setIsOpen(false); }} // Fecha ao clicar
                    className={`relative px-2 py-1 uppercase font-black italic tracking-widest text-xl md:text-2xl transition-all duration-200 flex items-center whitespace-nowrap z-10
                      ${isActive ? "text-white scale-110" : "text-gray-500 hover:text-gray-300"}
                      ${isRight ? "flex-row-reverse" : "flex-row"} 
                    `}
                    whileHover={{ x: isRight ? -5 : 5 }}
                  >
                    {/* Background Azul Ativo */}
                    {isActive && (
                      <motion.div
                        layoutId="menu-bg"
                        className={`absolute inset-0 bg-gradient-to-r from-blue-900/90 to-transparent -skew-x-12 rounded-sm border-yellow-400 -z-10
                          ${isRight ? "border-r-4 rotate-180" : "border-l-4"}
                        `}
                      />
                    )}

                    {/* Setinha Amarela */}
                    {isActive && (
                      <motion.div
                        layoutId="cursor-indicator"
                        className={`absolute top-1/2 ${isRight ? "-right-5 rotate-180" : "-left-5"}`}
                        style={{ transform: "translateY(-50%)" }}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="#fbbf24" className="drop-shadow-lg filter brightness-110">
                          <path d="M2 2L22 12L2 22V2Z" stroke="black" strokeWidth="2" />
                        </svg>
                      </motion.div>
                    )}

                    <span className="relative z-10 drop-shadow-md mx-2">{item.label}</span>
                  </motion.button>
                );
              })}

              <div className="mt-2 h-[1px] w-full bg-white/10" />
              <div className="text-[10px] text-gray-400 font-mono opacity-80 tracking-[0.2em] pt-1">
                CMD // {location.pathname.replace("/", "").toUpperCase() || "HOME"}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};