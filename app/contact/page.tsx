'use client';

import { MessageSquare, ArrowRight, MapPin, Shield, HelpCircle } from 'lucide-react';

const trustSignals = [
  { title: 'Contexte d’abord', desc: 'Le premier échange sert à comprendre le problème, les contraintes et l’objectif.' },
  { title: 'Échange direct', desc: 'Vous échangez directement avec la personne qui analyse le sujet.' },
  { title: 'Vous gardez le contrôle', desc: 'WhatsApp s’ouvre avec un message prérempli. Vous le relisez et choisissez de l’envoyer.' },
];

const channels = [
  { icon: MessageSquare, label: 'WhatsApp', value: '+229 01 62 26 52 46', href: 'https://wa.me/2290162265246?text=Bonjour%20Eurin%2C%20je%20vous%20contacte%20depuis%20votre%20portfolio.' },
];

const faqs = [
  { q: 'Que faut-il fournir pour commencer ?', a: 'Un contexte court, le problème rencontré, l’objectif recherché et, si possible, les principales contraintes.' },
  { q: 'Travaillez-vous sur des systèmes existants ?', a: 'Oui. Une intervention peut commencer par l’analyse d’un système existant avant toute recommandation.' },
  { q: 'Que se passe-t-il après le clic ?', a: 'WhatsApp s’ouvre avec votre message prérempli. Relisez-le, puis appuyez sur Envoyer pour me le transmettre.' },
];

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background pb-40 pt-28 text-foreground">
      <div className="mx-auto max-w-6xl px-4 sm:px-8">
        <header className="mb-20 max-w-3xl space-y-6">
          <span className="block font-mono text-xs font-bold tracking-[0.16em] text-accent uppercase">Contact</span>
          <h1 className="text-5xl font-black leading-[0.94] tracking-tight sm:text-7xl">
            Parlons du problème
            <br />
            <span className="text-foreground/25">à résoudre.</span>
          </h1>
          <p className="text-xl leading-relaxed text-muted-foreground">
            Décrivez votre projet ou votre besoin en m’écrivant directement sur WhatsApp, sans passer par un formulaire.
          </p>
        </header>

        <div className="mb-20 grid border-y border-foreground/5 py-10 sm:grid-cols-3">
          {trustSignals.map((signal) => (
            <div key={signal.title} className="border-b border-foreground/5 py-5 last:border-0 sm:border-b-0 sm:border-r sm:px-8 sm:first:pl-0 sm:last:border-r-0 sm:last:pr-0">
              <h2 className="text-sm font-bold">{signal.title}</h2>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{signal.desc}</p>
            </div>
          ))}
        </div>

        <div className="grid items-start gap-16 lg:grid-cols-[1.5fr_1fr]">
          <div className="space-y-20">
            <section>
              <div className="mb-8 flex items-center gap-4">
                <h2 className="text-2xl font-black tracking-tight">Préparer votre message</h2>
                <div className="h-px flex-1 bg-foreground/5" />
              </div>
              <div className="border border-foreground/10 p-8 sm:p-10">
                <p className="max-w-xl text-base leading-relaxed text-muted-foreground">
                  Pas de formulaire à remplir : contactez-moi directement sur WhatsApp. Un message de départ sera prérempli ; vous pourrez le modifier avant de l’envoyer.
                </p>
                <a
                  href="https://wa.me/2290162265246?text=Bonjour%20Eurin%2C%20je%20vous%20contacte%20depuis%20votre%20portfolio.%20J%E2%80%99aimerais%20%C3%A9changer%20avec%20vous%20au%20sujet%20d%E2%80%99un%20projet."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-flex items-center justify-center gap-3 rounded-full bg-accent px-7 py-4 text-base font-semibold text-white transition hover:opacity-90"
                >
                  <MessageSquare className="h-5 w-5" aria-hidden="true" />
                  Me contacter sur WhatsApp
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </a>
                <p className="mt-5 text-xs leading-relaxed text-muted-foreground">
                  Le site ne stocke aucun message de contact. L’envoi est confirmé par vous directement dans WhatsApp.
                </p>
              </div>
            </section>

            <section>
              <div className="mb-8 flex items-center gap-3">
                <HelpCircle className="h-5 w-5 text-accent" aria-hidden="true" />
                <h2 className="text-xl font-bold tracking-tight">Questions fréquentes</h2>
              </div>
              <div className="grid gap-4">
                {faqs.map((faq) => (
                  <div key={faq.q} className="border border-foreground/5 p-6">
                    <h3 className="text-sm font-bold">{faq.q}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{faq.a}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <aside className="space-y-10 lg:sticky lg:top-32">
            <div>
              <h2 className="border-b border-foreground/5 pb-4 font-mono text-[10px] font-bold tracking-widest text-muted-foreground uppercase">Canaux</h2>
              <div className="mt-4 grid gap-3">
                {channels.map((channel) => (
                  <a key={channel.label} href={channel.href} target={channel.href.startsWith('http') ? '_blank' : undefined} rel={channel.href.startsWith('http') ? 'noopener noreferrer' : undefined} className="flex items-center justify-between border border-foreground/5 p-5 hover:border-accent/30">
                    <div className="flex items-center gap-4">
                      <channel.icon className="h-5 w-5 text-accent" aria-hidden="true" />
                      <div><span className="block font-mono text-[9px] uppercase text-muted-foreground">{channel.label}</span><span className="text-sm font-bold">{channel.value}</span></div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>

            <div className="border border-foreground/10 bg-foreground p-7 text-background">
              <Shield className="mb-5 h-6 w-6 text-accent" aria-hidden="true" />
              <h2 className="text-lg font-bold">Envoi maîtrisé</h2>
              <p className="mt-3 text-xs leading-relaxed text-background/60">
                Votre message est ouvert dans WhatsApp. Évitez d’y inclure des mots de passe ou des informations confidentielles inutiles.
              </p>
            </div>

            <div className="flex items-start gap-4 border border-foreground/5 p-6">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
              <div><p className="text-sm font-bold">Base opérationnelle</p><p className="mt-1 text-xs leading-relaxed text-muted-foreground">Abomey-Calavi, Bénin · travail à distance possible.</p></div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
