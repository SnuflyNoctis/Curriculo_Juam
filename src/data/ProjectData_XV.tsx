import { Monitor, Database } from "lucide-react";

export const projectData = [
  {
    id: 1,
    title: "Magitek E-Commerce",
    category: "Fullstack Web",
    typeIcon: <Monitor size={16} />,
    tech: ["React", "Node.js", "Stripe", "PostgreSQL"],
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1000",
    description: {
      challenge: "Criar uma plataforma de vendas B2C escalável para alta demanda de tráfego.",
      solution: "Desenvolvi uma arquitetura baseada em microsserviços com React e Node.js. Implementei gateway de pagamento Stripe reduzindo o tempo de checkout em 40%."
    },
    links: { github: "#", live: "#" }
  },

  {
    id: 3,
    title: "Crystal Dashboard",
    category: "SaaS / Admin",
    typeIcon: <Database size={16} />,
    tech: ["Next.js", "Tailwind", "Recharts"],
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1000",
    description: {
      challenge: "Visualizar grandes volumes de dados financeiros de forma intuitiva.",
      solution: "Dashboard administrativo com gráficos interativos e Dark Mode nativo. Melhorou a tomada de decisão dos gestores com relatórios gerados 10x mais rápido."
    },
    links: { github: "#", live: "#" }
  }
];