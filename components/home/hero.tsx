'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Hero() {
    return (
        <section
            className="relative isolate overflow-hidden flex flex-col items-center justify-start text-center min-h-screen pt-24 pb-32 bg-background text-foreground"
            aria-label="Section principale"
        >
            {/* Background Animations */}

            {/* Grille architecturale subtile */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 -z-10"
                style={{
                    backgroundImage: `
                        linear-gradient(to right, hsl(var(--foreground)/0.02) 1px, transparent 1px),
                        linear-gradient(to bottom, hsl(var(--foreground)/0.02) 1px, transparent 1px)
                    `,
                    backgroundSize: '80px 80px',
                }}
            />

            {/* Grand cercle — centre droit, respire lentement */}
            <motion.div
                aria-hidden="true"
                className="pointer-events-none absolute -z-10"
                style={{ top: '10%', right: '-15%', width: 600, height: 600 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 120, repeat: Infinity, ease: 'linear' }}
            >
                <svg viewBox="0 0 600 600" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                    <circle cx="300" cy="300" r="280" stroke="hsl(var(--foreground))" strokeWidth="0.5" opacity="0.04" />
                    <circle cx="300" cy="300" r="200" stroke="hsl(var(--foreground))" strokeWidth="0.5" opacity="0.03" strokeDasharray="4 8" />
                    <circle cx="300" cy="300" r="120" stroke="hsl(var(--accent))" strokeWidth="0.5" opacity="0.06" />
                </svg>
            </motion.div>

            {/* Petit carré technique — coin supérieur gauche */}
            <motion.div
                aria-hidden="true"
                className="pointer-events-none absolute -z-10"
                style={{ top: '15%', left: '8%', width: 120, height: 120 }}
                animate={{ rotate: -45, scale: [1, 1.05, 1] }}
                transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            >
                <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                    <rect x="10" y="10" width="100" height="100" stroke="hsl(var(--foreground))" strokeWidth="0.5" opacity="0.05" />
                    <rect x="25" y="25" width="70" height="70" stroke="hsl(var(--accent))" strokeWidth="0.5" opacity="0.08" />
                </svg>
            </motion.div>

            {/* Losange — milieu gauche */}
            <motion.div
                aria-hidden="true"
                className="pointer-events-none absolute -z-10"
                style={{ top: '55%', left: '5%', width: 80, height: 80 }}
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            >
                <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                    <rect x="20" y="20" width="40" height="40" stroke="hsl(var(--accent))" strokeWidth="0.8" opacity="0.1" transform="rotate(45 40 40)" />
                </svg>
            </motion.div>

            {/* Lignes croisées — milieu droit */}
            <motion.div
                aria-hidden="true"
                className="pointer-events-none absolute -z-10"
                style={{ top: '60%', right: '10%', width: 160, height: 160 }}
                animate={{ rotate: [0, 90] }}
                transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
            >
                <svg viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                    <line x1="0" y1="80" x2="160" y2="80" stroke="hsl(var(--foreground))" strokeWidth="0.5" opacity="0.04" />
                    <line x1="80" y1="0" x2="80" y2="160" stroke="hsl(var(--foreground))" strokeWidth="0.5" opacity="0.04" />
                    <circle cx="80" cy="80" r="3" fill="hsl(var(--accent))" opacity="0.12" />
                </svg>
            </motion.div>

            {/* Petit triangle — bas centre-gauche */}
            <motion.div
                aria-hidden="true"
                className="pointer-events-none absolute -z-10"
                style={{ bottom: '18%', left: '20%', width: 60, height: 60 }}
                animate={{ y: [0, 10, 0], rotate: [0, 5, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
            >
                <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                    <polygon points="30,5 55,55 5,55" stroke="hsl(var(--foreground))" strokeWidth="0.5" opacity="0.05" fill="none" />
                </svg>
            </motion.div>

            {/* Arc de cercle — haut centre */}
            <motion.div
                aria-hidden="true"
                className="pointer-events-none absolute -z-10"
                style={{ top: '-5%', left: '30%', width: 400, height: 400 }}
                animate={{ rotate: -360 }}
                transition={{ duration: 200, repeat: Infinity, ease: 'linear' }}
            >
                <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                    <path d="M 200 20 A 180 180 0 0 1 380 200" stroke="hsl(var(--accent))" strokeWidth="0.6" opacity="0.06" strokeLinecap="round" />
                </svg>
            </motion.div>

            {/* Points de connexion dispersés */}
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
                {[
                    { x: '12%', y: '25%', s: 3, o: 0.08 },
                    { x: '85%', y: '35%', s: 2, o: 0.06 },
                    { x: '75%', y: '75%', s: 4, o: 0.05 },
                    { x: '25%', y: '80%', s: 2, o: 0.07 },
                    { x: '50%', y: '15%', s: 3, o: 0.04 },
                    { x: '90%', y: '20%', s: 2, o: 0.06 },
                    { x: '8%', y: '70%', s: 3, o: 0.05 },
                ].map((dot, i) => (
                    <motion.div
                        key={i}
                        className="absolute rounded-full bg-accent"
                        style={{ left: dot.x, top: dot.y, width: dot.s, height: dot.s, opacity: dot.o }}
                        animate={{ opacity: [dot.o, dot.o * 2.5, dot.o] }}
                        transition={{ duration: 3 + i, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
                    />
                ))}
            </div>

            {/* Page Content */}
            <div className="mx-auto max-w-5xl px-4 sm:px-8 flex flex-col items-center gap-12 relative z-10">



                {/* Vertical Scale Indicator - Asymmetry */}
                <div className="absolute -left-12 top-1/4 hidden lg:flex flex-col items-center gap-4 opacity-20">
                    <div className="h-32 w-[1px] bg-gradient-to-b from-transparent via-foreground to-transparent" />
                    <span className="rotate-90 text-[10px] font-mono tracking-[0.5em] uppercase">Architecture</span>
                    <div className="h-32 w-[1px] bg-gradient-to-b from-transparent via-foreground to-transparent" />
                </div>

                {/* Label discret */}
                <div className="flex items-center gap-2 sm:gap-3">
                    <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-accent rounded-full" />
                    <span className="text-[10px] sm:text-xs font-mono text-muted-foreground tracking-widest uppercase opacity-70">
                        Souveraineté Numérique · Systèmes Complexes
                    </span>
                </div>

                {/* H1 - Universal Wording */}
                <h1 className="text-[2.2rem] xs:text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.95] sm:leading-none text-foreground px-2 text-center">
                    Le monde manque <br />
                    <span className="text-accent underline decoration-foreground/10 underline-offset-8">d'architectures.</span>
                </h1>

                {/* Sous-titre - Universal Wording */}
                <p className="text-lg sm:text-2xl text-muted-foreground max-w-3xl leading-relaxed font-normal text-center" style={{ letterSpacing: '-0.01em' }}>
                    Je conçois les systèmes qui permettront au numérique moderne 
                    d'être <span className="text-foreground font-semibold">structuré</span>, 
                    <span className="text-foreground font-semibold"> scalable</span> et 
                    <span className="text-foreground font-semibold"> souverain</span>.
                </p>

                {/* Data Points / Proof */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-8 sm:gap-16 pt-8 border-t border-foreground/5 w-full max-w-2xl">
                    <div className="flex flex-col items-center gap-1">
                        <span className="text-2xl sm:text-3xl font-black tracking-tighter">+15</span>
                        <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest text-center">Infrastructures Déployées</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                        <span className="text-2xl sm:text-3xl font-black tracking-tighter">100%</span>
                        <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest text-center">Souveraineté Cloud</span>
                    </div>
                    <div className="flex flex-col items-center gap-1 col-span-2 md:col-span-1 border-t md:border-t-0 border-foreground/5 pt-6 md:pt-0">
                        <span className="text-2xl sm:text-3xl font-black tracking-tighter">+200</span>
                        <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest text-center">Membres Formés</span>
                    </div>
                </div>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-6 items-center pt-8 w-full justify-center">
                    <Link
                        href="/contact"
                        className="inline-flex items-center justify-center gap-3 bg-accent text-white px-10 py-5 text-sm font-bold tracking-tight transition-all duration-300 hover:scale-105 active:scale-95 shadow-xl shadow-accent/20 group"
                    >
                        Bâtir mon infrastructure
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </Link>
                    <Link
                        href="/realisations"
                        className="inline-flex items-center justify-center px-8 py-4 text-sm font-medium text-muted-foreground tracking-tight transition-all duration-300 hover:text-foreground border border-transparent hover:border-foreground/10 hover:bg-foreground/5 rounded-full"
                    >
                        Voir les systèmes
                    </Link>
                </div>

            </div>
        </section>
    );
}
