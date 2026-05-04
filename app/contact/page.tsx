'use client';

import React from 'react';
import { Mail, Linkedin, MessageSquare, ArrowRight, MapPin, Shield, Clock, UserCheck, HelpCircle, Loader2 } from 'lucide-react';
import { ContactForm } from '@/components/contact-form';


const trustSignals = [
  { icon: Clock, title: 'Réponse sous 24h', desc: 'Délai maximum garanti pour toute demande technique.' },
  { icon: UserCheck, title: 'Expert Direct', desc: 'Pas de commercial. Vous parlez directement à l\'architecte.' },
  { icon: Shield, title: 'NDA / Confidentialité', desc: 'Vos données et vos idées sont sécurisées dès le premier contact.' },
];

const channels = [
  { icon: Mail, label: 'Email Professionnel', value: 'contact@eurinhash.com', href: 'mailto:contact@eurinhash.com' },
  { icon: MessageSquare, label: 'WhatsApp direct', value: '+229 01 62 26 52 46', href: 'https://wa.me/2290162265246' },
  { icon: Linkedin, label: 'LinkedIn', value: 'Eurin Almeida', href: 'https://www.linkedin.com/in/eurindalemeida/' },
];

const faqs = [
  { q: 'Quels sont vos délais pour un audit ?', a: 'Un audit complet de 5 jours peut généralement démarrer sous 2 semaines.' },
  { q: 'Travaillez-vous sur des projets existants ?', a: 'Oui, nous intervenons souvent pour stabiliser des systèmes déjà en production.' },
  { q: 'Proposez-vous du développement pur ?', a: 'Nous nous concentrons sur l\'architecture et la structure, mais nous pouvons recommander des partenaires pour l\'exécution.' },
];

export default function ContactPage() {
  return (
    <main className="bg-background text-foreground min-h-screen pt-28 pb-40">
      <div className="mx-auto max-w-6xl px-4 sm:px-8">

        {/* Header Stratégique */}
        <header className="mb-24 space-y-8 max-w-3xl">
          <span className="font-mono text-xs text-accent tracking-widest font-bold block uppercase">
            Point de Contact Unique
          </span>
          <h1 className="text-5xl sm:text-7xl font-black tracking-tighter leading-[0.9] text-foreground">
            Lançons une<br />
            <span className="text-foreground/20 font-light italic">discussion utile.</span>
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed font-normal">
            Que ce soit pour un audit critique, une refonte d'architecture ou un projet de mentorat,
            votre demande est traitée avec la plus haute priorité.
          </p>
        </header>

        {/* Filtre de Confiance */}
        <div className="grid sm:grid-cols-3 gap-8 mb-24 py-12 border-y border-foreground/5">
          {trustSignals.map((signal) => (
            <div key={signal.title} className="flex gap-5 items-start">
              <signal.icon className="w-6 h-6 text-accent shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-sm mb-1">{signal.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{signal.desc}</p>
              </div>
            </div>
          ))}
        </div>


        <div className="grid lg:grid-cols-[1.6fr_1fr] gap-20 items-start">

          {/* Formulaire & FAQ */}
          <div className="space-y-24">
            <section>
              <div className="flex items-center gap-4 mb-10">
                <h2 className="text-2xl font-black tracking-tight">Transmission Sécurisée</h2>
                <div className="h-px flex-1 bg-foreground/5" />
              </div>
              <div className="border border-foreground/5 p-8 sm:p-12 bg-foreground/[0.01]">
                <React.Suspense fallback={<div className="h-64 flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-accent" /></div>}>
                  <ContactForm />
                </React.Suspense>
              </div>
            </section>

            <section className="space-y-10">
              <div className="flex items-center gap-4">
                <HelpCircle className="w-5 h-5 text-accent" />
                <h2 className="text-xl font-bold tracking-tight">Sujets Fréquents</h2>
              </div>
              <div className="grid gap-6">
                {faqs.map((faq) => (
                  <div key={faq.q} className="p-6 border border-foreground/5 hover:border-accent/20 transition-colors">
                    <h4 className="font-bold text-sm mb-2">{faq.q}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
                  </div>
                ))}
              </div>

            </section>
          </div>

          {/* Sidebar Authority */}
          <aside className="space-y-12 sticky top-32">

            {/* Canaux directs */}
            <div className="space-y-6">
              <h3 className="text-[10px] font-mono font-bold tracking-widest uppercase text-foreground/40 border-b border-foreground/5 pb-4">
                Connectivité Directe
              </h3>
              <div className="grid gap-3">
                {channels.map((chan) => (
                  <a
                    key={chan.label}
                    href={chan.href}
                    target={chan.href.startsWith('http') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-5 border border-foreground/5 hover:border-accent/40 hover:bg-foreground/[0.02] transition-all group"
                  >
                    <div className="flex items-center gap-5">

                      <chan.icon className="w-5 h-5 text-foreground/20 group-hover:text-accent transition-colors" />
                      <div>
                        <span className="font-mono text-[9px] text-muted-foreground block mb-0.5 uppercase tracking-tighter">{chan.label}</span>
                        <span className="text-sm font-bold tracking-tight">{chan.value}</span>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-foreground/10 group-hover:text-accent group-hover:translate-x-1 transition-all" />

                  </a>
                ))}
              </div>

            </div>

            {/* Mentions Légales/Confidentialité Badge */}
            <div className="p-8 bg-foreground text-background space-y-6 relative overflow-hidden group">
              <Shield className="absolute -bottom-4 -right-4 w-24 h-24 text-background/5 group-hover:scale-110 transition-transform duration-700" />
              <h3 className="text-lg font-bold tracking-tight relative z-10">Protocole Privacy</h3>
              <p className="text-xs text-background/60 leading-relaxed relative z-10">
                Chaque échange technique est couvert par un protocole de confidentialité strict.
                Nous pouvons signer vos accords de non-divulgation (NDA) avant toute étude de projet.
              </p>
            </div>

            {/* Localisation */}
            <div className="flex items-start gap-4 p-6 bg-foreground/[0.02] border border-foreground/5">
              <MapPin className="w-5 h-5 text-accent mt-0.5 shrink-0" />
              <div className="space-y-1">
                <p className="font-bold text-sm">Base Opérationnelle</p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Abomey-Calavi, Bénin<br />
                  Rayonnement international (Remote Priority).
                </p>
              </div>
            </div>

          </aside>
        </div>
      </div>
    </main>
  );
}
