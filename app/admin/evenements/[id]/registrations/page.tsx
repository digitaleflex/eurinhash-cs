import * as React from 'react';
import { 
  Users, 
  ArrowLeft, 
  Mail, 
  Calendar,
  Send,
  Loader2,
  CheckCircle2
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import prismaApi from '@/lib/prisma-api';
import type { PrismaClient } from '@prisma/client';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { RelaunchButton } from '@/components/events/RelaunchButton';

const prisma = prismaApi as PrismaClient;

interface EventRegistrationsPageProps {
  params: Promise<{ id: string }>;
}

export default async function EventRegistrationsPage({ params }: EventRegistrationsPageProps) {
  const { id } = await params;

  const event = await prisma.event.findUnique({
    where: { id },
    include: {
      registrations: {
        include: { user: true },
        orderBy: { createdAt: 'desc' }
      }
    }
  });

  if (!event) notFound();

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <Link 
            href="/admin/evenements" 
            className="text-xs font-bold text-muted-foreground hover:text-accent flex items-center gap-1 uppercase tracking-widest transition-colors mb-2"
          >
            <ArrowLeft className="w-3 h-3" /> Retour aux événements
          </Link>
          <h1 className="text-3xl font-black tracking-tight uppercase">Inscrits</h1>
          <p className="text-muted-foreground text-sm font-bold flex items-center gap-2">
            <span className="text-accent">{event.title}</span>
            <span className="text-muted-foreground/30">•</span>
            <span>{event.registrations.length} participant{event.registrations.length !== 1 ? 's' : ''}</span>
          </p>
        </div>
        
        <RelaunchButton eventId={event.id} participantCount={event.registrations.length} />
      </div>

      <Card className="border-border/60 bg-card/30 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-accent/5 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground border-b border-border/40">
              <tr>
                <th className="px-6 py-5">Utilisateur</th>
                <th className="px-6 py-5">Email</th>
                <th className="px-6 py-5">Date d'inscription</th>
                <th className="px-6 py-5">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/20">
              {event.registrations.map((reg) => (
                <tr key={reg.id} className="group hover:bg-accent/[0.02] transition-colors duration-200">
                  <td className="px-6 py-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center border border-accent/20">
                        <span className="text-xs font-bold text-accent">{reg.user.name?.[0] || 'U'}</span>
                      </div>
                      <p className="font-bold tracking-tight">{reg.user.name || 'Anonyme'}</p>
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <p className="text-muted-foreground font-medium">{reg.user.email}</p>
                  </td>
                  <td className="px-6 py-6">
                    <p className="text-xs font-bold flex items-center gap-2">
                      <Calendar className="w-3 h-3 text-muted-foreground" />
                      {new Date(reg.createdAt).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </p>
                  </td>
                  <td className="px-6 py-6">
                    <Badge variant="secondary" className="text-[9px] font-black uppercase tracking-widest bg-green-500/10 text-green-500 border-none">
                      Confirmé
                    </Badge>
                  </td>
                </tr>
              ))}
              {event.registrations.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-20 text-center text-muted-foreground italic">
                    Aucune inscription pour le moment.
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
