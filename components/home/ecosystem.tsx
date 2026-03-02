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
        name: 'EHAF',
        status: 'BETA',
        statusColor: 'text-blue-400',
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
        <section className="py-24 sm:py-40 bg-background border-b border-foreground/5">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-8">

                {/* En-tête */}
                <div className="mb-20 sm:mb-32 flex flex-col md:flex-row md:items-end justify-between gap-8">
                    <div>
                        <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-[0.3em] block mb-6">
                            Initiatives · Écosystème
                        </span>
                        <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight">
                            Un écosystème en structuration.
                        </h2>
                    </div>
                    <Link
                        href="/projects"
                        className="inline-flex items-center gap-2 text-accent font-bold uppercase tracking-widest text-sm group"
                    >
                        Voir toutes les initiatives
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                {/* Fiches techniques */}
                <div className="divide-y divide-foreground/5 mb-24">
                    {projects.map((project) => (
                        <div
                            key={project.ref}
                            className="grid md:grid-cols-[1fr_auto] gap-8 items-start py-12 group hover:bg-foreground/[0.015] transition-colors -mx-4 px-4"
                        >
                            <div>
                                <div className="flex items-center gap-4 mb-4">
                                    <span className="font-mono text-[10px] text-muted-foreground/50 uppercase tracking-[0.3em]">
                                        {project.ref}
                                    </span>
                                    <span className={`font-mono text-[10px] font-bold uppercase tracking-[0.3em] ${project.statusColor}`}>
                                        {project.status}
                                    </span>
                                </div>
                                <h3 className="text-2xl sm:text-3xl font-black tracking-tight mb-4">
                                    {project.name}
                                </h3>
                                <p className="text-muted-foreground leading-relaxed max-w-2xl">
                                    {project.description}
                                </p>
                            </div>
                            <div className="hidden md:flex items-end justify-end pb-2">
                                <span className="font-mono text-[10px] text-foreground/20 group-hover:text-accent/40 transition-colors uppercase tracking-widest">
                                    {project.status} →
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Timeline */}
                <div className="border-t border-foreground/5 pt-20">
                    <div className="mb-12">
                        <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-[0.3em] block mb-4">
                            Feuille de route · 2024–2030+
                        </span>
                        <h3 className="text-2xl font-bold">Phases de déploiement.</h3>
                    </div>
                    <InteractiveTimeline />
                </div>

            </div>
        </section>
    );
}
