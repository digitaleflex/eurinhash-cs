import Link from 'next/link';
import { ArrowRight, GraduationCap, Users, Trophy } from 'lucide-react';

const hashcodeItems = [
    'Mentorat direct et personnalisé',
    'Projets réels sous environnement EHAF',
    'Certification architecturale interne',
];

const participationItems = [
    {
        title: 'Mentorat ouvert',
        desc: 'Session ouverte chaque premier vendredi du mois pour un diagnostic gratuit de structure.',
    },
    {
        title: 'Open Infrastructure',
        desc: 'Contribution aux standards de la fondation EurinHash.',
    },
];

export default function CommunautePage() {
    return (
        <main className="bg-background text-foreground min-h-screen pt-28 pb-40">
            <div className="mx-auto max-w-5xl px-4 sm:px-8">

                {/* Header */}
                <header className="mb-24 space-y-8">
                    <span className="font-mono text-xs text-accent tracking-tight font-medium block">
                        Pilier III — Avec qui ?
                    </span>
                    <h1 className="font-black tracking-tight text-foreground">
                        Transmission du savoir.<br />
                        <span className="text-foreground/25">Former, pas juste recruter.</span>
                    </h1>
                    <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl leading-relaxed font-normal" style={{ letterSpacing: '-0.01em' }}>
                        L'architecture se transmet. On ne cherche pas des profils parfaits —
                        on cherche des personnes capables d'apprendre à penser en systèmes.
                    </p>
                </header>

                <div className="grid lg:grid-cols-[2fr_1fr] gap-16 items-start">

                    {/* Hashcode */}
                    <section className="space-y-10">
                        <div className="flex items-center gap-5">
                            <div className="w-10 h-10 bg-foreground text-background flex items-center justify-center shrink-0">
                                <GraduationCap className="w-4 h-4" />
                            </div>
                            <h2 className="text-2xl font-bold tracking-tight">Hashcode</h2>
                        </div>

                        <div className="border border-foreground/5 p-8 sm:p-12 space-y-10">
                            <blockquote className="border-l-4 border-accent pl-6">
                                <p className="text-base text-foreground/80 leading-relaxed font-medium italic">
                                    "Un programme de mentorat rigoureux pour former les futurs architectes de systèmes.
                                    La sélection est basée sur la discipline et la constance — pas sur le CV."
                                </p>
                            </blockquote>

                            <div className="grid sm:grid-cols-2 gap-10 pt-8 border-t border-foreground/5">
                                <div className="space-y-4">
                                    <h3 className="text-sm font-bold tracking-tight text-accent">Le modèle</h3>
                                    <ul className="space-y-3">
                                        {hashcodeItems.map((item, i) => (
                                            <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground leading-relaxed">
                                                <span className="w-1.5 h-1.5 bg-accent rounded-full mt-2 shrink-0" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="space-y-4">
                                    <h3 className="text-sm font-bold tracking-tight text-accent">Programme</h3>
                                    <Link
                                        href="/initiatives/hashcode"
                                        className="flex items-center justify-between p-4 bg-foreground text-background text-sm font-semibold tracking-tight hover:bg-accent transition-colors group"
                                    >
                                        Voir le syllabus
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Sidebar */}
                    <aside className="space-y-10">
                        <div className="space-y-6">
                            <div className="flex items-center gap-3 border-b border-foreground/5 pb-4">
                                <Users className="w-4 h-4 text-foreground/30" />
                                <h3 className="text-sm font-bold tracking-tight">Participation</h3>
                            </div>
                            <div className="space-y-6">
                                {participationItems.map((item, i) => (
                                    <div key={i} className="space-y-1">
                                        <h4 className="text-sm font-semibold">{item.title}</h4>
                                        <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-accent p-8 space-y-6 text-white">
                            <Trophy className="w-6 h-6 opacity-50" />
                            <h3 className="text-lg font-bold tracking-tight leading-tight">
                                Devenir architecte.
                            </h3>
                            <p className="text-sm text-white/70 leading-relaxed">
                                Rejoignez le cercle des bâtisseurs de systèmes souverains.
                            </p>
                            <Link
                                href="/contact"
                                className="block w-full text-center border border-white/25 py-3 text-sm font-semibold tracking-tight hover:bg-white hover:text-accent transition-all"
                            >
                                Postuler au mentorat
                            </Link>
                        </div>
                    </aside>

                </div>
            </div>
        </main>
    );
}
