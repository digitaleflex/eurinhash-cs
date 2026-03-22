import * as React from 'react';
import {
  Calendar,
  Plus,
  Search,
  MoreVertical,
  Video,
  Youtube,
  ExternalLink,
  Edit,
  Trash2,
  Star,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DashboardSearch } from '@/components/dashboard/search';
import { DeleteEventButton } from '@/components/admin/DeleteEventButton';
import prismaApi from '@/lib/prisma-api';
import Link from 'next/link';

const prisma = prismaApi;

interface AdminEventsPageProps {
  searchParams: Promise<{ q?: string }>;
}

const platformIcons: Record<string, any> = {
  YouTube: Youtube,
  TikTok: Video, // Replace with TikTok icon if available in your lucide version or generic Video
  'Google Meet': Video,
  Substack: ExternalLink,
  Other: ExternalLink,
};

export default async function AdminEventsPage({
  searchParams,
}: AdminEventsPageProps) {
  const { q } = await searchParams;

  const events = await prisma.event.findMany({
    where: {
      ...(q
        ? {
            OR: [
              { title: { contains: q, mode: 'insensitive' } },
              { description: { contains: q, mode: 'insensitive' } },
              { platform: { contains: q, mode: 'insensitive' } },
            ],
          }
        : {}),
    },
    orderBy: { date: 'desc' },
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight uppercase">
            Événements
          </h1>
          <p className="text-muted-foreground mt-1 text-xs font-bold tracking-widest flex items-center gap-2 uppercase">
            <Calendar className="w-4 h-4 text-accent" />
            {events.length} événement{events.length !== 1 ? 's' : ''} au total
          </p>
        </div>
        <Button
          asChild
          className="bg-accent hover:bg-accent/90 text-white font-bold h-11 px-6 px-4"
        >
          <Link
            href="/admin/evenements/new"
            className="flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> Nouvel Événement
          </Link>
        </Button>
      </div>

      <DashboardSearch placeholder="Rechercher par titre, plateforme..." />

      <Card className="border-border/60 bg-card/30 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-accent/5 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground border-b border-border/40">
              <tr>
                <th className="px-6 py-5">Événement</th>
                <th className="px-6 py-5">Date & Lieu</th>
                <th className="px-6 py-5">Type / Platform</th>
                <th className="px-6 py-5">Inscrits</th>
                <th className="px-6 py-5">Status</th>
                <th className="px-6 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/20">
              {events.map(event => {
                const Icon = platformIcons[event.platform] || ExternalLink;
                return (
                  <tr
                    key={event.id}
                    className="group hover:bg-accent/[0.02] transition-colors duration-200"
                  >
                    <td className="px-6 py-6">
                      <div className="flex items-center gap-4">
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2">
                            <p className="font-bold text-base tracking-tight">
                              {event.title}
                            </p>
                            {event.isFeatured && (
                              <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground line-clamp-1 max-w-xs">
                            {event.description}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-6">
                      <div className="space-y-1">
                        <p className="text-sm font-bold flex items-center gap-2">
                          <Calendar className="w-3 h-3 text-accent" />
                          {new Date(event.date).toLocaleDateString('fr-FR', {
                            day: '2-digit',
                            month: 'long',
                            year: 'numeric',
                          })}
                        </p>
                        <p className="text-[10px] text-muted-foreground font-mono uppercase bg-accent/5 px-2 py-0.5 rounded-full inline-block">
                          {new Date(event.date).toLocaleTimeString('fr-FR', {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-6">
                      <div className="space-y-1.5 font-bold uppercase tracking-tighter">
                        <Badge
                          variant="outline"
                          className="text-[9px] border-accent/20 text-accent"
                        >
                          {event.type}
                        </Badge>
                        <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
                          <Icon className="w-3 h-3" />
                          {event.platform}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-6 font-bold uppercase tracking-tighter">
                      <Link
                        href={`/admin/evenements/${event.id}/registrations`}
                        className="hover:opacity-80 transition-opacity"
                      >
                        <Badge
                          variant="secondary"
                          className="text-[10px] font-bold bg-accent/10 text-accent border-none cursor-pointer"
                        >
                          {(event as any)._count?.registrations || 0} inscrits
                        </Badge>
                      </Link>
                    </td>
                    <td className="px-6 py-6">
                      <Badge
                        variant="secondary"
                        className="text-[9px] font-black uppercase tracking-widest bg-muted/50"
                      >
                        {event.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-6 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-9 w-9 text-muted-foreground hover:text-accent"
                          asChild
                        >
                          <Link href={`/admin/evenements/${event.id}/edit`}>
                            <Edit className="h-4 w-4" />
                          </Link>
                        </Button>
                        <DeleteEventButton
                          eventId={event.id}
                          eventTitle={event.title}
                        />
                      </div>
                    </td>
                  </tr>
                );
              })}
              {events.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-20 text-center text-muted-foreground italic"
                  >
                    Aucun événement trouvé.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
