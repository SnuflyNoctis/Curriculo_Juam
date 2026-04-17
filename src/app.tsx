import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

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
      {/*  O SUSPENSE ENVOLVE AS ROTAS */}
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
  return (
    <BrowserRouter>
      <MainLayout>
        <AnimatedRoutes />
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;
