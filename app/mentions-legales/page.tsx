import { GlassCard } from "@/components/ui/GlassCard";

export default function MentionsLegales() {
  return (
    <div className="min-h-screen py-20 px-6">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-4xl font-serif font-bold text-rothschild mb-12">Mentions Légales</h1>
        
        <GlassCard className="p-10 space-y-8 text-gray-600">
            <section>
                <h2 className="text-xl font-bold text-rothschild mb-4">1. Éditeur du site</h2>
                <p>
                    Le site <strong>Paulforbe.com</strong> est édité par la société <strong>Paulforbe</strong>, SAS au capital de 10 000 €, immatriculée au Registre du Commerce et des Sociétés de Paris.<br /><br />
                    <strong>Siège social :</strong> 5 parvis Alain Turing, 75013 Paris<br />
                    <strong>Email :</strong> contact@paulforbe.fr
                </p>
            </section>

            <section>
                <h2 className="text-xl font-bold text-rothschild mb-4">2. Hébergement</h2>
                <p>
                    Le site est hébergé par <strong>Vercel Inc.</strong><br />
                    440 N Barranca Ave #4133, Covina, CA 91723, États-Unis.
                </p>
            </section>

            <section>
                <h2 className="text-xl font-bold text-rothschild mb-4">3. Propriété Intellectuelle</h2>
                <p>
                    L&apos;ensemble de ce site relève de la législation française et internationale sur le droit d&apos;auteur et la propriété intellectuelle. Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques.
                </p>
            </section>

            <section>
                <h2 className="text-xl font-bold text-rothschild mb-4">4. Responsabilité</h2>
                <p>
                    Les informations fournies sur le site Paulforbe.com le sont à titre indicatif. L&apos;exactitude, la complétude, l&apos;actualité des informations diffusées sur le site ne sauraient être garanties.
                </p>
            </section>
        </GlassCard>
      </div>
    </div>
  );
}
