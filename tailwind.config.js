/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // Aqui definimos as cores dos nossos "mundos"
      colors: {
        zelda: {
          gold: "#C4A948", // Dourado clássico
          green: "#1F3C28", // Verde floresta escura
          glow: "#E3F8FF", // Brilho das fadas
        },
        re4: {
          bg: "#1a1815", // Fundo do inventário
          grid: "#2b2621", // Cor da malha
          highlight: "#8c2f2f", // Vermelho sangue
        },
        ffxv: {
          dark: "#0a0a12", // Fundo quase preto azulado
          primary: "#1d4ed8", // Azul cristal (Warp)
          accent: "#7dd3fc", // Azul claro (Menu highlights)
          text: "#e2e8f0", // Branco gelo
          glass: "rgba(15, 23, 42, 0.6)", // Vidro do menu
        },
      },
      // Configuração de Fontes (Vamos importar a Cinzel jajá)
      fontFamily: {
        serif: ['"Cinzel"', "serif"], // Zelda
        mono: ['"Share Tech Mono"', "monospace"], // RE4 / Tech
        sans: ['"Montserrat"', "sans-serif"], // Geral
      },
      // Animações personalizadas
      animation: {
        shine: "shine 1s ease-in-out",
        "spin-slow": "spin 10s linear infinite",
      },
      keyframes: {
        shine: {
          "0%": { left: "-100%" },
          "100%": { left: "200%" },
        },
      },
    },
  },
  plugins: [],
};
