"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll } from "framer-motion";
import { LucideIcon } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ScrollSpyItem {
    title: string;
    desc: string;
    list?: string[];
    icon: LucideIcon;
    image: string;
}

interface ScrollSpySectionProps {
    title: string;
    description?: string;
    items: ScrollSpyItem[];
}

export const ScrollSpySection = ({ title, description, items }: ScrollSpySectionProps) => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end end"]
    });

    useEffect(() => {
        const unsubscribe = scrollYProgress.on("change", (v) => {
            // Buffer to ensure we don't instantly jump
            const safeV = Math.max(0, Math.min(1, v));
            const index = Math.min(
                Math.floor(safeV * items.length),
                items.length - 1
            );
            setActiveIndex(Math.max(0, index));
        });
        return () => unsubscribe();
    }, [scrollYProgress, items.length]);

    return (
        <section ref={sectionRef} className="relative bg-white" style={{ height: `${items.length * 100}vh` }}>
            <div className="sticky top-0 h-screen flex flex-col md:flex-row overflow-hidden bg-white">
                
                {/* Left Side: Sticky Images (Moved to first child) */}
                <div className="w-full md:w-1/2 h-1/2 md:h-full relative overflow-hidden bg-slate-100">
                    {items.map((item, index) => (
                        <div 
                            key={index}
                            className={cn(
                                "absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out",
                                index === activeIndex ? "opacity-100 z-10" : "opacity-0 z-0"
                            )}
                        >
                            <Image 
                                src={item.image} 
                                alt={item.title} 
                                fill 
                                sizes="(max-width: 768px) 100vw, 50vw"
                                quality={95}
                                className={cn(
                                    "object-cover object-center transition-transform duration-[3s] ease-out",
                                    index === activeIndex ? "scale-100" : "scale-110"
                                )}
                                priority={index === 0}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/20 to-transparent pointer-events-none" />
                        </div>
                    ))}
                </div>

                {/* Right Side: Content Menu */}
                <div className="w-full md:w-1/2 h-1/2 md:h-full flex flex-col justify-center p-8 md:p-16 lg:px-24 xl:px-32 relative z-20 overflow-y-auto">
                    
                    {/* Header Area (Static) */}
                    <div className="mb-12">
                        {/* Decorative dots to match screenshot */}
                        <div className="grid grid-cols-3 gap-1 w-fit mb-8 opacity-30">
                            {[...Array(9)].map((_, i) => (
                                <div key={i} className="w-1.5 h-1.5 rounded-full bg-rothschild" />
                            ))}
                        </div>
                        
                        <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif font-bold text-rothschild mb-6 leading-tight">
                            {title}
                        </h2>
                        
                        {description && (
                            <p className="text-gray-600 text-lg md:text-xl leading-relaxed max-w-xl">
                                {description}
                            </p>
                        )}
                    </div>
                    
                    {/* Accordion Area (Dynamic) */}
                    <div className="flex flex-col">
                        <div className="border-t border-gray-100" />
                        {items.map((item, index) => {
                            const isActive = index === activeIndex;
                            return (
                                <div 
                                    key={index}
                                    className={cn(
                                        "flex flex-col transition-all duration-700 ease-in-out cursor-pointer border-b border-gray-100",
                                        isActive ? "opacity-100 py-6" : "opacity-40 hover:opacity-70 py-4"
                                    )}
                                >
                                    {/* Text Content */}
                                    <div className="flex-1">
                                        <h3 className={cn(
                                            "transition-all duration-700 ease-in-out",
                                            isActive ? "text-2xl md:text-3xl font-serif font-bold text-rothschild mb-4" : "text-base md:text-lg font-medium text-gray-500"
                                        )}>
                                            {item.title}
                                        </h3>
                                        
                                        {/* Expandable description */}
                                        <motion.div 
                                            initial={false}
                                            animate={{ 
                                                height: isActive ? "auto" : 0, 
                                                opacity: isActive ? 1 : 0,
                                            }}
                                            transition={{ duration: 0.5, ease: "easeInOut" }}
                                            className="overflow-hidden"
                                        >
                                            <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                                                {item.desc}
                                            </p>
                                            {item.list && (
                                                <ul className="mt-4 space-y-2">
                                                    {item.list.map((li, i) => (
                                                        <li key={i} className="flex items-start gap-3 text-sm md:text-base text-gray-500 font-medium">
                                                            <div className="w-1.5 h-1.5 rounded-full bg-rothschild mt-2 shrink-0" />
                                                            {li}
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </motion.div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

            </div>
        </section>
    );
};
