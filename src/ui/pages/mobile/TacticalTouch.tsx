import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const TacticalTouch = () => {
  const [touches, setTouches] = useState<{ id: number; x: number; y: number }[]>([]);

  useEffect(() => {
    // Escuta o toque do dedo na tela
    const handleTouch = (e: TouchEvent) => {
      // Pega as coordenadas de cada dedo (suporta múltiplos toques)
      const newTouches = Array.from(e.changedTouches).map((t) => ({
        id: Date.now() + Math.random(),
        x: t.clientX,
        y: t.clientY,
      }));

      setTouches((prev) => [...prev, ...newTouches]);

      // Remove a bolinha do estado depois que a animação termina (500ms)
      setTimeout(() => {
        setTouches((prev) => prev.filter((t) => !newTouches.find((n) => n.id === t.id)));
      }, 500);
    };

    // 'touchstart' garante que só vai funcionar em telas de toque
    window.addEventListener("touchstart", handleTouch);
    return () => window.removeEventListener("touchstart", handleTouch);
  }, []);

  // Se não tem toque ativo, não renderiza nada para poupar memória
  if (touches.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      <AnimatePresence>
        {touches.map((t) => (
          <motion.div
            key={t.id}
            initial={{ scale: 0, opacity: 0.8 }}
            animate={{ scale: 2.5, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="absolute w-12 h-12 border border-cyan-400 rounded-full flex items-center justify-center"
            style={{
              left: t.x - 24, // Centraliza no eixo X (metade da largura)
              top: t.y - 24,  // Centraliza no eixo Y (metade da altura)
            }}
          >
            {/* O "miolo" do radar */}
            <div className="w-1 h-1 bg-cyan-200 rounded-full shadow-[0_0_8px_#00ffff]" />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};