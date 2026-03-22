import * as React from 'react';
import { FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import prismaApi from '@/lib/prisma-api';
import type { PrismaClient } from '@prisma/client';
import { DashboardSearch } from '@/components/dashboard/search';
import { RequestItem } from './request-item';

const prisma = prismaApi as PrismaClient;

interface DemandesPageProps {
  searchParams: Promise<{ q?: string }>;
}

export default async function DemandesPage({ searchParams }: DemandesPageProps) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect('/sign-in');
  }

  const user = session.user;
  const { q } = await searchParams;

  const requests = await prisma.projectRequest.findMany({
    where: {
      email: user.email,
      ...(q ? {
        OR: [
          { organization: { contains: q, mode: 'insensitive' } },
          { initiativeName: { contains: q, mode: 'insensitive' } },
          { vision: { contains: q, mode: 'insensitive' } },
        ]
      } : {}),
    },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Mes Demandes</h1>
          <p className="text-muted-foreground mt-1">
            {requests.length} demande{requests.length !== 1 ? 's' : ''} de
            projet
          </p>
        </div>
        <Button asChild>
          <a href="/contact">
            <FileText className="w-4 h-4 mr-2" />
            Nouvelle demande
          </a>
        </Button>
      </div>

      {/* Search */}
      <DashboardSearch placeholder="Rechercher dans vos demandes..." />

      {/* Requests List */}
      {requests.length === 0 ? (
        <Card>
          <CardContent className="py-16 text-center">
            <FileText className="w-12 h-12 mx-auto text-muted-foreground/50 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Aucune demande</h3>
            <p className="text-muted-foreground">
              {q
                ? 'Aucune demande ne correspond à votre recherche.'
                : "Vous n'avez pas encore soumis de demande de projet."}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {requests.map(req => (
            <RequestItem key={req.id} req={JSON.parse(JSON.stringify(req))} />
          ))}
        </div>
      )}
    </div>
  );
}
