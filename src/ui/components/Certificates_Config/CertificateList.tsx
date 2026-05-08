import React from "react";
import { Certificate } from "../../../data/certificatesData";

interface CertificateListProps {
  certificates: Certificate[];
  activeCert: Certificate;
  onSelect: (cert: Certificate) => void;
}

export const CertificateList: React.FC<CertificateListProps> = ({
  certificates,
  activeCert,
  onSelect,
}) => {
  return (
    <div className="flex flex-col h-full pl-1">
      {/* Cabeçalho da Lista - Estilo Sistema */}
      <h2 className="text-white text-lg font-black mb-4 tracking-widest flex items-center gap-2 shrink-0">
        <span className="w-2 h-4 bg-orange-500 animate-pulse" />
        DADOS REGISTRADOS
      </h2>

      <div className="flex flex-col gap-3 overflow-y-auto pr-2 custom-scrollbar flex-1 pb-4">
        {certificates.map((cert, index) => {
          const isActive = activeCert.id === cert.id;
          const dexNumber = String(index + 1).padStart(3, "0"); 

          return (
            <button
              key={cert.id}
              onClick={() => onSelect(cert)}
              className={`
                group w-full text-left transition-all duration-300 ease-out flex overflow-hidden
                /* ESTILO POKÉMON MENUS: Caixa branca quando ativo, escura quando inativo */
                ${isActive 
                  ? "h-24 bg-white border-y-4 border-r-4 border-l-8 border-l-orange-500 border-y-gray-300 border-r-gray-300 shadow-md scale-[1.02] translate-x-2" 
                  : "h-14 bg-slate-800 border-2 border-slate-600 hover:border-slate-400 hover:bg-slate-700"
                }
              `}
              style={isActive ? { borderRadius: "10px 30px 10px 10px" } : { borderRadius: "10px" }}
            >
              {/* Lado Esquerdo (Número) */}
              <div className={`
                flex flex-col items-center justify-center min-w-[50px] transition-colors duration-300
                ${isActive ? "bg-orange-100 text-orange-600 border-r-2 border-gray-200" : "bg-slate-900 text-slate-500 border-r-2 border-slate-700"}
              `}>
                <span className="text-[9px] font-bold tracking-widest">Nº</span>
                <span className="font-black text-sm">{dexNumber}</span>
              </div>

              {/* Lado Direito (Info) */}
              <div className="p-3 flex-1 flex flex-col justify-center">
                
                {/* Título */}
                <h3 className={`font-bold transition-colors duration-300 leading-tight
                  ${isActive ? "text-gray-900 text-[14px] line-clamp-2" : "text-slate-300 text-xs truncate"}
                `}>
                  {cert.title}
                </h3>
                
                {/* Status (Aparece no ativo) */}
                <div className={`
                  flex items-center gap-4 uppercase tracking-wider
                  transition-all duration-300 origin-top
                  ${isActive ? "mt-2 opacity-100 max-h-10" : "mt-0 opacity-0 max-h-0 overflow-hidden"}
                `}>
                  <div className="flex flex-col bg-gray-100 px-2 py-1 rounded">
                    <span className="text-[8px] text-gray-500 font-bold">NV.</span>
                    <span className="text-gray-900 font-black text-xs">{cert.level}</span>
                  </div>
                  
                  <div className="flex flex-col bg-gray-100 px-2 py-1 rounded border-b-2" style={{ borderBottomColor: cert.color }}>
                    <span className="text-[8px] text-gray-500 font-bold">TIPO</span>
                    <span className="font-black text-xs text-gray-800">
                      {cert.type}
                    </span>
                  </div>
                </div>

              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};