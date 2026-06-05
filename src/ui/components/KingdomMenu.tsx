import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, useScroll, useSpring } from "framer-motion";
import { Home, Sword, Mail, Menu, X, Briefcase } from "lucide-react";

export const KingdomMenu = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // --- LÓGICA DO CAMALEÃO (DEFINE O TEMA BASEADO NA ROTA) ---
  const getTheme = () => {
    switch (location.pathname) {
      case "/skills": // Resident Evil 4
        return {
          color: "text-red-500",
          gradient: "from-red-600 to-orange-600",
          shadow: "shadow-[0_0_15px_rgba(220,38,38,0.5)]",
          border: "bg-red-500",
          bgHover: "bg-red-900/20",
        };
      case "/projects": // Final Fantasy XV
        return {
          color: "text-blue-400",
          gradient: "from-blue-600 to-cyan-400",
          shadow: "shadow-[0_0_15px_rgba(59,130,246,0.5)]",
          border: "bg-blue-500",
          bgHover: "bg-blue-900/20",
        };
      case "/contact": // Kingdom Hearts
        return {
          color: "text-yellow-400",
          gradient: "from-yellow-400 to-purple-600",
          shadow: "shadow-[0_0_15px_rgba(234,179,8,0.5)]",
          border: "bg-yellow-400",
          bgHover: "bg-yellow-900/20",
        };
      case "/certificates": // Tema Pokémon Black/White (Unova)
        return {
          color: "text-white", 
          gradient: "from-white via-gray-300 to-gray-600", // Contraste clássico B/W
          shadow: "shadow-[0_0_15px_rgba(255,255,255,0.4)]", // Brilho branco fantasma
          border: "bg-white",
          bgHover: "bg-white/10", // Luz suave no hover
        };
      default: // Zelda (Home)
        return {
          color: "text-green-400",
          gradient: "from-green-500 to-yellow-400",
          shadow: "shadow-[0_0_15px_rgba(34,197,94,0.5)]",
          border: "bg-green-500",
          bgHover: "bg-green-900/20",
        };
    }
  };

  const theme = getTheme();

  // Barra de XP (Scroll)
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { id: "home", label: "Início", path: "/", icon: Home },
    { id: "skills", label: "Habilidades", path: "/skills", icon: Sword },
    // {
    //   id: "certificates",
    //   label: "Certificados",
    //   path: "/certificates",
    //   icon: Award,
    // },
    { id: "projects", label: "Projetos", path: "/projects", icon: Briefcase },
    { id: "contact", label: "Contato", path: "/contact", icon: Mail },
  ];

  return (
    <>
      {/* --- HUD DE NAVEGAÇÃO --- */}
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b border-transparent
          ${
            isScrolled
              ? "bg-black/90 backdrop-blur-md border-white/5 py-3 shadow-2xl"
              : "bg-transparent py-6"
          }
        `}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* LOGO DINÂMICO */}
          <div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => navigate("/")}
          >
            <div
              className={`w-9 h-9 bg-gradient-to-tr ${theme.gradient} rounded-lg flex items-center justify-center transform group-hover:rotate-45 transition-all duration-500 ${theme.shadow}`}
            >
              <span className="text-white font-black text-lg font-serif">
                J
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-white font-bold tracking-[0.2em] uppercase text-sm leading-none">
                João Victor
              </span>
              <span
                className={`text-[10px] font-mono opacity-80 ${theme.color} tracking-widest`}
              >
                // JUNIOR FRONT-END DEVELOPER
              </span>
            </div>
          </div>

          {/* ITENS DO MENU (Desktop) */}
          <div className="hidden md:flex items-center gap-10">
            {menuItems.map((item) => {
              const isActive =
                location.pathname === item.path ||
                (item.path === "/" && location.pathname === "");

              return (
                <button
                  key={item.id}
                  onClick={() => navigate(item.path)}
                  className="relative group flex items-center gap-2 py-2"
                >
                  <span
                    className={`
                    text-xs font-bold tracking-[0.15em] uppercase transition-colors duration-300
                    ${isActive ? "text-white scale-105" : "text-gray-400 group-hover:text-gray-200"}
                  `}
                  >
                    {item.label}
                  </span>

                  {/* Underline Mágico (Muda de cor com o tema) */}
                  <span
                    className={`
                    absolute -bottom-1 left-0 h-[2px] bg-gradient-to-r ${theme.gradient} transition-all duration-300 rounded-full
                    ${isActive ? "w-full opacity-100 shadow-[0_0_10px_currentColor]" : "w-0 opacity-0 group-hover:w-1/2 group-hover:opacity-50"}
                  `}
                  />

                  {/* Luz de fundo no ativo */}
                  {isActive && (
                    <div
                      className={`absolute inset-0 blur-xl rounded-full opacity-30 ${theme.bgHover}`}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* BOTÃO MOBILE */}
          <button
            className={`md:hidden text-white p-2 hover:${theme.color} transition-colors`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* --- BARRA DE XP (Muda de cor também!) --- */}
        <motion.div
          className={`absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r ${theme.gradient} origin-left shadow-lg`}
          style={{ scaleX }}
        />
      </motion.nav>

      {/* --- MENU MOBILE (Com as cores do tema) --- */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 md:hidden"
        >
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                navigate(item.path);
                setMobileMenuOpen(false);
              }}
              className={`text-2xl font-black text-white uppercase tracking-widest hover:scale-110 transition-all flex items-center gap-4 hover:${theme.color}`}
            >
              <item.icon size={28} className={theme.color} />
              {item.label}
            </button>
          ))}
        </motion.div>
      )}
    </>
  );
};
