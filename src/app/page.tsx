import Link from "next/link";
import { ArrowRight, ArrowUpRight, Boxes, Cloud, Code2, Cpu, Layers3, LockKeyhole, Network, ShieldCheck, Sparkles } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Button } from "@/components/ui/button";

const projects = [
  { name: "AURA Storage", status: "En développement", description: "Une base de stockage numérique pensée pour organiser et distribuer des fichiers de manière maîtrisée.", tags: ["Stockage", "Infrastructure", "API"], mark: "AURA" },
  { name: "HashCode", status: "Écosystème en construction", description: "Un écosystème d'apprentissage et de pratique autour des technologies numériques.", tags: ["Communauté", "Éducation", "Tech"], mark: "HC" },
  { name: "E-Flex", status: "Initiative numérique", description: "Une initiative de conseil et d'ingénierie numérique orientée vers des besoins concrets.", tags: ["Conseil", "Ingénierie", "Digital"], mark: "EF" },
];

const services = [
  { icon: Network, title: "Architecture des systèmes", description: "Structurer des solutions cohérentes, maintenables et adaptées à leurs contraintes." },
  { icon: Cloud, title: "Cloud & infrastructure", description: "Déployer et organiser des environnements techniques avec une approche pragmatique." },
  { icon: ShieldCheck, title: "Sécurité technique", description: "Examiner les risques et intégrer de bonnes pratiques de sécurité aux systèmes." },
  { icon: Code2, title: "Produits numériques", description: "Prototyper et développer des outils qui répondent à des besoins identifiés." },
];

const process = [
  { number: "01", title: "Comprendre", description: "Clarifier le besoin, les contraintes et le résultat attendu." },
  { number: "02", title: "Concevoir", description: "Choisir une architecture et une trajectoire technique adaptées." },
  { number: "03", title: "Construire", description: "Développer, tester et documenter la solution." },
  { number: "04", title: "Améliorer", description: "Mesurer, sécuriser et faire évoluer ce qui a été construit." },
];

const notes = [
  { date: "À venir", category: "Architecture", title: "Comment choisir une architecture adaptée à un projet ?" },
  { date: "À venir", category: "Infrastructure", title: "Les bases d'une infrastructure fiable et observable" },
];

export default function HomePage() {
  return (
    <>
      <SiteHeader current="/" />
      <main>
        <section className="hero">
          <div className="space-backdrop" aria-hidden="true"><div className="space-orbit" /></div>
          <div className="container-shell hero-content">
            <div className="eyebrow">Architecture technologique · Entrepreneuriat numérique</div>
            <h1 className="hero-title">De l’idée<br />au <span className="accent">système.</span></h1>
            <p className="hero-copy">Nous transformons des besoins concrets en solutions technologiques pensées avec méthode.</p>
            <div className="hero-actions">
              <Button asChild size="lg"><Link href="/projets">Découvrir les projets <ArrowRight size={16} /></Link></Button>
              <Button asChild size="lg" variant="secondary"><Link href="/contact">Parlons de votre projet <ArrowUpRight size={16} /></Link></Button>
            </div>
            <div className="hero-meta" aria-label="Domaines d'intervention">
              <span><i /> Architecture</span>
              <span><i /> Cloud & infrastructure</span>
              <span><i /> Sécurité</span>
              <span><i /> Produits numériques</span>
            </div>
          </div>
        </section>

        <section className="section border-t border-white/[0.07]">
          <div className="container-shell">
            <div className="section-heading">
              <div><div className="section-kicker">Réalisations sélectionnées</div><h2 className="section-title">Des idées mises à l’épreuve du réel.</h2><p className="section-copy">Quelques initiatives qui illustrent une approche orientée conception, expérimentation et construction.</p></div>
              <Link href="/projets" className="text-link">Tous les projets <ArrowRight size={15} /></Link>
            </div>
            <div className="project-grid">
              {projects.map((project) => (
                <article className="project-card" key={project.name}>
                  <div className="project-visual" aria-hidden="true"><div className="project-orb" /><div className="project-monogram">{project.mark}</div></div>
                  <div className="project-content">
                    <div className="status">{project.status}</div>
                    <h3 className="project-title">{project.name}</h3>
                    <p className="project-description">{project.description}</p>
                    <div className="project-tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section section-tight border-t border-white/[0.07]">
          <div className="container-shell">
            <div className="section-heading">
              <div><div className="section-kicker">Domaines d’intervention</div><h2 className="section-title">Relier la vision à l’ingénierie.</h2></div>
              <Link href="/services" className="text-link">Voir les services <ArrowRight size={15} /></Link>
            </div>
            <div className="service-grid">
              {services.map(({ icon: Icon, title, description }) => (
                <article className="service-card" key={title}>
                  <div className="service-icon"><Icon size={21} strokeWidth={1.7} /></div>
                  <h3 className="service-title">{title}</h3>
                  <p className="service-description">{description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section section-tight border-t border-white/[0.07]">
          <div className="container-shell">
            <div className="section-kicker">Méthode de travail</div>
            <h2 className="section-title">Avancer avec intention.</h2>
            <p className="section-copy mb-7">Un cadre simple pour décider, construire et apprendre sans perdre de vue l’objectif.</p>
            <div className="process-grid">
              {process.map((step) => <article className="process-step" key={step.number}><div className="process-number">{step.number}</div><h3 className="process-title">{step.title}</h3><p className="process-copy">{step.description}</p></article>)}
            </div>
          </div>
        </section>

        <section className="section border-t border-white/[0.07]">
          <div className="container-shell split-grid">
            <div className="about-panel">
              <div className="section-kicker">La vision derrière la marque</div>
              <h2 className="section-title">Technologie avec intention.</h2>
              <p className="section-copy">EURINHASH est une marque portée par une démarche d’architecture technologique et d’entrepreneuriat numérique : comprendre le problème, faire des choix clairs et construire des solutions utiles.</p>
              <div className="mt-6"><Button asChild variant="secondary"><Link href="/a-propos">Découvrir la démarche <ArrowRight size={15} /></Link></Button></div>
            </div>
            <div>
              <div className="section-kicker">Notes & analyses</div>
              <h2 className="section-title">Réflexions en cours.</h2>
              <div className="note-list mt-6">
                {notes.map((note) => <article className="note-row" key={note.title}><div className="note-meta"><span>{note.category}</span><span>·</span><span>{note.date}</span></div><h3 className="note-title">{note.title}</h3></article>)}
              </div>
              <Link href="/notes" className="text-link mt-5">Explorer les notes <ArrowRight size={15} /></Link>
            </div>
          </div>
        </section>

        <section className="section-tight">
          <div className="container-shell">
            <div className="cta-panel">
              <div className="cta-inner">
                <div><div className="section-kicker">Une idée à explorer ?</div><h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-[-0.05em] sm:text-4xl">Construisons quelque chose d’utile.</h2><p className="mt-3 max-w-xl text-sm leading-6 text-white/60">Partagez votre besoin. Nous commencerons par clarifier le problème avant de choisir la solution.</p></div>
                <Button asChild size="lg"><Link href="/contact">Initier une conversation <ArrowUpRight size={16} /></Link></Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
