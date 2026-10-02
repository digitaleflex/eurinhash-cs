import * as React from 'react';
import {
  Mail,
  Search,
  Trash2,
  CheckCircle2,
  MoreVertical,
  ExternalLink,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DashboardSearch } from '@/components/dashboard/search';
import { MessageActions } from '@/components/admin/MessageActions';
import prisma from '@/lib/prisma';

interface AdminMessagesPageProps {
  searchParams: Promise<{ q?: string }>;
}

export default async function AdminMessagesPage({
  searchParams,
}: AdminMessagesPageProps) {
  const { q } = await searchParams;

  const messages = await prisma.contactMessage.findMany({
    where: {
      ...(q
        ? {
            OR: [
              { name: { contains: q, mode: 'insensitive' } },
              { email: { contains: q, mode: 'insensitive' } },
              { subject: { contains: q, mode: 'insensitive' } },
              { message: { contains: q, mode: 'insensitive' } },
            ],
          }
        : {}),
    },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight">Messages</h1>
          <p className="text-muted-foreground mt-1 text-sm uppercase font-bold tracking-widest flex items-center gap-2">
            <Mail className="w-4 h-4 text-accent" />
            {messages.length} message{messages.length !== 1 ? 's' : ''} au total
          </p>
        </div>
      </div>

      <DashboardSearch placeholder="Rechercher un message par nom, email, sujet..." />

      <Card className="border-border/60 bg-card/30 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-accent/5 text-[10px] font-black uppercase tracking-widest text-muted-foreground border-b border-border/40">
              <tr>
                <th className="px-6 py-4">Expéditeur</th>
                <th className="px-6 py-4">Sujet / Message</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {messages.map((msg: any) => (
                <tr
                  key={msg.id}
                  className="group hover:bg-accent/[0.02] transition-colors"
                >
                  <td className="px-6 py-5 align-top">
                    <div className="font-bold text-foreground">{msg.name}</div>
                    <div className="text-xs text-muted-foreground font-mono">
                      {msg.email}
                    </div>
                  </td>
                  <td className="px-6 py-5 align-top max-w-md">
                    <div className="font-bold text-accent mb-1 underline decoration-accent/20 decoration-2 underline-offset-4">
                      {msg.subject || 'Sans objet'}
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                      {msg.message}
                    </p>
                  </td>
                  <td className="px-6 py-5 align-top">
                    <Badge
                      variant={msg.status === 'new' ? 'default' : 'secondary'}
                      className="text-[10px] font-black uppercase tracking-tighter"
                    >
                      {msg.status === 'new' ? 'Nouveau' : msg.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-5 align-top font-mono text-[10px] whitespace-nowrap">
                    {new Date(msg.createdAt).toLocaleString('fr-FR', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </td>
                  <td className="px-6 py-5 align-top text-right">
                    <MessageActions
                      messageId={msg.id}
                      currentStatus={msg.status}
                    />
                  </td>
                </tr>
              ))}
              {messages.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-12 text-center text-muted-foreground italic"
                  >
                    Aucun message trouvé.
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
