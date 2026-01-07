import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { KingdomMenu } from "../components/KingdomMenu";

// Import do arquivo .cur (Nativo)
import keybladeCur from "../../assets/cursors/Keyblade.cur";

// --- COMPONENTES DOS CURSORES ANIMADOS (MODO TOTAL) ---

const AimCursor = ({ isClicking }: { isClicking: boolean }) => (
  <motion.div
    initial={{ scale: 0, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    exit={{ scale: 0, opacity: 0 }}
    className="relative flex items-center justify-center"
  >
    <motion.div
      className="w-12 h-12 border border-red-600/60 rounded-full flex items-center justify-center shadow-[0_0_10px_rgba(220,38,38,0.5)]"
      animate={{ rotate: 360 }}
      transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
    >
      <div className="absolute w-full h-[1px] bg-red-600/40" />
      <div className="absolute h-full w-[1px] bg-red-600/40" />
    </motion.div>
    <motion.div
      className="absolute w-1 h-1 bg-red-500 rounded-full shadow-[0_0_8px_2px_rgba(255,0,0,1)]"
      animate={{ scale: isClicking ? 0.5 : 1 }}
    />
    {isClicking && (
      <motion.div
        className="absolute w-full h-full border-2 border-red-500 rounded-full opacity-0"
        animate={{ scale: [1, 1.5], opacity: [1, 0] }}
        transition={{ duration: 0.2 }}
      />
    )}
  </motion.div>
);

const CrystalCursor = ({ isClicking }: { isClicking: boolean }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0 }}
    className="relative -top-1 -left-1"
  >
    <svg
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      className="drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]"
    >
      <motion.path
        d="M2 2L9.5 22L12.5 12.5L22 9.5L2 2Z"
        fill="rgba(29, 78, 216, 0.4)"
        stroke="#60a5fa"
        strokeWidth="1.5"
        strokeLinejoin="round"
        animate={{
          fill: isClicking
            ? "rgba(255, 255, 255, 0.8)"
            : "rgba(29, 78, 216, 0.4)",
          filter: isClicking ? "brightness(1.5)" : "brightness(1)",
        }}
      />
    </svg>
    <motion.div
      className="absolute top-4 left-4 w-1 h-1 bg-blue-400 rounded-full blur-[1px]"
      animate={{ y: [0, 20], opacity: [1, 0] }}
      transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
    />
  </motion.div>
);

