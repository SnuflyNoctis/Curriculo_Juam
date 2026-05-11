import React from "react";
import { motion } from "framer-motion";
import { Certificate } from "../../../data/certificatesData";

interface CertificateDetailsProps {
  activeCert: Certificate;
}

export const CertificateDetails: React.FC<CertificateDetailsProps> = ({
  activeCert,
}) => {
  return (
    <div className="w-full h-full flex flex-col justify-between bg-[#f8f8f8] border-[3px] border-[#4b5563] rounded-xl p-4 shadow-[inset_0_-4px_0_rgba(0,0,0,0.15)] relative overflow-hidden group">
      <motion.div
        animate={{ y: [0, 5, 0] }}
        transition={{ repeat: Infinity, duration: 1 }}
        className="absolute bottom-3 right-4 text-[#ef4444] text-xl drop-shadow-md"
      >
        ▼
      </motion.div>

      <div className="flex-1">
        <motion.p
          key={activeCert.id}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-slate-800 font-mono text-sm md:text-base leading-relaxed font-bold tracking-tight"
        >
          <span className="text-red-600 mr-2 animate-pulse">▶</span>
          {activeCert.description}
        </motion.p>
      </div>

      <div className="mt-4 flex justify-end pr-8 z-10">
        {activeCert.pdfLink ? (
          <button
            onClick={() => window.open(activeCert.pdfLink, "_blanck")}
            className="bg-red-500 hover:bg-red-600 text-white font-mono font-bold text-xs py-2 px-4 rounded border-b-4 border-red-800 hover:translate-y-[2px] hover:border-b-2 active:border-b-0 active:translate-y-[4px] transtion-all flex items-center gap-2 shadow-md"
          >
            <span>[ ABRIR PDF_ ]</span>
          </button>
        ) : (
          <span className="text-slate-400 font-mono text-xs font-bold bg-slate-200 px-3 py-1 rounded border-b-2 border-slate-300">
            [ PDF NÃO DISPONÍVEL ]
          </span>
        )}
      </div>
    </div>
  );
};
