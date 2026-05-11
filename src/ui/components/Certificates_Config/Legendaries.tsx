import React from "react";
import { motion } from "framer-motion";

import Giratina from "../../../assets/Pokemons/Giratina.png";
import Dialga from "../../../assets/Pokemons/Dialga.png";
import Kyogre from "../../../assets/Pokemons/Kyogre.png";
import Rayquaza from "../../../assets/Pokemons/Rayquaza.png";
import Growdon from "../../../assets/Pokemons/Growdon.png";

export const Legendaries = () => {
  const legendaries = [
    // === LADO ESQUERDO ===
    {
      name: "Giratina",
      src: Giratina,
      position: "bottom-10 left-4 md:left-20",
      delay: 0,
      size: "w-32 md:w-48",
      auraColor: "rgba(147, 51, 234, 0.4)",
      hoverShadow:
        "drop-shadow(0px 0px 25px rgba(147, 51, 234, 1)) drop-shadow(0px 0px 40px rgba(0, 0, 0, 0.9))",
    },
    {
      name: "Dialga",
      src: Dialga,
      position: "top-32 left-4 md:left-24",
      delay: 2,
      size: "w-28 md:w-40",
      auraColor: "rgba(6, 182, 212, 0.4)",
      hoverShadow:
        "drop-shadow(0px 0px 20px rgba(6, 182, 212, 1)) drop-shadow(0px 0px 30px rgba(255, 255, 255, 0.6))",
    },

    // === LADO DIREITO ===
    {
      name: "Rayquaza",
      src: Rayquaza,
      position: "top-20 right-4 md:right-24",
      delay: 4,
      size: "w-32 md:w-44",
      auraColor: "rgba(16, 185, 129, 0.4)",
      hoverShadow:
        "drop-shadow(0px 0px 25px rgba(16, 185, 129, 1)) drop-shadow(0px 0px 30px rgba(209, 250, 229, 0.5))",
    },
    {
      name: "Kyogre",
      src: Kyogre,
      position: "top-1/2 -translate-y-1/2 right-10 md:right-32",
      delay: 6,
      size: "w-28 md:w-40",
      auraColor: "rgba(59, 130, 246, 0.4)",
      hoverShadow:
        "drop-shadow(0px 0px 25px rgba(59, 130, 246, 1)) drop-shadow(0px 0px 35px rgba(30, 64, 175, 0.8))",
    },
    {
      name: "Growdon",
      src: Growdon,
      position: "bottom-10 right-4 md:right-24",
      delay: 8,
      size: "w-32 md:w-44",
      auraColor: "rgba(239, 68, 68, 0.4)",
      hoverShadow:
        "drop-shadow(0px 0px 25px rgba(239, 68, 68, 1)) drop-shadow(0px 0px 35px rgba(249, 115, 22, 0.8))",
    },
  ];

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      {legendaries.map((leg) => (
        <motion.div
          key={leg.name}
          className={`absolute ${leg.position} ${leg.size} opacity-0 pointer-events-auto cursor-help group`}
          animate={{
            y: [0, -30, 0],
            opacity: [0.1, 0.6, 0.1],
            rotate: [0, 2, -2, 0],
            filter: [
              `drop-shadow(0px 0px 5px ${leg.auraColor})`,
              `drop-shadow(0px 0px 20px ${leg.auraColor})`,
              `drop-shadow(0px 0px 5px ${leg.auraColor})`,
            ],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: leg.delay,
          }}
          whileHover={{
            opacity: 1,
            scale: 1.2,
            filter: leg.hoverShadow,
            transition: { duration: 0.3 },
          }}
        >
          <div
            className="absolute inset-0 rounded-full blur-2xl opacity-0 group-hover:opacity-60 transition-opacity duration-300 pointer-events-none -z-10"
            style={{ backgroundColor: leg.auraColor.replace("0.4", "1") }}
          />

          <img
            src={leg.src}
            alt={leg.name}
            className="w-full h-full object-contain relative z-10"
            style={{ imageRendering: "pixelated" }}
          />
        </motion.div>
      ))}
    </div>
  );
};
