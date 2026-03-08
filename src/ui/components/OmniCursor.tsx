import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const OmniCursor = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    // Detecta se o mouse está sobre algo clicável (Botões, Links, Inputs)
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isClickable = target.closest('a, button, input, textarea, [role="button"]');
      setIsHovering(!!isClickable);
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-screen"
      // Usamos style.transform ao invés de animate para máxima performance sem delay
      style={{
        transform: `translate3d(${mousePos.x}px, ${mousePos.y}px, 0)`,
      }}
    >
      {/* 1. AURA DA FADA (Zelda) */}
      <motion.div
        className="absolute -top-4 -left-4 w-8 h-8 bg-cyan-400/40 rounded-full blur-md"
        animate={{
          scale: isClicking ? 1.5 : isHovering ? 1.2 : 1,
          backgroundColor: isHovering ? "rgba(255, 215, 0, 0.4)" : "rgba(0, 247, 255, 0.4)"
        }}
        transition={{ duration: 0.3 }}
      />

      {/* 2. PONTEIRO DE CRISTAL (Final Fantasy) */}
      {/* Desenhado para que a ponta exata (0,0) seja o local do clique */}
      <motion.svg
        className="absolute top-0 left-0 drop-shadow-[0_0_8px_rgba(0,255,255,0.8)]"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        animate={{
          rotate: isHovering ? 45 : 0,
          scale: isClicking ? 0.8 : 1,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <path
          d="M0 0 L10 24 L14 14 L24 10 Z"
          fill={isHovering ? "#ffd700" : "rgba(29, 78, 216, 0.6)"}
          stroke={isHovering ? "#fff" : "#00f7ff"}
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </motion.svg>

      {/* 3. MIRA TÁTICA (Resident Evil) - Aparece só no Hover */}
      <AnimatePresence>
        {isHovering && (
          <motion.div
            initial={{ opacity: 0, scale: 1.5, rotate: -45 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 1.5, rotate: 45 }}
            transition={{ duration: 0.2 }}
            className="absolute -top-6 -left-6 w-12 h-12"
          >
            <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-red-500 shadow-[0_0_5px_red]" />
            <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-red-500 shadow-[0_0_5px_red]" />
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-red-500 shadow-[0_0_5px_red]" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-red-500 shadow-[0_0_5px_red]" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 4. EXPLOSÃO MÁGICA (Kingdom Hearts) - Aparece no Clique */}
      <AnimatePresence>
        {isClicking && (
          <motion.div
            initial={{ scale: 0, opacity: 1, borderWidth: "4px" }}
            animate={{ scale: 3, opacity: 0, borderWidth: "0px" }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="absolute -top-6 -left-6 w-12 h-12 border-yellow-300 rounded-full"
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};