import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const items = [
    {
        id: '01',
        title: 'Audit de Résilience',
        description: 'Analyse complète de votre infrastructure en 5 jours. Identification des points de rupture, failles de sécurité et goulots d\'étranglement techniques.',
        details: ['Diagnostic profond', 'Rapport de risques', 'Plan d\'action immédiat'],
        href: '/services/audit'
    },
    {
        id: '02',
        title: 'Architecture de Système',
        description: 'Conception d\'infrastructures cloud et logicielles haute performance. Développement de socles modulaires, scalables et souverains.',
        details: ['Cloud Hybride', 'Multi-tenant SaaS', 'Souveraineté Data'],
        href: '/services/architecture'
    },
    {
        id: '03',
        title: 'Accompagnement CTO',
        description: 'Suivi stratégique pour guider votre direction technique. Prise de décision critique, recrutement d\'élite et culture de l\'excellence durable.',
        details: ['Mentor stratégique', 'Pipeline Talents', 'Leadership Tech'],
        href: '/services/cto'
    }
];

export default function Expertise() {
    return (
        <section className="py-24 sm:py-40 bg-background border-t border-foreground/5">
            <div className="mx-auto max-w-6xl px-4 sm:px-8">

                <div className="flex items-center gap-6 mb-24">
                    <span className="font-mono text-[10px] text-accent/80 tracking-widest uppercase font-bold">Solutions Stratégiques</span>
                    <div className="h-px flex-1 bg-foreground/5" />
                    <span className="font-mono text-[10px] text-foreground/20 tracking-widest uppercase">03 piliers · ehaf</span>
                </div>

                <div className="grid md:grid-cols-3 gap-px bg-foreground/5 border border-foreground/5 mb-24">
                    {items.map((item) => (
                        <div key={item.id} className="group bg-background p-10 sm:p-12 flex flex-col gap-10 hover:bg-foreground/[0.025] transition-all duration-500 relative">
                             {/* Barre accent au hover */}
                             <div className="absolute top-0 left-0 h-0.5 w-full bg-accent origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                            
                             <div className="font-mono text-[10px] text-foreground/20 tracking-widest pt-1 uppercase">
                                arch · {item.id}
                            </div>
                            
                            <div className="space-y-6 flex-1">
                                <h3 className="text-2xl font-bold tracking-tight text-foreground group-hover:text-accent transition-colors duration-300">
                                    {item.title}
                                </h3>
                                <p className="text-muted-foreground leading-relaxed text-sm sm:text-base font-normal">
                                    {item.description}
                                </p>
                            </div>

                            <div className="flex flex-wrap gap-x-6 gap-y-3 pt-6 border-t border-foreground/5">
                                {item.details.map((detail, i) => (
                                    <div key={i} className="flex items-center gap-2 group/tag">
                                        <div className="w-1 h-1 bg-accent/20 group-hover/tag:bg-accent rounded-full transition-colors duration-300" />
                                        <span className="font-mono text-[9px] text-foreground/40 tracking-tight group-hover/tag:text-foreground/60 transition-colors uppercase">
                                            {detail}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <Link 
                                href={item.href}
                                className="mt-4 inline-flex items-center gap-2 text-[10px] font-bold text-accent opacity-0 group-hover:opacity-100 transition-all duration-300"
                            >
                                En savoir plus <ArrowRight className="w-3 h-3" />
                            </Link>
                        </div>
                    ))}
                </div>

                {/* Bloc transversal */}
                <div className="bg-foreground text-background p-10 sm:p-14 flex flex-col md:flex-row items-center justify-between gap-12 group relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-0.5 h-full bg-accent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="space-y-3 text-center md:text-left">
                        <span className="font-mono text-[10px] text-accent tracking-widest uppercase opacity-80 block">Engagement d'élite</span>
                        <h4 className="text-2xl font-bold tracking-tight text-background">
                            Disponibilité & Souveraineté Digitale
                        </h4>
                    </div>
                    <div className="flex items-center gap-10 font-mono text-xs opacity-50 group-hover:opacity-100 transition-all duration-500">
                        <div className="flex flex-col gap-1">
                            <span className="text-background/40 text-[9px] tracking-widest uppercase">Modèle</span>
                            <span className="text-background font-medium tracking-tight">Zero-Trust</span>
                        </div>
                        <div className="w-px h-10 bg-background/10" />
                        <div className="flex flex-col gap-1">
                            <span className="text-background/40 text-[9px] tracking-widest uppercase">Standard</span>
                            <span className="text-background font-medium tracking-tight">API-First</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
