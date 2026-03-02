import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import InteractiveTimeline from '@/components/interactive-timeline';

const projects = [
    {
        ref: 'EHAF-INFRA-01',
        name: 'FlexHOST',
        status: 'ALPHA',
        statusColor: 'text-accent',
        description:
            'Infrastructure cloud modulaire conçue pour l\'hébergement local et la résilience des données souveraines.',
    },
    {
        ref: 'EHAF-ARCH-01',
        name: 'EHAF Framework',
        status: 'BETA',
        statusColor: 'text-accent/60',
        description:
            'Eurinhash Architectural Framework. Socle reproductible pour structurer tout projet d\'infrastructure d\'envergure.',
    },
    {
        ref: 'EHAF-EDU-01',
        name: 'Académie',
        status: 'STRUCTURATION',
        statusColor: 'text-muted-foreground',
        description:
            'Formation systémique de haut niveau pour transformer les développeurs en architectes de systèmes.',
    },
];

export default function Ecosystem() {
    return (
        <section className="py-24 sm:py-48 bg-background border-b border-foreground/5 relative overflow-hidden">
            <div className="mx-auto max-w-6xl px-4 sm:px-8 relative z-10">

                {/* En-tête Brutal */}
                <div className="mb-32 flex flex-col md:flex-row md:items-end justify-between gap-12">
                    <div className="space-y-6">
                        <span className="font-mono text-[10px] text-accent uppercase tracking-[0.5em] font-black">Architecture Écosystème</span>
                        <h2 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tighter uppercase leading-none">
                            Systèmes en <br />
                            <span className="text-foreground/20 italic">Déploiement</span>.
                        </h2>
                    </div>
                    <Link
                        href="/initiatives"
                        className="inline-flex items-center gap-4 text-foreground/40 font-mono text-[10px] uppercase tracking-[0.4em] group hover:text-accent transition-colors py-4 border-b border-foreground/10 hover:border-accent"
                    >
                        Voir toutes les initiatives
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-500" />
                    </Link>
                </div>

                {/* Fiches techniques Brutales */}
                <div className="grid md:grid-cols-3 gap-px bg-foreground/5 border border-foreground/5 mb-32">
                    {projects.map((project) => (
                        <div
                            key={project.ref}
                            className="bg-background p-10 sm:p-12 group hover:bg-foreground/[0.015] transition-all duration-700 relative"
                        >
                            <div className="flex items-center justify-between mb-12">
                                <span className="font-mono text-[9px] text-foreground/30 uppercase tracking-[0.4em] font-black">
                                    {project.ref}
                                </span>
                                <div className={`px-3 py-1 bg-foreground/5 font-mono text-[8px] font-black uppercase tracking-[0.4em] ${project.statusColor}`}>
                                    {project.status}
                                </div>
                            </div>
                            <h3 className="text-2xl font-black uppercase tracking-tighter mb-6 group-hover:text-accent transition-colors duration-700">
                                {project.name}
                            </h3>
                            <p className="text-muted-foreground text-[13px] leading-relaxed uppercase tracking-widest opacity-60">
                                {project.description}
                            </p>
                            <div className="mt-12 pt-8 border-t border-foreground/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                                <span className="font-mono text-[9px] text-accent uppercase tracking-widest font-black">
                                    Détails techniques →
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Timeline - Intégrée Architecturalement */}
                <div className="mt-48 pt-32 border-t border-foreground/10">
                    <div className="mb-20 text-center md:text-left">
                        <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-[0.6em] block mb-6 px-4 py-1 border border-foreground/5 w-fit mx-auto md:mx-0">
                            Roadmap · Systémique
                        </span>
                        <h3 className="text-4xl font-black uppercase tracking-tighter">Évolution & Maturité.</h3>
                    </div>
                    <InteractiveTimeline />
                </div>

            </div>
        </section>
    );
}
