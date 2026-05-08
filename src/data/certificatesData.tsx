export interface Certificate {
  id: string;
  title: string;
  type: string; // Ex: "React", "Front-end", "UX/UI"
  level: number;
  duration: string;
  description: string;
  image: string; // Caminho do PNG para o 3D
  pdfLink: string; // Link para baixar/ver original
  color: string; // Cor do neon holográfico
}

export const certificatesData: Certificate[] = [
  {
    id: "cert-01",
    title: "React.js & TypeScript Avançado",
    type: "Front-end",
    level: 42,
    duration: "60h",
    description: "Análise concluída. Sujeito demonstra alta proficiência na criação de interfaces reativas e tipagem estática.",
    image: "/assets/cert-react.png", // Coloque uma imagem provisória na pasta public
    pdfLink: "#",
    color: "#4ea6ff", // Azul ciano
  },
  {
    id: "cert-02",
    title: "Three.js e WebGL",
    type: "3D Web",
    level: 35,
    duration: "40h",
    description: "Detectada habilidade de manipulação de vértices e materiais. Renderização de hologramas operante.",
    image: "/assets/cert-threejs.png",
    pdfLink: "#",
    color: "#ff6ec7", // Rosa neon
  },
  // Pode adicionar mais depois!
];