"use client";

import { motion } from "framer-motion";
import { User, Linkedin, Mail } from "lucide-react";
import Link from "next/link";

const team = [
  {
    name: "Gaëtan",
    role: "CEO & Ingénieur Patrimonial",
    bio: "Expert en stratégie patrimoniale depuis plus de 15 ans. Gaëtan accompagne les dirigeants et familles fortunées dans la structuration de leur patrimoine.",
    image: "/team/gaetan.jpg", // Placeholder path
    linkedin: "#",
    email: "contact@paulforbe.fr"
  },
  {
    name: "Mylène",
    role: "Ingénieure Patrimoniale",
    bio: "Spécialiste de la protection sociale et des assurances. Mylène veille à ce que chaque client bénéficie des meilleures couvertures du marché.",
    image: "/team/mylene.jpg", // Placeholder path
    linkedin: "#",
    email: "Myleneaffes.paulforbe@gmail.com"
  },
  {
    name: "Inès",
    role: "Ingénieure Patrimoniale",
    bio: "Passionnée par l'investissement immobilier et financier. Inès vous guide avec pédagogie pour faire fructifier votre épargne.",
    image: "/team/ines.jpg", // Placeholder path
    linkedin: "#",
    email: "Ineslaribi.paulforbe@gmail.com"
  }
];

export default function EquipePage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute top-0 right-0 translate-y-1/2 translate-x-1/4 w-[700px] h-[700px] bg-sky-100 rounded-full blur-3xl opacity-30 pointer-events-none" />
        
        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl lg:text-5xl font-serif font-bold text-rothschild mb-6">
              Une équipe <span className="text-transparent bg-clip-text bg-gradient-to-r from-rothschild to-blue-600">à vos côtés</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-10 leading-relaxed">
              Derrière Paul Forbe se cachent des experts passionnés, dédiés à la réussite de vos projets patrimoniaux.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="pb-32">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="group relative"
              >
                <div className="aspect-[3/4] overflow-hidden rounded-2xl bg-gray-200 relative mb-6 shadow-lg">
                   {/* Placeholder if image fails or is missing, using a cool gradient or icon */}
                   <div className="absolute inset-0 bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center text-slate-400">
                        <User size={64} strokeWidth={1} />
                   </div>
                   
                   {/* In a real scenario, use Image component. For now, keeping the structure ready. */}
                   {/* <Image src={member.image} alt={member.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" /> */}
                   
                   <div className="absolute inset-0 bg-gradient-to-t from-rothschild/90 via-rothschild/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                        <div className="flex gap-4 justify-center translate-y-4 group-hover:translate-y-0 transition-transform duration-300 text-white">
                            <Link href={member.linkedin} className="p-2 hover:bg-white/20 rounded-full transition-colors"><Linkedin size={20} /></Link>
                            <Link href={`mailto:${member.email}`} className="p-2 hover:bg-white/20 rounded-full transition-colors"><Mail size={20} /></Link>
                        </div>
                   </div>
                </div>

                <div className="text-center">
                    <h3 className="text-2xl font-serif font-bold text-rothschild mb-1">{member.name}</h3>
                    <p className="text-blue-600 font-medium text-sm tracking-wide uppercase mb-4">{member.role}</p>
                    <p className="text-gray-500 leading-relaxed text-sm px-4">
                        {member.bio}
                    </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
