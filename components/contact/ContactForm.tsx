"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Loader2, CheckCircle, AlertCircle } from "lucide-react";

export const ContactForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setStatus("idle");
        setErrorMessage("");

        const form = e.currentTarget;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.error || "Une erreur est survenue");
            }

            setStatus("success");
            form.reset();
        } catch (error) {
            setStatus("error");
            if (error instanceof Error) {
                 setErrorMessage(error.message);
            } else {
                 setErrorMessage("Erreur de connexion");
            }
        } finally {
            setIsLoading(false);
        }
    };

    if (status === "success") {
        return (
            <div className="h-full flex flex-col items-center justify-center text-center p-10 animate-in fade-in zoom-in duration-500">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle size={32} />
                </div>
                <h3 className="text-2xl font-serif font-bold text-rothschild mb-2">Message envoyé !</h3>
                <p className="text-gray-600 mb-8">
                    Nous avons bien reçu votre demande. Nos experts vous répondront dans les plus brefs délais.
                </p>
                <Button onClick={() => setStatus("idle")} variant="outline">
                    Envoyer un autre message
                </Button>
            </div>
        );
    }

    return (
        <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Honeypot field - hidden from users */}
            <input type="text" name="honeypot" className="hidden" tabIndex={-1} autoComplete="off" />

            <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-600">Prénom *</label>
                    <input 
                        name="firstName" 
                        type="text" 
                        required 
                        minLength={2}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-rothschild focus:ring-1 focus:ring-rothschild outline-none transition-all placeholder:text-gray-400" 
                        placeholder="John"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-600">Nom *</label>
                    <input 
                        name="lastName" 
                        type="text" 
                        required 
                        minLength={2}
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-rothschild focus:ring-1 focus:ring-rothschild outline-none transition-all placeholder:text-gray-400" 
                        placeholder="Doe"
                    />
                </div>
            </div>
            
            <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-600">Email *</label>
                <input 
                    name="email" 
                    type="email" 
                    required 
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-rothschild focus:ring-1 focus:ring-rothschild outline-none transition-all placeholder:text-gray-400" 
                    placeholder="john.doe@exemple.com"
                />
            </div>
            
            <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-600">Téléphone</label>
                <input 
                    name="phone" 
                    type="tel" 
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-rothschild focus:ring-1 focus:ring-rothschild outline-none transition-all placeholder:text-gray-400" 
                    placeholder="06 12 34 56 78"
                />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-600">Nature du contact</label>
                    <div className="relative">
                        <select name="nature" className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-rothschild focus:ring-1 focus:ring-rothschild outline-none transition-all text-gray-700 appearance-none cursor-pointer">
                            <option value="Audit Patrimonial">Audit Patrimonial</option>
                            <option value="Investissement">Investissement (SCPI, PE...)</option>
                            <option value="Crédit Immobilier">Crédit Immobilier</option>
                            <option value="Assurance">Assurance</option>
                            <option value="Carrière">Carrière / Recrutement</option>
                            <option value="Autre demande">Autre demande</option>
                        </select>
                         <div className="absolute right-4 top-3.5 pointer-events-none text-gray-500">
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>
                    </div>
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-600">Créneau préférentiel</label>
                    <div className="grid grid-cols-2 gap-3">
                        <input name="date" type="date" className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-rothschild focus:ring-1 focus:ring-rothschild outline-none transition-all text-gray-700" />
                        <input name="time" type="time" className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-rothschild focus:ring-1 focus:ring-rothschild outline-none transition-all text-gray-700" />
                    </div>
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-600">Message *</label>
                <textarea 
                    name="message" 
                    required 
                    minLength={10}
                    rows={4} 
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-rothschild focus:ring-1 focus:ring-rothschild outline-none transition-all placeholder:text-gray-400" 
                    placeholder="Bonjour, je souhaiterais..."
                ></textarea>
            </div>

            {status === "error" && (
                <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg text-sm">
                    <AlertCircle size={18} />
                    {errorMessage}
                </div>
            )}

            <Button className="w-full" disabled={isLoading}>
                {isLoading ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Envoi en cours...
                    </>
                ) : (
                    "Envoyer"
                )}
            </Button>
        </form>
    );
};
