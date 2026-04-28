import fotoJuam from "../assets/images/fotoJuam.png"

export const profileData = {
  personal: {
    name: "JOÃO VICTOR",
    role: "Junior Front-end Developer", // Mantive em inglês pois é padrão de mercado, mas se quiser mudar para "Desenvolvedor Front-end Júnior", fica ótimo também!
    level: 45,
    location: "Vitória da Conquista, BA (Remoto)",
    experience: "1 ano",
    avatarUrl: fotoJuam,
    cvUrl: "/seu-curriculo.pdf",
    bio: [
      "<span class='text-[#ffd700] font-bold'>Desenvolvedor focado em performance e experiência do usuário (UX).</span> Transformo designs complexos em aplicações web robustas e interativas. Minha especialidade é criar a ponte perfeita entre um visual impactante no Front-end e uma integração eficiente com o Back-end.",
      "Atualmente, meu foco está no ecossistema <span class='text-[#00f7ff]'>React, TypeScript e Node.js</span>. Busco oportunidades nas quais eu possa unir criatividade técnica a uma arquitetura de software limpa e escalável.",
    ],
    education: {
      status: "Graduação em andamento",
      degree: "Bacharelado em Ciência da Computação",
      semester: "5º semestre",
      graduationYear: "Previsão de conclusão: 2027",
      university: "Universidade Anhanguera",
    }
  },
  skillsSummary: {
    core: {
      title: "Core Stack",
      techs: "React • Tailwind • TypeScript",
      description: "Front-end Architecture",
    },
    backend: {
      title: "API & Integration",
      techs: "REST APIs • HTTP Protocols • Node.js",
      description: "Data Fetching & Error Handling",
    },
  },
  contact: {
    email: "joaovd.contato@gmail.com",
    linkedin: "https://www.linkedin.com/in/joão-dultra-2045b42b1?utm_source=share_via&utm_content=profile&utm_medium=member_android",
    github: "https://github.com/SnuflyNoctis",
    Whatsapp: "https://wa.me/+557799608527",
  },
};