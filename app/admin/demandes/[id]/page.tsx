import * as React from 'react';
import {
  ArrowLeft,
  Building2,
  Globe,
  Mail,
  Phone,
  Calendar,
  Clock,
  FileText,
  AlertCircle,
  CheckCircle,
  XCircle,
  Archive,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import prismaApi from '@/lib/prisma-api';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { RequestDetailActions } from '@/components/admin/RequestDetailActions';

const prisma = prismaApi;

interface RequestDetailPageProps {
  params: Promise<{ id: string }>;
}

const statusColors: Record<string, string> = {
  new: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
  analyzing: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
  qualified: 'bg-green-500/10 text-green-500 border-green-500/20',
  rejected: 'bg-red-500/10 text-red-500 border-red-500/20',
  archived: 'bg-gray-500/10 text-gray-500 border-gray-500/20',
};

const statusLabels: Record<string, string> = {
  new: 'Nouveau',
  analyzing: 'En analyse',
  qualified: 'Qualifié',
  rejected: 'Rejeté',
  archived: 'Archivé',
};

export default async function RequestDetailPage({
  params,
}: RequestDetailPageProps) {
  const { id } = await params;

  const request = await prisma.projectRequest.findUnique({
    where: { id },
  });

  if (!request) {
    notFound();
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <Link
            href="/admin/demandes"
            className="text-xs font-bold text-muted-foreground hover:text-accent flex items-center gap-1 uppercase tracking-widest transition-colors mb-2"
          >
            <ArrowLeft className="w-3 h-3" /> Retour aux demandes
          </Link>
          <h1 className="text-3xl font-black tracking-tight uppercase">
            {request.initiativeName}
          </h1>
          <p className="text-muted-foreground font-bold flex items-center gap-2">
            <Badge
              variant="outline"
              className={`text-[10px] font-black uppercase tracking-tighter ${statusColors[request.status] || ''}`}
            >
              {statusLabels[request.status] || request.status}
            </Badge>
            <span className="text-muted-foreground/30">•</span>
            <span className="font-mono text-xs">{request.id.slice(-8)}</span>
          </p>
        </div>

        <RequestDetailActions
          requestId={request.id}
          currentStatus={request.status}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-border/60 bg-card/50">
          <CardHeader>
            <CardTitle className="text-xs font-black uppercase tracking-widest text-muted-foreground">
              Organisation
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3">
              <Building2 className="w-4 h-4 text-accent mt-1" />
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  Organisation
                </p>
                <p className="font-bold">{request.organization}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <FileText className="w-4 h-4 text-accent mt-1" />
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  Rôle
                </p>
                <p className="font-bold">{request.role}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Globe className="w-4 h-4 text-accent mt-1" />
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  Pays
                </p>
                <p className="font-bold">{request.country}</p>
              </div>
            </div>
            {request.location && (
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-accent mt-1" />
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                    Localisation
                  </p>
                  <p className="font-bold">{request.location}</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border-border/60 bg-card/50">
          <CardHeader>
            <CardTitle className="text-xs font-black uppercase tracking-widest text-muted-foreground">
              Contact
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3">
              <Mail className="w-4 h-4 text-accent mt-1" />
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  Email
                </p>
                <a
                  href={`mailto:${request.email}`}
                  className="font-bold text-accent hover:underline"
                >
                  {request.email}
                </a>
              </div>
            </div>
            {request.phone && (
              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-accent mt-1" />
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                    Téléphone
                  </p>
                  <p className="font-bold">{request.phone}</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border-border/60 bg-card/50 lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-xs font-black uppercase tracking-widest text-muted-foreground">
              Projet
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  Type d&apos;initiative
                </p>
                <p className="font-bold">{request.initiativeType}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  Priorité
                </p>
                <Badge
                  variant="outline"
                  className="text-[10px] font-black uppercase mt-1"
                >
                  {request.priority}
                </Badge>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  Délai
                </p>
                <p className="font-bold">{request.timeline}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  Source
                </p>
                <p className="font-bold text-xs">{request.source}</p>
              </div>
            </div>

            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2">
                Vision
              </p>
              <div className="bg-accent/5 p-4 rounded-lg border border-accent/10">
                <p className="text-sm leading-relaxed">{request.vision}</p>
              </div>
            </div>

            {request.context && (
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2">
                  Contexte
                </p>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {request.context}
                </p>
              </div>
            )}

            {request.technologies && request.technologies.length > 0 && (
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2">
                  Technologies
                </p>
                <div className="flex flex-wrap gap-2">
                  {request.technologies.map((tech, i) => (
                    <Badge
                      key={i}
                      variant="secondary"
                      className="text-[10px] font-bold"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border-border/60 bg-card/50">
          <CardHeader>
            <CardTitle className="text-xs font-black uppercase tracking-widest text-muted-foreground">
              Statistiques
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3">
              <Clock className="w-4 h-4 text-accent mt-1" />
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  Créé le
                </p>
                <p className="font-bold">
                  {new Date(request.createdAt).toLocaleDateString('fr-FR', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric',
                  })}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Calendar className="w-4 h-4 text-accent mt-1" />
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  Mis à jour
                </p>
                <p className="font-bold">
                  {new Date(request.updatedAt).toLocaleDateString('fr-FR', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric',
                  })}
                </p>
              </div>
            </div>
            {request.dataSensitivity && (
              <div className="flex items-start gap-3">
                <AlertCircle className="w-4 h-4 text-accent mt-1" />
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                    Sensibilité des données
                  </p>
                  <p className="font-bold text-xs">{request.dataSensitivity}</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border-border/60 bg-card/50">
          <CardHeader>
            <CardTitle className="text-xs font-black uppercase tracking-widest text-muted-foreground">
              Informations techniques
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {request.existingInfrastructure && (
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2">
                  Infrastructure existante
                </p>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {request.existingInfrastructure}
                </p>
              </div>
            )}
            {request.regulatoryRequirements && (
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2">
                  Exigences réglementaires
                </p>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {request.regulatoryRequirements}
                </p>
              </div>
            )}
            {!request.existingInfrastructure &&
              !request.regulatoryRequirements && (
                <p className="text-sm text-muted-foreground italic">
                  Aucune information technique ajoutée
                </p>
              )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function MapPin({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}
