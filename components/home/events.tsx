'use client';

import { Calendar, ArrowRight, Video, Mic2 } from 'lucide-react';
import Link from 'next/link';

const events = [
  {
    type: 'TikTok Live',
    icon: Video,
    title: 'Audit de résilience en direct',
    date: '24 Mars — 20h00',
    desc: 'Analyse d\'une architecture cloud réelle et correction des failles en direct.',
    link: 'https://tiktok.com/@eurinhash'
  },
  {
    type: 'Webinaire',
    icon: Mic2,
    title: 'Devenir Architecte Cloud en 2026',
    date: '02 Avril — 18h30',
    desc: 'Les compétences critiques et les erreurs à éviter pour les ingénieurs africains.',
    link: '/evenements'
  }
];

export function EventsSection() {
  return (
    <section className="py-32 bg-foreground text-background">
      <div className="mx-auto max-w-6xl px-4 sm:px-8">
        <header className="mb-20 space-y-6 max-w-2xl">
          <span className="font-mono text-xs text-accent tracking-widest font-bold block uppercase">
            Activités & Leadership
          </span>
          <h2 className="text-4xl sm:text-6xl font-black tracking-tighter leading-[0.9]">
            Événements<br />
            <span className="text-background/20 font-light italic">& Lives.</span>
          </h2>
          <p className="text-lg text-background/60 leading-relaxed">
            Rejoignez nos sessions en direct pour interagir, apprendre et voir la technologie en action.
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-8">
          {events.map((event, i) => (
            <div key={i} className="group p-8 border border-background/10 bg-background/[0.03] space-y-8 hover:bg-background/[0.05] transition-all">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 py-1 px-3 border border-background/10 rounded-full">
                  <event.icon className="w-3 h-3 text-accent" />
                  <span className="text-[10px] font-mono font-bold tracking-widest uppercase">{event.type}</span>
                </div>
                <Calendar className="w-4 h-4 text-background/20" />
              </div>

              <div className="space-y-4">
                <div className="space-y-1">
                  <span className="text-xs font-mono text-accent">{event.date}</span>
                  <h3 className="text-2xl font-black tracking-tight">{event.title}</h3>
                </div>
                <p className="text-sm text-background/50 leading-relaxed">{event.desc}</p>
              </div>

              <a
                href={event.link}
                target={event.link.startsWith('http') ? '_blank' : undefined}
                rel={event.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="inline-flex items-center gap-2 text-xs font-bold text-accent group/btn"
              >
                Participer <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform" />
              </a>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link href="/evenements" className="text-xs font-mono font-bold uppercase tracking-widest text-background/40 hover:text-accent transition-colors">
            Voir tous les événements →
          </Link>
        </div>
      </div>
    </section>
  );
}
