import React, { useState, useEffect } from "react";

// O "Banco de Dados" dos olhos lendários refatorado e polido!
const EYE_VARIANTS = [
  {
    name: "Giratina",
    sclera: "bg-red-600",
    pupil: "w-1 h-6 sm:h-8 bg-black rounded-full",
    shadow: "rgba(147,51,234,0.6)",
    shapeLeft: "rounded-[100%_10px_100%_10px]",
    shapeRight: "rounded-[10px_100%_10px_100%]",
  },
  {
    name: "Dialga",
    sclera: "bg-red-500",
    pupil: "w-1.5 h-6 sm:h-8 bg-black rounded-full",
    shadow: "rgba(6,182,212,0.6)",
    shapeLeft: "rounded-[100%_0px_100%_0px]",
    shapeRight: "rounded-[0px_100%_0px_100%]",
  },
  {
    name: "Rayquaza",
    sclera: "bg-yellow-400",
    pupil: "w-1 h-7 sm:h-9 bg-black rounded-full",
    shadow: "rgba(16,185,129,0.6)",
    shapeLeft: "rounded-[100%_0px_100%_20px]",
    shapeRight: "rounded-[0px_100%_20px_100%]",
  },
  {
    name: "Kyogre",
    sclera: "bg-yellow-200",
    pupil: "w-3 h-3 sm:w-4 sm:h-4 bg-black rounded-full", // Pupila redonda de criatura marinha
    shadow: "rgba(59,130,246,0.6)", // Aura Azul (Oceano)
    shapeLeft: "rounded-[100%_25px_100%_25px]", // Formato mais suave e fluido (água)
    shapeRight: "rounded-[25px_100%_25px_100%]",
  },
  {
    name: "Groudon",
    sclera: "bg-yellow-500", // Amarelo forte/Alaranjado
    pupil: "w-2 h-6 sm:h-8 bg-black rounded-full", // Fenda grossa e pesada
    shadow: "rgba(239,68,68,0.6)", // Aura Vermelha (Magma)
    shapeLeft: "rounded-[100%_5px_100%_5px]", // Formato mais quadrado e rígido (terra)
    shapeRight: "rounded-[5px_100%_5px_100%]",
  },
];

interface ActiveEye {
  id: string;
  variant: (typeof EYE_VARIANTS)[0];
  x: number;
  y: number;
  scale: string;
  duration: number;
}

export const PokemonEyes = () => {
  const [activeEyes, setActiveEyes] = useState<ActiveEye[]>([]);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    const spawnRandomEye = () => {
      const lifeTime = Math.random() * 3000 + 3000;

      const newEye: ActiveEye = {
        id: Math.random().toString(36).substring(7),
        variant: EYE_VARIANTS[Math.floor(Math.random() * EYE_VARIANTS.length)],
        x: Math.floor(Math.random() * 80) + 10,
        y: Math.floor(Math.random() * 80) + 10,
        scale: (Math.random() * 0.5 + 0.6).toFixed(2),
        duration: lifeTime,
      };

      // Adiciona o olho na tela
      setActiveEyes((prev) => [...prev, newEye]);

      // Remove o olho exatamente quando a animação CSS terminar
      setTimeout(() => {
        setActiveEyes((prev) => prev.filter((eye) => eye.id !== newEye.id));
      }, lifeTime);

      // Agenda o próximo olho aparecer (entre 1s e 3s)
      const nextSpawn = Math.random() * 2000 + 1000;
      timeout = setTimeout(spawnRandomEye, nextSpawn);
    };

    timeout = setTimeout(spawnRandomEye, 1000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      {activeEyes.map((eye) => (
        <div
          key={eye.id}
          className="absolute flex gap-16 sm:gap-24 animate-phantom"
          style={{
            left: `${eye.x}%`,
            top: `${eye.y}%`,
            transform: `translate(-50%, -50%) scale(${eye.scale})`,
            animationDuration: `${eye.duration}ms`,
          }}
        >
          {/* Olho Esquerdo */}
          <div
            className={`relative w-16 h-8 sm:w-24 sm:h-12 bg-black overflow-hidden ${eye.variant.shapeLeft} transform -rotate-12`}
          >
            <div
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 sm:w-10 sm:h-10 ${eye.variant.sclera} rounded-full flex items-center justify-center shadow-[0_0_30px_10px_currentColor]`}
              style={{ color: eye.variant.shadow }}
            >
              <div className={eye.variant.pupil} />
            </div>
            <div className="absolute inset-0 shadow-[inset_0_0_15px_black]" />
          </div>

          {/* Olho Direito */}
          <div
            className={`relative w-16 h-8 sm:w-24 sm:h-12 bg-black overflow-hidden ${eye.variant.shapeRight} transform rotate-12`}
          >
            <div
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 sm:w-10 sm:h-10 ${eye.variant.sclera} rounded-full flex items-center justify-center shadow-[0_0_30px_10px_currentColor]`}
              style={{ color: eye.variant.shadow }}
            >
              <div className={eye.variant.pupil} />
            </div>
            <div className="absolute inset-0 shadow-[inset_0_0_15px_black]" />
          </div>
        </div>
      ))}
    </div>
  );
};
