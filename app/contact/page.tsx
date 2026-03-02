'use client';

import { Mail, Linkedin, Github, MessageSquare, ArrowRight, MapPin } from 'lucide-react';
import Link from 'next/link';
import { ContactForm } from '@/components/contact-form';

const channels = [
  { icon: Mail, label: 'Email', value: 'contact@eurinhash.com', href: 'mailto:contact@eurinhash.com' },
  { icon: Linkedin, label: 'LinkedIn', value: 'Eurin Almeida', href: 'https://www.linkedin.com/in/eurindalemeida/' },
  { icon: Github, label: 'GitHub', value: 'digitaleflex', href: 'https://github.com/digitaleflex' },
  { icon: MessageSquare, label: 'WhatsApp', value: 'Canal direct', href: 'https://wa.me/2290162265246' },
];

export default function ContactPage() {
  return (
    <main className="bg-background text-foreground min-h-screen pt-28 pb-40">
      <div className="mx-auto max-w-5xl px-4 sm:px-8">

        {/* Header */}
        <header className="mb-24 space-y-8">
          <span className="font-mono text-xs text-accent tracking-tight font-medium block">
            Contact
          </span>
          <h1 className="font-black tracking-tight text-foreground">
            Une question ?<br />
            <span className="text-foreground/25">Écrivez directement.</span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl leading-relaxed font-normal" style={{ letterSpacing: '-0.01em' }}>
            Pas de filtre, pas de processus complexe pour une demande simple.
            Remplissez le formulaire et je réponds sous 24h.
          </p>
        </header>

        <div className="grid lg:grid-cols-[1.5fr_1fr] gap-16 items-start">

          {/* Formulaire */}
          <section>
            <h2 className="text-xl font-bold tracking-tight mb-8">Envoyer un message</h2>
            <div className="border border-foreground/5 p-8 sm:p-10">
              <ContactForm />
            </div>
          </section>

          {/* Aside */}
          <aside className="space-y-10">

            {/* Canaux directs */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold tracking-tight border-b border-foreground/5 pb-4">
                Canaux directs
              </h3>
              <div className="space-y-2">
                {channels.map((chan, i) => (
                  <a
                    key={i}
                    href={chan.href}
                    target={chan.href.startsWith('http') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-4 border border-foreground/5 hover:border-accent/30 hover:bg-accent/[0.02] transition-all group"
                  >
                    <div className="flex items-center gap-4">
                      <chan.icon className="w-4 h-4 text-foreground/30 group-hover:text-accent transition-colors" />
                      <div>
                        <span className="font-mono text-[10px] text-muted-foreground block mb-0.5">{chan.label}</span>
                        <span className="text-sm font-medium">{chan.value}</span>
                      </div>
                    </div>
                    <ArrowRight className="w-3 h-3 text-foreground/20 group-hover:text-accent group-hover:translate-x-1 transition-all" />
                  </a>
                ))}
              </div>
            </div>

            {/* Redirection collaboration */}
            <div className="bg-foreground text-background p-8 space-y-6">
              <h3 className="text-lg font-bold tracking-tight">
                Projet structurant ?
              </h3>
              <p className="text-sm text-background/60 leading-relaxed">
                Si votre demande concerne une infrastructure complète à concevoir,
                passez directement par le formulaire dédié.
              </p>
              <Link
                href="/collaboration"
                className="flex items-center gap-3 border border-background/20 px-5 py-3 text-sm font-semibold tracking-tight hover:bg-accent hover:border-accent transition-all group"
              >
                Parlons de votre projet
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Localisation */}
            <div className="flex items-start gap-3 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4 text-accent mt-0.5 shrink-0" />
              <p className="leading-relaxed">
                Abomey-Calavi, Bénin<br />
                <span className="text-foreground/40">Disponible à distance — priorité globale</span>
              </p>
            </div>

          </aside>
        </div>
      </div>
    </main>
  );
}
