import * as React from "react";
import { KingdomMenu } from "../components/KingdomMenu";

// O seu novo cursor definitivo
import { OmniCursor } from "../components/OmniCursor";

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    // cursor-none esconde o cursor padrão do Windows/Mac na tela toda
    <div className="relative min-h-screen bg-black overflow-hidden cursor-none">

      {/* 1. CURSOR GLOBAL ÚNICO */}
      <OmniCursor />

      {/* 2. MENU GLOBAL */}
      <KingdomMenu />

      {/* 3. CONTEÚDO DAS PÁGINAS */}
      <main className="relative z-0">{children}</main>

      {/* 4. EFEITO DE SCANLINE/TV GLOBAL (opcional, vi que você tinha) */}
      <div className="fixed inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-[50] bg-[length:100%_2px,3px_100%] opacity-20" />
    </div>
  );
};