import * as React from 'react';
import {
  FileText,
  Search,
  Clock,
  Building2,
  Globe,
  MoreVertical,
  CheckCircle2,
  Calendar,
  LayoutList,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DashboardSearch } from '@/components/dashboard/search';
import { RequestActions } from '@/components/admin/RequestActions';
import prismaApi from '@/lib/prisma-api';

const prisma = prismaApi;

interface AdminDemandesPageProps {
  searchParams: Promise<{ q?: string }>;
}

const statusColors: Record<string, string> = {
  new: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
  analyzing: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
  qualified: 'bg-green-500/10 text-green-500 border-green-500/20',
  rejected: 'bg-red-500/10 text-red-500 border-red-500/20',
  archived: 'bg-gray-500/10 text-gray-500 border-gray-500/20',
};

export default async function AdminDemandesPage({
  searchParams,
}: AdminDemandesPageProps) {
  const { q } = await searchParams;

  const requests = await prisma.projectRequest.findMany({
    where: {
      ...(q
        ? {
            OR: [
              { organization: { contains: q, mode: 'insensitive' } },
              { initiativeName: { contains: q, mode: 'insensitive' } },
              { email: { contains: q, mode: 'insensitive' } },
              { vision: { contains: q, mode: 'insensitive' } },
            ],
          }
        : {}),
    },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight uppercase">
            Project Requests
          </h1>
          <p className="text-muted-foreground mt-1 text-xs font-bold tracking-widest flex items-center gap-2">
            <LayoutList className="w-4 h-4 text-accent" />
            {requests.length} demande{requests.length !== 1 ? 's' : ''} de
            projet
          </p>
        </div>
      </div>

      <DashboardSearch placeholder="Filtrer par organisation, projet, email..." />

      <div className="space-y-4">
        {requests.map(req => (
          <Card
            key={req.id}
            className="border-border/50 bg-card/30 hover:border-accent/30 transition-all duration-300 group"
          >
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="flex-1 space-y-4">
                  <div className="flex items-start justify-between lg:justify-start gap-4 flex-wrap">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge
                          variant="outline"
                          className={`text-[10px] font-black uppercase tracking-tighter ${statusColors[req.status] || ''}`}
                        >
                          {req.status}
                        </Badge>
                        <span className="text-[10px] font-mono text-muted-foreground uppercase">
                          {req.id.slice(-8)}
                        </span>
                      </div>
                      <h3 className="text-xl font-black group-hover:text-accent transition-colors leading-tight tracking-tight">
                        {req.initiativeName}
                      </h3>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="space-y-1">
                      <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">
                        Organisation
                      </p>
                      <p className="text-sm font-bold flex items-center gap-2 leading-none">
                        <Building2 className="w-3 h-3 text-accent" />
                        {req.organization}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">
                        Contact
                      </p>
                      <p className="text-sm font-bold flex items-center gap-2 leading-none">
                        <Globe className="w-3 h-3 text-accent" />
                        {req.email}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">
                        Pays
                      </p>
                      <p className="text-sm font-bold flex items-center gap-2 leading-none">
                        <Globe className="w-3 h-3 text-accent" />
                        {req.country}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground">
                        Date
                      </p>
                      <p className="text-sm font-bold flex items-center gap-2 leading-none">
                        <Calendar className="w-3 h-3 text-accent" />
                        {new Date(req.createdAt).toLocaleDateString('fr-FR')}
                      </p>
                    </div>
                  </div>

                  <div className="relative group/vision">
                    <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed italic bg-accent/5 p-3 rounded-lg border border-accent/10 group-hover/vision:line-clamp-none transition-all duration-300">
                      "{req.vision}"
                    </p>
                  </div>
                </div>

                <div className="flex shrink-0 gap-3 border-t lg:border-t-0 lg:border-l border-border/40 pt-4 lg:pt-0 lg:pl-6">
                  <RequestActions
                    requestId={req.id}
                    currentStatus={req.status}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {requests.length === 0 && (
          <div className="py-20 text-center border-2 border-dashed border-border/40 rounded-xl bg-accent/5">
            <FileText className="w-12 h-12 mx-auto text-muted-foreground/30 mb-4" />
            <h3 className="text-lg font-bold">Aucune demande trouvée</h3>
            <p className="text-muted-foreground">
              Votre recherche n'a retourné aucun projet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
