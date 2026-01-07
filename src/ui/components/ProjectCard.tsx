import { motion } from "framer-motion";

export const ProjectCard = ({
  title,
  desc,
}: {
  title: string;
  desc: string;
}) => {
  return (
    <motion.div
      className="w-full max-w-sm rounded-xl overflow-hidden relative group cursor-pointer"
      whileHover={{
        y: -10,
        boxShadow: "0px 0px 20px 5px rgba(0, 116, 228, 0.6)", // Efeito Neon Azul RL
      }}
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
    >
      {/* Background futurista */}
      <div className="absolute inset-0 bg-gradient-to-br from-rl-blue to-black group-hover:from-rl-orange transition-colors duration-500" />

      <div className="relative p-6 z-10 h-full flex flex-col justify-between backdrop-blur-sm bg-black/30 border border-white/10">
        <div>
          <h3 className="text-2xl font-black italic text-white uppercase transform -skew-x-12 mb-2">
            {title}
          </h3>
          <p className="text-gray-200 text-sm">{desc}</p>
        </div>

        <div className="mt-4 flex gap-2">
          <span className="px-2 py-1 bg-white/20 rounded text-xs text-white font-bold">
            REACT
          </span>
          <span className="px-2 py-1 bg-rl-boost/80 rounded text-xs text-black font-bold">
            TURBO
          </span>
        </div>
      </div>

      {/* Efeito de rastro/boost ao passar o mouse */}
      <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-rl-boost blur-3xl opacity-0 group-hover:opacity-50 transition-opacity" />
    </motion.div>
  );
};
