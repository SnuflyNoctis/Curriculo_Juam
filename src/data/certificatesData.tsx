import certNuvem from "../assets/Certificados/certNuvem.jpg";

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
    id: "003",
    title: "Computação em Nuvem",
    level: 6,
    type: "CLOUD",
    description:
      "Treinamento focado nos fundamentos de Computação em Nuvem, realizado pela plataforma Saber Virtual do CIEE.",
    image: certNuvem,
    duration: "6 horas", // O tempo de duração que vai aparecer na tela
    pdfLink:
      "https://sabervirtual.ciee.org.br/certificates/index.php?id=80997&user_id=80914", // O link do seu PDF (peguei do seu print!)
    color: "#8b5cf6", // A cor de destaque do certificado (coloquei um roxo/violeta para combinar com a logo da Saber Virtual, mas você pode mudar pro formato que estiver usando nos outros!)
  },
  // adicionar mais depois!
];
