import googleSheets from "../assets/skills/google-sheets.png"
import googleappscript from "../assets/skills/googleappsscript.png"
import github from "../assets/skills/github.png"
import csharp from "../assets/skills/csharp.png"
import { Code2, Database, Layers, Shield, FileCode, Palette } from "lucide-react";

export type CategoryType = "all" | "frontend" | "backend" | "tools";

export interface Skill {
  id: string;
  name: string;
  category: CategoryType[];
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
    category: ["frontend"],
    icon: Code2,
    image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    description: "Desenvolvimento de interfaces componentizadas...",
    docsUrl: "https://react.dev/",
    examineText: "React abriu as portas para eu usar minha creatividade...",
    stats: { proficiency: "Intermediário", experience: "1 Ano", projects: "5", level: 45 },
  },
  {
    id: "ts",
    name: "TypeScript",
    category: ["tools", "backend"],
    icon: Shield,
    image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    description: "Tipagem estática para robustez.",
    docsUrl: "https://www.typescriptlang.org/",
    examineText: "Tipagem estática, Depois que eu descobri nunca mais troquei....",
    stats: { proficiency: "Intermediário", experience: "1 Anos", projects: "5", level: 45 },
  },
  {
    id: "node",
    name: "Node.js",
    category: ["backend", "tools"],
    icon: Database,
    image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    description: "Javascript no backend.",
    docsUrl: "https://nodejs.org/",
    examineText: "Ainda estou em aprendizado nessa area, porém tenho uma base de conhecimento...",
    stats: { proficiency: "Junior", experience: "1 Ano", projects: "2", level: 20 },
  },
  {
    id: "tailwind",
    name: "Tailwind CSS",
    category: ["frontend"],
    icon: Layers,
    image: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
    description: "Estilização utility-first.",
    docsUrl: "https://tailwindcss.com/",
    examineText: "Simplismente a melhor ferramenta visual que eu pude conhecer, sem duvidas...",
    stats: { proficiency: "Avançado", experience: "1 Ano", projects: "5", level: 55 },
  },
  {
    id: "html",
    name: "HTML5",
    category: ["frontend"],
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
    category: ["frontend"],
    icon: Palette,
    image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
    description: "Estilos e Animações.",
    docsUrl: "https://developer.mozilla.org/",
    examineText: "Primeira ferramenta visual que eu conheci, demorou um pouco para entender, porém fazer o basico me fez ir longe...",
    stats: { proficiency: "Avançado", experience: "2 Anos", projects: "6", level: 60 },
  },
  {
    id: "javascript",
    name: "JavaScript",
    category: ["frontend", "backend"],
    icon: FileCode,
    image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    description: "Linguagem de programação da web.",
    docsUrl: "https://developer.mozilla.org/pt-BR/docs/Web/JavaScript",
    examineText: "A linguagem que dá vida à web. Com ela, criei lógicas complexas...",
    stats: { proficiency: "Intermediário", experience: "2 Anos", projects: "6", level: 60 },
  },
  {
    id: "GoogleSheets",
    name: "Google Sheets",
    category: ["tools"],
    icon: FileCode,
    image: googleSheets,
    description: "Ferramenta de planilha online.",
    docsUrl: "https://www.google.com/sheets/about/",
    examineText: "Primeira ferramenta que eu conheci, ate hoje não conheço 100%, porém usando scripts levei ao limite aonde poderia chegar...",
    stats: { proficiency: "Intermediário", experience: "1 Ano", projects: "3", level: 25 },
  },
  {
    id: "GoogleAppScript",
    name: "Google App Script",
    category: ["tools"],
    icon: FileCode,
    image: googleappscript,
    description: "Ferramenta de automação para Google Workspace.",
    docsUrl: "https://developers.google.com/apps-script/",
    examineText: "Minha primeira experiencia com codigos profissionais foi com o GoogleScripts, usei muito, criei sistemas inteligentes e interfaces para automizar tarefas de certas planilhas...",
    stats: { proficiency: "Intermediário", experience: "1 Ano", projects: "3", level: 45 },
  },
  {
    id: "ThreeJS",
    name: "Three.js",
    category: ["frontend"],
    icon: FileCode,
    image: "https://img.icons8.com/?size=100&id=j0beBVnUo5dZ&format=png&color=000000",
    description: "Biblioteca JavaScript para gráficos 3D.",
    docsUrl: "https://threejs.org/",
    examineText: "Three.js a melhor ferramenta que eu ja usei, ela e base de como esse portfolio foi criado, todo dia aprendo uma coisa nova com ela, e cada dia me surpreendo mais com o que posso criar usando essa biblioteca, sem duvidas a melhor ferramenta que eu ja usei...",
    stats: { proficiency: "Intermediário", experience: "1 Ano", projects: "1", level: 55 },
  },
  {
    id: "GitHub",
    name: "GitHub",
    category: ["tools"],
    icon: FileCode,
    image: github,
    description: "Plataforma de hospedagem de código fonte.",
    docsUrl: "https://docs.github.com/",
    examineText: "GitHub entra aqui pois demorei um pouco para entender como ele funciona, nao digo apenas para seu armazenamento de codigo, mas para o controle de versao, analises, branchs, pulls e requests, compartilhamento de projetos, sem duvidas uma ferramenta essencial para qualquer desenvolvedor...",
    stats: { proficiency: "Intermediário", experience: "1 Ano", projects: "1", level: 55 },
  },
  {
    id: "C#",
    name: "C#",
    category: ["backend"],
    icon: FileCode,
    image: csharp,
    description: "Linguagem de programação orientada a objetos.",
    docsUrl: "https://docs.microsoft.com/pt-br/dotnet/csharp/",
    examineText: "Apenas coloquei aqui pois tenho conhecimento basico, usei para fazer fisicas de objetos para um projeto de um amigo....",
    stats: { proficiency: "Novato", experience: "sem experiencia profissional", projects: "1", level: 10 },
  },
];