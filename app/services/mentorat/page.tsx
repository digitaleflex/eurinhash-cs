import type { Metadata } from 'next';
import Link from 'next/link';
import { GraduationCap, Code2, ShieldAlert, Cloud, ArrowRight, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Programme de Mentorat - Eurin Hash',
  description: 'Formation d\'élite et mentorat pratique en programmation, cybersécurité et cloud computing pour les talents émergents.',
};

function MentoratPageContent() {
  return (
    <main className="min-h-screen bg-background pt-32 pb-40">
      <div className="mx-auto max-w-4xl px-4 sm:px-8">
        <span className="font-mono text-xs text-accent tracking-widest uppercase block mb-6">Service · Formation d'Élite</span>
        <h1 className="text-5xl sm:text-7xl font-black tracking-tighter leading-[0.9] mb-12">
          Programme de<br />
          <span className="text-foreground/20 font-light italic">Mentorat.</span>
        </h1>

        <div className="grid gap-16 mt-20">
          <p className="text-xl text-muted-foreground leading-relaxed">
            Nous détectons et formons les hauts potentiels techniques. Un accompagnement rigoureux,
            basé sur la pratique réelle et les standards de l'industrie (EHAF).
          </p>

          {/* Pillars of Mentorship */}
          <div className="grid sm:grid-cols-3 gap-8">
            {[
              { icon: Code2, title: 'Programmation', desc: 'Architecture logicielle, Clean Code et algorithmique appliquée.' },
              { icon: ShieldAlert, title: 'Cybersécurité', desc: 'Hacking éthique, protection des données et audit de vulnérabilité.' },
              { icon: Cloud, title: 'Cloud Computing', desc: 'Déploiement Docker, orchestration et infrastructure-as-code.' }
            ].map((theme, i) => (
              <div key={i} className="p-8 border border-foreground/5 bg-foreground/[0.02] space-y-4 hover:border-accent/40 transition-all">
                <theme.icon className="w-8 h-8 text-accent" />
                <h3 className="text-lg font-bold tracking-tight">{theme.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{theme.desc}</p>
              </div>
            ))}
          </div>

          <div className="space-y-12 mt-8">
            <h2 className="text-3xl font-black tracking-tighter">Pourquoi ce programme ?</h2>
            <div className="grid gap-8">
              {[
                { title: 'Pratique Réelle', desc: 'Pas de théorie abstraite. Vous travaillez sur des environnements et des projets qui simulent des cas réels.' },
                { title: 'Sélection au Mérite', desc: 'Une intégration basée sur la motivation et la capacité d\'apprentissage, au sein de notre communauté.' },
                { title: 'Certification EHAF', desc: 'Une reconnaissance de vos compétences par Eurin Hash, validant votre capacité à intégrer des projets complexes.' }
              ].map((item, i) => (
                <div key={i} className="flex gap-6 items-start">
                  <CheckCircle2 className="w-6 h-6 text-accent shrink-0 mt-1" />
                  <div>
                    <h4 className="text-lg font-bold mb-1">{item.title}</h4>
                    <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16 p-10 bg-accent text-white relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
              <GraduationCap className="w-32 h-32" />
            </div>
            <h2 className="text-2xl font-bold mb-4">Prêt à franchir un palier technique ?</h2>
            <p className="mb-10 text-white/80 max-w-lg">
              Le mentorat n'est pas ouvert à tous. Nous cherchons la discipline et la passion.
              Si vous vous sentez prêt pour l'excellence, postulez.
            </p>
            <Link href="/contact?subject=Mentorat" className="inline-flex items-center gap-3 bg-white text-accent px-8 py-4 text-sm font-bold hover:bg-foreground hover:text-white transition-all">
              Postuler au programme <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

export default MentoratPageContent;
