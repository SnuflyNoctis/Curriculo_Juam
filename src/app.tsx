// 1. Adicionamos o useEffect aqui!
import { Suspense, lazy, useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { GlobalBootLoader } from "./ui/components/GlobalLoader/GlobalBootLoader";

// --- IMPORTS GLOBAIS ---
import { MainLayout } from "./ui/layouts/MainLayout";
import { ResidentEvilLoader } from "./ui/components/RequiemLoader/requiemLoader";

import { Hero } from "./ui/pages/Hero";
import { HeroMobile } from "./ui/pages/mobile/HeroMobile";

// --- LAZY LOADS DESKTOP ---
const ResidentEvilSkills = lazy(() => import("./ui/pages/ResidentEvilSkills").then((m) => ({ default: m.ResidentEvilSkills })));
const FinalFantasyProjects = lazy(() => import("./ui/pages/FinalFantasyProjects").then((m) => ({ default: m.FinalFantasyProjects })));
const KingdomHeartsContact = lazy(() => import("./ui/pages/KingdomHeartsContact").then((m) => ({ default: m.KingdomHeartsContact })));

// --- LAZY LOADS MOBILE ---
const ResidentEvilSkillsMobile = lazy(() => import("./ui/pages/mobile/ResidentEvilMobile").then((m) => ({ default: m.ResidentEvilSkillsMobile })));
const FinalFantasyProjectsMobile = lazy(() => import("./ui/pages/mobile/FinalFantasyMobile").then((m) => ({ default: m.FinalFantasyProjectsMobile })));

const ResponsiveRoute = ({ DesktopComponent, MobileComponent }: { DesktopComponent: React.ComponentType, MobileComponent: React.ComponentType }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return isMobile ? <MobileComponent /> : <DesktopComponent />;
};

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<ResidentEvilLoader />}>
        <Routes location={location} key={location.pathname}>
          
          <Route path="/" element={<ResponsiveRoute DesktopComponent={Hero} MobileComponent={HeroMobile} />} />
          
          <Route path="/skills" element={<ResponsiveRoute DesktopComponent={ResidentEvilSkills} MobileComponent={ResidentEvilSkillsMobile} />} />
          
          <Route path="/projects" element={<ResponsiveRoute DesktopComponent={FinalFantasyProjects} MobileComponent={FinalFantasyProjectsMobile} />} />
          
          <Route path="/contact" element={<ResponsiveRoute DesktopComponent={KingdomHeartsContact} MobileComponent={KingdomHeartsContact} />} />
          
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
};

function App() {
  const [isBooting, setIsBooting] = useState(true);

  const handleBootFinish = () => {
    sessionStorage.setItem("systemBooted", "true");
    setIsBooting(false);
  };

  return (
    <>
      <AnimatePresence>
        {isBooting && (
          <GlobalBootLoader onFinish={handleBootFinish} />
        )}
      </AnimatePresence>

      <BrowserRouter>
        <MainLayout>
          <AnimatedRoutes />
        </MainLayout>
      </BrowserRouter>
    </>
  );
}

export default App;