import React from "react";
import { motion } from "framer-motion";

import giratinaSprite from "../../../assets/Pokemons/Giratina.png";

const POKEMON_TEAM = [
  {
    name: "Giratina",
    level: 100,
    currentHp: 402,
    maxHp: 402,
    sprite: giratinaSprite,
  },
  // Pode colocar os outros 5 aqui depois!
];

export const PokemonParty = () => {
  return (
    <div className="w-72 flex flex-col gap-5">
      {POKEMON_TEAM.map((pkmn, i) => (
        <motion.div
          key={pkmn.name}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 * i, type: "spring", stiffness: 100 }}
          className="relative flex items-center bg-gradient-to-b from-[#f8f8f8] to-[#d8d8d8] border-[3px] border-[#a8a8a8] rounded-xl p-2 pr-3 shadow-[4px_4px_0px_rgba(0,0,0,0.4)] h-20 group hover:scale-105 transition-transform cursor-pointer"
        >
          <div className="absolute inset-0 border-2 border-white rounded-lg pointer-events-none" />

          <div className="absolute inset-0 bg-yellow-400 opacity-0 group-hover:opacity-25 transition-opacity rounded-lg pointer-events-none" />

          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none overflow-hidden rounded-lg">
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/50 to-transparent animate-shimmer" />
          </div>

          <div className="absolute inset-0 bg-purple-400 opacity-0 group-hover:opacity-30 transition-opacity rounded-lg pointer-events-none mix-blend-overlay" />

          <div className="absolute -left-10 bottom-1 w-24 h-24 flex-shrink-0 drop-shadow-[2px_2px_0px_rgba(0,0,0,0.5)] z-10">
            <img 
              src={pkmn.sprite} 
              alt={pkmn.name} 
              className="w-full h-full object-contain animate-[bounce_2s_ease-in-out_infinite] group-hover:animate-none group-hover:scale-110 transition-transform" 
              style={{ imageRendering: "pixelated" }} 
            />
          </div>

          <div className="ml-12 flex-1 flex flex-col justify-center relative z-10">
            <div className="flex justify-between items-end mb-1">
              <span className="text-slate-800 font-bold text-base drop-shadow-[1px_1px_0px_white] leading-none">
                {pkmn.name}
              </span>
              <span className="text-slate-800 font-bold text-xs drop-shadow-[1px_1px_0px_white]">
                <span className="text-[9px]">Lv</span>
                {pkmn.level}
              </span>
            </div>

            <div className="flex items-center gap-1.5 bg-slate-800/10 p-1 rounded shadow-inner">
              <span className="bg-gradient-to-b from-[#f8d048] to-[#d0a028] text-slate-900 text-[8px] font-black px-1 rounded shadow-[inset_1px_1px_0px_rgba(255,255,255,0.8)] border border-[#a88020]">
                HP
              </span>
              <div className="flex-1 h-2.5 bg-slate-700 rounded-full border border-slate-300 shadow-[inset_0_1px_2px_rgba(0,0,0,0.8)] overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(pkmn.currentHp / pkmn.maxHp) * 100}%` }}
                  transition={{ duration: 1.5, delay: 0.5 }}
                  className="h-full bg-gradient-to-b from-[#68e068] to-[#40b040]"
                />
              </div>
            </div>

            <div className="text-[10px] text-slate-800 font-bold text-right drop-shadow-[1px_1px_0px_white] mt-0.5 font-mono">
              {pkmn.currentHp} / {pkmn.maxHp}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
