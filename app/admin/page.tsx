import { 
  Users, 
  Mail, 
  ArrowUpRight, 
  Calendar, 
  BookmarkCheck, 
  Plus, 
  FileText, 
  MessageSquare, 
  Settings,
  Bell,
  Activity
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import dynamic from 'next/dynamic';
import prisma from '@/lib/prisma';
import Link from 'next/link';
// recharts pese environ 99 KB gzip : on ne le charge qu'apres hydratation du
// dashboard, hors First Load JS.
// Ce fichier est un Server Component : `ssr: false` y est interdit, mais
// l'import dynamique suffit à sortir recharts du First Load JS.
const RegistrationsChart = dynamic(() =>
  import('@/components/admin/RegistrationsChart').then((mod) => mod.RegistrationsChart)
);


export default async function AdminPage() {
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const [
    totalUsers, 
    totalMessages, 
    totalEvents, 
    totalRegistrations,
    totalPosts,
    recentMessages,
    registrationsLast7Days,
    unreadMessagesCount,
    registrationsLast7Days_detailed,
    recentPosts
  ] = await Promise.all([
    prisma.user.count(),
    prisma.contactMessage.count(),
    prisma.event.count(),
    prisma.eventRegistration.count(),
    prisma.post.count(),
    prisma.contactMessage.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
    }),
    prisma.eventRegistration.findMany({
      where: {
        createdAt: { gte: sevenDaysAgo }
      },
      select: { createdAt: true }
    }),
    prisma.contactMessage.count({ where: { status: 'new' } }),
    prisma.eventRegistration.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: {
        user: true,
        event: true,
      }
    }),
    prisma.post.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
    })
  ]);

  const recentActivity = [
    ...recentMessages.map((m) => ({ id: m.id, type: 'message', title: `Message: ${m.subject || 'Nouveau contact'}`, user: m.name, date: m.createdAt })),
    ...registrationsLast7Days_detailed.map((r) => ({ id: r.id, type: 'registration', title: `Inscription: ${r.event.title}`, user: r.user.name || r.user.email, date: r.createdAt })),
    ...recentPosts.map((p) => ({ id: p.id, type: 'post', title: `Article: ${p.title}`, user: 'Admin', date: p.createdAt })),
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 8);

  const chartData = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    const dateStr = d.toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' });
    const count = registrationsLast7Days.filter(r => 
      new Date(r.createdAt).toDateString() === d.toDateString()
    ).length;
    return { date: dateStr, count };
  });

  return (
    <div className="space-y-10 animate-in fade-in duration-700 pb-20">
      {/* --- COMMAND CENTER HEADER --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-accent/5 p-8 rounded-[2rem] border border-accent/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full -mr-32 -mt-32 blur-3xl" />
        <div className="relative z-10">
          <h1 className="text-5xl font-black tracking-tighter uppercase italic">
            Command <span className="text-accent">Center</span>
          </h1>
          <p className="text-muted-foreground mt-2 font-medium">
            Orchestration de l'écosystème Eurin Hash CS.
          </p>
        </div>
        <div className="flex flex-wrap gap-3 relative z-10">
          <Link href="/admin/blog/new">
            <Button className="bg-accent hover:bg-accent/90 text-white gap-2 px-6 shadow-lg shadow-accent/20">
              <Plus className="h-4 w-4" /> Nouvel Article
            </Button>
          </Link>
          <Link href="/admin/evenements/new">
            <Button variant="outline" className="gap-2 border-accent/20 bg-background/50 backdrop-blur">
              <Calendar className="h-4 w-4" /> Nouvel Événement
            </Button>
          </Link>
        </div>
      </div>

      {/* --- KPI GRID --- */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Utilisateurs" value={totalUsers} icon={Users} description="Comptes enregistrés" href="/admin/users" />
        <StatCard title="Inscriptions" value={totalRegistrations} icon={BookmarkCheck} description="Total participations" href="/admin/evenements" />
        <StatCard title="Contenu" value={totalPosts} icon={FileText} description="Articles publiés" href="/admin/blog" />
        <StatCard title="Messages" value={unreadMessagesCount} icon={MessageSquare} trend={unreadMessagesCount > 0 ? "Action requise" : "À jour"} description="Messages non lus" href="/admin/messages" highlight={unreadMessagesCount > 0} />
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* --- MAIN ANALYTICS --- */}
        <div className="lg:col-span-2 space-y-8">
          <Card className="border-border/60 bg-card/50 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-sm font-bold uppercase tracking-widest flex items-center gap-2">
                  <Activity className="h-4 w-4 text-accent" /> Activité du Hub
                </CardTitle>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider mt-1">Inscriptions aux 7 derniers jours</p>
              </div>
              <Badge variant="outline" className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20 text-[9px] font-bold">
                Live Data
              </Badge>
            </CardHeader>
            <CardContent className="pt-4">
              <RegistrationsChart data={chartData} />
            </CardContent>
          </Card>

          {/* Activity Table */}
          <Card className="border-border/60 bg-card/50 shadow-sm overflow-hidden">
            <CardHeader className="border-b border-border/40 py-4">
              <CardTitle className="text-sm font-bold uppercase tracking-widest flex items-center gap-2">
                <Activity className="h-4 w-4 text-accent" /> Flux d'activité récent
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-border/40">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-center justify-between p-4 hover:bg-accent/5 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className={`h-2 w-2 rounded-full ${
                        activity.type === 'message' ? 'bg-blue-500' : 
                        activity.type === 'registration' ? 'bg-emerald-500' : 'bg-amber-500'
                      }`} />
                      <div>
                        <p className="text-[11px] font-bold">{activity.title}</p>
                        <p className="text-[10px] text-muted-foreground uppercase font-medium">Par {activity.user}</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-muted-foreground">
                      {new Date(activity.date).toLocaleDateString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                ))}
                {recentActivity.length === 0 && (
                  <div className="py-10 text-center text-xs text-muted-foreground italic">Aucune activité récente.</div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* --- SIDEBAR NOTIFICATIONS --- */}
        <div className="space-y-6">
          <Card className="border-border/60 bg-card/50 shadow-sm overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between pb-4 border-b border-border/40">
              <CardTitle className="text-xs font-black uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                <Bell className="h-3 w-3 text-amber-500" /> Notifications
              </CardTitle>
              <Link href="/admin/messages" className="text-[10px] font-bold text-accent uppercase tracking-tighter">Voir tout</Link>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-6">
                {recentMessages.map((msg) => (
                  <div key={msg.id} className="flex items-start gap-4 group">
                    <div className="h-8 w-8 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                      <Mail className="h-4 w-4 text-accent" />
                    </div>
                    <div className="space-y-1 min-w-0">
                      <p className="text-xs font-bold group-hover:text-accent transition-colors truncate">
                        {msg.subject || 'Nouveau contact'}
                      </p>
                      <p className="text-[10px] text-muted-foreground truncate">
                        {msg.name} • {new Date(msg.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
                {recentMessages.length === 0 && (
                  <p className="text-center py-10 text-xs text-muted-foreground italic">Aucun message.</p>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/60 bg-card/50 shadow-sm p-6 text-center">
             <Settings className="h-8 w-8 mx-auto text-muted-foreground/20 mb-4" />
             <h4 className="text-xs font-bold uppercase tracking-widest mb-2">Support & Config</h4>
             <p className="text-[10px] text-muted-foreground mb-4">Accédez aux paramètres globaux de l'infrastructure.</p>
             <Button variant="outline" size="sm" className="w-full text-[10px] font-bold uppercase tracking-widest">
                Paramètres
             </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}

interface StatCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  description: string;
  href: string;
  trend?: string;
  highlight?: boolean;
}

function StatCard({ title, value, icon: Icon, trend, description, href, highlight }: StatCardProps) {
  return (
    <Link href={href}>
      <Card className="border-border/50 bg-card transition-all hover:border-accent/40 shadow-sm overflow-hidden relative group h-full">
        <div className="absolute top-0 right-0 w-24 h-24 bg-accent/5 rounded-bl-full -mr-8 -mt-8 group-hover:scale-110 transition-transform duration-500" />
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
            {title}
          </CardTitle>
          <Icon className="w-4 h-4 text-accent" />
        </CardHeader>
        <CardContent>
          <div className={`text-4xl font-black tracking-tighter mb-1 ${highlight ? 'text-accent animate-pulse' : ''}`}>
            {value}
          </div>
          <div className="flex items-center justify-between mt-2">
            <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">{description}</span>
            {trend && (
              <Badge variant="outline" className={`text-[9px] font-bold py-0 ${highlight ? 'border-accent bg-accent/10 text-accent' : 'border-accent/20 text-accent'}`}>{trend}</Badge>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
