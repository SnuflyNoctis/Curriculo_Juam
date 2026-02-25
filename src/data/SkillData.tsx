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
    examineText: "O ciclo de vida, os hooks...",
    stats: { proficiency: "Sênior", experience: "4 Anos", projects: "30+", level: 95 },
  },
  {
    id: "ts",
    name: "TypeScript",
    category: "tools",
    icon: Shield,
    image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    description: "Tipagem estática para robustez.",
    docsUrl: "https://www.typescriptlang.org/",
    examineText: "Tipagem estática me salvou...",
    stats: { proficiency: "Avançado", experience: "3 Anos", projects: "All", level: 90 },
  },
  {
    id: "node",
    name: "Node.js",
    category: "backend",
    icon: Database,
    image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    description: "Javascript no backend.",
    docsUrl: "https://nodejs.org/",
    examineText: "V8 engine é vida...",
    stats: { proficiency: "Pleno", experience: "3 Anos", projects: "15+", level: 85 },
  },
  {
    id: "tailwind",
    name: "Tailwind CSS",
    category: "frontend",
    icon: Layers,
    image: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
    description: "Estilização utility-first.",
    docsUrl: "https://tailwindcss.com/",
    examineText: "Adeus nomes de classes criativos...",
    stats: { proficiency: "Especialista", experience: "3 Anos", projects: "20+", level: 98 },
  },
  {
    id: "html",
    name: "HTML5",
    category: "frontend",
    icon: FileCode,
    image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
    description: "Estrutura Semântica.",
    docsUrl: "https://developer.mozilla.org/",
    examineText: "A base de tudo...",
    stats: { proficiency: "Nativo", experience: "5 Anos", projects: "∞", level: 100 },
  },
  {
    id: "css",
    name: "CSS3",
    category: "frontend",
    icon: Palette,
    image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
    description: "Estilos e Animações.",
    docsUrl: "https://developer.mozilla.org/",
    examineText: "Flexbox e Grid são superpoderes...",
    stats: { proficiency: "Avançado", experience: "5 Anos", projects: "∞", level: 90 },
  },
];