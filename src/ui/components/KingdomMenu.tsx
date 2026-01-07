import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

export const KingdomMenu = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Itens do menu
  const menuItems = [
    { label: "INÍCIO", path: "/", theme: "zelda" }, // Home
    { label: "HABILIDADES", path: "/skills", theme: "re4" }, // Skills
    { label: "PROJETOS", path: "/projects", theme: "rl" }, // Projetos
    { label: "CONTATO", path: "/contact", theme: "kh" }, // Contato
  ];

  return (
    <div className="fixed bottom-10 left-10 z-50 font-sans">
      {/* Círculo decorativo do KH atrás do menu */}
      <div className="absolute -left-4 -top-4 w-40 h-40 border-4 border-gray-500/30 rounded-full animate-spin-slow pointer-events-none" />

      <div className="flex flex-col gap-1">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;

          return (
            <motion.button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`relative text-left px-6 py-1 uppercase font-black italic tracking-widest text-2xl transition-all
                ${
                  isActive
                    ? "text-white scale-110 ml-4"
                    : "text-gray-500 hover:text-gray-300"
                }
              `}
              whileHover={{ x: 10, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* O "Mãozinha" ou icone de seleção do KH */}
              {isActive && (
                <motion.span
                  layoutId="cursor-indicator"
                  className="absolute -left-6 top-1/2 -translate-y-1/2 text-xl text-yellow-400"
                >
                  ➤
                </motion.span>
              )}

              <span className="relative z-10 drop-shadow-[0_2px_0_rgba(0,0,0,0.8)]">
                {item.label}
              </span>

              {/* Fundo do item selecionado (gradiente sutil) */}
              {isActive && (
                <motion.div
                  layoutId="menu-bg"
                  className="absolute inset-0 bg-gradient-to-r from-blue-600/50 to-transparent -skew-x-12 -z-0 rounded"
                />
              )}
            </motion.button>
          );
        })}
      </div>

      <div className="mt-4 text-xs text-gray-500 font-mono pl-4">
        CMD MENU // {location.pathname.replace("/", "") || "HOME"}
      </div>
    </div>
  );
};
