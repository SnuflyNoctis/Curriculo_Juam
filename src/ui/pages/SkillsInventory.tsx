import React from "react";
import { motion } from "framer-motion";
import { useSoundEffect } from "../../infrastructure/audio/useSoundEffect";

interface SkillItem {
  id: string;
  name: string;
  slots: number; // Tamanho que ocupa (ex: 2 para React, 1 para CSS)
  icon: string; // Emoji ou Lucide Icon
  color: string;
}

const skills: SkillItem[] = [
  { id: "1", name: "React", slots: 2, icon: "⚛️", color: "bg-blue-500/50" },
  {
    id: "2",
    name: "TypeScript",
    slots: 1,
    icon: "TS",
    color: "bg-blue-700/50",
  },
  { id: "3", name: "Tailwind", slots: 1, icon: "🌊", color: "bg-cyan-400/50" },
  { id: "4", name: "Node.js", slots: 2, icon: "🟩", color: "bg-green-600/50" },
];

export const SkillsInventory = () => {
  const { play } = useSoundEffect();

  return (
    <div className="bg-re4-bg p-8 min-h-screen flex flex-col items-center justify-center font-mono text-white">
      <h2 className="text-3xl mb-6 text-re4-highlight uppercase tracking-widest border-b-2 border-re4-highlight">
        Equipment (Skills)
      </h2>

      {/* O Grid do RE4 */}
      <div className="bg-re4-grid p-2 border-4 border-gray-600 shadow-2xl relative">
        <div className="grid grid-cols-4 gap-1 w-[320px]">
          {skills.map((skill) => (
            <motion.div
              key={skill.id}
              layoutId={skill.id}
              className={`${skill.color} col-span-${skill.slots} h-20 border border-white/20 
                         flex items-center justify-center cursor-pointer relative group overflow-hidden`}
              whileHover={{ scale: 1.05, zIndex: 10 }}
              onHoverStart={() => play("hover")}
              onClick={() => play("equip")}
            >
              <span className="text-2xl drop-shadow-lg">{skill.icon}</span>

              {/* Tooltip estilo RE4 */}
              <div className="absolute bottom-0 left-0 right-0 bg-black/80 text-xs p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                {skill.name}
              </div>
            </motion.div>
          ))}
          {/* Slots Vazios para preencher o grid visualmente */}
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="h-20 bg-re4-item/30 border border-white/5"
            />
          ))}
        </div>

        {/* Status Lateral estilo RPG */}
        <div className="absolute -right-32 top-0 w-28 text-xs text-gray-400">
          <p>HP: 100%</p>
          <p>XP: Lvl 25</p>
          <p>STR: High</p>
        </div>
      </div>
    </div>
  );
};
