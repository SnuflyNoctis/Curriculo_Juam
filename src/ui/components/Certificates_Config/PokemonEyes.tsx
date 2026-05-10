import React, { useState, useEffect } from "react";

// O "Banco de Dados" dos olhos lendários baseado na imagem!
const EYE_VARIANTS = [
  {
    name: "Giratina",
    sclera: "bg-red-600",
    pupil: "w-1 h-6 sm:h-8 bg-black rounded-full", // Fenda
    shadow: "rgba(220,38,38,0.7)", // Aura Vermelha
    shapeLeft: "rounded-[100%_10px_100%_10px]",
    shapeRight: "rounded-[10px_100%_10px_100%]",
  },
  {
    name: "Dialga",
    sclera: "bg-rose-600",
    pupil: "w-1.5 h-6 sm:h-8 bg-black rounded-full", // Fenda levemente mais grossa
    shadow: "rgba(14,165,233,0.5)", // Aura Azul (Tempo)
    shapeLeft: "rounded-[100%_0px_100%_0px]", // Mais pontiagudo
    shapeRight: "rounded-[0px_100%_0px_100%]",
  },
  {
    name: "Palkia",
    sclera: "bg-pink-600",
    pupil: "w-1 h-6 sm:h-8 bg-black rounded-full",
    shadow: "rgba(217,70,239,0.5)", // Aura Magenta/Rosa (Espaço)
    shapeLeft: "rounded-[100%_15px_100%_15px]", // Mais suave
    shapeRight: "rounded-[15px_100%_15px_100%]",
  },
  {
    name: "Arceus",
    sclera: "bg-green-500", // Fundo verde da imagem
    pupil: "w-4 h-4 sm:w-5 sm:h-5 bg-red-600 rounded-full", // Pupila redonda e vermelha
    shadow: "rgba(34,197,94,0.7)", // Aura Verde/Dourada
    shapeLeft: "rounded-[100%_20px_100%_20px]", // Mais arredondado
    shapeRight: "rounded-[20px_100%_20px_100%]",
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
      // Duração de vida desse olho na tela (entre 3s e 6s)
      const lifeTime = Math.random() * 3000 + 3000;

      const newEye: ActiveEye = {
        id: Math.random().toString(36).substring(7),
        variant: EYE_VARIANTS[Math.floor(Math.random() * EYE_VARIANTS.length)],
        x: Math.floor(Math.random() * 80) + 10, // Posição horizontal (10% a 90%)
        y: Math.floor(Math.random() * 80) + 10, // Posição vertical (10% a 90%)
        scale: (Math.random() * 0.5 + 0.6).toFixed(2), // Tamanho aleatório
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
            animationDuration: `${eye.duration}ms`, // A mágica que sincroniza o CSS com o JS!
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
