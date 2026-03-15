"use client";
import { GlassCard } from "@/components/ui/GlassCard";
import { ContactForm } from "@/components/contact/ContactForm";

export default function Contact() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center py-20 px-6">
       <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-12 items-center">
            <div>
                <h1 className="text-5xl font-serif font-bold text-rothschild mb-6">Parlons de votre avenir.</h1>
                <p className="text-gray-600 text-lg mb-8">
                    Nos experts sont à votre disposition pour un audit confidentiel et sans engagement.
                </p>
                
                <div className="space-y-4 text-gray-600 mb-8">
                    <p><strong>Adresse :</strong> 5 parvis Alain Turing, 75013 Paris</p>
                    <p><strong>Email :</strong> contact@paulforbe.fr</p>
                </div>


                <div className="w-full h-64 rounded-3xl overflow-hidden shadow-lg border border-white/50 relative group">
                    <div className="absolute inset-0 bg-rothschild/20 pointer-events-none z-10 mix-blend-overlay" />
                    <iframe 
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2626.0401340549045!2d2.3683056769411933!3d48.83359050212002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e6718d0979873d%3A0x705f13426214300!2sSTATION%20F!5e0!3m2!1sfr!2sfr!4v1710000000000!5m2!1sfr!2sfr" 
                        width="100%" 
                        height="100%" 
                        style={{ 
                            border: 0, 
                            filter: "grayscale(100%) invert(100%) contrast(80%) sepia(20%) hue-rotate(180deg)" 
                        }} 
                        allowFullScreen 
                        loading="lazy" 
                        referrerPolicy="no-referrer-when-downgrade"
                        className="w-full h-full grayscale transition-all duration-700 hover:grayscale-0"
                        title="Station F"
                    />
                </div>
            </div>

            <GlassCard className="p-10">
                <ContactForm />
            </GlassCard>
       </div>
    </div>
  )
}

