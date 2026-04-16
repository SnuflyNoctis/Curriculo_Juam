import * as React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Linkedin, Github, Send, Copy, Check, Key } from "lucide-react";

import { KingdomMenu } from "../components/KingdomMenu";
import { DiveToTheHeartBackground } from "../components/DiveToTheHeartBackground";

// Importando a Única Fonte da Verdade!
import { profileData } from "../../data/profileData";

export const KingdomHeartsContact = () => {
  const [formStep, setFormStep] = useState(0);
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const copyEmail = () => {
    // Puxando o email dinamicamente
    navigator.clipboard.writeText(profileData.contact.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSent(true);
    }, 1500);
  };

  return (
    <div className="relative w-full min-h-screen bg-[#020014] text-white font-sans overflow-hidden flex flex-col items-center justify-start pt-28 md:pt-36 selection:bg-blue-500 selection:text-white">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#240b6b_0%,_#0c0536_40%,_#020014_80%)] opacity-80" />
        <DiveToTheHeartBackground />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_10%,_#020014_100%)] pointer-events-none z-20" />
      </div>

      <div className="relative z-30 w-full max-w-6xl p-6 grid md:grid-cols-2 gap-12 items-center">
        {/* LADO ESQUERDO: FORMULÁRIO (Igual ao anterior) */}
        <div className="order-2 md:order-1">
          {!isSent ? (
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="relative"
            >
              <div className="bg-gradient-to-b from-[#1a1a2e]/90 to-black/90 border-2 border-blue-400/30 rounded-xl p-[2px] shadow-[0_0_30px_rgba(0,100,255,0.3)] overflow-hidden backdrop-blur-sm">
                <div className="bg-black/50 rounded-lg p-6 md:p-8 space-y-6 relative overflow-hidden">
                  <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.4)_50%)] bg-[length:100%_4px] pointer-events-none opacity-50" />

                  <div className="flex items-center gap-3 mb-4 relative z-10">
                    <Key
                      className="text-yellow-400 rotate-45 drop-shadow-[0_0_10px_#ffd700]"
                      size={24}
                    />
                    <h2 className="text-2xl font-bold tracking-wide uppercase text-shadow-sm font-serif">
                      Entre em contato
                    </h2>
                  </div>

                  <form
                    onSubmit={handleSubmit}
                    className="space-y-5 relative z-10"
                  >
                    <div className="space-y-1 group relative">
                      <label className="text-xs uppercase tracking-widest text-blue-300 ml-1 group-focus-within:text-white transition-colors font-bold group-focus-within:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]">
                        Seu Nome
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full bg-blue-950/30 border-b-2 border-blue-500/30 px-4 py-3 focus:outline-none focus:border-transparent focus-bg-blue-900/40 transition-all rounded-t-sm text-lg text-white placeholder-blue-300/30"
                        placeholder="Sora...."
                        onFocus={() => setFormStep(0)}
                      />
                      {/*OathKeeper beam of light */}
                      <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-white via-yellow-100 to-transparent group-focus-within:transition-all duration-500 ease-out shadow-[0_0_15px_rgba(255,255,255,0.9)]" />
                      {/* OathKeeper star of light */}
                      <div className="absolute right-4 bottom-4 opacity-0 group-focus-within:opacity-100 transition-opacity duration-700 delay-200">
                        <div className="w-1.5 h-1.5 rotate-45 bg-white shadow-[0_0_10px_3px_rgba(253,224,71,0.6)]" />
                      </div>
                    </div>

                    {/* Input Email */}
                    <div className="space-y-1 group relative">
                      <label className="text-xs uppercase tracking-widest text-blue-300 ml-1 group-focus-within:text-white transition-colors font-bold group-focus-within:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]">
                        Seu Email
                      </label>
                      <input
                        type="email"
                        required
                        className="w-full bg-blue-950/30 border-b-2 border-blue-500/30 px-4 py-3 focus:outline-none focus:border-transparent focus:bg-blue-900/40 transition-all rounded-t-sm text-lg text-white placeholder-blue-300/30"
                        placeholder="kingdom@hearts.com"
                        onFocus={() => setFormStep(1)}
                      />
                      {/* OathKeeper beam of ligh */}
                      <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-white via-yellow-100 to-transparent group-focus-within:w-full transition-all duration-500 ease-out shadow-[0_0_15px_rgba(255,255,255,0.9)]" />
                      {/* OathKeeper star of light */}
                      <div className="absolute right-4 bottom-4 opacity-0 group-focus-within:opacity-100 transition-opacity duration-700 delay-200">
                        <div className="w-1.5 h-1.5 rotate-45 bg-white shadow-[0_0_10px_3px_rgba(253,224,71,0.6)]" />
                      </div>
                    </div>

                    {/* Input Message */}
                    <div className="space-y-1 group relative">
                      <label className="text-xs uppercase tracking-widest text-blue-300 ml-1 group-focus-within:text-white transition-colors font-bold group-focus-within:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]">
                        Mensagem
                      </label>
                      <textarea
                        rows={4}
                        required
                        className="w-full bg-blue-950/30 border-b-2 border-blue-500/30 px-4 py-3 focus:outline-none focus:border-transparent focus:bg-blue-900/40 transition-all rounded-t-sm text-lg text-white placeholder-blue-300/30 resize-none"
                        placeholder="Let's connect worlds..."
                        onFocus={() => setFormStep(2)}
                      />
                      {/* OATHKEEPER: Feixe de Luz */}
                      <div className="absolute bottom-1 left-0 h-[2px] w-0 bg-gradient-to-r from-white via-yellow-100 to-transparent group-focus-within:w-full transition-all duration-500 ease-out shadow-[0_0_15px_rgba(255,255,255,0.9)]" />
                      {/* OATHKEEPER: Estrela de Luz */}
                      <div className="absolute right-4 bottom-5 opacity-0 group-focus-within:opacity-100 transition-opacity duration-700 delay-200">
                        <div className="w-1.5 h-1.5 rotate-45 bg-white shadow-[0_0_10px_3px_rgba(253,224,71,0.6)]" />
                      </div>
                    </div>
                    {/* Send Button */}
                    <motion.button
                      whileHover={{ scale: 1.02, filter: "brightness(1.2)" }}
                      whileTap={{ scale: 0.98 }}
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-500 text-black font-black uppercase tracking-widest py-4 rounded-sm flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(234,179,8,0.6)] disabled:opacity-50 disabled:cursor-not-allowed border-2 border-yellow-300"
                    >
                      {isSubmitting ? (
                        <span className="animate-pulse">Casting...</span>
                      ) : (
                        <>
                          Mandar Mensagem <Send size={20} strokeWidth={2.5} />
                        </>
                      )}
                    </motion.button>
                  </form>
                </div>
              </div>

              <motion.div
                animate={{ y: formStep * 88 + 35 }}
                className="absolute -left-8 top-20 hidden md:flex items-center justify-center z-50"
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              >
                <div className="w-4 h-4 rotate-45 bg-[#0a0a0a] border-2 border-[#8b5cf6] shadow-[0_0_15px_rgba(139,92,246,0.8)] relative flex items-center justify-center z-10">
                  <div className="w-1 h-1 bg-white rounded-full animate-pulse" />
                </div>
                <div className="w-6 h-[2px] bg-gradient-to-r from-[#8b5cf6] to-transparent shadow-[0_0_8px_rgba(139,92,246,0.6)] -ml-1" />
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-[#1a1a2e]/80 border-2 border-yellow-400/50 rounded-xl p-10 text-center space-y-6 backdrop-blur-md shadow-[0_0_50px_rgba(255,215,0,0.3)] relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,215,0,0.2)_0%,transparent_70%)] animate-pulse" />
              <div className="w-24 h-24 bg-yellow-400/20 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce relative z-10 border-2 border-yellow-400">
                <Key className="text-yellow-400 w-12 h-12 drop-shadow-[0_0_10px_#ffd700]" />
              </div>
              <h2 className="text-4xl font-bold text-white font-serif text-shadow-sm relative z-10">
                Message Sent!
              </h2>
              <p className="text-blue-200 text-lg relative z-10 font-sans">
                Our hearts are connected. I'll reply shortly.
              </p>
              <button
                onClick={() => setIsSent(false)}
                className="text-yellow-400 font-bold uppercase tracking-widest text-sm hover:underline mt-4 relative z-10"
              >
                Send another
              </button>
            </motion.div>
          )}
        </div>

        {/* --- LADO DIREITO: LINKS (PARTY MEMBERS) --- */}
        <div className="order-1 md:order-2 flex flex-col justify-center items-center md:items-start text-center md:text-left space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-2"
          >
            <h1
              className="text-5xl md:text-5xl font-bold tracking-tight text-white drop-shadow-[0_0_15px_rgba(0,100,255,0.8)]"
              style={{ fontFamily: "sans-serif" }}
            >
              Vamos Conectar
            </h1>
            <p className="text-blue-300 text-lg md:text-xl font-light tracking-widest uppercase flex items-center gap-3 justify-center md:justify-start">
              <span className="h-[2px] w-8 bg-yellow-400 inline-block"></span>
              {/* Puxando o nome e cargo dinamicamente! */}
              {profileData.personal.name} // Junior Developer
            </p>
          </motion.div>

          <div className="grid gap-5 w-full max-w-sm">
            {/* EMAIL */}
            <motion.button
              onClick={copyEmail}
              whileHover={{ scale: 1.03, x: 5 }}
              whileTap={{ scale: 0.98 }}
              className="group flex items-center gap-1 bg-gradient-to-r from-blue-900/40 to-black/40 hover:from-blue-800/60 hover:to-blue-900/40 p-4 rounded-xl border-2 border-blue-500/30 hover:border-blue-400 transition-all cursor-pointer w-full shadow-lg relative overflow-hidden"
            >
              <div className="bg-blue-500/20 p-4 rounded-full text-blue-300 group-hover:text-white group-hover:bg-blue-500 transition-colors shadow-[0_0_15px_rgba(0,100,255,0.3)] z-10">
                {copied ? (
                  <Check size={24} strokeWidth={3} />
                ) : (
                  <Mail size={24} strokeWidth={2} />
                )}
              </div>
              <div className="text-left flex-1 z-10">
                <p className="text-xs text-blue-300 uppercase tracking-widest font-bold group-hover:text-blue-100">
                  Email Address
                </p>
                {/* Email dinâmico */}
                <p className="text-lg font-bold text-white group-hover:text-blue-50 break-all font-sans">
                  {profileData.contact.email}
                </p>
              </div>
              <div className="text-blue-500/50 group-hover:text-white z-10">
                {copied ? (
                  <span className="text-xs font-black text-green-400 drop-shadow-[0_0_5px_lime]">
                    COPIED!
                  </span>
                ) : (
                  <Copy size={20} />
                )}
              </div>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-blue-400 blur-xl transition-opacity z-0" />
            </motion.button>

            {/* LINKEDIN */}
            <motion.a
              href={profileData.contact.linkedin}
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.03, x: 5 }}
              className="group flex items-center gap-4 bg-gradient-to-r from-blue-900/40 to-black/40 hover:from-[#0077b5]/40 hover:to-blue-900/40 p-4 rounded-xl border-2 border-blue-500/30 hover:border-[#0077b5] transition-all cursor-pointer w-full shadow-lg relative overflow-hidden"
            >
              <div className="bg-[#0077b5]/20 p-4 rounded-full text-[#0077b5] group-hover:text-white group-hover:bg-[#0077b5] transition-colors shadow-[0_0_15px_rgba(0,119,181,0.3)] z-10">
                <Linkedin size={24} strokeWidth={2} />
              </div>
              <div className="text-left flex-1 z-10">
                <p className="text-xs text-blue-300 uppercase tracking-widest font-bold group-hover:text-blue-100">
                  Professional Network
                </p>
                <p className="text-lg font-bold text-white group-hover:text-blue-50 font-sans">
                  LinkedIn Profile
                </p>
              </div>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-[#0077b5] blur-xl transition-opacity z-0" />
            </motion.a>

            {/* GITHUB */}
            <motion.a
              href={profileData.contact.github}
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.03, x: 5 }}
              className="group flex items-center gap-4 bg-gradient-to-r from-purple-900/40 to-black/40 hover:from-purple-800/60 hover:to-purple-900/40 p-4 rounded-xl border-2 border-purple-500/30 hover:border-purple-400 transition-all cursor-pointer w-full shadow-lg relative overflow-hidden"
            >
              <div className="bg-purple-500/20 p-4 rounded-full text-purple-400 group-hover:text-white group-hover:bg-purple-600 transition-colors shadow-[0_0_15px_rgba(168,85,247,0.3)] z-10">
                <Github size={24} strokeWidth={2} />
              </div>
              <div className="text-left flex-1 z-10">
                <p className="text-xs text-purple-300 uppercase tracking-widest font-bold group-hover:text-purple-100">
                  Code Repository
                </p>
                <p className="text-lg font-bold text-white group-hover:text-purple-50 font-sans">
                  GitHub Profile
                </p>
              </div>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-purple-400 blur-xl transition-opacity z-0" />
            </motion.a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-4 text-[10px] text-blue-300/50 font-mono uppercase tracking-widest z-30">
        World: Destiny Islands // Coordinates: contact_page // Memory:
        Chain_of_Links
      </div>

      <KingdomMenu />
    </div>
  );
};
