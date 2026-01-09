import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

export const KingdomMenu = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Itens do menu
  const menuItems = [
    { label: "INÍCIO", path: "/", theme: "zelda" },
    { label: "HABILIDADES", path: "/skills", theme: "re4" },
    { label: "PROJETOS", path: "/projects", theme: "rl" },
    { label: "CONTATO", path: "/contact", theme: "kh" },
  ];

  return (
    <div className="fixed bottom-12 left-12 z-50 font-sans">

      {/* Círculo do KH */}
      <div className="absolute -left-6 -top-10 w-64 h-64 border border-gray-500/30 rounded-full animate-spin-slow pointer-events-none" />

      <div className="flex flex-col gap-2">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path || (item.path === "/" && location.pathname === "");

          return (
            <motion.button
              key={item.path}
              onClick={() => navigate(item.path)}
              // Removi o "group" e simplifiquei as classes para evitar conflito de renderização
              className={`relative text-left px-4 py-1 uppercase font-black italic tracking-widest text-2xl transition-colors duration-200 flex items-center
                ${isActive ? "text-white ml-4" : "text-gray-500 hover:text-gray-300"}
              `}
              // ANIMAÇÃO MAIS SUAVE (Sem layoutId no botão pai para evitar o fantasma)
              animate={{ x: isActive ? 10 : 0, scale: isActive ? 1.1 : 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >

              {/* --- BACKGROUND AZUL --- */}
              {isActive && (
                <motion.div
                  layoutId="menu-bg" // Mantive só no fundo, que é seguro
                  className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-transparent -skew-x-12 rounded-sm border-l-4 border-yellow-400 -z-10"
                  transition={{ duration: 0.2 }}
                />
              )}

              {/* --- SETINHA --- */}
              {isActive && (
                <motion.div
                  layoutId="cursor-indicator"
                  className="absolute -left-8 top-1/2"
                  style={{ transform: "translateY(-50%)" }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="#fbbf24" className="drop-shadow-lg filter brightness-110">
                    <path d="M2 2L22 12L2 22V2Z" stroke="black" strokeWidth="2" />
                  </svg>
                </motion.div>
              )}

              {/* TEXTO (Simples, sem animação interna extra) */}
              <span className="relative z-10 drop-shadow-md">
                {item.label}
              </span>

            </motion.button>
          );
        })}
      </div>

      <div className="mt-6 text-xs text-gray-500 font-mono pl-4 opacity-70 tracking-[0.2em]">
        CMD MENU // {location.pathname.replace("/", "").toUpperCase() || "HOME"}
      </div>
    </div>
  );
};