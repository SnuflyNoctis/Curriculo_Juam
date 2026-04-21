import React, { useState, useEffect } from "react";

import { Hero } from "./Hero";
import { ResidentEvilSkills } from "./ResidentEvilSkills";
import { FinalFantasyProjects } from "./FinalFantasyProjects";
import { KingdomHeartsContact } from "./KingdomHeartsContact";

import { HeroMobile } from "./mobile/HeroMobile";
import { ResidentEvilSkillsMobile } from "./mobile/ResidentEvilMobile";
// 
//

export const Home = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (isMobile) {
    return (
      <div className="flex flex-col bg-[#020205] min-h-screen overflow-x-hidden">

        <HeroMobile />
        <ResidentEvilSkillsMobile />
        {/* <FinalFantasyProjectsMobile /> */}
        {/* <KingdomHeartsContactMobile /> */}

        <div className="h-screen flex items-center justify-center text-white text-center p-4">
          <p className="font-mono text-sm text-yellow-500">
            [ SISTEMA MOBILE EM CONSTRUÇÃO ] <br /> Iniciando protocolo Nier...
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Hero />
      <ResidentEvilSkills />
      <FinalFantasyProjects />
      <KingdomHeartsContact />
    </>
  );
}