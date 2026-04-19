import * as React from 'react';
import { Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import prismaApi from '@/lib/prisma-api';
import { DashboardSearch } from '@/components/dashboard/search';
import { MessageItem } from './message-item';

const prisma = prismaApi;

interface MessagesPageProps {
  searchParams: Promise<{ q?: string }>;
}

export default async function MessagesPage({ searchParams }: MessagesPageProps) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect('/sign-in');
  }

  const user = session.user;
  const { q } = await searchParams;

  const messages = await prisma.contactMessage.findMany({
    where: {
      email: user.email,
      ...(q ? {
        OR: [
          { name: { contains: q, mode: 'insensitive' } },
          { subject: { contains: q, mode: 'insensitive' } },
          { message: { contains: q, mode: 'insensitive' } },
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
          <h1 className="text-3xl font-bold tracking-tight">Mes Messages</h1>
          <p className="text-muted-foreground mt-1">
            {messages.length} message{messages.length !== 1 ? 's' : ''} envoyé
            {messages.length !== 1 ? 's' : ''}
          </p>
        </div>
        <Button asChild>
          <a href="/contact">
            <Mail className="w-4 h-4 mr-2" />
            Nouveau message
          </a>
        </Button>
      </div>

      {/* Search */}
      <DashboardSearch placeholder="Rechercher dans vos messages..." />

      {/* Messages List */}
      {messages.length === 0 ? (
        <Card>
          <CardContent className="py-16 text-center">
            <Mail className="w-12 h-12 mx-auto text-muted-foreground/50 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Aucun message</h3>
            <p className="text-muted-foreground">
              {q
                ? 'Aucun message ne correspond à votre recherche.'
                : "Vous n'avez pas encore envoyé de message."}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {messages.map(msg => (
            <MessageItem key={msg.id} msg={JSON.parse(JSON.stringify(msg))} />
          ))}
        </div>
      )}
    </div>
  );
}
