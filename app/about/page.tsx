import { Target, Shield, Leaf } from 'lucide-react';
import Image from 'next/image';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'À propos - Eurin Hash | Consultant IT & Entrepreneur Numérique',
  description: 'Découvrez le parcours d\'Eurin Hash, consultant IT et entrepreneur numérique. Passionné par l\'innovation technologique et la transformation numérique.',
  openGraph: {
    title: 'À propos - Eurin Hash | Consultant IT & Entrepreneur Numérique',
    description: 'Découvrez le parcours d\'Eurin Hash, consultant IT et entrepreneur numérique. Passionné par l\'innovation technologique et la transformation numérique.',
    url: 'https://eurinhash.com/about',
    type: 'website',
  },
};

export default function AboutPage() {
  return (
    <main className="relative isolate">
      {/* Hero Section */}
      <section className="mx-auto max-w-4xl px-6 md:px-8 py-16 sm:py-20 md:py-28">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Eurin Hash
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Consultant IT & Entrepreneur Numérique
          </p>
          <div className="flex items-center justify-center mb-8">
            <div className="relative h-32 w-32 rounded-full overflow-hidden border-2 border-accent/20 shadow-lg hover:shadow-xl hover:border-accent/40 transition-all duration-300 hover:scale-105">
              <Image
                src="/eurin-photo.webp"
                alt="Eurin Hash - Portrait professionnel"
                fill
                className="object-cover object-center"
                sizes="128px"
                priority
              />
            </div>
          </div>
        </div>

        {/* Bio */}
        <div className="prose prose-lg mx-auto text-center max-w-3xl">
          <p className="text-lg leading-relaxed mb-6">
            Passionné par l'innovation technologique et l'entrepreneuriat, je
            conçois des solutions cloud et web au croisement de performance et
            simplicité. Mon approche privilégie la clarté, la sécurité et la
            durabilité des systèmes.
          </p>
          <p className="text-lg leading-relaxed mb-8">
            Fondateur d'E-FLEX, j'accompagne les entreprises dans leur
            transformation numérique tout en formant la prochaine génération de
            talents IT. Ma vision : une technologie accessible, souveraine et
            conçue pour durer.
          </p>
        </div>
      </section>

      {/* Parcours */}
      <section className="py-16 sm:py-20 bg-muted">
        <div className="mx-auto max-w-4xl px-6 md:px-8">
          <h2 className="text-3xl font-bold tracking-tight mb-12 text-center">
            Mon parcours
          </h2>
          <div className="space-y-8">
            <div className="border-l-2 border-accent pl-6 group hover:bg-background/50 p-4 rounded-lg transition-all duration-300">
              <h3 className="text-xl font-semibold mb-2 group-hover:text-accent transition-colors">
                2024 - Présent
              </h3>
              <h4 className="text-lg font-medium text-accent mb-2">
                Fondateur & CEO - E-FLEX
              </h4>
              <p className="text-muted-foreground">
                Création et développement d'une société de conseil IT
                spécialisée dans les solutions cloud, le développement web et la
                formation technologique.
              </p>
            </div>

            <div className="border-l-2 border-accent pl-6 group hover:bg-background/50 p-4 rounded-lg transition-all duration-300">
              <h3 className="text-xl font-semibold mb-2 group-hover:text-accent transition-colors">
                2023 - 2024
              </h3>
              <h4 className="text-lg font-medium text-accent mb-2">
                Consultant IT Indépendant
              </h4>
              <p className="text-muted-foreground">
                Développement de solutions web innovantes pour des clients
                variés, de la spiritualité numérique aux plateformes
                agro-industrielles.
              </p>
            </div>

            <div className="border-l-2 border-accent pl-6 group hover:bg-background/50 p-4 rounded-lg transition-all duration-300">
              <h3 className="text-xl font-semibold mb-2 group-hover:text-accent transition-colors">
                Formation Continue
              </h3>
              <h4 className="text-lg font-medium text-accent mb-2">
                Autodidacte Technologique
              </h4>
              <p className="text-muted-foreground">
                Veille technologique constante, spécialisation en cloud
                computing, DevOps, et technologies web modernes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Valeurs */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-6 md:px-8">
          <h2 className="text-3xl font-bold tracking-tight mb-12 text-center">
            Mes valeurs
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 group hover:bg-muted/50 rounded-xl transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <div className="h-16 w-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-accent/20 to-accent/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Target className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-3 group-hover:text-accent transition-colors">
                Clarté
              </h3>
              <p className="text-muted-foreground">
                Des solutions simples, compréhensibles et efficaces. La
                complexité technique ne doit jamais nuire à l'expérience
                utilisateur.
              </p>
            </div>

            <div className="text-center p-6 group hover:bg-muted/50 rounded-xl transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <div className="h-16 w-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-accent/20 to-accent/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Shield className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-3 group-hover:text-accent transition-colors">
                Sécurité
              </h3>
              <p className="text-muted-foreground">
                La sécurité by design dans chaque projet. Protection des données
                et respect de la vie privée sont prioritaires.
              </p>
            </div>

            <div className="text-center p-6 group hover:bg-muted/50 rounded-xl transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <div className="h-16 w-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-accent/20 to-accent/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Leaf className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-3 group-hover:text-accent transition-colors">
                Durabilité
              </h3>
              <p className="text-muted-foreground">
                Concevoir pour durer. Technologies pérennes, code maintenable et
                impact environnemental maîtrisé.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 sm:py-20 bg-muted">
        <div className="mx-auto max-w-3xl px-6 md:px-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight mb-6">
            Travaillons ensemble
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Vous avez un projet, une idée ou simplement envie d'échanger ? Je
            serais ravi de discuter avec vous.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="/start-project"
              className="inline-flex items-center gap-2 rounded-full bg-accent text-white px-6 py-3 text-sm font-medium transition hover:shadow-[0_10px_40px_-10px] hover:shadow-accent/30 hover:scale-105 active:scale-95"
            >
              Démarrer un projet
            </a>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-foreground/20 px-6 py-3 text-sm font-medium text-foreground transition hover:border-accent hover:text-accent hover:scale-105 active:scale-95"
            >
              Me contacter
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
