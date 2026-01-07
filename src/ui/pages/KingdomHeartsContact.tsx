import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Github, Linkedin, Key, Send, Heart } from "lucide-react";

export const KingdomHeartsContact = () => {
  const [formState, setFormState] = useState({ name: "", message: "" });
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSent(true);
    // Aqui entraria a lógica real de envio (EmailJS, etc)
    setTimeout(() => setIsSent(false), 3000);
  };

  return (
    <div className="min-h-screen relative overflow-hidden font-sans flex items-center justify-center p-4">
      {/* --- BACKGROUND: TWILIGHT TOWN SUNSET --- */}
      {/* Baseado na paleta de cores da capa do KH3 */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a103c] via-[#4a1c40] to-[#fdba74] z-0" />

      {/* --- PARTÍCULAS DE CORAÇÕES (FLOATING HEARTS) --- */}
      {/* Inspirado na arte do KH2 e 3D */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-pink-300/20"
            initial={{
              y: window.innerHeight + 100,
              x: Math.random() * window.innerWidth,
              scale: Math.random() * 0.5 + 0.5,
              opacity: 0,
            }}
            animate={{
              y: -100,
              opacity: [0, 0.8, 0],
              rotate: Math.random() * 360,
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              delay: Math.random() * 10,
              ease: "linear",
            }}
          >
            <Heart fill="currentColor" size={Math.random() * 30 + 20} />
          </motion.div>
        ))}
      </div>

      {/* --- O "JIMINY'S JOURNAL" (CARTÃO DE CONTATO) --- */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 50 }}
        whileInView={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-4xl bg-black/40 backdrop-blur-md border border-white/20 rounded-xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] flex flex-col md:flex-row"
      >
        {/* Decorativo: Borda Metálica KH Style */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gray-400 to-transparent opacity-50" />
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gray-400 to-transparent opacity-50" />

        {/* LADO ESQUERDO: INFOS E SOCIAL */}
        <div className="p-8 md:w-1/2 bg-black/20 flex flex-col justify-between border-b md:border-b-0 md:border-r border-white/10">
          <div>
            <div className="flex items-center gap-2 text-yellow-400 mb-2">
              <Key className="animate-pulse" />
              <span className="tracking-[0.3em] text-xs font-bold uppercase">
                Connect Hearts
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-serif text-white mb-6 drop-shadow-lg">
              Let's Link
              <br />
              Worlds.
            </h2>
            <p className="text-gray-300 font-light leading-relaxed mb-8">
              "May your heart be your guiding key." <br />
              <br />
              Whether you need a Keyblade Master (Developer) for your party or
              just want to share some sea-salt ice cream, my inbox is open.
            </p>
          </div>

          {/* Social Summons */}
          <div className="space-y-4">
            <h3 className="text-xs uppercase tracking-widest text-gray-500">
              Summon Me via:
            </h3>
            <div className="flex gap-4">
              {[
                {
                  icon: Github,
                  label: "GitHub",
                  color: "hover:text-purple-400",
                },
                {
                  icon: Linkedin,
                  label: "LinkedIn",
                  color: "hover:text-blue-400",
                },
                { icon: Mail, label: "Email", color: "hover:text-yellow-400" },
              ].map((social, idx) => (
                <motion.a
                  key={idx}
                  href="#" // Coloque seus links reais aqui
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className={`p-3 bg-white/5 border border-white/10 rounded-full text-gray-300 transition-colors ${social.color}`}
                >
                  <social.icon size={20} />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* LADO DIREITO: FORMULÁRIO (MESSAGE IN A BOTTLE) */}
        <div className="p-8 md:w-1/2 relative">
          {/* Efeito de grade sutil no fundo */}
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5 pointer-events-none" />

          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            <div>
              <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2 ml-1">
                Character Name
              </label>
              <input
                type="text"
                placeholder="Sora..."
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-yellow-400/50 focus:bg-white/10 transition-all"
                value={formState.name}
                onChange={(e) =>
                  setFormState({ ...formState, name: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest text-gray-400 mb-2 ml-1">
                Message (Journal Entry)
              </label>
              <textarea
                rows={4}
                placeholder="Write your story here..."
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-yellow-400/50 focus:bg-white/10 transition-all resize-none"
                value={formState.message}
                onChange={(e) =>
                  setFormState({ ...formState, message: e.target.value })
                }
              />
            </div>

            <motion.button
              whileHover={{
                scale: 1.02,
                backgroundColor: "rgba(255, 255, 255, 0.1)",
              }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 bg-gradient-to-r from-yellow-600/20 to-orange-600/20 border border-yellow-500/30 text-yellow-200 font-serif tracking-widest uppercase rounded-lg flex items-center justify-center gap-2 hover:border-yellow-400 transition-all group"
            >
              {isSent ? (
                <>
                  <Heart className="text-pink-500 fill-pink-500" size={18} />{" "}
                  Sent to Light!
                </>
              ) : (
                <>
                  <Send
                    size={18}
                    className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform"
                  />{" "}
                  Send Message
                </>
              )}
            </motion.button>
          </form>
        </div>
      </motion.div>

      {/* Frase clássica no rodapé */}
      <div className="absolute bottom-4 text-[10px] text-white/30 tracking-[0.5em] font-serif">
        A SCATTERED DREAM THAT'S LIKE A FAR-OFF MEMORY...
      </div>
    </div>
  );
};
