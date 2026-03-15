"use client";

import { useState, useMemo } from "react";
import { 
    ResponsiveContainer, 
    AreaChart, 
    Area, 
    XAxis, 
    YAxis, 
    Tooltip, 
    CartesianGrid 
} from "recharts";
import { motion } from "framer-motion";
import Link from "next/link";
import { HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export default function CompoundInterestCalculator() {
    // State
    const [initialCapital, setInitialCapital] = useState(10000);
    const [regularContribution, setRegularContribution] = useState(100);
    const [years, setYears] = useState(20);
    const [interestRate, setInterestRate] = useState(5);
    const [interestPaymentInterval, setInterestPaymentInterval] = useState(12); // Intervalle de versement des intérêts en mois (12 = Annuel)
    const [contributionFrequency, setContributionFrequency] = useState(12); // Fréquence des versements (12 = Mensuel, 1 = Annuel)

    // Calculation Logic
    const results = useMemo(() => {
        const data = [];
        let currentBalance = initialCapital; // The amount currently earning interest
        let totalVersed = initialCapital;    // Total amount deposited (for display)
        let pendingDeposits = 0;             // Deposits made since last interest payment (not yet earning interest)
        let pendingInterest = 0;             // Interest accrued but not yet paid

        // 0. Initial State (Year 0)
        data.push({
            year: 'Année 0',
            versements: Math.round(totalVersed),
            interets: 0,
            total: Math.round(totalVersed)
        });

        // Loop through total months
        for (let m = 1; m <= years * 12; m++) {
            
            // 1. Handle Contributions (Monthly or Annual)
            if (contributionFrequency === 12) {
                // Monthly: Add every month
                pendingDeposits += regularContribution;
                totalVersed += regularContribution;
            } else if (contributionFrequency === 1 && (m - 1) % 12 === 0) {
                // Annual: Add once at start of year (Month 1, 13, 25...)
                pendingDeposits += regularContribution;
                totalVersed += regularContribution;
            }

            // 2. Interest Calculation
            // We calculate interest on the *currentBalance* (capitalized amount).
            // pendingDeposits do NOT earn interest until they are capitalized.
            const monthlyInterest = currentBalance * (interestRate / 100 / 12);
            pendingInterest += monthlyInterest;

            // 3. Interest Payment (Capitalization)
            if (m % interestPaymentInterval === 0) {
                // Capitalize Interest AND Deposits
                currentBalance += pendingInterest + pendingDeposits;
                pendingInterest = 0;
                pendingDeposits = 0;
            }

            // 4. Record Data at End of Year
            if (m % 12 === 0) {
                const yearIndex = m / 12;
                // For display, we show what's "in the account" (Capitalized + Pending)
                // This aligns with showing the linear growth of deposits even if interest isn't paid yet.
                const totalValue = currentBalance + pendingInterest + pendingDeposits;
                
                data.push({
                    year: `Année ${yearIndex}`,
                    versements: Math.round(totalVersed),
                    interets: Math.round(totalValue - totalVersed),
                    total: Math.round(totalValue)
                });
            }
        }

        const finalTotal = currentBalance + pendingInterest + pendingDeposits;

        return {
            data,
            finalCapital: Math.round(finalTotal),
            totalInterests: Math.round(finalTotal - totalVersed),
            totalInvested: Math.round(totalVersed)
        };

    }, [initialCapital, regularContribution, years, interestRate, interestPaymentInterval, contributionFrequency]);

    const formatCurrency = (val: number) => {
        return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(val);
    };

    return (
        <div className="min-h-screen bg-white pt-24 pb-12">
            <div className="container mx-auto px-6 max-w-7xl">
                


                <div className="text-center mb-12">
                    <h1 className="text-3xl md:text-5xl font-serif font-bold text-rothschild mb-4">
                        Calculatrice d&apos;intérêts composés
                    </h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Calculez simplement les intérêts composés que vous pouvez générer grâce à vos investissements.
                    </p>
                </div>

                {/* UNIFIED CALCULATOR CARD - LIGHT THEME */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden text-slate-900 flex flex-col lg:flex-row min-h-[600px]"
                >
                    
                    {/* LEFT PANEL: INPUTS + CTA */}
                    <div className="lg:w-[400px] shrink-0 bg-slate-50 p-8 border-r border-slate-200 flex flex-col justify-between relative">
                        {/* Inputs */}
                        <div className="space-y-8 relative z-10">
                            
                            {/* Capital Initial */}
                            <div>
                                <label className="flex items-center text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                                    Capital initial
                                </label>
                                <div className="relative group">
                                    <input 
                                        type="number" 
                                        value={initialCapital}
                                        onChange={(e) => setInitialCapital(Number(e.target.value))}
                                        className="w-full bg-transparent border-b border-gray-300 py-2 pr-16 text-2xl font-serif font-bold text-rothschild focus:outline-none focus:border-blue-500 transition-colors placeholder-gray-400"
                                    />
                                    <span className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-sm pointer-events-none">EUR</span>
                                </div>
                            </div>

                            {/* Regular Contribution */}
                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                                        Epargne mensuelle
                                    </label>
                                    <div className="flex bg-white rounded-md p-0.5 border border-gray-200">
                                        <button
                                            onClick={() => setContributionFrequency(12)}
                                            className={cn(
                                                "px-2 py-0.5 text-[10px] font-bold rounded transition-all",
                                                contributionFrequency === 12 ? "bg-slate-100 text-slate-900" : "text-gray-400 hover:text-gray-600"
                                            )}
                                        >
                                            Mois
                                        </button>
                                        <button
                                            onClick={() => setContributionFrequency(1)}
                                            className={cn(
                                                "px-2 py-0.5 text-[10px] font-bold rounded transition-all",
                                                contributionFrequency === 1 ? "bg-slate-100 text-slate-900" : "text-gray-400 hover:text-gray-600"
                                            )}
                                        >
                                            An
                                        </button>
                                    </div>
                                </div>
                                <div className="relative group">
                                    <input 
                                        type="number" 
                                        value={regularContribution}
                                        onChange={(e) => setRegularContribution(Number(e.target.value))}
                                        className="w-full bg-transparent border-b border-gray-300 py-2 pr-16 text-2xl font-serif font-bold text-rothschild focus:outline-none focus:border-blue-500 transition-colors placeholder-gray-400"
                                    />
                                    <span className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-sm pointer-events-none">EUR</span>
                                </div>
                            </div>

                            {/* Duration */}
                            <div>
                                <label className="flex items-center text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                                    Horizon de placement
                                </label>
                                <div className="relative group">
                                    <input 
                                        type="number"
                                        min="1"
                                        max="50"
                                        value={years}
                                        onChange={(e) => setYears(Math.max(1, Number(e.target.value)))}
                                        className="w-full bg-transparent border-b border-gray-300 py-2 pr-16 text-2xl font-serif font-bold text-rothschild focus:outline-none focus:border-blue-500 transition-colors placeholder-gray-400"
                                    />
                                    <span className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-sm pointer-events-none">ANNÉES</span>
                                </div>
                            </div>

                            {/* Interest Rate */}
                            <div>
                                <label className="flex items-center text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                                    Taux d&apos;intérêt
                                </label>
                                <div className="relative group">
                                    <input 
                                        type="number"
                                        min="0"
                                        max="15"
                                        step="0.1"
                                        value={interestRate}
                                        onChange={(e) => setInterestRate(Number(e.target.value))}
                                        className="w-full bg-transparent border-b border-gray-300 py-2 pr-16 text-2xl font-serif font-bold text-rothschild focus:outline-none focus:border-amber-500 transition-colors placeholder-gray-400"
                                    />
                                    <span className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-sm pointer-events-none">%</span>
                                </div>
                            </div>

                            {/* Interest Payment Interval (Custom number input) */}
                            <div>
                                <label className="flex items-center text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 gap-2">
                                    Intervalle de versement des intérêts
                                    <HelpCircle size={12} className="text-gray-400" />
                                </label>
                                <div className="relative group">
                                    <input 
                                        type="number"
                                        min="1"
                                        max="60"
                                        value={interestPaymentInterval}
                                        onChange={(e) => setInterestPaymentInterval(Math.max(1, Number(e.target.value)))}
                                        className="w-full bg-transparent border-b border-gray-300 py-2 pr-16 text-2xl font-serif font-bold text-rothschild focus:outline-none focus:border-blue-500 transition-colors placeholder-gray-400"
                                    />
                                    <span className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-sm pointer-events-none">MOIS</span>
                                </div>
                            </div>

                        </div>

                        {/* CTA Internal Block */}
                        <div className="mt-12 pt-8 border-t border-gray-200">
                             <div className="mb-4">
                                <h4 className="text-rothschild font-serif font-bold text-lg mb-1">Besoin d&apos;un audit ?</h4>
                                <p className="text-xs text-gray-500 leading-relaxed">
                                    Nos experts vous aident à optimiser votre stratégie.
                                </p>
                             </div>
                             <Link 
                                href="/contact"
                                className="block w-full py-3 bg-rothschild text-white text-center rounded-lg font-bold text-sm hover:bg-rothschild/90 transition-colors shadow-lg shadow-rothschild/20"
                            >
                                DISCUTER AVEC UN EXPERT
                            </Link>
                        </div>
                    </div>

                    {/* RIGHT PANEL: CHART */}
                    <div className="flex-1 p-8 lg:p-12 relative flex flex-col bg-white">
                        
                        {/* Header Stats */}
                        <div className="relative z-10 text-center mb-10">
                            <div className="text-gray-400 text-sm font-medium uppercase tracking-widest mb-2">Capital Final Estimé</div>
                            <div className="text-5xl md:text-7xl font-serif font-bold text-slate-900 mb-2">
                                {formatCurrency(results.finalCapital)}
                            </div>
                            <div className="flex items-center justify-center gap-6 mt-4 text-sm">
                                <div className="flex flex-col items-center">
                                     <span className="text-gray-400 uppercase text-[10px] font-bold">Total Versé</span>
                                     <span className="font-bold text-blue-600">{formatCurrency(results.totalInvested)}</span>
                                </div>
                                <div className="w-px h-8 bg-gray-200" />
                                <div className="flex flex-col items-center">
                                     <span className="text-gray-400 uppercase text-[10px] font-bold">Intérêts</span>
                                     <span className="font-bold text-amber-500">{formatCurrency(results.totalInterests)}</span>
                                </div>
                            </div>
                        </div>

                        {/* Chart Area */}
                        <div className="flex-1 min-h-[300px] w-full relative z-10">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={results.data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="colorVersements" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1}/>
                                            <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                                        </linearGradient>
                                        <linearGradient id="colorInterets" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.1}/>
                                            <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                                    <XAxis 
                                        dataKey="year" 
                                        stroke="#94a3b8" 
                                        tick={{fill: '#64748b', fontSize: 10}}
                                        tickLine={false}
                                        axisLine={false}
                                        interval="preserveStartEnd"
                                    />
                                    <YAxis 
                                        stroke="#94a3b8" 
                                        tick={{fill: '#64748b', fontSize: 10}}
                                        tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
                                        tickLine={false}
                                        axisLine={false}
                                    />
                                    <Tooltip 
                                        contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                        itemStyle={{ color: '#0f172a', fontSize: '12px', fontWeight: 'bold' }}
                                        formatter={(value: number | undefined) => value !== undefined ? formatCurrency(value) : ''}
                                        labelStyle={{ color: '#64748b', marginBottom: '4px' }}
                                    />
                                    <Area 
                                        type="monotone" 
                                        dataKey="versements" 
                                        stackId="1" 
                                        stroke="#2563eb" 
                                        fill="url(#colorVersements)" 
                                        name="Versements"
                                        strokeWidth={2}
                                        fillOpacity={1}
                                    />
                                    <Area 
                                        type="monotone" 
                                        dataKey="interets"
                                        stackId="1" 
                                        stroke="#f59e0b" 
                                        fill="url(#colorInterets)" 
                                        name="Intérêts"
                                        strokeWidth={2}
                                        fillOpacity={1}
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>

                    </div>
                </motion.div>

                {/* Info Text */}
                <div className="mt-8 text-center text-xs text-gray-400 max-w-4xl mx-auto">
                    Cet outil d&apos;estimation vous permet de projeter vos investissements potentiels. 
                    Il ne constitue pas un engagement contractuel ni un conseil en investissement. 
                    Pour une approche personnalisée, <Link href="/contact" className="underline hover:text-rothschild">contactez nos conseillers</Link>.
                </div>

            </div>
        </div>
    );
}