const FairyCursor = () => (
  <motion.div
    initial={{ scale: 0, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    exit={{ scale: 0, opacity: 0 }}
    className="relative flex items-center justify-center"
  >
    <motion.div
      className="absolute w-14 h-8 flex items-center justify-center"
      animate={{ rotate: [0, 3, -3, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
    >
      <motion.div
        className="absolute left-0 w-7 h-6 bg-cyan-200/50 rounded-full blur-[2px] border border-white/60 origin-right"
        style={{ borderRadius: "100% 0 100% 0" }}
        animate={{ scaleX: [1, 0.3, 1], rotate: [-15, -25, -15] }}
        transition={{ duration: 0.12, repeat: Infinity }}
      />
      <motion.div
        className="absolute right-0 w-7 h-6 bg-cyan-200/50 rounded-full blur-[2px] border border-white/60 origin-left"
        style={{ borderRadius: "0 100% 0 100%" }}
        animate={{ scaleX: [1, 0.3, 1], rotate: [15, 25, 15] }}
        transition={{ duration: 0.12, repeat: Infinity }}
      />
    </motion.div>
    <motion.div
      className="relative z-10 w-5 h-5 bg-white rounded-full shadow-[0_0_25px_8px_rgba(165,243,252,0.9)]"
      animate={{ scale: [1, 1.1, 1] }}
      transition={{ duration: 2, repeat: Infinity }}
    >
      <div className="absolute inset-0 bg-blue-300 blur-[3px] rounded-full animate-pulse" />
    </motion.div>
    <motion.div
      className="absolute w-2 h-2 bg-yellow-100 rounded-full blur-[2px]"
      animate={{ y: [0, 30], opacity: [0.6, 0], scale: [1.5, 0] }}
      transition={{ duration: 1.2, repeat: Infinity, ease: "easeOut" }}
    />
  </motion.div>
);

// --- NOVO: MAGIA DA KEYBLADE (Sem imagem, só partículas) ---
const KeybladeMagic = ({ isClicking }: { isClicking: boolean }) => (
  <motion.div
    className="relative top-0 left-0" // Alinhado com a ponta do cursor nativo
  >
    {/* Rastro de luz suave que segue o mouse */}
    <motion.div
      className="absolute -top-2 -left-2 w-4 h-4 bg-yellow-200/30 rounded-full blur-md"
      animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
      transition={{ duration: 2, repeat: Infinity }}
    />

    {/* EFEITO DE CLIQUE (UNLOCK BURST) */}
    {isClicking && (
      <>
        {/* Explosão de luz central */}
        <motion.div
          className="absolute -top-6 -left-6 w-12 h-12 bg-white rounded-full blur-xl"
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 2, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />

        {/* Anel de choque estilo Kingdom Hearts */}
        <motion.div
          className="absolute -top-8 -left-8 w-16 h-16 border-4 border-yellow-300 rounded-full"
          initial={{ scale: 0, opacity: 1, borderWidth: "4px" }}
          animate={{ scale: 1.5, opacity: 0, borderWidth: "0px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />

        {/* Partículas voando */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute top-0 left-0 w-1 h-1 bg-yellow-400 rounded-full"
            initial={{ x: 0, y: 0, opacity: 1 }}
            animate={{
              x: (Math.random() - 0.5) * 60,
              y: (Math.random() - 0.5) * 60,
              opacity: 0,
            }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        ))}
      </>
    )}
  </motion.div>
);

// --- CONFIGURAÇÃO ---

type CursorType = "default" | "aim" | "fairy" | "crystal" | "keyblade";

const CURSOR_OFFSETS: Record<CursorType, string> = {
  default: "translate(-50%, -50%)",
  aim: "translate(-50%, -50%)",
  fairy: "translate(-50%, -50%)",
  crystal: "translate(0, 0)",
  keyblade: "translate(0, 0)", // Keyblade nativa clica na ponta (0,0)
};

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const location = useLocation();
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState<CursorType>("default");
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) =>
      setCursorPosition({ x: e.clientX, y: e.clientY });
    const mouseDown = () => setIsClicking(true);
    const mouseUp = () => setIsClicking(false);

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mousedown", mouseDown);
    window.addEventListener("mouseup", mouseUp);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mousedown", mouseDown);
      window.removeEventListener("mouseup", mouseUp);
    };
  }, []);

  useEffect(() => {
    switch (location.pathname) {
      case "/skills":
        setCursorVariant("aim");
        break;
      case "/projects":
        setCursorVariant("crystal");
        break;
      case "/contact":
        setCursorVariant("keyblade");
        break;
      case "/":
        setCursorVariant("fairy");
        break;
      default:
        setCursorVariant("default");
    }
  }, [location]);

  const isNativeCursor = cursorVariant === "keyblade";

  useEffect(() => {
    if (isNativeCursor) {
      document.body.classList.add("native-cursor");
    } else {
      document.body.classList.remove("native-cursor");
    }
  }, [isNativeCursor]);

  return (
    <div
      className="relative min-h-screen bg-black overflow-hidden"
      style={{
        cursor: isNativeCursor ? `url(${keybladeCur}), auto` : "none",
      }}
    >
      {/* Container do Cursor - AGORA SEMPRE ATIVO PARA OS EFEITOS */}
      <div
        className="pointer-events-none fixed z-[9999]"
        style={{
          left: cursorPosition.x,
          top: cursorPosition.y,
          transform: CURSOR_OFFSETS[cursorVariant] || "translate(-50%, -50%)",
        }}
      >
        <AnimatePresence mode="wait">
          {/* Seus cursores React completos */}
          {cursorVariant === "aim" && <AimCursor isClicking={isClicking} />}
          {cursorVariant === "crystal" && (
            <CrystalCursor isClicking={isClicking} />
          )}
          {cursorVariant === "fairy" && <FairyCursor />}

          {/* TRUQUE: Se for Keyblade, mostramos SÓ A MAGIA (sem a imagem da chave) */}
          {cursorVariant === "keyblade" && (
            <KeybladeMagic isClicking={isClicking} />
          )}
        </AnimatePresence>
      </div>

      <KingdomMenu />
      <main className="relative z-0">{children}</main>

      <div className="fixed inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-[50] bg-[length:100%_2px,3px_100%] opacity-20" />
    </div>
  );
};
