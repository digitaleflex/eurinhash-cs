import * as React from 'react';
import {
  Users,
  Mail,
  FileText,
  TrendingUp,
  ArrowUpRight,
  ShieldAlert,
  Clock,
  ExternalLink,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import prismaApi from '@/lib/prisma-api';
import Link from 'next/link';

const prisma = prismaApi;

export default async function AdminPage() {
  // Fetch global stats
  const [
    totalUsers,
    totalMessages,
    recentMessages,
  ] = await Promise.all([
    prisma.user.count(),
    prisma.contactMessage.count(),
    prisma.contactMessage.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
    }),
  ]);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight">
            Vue d'ensemble
          </h1>
          <p className="text-muted-foreground mt-1">
            Tableau de bord de gestion Eurin Hash CS.
          </p>
        </div>
        <Badge
          variant="outline"
          className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 bg-accent/5 border-accent/20 text-accent"
        >
          Live Monitoring
        </Badge>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-3">
        <StatCard
          title="Utilisateurs"
          value={totalUsers}
          icon={Users}
          description="Inscriptions totales"
          href="/admin/users"
        />
        <StatCard
          title="Messages"
          value={totalMessages}
          icon={Mail}
          description="Messages de contact"
          href="/admin/messages"
          neutral
        />
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Recent Messages */}
        <Card className="border-border/60 bg-card/50 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-4 border-b border-border/40">
            <CardTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
              Derniers Messages
            </CardTitle>
            <Link
              href="/admin/messages"
              className="text-xs text-accent hover:underline flex items-center gap-1 font-bold"
            >
              Tout voir <ArrowUpRight className="w-3 h-3" />
            </Link>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-6">
              {recentMessages.map(msg => (
                <div
                  key={msg.id}
                  className="flex items-start justify-between gap-4 group"
                >
                  <div className="space-y-1">
                    <p className="text-sm font-bold group-hover:text-accent transition-colors">
                      {msg.subject || 'Sans objet'}
                    </p>
                    <p className="text-xs text-muted-foreground line-clamp-1">
                      {msg.name} • {msg.email}
                    </p>
                  </div>
                  <Badge
                    variant="outline"
                    className="text-[10px] font-mono shrink-0"
                  >
                    {new Date(msg.createdAt).toLocaleDateString('fr-FR')}
                  </Badge>
                </div>
              ))}
              {recentMessages.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                  <Mail className="w-8 h-8 mx-auto mb-2 opacity-20" />
                  <p className="text-sm">Aucun message pour le moment.</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  icon: Icon,
  description,
  href,
  neutral = false,
}: any) {
  return (
    <Link href={href}>
      <Card className="border-border/50 bg-card transition-all hover:border-accent/40 shadow-sm overflow-hidden relative group">
        <div className="absolute top-0 right-0 w-24 h-24 bg-accent/5 rounded-bl-full -mr-8 -mt-8 group-hover:scale-110 transition-transform duration-500" />
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground">
            {title}
          </CardTitle>
          <Icon
            className={
              neutral
                ? 'w-5 h-5 text-muted-foreground/30'
                : 'w-5 h-5 text-accent'
            }
          />
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-black tracking-tighter mb-1">
            {value}
          </div>
          <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider flex items-center gap-1.5">
            {description}
            <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
