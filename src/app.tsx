// 1. Adicionamos useState e useEffect aqui no import do React
import { Suspense, lazy, useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { GlobalBootLoader } from "./ui/components/GlobalLoader/GlobalBootLoader";

// --- IMPORTS GLOBAIS ---
import { MainLayout } from "./ui/layouts/MainLayout";
import { ResidentEvilLoader } from "./ui/components/RequiemLoader/requiemLoader";

import { Hero } from "./ui/pages/Hero";

const ResidentEvilSkills = lazy(() =>
  import("./ui/pages/ResidentEvilSkills").then((m) => ({
    default: m.ResidentEvilSkills,
  })),
);
const FinalFantasyProjects = lazy(() =>
  import("./ui/pages/FinalFantasyProjects").then((m) => ({
    default: m.FinalFantasyProjects,
  })),
);
const KingdomHeartsContact = lazy(() =>
  import("./ui/pages/KingdomHeartsContact").then((m) => ({
    default: m.KingdomHeartsContact,
  })),
);

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      {/* O SUSPENSE ENVOLVE AS ROTAS */}
      <Suspense fallback={<ResidentEvilLoader />}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Hero />} />
          <Route path="/skills" element={<ResidentEvilSkills />} />
          <Route path="/projects" element={<FinalFantasyProjects />} />
          <Route path="/contact" element={<KingdomHeartsContact />} />
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
};

function App() {
  // 2. Estado para controlar se o loader principal está rodando
  const [isBooting, setIsBooting] = useState(true);

  // 3. Verifica se o usuário já viu o Boot Loader nesta sessão (pra não irritar no F5)
  // useEffect(() => {
  //   const hasBooted = sessionStorage.getItem("systemBooted");
  //   if (hasBooted) {
  //     setIsBooting(false); // Pula o loader se já rodou antes
  //   }
  // }, []);

  // 4. Função chamada quando o Boot Loader termina sua animação
  const handleBootFinish = () => {
    sessionStorage.setItem("systemBooted", "true"); // Grava que o usuário já viu
    setIsBooting(false);
  };

  return (
    <>
      {/* O LOADER GLOBAL */}
      <AnimatePresence>
        {isBooting && (
          <GlobalBootLoader onFinish={handleBootFinish} />
        )}
      </AnimatePresence>

      {/* O APP PRINCIPAL */}
      <BrowserRouter>
        <MainLayout>
          <AnimatedRoutes />
        </MainLayout>
      </BrowserRouter>
    </>
  );
}

export default App;