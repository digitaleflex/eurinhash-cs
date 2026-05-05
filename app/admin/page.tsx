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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import prismaApi from '@/lib/prisma-api';
import Link from 'next/link';
import { RegistrationsChart } from '@/components/admin/RegistrationsChart';

const prisma = prismaApi;

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
    registrationsLast7Days
  ] = await Promise.all([
    prisma.user.count(),
    prisma.contactMessage.count(),
    prisma.event.count(),
    prisma.eventRegistration.count(),
    (prisma as any).post.count(),
    prisma.contactMessage.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
    }),
    prisma.eventRegistration.findMany({
      where: {
        createdAt: { gte: sevenDaysAgo }
      },
      select: { createdAt: true }
    })
  ]);

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
        <StatCard title="Utilisateurs" value={totalUsers} icon={Users} trend="+12%" description="Total inscrits" href="/admin/users" />
        <StatCard title="Événements" value={totalEvents} icon={Calendar} trend="Actifs" description="Sessions lives" href="/admin/evenements" />
        <StatCard title="Articles" value={totalPosts} icon={FileText} trend="SEO OK" description="Posts publiés" href="/admin/blog" />
        <StatCard title="Messages" value={totalMessages} icon={MessageSquare} trend="Nouveaux" description="Emails reçus" href="/admin/messages" />
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

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
             <Card className="bg-accent text-white p-6 border-none shadow-xl shadow-accent/10">
                <h3 className="text-sm font-black uppercase tracking-widest mb-1">Missions SEO</h3>
                <p className="text-xs text-white/80 leading-relaxed mb-4">Optimisez vos articles en attente pour booster le trafic.</p>
                <Button variant="secondary" size="sm" className="w-full bg-white text-accent hover:bg-white/90 text-[10px] font-bold uppercase tracking-widest">
                  Gérer les brouillons
                </Button>
             </Card>
             <Card className="bg-slate-900 text-white p-6 border-none shadow-xl">
                <h3 className="text-sm font-black uppercase tracking-widest mb-1">Maintenance</h3>
                <p className="text-xs text-white/80 leading-relaxed mb-4">Système stable. Prochaine mise à jour prévue : 48h.</p>
                <Button variant="outline" size="sm" className="w-full border-white/20 text-white hover:bg-white/10 text-[10px] font-bold uppercase tracking-widest">
                  Logs Système
                </Button>
             </Card>
          </div>
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
                {recentMessages.map((msg: any) => (
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

function StatCard({ title, value, icon: Icon, trend, description, href }: any) {
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
          <div className="text-4xl font-black tracking-tighter mb-1">
            {value}
          </div>
          <div className="flex items-center justify-between mt-2">
            <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">{description}</span>
            <Badge variant="outline" className="text-[9px] font-bold border-accent/20 text-accent py-0">{trend}</Badge>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
