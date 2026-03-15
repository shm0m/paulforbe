"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Button } from "./Button";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Check, User, Building, Building2 } from "lucide-react";
import { cn } from "@/lib/utils";

const PRODUCTS = [
    { id: "structured", label: "Produits Structurés", modifier: 1.0, description: "Des solutions offrant un rendement attractif avec une protection partielle du capital sous certaines conditions de marché." },
    { id: "scpi", label: "SCPI", modifier: 1.0, description: "Investissez dans l'immobilier d'entreprise et percevez des revenus locatifs réguliers sans contrainte de gestion." }, 
    { id: "capital_guaranteed", label: "Produit à Capital Garanti", modifier: 0.4, description: "Sécurisez totalement votre épargne tout en profitant d'une rémunération stable et sans risque de perte." }, 
    { id: "private_equity", label: "Private Equity", modifier: 1.4, description: "Soutenez la croissance d'entreprises non cotées pour viser des performances potentiellement très élevées sur le long terme." } 
];

const RISKS = [
    { id: "prudent", label: "Prudent", rate: 0.07 },
    { id: "balanced", label: "Equilibré", rate: 0.09 },
    { id: "dynamic", label: "Dynamique", rate: 0.10 }
];

const SCPIS = [
    { id: "epargne_pierre", label: "Epargne Pierre", rate: 0.0528 },
    { id: "activimmo", label: "ActivImmo", rate: 0.0552 },
    { id: "transitions_europe", label: "Transitions Europe", rate: 0.0816 },
    { id: "corum_origin", label: "Corum Origin", rate: 0.0606 },
    { id: "immorente", label: "Immorente", rate: 0.0500 },
    { id: "coeur_de_regions", label: "Cœur de Régions", rate: 0.0620 },
    { id: "pierval_sante", label: "Pierval Santé", rate: 0.0510 },
    { id: "iroko_zen", label: "Iroko Zen", rate: 0.0712 }
];

const GUARANTEED_PRODUCTS = [
    { id: "societe_generale", label: "Société Générale", sublabel: "Unité de compte garanti", rate: 0.0600, icon: Building },
    { id: "generali", label: "Generali", sublabel: "Fonds Euro garanti", rate: 0.0370, icon: getLionIcon }
];

function getLionIcon(props: React.ComponentProps<typeof Building2>) {
    return <Building2 {...props} />; 
}

