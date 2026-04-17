import { Code2, Database, Layers, Shield, FileCode, Palette } from "lucide-react";

export type CategoryType = "all" | "frontend" | "backend" | "tools";

export interface Skill {
  id: string;
  name: string;
  category: CategoryType;
  icon: React.ElementType;
  image?: string;
  description: string;
  docsUrl: string;
  examineText: string;
  stats: {
    proficiency: string;
    experience: string;
    projects: string;
    level: number;
  };
}

export const skillsData: Skill[] = [
  {
    id: "react",
    name: "React.js",
    category: "frontend",
    icon: Code2,
    image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    description: "Desenvolvimento de interfaces componentizadas...",
    docsUrl: "https://react.dev/",
    examineText: "React abriu as portas para eu usar minha creatividade...",
    stats: { proficiency: "Junior", experience: "1 Ano", projects: "5", level: 45 },
  },
  {
    id: "ts",
    name: "TypeScript",
    category: "tools",
    icon: Shield,
    image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    description: "Tipagem estática para robustez.",
    docsUrl: "https://www.typescriptlang.org/",
    examineText: "Tipagem estática, Depois que eu descobri nunca mais troquei....",
    stats: { proficiency: "Junior", experience: "1 Anos", projects: "5", level: 45 },
  },
  {
    id: "node",
    name: "Node.js",
    category: "backend",
    icon: Database,
    image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    description: "Javascript no backend.",
    docsUrl: "https://nodejs.org/",
    examineText: "Valor a ser investido na minha carreira...",
    stats: { proficiency: "Junior", experience: "1 Ano", projects: "2", level: 20 },
  },
  {
    id: "tailwind",
    name: "Tailwind CSS",
    category: "frontend",
    icon: Layers,
    image: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
    description: "Estilização utility-first.",
    docsUrl: "https://tailwindcss.com/",
    examineText: "Simplismente a melhor ferramenta que eu pude conhecer, sem duvidas...",
    stats: { proficiency: "Avançado", experience: "1 Ano", projects: "5", level: 55 },
  },
  {
    id: "html",
    name: "HTML5",
    category: "frontend",
    icon: FileCode,
    image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
    description: "Estrutura Semântica.",
    docsUrl: "https://developer.mozilla.org/",
    examineText: "Uma base bem estruturada, leva a criar uma arquitetura robusta...",
    stats: { proficiency: "Nativo", experience: "2 Anos", projects: "6", level: 60 },
  },
  {
    id: "css",
    name: "CSS3",
    category: "frontend",
    icon: Palette,
    image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
    description: "Estilos e Animações.",
    docsUrl: "https://developer.mozilla.org/",
    examineText: "Primeira ferramenta que eu pude conhecer, demorou um pouco mas fazer o basico me fez ir longe...",
    stats: { proficiency: "Avançado", experience: "2 Anos", projects: "6", level: 60 },
  },
];