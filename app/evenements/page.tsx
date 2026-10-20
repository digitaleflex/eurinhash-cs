import type { Metadata } from "next";
import Link from "next/link";
import { Calendar, ExternalLink, Globe, Video, Youtube } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { events } from "@/lib/content/events";

export const metadata: Metadata = {
  title: "Événements & Webinaires - Eurin Hash",
  description:
    "Lives, webinaires et sessions techniques autour de l’architecture logicielle, du cloud et de la cybersécurité.",
};

const platformIcons = {
  YouTube: Youtube,
  TikTok: Video,
  "Google Meet": Video,
  Substack: ExternalLink,
  Autre: Globe,
};

export default function EvenementsPage() {
  const sortedEvents = [...events].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  );
  const upcomingEvents = sortedEvents.filter((event) => new Date(event.date).getTime() >= Date.now());
  const pastEvents = sortedEvents.filter((event) => new Date(event.date).getTime() < Date.now());
  const featuredEvent = upcomingEvents.find((event) => event.featured) || upcomingEvents[0];
  const otherEvents = sortedEvents.filter((event) => event.slug !== featuredEvent?.slug);

  return (
    <main className="min-h-screen bg-background pb-40 pt-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-8">
        <header className="mb-20 space-y-8 text-center sm:text-left">
          <span className="block font-mono text-xs font-black uppercase tracking-[0.3em] text-accent">
            Écosystème · Événements
          </span>
          <h1 className="text-6xl font-black leading-[0.9] tracking-tighter sm:text-8xl">
            Lives & <span className="font-light italic text-foreground/30">Webinaires.</span>
          </h1>
          <p className="mx-auto max-w-2xl text-xl leading-relaxed text-muted-foreground sm:mx-0">
            Sessions techniques, analyses d’architecture et partages d’expertise en direct.
          </p>
        </header>

        {featuredEvent && (
          <section className="mb-16 overflow-hidden rounded-2xl border border-border/60 bg-card">
            <div className="grid lg:grid-cols-2">
              <div className="flex flex-col justify-center space-y-6 p-8 sm:p-12">
                <div className="flex items-center gap-3">
                  <Badge className="bg-accent px-3 text-[10px] font-black uppercase tracking-widest text-white">
                    Prochain rendez-vous
                  </Badge>
                  <time className="text-xs text-muted-foreground" dateTime={featuredEvent.date}>
                    {new Date(featuredEvent.date).toLocaleDateString("fr-FR", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })}
                  </time>
                </div>
                <h2 className="text-3xl font-black tracking-tight sm:text-5xl">{featuredEvent.title}</h2>
                <p className="leading-relaxed text-muted-foreground">{featuredEvent.description}</p>
                <div className="flex items-center gap-3 text-sm font-semibold">
                  {(() => {
                    const Icon = platformIcons[featuredEvent.platform] || Globe;
                    return <Icon className="h-5 w-5 text-accent" aria-hidden="true" />;
                  })()}
                  <span>{featuredEvent.platform}</span>
                </div>
                {featuredEvent.registrationLink && (
                  <a
                    href={featuredEvent.registrationLink}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex w-fit items-center gap-3 bg-foreground px-6 py-4 text-sm font-bold uppercase tracking-widest text-background transition-colors hover:bg-accent hover:text-white"
                  >
                    Informations et inscription <ExternalLink className="h-4 w-4" />
                  </a>
                )}
                {featuredEvent.eventUrl && (
                  <a href={featuredEvent.eventUrl} target="_blank" rel="noreferrer" className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-accent hover:underline">
                    Accéder à l’événement <ExternalLink className="h-4 w-4" />
                  </a>
                )}
              </div>
              <div className="flex min-h-64 items-center justify-center overflow-hidden border-t border-border/40 bg-accent/5 lg:border-l lg:border-t-0">
                {featuredEvent.thumbnail ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={featuredEvent.thumbnail} alt={featuredEvent.title} className="h-full w-full object-cover" />
                ) : (
                  <Calendar className="h-28 w-28 text-accent/20" aria-hidden="true" />
                )}
              </div>
            </div>
          </section>
        )}

        {otherEvents.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {otherEvents.map((event) => {
              const Icon = platformIcons[event.platform] || Globe;
              const isPast = pastEvents.some((past) => past.slug === event.slug);
              return (
                <article key={event.slug} className="flex flex-col gap-5 border border-border/50 bg-card/30 p-7">
                  <div className="flex items-center justify-between gap-3">
                    <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                      <Icon className="h-4 w-4 text-accent" aria-hidden="true" />
                      {event.platform}
                    </span>
                    {isPast && <Badge variant="secondary">Passé</Badge>}
                  </div>
                  <h2 className="text-xl font-black tracking-tight">{event.title}</h2>
                  <p className="flex-1 text-sm leading-relaxed text-muted-foreground">{event.description}</p>
                  <div className="border-t border-border/40 pt-5">
                    <time className="text-xs font-semibold" dateTime={event.date}>
                      {new Date(event.date).toLocaleDateString("fr-FR", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </time>
                    <p className="mt-1 text-[10px] font-mono uppercase text-muted-foreground">{event.type}</p>
                    {event.registrationLink && (
                      <a href={event.registrationLink} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-accent hover:underline">
                        En savoir plus <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        ) : !featuredEvent ? (
          <div className="rounded-3xl border-2 border-dashed border-border/40 bg-foreground/[0.01] px-6 py-20 text-center">
            <Calendar className="mx-auto mb-6 h-14 w-14 text-muted-foreground/30" aria-hidden="true" />
            <h2 className="text-2xl font-black uppercase tracking-tight">Programmation en cours</h2>
            <p className="mx-auto mt-3 max-w-md text-muted-foreground">
              Les prochains rendez-vous seront annoncés ici. Retrouvez également les annonces sur les canaux officiels.
            </p>
            <Link href="/contact" className="mt-6 inline-flex items-center gap-2 font-bold text-accent hover:underline">
              Contacter Eurin Hash <ExternalLink className="h-4 w-4" />
            </Link>
          </div>
        ) : null}
      </div>
    </main>
  );
}