export const Simulator = () => {
  const router = useRouter();
  const [selectedProduct, setSelectedProduct] = useState(PRODUCTS[0]);
  const [selectedRisk, setSelectedRisk] = useState(RISKS[2]); 
  const [selectedSCPI, setSelectedSCPI] = useState(SCPIS[2]); 
  const [selectedGuaranteed, setSelectedGuaranteed] = useState(GUARANTEED_PRODUCTS[1]); 
  const [isProductMenuOpen, setIsProductMenuOpen] = useState(false);
  
  const [amount, setAmount] = useState(50000);
  const [duration, setDuration] = useState(3);

  const isSCPI = selectedProduct.id === "scpi";
  const isGuaranteed = selectedProduct.id === "capital_guaranteed";
  const isPE = selectedProduct.id === "private_equity";

  let effectiveRate = selectedRisk.rate * selectedProduct.modifier;
  if (isSCPI) effectiveRate = selectedSCPI.rate;
  if (isGuaranteed) effectiveRate = selectedGuaranteed.rate;
  if (isPE) effectiveRate = 0.20; 

  const data = useMemo(() => {
    let balance = amount;
    const points = [];
    points.push({ year: 0, value: balance });
    
    const simDuration = isPE ? 6 : duration; 
    
    for (let i = 1; i <= simDuration; i++) {
        balance = amount * Math.pow(1 + effectiveRate, i);
        points.push({ year: i, value: balance });
    }
    return points;
  }, [amount, duration, effectiveRate, isPE]);

  const displayValue = isSCPI 
      ? amount * effectiveRate * duration 
      : data[data.length - 1].value;

  const resultLabel = isSCPI ? "Loyers perçus (Total)" : "Capital estimé à terme";

  const width = 400;
  const height = 150;
  const maxVal = data[data.length - 1].value;
  
  const pointsString = data.map((d, i) => {
    const totalPoints = isPE ? 6 : duration;
    const x = (i / totalPoints) * width;
    const y = height - ((d.value) / (maxVal * 1.1)) * height;
    return `${x},${y}`;
  }).join(" ");

  const firstY = height - ((data[0].value) / (maxVal * 1.1)) * height;

  return (
    <div className="w-full max-w-6xl mx-auto">
        <div className="relative rounded-[2.5rem] overflow-hidden bg-white/60 backdrop-blur-2xl border border-white/60 shadow-2xl p-8 md:p-14 transition-all duration-500">
            
            <div className="flex flex-col items-center mb-16 relative z-30">
                <span className="text-gray-500 text-sm font-bold mb-3 uppercase tracking-[0.2em]">Votre simulation en</span>
                <div className="relative">
                    <button 
                        onClick={() => setIsProductMenuOpen(!isProductMenuOpen)}
                        className="flex items-center gap-3 text-3xl md:text-5xl font-serif font-bold text-rothschild hover:text-blue-900 transition-colors"
                    >
                        {selectedProduct.label}
                        <ChevronDown className={cn("transition-transform duration-300 w-8 h-8", isProductMenuOpen ? "rotate-180" : "")} />
                    </button>

                    <AnimatePresence>
                        {isProductMenuOpen && (
                            <motion.div 
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                className="absolute top-full left-1/2 -translate-x-1/2 mt-6 w-96 bg-white border border-slate-100 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.12)] overflow-hidden z-50 p-2"
                            >
                                {PRODUCTS.map((product) => (
                                    <button
                                        key={product.id}
                                        onClick={() => {
                                            setSelectedProduct(product);
                                            setIsProductMenuOpen(false);
                                        }}
                                        className={cn(
                                            "w-full text-left px-6 py-4 transition-all rounded-xl flex flex-col gap-1",
                                            selectedProduct.id === product.id ? "bg-rothschild text-white shadow-md" : "hover:bg-slate-50"
                                        )}
                                    >
                                        <div className="flex items-center justify-between w-full">
                                            <span className={cn("text-sm font-bold", selectedProduct.id === product.id ? "text-white" : "text-gray-800")}>{product.label}</span>
                                            {selectedProduct.id === product.id && <Check size={18} />}
                                        </div>
                                    </button>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
                <p className="mt-6 text-sm text-gray-500 max-w-xl text-center leading-relaxed">
                    {selectedProduct.description}
                </p>
            </div>

            <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start relative z-10">
                <div className="lg:col-span-5 space-y-12">
                    
                    {isSCPI ? (
                         <div className="space-y-6">
                            <label className="text-xl font-bold font-serif text-rothschild">Choisissez votre SCPI</label>
                            <div className="grid grid-cols-2 gap-3">
                                {SCPIS.map((scpi) => (
                                    <button
                                        key={scpi.id}
                                        onClick={() => setSelectedSCPI(scpi)}
                                        className={cn(
                                            "relative p-3 rounded-xl border transition-all duration-300 flex flex-col items-center justify-center gap-1.5 text-center",
                                            selectedSCPI.id === scpi.id 
                                                ? "bg-white border-blue-200 shadow-lg z-10" 
                                                : "bg-white/40 border-transparent hover:bg-white/60"
                                        )}
                                    >
                                         <div className={cn(
                                            "px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider",
                                            selectedSCPI.id === scpi.id ? "bg-blue-100 text-rothschild" : "bg-white text-gray-400"
                                        )}>
                                            {(scpi.rate * 100).toFixed(2)}%
                                        </div>
                                        <div className={cn(
                                            "text-xs font-bold leading-tight",
                                            selectedSCPI.id === scpi.id ? "text-rothschild" : "text-gray-500"
                                        )}>
                                            {scpi.label}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    ) : isGuaranteed ? (
                        <div className="space-y-6">
                            <label className="text-xl font-bold font-serif text-rothschild">Choisissez votre investissement</label>
                            <div className="grid grid-cols-2 gap-4">
                                {GUARANTEED_PRODUCTS.map((prod) => (
                                    <button
                                        key={prod.id}
                                        onClick={() => setSelectedGuaranteed(prod)}
                                        className={cn(
                                            "relative p-6 rounded-2xl border transition-all duration-300 flex flex-col items-center justify-center gap-4 text-center group",
                                            selectedGuaranteed.id === prod.id 
                                                ? "bg-white border-blue-200 shadow-xl scale-105 z-10" 
                                                : "bg-white/40 border-transparent hover:bg-white/60"
                                        )}
                                    >
                                        <div className="text-[10px] font-medium text-gray-500 uppercase tracking-wide">{prod.sublabel}</div>
                                        <div className={cn(
                                            "px-4 py-1.5 rounded-full text-base font-bold tracking-wider",
                                            selectedGuaranteed.id === prod.id ? "bg-blue-100 text-rothschild" : "bg-white text-gray-400"
                                        )}>
                                            {(prod.rate * 100).toFixed(2)}%
                                        </div>
                                        <div className={cn(
                                            "flex items-center gap-2 text-sm font-bold font-serif mt-2",
                                            selectedGuaranteed.id === prod.id ? "text-rothschild" : "text-gray-400"
                                        )}>
                                           {prod.id === 'societe_generale' && <span className="w-2 h-2 bg-red-600 inline-block mr-1"></span>}
                                           {prod.id === 'generali' && <span className="w-2 h-2 bg-red-700 inline-block mr-1"></span>} 
                                           {prod.label}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    ) : isPE ? (
                        <div className="space-y-6">
                             <div className="space-y-1">
                                 <label className="text-xl font-bold font-serif text-rothschild">Choisissez votre investissement</label>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            <label className="text-xl font-bold font-serif text-rothschild">Choisissez votre profil</label>
                            <div className="flex gap-4">
                                {RISKS.map((risk) => (
                                    <button
                                        key={risk.id}
                                        onClick={() => setSelectedRisk(risk)}
                                        className={cn(
                                            "flex-1 relative group px-2 py-4 rounded-2xl border transition-all duration-300 flex flex-col items-center justify-center gap-2",
                                            selectedRisk.id === risk.id 
                                                ? "bg-white border-blue-200 shadow-lg scale-105 z-10" 
                                                : "bg-transparent border-transparent hover:bg-white/40"
                                        )}
                                    >
                                        <div className={cn(
                                            "px-3 py-1 rounded-full text-[10px] font-bold tracking-wider",
                                            selectedRisk.id === risk.id ? "bg-blue-100 text-rothschild" : "bg-white/50 text-gray-500"
                                        )}>
                                            {(risk.rate * selectedProduct.modifier * 100).toFixed(2)}%/AN
                                        </div>
                                        <div className={cn(
                                            "text-sm font-bold transition-colors",
                                            selectedRisk.id === risk.id ? "text-rothschild" : "text-gray-400"
                                        )}>
                                            {risk.label}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="space-y-6">
                        <div className="space-y-1">
                             <label className="text-sm font-bold text-gray-400 uppercase tracking-wider">Le montant de votre investissement</label>
                        </div>
                        <div className="relative group">
                            <input 
                                type="number"
                                min="1000" step="1000"
                                value={amount}
                                onChange={(e) => setAmount(Number(e.target.value))}
                                className="w-full bg-transparent border-b border-gray-300 py-2 pr-8 text-3xl font-serif font-bold text-rothschild focus:outline-none focus:border-blue-500 transition-colors placeholder-gray-400"
                            />
                            <span className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-xl pointer-events-none">€</span>
                        </div>
                    </div>

                    {isPE && (
                        <div className="space-y-4 pt-4">
                            {[1, 2, 3, 4].map((year) => (
                                <div key={year} className="flex justify-between items-center text-sm font-medium">
                                    <span className="text-gray-400">Appel de fond {year}ème année :</span>
                                    <span className="font-bold text-rothschild">{(amount / 4).toLocaleString()} €</span>
                                </div>
                            ))}
                        </div>
                    )}

                    {!isPE && (
                        <div className="space-y-6">
                            <div className="space-y-1">
                                <label className="text-sm font-bold text-gray-400 uppercase tracking-wider">Durée</label>
                            </div>
                            <div className="relative group">
                                <input 
                                    type="number"
                                    min="1" max="30" step="1"
                                    value={duration}
                                    onChange={(e) => setDuration(Math.max(1, Number(e.target.value)))}
                                    className="w-full bg-transparent border-b border-gray-300 py-2 pr-12 text-3xl font-serif font-bold text-rothschild focus:outline-none focus:border-blue-500 transition-colors placeholder-gray-400"
                                />
                                <span className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-xl pointer-events-none">ANS</span>
                            </div>
                        </div>
                    )}
                </div>

                <div className="lg:col-span-7 flex flex-col h-full">
                    <div className="relative bg-white rounded-3xl p-8 shadow-xl border border-slate-100 flex-1 min-h-[300px] flex flex-col overflow-hidden mb-8">
                         <div className="relative z-10 flex flex-col items-end text-right mb-auto">
                            <div className="text-sm font-medium text-gray-400 uppercase tracking-widest mb-1">{resultLabel}</div>
                            <div className="text-5xl md:text-6xl font-bold font-serif text-rothschild mb-4">
                                {Math.round(displayValue).toLocaleString()} €
                            </div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-rothschild text-xs font-bold uppercase tracking-wide">
                                Soit un rendement moyen de {(effectiveRate * 100).toFixed(2)}%/an
                            </div>
                         </div>
                         
                         <div className="absolute inset-x-0 bottom-0 h-[60%] w-full">
                             <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible" preserveAspectRatio="none">
                                <defs>
                                    <linearGradient id="gradientLight" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#002855" stopOpacity="0.1"/>
                                        <stop offset="100%" stopColor="#002855" stopOpacity="0"/>
                                    </linearGradient>
                                </defs>
                                <path d={`M 0,${height} L 0,${firstY} ` + pointsString + ` L ${width},${height} Z`} fill="url(#gradientLight)" stroke="none" />
                                <motion.path 
                                    d={`M 0,${firstY} ` + pointsString}
                                    fill="none"
                                    stroke="#002855"
                                    strokeWidth="3"
                                    initial={{ pathLength: 0, opacity: 0 }}
                                    animate={{ pathLength: 1, opacity: 1 }}
                                    transition={{ duration: 1.5, ease: "easeInOut" }}
                                />
                             </svg>
                         </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-white/50 rounded-2xl p-4 border border-white/60 flex items-center justify-between">
                            <div className="flex -space-x-3">
                                {[1,2,3].map((i) => (
                                    <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center">
                                       <User size={14} className="text-gray-400" />
                                    </div>
                                ))}
                            </div>
                            <span className="text-xs font-bold text-rothschild">+2000 investisseurs</span>
                        </div>
                        <Button onClick={() => router.push("/contact")} className="w-full h-auto py-4 text-sm tracking-widest uppercase font-bold rounded-2xl shadow-xl shadow-blue-900/10">
                            Lancez votre projet
                        </Button>
                    </div>
                </div>
            </div>

            <div className="mt-12 text-[10px] text-gray-400 text-center max-w-2xl mx-auto">
                **Performance hypothétique basée sur le profil de risque sélectionné. Les performances passées ne préjugent pas des performances futures. Investir comporte des risques.
            </div>
        </div>
    </div>
  );
}
