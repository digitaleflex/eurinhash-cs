import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import InteractiveTimeline from '@/components/interactive-timeline';

const projects = [
    {
        ref: 'EHAF-INFRA-01',
        name: 'FlexHOST',
        status: 'Alpha',
        statusColor: 'text-yellow-500',
        description: 'Infrastructure cloud modulaire pour l\'hébergement local et la résilience des données souveraines.',
        href: '/initiatives/flexhost',
    },
    {
        ref: 'EHAF-ARCH-01',
        name: 'EHAF Framework',
        status: 'Beta',
        statusColor: 'text-blue-400',
        description: 'Socle reproductible pour structurer tout projet d\'infrastructure d\'envergure.',
        href: '/architecture/ehaf',
    },
    {
        ref: 'EHAF-EDU-01',
        name: 'Académie Hashcode',
        status: 'En structuration',
        statusColor: 'text-muted-foreground',
        description: 'Formation systémique pour transformer les développeurs en architectes de systèmes.',
        href: '/initiatives/hashcode',
    },
];

export default function Ecosystem() {
    return (
        <section className="py-24 sm:py-40 bg-background border-b border-foreground/5">
            <div className="mx-auto max-w-6xl px-4 sm:px-8">

                <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-10">
                    <div className="space-y-4">
                        <span className="font-mono text-xs text-accent tracking-tight font-medium block">
                            Systèmes actifs
                        </span>
                        <h2 className="font-black tracking-tight text-foreground">
                            Ce qu'on déploie<br />
                            <span className="text-foreground/25 italic">en ce moment.</span>
                        </h2>
                    </div>
                    <Link
                        href="/initiatives"
                        className="inline-flex items-center gap-3 text-sm font-medium text-muted-foreground hover:text-accent transition-colors group shrink-0"
                    >
                        Toutes les initiatives
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                {/* Cartes projets */}
                <div className="grid md:grid-cols-3 gap-px bg-foreground/5 border border-foreground/5 mb-24">
                    {projects.map((project) => (
                        <Link
                            key={project.ref}
                            href={project.href}
                            className="bg-background p-8 sm:p-10 group hover:bg-foreground/[0.02] transition-all duration-500 flex flex-col gap-6"
                        >
                            <div className="flex items-center justify-between">
                                <span className="font-mono text-[10px] text-foreground/25 tracking-tight">
                                    {project.ref}
                                </span>
                                <span className={`font-mono text-[10px] font-medium px-2 py-0.5 bg-foreground/5 ${project.statusColor}`}>
                                    {project.status}
                                </span>
                            </div>
                            <h3 className="text-lg font-bold tracking-tight group-hover:text-accent transition-colors duration-300">
                                {project.name}
                            </h3>
                            <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                                {project.description}
                            </p>
                            <div className="flex items-center gap-2 text-xs font-medium text-accent opacity-0 group-hover:opacity-100 transition-all duration-300 pt-2 border-t border-foreground/5">
                                Voir les détails <ArrowRight className="w-3 h-3" />
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Timeline */}
                <div className="pt-16 border-t border-foreground/5">
                    <div className="mb-12 flex items-center gap-4">
                        <span className="font-mono text-xs text-muted-foreground tracking-tight">Feuille de route</span>
                        <div className="h-px flex-1 bg-foreground/5" />
                    </div>
                    <h3 className="text-2xl font-bold tracking-tight mb-12">Évolution & Maturité</h3>
                    <InteractiveTimeline />
                </div>

            </div>
        </section>
    );
}
