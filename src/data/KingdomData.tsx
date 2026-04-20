// src/data/ContactData_KH.ts

import { Mail, Linkedin, Github, MessageCircle } from "lucide-react";
import { profileData } from "./profileData"; // Ajuste o caminho se o profileData estiver em outra pasta

export const contactData = [
  {
    id: "email",
    title: "EMAIL ADDRESS",
    value: profileData.contact.email,
    icon: Mail,
    href: `mailto:${profileData.contact.email}`,
    color: "from-blue-600/20 to-cyan-500/10",
    glow: "group-hover:shadow-[0_0_30px_rgba(0,255,255,0.4)]",
    border: "group-hover:border-cyan-400"
  },
  {
    id: "whatsapp",
    title: "INSTANT MESSAGING",
    value: "WhatsApp",
    icon: MessageCircle,
    href: profileData.contact.Whatsapp,
    color: "from-green-600/20 to-emerald-500/10",
    glow: "group-hover:shadow-[0_0_30px_rgba(34,197,94,0.4)]",
    border: "group-hover:border-green-400"
  },
  {
    id: "linkedin",
    title: "PROFESSIONAL NETWORK",
    value: "LinkedIn Profile",
    icon: Linkedin,
    href: profileData.contact.linkedin,
    color: "from-blue-800/20 to-blue-500/10",
    glow: "group-hover:shadow-[0_0_30px_rgba(0,100,255,0.4)]",
    border: "group-hover:border-blue-400"
  },
  {
    id: "github",
    title: "CODE REPOSITORY",
    value: "GitHub Profile",
    icon: Github,
    href: profileData.contact.github,
    color: "from-purple-900/20 to-purple-500/10",
    glow: "group-hover:shadow-[0_0_30px_rgba(150,0,255,0.4)]",
    border: "group-hover:border-purple-400"
  }
];