import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Hero } from "./ui/pages/Hero";
import { FinalFantasyProjects } from "./ui/pages/FinalFantasyProjects";
import { KingdomHeartsContact } from "./ui/pages/KingdomHeartsContact";
import { ResidentEvilSkills } from './ui/pages/ResidentEvilSkills';

// Imports dos Layouts
import { MainLayout } from "./ui/layouts/MainLayout";

// Componente Wrapper para lidar com Animações de Saída/Entrada
const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Hero />} />
        <Route path="/skills" element={<ResidentEvilSkills />} />
        <Route path="/projects" element={<FinalFantasyProjects />} />
        <Route path="/contact" element={<KingdomHeartsContact />} />
      </Routes>
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
