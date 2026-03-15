"use client";

import { TrendingUp, Building2, Briefcase, ShieldCheck, Landmark, Compass, PiggyBank, ClipboardCheck } from "lucide-react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import { Partners } from "@/components/ui/Partners";
import { ScrollSpySection } from "@/components/ui/ScrollSpySection";
import { ReviewsSection } from "@/components/ui/ReviewsSection";

const ScrollVideo = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const scale = useTransform(smoothProgress, [0, 0.5], [1, 0.9]);
    const borderRadius = useTransform(smoothProgress, [0, 0.5], [0, 32]);
    
    return (
        <div ref={containerRef} className="h-[120vh] md:h-[150vh] relative">
            <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
                <motion.div 
                    style={{ scale, borderRadius }}
                    className="w-full h-full shadow-2xl relative overflow-hidden"
                >
                     <iframe 
                        width="100%" 
                        height="100%" 
                        src="https://www.youtube.com/embed/REDVbTQxMXo?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&playlist=REDVbTQxMXo&vq=hd2160" 
                        title="Paul Forbe - Paris"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        className="w-full h-full object-cover scale-[1.35] pointer-events-none"
                        style={{ border: 'none' }}
                    />
                </motion.div>
            </div>
        </div>
    );
};

export default function Home() {

  return (
    <div className="min-h-screen">
      <section className="relative pt-8 pb-8 lg:pt-12 lg:pb-8 overflow-hidden">
        <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[800px] h-[800px] bg-blue-100 rounded-full blur-3xl opacity-30 pointer-events-none" />
        <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[600px] h-[600px] bg-indigo-100 rounded-full blur-3xl opacity-30 pointer-events-none" />
        
        <div className="container mx-auto px-6 text-center mb-8 relative z-10">
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.6 }}
           >
              <h2 className="text-xs md:text-sm font-bold tracking-[0.2em] text-rothschild/60 uppercase mb-3">Conseil en gestion de patrimoine</h2>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-rothschild mb-6 leading-tight tracking-tight max-w-4xl mx-auto">
                Une équipe au coeur de votre <span className="text-transparent bg-clip-text bg-gradient-to-r from-rothschild to-blue-600">stratégie patrimoniale.</span>
              </h1>
              <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
                Notre métier de conseil en gestion de patrimoine consiste à vous accompagner pour optimiser tous les sujets qui concernent votre patrimoine : épargne, placements, investissement immobilier, impôts, retraite, prévoyance...
              </p>
            </motion.div>
         </div>

      </section>

      <ScrollVideo />


      <Partners />

      <section className="py-8 bg-slate-50 border-y border-white/50 relative overflow-hidden">
         <div className="container mx-auto px-6 relative z-10">
            <div className="grid md:grid-cols-2 gap-8 text-center mb-0">
               <div className="space-y-1">
                  <div className="text-4xl font-serif font-bold text-rothschild">2014</div>
                  <div className="text-xs font-medium text-gray-500 uppercase tracking-widest">notre année de création</div>
               </div>
               <div className="space-y-1">
                  <div className="text-4xl font-serif font-bold text-rothschild text-nowrap">+ de 2 882</div>
                  <div className="text-xs font-medium text-gray-500 uppercase tracking-widest">projets réalisés</div>
               </div>
            </div>

         </div>
      </section>

      <ScrollSpySection 
            title="Notre Expertise"
            description="Des solutions sur-mesure pour développer, optimiser et transmettre votre patrimoine avec l'accompagnement d'experts dédiés."
            items={[
                {
                    title: "Stratégie immobilier & Asset management",
                    desc: "Dans un marché immobilier de plus en plus complexe, bâtir ou optimiser un portefeuille d’actifs immobiliers requiert services sur mesure et conseils en stratégie d’investissement immobilier. Les équipes spécialisées en capital markets de Paul Forbe déploient leur savoir-faire et leur vision globale du secteur pour vous permettre de créer toute la valeur à laquelle vous aspirez.",
                    icon: Building2,
                    image: "/expertises/strategie_immo.jpg"
                },
                {
                    title: "Planification patrimoniale",
                    desc: "La planification patrimoniale est un sujet qui occupe un nombre croissant de ménages de nos jours. Et pour cause. Familles recomposées, délocalisations, diversification du patrimoine et bien d’autres raisons justifient une intervention préalable pour garantir une transmission réussie des avoirs aux prochaines générations.",
                    icon: Compass,
                    image: "/expertises/planification.jpg"
                },
                {
                    title: "Réduction d'impôt",
                    desc: "Les dispositifs de la loi française vous permettent de réduire vos impôts en investissant. Le cabinet Paul Forbe vous propose des solutions d’investissement immobilier en fonction de votre stratégie patrimoniale personnelle. Quelques exemples :",
                    list: [
                        "Défiscalisation immobilière (Lois Pinel, Malraux, Loueur en Meublé, Girardin, Monuments Historiques, Déficits Fonciers, Murs de Boutique, Viagers, etc)."
                    ],
                    icon: PiggyBank,
                    image: "/expertises/fiscalite.jpg"
                },
                {
                    title: "Stratégie d'investissement",
                    desc: "Un éventail de facteurs peut déterminer votre stratégie d’investissement personnelle. Cela comprend votre appétence aux risques et les retours que vous espérez obtenir sur vos investissements, ainsi que les actifs, régions ou secteurs qui vous intéressent. Le temps que vous pensez passer à investir devrait aussi définir votre stratégie.",
                    icon: TrendingUp,
                    image: "/expertises/strategie_invest.jpg"
                },
                {
                    title: "Audit patrimonial & Transmission",
                    desc: "Pour construire l’architecture de votre patrimoine, le cabinet Paul Forbe élabore au préalable un audit patrimonial. L’audit patrimonial est un bilan de votre patrimoine et de votre situation (situation civile et familiale, professionnelle, budgétaire, fiscale, prévoyance).",
                    icon: ClipboardCheck,
                    image: "/expertises/audit.jpg"
                }
            ]} 
      />

      <div className="w-full h-px bg-slate-200" />

      <ScrollSpySection 
            title="Secteurs d'intervention"
            description="Une expertise globale et une architecture ouverte pour répondre à l'intégralité de vos besoins patrimoniaux."
            items={[
                {
                    title: "Les placements financiers",
                    desc: "Paul Forbe est partenaire de multiples maisons de gestion que nous avons sélectionnés sur les différents marchés et qui nous permettent de vous proposer des produits totalement adaptés à vos objectifs en matière de placements financiers.",
                    icon: TrendingUp,
                    image: "/expertises/finance.jpg"
                },
                {
                    title: "Les services aux Pro",
                    desc: "Paul Forbe assiste les professionnels avec des solutions patrimoniales dédiées aux entreprises. Quelques exemples de nos interventions :",
                    list: [
                        "Garantie décennale",
                        "Assurance Responsabilité civile professionnel",
                        "Assurance Auto/Moto professionnel",
                        "Assurance Propriétaire professionnel",
                        "Epargne-Retraite (art 83, PerIN, Percoll, PerO, loi Madelin)",
                        "Complémentaire santé",
                        "Prévoyance décès, incapacité et invalidité",
                        "Garanties en cas d'arrêt d'activité (maladie, accident, faillite)."
                    ],
                    icon: Briefcase,
                    image: "/expertises/pro.jpg"
                },
                {
                    title: "Le financement",
                    desc: "L'effet de levier d'un investissement immobilier passe bien évidement par un financement parfaitement réalisé. En tant que courtier en credit Paul Forbe accompagne ses clients à chaque étape de leur financement afin qu'il soit totalement optimisé.",
                    icon: Landmark,
                    image: "/expertises/financement.jpg"
                },
                {
                    title: "L'immobilier",
                    desc: "L’immobilier est un outil fondamental de votre patrimoine car il vous fait bénéficier de l’effet de levier du crédit que ce soit pour l’immobilier de jouissance (résidence principale et résidence secondaire) ou pour l’immobilier de rendement (location). D’autant que des dispositifs de la loi française vous permettent en parallèle de réduire vos impôts en investissant. Notre Cabinet vous propose des solutions d’investissement immobilier en fonction de votre stratégie patrimoniale personnelle.",
                    icon: Building2,
                    image: "/expertises/immobilier.jpg"
                },
                {
                    title: "Les assurances",
                    desc: "Paul Forbe dispose d'une large gamme de produits d'assurances minutieusement sélectionnés parmi les meilleurs du marché afin de couvrir et prévoir tous les risques :",
                    list: [
                        "Assurance habitation",
                        "Propriétaire non-occupant",
                        "Garantie loyers impayés",
                        "Assurance emprunteur",
                        "Prévoyance décès",
                        "Mutuelle santé",
                        "Assurance Auto / Moto / Scooter"
                    ],
                    icon: ShieldCheck,
                    image: "/expertises/assurances.jpg"
                }
            ]} 
      />

      <ReviewsSection />
    </div>
  );
}
