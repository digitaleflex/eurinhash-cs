import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Calendar,
  Video,
  ArrowRight,
  Youtube,
  Globe,
  Clock,
  ExternalLink,
  Milestone
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import prisma from '@/lib/prisma';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { RegisterButton } from '@/components/events/RegisterButton';
import { Countdown } from '@/components/events/Countdown';
// import type { PrismaClient } from '@prisma/client';

export const metadata: Metadata = {
  title: 'Événements & Webinaires',
  description: 'Participez en direct à nos sessions techniques et découvrez les coulisses de l\'architecture moderne.',
};

const platformIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  YouTube: Youtube,
  TikTok: Youtube, // Temporary fallback
  'Google Meet': Video,
  Substack: ExternalLink,
  Other: Globe,
};

export default async function EvenementsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const events = await prisma.event.findMany({
    include: {
      registrations: session ? {
        where: { userId: session.user.id }
      } : false
    },
    orderBy: { date: 'desc' },
  });

  const featuredEvent = events.find((e) => e.isFeatured && e.status === 'upcoming') || events.find((e) => e.status === 'upcoming');
  const otherEvents = events.filter((e) => e.id !== featuredEvent?.id);

  return (
    <main className="min-h-screen bg-background pt-32 pb-40">
      <div className="mx-auto max-w-6xl px-4 sm:px-8">
        <header className="mb-24 space-y-8 text-center sm:text-left">
          <span className="font-mono text-xs text-accent tracking-[0.3em] font-black block uppercase">
            Écosystème · Événements
          </span>
          <h1 className="text-6xl sm:text-8xl font-black tracking-tighter leading-[0.85] text-foreground">
            Lives &<br />
            <span className="text-foreground/10 font-light italic">Webinaires.</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed mx-auto sm:mx-0">
            Sessions techniques, analyses d'architecture et retours d'expérience en direct.
          </p>
        </header>

        {/* Featured Event */}
        {featuredEvent && (
          <section className="mb-32">
            <div className="relative group overflow-hidden border border-border/60 bg-card rounded-2xl">
              <div className="grid lg:grid-cols-2 gap-0 overflow-hidden">
                <div className="p-8 sm:p-12 lg:p-16 space-y-8 flex flex-col justify-center">
                  <div className="flex items-center gap-3">
                    <Badge className="bg-accent text-white font-black tracking-widest px-3 uppercase text-[10px]">Next Live</Badge>
                    <span className="text-xs font-mono text-muted-foreground uppercase flex items-center gap-2">
                      <Clock className="w-3 h-3" />
                      {new Date(featuredEvent.date).toLocaleDateString('fr-FR', { day: '2-digit', month: 'long' })}
                    </span>
                  </div>

                  <div className="space-y-4">
                    <h2 className="text-4xl sm:text-5xl font-black tracking-tighter leading-tight">
                      {featuredEvent.title}
                    </h2>
                    <p className="text-lg text-muted-foreground leading-relaxed line-clamp-3">
                      {featuredEvent.description}
                    </p>

                    <div className="pt-2">
                      <Countdown targetDate={featuredEvent.date} />
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-6">
                    <div className="flex items-center gap-2">
                      {React.createElement(platformIcons[featuredEvent.platform] || Globe, { className: "w-5 h-5 text-accent" })}
                      <span className="text-sm font-bold uppercase tracking-widest">{featuredEvent.platform}</span>
                    </div>
                    <div className="h-4 w-px bg-border/60" />
                    <div className="text-sm font-mono text-muted-foreground">
                      {new Date(featuredEvent.date).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>

                  <div className="pt-4 flex flex-col sm:flex-row gap-4 text-center sm:text-left">
                    <RegisterButton
                      eventId={featuredEvent.id}
                      isLoggedIn={!!session}
                      isRegisteredInitial={featuredEvent.registrations?.length > 0}
                      className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-foreground text-background font-black text-sm uppercase tracking-widest transition-all hover:bg-accent hover:text-white group h-auto"
                    />
                    {featuredEvent.registrationLink && (
                      <a
                        href={featuredEvent.registrationLink}
                        className="inline-flex items-center justify-center px-8 py-4 border border-border font-black text-sm uppercase tracking-widest hover:bg-secondary/50 transition-all shadow-sm"
                      >
                        S'inscrire
                      </a>
                    )}
                  </div>
                </div>

                <div className="relative h-64 lg:h-auto overflow-hidden bg-accent/5 flex items-center justify-center border-t lg:border-t-0 lg:border-l border-border/40">
                  {featuredEvent.thumbnail ? (
                    <img src={featuredEvent.thumbnail} alt={featuredEvent.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                  ) : (
                    <div className="text-accent/10">
                      <Milestone className="w-40 h-40 opacity-20" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Gallery */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {otherEvents.map((event) => {
            const Icon = platformIcons[event.platform] || Globe;
            const isPast = new Date(event.date) < new Date();

            return (
              <div key={event.id} className="group border border-border/40 bg-card/30 p-8 space-y-6 flex flex-col transition-all hover:bg-card hover:border-accent/40 shadow-sm relative overflow-hidden">
                {isPast && (
                  <div className="absolute top-0 right-0 p-3">
                    <Badge variant="secondary" className="text-[10px] font-black uppercase tracking-tighter opacity-70">Passé</Badge>
                  </div>
                )}
                <div className="space-y-4 flex-1">
                  <div className="flex items-center gap-3">
                    <Icon className="w-5 h-5 text-accent/60" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{event.platform}</span>
                  </div>
                  <h3 className="text-xl font-black tracking-tight leading-snug group-hover:text-accent transition-colors">
                    {event.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed italic">
                    {event.description}
                  </p>
                </div>

                <div className="pt-6 border-t border-border/40 flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-xs font-bold">{new Date(event.date).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' })}</p>
                    <p className="text-[10px] font-mono text-muted-foreground uppercase">{event.type}</p>
                  </div>
                  <RegisterButton
                    eventId={event.id}
                    isLoggedIn={!!session}
                    isRegisteredInitial={event.registrations?.length > 0}
                    variant="outline"
                    size="sm"
                    className="font-bold uppercase tracking-tight text-[10px] h-9"
                  />
                </div>
              </div>
            );
          })}
        </div>

        {events.length === 0 && (
          <div className="py-20 text-center border-2 border-dashed border-border/40 rounded-3xl bg-foreground/[0.01]">
            <Calendar className="w-16 h-16 mx-auto text-muted-foreground/20 mb-6" />
            <h2 className="text-2xl font-black tracking-tight uppercase">Programmation en cours</h2>
            <p className="text-muted-foreground mt-2 max-w-md mx-auto">
              Nous préparons une série de sessions techniques inédites. Revenez très bientôt pour les dates.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
