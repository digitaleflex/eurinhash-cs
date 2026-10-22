import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Button } from "@/components/ui/button";

const pages = {
  "projets": {
    title: "Des projets, pas seulement des idées.",
    eyebrow: "Réalisations",
    description: "Une sélection de projets et d’expérimentations. Chaque fiche doit expliquer le besoin, le rôle exercé, les décisions techniques et l’état réel de la réalisation.",
    blocks: [
      { title: "AURA Storage", state: "En développement", text: "Projet d’infrastructure de stockage numérique. La documentation publique détaillera progressivement l’architecture, les choix techniques et les capacités effectivement disponibles." },
      { title: "HashCode", state: "En construction", text: "Initiative d’apprentissage et de pratique technologique. Les réalisations présentées distingueront les fonctionnalités disponibles des éléments encore en préparation." },
      { title: "E-Flex", state: "Initiative numérique", text: "Activité de conseil et d’ingénierie numérique. Les contributions et prestations seront décrites selon le périmètre réellement réalisé." }
    ],
  },
  "services": {
    title: "De la clarté technique à la solution.",
    eyebrow: "Services",
    description: "Un périmètre de collaboration orienté conception, développement et infrastructure. Chaque mission commence par la clarification du besoin et des contraintes.",
    blocks: [
      { title: "Cadrage & conception technique", state: "Selon le besoin", text: "Clarification des objectifs, des contraintes, des options d’architecture et des compromis avant l’implémentation." },
      { title: "Cloud & infrastructure", state: "Périmètre à définir", text: "Accompagnement sur le déploiement, l’organisation, l’observabilité et la maintenabilité d’environnements techniques." },
      { title: "Prototypage & développement", state: "Périmètre à définir", text: "Construction progressive de solutions numériques pour tester une idée ou répondre à un besoin identifié." },
      { title: "Revue technique & sécurité", state: "Selon le périmètre", text: "Examen ciblé de pratiques, configurations et risques techniques dans un périmètre convenu à l’avance." }
    ],
  },
  "a-propos": {
    title: "Une approche transversale, guidée par le réel.",
    eyebrow: "À propos",
    description: "EURINHASH est porté par Eurin Hash, architecte technologique et entrepreneur numérique. Le positionnement repose sur la conception des systèmes, l’expérimentation technique et la construction de produits.",
    blocks: [
      { title: "Penser en systèmes", state: "Principe", text: "Comprendre les interactions, les contraintes et le cycle de vie d’une solution avant de choisir les outils." },
      { title: "Construire et documenter", state: "Principe", text: "Transformer progressivement les hypothèses en réalisations vérifiables, en rendant les décisions techniques compréhensibles." },
      { title: "Apprendre en continu", state: "Principe", text: "Rester lucide sur les limites, tester les idées et faire évoluer les solutions à partir de ce que l’expérience révèle." }
    ],
  },
  "notes": {
    title: "Notes de terrain et réflexions techniques.",
    eyebrow: "Notes & analyses",
    description: "Un espace éditorial pour documenter des apprentissages, des choix d’architecture et des retours d’expérience. Les notes seront publiées au fil de travaux réellement effectués.",
    blocks: [
      { title: "Comment choisir une architecture adaptée à un projet ?", state: "Brouillon éditorial", text: "Un futur article sur les objectifs, contraintes, coûts d’exploitation, évolutivité et arbitrages d’architecture." },
      { title: "Les bases d’une infrastructure fiable et observable", state: "Brouillon éditorial", text: "Un futur article sur la visibilité opérationnelle, la journalisation, les métriques et les vérifications utiles." },
      { title: "La sécurité dès la conception", state: "Brouillon éditorial", text: "Un futur article sur les limites de confiance, la réduction de surface d’attaque et la sécurité intégrée au cycle de développement." }
    ],
  },
  "contact": {
    title: "Parlons du problème avant de choisir la solution.",
    eyebrow: "Contact",
    description: "Pour une demande de collaboration, une question technique ou un projet à étudier, commencez par partager le contexte et le résultat que vous recherchez.",
    blocks: [
      { title: "Ce qui aide à démarrer", state: "Pour préparer l’échange", text: "Quelques lignes sur le contexte, le résultat attendu, les contraintes connues et le calendrier souhaité suffisent pour un premier échange." },
      { title: "Un échange clair", state: "Sans engagement automatique", text: "Le premier objectif est de comprendre la demande et de déterminer si le périmètre correspond à une collaboration pertinente." }
    ],
  }
} as const;

type PageSlug = keyof typeof pages;

export function generateStaticParams() {
  return Object.keys(pages).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  if (!(slug in pages)) return {};
  const page = pages[slug as PageSlug];
  return { title: page.eyebrow, description: page.description };
}

export default async function ContentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!(slug in pages)) notFound();
  const page = pages[slug as PageSlug];

  return (
    <>
      <SiteHeader current={`/${slug}`} />
      <main className="relative min-h-[70vh] overflow-hidden">
        <div className="space-backdrop" aria-hidden="true"><div className="space-orbit" /></div>
        <div className="container-shell relative z-10 py-20 sm:py-28">
          <Link href="/" className="mb-12 inline-flex items-center gap-2 text-sm text-white/55 transition hover:text-white"><ArrowLeft size={15} /> Retour à l’accueil</Link>
          <div className="eyebrow">{page.eyebrow}</div>
          <h1 className="hero-title max-w-4xl text-5xl sm:text-7xl">{page.title}</h1>
          <p className="hero-copy max-w-2xl">{page.description}</p>
          <div className="mt-14 grid gap-4 md:grid-cols-2">
            {page.blocks.map((block) => <article key={block.title} className="rounded-2xl border border-white/10 bg-[#0b1323]/75 p-6 sm:p-7">
              <div className="mb-4 flex items-center gap-2 text-xs text-blue-300"><CheckCircle2 size={14} /> {block.state}</div>
              <h2 className="text-xl font-semibold tracking-tight">{block.title}</h2>
              <p className="mt-3 text-sm leading-7 text-white/60">{block.text}</p>
            </article>)}
          </div>
          <div className="mt-12"><Button asChild size="lg"><Link href="/contact">Parlons de votre besoin <ArrowUpRight size={16} /></Link></Button></div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
