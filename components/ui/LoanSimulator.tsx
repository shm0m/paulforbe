"use client";

import { useState, useMemo } from "react";
import { Info } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export const LoanSimulator = () => {
    const [amount, setAmount] = useState(250000);
    const [years, setYears] = useState(20);
    const [interestRate, setInterestRate] = useState(3.5);
    const [insuranceRate, setInsuranceRate] = useState(0.36);

    const results = useMemo(() => {
        const months = years * 12;
        const monthlyRate = interestRate / 100 / 12;
        const monthlyInsurance = (amount * insuranceRate / 100) / 12;

        const monthlyLoanPayment = monthlyRate > 0 
            ? (amount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -months))
            : amount / months;
        
        const totalMonthlyPayment = monthlyLoanPayment + monthlyInsurance;
        const totalCost = (totalMonthlyPayment * months) - amount;
        const totalInsurance = monthlyInsurance * months;

        const schedule = [];
        let remainingBalance = amount;
        
        for (let y = 1; y <= years; y++) {
            let yearlyInterest = 0;
            let yearlyCapital = 0;
            let yearlyInsurance = 0;

            for (let m = 0; m < 12; m++) {
                if (remainingBalance <= 0) break;
                
                const interestPayment = remainingBalance * monthlyRate;
                const principalPayment = monthlyLoanPayment - interestPayment;
                
                yearlyInterest += interestPayment;
                yearlyCapital += principalPayment;
                yearlyInsurance += monthlyInsurance;
                
                remainingBalance -= principalPayment;
            }

            schedule.push({
                year: y,
                interest: yearlyInterest,
                capital: yearlyCapital,
                insurance: yearlyInsurance,
                total: yearlyInterest + yearlyCapital + yearlyInsurance
            });
        }

        return {
            monthlyPayment: totalMonthlyPayment,
            monthlyInsurance,
            totalCost,
            totalInsurance,
            schedule
        };
    }, [amount, years, interestRate, insuranceRate]);

    return (
        <div className="w-full max-w-6xl mx-auto">
             <div className="relative rounded-[2.5rem] overflow-hidden bg-white/60 backdrop-blur-2xl border border-white/60 shadow-2xl p-6 md:p-14 transition-all duration-500">
                


                <div className="grid lg:grid-cols-12 gap-8 lg:gap-20 items-start relative z-10">
                    <div className="lg:col-span-5 space-y-10 md:space-y-12">
                        
                        <div className="space-y-6">
                            <div className="space-y-1">
                                <label className="text-sm font-bold text-gray-400 uppercase tracking-wider">Montant emprunté</label>
                            </div>
                            <div className="relative group">
                                <input 
                                    type="number"
                                    min="50000" step="1000"
                                    value={amount}
                                    onChange={(e) => setAmount(Number(e.target.value))}
                                    className="w-full bg-transparent border-b border-gray-300 py-2 pr-8 text-3xl font-serif font-bold text-rothschild focus:outline-none focus:border-blue-500 transition-colors placeholder-gray-400"
                                />
                                <span className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-xl pointer-events-none">€</span>
                            </div>
                        </div>

                         <div className="space-y-6">
                            <div className="space-y-1">
                                <label className="text-sm font-bold text-gray-400 uppercase tracking-wider">Durée</label>
                            </div>
                            <div className="relative group">
                                <input 
                                    type="number"
                                    min="1" max="30" step="1"
                                    value={years}
                                    onChange={(e) => setYears(Math.max(1, Number(e.target.value)))}
                                    className="w-full bg-transparent border-b border-gray-300 py-2 pr-12 text-3xl font-serif font-bold text-rothschild focus:outline-none focus:border-blue-500 transition-colors placeholder-gray-400"
                                />
                                <span className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-xl pointer-events-none">ANS</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-8">
                             <div className="space-y-3">
                                <label className="flex items-center gap-2 text-sm font-bold text-gray-400 uppercase tracking-wider">
                                    Taux d&apos;intérêt
                                </label>
                                <div className="flex items-end gap-2 border-b-2 border-slate-200 pb-2 focus-within:border-rothschild transition-colors">
                                    <input 
                                        type="number" 
                                        value={interestRate}
                                        onChange={(e) => setInterestRate(Number(e.target.value))}
                                        step={0.01}
                                        className="w-full bg-transparent text-xl md:text-2xl font-bold text-rothschild outline-none placeholder-gray-300"
                                    />
                                    <span className="text-gray-400 font-bold mb-1">%</span>
                                </div>
                            </div>
                             <div className="space-y-3">
                                <label className="flex items-center gap-2 text-sm font-bold text-gray-400 uppercase tracking-wider">
                                    Taux assurance
                                </label>
                                <div className="flex items-end gap-2 border-b-2 border-slate-200 pb-2 focus-within:border-rothschild transition-colors">
                                    <input 
                                        type="number" 
                                        value={insuranceRate}
                                        onChange={(e) => setInsuranceRate(Number(e.target.value))}
                                        step={0.01}
                                        className="w-full bg-transparent text-xl md:text-2xl font-bold text-rothschild outline-none placeholder-gray-300"
                                    />
                                    <span className="text-gray-400 font-bold mb-1">%</span>
                                </div>
                            </div>
                        </div>
                        
                         <div className="pt-4 space-y-4">
                            <div className="bg-blue-50/50 p-6 rounded-2xl border border-blue-100">
                                <h4 className="text-rothschild font-bold font-serif text-lg mb-2 flex items-center gap-2">
                                    <Info size={18} /> Conseil Paul Forbe
                                </h4>
                                <p className="text-gray-500 text-sm leading-relaxed">
                                    Pour optimiser votre taux et votre montage financier, nos courtiers partenaires négocient pour vous les meilleures conditions auprès des banques.
                                </p>
                            </div>

                            <Link href="/contact" className="block w-full group">
                                <Button className="w-full py-6 text-lg font-bold shadow-xl shadow-rothschild/20 group-hover:shadow-rothschild/30 transition-all group-hover:-translate-y-1">
                                    Lancez votre projet
                                </Button>
                            </Link>
                        </div>

                    </div>

                    {/* Results Section */}
                    <div className="lg:col-span-7 flex flex-col h-full">
                         <div className="relative bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-slate-100 flex-1 min-h-[450px] flex flex-col overflow-hidden mb-8">
                            
                            <div className="relative z-10 flex flex-col items-end text-right mb-8">
                                <div className="text-sm font-medium text-gray-400 uppercase tracking-widest mb-1">Mensualités estimées</div>
                                <div className="text-4xl md:text-6xl font-bold font-serif text-rothschild mb-2">
                                    {Math.round(results.monthlyPayment).toLocaleString('fr-FR')} €
                                </div>
                                <div className="text-sm text-gray-500 font-medium bg-slate-50 px-3 py-1 rounded-full">
                                    Dont assurance {Math.round(results.monthlyInsurance).toLocaleString('fr-FR')} €/mois
                                </div>
                            </div>

                             {/* Chart Area */}
                            <div className="flex-1 w-full flex items-end gap-1.5 min-h-[200px] mb-6">
                                {results.schedule.map((year, i) => (
                                    <div key={i} className="flex-1 flex flex-col justify-end h-full gap-0.5 group relative">
                                         {/* Tooltip */}
                                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-rothschild text-white text-xs p-3 rounded-lg hidden group-hover:block whitespace-nowrap z-20 shadow-xl">
                                            <div className="font-bold mb-1 border-b border-white/20 pb-1">Année {year.year}</div>
                                            <div>Capital: {Math.round(year.capital).toLocaleString()} €</div>
                                            <div>Intérêts: {Math.round(year.interest).toLocaleString()} €</div>
                                        </div>
                                        

                                        <div 
                                            style={{ height: `${(year.insurance / year.total) * 100}%` }} 
                                            className="w-full bg-slate-200 rounded-t-sm transition-all group-hover:bg-slate-300"
                                        />
                                         <div 
                                            style={{ height: `${(year.interest / year.total) * 100}%` }} 
                                            className="w-full bg-blue-400/80 transition-all group-hover:bg-blue-400"
                                        />
                                        <div 
                                            style={{ height: `${(year.capital / year.total) * 100}%` }} 
                                            className="w-full bg-rothschild rounded-b-sm transition-all group-hover:bg-rothschild/90"
                                        />
                                    </div>
                                ))}
                            </div>


                            <div className="flex flex-wrap justify-center gap-6 text-xs text-gray-500 font-bold uppercase tracking-wide">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 bg-rothschild rounded-full shadow-sm" /> Capital
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 bg-blue-400 rounded-full shadow-sm" /> Intérêts
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 bg-slate-200 rounded-full shadow-sm" /> Assurance
                                </div>
                            </div>


                            <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-slate-100">
                                <div>
                                    <div className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">Coût Total</div>
                                    <div className="text-lg font-bold text-rothschild">{Math.round(results.totalCost).toLocaleString('fr-FR')} €</div>
                                </div>
                                <div>
                                    <div className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">Intérêts</div>
                                    <div className="text-lg font-bold text-rothschild">{Math.round(results.totalCost - results.totalInsurance).toLocaleString('fr-FR')} €</div>
                                </div>
                                <div>
                                    <div className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">Assurance</div>
                                    <div className="text-lg font-bold text-rothschild">{Math.round(results.totalInsurance).toLocaleString('fr-FR')} €</div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                 <div className="mt-8 text-[10px] text-center text-gray-400 max-w-2xl mx-auto">
                    *Ce simulateur est fourni à titre indicatif et ne constitue pas une offre commerciale. Les taux peuvent varier selon votre profil et les conditions de marché.
                </div>

            </div>
        </div>
    );
};
