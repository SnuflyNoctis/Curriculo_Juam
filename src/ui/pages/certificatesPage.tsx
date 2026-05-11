import React, { useState, useMemo } from "react";
import { certificatesData, Certificate } from "../../data/certificatesData";
import { CertificateList } from "../components/Certificates_Config/CertificateList";
import { Certificate3DViewer } from "../components/Certificates_Config/Certificate3DViewer";
import { PokemonEyes } from "../components/Certificates_Config/PokemonEyes";
import { Legendaries } from "../components/Certificates_Config/Legendaries";
import { CertificateDetails } from "../components/Certificates_Config/CertificateDetails";

const DistortionBackground = () => {
  const antimatterParticles = useMemo(() => {
    return Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      size: Math.random() * 15 + 5,
      left: Math.random() * 100,
      duration: Math.random() * 15 + 10,
      delay: Math.random() * -20,
    }));
  }, []);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(88,28,135,0.2)_0%,transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(153,27,27,0.15)_0%,transparent_50%)]" />
      <div className="absolute top-1/4 left-1/3 w-[600px] h-[100px] bg-purple-900/20 rounded-full blur-[60px] -rotate-45 animate-pulse" />
      <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[80px] bg-red-900/10 rounded-full blur-[50px] rotate-12 animate-[pulse_4s_ease-in-out_infinite]" />
      <PokemonEyes />
      {antimatterParticles.map((p) => (
        <div
          key={p.id}
          className="absolute bg-[#0a0510] animate-antimatter border border-purple-900/30 shadow-[0_0_10px_rgba(88,28,135,0.4)]"
          style={{
            width: `${p.size}px`,
            height: `${p.size}px`,
            left: `${p.left}%`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            borderRadius:
              p.id % 2 === 0 ? "30% 70% 70% 30% / 30% 30% 70% 70%" : "2px",
          }}
        />
      ))}
    </div>
  );
};

export const CertificatesPage = () => {
  const [activeCert, setActiveCert] = useState<Certificate>(
    certificatesData[0],
  );

  return (
    <div className="w-full h-screen overflow-hidden font-mono relative bg-[#030005] flex items-center justify-center p-4 lg:p-8 pt-24">
      <DistortionBackground />

      <Legendaries />

      <div className="relative z-10 w-full max-w-7xl mx-auto flex items-center justify-center h-full">
        <div className="flex-1 w-full relative">
          <div className="w-full h-[75vh] min-h-[500px] bg-red-600/30 backdrop-blur-lg border-[4px] border-red-500/50 rounded-3xl shadow-[0_20px_50px_rgba(220,38,38,0.15)] flex flex-col overflow-hidden relative z-10">
            <div className="h-16 bg-red-600/60 backdrop-blur-md border-b-[2px] border-red-500/50 flex items-center px-6 gap-4 shadow-sm shrink-0">
              <div className="w-10 h-10 rounded-full bg-blue-500 border-4 border-white shadow-[0_0_15px_rgba(59,130,246,0.8),inset_0_-3px_5px_rgba(0,0,0,0.4)] animate-pulse" />
              <div className="flex gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500 border border-red-900" />
                <div className="w-3 h-3 rounded-full bg-yellow-400 border border-yellow-700" />
                <div className="w-3 h-3 rounded-full bg-green-500 border border-green-800" />
              </div>
              <div className="ml-auto text-red-100 font-black tracking-widest opacity-30 text-[10px] uppercase">
                Data Archive v2.0
              </div>
            </div>

            <div className="flex flex-1 p-4 gap-4 bg-red-500/10 flex-col md:flex-row min-h-0">
              <div className="w-full md:w-1/3 bg-slate-900/40 backdrop-blur-md border-[2px] border-slate-600/50 rounded-xl p-4 overflow-y-auto">
                <CertificateList
                  certificates={certificatesData}
                  activeCert={activeCert}
                  onSelect={setActiveCert}
                />
              </div>

              <div className="w-full md:w-2/3 flex flex-col gap-4 relative min-h-0">
                <div className="flex-1 relative bg-slate-900/40 backdrop-blur-md border-[2px] border-slate-600/50 rounded-xl overflow-hidden">
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px]" />
                  <Certificate3DViewer activeCert={activeCert} />
                </div>
                <div className="h-32 w-full shrink-0">
                  <CertificateDetails activeCert={activeCert} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
