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
                    <span className="font-mono text-[10px] text-foreground/20 uppercase">03 piliers · systèmes</span>
                </div>

                <div className="grid md:grid-cols-3 gap-px bg-foreground/5 border border-foreground/5 mb-24 relative overflow-hidden">
                    {/* Decorative Grid Line */}
                    <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
                    
                    {items.map((item) => (
                        <div key={item.id} className="group bg-background p-10 sm:p-12 flex flex-col gap-10 hover:bg-foreground/[0.025] transition-all duration-500 relative">
                             {/* Technical Header */}
                             <div className="flex items-center justify-between">
                                <div className="font-mono text-[10px] text-foreground/20 tracking-widest uppercase">
                                    noeud_arch :: {item.id}
                                </div>
                                <div className="w-1.5 h-1.5 bg-foreground/5 group-hover:bg-accent transition-colors rounded-sm" />
                             </div>
                             
                             {/* Barre accent au hover */}
                             <div className="absolute top-0 left-0 h-0.5 w-full bg-accent origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                            
                            <div className="space-y-6 flex-1 relative">
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
                                        <div className="w-0.5 h-3 bg-accent/20 group-hover/tag:bg-accent transition-all duration-300" />
                                        <span className="font-mono text-[9px] text-foreground/40 tracking-tight group-hover/tag:text-foreground/60 transition-colors uppercase">
                                            {detail}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <Link 
                                href={item.href}
                                className="mt-4 inline-flex items-center gap-3 text-[10px] font-bold text-accent uppercase tracking-widest hover:gap-4 transition-all duration-300"
                            >
                                Explorer le service <ArrowRight className="w-3 h-3" />
                            </Link>
                        </div>
                    ))}
                </div>

                {/* Bloc transversal - System Report Style */}
                <div className="bg-foreground text-background p-10 sm:p-14 flex flex-col md:flex-row items-center justify-between gap-12 group relative overflow-hidden border-l-4 border-accent">
                    <div className="space-y-4 text-center md:text-left relative z-10">
                        <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                            <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                            <span className="font-mono text-[10px] text-accent uppercase font-bold">État du Protocole : Optimal</span>
                        </div>
                        <h4 className="text-2xl sm:text-3xl font-black tracking-tighter text-background leading-none">
                            Disponibilité & Souveraineté <br className="hidden sm:block" /> Digitale Sans Compromis.
                        </h4>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-8 md:gap-16 font-mono text-xs relative z-10">
                        <div className="flex flex-col gap-2">
                            <span className="text-background/30 text-[9px] uppercase font-bold">Norme_ISO</span>
                            <span className="text-background font-black tracking-tighter text-lg underline decoration-accent/30 decoration-2 underline-offset-4">CONFORME_27001</span>
                        </div>
                        <div className="flex flex-col gap-2">
                            <span className="text-background/30 text-[9px] uppercase font-bold">Architecture</span>
                            <span className="text-background font-black tracking-tighter text-lg underline decoration-accent/30 decoration-2 underline-offset-4">SOUVERAINETÉ_DÉCOUPLÉE</span>
                        </div>
                    </div>

                    {/* Background architectural details */}
                    <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none translate-x-1/4 translate-y-1/4 rotate-12">
                        <svg width="300" height="300" viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="10" y="10" width="280" height="280" stroke="white" strokeWidth="0.5" strokeDasharray="5 5" />
                            <circle cx="150" cy="150" r="100" stroke="white" strokeWidth="0.5" />
                            <line x1="150" y1="0" x2="150" y2="300" stroke="white" strokeWidth="0.5" />
                            <line x1="0" y1="150" x2="300" y2="150" stroke="white" strokeWidth="0.5" />
                        </svg>
                    </div>
                </div>
            </div>
        </section>
    );
}
