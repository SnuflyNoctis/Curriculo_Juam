import * as React from "react";
import { KingdomMenu } from "../components/KingdomMenu";

// O seu novo cursor definitivo
import { OmniCursor } from "../components/OmniCursor";
// ⚡ Importe o efeito de toque que acabamos de criar!
import { TacticalTouch } from "../pages/mobile/TacticalTouch"; 

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    // ⚡ md:cursor-none: O cursor padrão só é escondido no Desktop!
    <div className="relative min-h-screen bg-black overflow-hidden md:cursor-none">

      {/* 1. CURSOR GLOBAL (Fica invisível no celular) */}
      <div className="hidden md:block">
        <OmniCursor />
      </div>

      {/* ⚡ 2. EFEITO DE TOQUE GLOBAL (Fica invisível no PC) ⚡ */}
      <div className="block md:hidden">
        <TacticalTouch />
      </div>

      {/* 3. MENU GLOBAL */}
      <KingdomMenu />

      {/* 4. CONTEÚDO DAS PÁGINAS */}
      <main className="relative z-0">{children}</main>

      {/* 5. EFEITO DE SCANLINE/TV GLOBAL */}
      <div className="fixed inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-[50] bg-[length:100%_2px,3px_100%] opacity-20" />
    </div>
  );
};