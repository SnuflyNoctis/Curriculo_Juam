import googleSheets from "../assets/skills/google-sheets.png";
import googleappscript from "../assets/skills/googleappsscript.png";
import github from "../assets/skills/github.png";
import csharp from "../assets/skills/csharp.png";
import css from "../assets/skills/css.png";
import html from "../assets/skills/html.png";
import typescript from "../assets/skills/typescript.png";
import tailwindcss from "../assets/skills/tailwindcss.png";
import react from "../assets/skills/react.png";
import nodejs from "../assets/skills/nodejs.png";
import js from "../assets/skills/js.png";
 import threejs from "../assets/skills/threejs.png";

import {
  Code2,
  Database,
  Layers,
  Shield,
  FileCode,
  Palette,
} from "lucide-react";

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
    image: react,
    description: "Desenvolvimento de interfaces componentizadas.",
    docsUrl: "https://react.dev/",
    examineText:
      "O React abriu as portas para eu explorar minha criatividade na construção de interfaces interativas e dinâmicas.",
    stats: {
      proficiency: "Júnior",
      experience: "1 ano",
      projects: "5",
      level: 45,
    },
  },
  {
    id: "ts",
    name: "TypeScript",
    category: ["tools", "backend"],
    icon: Shield,
    image: typescript, // Variável local
    description: "Tipagem estática para aplicações mais seguras.",
    docsUrl: "https://www.typescriptlang.org/",
    examineText:
      "Depois que descobri o poder da tipagem estática e a prevenção de erros em tempo de desenvolvimento, nunca mais deixei de usar.",
    stats: {
      proficiency: "Júnior",
      experience: "1 ano",
      projects: "5",
      level: 45,
    },
  },
  {
    id: "node",
    name: "Node.js",
    category: ["backend", "tools"],
    icon: Database,
    image: nodejs, // Variável local
    description: "Consumo e integração de APIs REST.",
    docsUrl: "https://nodejs.org/",
    examineText:
      "Estou em constante aprendizado nesta área, possuindo uma base sólida para consumir dados, lidar com protocolos HTTP e tratar requisições.",
    stats: {
      proficiency: "Iniciante",
      experience: "1 ano",
      projects: "2",
      level: 20,
    },
  },
  {
    id: "tailwind",
    name: "Tailwind CSS",
    category: ["frontend"],
    icon: Layers,
    image: tailwindcss, // Variável local
    description: "Estilização ágil com abordagem utility-first.",
    docsUrl: "https://tailwindcss.com/",
    examineText:
      "Simplesmente a melhor ferramenta de estilização que já utilizei. Garante agilidade e consistência visual sem complicações.",
    stats: {
      proficiency: "Intermediário",
      experience: "1 ano",
      projects: "5",
      level: 55,
    },
  },
  {
    id: "html",
    name: "HTML5",
    category: ["frontend"],
    icon: FileCode,
    image: html, // Variável local
    description: "Estruturação semântica e acessibilidade.",
    docsUrl: "https://developer.mozilla.org/",
    examineText:
      "Acredito que uma base semântica e bem estruturada é o primeiro passo para criar uma arquitetura web robusta e de qualidade.",
    stats: {
      proficiency: "Júnior",
      experience: "2 anos",
      projects: "6",
      level: 60,
    },
  },
  {
    id: "css",
    name: "CSS3",
    category: ["frontend"],
    icon: Palette,
    image: css, // Variável local
    description: "Estilização avançada e animações.",
    docsUrl: "https://developer.mozilla.org/",
    examineText:
      "A primeira tecnologia visual que estudei. Entender a fundo os seus fundamentos me permitiu criar layouts complexos e animações fluidas.",
    stats: {
      proficiency: "Avançado",
      experience: "2 anos",
      projects: "6",
      level: 60,
    },
  },
  {
    id: "javascript",
    name: "JavaScript",
    category: ["frontend", "backend"],
    icon: FileCode,
    image:
      js,
    description: "Linguagem essencial para interatividade web.",
    docsUrl: "https://developer.mozilla.org/pt-BR/docs/Web/JavaScript",
    examineText:
      "A linguagem que dá vida à web. Com o JavaScript, aprendi a transformar páginas estáticas em aplicações dinâmicas com lógicas complexas.",
    stats: {
      proficiency: "Intermediário",
      experience: "2 anos",
      projects: "6",
      level: 60,
    },
  },
  {
    id: "GoogleSheets",
    name: "Google Sheets",
    category: ["tools"],
    icon: FileCode,
    image: googleSheets, // Já estava certo!
    description: "Gestão e análise de dados em planilhas.",
    docsUrl: "https://www.google.com/sheets/about/",
    examineText:
      "Uma ferramenta poderosa que explorei ao máximo. Integrando-a com scripts, consegui ultrapassar os limites básicos e criar soluções automatizadas.",
    stats: {
      proficiency: "Júnior",
      experience: "1 ano",
      projects: "3",
      level: 25,
    },
  },
  {
    id: "GoogleAppScript",
    name: "Google App Script",
    category: ["tools"],
    icon: FileCode,
    image: googleappscript, // Já estava certo!
    description: "Automação no ecossistema Google Workspace.",
    docsUrl: "https://developers.google.com/apps-script/",
    examineText:
      "Minha primeira experiência com desenvolvimento profissional. Criei sistemas inteligentes e interfaces para automatizar tarefas complexas dentro de planilhas.",
    stats: {
      proficiency: "Intermediário",
      experience: "1 ano",
      projects: "3",
      level: 45,
    },
  },
  {
    id: "ThreeJS",
    name: "Three.js",
    category: ["frontend"],
    icon: FileCode,
    image: threejs,
    description: "Criação de experiências e gráficos 3D na web.",
    docsUrl: "https://threejs.org/",
    examineText:
      "O motor por trás deste portfólio. Cada dia aprendo algo novo e me surpreendo com as infinitas possibilidades visuais e interativas que o Three.js oferece.",
    stats: {
      proficiency: "Intermediário",
      experience: "1 ano",
      projects: "1",
      level: 55,
    },
  },
  {
    id: "GitHub",
    name: "GitHub",
    category: ["tools"],
    icon: FileCode,
    image: github, // Já estava certo!
    description: "Plataforma de versionamento e colaboração.",
    docsUrl: "https://docs.github.com/",
    examineText:
      "Vai muito além da hospedagem de código. Dominar o GitHub foi essencial para entender sobre controle de versão, branches, pull requests e trabalho colaborativo.",
    stats: {
      proficiency: "Intermediário",
      experience: "1 ano",
      projects: "1",
      level: 55,
    },
  },
  {
    id: "C#",
    name: "C#",
    category: ["backend"],
    icon: FileCode,
    image: csharp, // Já estava certo!
    description: "Linguagem orientada a objetos (Ecossistema .NET).",
    docsUrl: "https://docs.microsoft.com/pt-br/dotnet/csharp/",
    examineText:
      "Tenho conhecimentos básicos que adquiri ao desenvolver a lógica de física de objetos em um projeto colaborativo na área de jogos.",
    stats: {
      proficiency: "Iniciante",
      experience: "Sem exp. profissional",
      projects: "1",
      level: 10,
    },
  },
];
