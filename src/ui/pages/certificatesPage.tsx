import React, { useState } from "react";
import { certificatesData, Certificate } from "../../data/certificatesData";
import { CertificateList } from "../components/Certificates_Config/CertificateList";

export const CertificatesPage = () => {
  const [activeCert, setActiveCert] = useState<Certificate>(certificatesData[0]);

  return (
    <div className="min-h-screen bg-[#0a0a12] text-white flex items-center justify-center p-4 md:p-8 pt-32 overflow-hidden font-mono">
      
      {/* CARCAÇA DA POKÉDEX (Vermelho, plástico fosco, bordas grossas) */}
      <div className="w-full max-w-7xl h-[80vh] bg-red-600 border-[6px] border-red-800 rounded-3xl shadow-[0_20px_50px_rgba(220,38,38,0.2)] flex flex-col overflow-hidden relative z-10">
        
        {/* TOPO DA POKÉDEX (Lente azul e LEDs) */}
        <div className="h-16 bg-red-600 border-b-[4px] border-red-800 flex items-center px-6 gap-4 shadow-sm relative z-20">
          {/* Lente Principal (Azul) */}
          <div className="w-10 h-10 rounded-full bg-blue-500 border-4 border-white shadow-[0_0_15px_rgba(59,130,246,0.8),inset_0_-3px_5px_rgba(0,0,0,0.4)] animate-pulse" />
          
          {/* LEDs de Status */}
          <div className="flex gap-2 mb-4">
            <div className="w-3 h-3 rounded-full bg-red-500 border border-red-900 shadow-[inset_0_-1px_2px_rgba(0,0,0,0.5)]" />
            <div className="w-3 h-3 rounded-full bg-yellow-400 border border-yellow-700 shadow-[inset_0_-1px_2px_rgba(0,0,0,0.5)]" />
            <div className="w-3 h-3 rounded-full bg-green-500 border border-green-800 shadow-[inset_0_-1px_2px_rgba(0,0,0,0.5)]" />
          </div>
          
          <div className="ml-auto text-red-900 font-black tracking-widest opacity-50 flex items-center gap-2">
            <div className="w-16 h-2 bg-red-800 rounded-full" />
            <div className="w-8 h-2 bg-red-800 rounded-full" />
          </div>
        </div>

        {/* TELAS DA POKÉDEX (Fundo cinza para contrastar com o vermelho) */}
        <div className="flex flex-1 p-4 gap-4 bg-red-500 flex-col md:flex-row">
          
          {/* TELA ESQUERDA: Lista (A "Mochila") */}
          <div className="w-full md:w-1/3 h-1/3 md:h-full bg-slate-900 border-4 border-slate-700 rounded-xl p-4 overflow-y-auto shadow-[inset_0_0_20px_rgba(0,0,0,0.8)]">
            <CertificateList 
              certificates={certificatesData} 
              activeCert={activeCert} 
              onSelect={setActiveCert} 
            />
          </div>

          {/* TELA DIREITA: Visor 3D e Detalhes */}
          <div className="w-full md:w-2/3 h-2/3 md:h-full flex flex-col gap-4 relative">
            
            {/* Visor 3D (Fundo de grade/digital) */}
            <div className="flex-1 w-full relative bg-slate-900 border-4 border-slate-700 rounded-xl shadow-[inset_0_0_30px_rgba(0,0,0,0.8)] overflow-hidden">
               {/* Fundo com grade de Pokédex */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px]" />
              
              <div className="absolute inset-0 flex items-center justify-center text-slate-500 font-bold">
                [ Componente 3D Holográfico Aqui ]
              </div>
            </div>

            {/* Rodapé de Informações */}
            <div className="h-28 bg-slate-900 border-4 border-slate-700 rounded-xl p-4 flex items-center justify-between shadow-[inset_0_0_20px_rgba(0,0,0,0.8)]">
              <div className="text-slate-500 font-bold">[ Componente de Detalhes Aqui ]</div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};