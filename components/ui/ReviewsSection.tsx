"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { cn } from "@/lib/utils";

const reviews = [
  { name: "Sophie M.", role: "Chef d'entreprise", content: "Un accompagnement exceptionnel pour la mise en place de ma holding.", rating: 5 },
  { name: "Marc D.", role: "Investisseur Immo", content: "Grâce à Paul Forbe, j'ai pu optimiser mon patrimoine immobilier.", rating: 5 },
  { name: "Yasmine B.", role: "Cadre Supérieur", content: "Une écoute attentive et des solutions parfaitement adaptées à ma situation familiale.", rating: 4 },
  { name: "Thomas L.", role: "Jeune Actif", content: "Très satisfait du courtage pour mon premier achat. Taux excellent !", rating: 5 },
  { name: "Fatima Z.", role: "Profession Libérale", content: "La prévoyance mise en place me rassure au quotidien. Merci pour tout.", rating: 5 },
  { name: "Jean-Pierre C.", role: "Retraité", content: "Conseils avisés pour ma succession. Je recommande vivement.", rating: 4 },
  { name: "Kevin S.", role: "Entrepreneur", content: "Vision globale et moderne. Ça change des banques traditionnelles.", rating: 5 },
  { name: "Inès A.", role: "Médecin", content: "Une expertise pointue sur la fiscalité des revenus libéraux.", rating: 5 },
  { name: "Lucas et Marie", role: "Couple", content: "Un grand merci pour l'accompagnement sur notre projet de vie.", rating: 4 },
  { name: "Wei Chen", role: "Expatrié", content: "Excellent service pour gérer mon patrimoine à distance.", rating: 5 },
  { name: "Djamel K.", role: "Artisan", content: "Simple, clair et efficace. Je sais enfin où va mon argent.", rating: 4 },
  { name: "Elena R.", role: "Architecte", content: "Des solutions créatives pour mes investissements. Top !", rating: 5 },
  { name: "Mamadou T.", role: "Ingénieur", content: "Approche très professionnelle et transparente des frais.", rating: 4 },
  { name: "Sarah J.", role: "Avocate", content: "Rigueur et confidentialité. C'est ce que je cherchais.", rating: 5 },
  { name: "Nicolas P.", role: "Fonctionnaire", content: "Des conseils pertinents même pour les budgets modestes, mais parfois difficile à joindre.", rating: 3 },
  { name: "Pedro G.", role: "Restaurateur", content: "Optimisation fiscale au top. J'ai pu réinvestir dans mon affaire.", rating: 5 },
  { name: "Julie M.", role: "Graphiste", content: "Enfin des explications claires sur la bourse et les placements.", rating: 4 },
  { name: "Ahmed F.", role: "Pharmacien", content: "Un audit patrimonial complet qui a tout changé.", rating: 5 }
];

export const ReviewsSection = () => {
    return (
      <section className="py-24 bg-slate-50 relative overflow-hidden">
        <div className="container mx-auto px-6 text-center mb-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-rothschild mb-6">
              Ce que disent <span className="text-transparent bg-clip-text bg-gradient-to-r from-rothschild to-yellow-500">nos clients</span>
            </h2>
            <div className="w-24 h-1 bg-rothschild/20 mx-auto rounded-full mb-8" />
             <div className="inline-flex items-center gap-2 px-6 py-2 bg-white shadow-sm text-green-700 rounded-full text-sm font-bold border border-green-100">
                <Star className="fill-green-700 text-green-700" size={16} /> 
                4.8/5 sur plus de 150 avis
             </div>
          </motion.div>
        </div>

        <div className="space-y-8">
            {/* First Marquee Row (Left to Right) */}
            <div className="relative flex overflow-x-hidden group">
                <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-slate-50 to-transparent z-10" />
                <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-slate-50 to-transparent z-10" />
                
                <div className="animate-marquee flex gap-6 items-center px-4">
                    {[...reviews, ...reviews].slice(0, 20).map((review, i) => (
                        <ReviewCard key={i} review={review} />
                    ))}
                </div>
                <div className="absolute top-0 animate-marquee2 flex gap-6 items-center px-4">
                    {[...reviews, ...reviews].slice(0, 20).map((review, i) => (
                        <ReviewCard key={i} review={review} />
                    ))}
                </div>
            </div>

            {/* Second Marquee Row (Right to Left) */}
            <div className="relative flex overflow-x-hidden group">
                <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-slate-50 to-transparent z-10" />
                <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-slate-50 to-transparent z-10" />

                <div className="animate-marquee flex gap-6 items-center px-4" style={{ animationDuration: '60s', animationDirection: 'reverse' }}>
                    {[...reviews, ...reviews].slice(10, 30).map((review, i) => (
                        <ReviewCard key={i} review={review} />
                    ))}
                </div>
            </div>
        </div>
      </section>
    );
};

const ReviewCard = ({ review }: { review: { name: string; role: string; content: string; rating: number } }) => (
    <div className="flex-shrink-0 w-[280px] md:w-[350px] bg-white p-6 rounded-2xl shadow-sm border border-slate-100 relative group hover:-translate-y-1 transition-transform duration-300">
        <Quote className="absolute top-4 right-4 text-slate-100 w-8 h-8 group-hover:text-rothschild/10 transition-colors" />
        <div className="flex gap-1 mb-3">
            {[...Array(5)].map((_, i) => (
                <Star 
                    key={i} 
                    size={14} 
                    className={cn( i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-200 fill-gray-200")} 
                />
            ))}
        </div>
        <p className="text-gray-600 text-sm italic mb-4 line-clamp-3">
            &quot;{review.content}&quot;
        </p>
        <div>
            <h4 className="font-bold text-rothschild text-sm">{review.name}</h4>
            <p className="text-xs text-gray-400">{review.role}</p>
        </div>
    </div>
);
