import React from "react";
import { motion } from "framer-motion";
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
    <div className="flex flex-col gap-3 w-full pr-2">
      {certificates.map((cert) => {
        const isActive = activeCert.id === cert.id;

        return (
          <motion.button
            key={cert.id}
            onClick={() => onSelect(cert)}
            whileHover={{ scale: 1.02, x: 8 }}
            whileTap={{ scale: 0.95 }}
            className={`relative w-full flex items-stretch rounded-xl overflow-hidden text-left transition-all duration-200 cursor-pointer shadow-sm
              ${
                isActive
                  ? "opacity-100 filter brightness-110 drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]"
                  : "opacity-70 hover:opacity-100 hover:brightness-105"
              }
            `}
          >

            <div
              className={`w-12 flex-shrink-0 flex flex-col items-center justify-center font-black ${isActive ? "bg-orange-500 text-white" : "bg-slate-700 text-slate-400"}`}
            >
              <span className="text-[10px] opacity-70">Nº</span>
              <span className="text-sm">{cert.id}</span>
            </div>

            <div className="flex-1 bg-[repeating-linear-gradient(0deg,#f8f9fa,#f8f9fa_2px,#e9ecef_2px,#e9ecef_4px)] p-3 border-y-2 border-r-2 border-slate-300 rounded-r-xl">
              <h3
                className={`font-bold font-mono text-sm mb-2 ${isActive ? "text-slate-800" : "text-slate-500"}`}
              >
                {cert.title}
              </h3>

              <div className="flex gap-2">
                <div className="bg-slate-200 text-slate-600 text-xs font-bold px-2 py-1 rounded shadow-inner">
                  <span className="opacity-50 text-[10px] mr-1">NV.</span>
                  {cert.level}
                </div>
                <div
                  className={`text-xs font-bold px-2 py-1 rounded shadow-inner ${isActive ? "bg-indigo-100 text-indigo-700 border-b-2 border-indigo-300" : "bg-slate-200 text-slate-500"}`}
                >
                  <span className="opacity-50 text-[10px] mr-1">TIPO</span>
                  {cert.type}
                </div>
              </div>
            </div>
          </motion.button>
        );
      })}
    </div>
  );
};
