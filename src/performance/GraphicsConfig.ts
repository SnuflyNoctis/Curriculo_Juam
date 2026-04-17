const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

export const GraphicsConfig = {
  dpr: isMobile ? 1 : [1, 1.5],

  particles: {
    zelda: {
      blue: isMobile ? 20 : 80,
      gold: isMobile ? 15 : 40,
      stars: isMobile ? 10 : 30,
    },
    kingdomHearts: {
      blue: isMobile ? 15 : 40,
      pink: isMobile ? 10 : 30,
      gold: isMobile ? 10 : 20,
      stars: isMobile ? 15 : 40,
    },
    FinaFantasy: {
      cyan: isMobile ? 25 : 50,
      lightCyan: isMobile ? 25 : 50,
      blue: isMobile ? 50 : 100,
    },
  },

  enable3D: true,
};
